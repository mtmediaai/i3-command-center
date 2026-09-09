import fs from 'node:fs';
import path from 'node:path';

const BANNED_WORDS = [
  'delve',
  'landscape',
  'synergy',
  'tapestry',
  'evolution',
  'revolution',
  'game-changer',
  "it's not just",
  'live',
  'real-time',
  'instant',
  'immediately',
];

const SCAN_DIRS = ['app', 'components', 'config', 'content'];

let totalErrors = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|mjs)$/.test(entry.name)) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip import lines, comments that are lint/type annotations
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    const lower = line.toLowerCase();
    for (const banned of BANNED_WORDS) {
      // Use regex word boundary check so substrings like "deliver" do not trigger on "live"
      const regex = new RegExp(`\\b${banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) {
        // Special exemption: allow technical keywords if strictly in code context (e.g., Live-Link Rule in comments)
        console.error(`[NO-SLOP GATE FAILED] Banned term "${banned}" found in ${filePath}:${index + 1}`);
        console.error(`  > ${trimmed}`);
        totalErrors++;
      }
    }
  });
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

if (totalErrors > 0) {
  console.error(`\nFound ${totalErrors} violation(s) of the No-Slop Gate.`);
  process.exit(1);
} else {
  console.log('✓ No-Slop Gate: PASSED (Zero banned terminology detected)');
}
