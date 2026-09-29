/**
 * Verifies that every inline <script> in the built output is covered by a
 * hash in that page's Content-Security-Policy meta tag.
 *
 * Astro hashes the scripts it generates, but not `is:inline` ones — those
 * hashes are pinned by hand in astro.config.mjs. This check fails the build
 * if an inline script is edited without updating its pinned hash, which
 * would otherwise ship a silently broken page.
 *
 * Run: node scripts/check-csp.mjs
 */
import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const DIST = 'dist';

const sha256 = (text) => `sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}`;

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
const CSP_META = /<meta\s+http-equiv="content-security-policy"\s+content="([^"]*)"/i;

let checked = 0;
const failures = [];

for await (const file of glob(`${DIST}/**/*.html`)) {
  const html = await readFile(file, 'utf8');

  const cspMatch = html.match(CSP_META);
  if (!cspMatch) {
    failures.push(`${file}: no CSP meta tag found`);
    continue;
  }
  const csp = cspMatch[1];

  for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
    // Skip JSON-LD and other non-executable script blocks.
    if (/type=["'](?!module|text\/javascript|application\/javascript)/i.test(attrs)) continue;
    if (body.trim() === '') continue;

    checked += 1;
    const hash = sha256(body);
    if (!csp.includes(hash)) {
      failures.push(
        `${file}: inline script not covered by CSP.\n` +
          `    expected hash: ${hash}\n` +
          `    script starts: ${body.trim().slice(0, 70)}...`
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`\nCSP check FAILED (${failures.length} problem(s)):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error(
    '\nIf you edited an is:inline script, copy the expected hash above into\n' +
      'security.csp.scriptDirective.hashes in astro.config.mjs.\n'
  );
  process.exit(1);
}

console.log(`CSP check passed — ${checked} inline script(s) covered.`);
