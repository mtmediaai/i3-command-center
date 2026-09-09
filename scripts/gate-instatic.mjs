import fs from 'node:fs';
import path from 'node:path';

const TARGET_TOKEN = ['_', 'instatic'].join('');
const TARGET_PATH_SUBSTRING = ['core', 'bunch'].join('');

const TARGETS = ['app', 'components', 'lib', 'config', 'content', 'scripts', 'package.json'];

let violations = 0;

function checkText(filePath, content) {
  // Normalize Windows paths for consistent reporting
  const normPath = filePath.replace(/\\/g, '/');
  if (normPath.endsWith('gate-instatic.mjs')) {
    return;
  }

  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(TARGET_TOKEN) || line.toLowerCase().includes(TARGET_PATH_SUBSTRING)) {
      console.error(`[SECURITY GATE TRIGGERED: CVE-2026-72587] Forbidden reference found in ${filePath}:${idx + 1}`);
      console.error(`  > ${line.trim()}`);
      violations++;
    }
  });
}

function scan(itemPath) {
  if (!fs.existsSync(itemPath)) return;
  const stat = fs.statSync(itemPath);

  if (stat.isDirectory()) {
    const entries = fs.readdirSync(itemPath);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.git' || entry === '.next') continue;
      scan(path.join(itemPath, entry));
    }
  } else if (stat.isFile()) {
    const content = fs.readFileSync(itemPath, 'utf8');
    checkText(itemPath, content);
  }
}

for (const target of TARGETS) {
  scan(target);
}

if (violations > 0) {
  console.error(`\ngate:instatic FAILED: ${violations} forbidden reference(s) discovered.`);
  process.exit(1);
} else {
  console.log('✓ gate:instatic PASSED (0 occurrences of forbidden CVE-2026-72587 references)');
}
