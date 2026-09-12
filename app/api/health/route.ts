import { NextResponse } from 'next/server';

export async function GET() {
  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasHubspot = Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN);

  return NextResponse.json({
    service: 'i3-command-center',
    node: 'I3 System Landing Page',
    status: 'ok',
    as_of: new Date().toISOString(),
    port: 3001,
    environment: process.env.NODE_ENV || 'development',
    integrations: {
      supabase: hasSupabase ? 'connected' : 'unconfigured',
      hubspot: hasHubspot ? 'connected' : 'awaiting_token',
      hubspot_target: 'Portal 44694233 / Dashboard 13393897',
      mos_link: 'http://127.0.0.1:8721',
      fulfillment: 'active',
    },
  });
}
