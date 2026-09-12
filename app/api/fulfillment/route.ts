import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { fulfillLead } from '@/lib/fulfillment';
import { siteConfig } from '@/config/site.config';

function secureJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      Pragma: 'no-cache',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    let body: { leadId?: string; all?: boolean };
    try {
      body = await request.json();
    } catch {
      return secureJson({ error: 'INVALID_JSON' }, 400);
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return secureJson({ error: 'DATABASE_OFFLINE' }, 503);
    }

    if (body.leadId) {
      const { data: lead, error } = await supabase
        .from(siteConfig.tableName)
        .select('*')
        .eq('id', body.leadId)
        .single();

      if (error || !lead) {
        return secureJson({ error: 'LEAD_NOT_FOUND' }, 404);
      }

      const result = await fulfillLead(lead.id, {
        full_name: lead.full_name,
        business_name: lead.business_name,
        email: lead.email,
        website: lead.website,
        category: lead.category,
        fulfillment_tier: lead.fulfillment_tier,
        referred_by_surface: lead.referred_by_surface,
        utm: lead.utm,
        hubspot_id: lead.hubspot_id,
      });

      return secureJson({ ok: true, lead: result }, 200);
    }

    if (body.all) {
      const { data: leads, error } = await supabase
        .from(siteConfig.tableName)
        .select('*')
        .is('fulfillment_url', null)
        .eq('status', 'new')
        .order('created_at', { ascending: true })
        .limit(10);

      if (error) {
        return secureJson({ error: 'QUERY_FAILED', details: error.message }, 500);
      }

      const results = [];
      for (const lead of leads || []) {
        const res = await fulfillLead(lead.id, {
          full_name: lead.full_name,
          business_name: lead.business_name,
          email: lead.email,
          website: lead.website,
          category: lead.category,
          fulfillment_tier: lead.fulfillment_tier,
          referred_by_surface: lead.referred_by_surface,
          utm: lead.utm,
          hubspot_id: lead.hubspot_id,
        });
        results.push(res);
      }

      return secureJson({ ok: true, processed: results.length, leads: results }, 200);
    }

    return secureJson({ error: 'MISSING_PARAMETERS' }, 400);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return secureJson({ error: 'INTERNAL_ERROR', details: message }, 500);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');

  if (!leadId) {
    return secureJson({ error: 'MISSING_LEAD_ID' }, 400);
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return secureJson({ error: 'DATABASE_OFFLINE' }, 503);
  }

  const { data: lead, error } = await supabase
    .from(siteConfig.tableName)
    .select('id, business_name, status, fulfillment_url, fulfilled_at, created_at')
    .eq('id', leadId)
    .single();

  if (error || !lead) {
    return secureJson({ error: 'LEAD_NOT_FOUND' }, 404);
  }

  return secureJson({ ok: true, lead }, 200);
}
