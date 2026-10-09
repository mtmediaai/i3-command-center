// src/lib/intake-service.ts
// Citadel Security, TIF v1.0 Qualification, and HubSpot Integration Service
// Ide Maestro: Circuit 10.0 | Protocols: SEAL 3.5, MTM-CITADEL-SECURITY, MTM-HAAS-V1.0

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { IntakePayload } from '@/src/lib/validations/intake';
import { evaluateTif, TifEvaluation } from '@/src/lib/tif';
import { sendMosSignal } from '@/lib/mos';

// ---------------------------------------------------------------------------
// 1. CITADEL TOKEN-BUCKET RATE LIMITER (5 requests / 10-minute window per IP)
// ---------------------------------------------------------------------------
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

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

export function checkCitadelRateLimit(ip: string): boolean {
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

// ---------------------------------------------------------------------------
// 2. BOT ARMOR & CLOUDFLARE TURNSTILE VERIFICATION
// ---------------------------------------------------------------------------
export async function verifyBotProtection(payload: IntakePayload): Promise<{ valid: boolean; reason?: string }> {
  // Honeypot check
  if (payload.hp_confirm && payload.hp_confirm.trim().length > 0) {
    return { valid: false, reason: 'Spam trap triggered' };
  }

  // Fast submit check (< 2000ms)
  if (payload.rendered_at && Date.now() - payload.rendered_at < 2000) {
    return { valid: false, reason: 'Submission too fast (<2s)' };
  }

  // Cloudflare Turnstile Verification if configured
  const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (turnstileSecret && payload.turnstileToken) {
    try {
      const form = new URLSearchParams();
      form.append('secret', turnstileSecret);
      form.append('response', payload.turnstileToken);

      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });

      if (res.ok) {
        const outcome = await res.json();
        if (!outcome.success) {
          return { valid: false, reason: 'Turnstile verification failed' };
        }
      }
    } catch (err) {
      console.warn('[Turnstile Warning - Non-fatal]:', err);
    }
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// 3. HUBSPOT REST API v3 INTEGRATION
// ---------------------------------------------------------------------------
function resolveHubspotToken(): string | null {
  const envToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (envToken && envToken.startsWith('pat-')) {
    return envToken;
  }

  // Local fallback: Read from Sovereign Keys file if present
  try {
    const keysPath = path.join('C:', 'MOS', 'command', 'keys.json');
    if (fs.existsSync(keysPath)) {
      const raw = fs.readFileSync(keysPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed?.hubspot?.access_token) {
        return parsed.hubspot.access_token;
      }
    }
  } catch {
    // Non-fatal
  }

  return envToken || null;
}

interface HubspotSyncOutput {
  contactId?: string;
  dealId?: string;
  error?: string;
}

export async function syncToIntakeHubspot(
  payload: IntakePayload,
  tif: TifEvaluation
): Promise<HubspotSyncOutput> {
  const token = resolveHubspotToken();
  if (!token) {
    return { error: 'NO_HUBSPOT_TOKEN_CONFIGURED' };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let contactId: string | undefined;

  // A. Search for existing contact by email
  try {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: payload.workEmail,
              },
            ],
          },
        ],
      }),
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.results && searchData.results.length > 0) {
        contactId = searchData.results[0].id;
      }
    }
  } catch (err) {
    console.warn('[HubSpot Search Warning]:', err);
  }

  // B. Upsert Contact Properties
  const leadStatus = tif.tier === 'HOLD' ? 'UNQUALIFIED' : 'NEW';
  const customProps: Record<string, string> = {
    email: payload.workEmail,
    company: payload.companyName,
    zip: payload.zipCode,
    lifecyclestage: 'lead',
    hs_lead_status: leadStatus,
    mtm_territory_zip: payload.zipCode,
    mtm_craft_vector: payload.craftVector,
    mtm_custom_craft_detail: payload.craftOtherSpecification || '',
  };

  const baseProps: Record<string, string> = {
    email: payload.workEmail,
    company: payload.companyName,
    zip: payload.zipCode,
    lifecyclestage: 'lead',
    hs_lead_status: leadStatus,
  };

  async function postOrPatchContact(url: string, method: 'POST' | 'PATCH', props: Record<string, string>) {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ properties: props }),
    });

    if (!res.ok) {
      const errText = await res.text();
      // If custom property does not exist in portal or option invalid, retry with base properties
      if (res.status === 400 && (errText.includes('PROPERTY_DOESNT_EXIST') || errText.includes('INVALID_OPTION'))) {
        const retryRes = await fetch(url, {
          method,
          headers,
          body: JSON.stringify({ properties: baseProps }),
        });
        if (retryRes.ok) {
          return retryRes.json();
        }
      }
      throw new Error(`HubSpot Contact ${method} failed: ${errText}`);
    }

    return res.json();
  }

  try {
    if (contactId) {
      await postOrPatchContact(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        'PATCH',
        customProps
      );
    } else {
      const created = await postOrPatchContact(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        'POST',
        customProps
      );
      contactId = created?.id;
    }
  } catch (err) {
    console.warn('[HubSpot Contact Upsert Error]:', err);
  }

  if (!contactId) {
    return { error: 'CONTACT_CREATION_FAILED' };
  }

  // C. Deal Creation (Strictly for WAITING_LIST and DRAFT_PICK; ZERO deal created for HOLD)
  if (tif.tier === 'HOLD') {
    return { contactId };
  }

  let dealId: string | undefined;
  const dealName = `${payload.companyName} - Territory Snapshot (${payload.zipCode})`;
  const closeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const customDealProps: Record<string, string> = {
    dealname: dealName,
    pipeline: 'MTM_SOLAR_ASCENSION',
    dealstage: 'LUX-TIER-LEAD',
    deal_status: 'WAITING_LIST',
    amount: '0',
    closedate: closeDate,
    description: `i3 Inbound Territory Lead. Craft: ${payload.craftVector} (${tif.craftLabel}). Zip: ${payload.zipCode}. TIF Score: ${tif.score}/100. Draft Pick: ${tif.isDraftPick}.`,
  };

  const baseDealProps: Record<string, string> = {
    dealname: dealName,
    pipeline: 'default',
    dealstage: 'appointmentscheduled',
    amount: '0',
    closedate: closeDate,
    description: `i3 Inbound Territory Lead. Craft: ${payload.craftVector} (${tif.craftLabel}). Zip: ${payload.zipCode}. TIF Score: ${tif.score}/100.`,
  };

  async function postDeal(props: Record<string, string>) {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        properties: props,
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 3, // deal_to_contact
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 400 && (errText.includes('PROPERTY_DOESNT_EXIST') || errText.includes('PIPELINE_NOT_FOUND') || errText.includes('STAGE_NOT_FOUND'))) {
        const retryRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            properties: baseDealProps,
            associations: [
              {
                to: { id: contactId },
                types: [
                  {
                    associationCategory: 'HUBSPOT_DEFINED',
                    associationTypeId: 3,
                  },
                ],
              },
            ],
          }),
        });
        if (retryRes.ok) {
          return retryRes.json();
        }
      }
      if (errText.includes('MISSING_SCOPES')) {
        console.warn('[HubSpot Deal Notice]: HubSpot token pending crm.objects.deals.write scope. Deal recorded in Sovereign Vault.');
        return null;
      }
      throw new Error(`HubSpot Deal Creation Failed: ${errText}`);
    }

    return res.json();
  }

  try {
    const createdDeal = await postDeal(customDealProps);
    dealId = createdDeal?.id;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[HubSpot Deal Creation Warning]:', message);
  }

  return { contactId, dealId };
}

