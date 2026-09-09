import { CATEGORIES, Category } from '../config/site.config';

export interface LeadSubmissionPayload {
  full_name: string;
  business_name: string;
  email: string;
  website?: string;
  category?: Category;
  linkedin_url?: string;
  consent: boolean;
  hp_confirm?: string;
  rendered_at: number;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized?: {
    full_name: string;
    business_name: string;
    email: string;
    website: string | null;
    category: Category;
    linkedin_url: string | null;
    consent: boolean;
    fulfillment_tier: 'mass' | 'first_round';
    referred_by_surface: string;
    utm: Record<string, string>;
  };
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const WEBSITE_REGEX = /^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}/i;
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\//i;

export function validateLeadSubmission(
  payload: unknown,
  submissionTime: number = Date.now()
): ValidationResult {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Invalid payload format'] };
  }

  const p = payload as Record<string, unknown>;

  // Spam Screen 1: Hidden Honeypot
  if (p.hp_confirm && String(p.hp_confirm).trim() !== '') {
    return { valid: false, errors: ['Spam detection triggered'] };
  }

  // Spam Screen 2: Render-timestamp trap (<3s)
  const renderedAt = Number(p.rendered_at);
  if (!renderedAt || isNaN(renderedAt) || submissionTime - renderedAt < 3000) {
    return { valid: false, errors: ['Submission too fast: automated entry detected'] };
  }

  // Field: full_name (2–120 chars)
  const fullName = typeof p.full_name === 'string' ? p.full_name.trim() : '';
  if (fullName.length < 2 || fullName.length > 120) {
    errors.push('Full name must be between 2 and 120 characters');
  }

  // Field: business_name (2–160 chars)
  const businessName = typeof p.business_name === 'string' ? p.business_name.trim() : '';
  if (businessName.length < 2 || businessName.length > 160) {
    errors.push('Business name must be between 2 and 160 characters');
  }

  // Field: email
  const email = typeof p.email === 'string' ? p.email.trim().toLowerCase() : '';
  if (!EMAIL_REGEX.test(email) || email.length > 255) {
    errors.push('A valid email address is required');
  }

  // Field: website (optional)
  let website: string | null = null;
  if (p.website && typeof p.website === 'string' && p.website.trim() !== '') {
    const rawWeb = p.website.trim();
    if (!WEBSITE_REGEX.test(rawWeb)) {
      errors.push('Website must begin with http:// or https:// and include a valid domain');
    } else {
      website = rawWeb;
    }
  }

  // Field: linkedin_url (optional)
  let linkedinUrl: string | null = null;
  if (p.linkedin_url && typeof p.linkedin_url === 'string' && p.linkedin_url.trim() !== '') {
    const rawLi = p.linkedin_url.trim();
    if (!LINKEDIN_REGEX.test(rawLi)) {
      errors.push('LinkedIn URL must begin with https://linkedin.com/ or https://www.linkedin.com/');
    } else {
      linkedinUrl = rawLi;
    }
  }

  // Field: category (in config enum, default unspecified)
  let category: Category = 'unspecified';
  if (p.category && typeof p.category === 'string') {
    if ((CATEGORIES as readonly string[]).includes(p.category)) {
      category = p.category as Category;
    } else {
      errors.push('Invalid category specified');
    }
  }

  // Field: consent (must be strictly true)
  if (p.consent !== true) {
    errors.push('Explicit consent is required');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // UTM Processing & Tiering Rule
  const rawUtm = (typeof p.utm === 'object' && p.utm !== null ? p.utm : {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawUtm)) {
    if (typeof v === 'string' && v.trim() !== '') {
      utm[k] = v.trim();
    }
  }

  const utmCampaign = utm.utm_campaign || '';
  const fulfillmentTier: 'mass' | 'first_round' = utmCampaign.startsWith('draft-')
    ? 'first_round'
    : 'mass';

  const utmSource = utm.utm_source || '';
  const referredBySurface = utmSource && utmSource !== 'i3' ? utmSource : 'direct';

  return {
    valid: true,
    errors: [],
    sanitized: {
      full_name: fullName,
      business_name: businessName,
      email,
      website,
      category,
      linkedin_url: linkedinUrl,
      consent: true,
      fulfillment_tier: fulfillmentTier,
      referred_by_surface: referredBySurface,
      utm,
    },
  };
}
