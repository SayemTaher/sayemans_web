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
    <radialGradient id="a1" cx="0.18" cy="0.1" r="0.6"><stop offset="0" stop-color="#0a84ff" stop-opacity=".55"/><stop offset="1" stop-color="#0a84ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="a2" cx="0.95" cy="0.35" r="0.55"><stop offset="0" stop-color="#bf5af2" stop-opacity=".45"/><stop offset="1" stop-color="#bf5af2" stop-opacity="0"/></radialGradient>
    <radialGradient id="a3" cx="0.55" cy="1.1" r="0.6"><stop offset="0" stop-color="#ff375f" stop-opacity=".35"/><stop offset="1" stop-color="#ff375f" stop-opacity="0"/></radialGradient>
    <linearGradient id="grad" x1="0" x2="1"><stop offset="0" stop-color="#0a84ff"/><stop offset=".4" stop-color="#5e5ce6"/><stop offset=".7" stop-color="#bf5af2"/><stop offset="1" stop-color="#ff375f"/></linearGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#f5f5f7"/><stop offset="1" stop-color="#8e8e93"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".03"/></linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a84ff"/><stop offset=".55" stop-color="#5e5ce6"/><stop offset="1" stop-color="#ff375f"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#000"/>
  <rect width="1200" height="630" fill="url(#a1)"/>
  <rect width="1200" height="630" fill="url(#a2)"/>
  <rect width="1200" height="630" fill="url(#a3)"/>

  <rect x="60" y="60" width="1080" height="510" rx="44" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.5"/>

  <text x="110" y="146" font-family="${font}" font-size="28" font-weight="600" letter-spacing="5.6" fill="#f5f5f7">SAYEMANS</text>

  <text x="108" y="318" font-family="${font}" font-size="82" font-weight="700" letter-spacing="-3" fill="url(#chrome)">Digital products,</text>
  <text x="108" y="410" font-family="${font}" font-size="82" font-weight="700" letter-spacing="-3" fill="url(#grad)">built with passion.</text>

  <text x="110" y="500" font-family="${font}" font-size="26" fill="#a1a1a6">UI/UX · Web · Mobile apps · SaaS · Design systems</text>
  <text x="1090" y="500" text-anchor="end" font-family="${font}" font-size="24" font-weight="500" fill="#f5f5f7">Eindhoven, NL · sayemtaher.org</text>
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

// ── Product screenshots (source in assets-src/) → responsive WebP ──
const sharp = (await import('sharp')).default;
fs.mkdirSync(pub('images'), { recursive: true });
for (const w of [600, 900]) {
  const out = `images/taalmeester-home-${w}.webp`;
  await sharp(path.join(root, 'assets-src', 'taalmeester_home.png')).resize({ width: w }).webp({ quality: 82 }).toFile(pub(out));
  console.log(`✓ public/${out} (${(fs.statSync(pub(out)).size / 1024).toFixed(0)} KB)`);
}
