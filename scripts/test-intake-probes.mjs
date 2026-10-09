import assert from 'node:assert';
import { NextRequest } from 'next/server';
import { POST as handleIntakePost } from '../app/api/intake/route';
import { IntakePayloadSchema } from '../src/lib/validations/intake';
import { evaluateTif } from '../src/lib/tif';
import { I3_CONTENT } from '../src/config/content';

console.log('--- RUNNING MTM I³ INTAKE & TIF v1.0 QUALITY PROBES ---');

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
  // 1. Zod Validation Probe: Valid Builder payload passes
  await runAsyncProbe('Zod Validation Probe: Valid BUILDER submission passes', () => {
    const payload = {
      zipCode: '77380',
      companyName: 'Woodlands Custom Modern Builders',
      workEmail: 'principal@woodlandsmodern.com',
      craftVector: 'BUILDER',
    };
    const parsed = IntakePayloadSchema.safeParse(payload);
    assert.strictEqual(parsed.success, true);
    assert.strictEqual(parsed.data.craftVector, 'BUILDER');
  });

  // 2. Zod Validation Probe: Disposable email rejected
  await runAsyncProbe('Zod Validation Probe: Disposable email rejected', () => {
    const payload = {
      zipCode: '77380',
      companyName: 'Acme Builders',
      workEmail: 'spammer@mailinator.com',
      craftVector: 'BUILDER',
    };
    const parsed = IntakePayloadSchema.safeParse(payload);
    assert.strictEqual(parsed.success, false);
    const issues = parsed.error.issues;
    assert.ok(issues.some((i) => i.message.includes('Disposable email')));
  });

  // 3. Zod Validation Probe: Invalid zip code rejected
  await runAsyncProbe('Zod Validation Probe: Invalid zip code rejected', () => {
    const payload = {
      zipCode: '7738',
      companyName: 'Acme Builders',
      workEmail: 'owner@acme.com',
      craftVector: 'BUILDER',
    };
    const parsed = IntakePayloadSchema.safeParse(payload);
    assert.strictEqual(parsed.success, false);
    const issues = parsed.error.issues;
    assert.ok(issues.some((i) => i.message.includes('postal code')));
  });

  // 4. Zod Validation Probe: Craft OTHER requires craftOtherSpecification
  await runAsyncProbe('Zod Validation Probe: Craft OTHER requires specification', () => {
    const invalidPayload = {
      zipCode: '77380',
      companyName: 'Artisanal Studio',
      workEmail: 'info@studio.com',
      craftVector: 'OTHER',
    };
    const parsedInvalid = IntakePayloadSchema.safeParse(invalidPayload);
    assert.strictEqual(parsedInvalid.success, false);

    const validPayload = {
      zipCode: '77380',
      companyName: 'Artisanal Studio',
      workEmail: 'info@studio.com',
      craftVector: 'OTHER',
      craftOtherSpecification: 'Bespoke Architectural Millwork',
    };
    const parsedValid = IntakePayloadSchema.safeParse(validPayload);
    assert.strictEqual(parsedValid.success, true);
  });

  // 5. TIF v1.0 Automatic Disqualifiers: MedSpa/Clinic -> HOLD
  await runAsyncProbe('TIF Disqualifier Probe: Medical/MedSpa practice routed to HOLD', () => {
    const evaluation = evaluateTif({
      companyName: 'The Woodlands MedSpa & Laser Clinic',
      craftVector: 'OTHER',
      craftOtherSpecification: 'Aesthetics and Wellness Clinic',
      zipCode: '77380',
    });
    assert.strictEqual(evaluation.disqualified, true);
    assert.strictEqual(evaluation.tier, 'HOLD');
    assert.strictEqual(evaluation.isDraftPick, false);
    assert.ok(evaluation.score < 70);
  });

  // 6. TIF v1.0 Automatic Disqualifiers: Regulated Legal Advice -> HOLD
  await runAsyncProbe('TIF Disqualifier Probe: Law firm routed to HOLD', () => {
    const evaluation = evaluateTif({
      companyName: 'Woodlands Estate Litigation Law Firm',
      craftVector: 'OTHER',
      craftOtherSpecification: 'Trial Attorney',
      zipCode: '77380',
    });
    assert.strictEqual(evaluation.disqualified, true);
    assert.strictEqual(evaluation.tier, 'HOLD');
    assert.ok(evaluation.score < 70);
  });

  // 7. TIF v1.0 Automatic Disqualifiers: Retail Financial Advice -> HOLD
  await runAsyncProbe('TIF Disqualifier Probe: Retail financial advisor routed to HOLD', () => {
    const evaluation = evaluateTif({
      companyName: 'Pinnacle Wealth Management Financial Advisors',
      craftVector: 'OTHER',
      craftOtherSpecification: 'Financial Planning & Wealth Advisor',
      zipCode: '77380',
    });
    assert.strictEqual(evaluation.disqualified, true);
    assert.strictEqual(evaluation.tier, 'HOLD');
    assert.ok(evaluation.score < 70);
  });

  // 8. TIF v1.0 Scoring: Custom Luxury Home Builder -> DRAFT_PICK (95 pts)
  await runAsyncProbe('TIF Scoring Probe: Custom Luxury Home Builder yields DRAFT_PICK (>=85 pts)', () => {
    const evaluation = evaluateTif({
      companyName: 'Crown Modern Estates LLC',
      craftVector: 'BUILDER',
      zipCode: '77380',
    });
    assert.strictEqual(evaluation.disqualified, false);
    assert.strictEqual(evaluation.score, 95);
    assert.strictEqual(evaluation.tier, 'DRAFT_PICK');
    assert.strictEqual(evaluation.isDraftPick, true);
  });

  // 9. TIF v1.0 Scoring: European Automotive -> WAITING_LIST (82 pts)
  await runAsyncProbe('TIF Scoring Probe: European Automotive yields WAITING_LIST (70-84 pts)', () => {
    const evaluation = evaluateTif({
      companyName: 'Apex European Performance Motorsport',
      craftVector: 'EURO_AUTO',
      zipCode: '77380',
    });
    assert.strictEqual(evaluation.disqualified, false);
    assert.strictEqual(evaluation.score, 82);
    assert.strictEqual(evaluation.tier, 'WAITING_LIST');
    assert.strictEqual(evaluation.isDraftPick, false);
  });

  // 10. Copy Dictionary Integrity Probe: Verify all required content keys
  await runAsyncProbe('Copy Dictionary Probe: All required scenes and intake keys present', () => {
    assert.strictEqual(I3_CONTENT.hero.superTitle, 'ELITE IN THE FIELD. INVISIBLE IN THE FEED.');
    assert.ok(I3_CONTENT.hero.statement.includes('You don\'t build the whole house.'));
    assert.strictEqual(I3_CONTENT.scenes.scene1_curbAppeal, '25+ years of reputation. One search away from invisibility.');
    assert.strictEqual(I3_CONTENT.scenes.scene2_interiorAudio, 'Master craftsmanship inside the room. Completely invisible to the machines outside.');
    assert.strictEqual(I3_CONTENT.scenes.scene3_outdoorOasis, 'Your clients demand perfection. Conversational search recommends whoever it can read and trust.');
    assert.strictEqual(I3_CONTENT.scenes.scene4_motorCourt, 'Reputation is built by hand. We make sure modern search engines cannot bypass it for louder competitors.');
    assert.strictEqual(I3_CONTENT.intakeConsole.tagline, 'MT Media AI: The Infrastructure Beneath YOUR Kingdom');
    assert.strictEqual(I3_CONTENT.intakeConsole.header, 'Verify Your Zip Code');
    assert.strictEqual(I3_CONTENT.intakeConsole.constraint, 'One category leader per craft. One firm per zip code.');
    assert.strictEqual(I3_CONTENT.intakeConsole.submitButton, 'Check Seat Availability');
    assert.strictEqual(I3_CONTENT.craftOptions.length, 7);
  });

  // 11. Endpoint Integration Probe: POST /api/intake with valid Draft Pick payload
  await runAsyncProbe('API Route Probe: POST /api/intake executes and returns qualified diagnostic', async () => {
    const req = new NextRequest('http://localhost:3000/api/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '198.51.100.42',
      },
      body: JSON.stringify({
        zipCode: '77380',
        companyName: 'Sovereign Estate Builders',
        workEmail: 'director@sovereignestates.com',
        craftVector: 'BUILDER',
      }),
    });

    const res = await handleIntakePost(req);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.ok, true);
    assert.strictEqual(body.status, 'QUALIFIED');
    assert.strictEqual(body.tier, 'DRAFT_PICK');
    assert.strictEqual(body.isDraftPick, true);
    assert.strictEqual(body.territory.zipCode, '77380');
    assert.strictEqual(body.territory.status, 'WAITING_LIST');
    assert.ok(body.ignitionHub);
    assert.strictEqual(body.ignitionHub.dviScore, 95);
    assert.strictEqual(body.ignitionHub.querySimulations.length, 3);
  });

  // 12. Endpoint Disqualification Probe: POST /api/intake with MedSpa returns HOLD
  await runAsyncProbe('API Route Probe: POST /api/intake with MedSpa returns HOLD without CRM deal', async () => {
    const req = new NextRequest('http://localhost:3000/api/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '198.51.100.43',
      },
      body: JSON.stringify({
        zipCode: '77380',
        companyName: 'Woodlands Botox & MedSpa Clinic',
        workEmail: 'owner@woodlandsmedspa.com',
        craftVector: 'OTHER',
        craftOtherSpecification: 'Aesthetic MedSpa',
      }),
    });

    const res = await handleIntakePost(req);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.ok, true);
    assert.strictEqual(body.status, 'HOLD');
    assert.strictEqual(body.tier, 'HOLD');
    assert.strictEqual(body.tifEvaluation.disqualified, true);
  });

  // 13. Security Probe: Content-Length > 16KB returns 413
  await runAsyncProbe('Security Probe: Payload >16KB rejected with 413', async () => {
    const req = new NextRequest('http://localhost:3000/api/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '20000',
        'x-forwarded-for': '198.51.100.44',
      },
      body: JSON.stringify({ dummy: 'x'.repeat(20000) }),
    });

    const res = await handleIntakePost(req);
    assert.strictEqual(res.status, 413);
  });

  // 14. Citadel Rate Limit Probe: 5 requests succeed, 6th returns 429
  await runAsyncProbe('Citadel Rate Limit Probe: 5 req/10min enforced with 429 and Retry-After', async () => {
    const testIp = '203.0.113.99';
    const payload = {
      zipCode: '77380',
      companyName: 'Rate Limit Test Builder',
      workEmail: 'test@ratelimit.com',
      craftVector: 'BUILDER',
    };

    for (let i = 0; i < 5; i++) {
      const req = new NextRequest('http://localhost:3000/api/intake', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': testIp,
        },
        body: JSON.stringify(payload),
      });
      const res = await handleIntakePost(req);
      assert.strictEqual(res.status, 200);
    }

    // 6th request must trigger rate limit
    const req6 = new NextRequest('http://localhost:3000/api/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': testIp,
      },
      body: JSON.stringify(payload),
    });
    const res6 = await handleIntakePost(req6);
    assert.strictEqual(res6.status, 429);
    assert.strictEqual(res6.headers.get('Retry-After'), '600');
  });

  console.log(`\nIntake Probe Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✓ All MTM I³ Intake & TIF v1.0 Quality Probes PASSED.');
  }
}

runSuite();
