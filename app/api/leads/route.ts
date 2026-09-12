import { NextRequest, NextResponse } from 'next/server';
import { validateLeadSubmission } from '@/lib/validation';
import { getSupabaseClient } from '@/lib/supabase';
import { syncLeadToHubspot } from '@/lib/hubspot';
import { triggerLeadFulfillment } from '@/lib/fulfillment';
import { sendMosSignal } from '@/lib/mos';
import { siteConfig } from '@/config/site.config';

// In-Memory Rate Limiter (sliding window per IP)
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale entries every 15 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
      if (record.timestamps.length === 0) {
        rateLimitMap.delete(ip);
      }
    }
  }, 15 * 60 * 1000);
  if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
    cleanupTimer.unref();
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };
  record.timestamps = record.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.timestamps.push(now);
  rateLimitMap.set(ip, record);
  return true;
}

// Helper to ensure cache-poisoning mitigation headers (CVE-2026-72587)
function secureJsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      Pragma: 'no-cache',
      ...extraHeaders,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Content-Length Safety Check (<16KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 16384) {
      return secureJsonResponse({ error: 'PAYLOAD_TOO_LARGE' }, 413);
    }

    // 2. Client IP Extraction & Abuse Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfIp = request.headers.get('cf-connecting-ip');
    const clientIp = cfIp || realIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

    if (!checkRateLimit(clientIp)) {
      return secureJsonResponse(
        { error: 'RATE_LIMITED', message: 'Too many diagnostic requests. Please retry in 10 minutes.' },
        429,
        { 'Retry-After': '600' }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return secureJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    // 3. Validation & Spam Screen
    const validation = validateLeadSubmission(body);
    if (!validation.valid || !validation.sanitized) {
      return secureJsonResponse(
        { error: 'VALIDATION_FAILED', details: validation.errors },
        400
      );
    }

    const { sanitized } = validation;
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 4. Database Connection Check
    const supabase = getSupabaseClient();
    if (!supabase) {
      return secureJsonResponse({ error: 'INTAKE_OFFLINE' }, 503);
    }

    // 5. Supabase Insert
    const insertPayload = {
      full_name: sanitized.full_name,
      business_name: sanitized.business_name,
      email: sanitized.email,
      website: sanitized.website,
      surface: siteConfig.entryValue,
      offer: siteConfig.offerName,
      category: sanitized.category,
      linkedin_url: sanitized.linkedin_url,
      consent: sanitized.consent,
      utm: sanitized.utm,
      referred_by_surface: sanitized.referred_by_surface,
      source: siteConfig.pageUrl,
      user_agent: userAgent,
      fulfillment_tier: sanitized.fulfillment_tier,
      status: 'new',
    };

    const { data: dbData, error: dbError } = await supabase
      .from(siteConfig.tableName)
      .insert([insertPayload])
      .select('id')
      .single();

    if (dbError) {
      // Unique constraint violation (code 23505 or duplicate key)
      if (
        dbError.code === '23505' ||
        dbError.message.includes('unique constraint') ||
        dbError.message.includes('duplicate key')
      ) {
        // Return generic 200 "received" (never reveal existence to prevent lead enumeration)
        return secureJsonResponse({ ok: true, crm: 'skipped' }, 200);
      }

      console.error('[Supabase Insert Error]:', dbError);
      return secureJsonResponse({ error: 'INTAKE_STORAGE_ERROR' }, 500);
    }

    // 6. HubSpot CRM Handoff (failure-isolated)
    const hubspotResult = await syncLeadToHubspot({
      full_name: sanitized.full_name,
      business_name: sanitized.business_name,
      email: sanitized.email,
      website: sanitized.website,
      category: sanitized.category,
      fulfillment_tier: sanitized.fulfillment_tier,
      referred_by_surface: sanitized.referred_by_surface,
      utm: sanitized.utm,
    });

    // Write back hubspot_id if obtained and possible
    if (hubspotResult.contactId && dbData?.id) {
      Promise.resolve(
        supabase
          .from(siteConfig.tableName)
          .update({ hubspot_id: hubspotResult.contactId })
          .eq('id', dbData.id)
      ).catch((err: unknown) => console.warn('[HubSpot ID Write-back Warning]:', err));
    }

    // 7. Automated Inspiration Ignition Hub Fulfillment (asynchronous dispatch)
    if (dbData?.id) {
      triggerLeadFulfillment(
        dbData.id,
        {
          full_name: sanitized.full_name,
          business_name: sanitized.business_name,
          email: sanitized.email,
          website: sanitized.website,
          category: sanitized.category,
          fulfillment_tier: sanitized.fulfillment_tier,
          referred_by_surface: sanitized.referred_by_surface,
          utm: sanitized.utm,
          hubspot_id: hubspotResult.contactId,
        },
        hubspotResult
      );

      // 8. Emit signal to local MOS Command Center (non-blocking)
      sendMosSignal({
        type: 'i3_lead_intake',
        entity: 'woodlands',
        level: 'zip',
        text: `I3 System intake: ${sanitized.business_name} (${sanitized.category}) [${sanitized.fulfillment_tier}]`,
        metadata: {
          lead_id: dbData.id,
          category: sanitized.category,
          tier: sanitized.fulfillment_tier,
          crm_status: hubspotResult.status,
        },
      }).catch(() => {});
    }

    return secureJsonResponse({ ok: true, crm: hubspotResult.status, fulfillment: 'dispatched' }, 200);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Lead Intake Unhandled Error]:', message);
    return secureJsonResponse({ error: 'INTERNAL_ERROR' }, 500);
  }
}

export async function GET() {
  return secureJsonResponse({ error: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'POST' });
}

export async function PUT() {
  return secureJsonResponse({ error: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'POST' });
}

export async function DELETE() {
  return secureJsonResponse({ error: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'POST' });
}
