export interface HubspotLeadData {
  full_name: string;
  business_name: string;
  email: string;
  website?: string | null;
  category: string;
  fulfillment_tier: 'mass' | 'first_round';
  referred_by_surface: string;
  utm?: Record<string, string>;
}

export interface HubspotSyncResult {
  status: 'synced' | 'deferred' | 'skipped';
  contactId?: string;
  taskId?: string;
  dealId?: string;
  error?: string;
}

export async function syncLeadToHubspot(lead: HubspotLeadData): Promise<HubspotSyncResult> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    return { status: 'skipped' };
  }

  try {
    const contactId = await upsertContact(token, lead);
    if (!contactId) {
      return { status: 'deferred', error: 'Failed to obtain contact ID' };
    }

    const taskId = await createFulfillmentTask(token, contactId, lead.fulfillment_tier, lead.business_name);
    const dealId = await createOrUpdateDeal(token, contactId, lead);
    return {
      status: 'synced',
      contactId,
      taskId: taskId || undefined,
      dealId: dealId || undefined,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[HubSpot Sync Error]:', message);
    return { status: 'deferred', error: message };
  }
}

async function upsertContact(token: string, lead: HubspotLeadData): Promise<string | null> {
  // Split full name
  const nameParts = lead.full_name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const utmSource = lead.utm?.utm_source || 'i3';
  const utmMedium = lead.utm?.utm_medium || 'landing';
  const utmCampaign = lead.utm?.utm_campaign || 'i3-lux';

  const properties: Record<string, string> = {
    email: lead.email,
    firstname: firstName,
    lastname: lastName,
    company: lead.business_name,
    website: lead.website || '',
    lifecyclestage: 'lead',
    hs_lead_status: 'NEW',
    armory_entry_hub: 'i3',
    referred_by_surface: lead.referred_by_surface || (utmSource !== 'i3' ? utmSource : 'direct'),
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    lux_tier: lead.fulfillment_tier,
    page_category: lead.category,
    lead_source: 'https://i3.mtmediaai.com',
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // 1. Search for existing contact by email
  let contactId: string | null = null;
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
                value: lead.email,
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
  } catch (searchErr) {
    console.warn('[HubSpot Search Warning]:', searchErr);
  }

  // Helper to execute upsert request with graceful fallback for custom property errors
  async function sendProperties(url: string, method: 'POST' | 'PATCH', props: Record<string, string>) {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ properties: props }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      // If error indicates a missing custom property, strip custom properties and retry with standard props
      if (res.status === 400 && errBody.includes('PROPERTY_DOESNT_EXIST')) {
        console.warn('[HubSpot Missing Property Warning - retrying with base properties]:', errBody);
        const baseProps: Record<string, string> = {
          email: props.email,
          firstname: props.firstname,
          lastname: props.lastname,
          company: props.company,
          website: props.website,
          lifecyclestage: props.lifecyclestage,
          hs_lead_status: props.hs_lead_status,
        };
        const retryRes = await fetch(url, {
          method,
          headers,
          body: JSON.stringify({ properties: baseProps }),
        });
        if (!retryRes.ok) {
          throw new Error(`HubSpot upsert retry failed (${retryRes.status}): ${await retryRes.text()}`);
        }
        return retryRes.json();
      }
      throw new Error(`HubSpot upsert failed (${res.status}): ${errBody}`);
    }

    return res.json();
  }

  if (contactId) {
    await sendProperties(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, 'PATCH', properties);
    return contactId;
  } else {
    const created = await sendProperties('https://api.hubapi.com/crm/v3/objects/contacts', 'POST', properties);
    return created?.id || null;
  }
}

async function createFulfillmentTask(
  token: string,
  contactId: string,
  tier: 'mass' | 'first_round',
  businessName: string
): Promise<string | null> {
  const taskSubject = `Assemble Inspiration Ignition Hub: ${businessName} (${tier})`;
  const now = new Date();
  const dueDate = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48h SLA

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_task_subject: taskSubject,
          hs_task_status: 'NOT_STARTED',
          hs_task_priority: tier === 'first_round' ? 'HIGH' : 'MEDIUM',
          hs_timestamp: dueDate.toISOString(),
          hs_task_body: `Fulfillment queue task for ${businessName}. SLA: 24 to 48 hours. Ops to assemble shareable Inspiration Ignition Hub (Gemini Notebook / NotebookLM) carrying timestamped Perplexity AI Visibility Snapshot under the MTM Anti-Static Deliverables Doctrine.`,
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 204, // contact_to_task association ID in HubSpot v3
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.warn('[HubSpot Task Warning - non-fatal]:', await res.text());
      return null;
    }

    const data = await res.json();
    return data?.id || null;
  } catch (err) {
    console.warn('[HubSpot Task Creation Warning]:', err);
    return null;
  }
}

async function createOrUpdateDeal(
  token: string,
  contactId: string,
  lead: HubspotLeadData
): Promise<string | null> {
  const dealName = `[I3 Diagnostic] ${lead.business_name} (${lead.category})`;
  const now = new Date();
  const closeDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 day target

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const properties: Record<string, string> = {
    dealname: dealName,
    pipeline: 'default',
    dealstage: 'appointmentscheduled',
    amount: '0',
    closedate: closeDate.toISOString(),
    description: `I3 System Lux Diagnostic Lead for ${lead.full_name} (${lead.email}). Category: ${lead.category}. Referred by: ${lead.referred_by_surface}. Tier: ${lead.fulfillment_tier}. Target Portal: 44694233 Dashboard: 13393897.`,
  };

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        properties,
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 3, // deal_to_contact association ID in HubSpot v3
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      // Fallback: create deal without association if association error occurs
      if (res.status === 400) {
        console.warn('[HubSpot Deal Fallback - attempting basic deal creation]:', errText);
        const fallbackRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            properties: {
              dealname: dealName,
              pipeline: 'default',
              dealstage: 'appointmentscheduled',
              amount: '0',
            },
          }),
        });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return fallbackData?.id || null;
        }
      }
      console.warn('[HubSpot Deal Creation Warning - non-fatal]:', errText);
      return null;
    }

    const data = await res.json();
    return data?.id || null;
  } catch (err) {
    console.warn('[HubSpot Deal Creation Warning]:', err);
    return null;
  }
}

export async function updateLeadFulfillment(
  contactId: string,
  fulfillmentUrl: string,
  taskId?: string,
  dealId?: string
): Promise<boolean> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return false;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Update Contact properties with fulfillment URL
    await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        properties: {
          fulfillment_url: fulfillmentUrl,
          hs_lead_status: 'IN_PROGRESS',
        },
      }),
    });

    // 2. If taskId is provided, mark task COMPLETED with deliverable link
    if (taskId) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/tasks/${taskId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          properties: {
            hs_task_status: 'COMPLETED',
            hs_task_body: `Inspiration Ignition Hub delivered. Shareable workspace: ${fulfillmentUrl}`,
          },
        }),
      });
    }

    // 3. If dealId is provided, update deal stage and description
    if (dealId) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${dealId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          properties: {
            dealstage: 'decisionmakerboughtin',
            description: `Deliverable generated: ${fulfillmentUrl}`,
          },
        }),
      });
    }

    return true;
  } catch (err: unknown) {
    console.warn('[HubSpot Fulfillment Update Warning]:', err);
    return false;
  }
}