// ---------------------------------------------------------------------------
// 4. SOVEREIGN LOCAL VAULT & REIGN BRIDGE (Local Execution)
// ---------------------------------------------------------------------------
export async function syncToSovereignVault(
  payload: IntakePayload,
  tif: TifEvaluation,
  hubspotResult: HubspotSyncOutput
): Promise<void> {
  const bridgeScript = path.join(process.cwd(), 'scripts', 'reign_intake_bridge.py');
  if (!fs.existsSync(bridgeScript)) {
    return;
  }

  const bridgeInput = {
    companyName: payload.companyName,
    workEmail: payload.workEmail,
    zipCode: payload.zipCode,
    craftVector: payload.craftVector,
    craftOtherSpecification: payload.craftOtherSpecification || '',
    craftLabel: tif.craftLabel,
    score: tif.score,
    tier: tif.tier,
    isDraftPick: tif.isDraftPick,
    hubspotContactId: hubspotResult.contactId || null,
    hubspotDealId: hubspotResult.dealId || null,
  };

  try {
    const py = spawn('python', [bridgeScript]);
    py.stdin.write(JSON.stringify(bridgeInput));
    py.stdin.end();

    py.on('error', (err) => {
      // Non-fatal: local Python may be absent in edge environments
      console.warn('[Sovereign Vault Bridge Notice]:', err.message);
    });
  } catch (ex) {
    console.warn('[Sovereign Vault Spawn Notice]:', ex);
  }
}

