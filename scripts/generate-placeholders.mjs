/**
 * Generates neutral placeholder cover art + the default OG image so the site
 * builds and shares correctly before real assets land.
 * Run: node scripts/generate-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ACCENTS = {
  design: ['#f5b04b', '#c2632e'],
  games: ['#b17df0', '#5b3aa8'],
  writing: ['#5fd0e8', '#2b7f99'],
};

const card = (from, to, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${to}" stop-opacity="0.18"/>
    </linearGradient>
    <filter id="b"><feGaussianBlur stdDeviation="120"/></filter>
  </defs>
  <rect width="1600" height="1000" fill="#0b0c12"/>
  <circle cx="380" cy="260" r="340" fill="${from}" opacity="0.32" filter="url(#b)"/>
  <circle cx="1240" cy="760" r="380" fill="${to}" opacity="0.28" filter="url(#b)"/>
  <rect width="1600" height="1000" fill="url(#g)" opacity="0.35"/>
  <text x="800" y="520" text-anchor="middle" font-family="Segoe UI, Inter, sans-serif"
        font-size="44" font-weight="600" fill="#ffffff" fill-opacity="0.34"
        letter-spacing="8">${label.toUpperCase()}</text>
</svg>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f5b04b"/>
      <stop offset="0.5" stop-color="#b17df0"/>
      <stop offset="1" stop-color="#5fd0e8"/>
    </linearGradient>
    <filter id="b"><feGaussianBlur stdDeviation="90"/></filter>
  </defs>
  <rect width="1200" height="630" fill="#0b0c12"/>
  <circle cx="180" cy="90" r="260" fill="#b17df0" opacity="0.30" filter="url(#b)"/>
  <circle cx="1030" cy="560" r="280" fill="#5fd0e8" opacity="0.22" filter="url(#b)"/>
  <text x="80" y="300" font-family="Segoe UI, Inter, sans-serif" font-size="78" font-weight="700"
        fill="#ffffff" letter-spacing="-2">Stuart May</text>
  <text x="80" y="370" font-family="Segoe UI, Inter, sans-serif" font-size="34" font-weight="500"
        fill="url(#t)">Design &#183; Marketing &#183; Games &amp; XR</text>
  <rect x="80" y="410" width="120" height="4" rx="2" fill="url(#t)"/>
</svg>`;

await mkdir('src/assets/projects', { recursive: true });

for (const [name, [from, to]] of Object.entries(ACCENTS)) {
  const out = `src/assets/projects/placeholder-${name}.jpg`;
  await sharp(Buffer.from(card(from, to, name))).jpeg({ quality: 82 }).toFile(out);
  console.log('wrote', out);
}

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
console.log('wrote public/og-default.png');
