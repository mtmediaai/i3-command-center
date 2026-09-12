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

  // 7. API Probe: No envs -> typed 503 with CVE-2026-72587 Cache-Control headers
  await runAsyncProbe('API Probe: No envs returns typed 503 { error: "INTAKE_OFFLINE" } with no-store headers', async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const req = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'x-forwarded-for': '192.168.1.50' },
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
    const cacheControl = res.headers.get('cache-control') || '';
    assert.ok(cacheControl.includes('no-store'), 'Must include no-store for CVE mitigation');
    const body = await res.json();
    assert.strictEqual(body.error, 'INTAKE_OFFLINE');

    if (originalUrl) process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    if (originalKey) process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
  });

  // 8. API Probe: Rate limiter triggers 429 on abuse
  await runAsyncProbe('API Probe: Rate limiter enforces maximum requests per window', async () => {
    const testIp = '10.0.0.99';
    let lastRes;

    // Send 5 rapid requests from testIp (consuming allowance)
    for (let i = 0; i < 5; i++) {
      const req = new NextRequest('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: { 'x-forwarded-for': testIp },
        body: JSON.stringify({
          full_name: 'Test User',
          business_name: 'Test Co',
          email: 'test@co.com',
          consent: true,
          rendered_at: Date.now() - 5000,
        }),
      });
      lastRes = await handleLeadPost(req);
    }

    // 6th request from testIp must trigger rate limit
    const burstReq = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'x-forwarded-for': testIp },
      body: JSON.stringify({
        full_name: 'Test User',
        business_name: 'Test Co',
        email: 'test@co.com',
        consent: true,
        rendered_at: Date.now() - 5000,
      }),
    });
    const burstRes = await handleLeadPost(burstReq);
    assert.strictEqual(burstRes.status, 429, 'Excess request must return 429');
    const burstBody = await burstRes.json();
    assert.strictEqual(burstBody.error, 'RATE_LIMITED');
    assert.ok(burstRes.headers.get('retry-after'), 'Must include Retry-After header');
  });

  // 9. Config Audit: Variable Card values consolidated in config/site.config.ts
  await runAsyncProbe('Config Audit: Variable Card values consolidated in config/site.config.ts', () => {
    assert.strictEqual(siteConfig.subdomain, 'i3');
    assert.strictEqual(siteConfig.pageUrl, 'https://i3.mtmediaai.com');
    assert.strictEqual(siteConfig.repo, 'i3-command-center');
    assert.strictEqual(siteConfig.serviceName, 'Invisible Infrastructure Intelligence (I³ System)');
    assert.strictEqual(siteConfig.offerName, 'Lux Snapshot: AI Visibility Diagnostic');
    assert.strictEqual(siteConfig.offerPrice, '0.00');
    assert.strictEqual(siteConfig.entryValue, 'i3');
    assert.strictEqual(siteConfig.endcapTarget, 'https://armory.mtmediaai.com');
    assert.strictEqual(siteConfig.stagedH1, 'Rescuing Legacy From AI Erasure.');
    assert.strictEqual(siteConfig.tableName, 'leads');
    assert.strictEqual(siteConfig.preferredSourcesEnabled, false, 'Preferred Sources must remain gated');
  });

  // 10. Phase B Copy Deck Audit: Validate values populated from Phase B deck
  await runAsyncProbe('Phase B Copy Audit: Modal success copy and stats match specification exactly', () => {
    assert.strictEqual(
      siteCopy.modal.successMessage,
      'Request received. Your Lux Snapshot is assembled and delivered to your inbox.'
    );
    assert.strictEqual(siteCopy.hero.h1, 'Rescuing Legacy From AI Erasure.');
    assert.strictEqual(siteCopy.oldWay.heading, 'The Front Door Moved.');
    // Confirm stat keys are populated with the Phase B values
    assert.strictEqual(siteCopy.oldWay.stats.stat1.value, '58.5% → <1 in 3');
    assert.strictEqual(siteCopy.oldWay.stats.stat2.value, '−91%');
    assert.strictEqual(siteCopy.oldWay.stats.stat3.value, '13.5M → 8.6M');
    assert.strictEqual(siteCopy.oldWay.stats.stat4.value, '−58%');
  });

  // 11. Social Proof Carousel Probe: 5 items with Master Equation and verified statistics
  await runAsyncProbe('Social Proof Carousel Probe: 5 proof items present with Master Equation', () => {
    assert.ok(Array.isArray(siteCopy.proofCarousel), 'proofCarousel must be an array');
    assert.strictEqual(siteCopy.proofCarousel.length, 5, 'Must contain 5 proof items');
    assert.strictEqual(
      siteCopy.proofCarousel[0].headline,
      'AI Invisibility + AI Erasure = AI Brand Ignorance'
    );
    assert.strictEqual(siteCopy.proofCarousel[0].badge, 'CORE THREAT FORMULA');
    assert.strictEqual(siteCopy.proofCarousel[1].headline, '58.5% → <1 in 3');
    assert.strictEqual(siteCopy.proofCarousel[2].headline, '13.5M → 8.6M');
    assert.strictEqual(siteCopy.proofCarousel[3].headline, '−58% Click Erosion');
    assert.strictEqual(siteCopy.proofCarousel[4].headline, '−91% Traffic Wipeout');
  });

  // 12. Zero Em-Dash Probe: Ensure no em-dashes exist across copy and codebase
  await runAsyncProbe('Zero Em-Dash Probe: Ensure zero em-dashes exist in site-copy and site.config', () => {
    const copyString = JSON.stringify(siteCopy);
    assert.ok(!copyString.includes('\u2014'), 'siteCopy must contain zero em-dashes');
    assert.ok(!copyString.includes('&' + 'mdash;'), 'siteCopy must contain zero mdash entities');
    const configString = JSON.stringify(siteConfig);
    assert.ok(!configString.includes('\u2014'), 'siteConfig must contain zero em-dashes');
  });

  console.log(`\nProbe Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✓ All Science Squad Quality Probes PASSED.');
  }
}

runSuite();