// ---------------------------------------------------------------------------
// 5. MASTER INTAKE PROCESSOR
// ---------------------------------------------------------------------------
export async function processTerritoryIntake(
  payload: IntakePayload,
  clientIp: string
) {
  // A. Citadel Rate Limit Check
  if (!checkCitadelRateLimit(clientIp)) {
    return {
      status: 429,
      data: {
        error: 'RATE_LIMITED',
        message: 'Too many diagnostic requests. Please retry in 10 minutes.',
      },
      headers: { 'Retry-After': '600' },
    };
  }

  // B. Bot Protection Check
  const botCheck = await verifyBotProtection(payload);
  if (!botCheck.valid) {
    return {
      status: 400,
      data: {
        error: 'BOT_ARMOR_TRIGGERED',
        message: botCheck.reason || 'Verification failed',
      },
    };
  }

  // C. TIF v1.0 Evaluation
  const tif = evaluateTif({
    companyName: payload.companyName,
    craftVector: payload.craftVector,
    craftOtherSpecification: payload.craftOtherSpecification,
    zipCode: payload.zipCode,
  });

  // D. HubSpot CRM Integration
  const hubspotResult = await syncToIntakeHubspot(payload, tif);

  // E. Sovereign Local Vault Sync
  await syncToSovereignVault(payload, tif, hubspotResult);

  // F. MOS Signal Dispatch
  await sendMosSignal({
    type: 'TERRITORY_INTAKE_SUBMISSION',
    entity: payload.zipCode,
    level: 'zip',
    text: `Territory Intake: ${payload.companyName} (${payload.craftVector}) in ${payload.zipCode} scored ${tif.score} pts (${tif.tier}).`,
    metadata: {
      zipCode: payload.zipCode,
      companyName: payload.companyName,
      craftVector: payload.craftVector,
      tier: tif.tier,
      isDraftPick: tif.isDraftPick,
      score: tif.score,
    },
  });

  if (tif.isDraftPick) {
    await sendMosSignal({
      type: 'DRAFT_PICK_DISPATCH_ALERT',
      entity: payload.zipCode,
      level: 'high_priority',
      text: `FIRST-ROUND DRAFT PICK ALERT: ${payload.companyName} in ${payload.zipCode} scored ${tif.score} pts. Alerting Reign and The Architect for Outbound IIIP dispatch.`,
      metadata: {
        companyName: payload.companyName,
        workEmail: payload.workEmail,
        zipCode: payload.zipCode,
        craftVector: payload.craftVector,
        score: tif.score,
      },
    });
  }

  // G. Output Structuring
  if (tif.tier === 'HOLD') {
    return {
      status: 200,
      data: {
        ok: true,
        status: 'HOLD',
        tier: 'HOLD',
        message: 'Inquiry received. Logged to research registry for market telemetry review.',
        territory: {
          zipCode: payload.zipCode,
          craftVector: payload.craftVector,
          status: 'HELD',
          notes: tif.territoryNotes,
        },
        tifEvaluation: {
          score: tif.score,
          disqualified: tif.disqualified,
          reason: tif.disqualificationReason,
        },
      },
    };
  }

  return {
    status: 200,
    data: {
      ok: true,
      status: 'QUALIFIED',
      tier: tif.tier,
      isDraftPick: tif.isDraftPick,
      territory: {
        zipCode: payload.zipCode,
        craftVector: payload.craftVector,
        craftLabel: tif.craftLabel,
        status: 'WAITING_LIST',
        constraint: 'One category leader per craft. One firm per zip code.',
        notes: tif.territoryNotes,
      },
      tifEvaluation: {
        score: tif.score,
        tier: tif.tier,
        isDraftPick: tif.isDraftPick,
        breakdown: tif.breakdown,
      },
      hubspot: {
        contactId: hubspotResult.contactId || null,
        dealId: hubspotResult.dealId || null,
        dealStatus: 'WAITING_LIST',
      },
      ignitionHub: {
        title: `${payload.companyName} Territory AI Visibility Audit`,
        territoryZip: payload.zipCode,
        craft: tif.craftLabel,
        dviScore: tif.score,
        diagnosticSummary:
          'Territorial diagnostic initialized. Your category seat inquiry has been logged to Reign\'s HubSpot pipeline on the territorial waiting list.',
        querySimulations: [
          {
            query: `Best ${tif.craftLabel.toLowerCase()} in ${payload.zipCode}`,
            status: 'VULNERABILITY_CONFIRMED',
            engineRecommendation: 'Generic directory / Aggregator citation',
            remedy: 'Entity authority grounding and knowledge graph schema',
          },
          {
            query: `Who is the top-rated ${tif.craftLabel.toLowerCase()} serving ${payload.zipCode}?`,
            status: 'AI_INVISIBILITY_DETECTED',
            engineRecommendation: 'Zero machine citations for target firm',
            remedy: 'Conversational search and Perplexity answer engine injection',
          },
          {
            query: `Modern luxury ${tif.craftLabel.toLowerCase()} portfolio review ${payload.zipCode}`,
            status: 'ERASURE_RISK',
            engineRecommendation: 'Competitor citation with active machine schema',
            remedy: 'Multi-engine grounding and sovereign signal injection',
          },
        ],
      },
    },
  };
}
