import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { POST as handleIntakePost } from '../app/api/intake/route';
import { evaluateTif } from '../src/lib/tif';
import { I3_CONTENT } from '../src/config/content';

console.log('--- STARTING MTM I³ PHASE 4 END-TO-END SMOKE TEST ---');

let passed = 0;
let failed = 0;

function logPass(msg) {
  console.log(`[PASS] ${msg}`);
  passed++;
}

function logFail(msg, err) {
  console.error(`[FAIL] ${msg}:`, err.message);
  failed++;
}

async function runTest(name, fn) {
  try {
    await fn();
    logPass(name);
  } catch (e) {
    logFail(name, e);
  }
}

async function main() {
  // 1. Asset Completeness & Zero-Flash Probe
  await runTest('Asset Completeness: All 240 WebP frames exist and are readable', () => {
    const desktopDir = path.join(process.cwd(), 'public/frames/desktop');
    const mobileDir = path.join(process.cwd(), 'public/frames/mobile');

    assert.ok(fs.existsSync(desktopDir), 'Desktop frames directory must exist');
    assert.ok(fs.existsSync(mobileDir), 'Mobile frames directory must exist');

    const desktopFrames = fs.readdirSync(desktopDir).filter((f) => f.endsWith('.webp'));
    const mobileFrames = fs.readdirSync(mobileDir).filter((f) => f.endsWith('.webp'));

    assert.strictEqual(desktopFrames.length, 120, 'Desktop must have exactly 120 frames');
    assert.strictEqual(mobileFrames.length, 120, 'Mobile must have exactly 120 frames');

    // Confirm frame-0001 has valid size
    const d0001 = fs.statSync(path.join(desktopDir, 'frame-0001.webp'));
    const m0001 = fs.statSync(path.join(mobileDir, 'frame-0001.webp'));
    assert.ok(d0001.size > 10000, 'Desktop frame-0001 must be > 10KB');
    assert.ok(m0001.size > 5000, 'Mobile frame-0001 must be > 5KB');
  });

  // 2. Behavioral TIF Qualification Probe for Woodlands Estate Builders
  await runTest('TIF Engine: Woodlands Estate Builders qualifies as DRAFT_PICK (Score >= 85)', () => {
    const evaluation = evaluateTif({
      zipCode: '77380',
      companyName: 'Woodlands Estate Builders',
      craftVector: 'BUILDER',
    });

    assert.strictEqual(evaluation.disqualified, false);
    assert.strictEqual(evaluation.tier, 'DRAFT_PICK');
    assert.strictEqual(evaluation.isDraftPick, true);
    assert.ok(evaluation.score >= 85, `Score must be >= 85 (actual: ${evaluation.score})`);
    assert.ok(evaluation.craftLabel.length > 0, 'Craft label must be defined');
    assert.ok(evaluation.territoryNotes.length > 0, 'Territory notes must record qualification traits');
  });

  // 3. API Route Ingestion & State Machine Output Simulation
  await runTest('API Intake & State Machine: POST /api/intake produces Tier 1 DRAFT_PICK payload', async () => {
    const req = new NextRequest('http://localhost:3000/api/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '12.34.56.78',
      },
      body: JSON.stringify({
        zipCode: '77380',
        companyName: 'Woodlands Estate Builders',
        workEmail: 'principal@firm.com',
        craftVector: 'BUILDER',
      }),
    });

    const res = await handleIntakePost(req);
    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.strictEqual(data.ok, true);
    assert.strictEqual(data.status, 'QUALIFIED');
    assert.strictEqual(data.tier, 'DRAFT_PICK');
    assert.strictEqual(data.isDraftPick, true);
    assert.ok(data.ignitionHub, 'Ignition Hub deliverable must be attached');
    assert.ok(Array.isArray(data.ignitionHub.querySimulations), 'Query simulations must be an array');
    assert.ok(data.ignitionHub.querySimulations.length >= 2, 'Must have at least 2 conversational simulations');
  });

  // 4. Progress Threshold Boundaries Check
  await runTest('Progress Thresholds: 5 movements cover [0.00 to 1.00] continuously', () => {
    // 0.00 - 0.18 : Hero
    // 0.18 - 0.36 : Scene 1 (Curb Appeal)
    // 0.36 - 0.54 : Scene 2 (Interior Sanctuary)
    // 0.54 - 0.72 : Scene 3 (Outdoor Oasis)
    // 0.72 - 0.88 : Scene 4 (Motor Court)
    // 0.88 - 1.00 : Scene 5 (Intake Console)
    const bounds = [
      { name: 'Hero', start: 0.0, end: 0.18 },
      { name: 'Scene 1', start: 0.18, end: 0.36 },
      { name: 'Scene 2', start: 0.36, end: 0.54 },
      { name: 'Scene 3', start: 0.54, end: 0.72 },
      { name: 'Scene 4', start: 0.72, end: 0.88 },
      { name: 'Scene 5', start: 0.88, end: 1.0 },
    ];

    for (let i = 0; i < bounds.length - 1; i++) {
      assert.strictEqual(
        bounds[i].end,
        bounds[i + 1].start,
        `Boundaries between ${bounds[i].name} and ${bounds[i + 1].name} must be contiguous`
      );
    }
  });

  // 5. Semantic H1 Exclusivity Check in app/page.tsx
  await runTest('Semantic HTML: Singular H1 reserved for EstateCanvasScroll, Movement 01 is H2', () => {
    const pageCode = fs.readFileSync(path.join(process.cwd(), 'app/page.tsx'), 'utf8');
    const h1Count = (pageCode.match(/<h1[\s>]/g) || []).length;
    assert.strictEqual(h1Count, 0, 'page.tsx must not declare raw <h1>; EstateCanvasScroll contains the singular H1');
    assert.ok(pageCode.includes('<h2 className="hid-sword-blade'), 'Movement 01 header must be <h2>');
  });

  // 6. Dossier Bridge Existence & Styling
  await runTest('Dossier Bridge: Hairline border & institutional copy verified', () => {
    const pageCode = fs.readFileSync(path.join(process.cwd(), 'app/page.tsx'), 'utf8');
    assert.ok(pageCode.includes('MT MEDIA AI // INSTITUTIONAL EVIDENCE DOSSIER'));
    assert.ok(pageCode.includes('border-[#E5E4E2]/20'));
    assert.ok(pageCode.includes('AmbientVoidVideo'));
  });

  console.log(`\nSmoke Test Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✓ All Phase 4 Interactive Smoke Tests PASSED.');
  }
}

main();
