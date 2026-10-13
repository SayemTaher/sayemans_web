// Generates brand assets from the logo source (src/brand/mark.js):
// favicon + logo SVGs, app icons, Open Graph image, product screenshots.
// Run manually after brand changes: `npm run images` (outputs are committed).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { wordmarkSvg, iconSvg } from '../src/brand/mark.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => path.join(root, 'public', f);

const render = (svg, width, out) => {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica Neue' },
  })
    .render()
    .asPng();
  fs.writeFileSync(pub(out), png);
  console.log(`✓ public/${out} (${(png.length / 1024).toFixed(0)} KB)`);
};

const font = `'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

// ── Open Graph / social share image (1200×630) ──
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#16140f" fill-opacity=".09"/></pattern>
    <radialGradient id="ring" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e3d6ff"/><stop offset="1" stop-color="#9b7bff"/></radialGradient>
    <linearGradient id="star" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb07a"/><stop offset="1" stop-color="#ff5a1f"/></linearGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6ff8a"/><stop offset="1" stop-color="#a8d81c"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#f2eee6"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <circle cx="1030" cy="150" r="78" fill="none" stroke="url(#ring)" stroke-width="44"/>
  <path d="M1040 400 C1048 448 1062 462 1110 470 C1062 478 1048 492 1040 540 C1032 492 1018 478 970 470 C1018 462 1032 448 1040 400Z" fill="url(#star)"/>
  <rect x="860" y="250" width="150" height="62" rx="31" transform="rotate(-18 935 281)" fill="url(#pill)"/>

  <text x="90" y="128" font-family="${font}" font-size="26" font-weight="700" letter-spacing="5" fill="#16140f">SAYEMANS</text>

  <text x="86" y="318" font-family="${font}" font-size="96" font-weight="800" letter-spacing="-4" fill="#16140f">Digital products,</text>
  <text x="86" y="420" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="96" letter-spacing="-2" fill="#2b39ff">built with passion.</text>

  <text x="90" y="530" font-family="${font}" font-size="26" fill="#4a463e">UI/UX · Web · Mobile apps · SaaS · Design systems</text>
  <text x="90" y="568" font-family="${font}" font-size="22" font-weight="600" fill="#16140f">Eindhoven, NL · sayemans.org</text>
</svg>`;

render(og, 1200, 'og-image.png');

// ── Logo files ──
const write = (out, content) => {
  fs.writeFileSync(pub(out), content.trim() + '\n');
  console.log(`✓ public/${out}`);
};
write('favicon.svg', iconSvg());
write('logo-icon.svg', iconSvg());
write('logo.svg', wordmarkSvg({ color: '#1d1d1f' }));
write('logo-white.svg', wordmarkSvg({ color: '#f5f5f7' }));

// ── Raster icons ──
render(iconSvg(), 32, 'favicon-32.png');
render(iconSvg({ shape: 'square' }), 180, 'apple-touch-icon.png'); // iOS applies its own mask
render(iconSvg(), 192, 'icon-192.png');
render(iconSvg(), 512, 'icon-512.png');
render(iconSvg({ shape: 'square', glyphScale: 0.78 }), 512, 'icon-maskable-512.png'); // Android safe zone
render(wordmarkSvg({ color: '#1d1d1f' }), 1200, 'logo.png');
render(wordmarkSvg({ color: '#f5f5f7' }), 1200, 'logo-white.png');

// ── Product screenshots (sources in assets-src/taalmeester/*.webp) → responsive WebP ──
// Sources are the current TaalMeester iOS screens (1206px wide).
const sharp = (await import('sharp')).default;
const shots = path.join(root, 'assets-src', 'taalmeester');
fs.mkdirSync(pub('images/taalmeester'), { recursive: true });
for (const file of fs.readdirSync(shots).filter((f) => f.endsWith('.webp'))) {
  const name = file.replace(/\.webp$/, '');
  for (const w of [400, 800]) {
    const out = `images/taalmeester/${name}-${w}.webp`;
    await sharp(path.join(shots, file)).resize({ width: w }).webp({ quality: 80 }).toFile(pub(out));
  }
  console.log(`✓ public/images/taalmeester/${name}-{400,800}.webp`);
}
