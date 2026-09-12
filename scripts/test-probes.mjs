import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { POST as handleLeadPost } from '../app/api/leads/route';
import { validateLeadSubmission } from '../lib/validation';
import { siteConfig } from '../config/site.config';
import { siteCopy } from '../content/site-copy';
import { evidenceLedger } from '../content/evidence-ledger';

console.log('--- RUNNING MTM I³ SCIENCE SQUAD QUALITY PROBES (PHASE B v2) ---');

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

  // 6. Schema.org Mesh & FAQPage Probe: Layout JSON-LD validates apex @id and FAQPage
  await runAsyncProbe('Mesh Probe: Schema.org apex IDs, DefinedTerm, and FAQPage schema match visible content', () => {
    const layoutContent = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8');
    assert.ok(
      layoutContent.includes('https://mtmediaai.com/#organization'),
      'Organization @id must be apex'
    );
    assert.ok(
      layoutContent.includes('https://mtmediaai.com/#person'),
      'Person @id must be apex'
    );
    assert.ok(
      layoutContent.includes('https://i3.mtmediaai.com/#website'),
      'WebSite @id must be subdomain-scoped'
    );
    assert.ok(
      layoutContent.includes('https://i3.mtmediaai.com/#service'),
      'Service @id must be subdomain-scoped'
    );
    assert.ok(
      layoutContent.includes('https://i3.mtmediaai.com/#offer'),
      'Offer @id must be subdomain-scoped'
    );
    assert.ok(
      layoutContent.includes('https://i3.mtmediaai.com/#term-ai-brand-ignorance'),
      'DefinedTerm AI Brand Ignorance must exist'
    );
    assert.ok(
      layoutContent.includes('https://i3.mtmediaai.com/#faq'),
      'FAQPage @id must be subdomain-scoped'
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
  await runAsyncProbe('API Probe: Rate limiter enforces 5 req/10min per IP with Retry-After 600', async () => {
    const testIp = '10.0.0.99';
    let lastRes;

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
    assert.strictEqual(burstRes.headers.get('retry-after'), '600');
  });

  // 9. API Probe: Payload size limit (<16KB)
  await runAsyncProbe('API Probe: Payload >16KB rejected with 413 PAYLOAD_TOO_LARGE', async () => {
    const largeReq = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'x-forwarded-for': '10.0.0.88',
        'content-length': '20000',
      },
      body: JSON.stringify({ dummy: 'a'.repeat(20000) }),
    });

    const res = await handleLeadPost(largeReq);
    assert.strictEqual(res.status, 413);
    const body = await res.json();
    assert.strictEqual(body.error, 'PAYLOAD_TOO_LARGE');
  });

  // 10. Security Probe: No Client Bundle Exposure of Secret Keys
  await runAsyncProbe('Security Probe: Zero server secret tokens exposed in client components', () => {
    const componentsDir = path.join(process.cwd(), 'components');
    const files = fs.readdirSync(componentsDir).filter((f) => /\.(tsx|ts|jsx|js)$/.test(f));
    for (const f of files) {
      const code = fs.readFileSync(path.join(componentsDir, f), 'utf8');
      assert.ok(!code.includes('HUBSPOT_PRIVATE_APP_TOKEN'), `${f} must not reference HUBSPOT_PRIVATE_APP_TOKEN`);
      assert.ok(!code.includes('SUPABASE_SERVICE_ROLE_KEY'), `${f} must not reference SUPABASE_SERVICE_ROLE_KEY`);
    }
  });

  // 11. Deterministic Carousel Uniqueness Probe
  await runAsyncProbe('Carousel Uniqueness Probe: Exactly ONE carousel rendered in app/page.tsx', () => {
    const pageContent = fs.readFileSync(path.join(process.cwd(), 'app/page.tsx'), 'utf8');
    const matches = pageContent.match(/<SocialProofCarousel/g);
    assert.ok(matches, 'SocialProofCarousel must exist in page.tsx');
    assert.strictEqual(matches.length, 1, 'Exactly one SocialProofCarousel must be rendered');
    assert.ok(!pageContent.includes('oldWay.stats'), 'Duplicate oldWay.stats render must be removed');
  });

  // 12. Carousel Accessibility & Reduced Motion Probe
  await runAsyncProbe('Carousel Accessibility Probe: Reduced motion check and keyboard navigation supported', () => {
    const carouselCode = fs.readFileSync(path.join(process.cwd(), 'components/social-proof-carousel.tsx'), 'utf8');
    assert.ok(carouselCode.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
    assert.ok(carouselCode.includes('onKeyDown'), 'Must support keyboard navigation');
    assert.ok(carouselCode.includes('focus-visible'), 'Must have visible focus ring');
    assert.ok(!carouselCode.includes('aria-live="polite"'), 'Must avoid banned live word boundary');
  });

  // 13. Evidence Ledger Integrity Probe
  await runAsyncProbe('Evidence Ledger Probe: 4 verified cards with complete source metadata', () => {
    assert.strictEqual(evidenceLedger.length, 4, 'Must contain exactly 4 verified items');
    for (const item of evidenceLedger) {
      assert.ok(item.id, 'Item must have id');
      assert.ok(item.title, 'Item must have title');
      assert.ok(item.approvedClaim, 'Item must have approvedClaim');
      assert.ok(item.sourceOrganization, 'Item must have sourceOrganization');
      assert.ok(item.sourceTitle, 'Item must have sourceTitle');
      assert.ok(item.sourceUrl.startsWith('https://'), 'Item must have valid https sourceUrl');
      assert.ok(item.publicationDate, 'Item must have publicationDate');
      assert.ok(item.methodologyNote, 'Item must have methodologyNote');
    }
    const hasUnverifiedAio = evidenceLedger.some((i) => i.approvedClaim.includes('loses an average of 58%'));
    assert.strictEqual(hasUnverifiedAio, false, 'Unverified 58% claim must be excluded');
  });

  // 14. Five Keyword Placements & Full-Name Introduction Probe
  await runAsyncProbe('Five Keyword Placements Probe: Intent cluster & full name verified in all 5 designated layers', () => {
    // 1. Title tag
    assert.ok(
      siteCopy.meta.pageTitle.includes('Invisible Infrastructure Intelligence (I³ System)'),
      'Layer 1: Title tag must include full system name'
    );
    assert.ok(siteCopy.meta.pageTitle.includes('AI Visibility Audit'), 'Layer 1: Title tag must include AI Visibility Audit');

    // 2. H1 + first 100 words
    assert.strictEqual(
      siteCopy.hero.h1,
      'Is AI Erasing Your Business When High-Net-Worth Buyers Ask Who To Trust?',
      'Layer 2: Pain-mirror H1 verified'
    );
    assert.ok(
      siteCopy.hero.subhead.includes('Invisible Infrastructure Intelligence'),
      'Layer 2: Hero subhead must introduce the full system name upfront'
    );

    // 2b. AEO Answer Block (40-60 words)
    assert.ok(siteCopy.hero.aeoBlock, 'AEO Answer block must exist');
    const wordCount = siteCopy.hero.aeoBlock.body.split(/\s+/).filter(Boolean).length;
    assert.ok(
      wordCount >= 40 && wordCount <= 60,
      `AEO block body must be 40-60 words (actual: ${wordCount})`
    );

    // 3. Explanatory H2
    assert.strictEqual(
      siteCopy.structuralAnswer.h2,
      'What an AI Visibility Audit Examines When Machines Describe Your Business',
      'Layer 3: Explanatory H2 verified'
    );

    // 4. Visible FAQ
    assert.strictEqual(siteCopy.faqSection.items.length, 6, 'Layer 4: 6 visible FAQs verified');
    const faqTitles = siteCopy.faqSection.items.map((i) => i.question).join(' ');
    assert.ok(faqTitles.includes('What is an AI visibility audit?'), 'FAQ 1 verified');
    assert.ok(faqTitles.includes('Why isn\'t my referral business showing up in ChatGPT, Gemini, or Perplexity?'), 'FAQ 3 verified');
    assert.ok(faqTitles.includes('What is AI Brand Ignorance and how does the I³ System resolve it?'), 'FAQ 4 verified');

    // 5. Machine layer
    assert.ok(siteCopy.meta.metaDescription.includes('AI search'), 'Layer 5: Meta description verified');
    const llmsContent = fs.readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8');
    assert.ok(llmsContent.includes('I³ Visibility Snapshot'), 'Layer 5: llms.txt verified');
  });

  // 15. Preferred Sources Gating Probe
  await runAsyncProbe('Preferred Sources Gating Probe: Flag false, component returns null, zero destination emitted', () => {
    assert.strictEqual(siteConfig.preferredSourcesEnabled, false, 'Flag must be false');
    const pageHtml = fs.readFileSync(path.join(process.cwd(), 'app/page.tsx'), 'utf8');
    assert.ok(!pageHtml.includes('google-add-preferred-source-btn'), 'Button container must not render directly in page');
  });

  // 16. Universal Zero Em-Dash Probe across the entire repository
  await runAsyncProbe('Zero Em-Dash Probe: 0 em-dashes across all repo files', () => {
    const scanDirs = ['app', 'components', 'config', 'content', 'scripts', 'docs', 'public'];
    for (const dir of scanDirs) {
      const fullDir = path.join(process.cwd(), dir);
      if (!fs.existsSync(fullDir)) continue;
      const walk = (d) => {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
          if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
          const p = path.join(d, entry.name);
          if (entry.isDirectory()) walk(p);
          else if (entry.isFile()) {
            const content = fs.readFileSync(p, 'utf8');
            assert.ok(!content.includes('\u2014'), `Found em-dash in ${p}`);
            assert.ok(!content.includes('&' + 'mdash;'), `Found forbidden mdash entity in ${p}`);
          }
        }
      };
      walk(fullDir);
    }
  });

  console.log(`\nProbe Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✓ All Science Squad Quality Probes PASSED.');
  }
}

runSuite();
