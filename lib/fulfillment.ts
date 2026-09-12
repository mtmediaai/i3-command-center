import { spawn } from 'node:child_process';
import path from 'node:path';
import { getSupabaseClient } from './supabase';
import { updateLeadFulfillment, HubspotSyncResult } from './hubspot';
import { siteConfig } from '@/config/site.config';

export interface LeadFulfillmentInput {
  id?: string;
  full_name: string;
  business_name: string;
  email: string;
  website?: string | null;
  category?: string;
  fulfillment_tier?: 'mass' | 'first_round';
  referred_by_surface?: string;
  utm?: Record<string, string>;
  hubspot_id?: string;
}

export interface FulfillmentResult {
  success: boolean;
  leadId: string;
  fulfillmentUrl: string;
  isNotebookLM: boolean;
  fulfilledAt: string;
  error?: string;
}

/**
 * Execute Python NotebookLM worker script.
 * Asynchronously generates the Inspiration Ignition Hub via notebooklm-py.
 */
export async function executeNotebookLMWorker(payload: LeadFulfillmentInput): Promise<{
  fulfillmentUrl: string;
  isNotebookLM: boolean;
}> {
  const scriptPath = path.join(process.cwd(), 'scripts', 'fulfill_ignition_hub.py');
  const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || 'https://i3.mtmediaai.com').replace(/\/$/, '');
  const fallbackUrl = `${siteBase}/hub/${payload.id || 'preview'}`;

  return new Promise((resolve) => {
    try {
      const jsonArg = JSON.stringify({
        id: payload.id,
        full_name: payload.full_name,
        business_name: payload.business_name,
        email: payload.email,
        website: payload.website,
        category: payload.category,
        hubspot_id: payload.hubspot_id,
      });

      const child = spawn('python', [scriptPath, '--lead-json', jsonArg], {
        cwd: process.cwd(),
        env: { ...process.env },
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      const timeout = setTimeout(() => {
        child.kill();
        console.warn('[Fulfillment Worker Timeout]: Python process timed out after 35s. Using fallback URL.');
        resolve({ fulfillmentUrl: fallbackUrl, isNotebookLM: false });
      }, 35000);

      child.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0 && stdout) {
          try {
            // Find JSON in output
            const matches = stdout.match(/\{[\s\S]*"fulfillment_url"[\s\S]*\}/);
            if (matches) {
              const parsed = JSON.parse(matches[0]);
              return resolve({
                fulfillmentUrl: parsed.fulfillment_url || fallbackUrl,
                isNotebookLM: Boolean(parsed.is_notebooklm),
              });
            }
          } catch (jsonErr) {
            console.warn('[Fulfillment Worker Parse Warning]:', jsonErr);
          }
        }
        if (stderr) {
          console.warn('[Fulfillment Worker Stderr]:', stderr.trim());
        }
        resolve({ fulfillmentUrl: fallbackUrl, isNotebookLM: false });
      });

      child.on('error', (err) => {
        clearTimeout(timeout);
        console.warn('[Fulfillment Worker Spawn Error]:', err.message);
        resolve({ fulfillmentUrl: fallbackUrl, isNotebookLM: false });
      });
    } catch (spawnEx) {
      console.warn('[Fulfillment Worker Exception]:', spawnEx);
      resolve({ fulfillmentUrl: fallbackUrl, isNotebookLM: false });
    }
  });
}

/**
 * Fulfill a single lead:
 * 1. Executes Python worker to create NotebookLM notebook or generate hosted hub URL.
 * 2. Writes fulfillment_url and fulfilled_at to Supabase.
 * 3. Writes fulfillment_url to HubSpot Contact and completes task.
 */
export async function fulfillLead(
  leadId: string,
  data: LeadFulfillmentInput,
  hubspotResult?: HubspotSyncResult
): Promise<FulfillmentResult> {
  const payload: LeadFulfillmentInput = {
    ...data,
    id: leadId,
    hubspot_id: data.hubspot_id || hubspotResult?.contactId,
  };

  const nowIso = new Date().toISOString();

  // 1. Run Python worker
  const workerResult = await executeNotebookLMWorker(payload);
  const fulfillmentUrl = workerResult.fulfillmentUrl;

  // 2. Update Supabase
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from(siteConfig.tableName)
        .update({
          fulfillment_url: fulfillmentUrl,
          fulfilled_at: nowIso,
          status: 'fulfillment',
        })
        .eq('id', leadId);
    } catch (dbErr) {
      console.warn('[Fulfillment DB Update Warning]:', dbErr);
    }
  }

  // 3. Update HubSpot
  const contactId = payload.hubspot_id;
  if (contactId) {
    try {
      await updateLeadFulfillment(contactId, fulfillmentUrl, hubspotResult?.taskId, hubspotResult?.dealId);
    } catch (hsErr) {
      console.warn('[Fulfillment HubSpot Update Warning]:', hsErr);
    }
  }

  return {
    success: true,
    leadId,
    fulfillmentUrl,
    isNotebookLM: workerResult.isNotebookLM,
    fulfilledAt: nowIso,
  };
}

/**
 * Fire-and-forget fulfillment trigger:
 * Starts the fulfillment process asynchronously so the intake HTTP response returns promptly.
 */
export function triggerLeadFulfillment(
  leadId: string,
  data: LeadFulfillmentInput,
  hubspotResult?: HubspotSyncResult
): void {
  // Execute in microtask / background promise
  Promise.resolve().then(async () => {
    try {
      await fulfillLead(leadId, data, hubspotResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Async Fulfillment Unhandled Error]:', msg);
    }
  });
}
