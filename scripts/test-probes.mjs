import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { POST as handleLeadPost } from '../app/api/leads/route';
import { validateLeadSubmission } from '../lib/validation';
import { siteConfig } from '../config/site.config';
import { siteCopy } from '../content/site-copy';

console.log('--- RUNNING SCIENCE SQUAD QUALITY PROBES ---');

let passed = 0;
let failed = 0;

async function runAsyncProbe(name, fn) {
  try {
    await fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    failed++;
  }
}

async function runSuite() {
  // 1. Validation Probe: Valid Submission
  await runAsyncProbe('Validation Probe: Valid submission passes', () => {
    const payload = {
      full_name: 'Sterling Archer',
      business_name: 'Isis Global Estates',
      email: 'sterling@isis.com',
      website: 'https://isis.com',
      category: 'private_residential_advisor',
      consent: true,
      rendered_at: Date.now() - 5000,
      utm: {
        utm_source: 'partner-portal',
        utm_campaign: 'standard-outreach',
      },
    };

    const result = validateLeadSubmission(payload);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.sanitized.full_name, 'Sterling Archer');
    assert.strictEqual(result.sanitized.email, 'sterling@isis.com');
    assert.strictEqual(result.sanitized.fulfillment_tier, 'mass');
    assert.strictEqual(result.sanitized.referred_by_surface, 'partner-portal');
  });

  // 2. Anti-Spam Probe: Honeypot trap triggers
  await runAsyncProbe('Anti-Spam Probe: Honeypot rejection', () => {
    const payload = {
      full_name: 'Bot User',
      business_name: 'Spam Bot LLC',
      email: 'bot@spam.com',
      consent: true,
      hp_confirm: 'I am a bot',
      rendered_at: Date.now() - 5000,
    };

    const result = validateLeadSubmission(payload);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('Spam detection')));
  });

  // 3. Anti-Spam Probe: Submission faster than 3 seconds rejected
  await runAsyncProbe('Anti-Spam Probe: Fast submission (<3s) trap triggers', () => {
    const payload = {
      full_name: 'Fast Submitter',
      business_name: 'Speedy Inc',
      email: 'speed@fast.com',
      consent: true,
      rendered_at: Date.now() - 1000,
    };

    const result = validateLeadSubmission(payload);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('Submission too fast')));
  });

  // 4. Tier Probe: utm_campaign with "draft-" yields "first_round"
  await runAsyncProbe('Tier Probe: utm_campaign="draft-77380" yields fulfillment_tier="first_round"', () => {
    const payload = {
      full_name: 'Pinnacle Advisor',
      business_name: 'Dynasty Advisory Group',
      email: 'advisor@dynasty.com',
      consent: true,
      rendered_at: Date.now() - 4000,
      utm: {
        utm_campaign: 'draft-77380',
      },
    };

    const result = validateLeadSubmission(payload);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.sanitized.fulfillment_tier, 'first_round');
  });

  // 5. Tier Probe: Standard campaign yields "mass"
  await runAsyncProbe('Tier Probe: Standard campaign yields fulfillment_tier="mass"', () => {
    const payload = {
      full_name: 'General Inquirer',
      business_name: 'Standard Estates',
      email: 'general@estates.com',
      consent: true,
      rendered_at: Date.now() - 4000,
      utm: {
        utm_campaign: 'i3-lux',
      },
    };

    const result = validateLeadSubmission(payload);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.sanitized.fulfillment_tier, 'mass');
  });

  // 6. Schema.org Mesh Probe: Layout JSON-LD validates apex @id
  await runAsyncProbe('Mesh Probe: Schema.org Organization @id is apex https://mtmediaai.com/#organization', () => {
    const layoutContent = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8');
    assert.ok(
      /['"]@id['"]:\s*['"]https:\/\/mtmediaai\.com\/#organization['"]/.test(layoutContent),
      'Organization @id must be apex'
    );
    assert.ok(
      /['"]@id['"]:\s*['"]https:\/\/mtmediaai\.com\/#person['"]/.test(layoutContent),
      'Person @id must be apex'
    );
    assert.ok(
      /['"]@id['"]:\s*['"]https:\/\/i3\.mtmediaai\.com\/#website['"]/.test(layoutContent),
      'WebSite @id must be subdomain-scoped'
    );
    assert.ok(
      /['"]@id['"]:\s*['"]https:\/\/i3\.mtmediaai\.com\/#service['"]/.test(layoutContent),
      'Service @id must be subdomain-scoped'
    );
    assert.ok(
      /['"]@id['"]:\s*['"]https:\/\/i3\.mtmediaai\.com\/#offer['"]/.test(layoutContent),
      'Offer @id must be subdomain-scoped'
    );
    assert.ok(
      !layoutContent.includes('preferences') || !layoutContent.includes('sameAs'),
      'No preferences URL in sameAs'
    );
  });

  // 7. API Probe: No envs -> typed 503 { error: "INTAKE_OFFLINE" }
  await runAsyncProbe('API Probe: No envs returns typed 503 { error: "INTAKE_OFFLINE" }', async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const req = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        full_name: 'Test Advisor',
        business_name: 'Test Firm',
        email: 'test@advisor.com',
        consent: true,
        rendered_at: Date.now() - 5000,
      }),
    });

    const res = await handleLeadPost(req);
    assert.strictEqual(res.status, 503);
    const body = await res.json();
    assert.strictEqual(body.error, 'INTAKE_OFFLINE');

    if (originalUrl) process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    if (originalKey) process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
  });

  // 8. Config & Staged Copy Audit: Audit hardcoded strings
  await runAsyncProbe('Config Audit: Variable Card values consolidated in config/site.config.ts', () => {
    assert.strictEqual(siteConfig.subdomain, 'i3');
    assert.strictEqual(siteConfig.pageUrl, 'https://i3.mtmediaai.com');
    assert.strictEqual(siteConfig.repo, 'i3-command-center');
    assert.strictEqual(siteConfig.serviceName, 'Invisible Infrastructure Intelligence (I³ System)');
    assert.strictEqual(siteConfig.offerName, 'Lux Snapshot — AI Visibility Diagnostic');
    assert.strictEqual(siteConfig.offerPrice, '0.00');
    assert.strictEqual(siteConfig.entryValue, 'i3');
    assert.strictEqual(siteConfig.endcapTarget, 'https://armory.mtmediaai.com');
    assert.strictEqual(siteConfig.stagedH1, 'Rescuing Legacy From AI Erasure.');
    assert.strictEqual(siteConfig.tableName, 'leads');
  });

  await runAsyncProbe('Staged Copy Audit: Modal success copy matches specification exactly', () => {
    assert.strictEqual(
      siteCopy.modal.successMessage,
      'Request received. Your Lux Snapshot is assembled and delivered to your inbox.'
    );
    assert.strictEqual(siteCopy.hero.h1, 'Rescuing Legacy From AI Erasure.');
    // Confirm stat keys are present and empty
    assert.strictEqual(siteCopy.oldWay.stats.stat1.value, '');
    assert.strictEqual(siteCopy.oldWay.stats.stat2.value, '');
    assert.strictEqual(siteCopy.oldWay.stats.stat3.value, '');
    assert.strictEqual(siteCopy.oldWay.stats.stat4.value, '');
  });

  console.log(`\nProbe Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✓ All Science Squad Quality Probes PASSED.');
  }
}

runSuite();
