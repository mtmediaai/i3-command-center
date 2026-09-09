import { NextRequest, NextResponse } from 'next/server';
import { validateLeadSubmission } from '@/lib/validation';
import { getSupabaseClient } from '@/lib/supabase';
import { syncLeadToHubspot } from '@/lib/hubspot';
import { siteConfig } from '@/config/site.config';

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // 1. Validation & Spam Screen
    const validation = validateLeadSubmission(body);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { error: 'VALIDATION_FAILED', details: validation.errors },
        { status: 400 }
      );
    }

    const { sanitized } = validation;
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 2. Database Connection Check
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'INTAKE_OFFLINE' }, { status: 503 });
    }

    // 3. Supabase Insert
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
      if (dbError.code === '23505' || dbError.message.includes('unique constraint') || dbError.message.includes('duplicate key')) {
        // Return generic 200 "received" (never reveal existence to prevent lead enumeration)
        return NextResponse.json({ ok: true, crm: 'skipped' }, { status: 200 });
      }

      console.error('[Supabase Insert Error]:', dbError);
      return NextResponse.json({ error: 'INTAKE_STORAGE_ERROR' }, { status: 500 });
    }

    // 4. HubSpot CRM Handoff (failure-isolated)
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

    return NextResponse.json({ ok: true, crm: hubspotResult.status }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Lead Intake Unhandled Error]:', message);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
