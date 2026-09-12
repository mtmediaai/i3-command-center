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
    return { status: 'synced', contactId, taskId: taskId || undefined };
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
  const taskSubject = `Assemble Lux Snapshot: ${businessName} (${tier})`;
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
          hs_task_body: `Fulfillment queue task for ${businessName}. SLA: 24–48h. Ops to assemble shareable Gemini/NotebookLM notebook carrying Perplexity-derived AI Visibility Snapshot.`,
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
