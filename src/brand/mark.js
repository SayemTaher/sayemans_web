// ─────────────────────────────────────────────────────────────
// SAYEMANS logotype — a custom-drawn wordmark (no font dependency).
//
// Design notes
// • Monoline geometric letters on one stroke weight, round caps/joins.
// • S: two stacked arcs; the lower arc is a translucent "second layer",
//   an echo of Liquid Glass and of design + engineering stacked together.
// • A: open chevron (Λ) with no crossbar, for speed and direction.
// • E: three floating bars with no spine; the middle bar carries the brand
//   gradient as the single colour accent in the wordmark.
//
// Single source of truth: used by <Wordmark/> in React and by
// scripts/generate-images.mjs (favicon, icons, logo files, OG image).
// ─────────────────────────────────────────────────────────────

const SW = 7; // stroke weight
const H = 40; // cap height (viewBox units)
const GAP = 9; // letter spacing

const i = SW / 2; // stroke inset
const top = i;
const base = H - i;

// Geometric S (width 26). Returns [upper arc path, lower arc path].
const S = (x) => {
  const cx = x + 13;
  const r = (base - top) / 4;
  const y1 = top + r;
  const y2 = base - r;
  const a = (deg, cy) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)].map((n) => +n.toFixed(2));
  const [sx, sy] = a(-35, y1);
  const [ex, ey] = a(145, y2);
  return [
    `M${sx} ${sy} A${r} ${r} 0 1 0 ${cx} ${y1 + r}`,
    `M${cx} ${y1 + r} A${r} ${r} 0 1 1 ${ex} ${ey}`,
  ];
};

const letters = [
  { w: 26, draw: (x) => ({ s: S(x) }) },
  { w: 30, draw: (x) => ({ main: `M${x + i} ${base} L${x + 15} ${top} L${x + 30 - i} ${base}` }) }, // Λ
  { w: 28, draw: (x) => ({ main: `M${x + i} ${top} L${x + 14} ${H / 2} L${x + 28 - i} ${top} M${x + 14} ${H / 2} L${x + 14} ${base}` }) }, // Y
  {
    w: 22,
    draw: (x) => ({
      main: `M${x + i} ${top} H${x + 22 - i} M${x + i} ${base} H${x + 22 - i}`,
      accent: `M${x + i} ${H / 2} H${x + 16}`,
    }),
  }, // E (spineless)
  { w: 34, draw: (x) => ({ main: `M${x + i} ${base} V${top} L${x + 17} ${H * 0.62} L${x + 34 - i} ${top} V${base}` }) }, // M
  { w: 30, draw: (x) => ({ main: `M${x + i} ${base} L${x + 15} ${top} L${x + 30 - i} ${base}` }) }, // Λ
  { w: 27, draw: (x) => ({ main: `M${x + i} ${base} V${top} L${x + 27 - i} ${base} V${top}` }) }, // N
  { w: 26, draw: (x) => ({ s: S(x) }) },
];

function layout() {
  let x = 0;
  const main = [];
  const lower = [];
  const accent = [];
  for (const l of letters) {
    const d = l.draw(x);
    if (d.s) {
      main.push(d.s[0]);
      lower.push(d.s[1]);
    }
    if (d.main) main.push(d.main);
    if (d.accent) accent.push(d.accent);
    x += l.w + GAP;
  }
  return { width: x - GAP, main: main.join(' '), lower: lower.join(' '), accent: accent.join(' ') };
}

const L = layout();
export const WORDMARK_RATIO = L.width / H;

const gradient = (id, x1, x2) =>
  `<linearGradient id="${id}" x1="${x1}" y1="0" x2="${x2}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0a84ff"/><stop offset=".5" stop-color="#bf5af2"/><stop offset="1" stop-color="#ff375f"/></linearGradient>`;

/**
 * The SAYEMANS wordmark.
 * @param {object} o
 * @param {string} [o.color]  ink colour (default currentColor → follows theme)
 * @param {string} [o.id]     unique id prefix for the gradient
 * @param {number} [o.pad]    padding around the letters (viewBox units)
 */
export function wordmarkSvg({ color = 'currentColor', id = 'wm', pad = 0, xmlns = true } = {}) {
  const ax = letters.slice(0, 3).reduce((s, l) => s + l.w + GAP, 0);
  return `<svg${xmlns ? ' xmlns="http://www.w3.org/2000/svg"' : ''} viewBox="${-pad} ${-pad} ${L.width + pad * 2} ${H + pad * 2}" role="img" aria-label="SAYEMANS">
  <defs>${gradient(`${id}-g`, ax, ax + 16)}</defs>
  <g fill="none" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${L.lower}" stroke="${color}" stroke-opacity=".45"/>
    <path d="${L.main}" stroke="${color}"/>
    <path d="${L.accent}" stroke="url(#${id}-g)"/>
  </g>
</svg>`;
}

/**
 * App icon / favicon: the wordmark's S (with its translucent lower layer
 * in brand gradient) on a dark glass tile.
 * @param {'rounded'|'square'} [o.shape] square = full-bleed (iOS/maskable)
 * @param {number} [o.glyphScale] shrink for icon safe zones
 */
export function iconSvg({ id = 'ic', shape = 'rounded', glyphScale = 1, xmlns = true } = {}) {
  const [upper, lower] = S(0);
  const rx = shape === 'square' ? 0 : 15;
  const k = (40 / H) * glyphScale; // S is 26×40 → fit ~40 tall in a 64 tile
  const tx = 32 - 13 * k;
  const ty = 32 - (H / 2) * k;
  return `<svg${xmlns ? ' xmlns="http://www.w3.org/2000/svg"' : ''} viewBox="0 0 64 64" role="img" aria-label="SAYEMANS">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1c1c22"/><stop offset="1" stop-color="#050507"/></linearGradient>
    <linearGradient id="${id}-g" x1="0" y1="20" x2="26" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0a84ff"/><stop offset=".5" stop-color="#bf5af2"/><stop offset="1" stop-color="#ff375f"/></linearGradient>
    <radialGradient id="${id}-glow" cx="32" cy="46" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5e5ce6" stop-opacity=".45"/><stop offset="1" stop-color="#5e5ce6" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="64" height="64" rx="${rx}" fill="url(#${id}-bg)"/>
  <rect width="64" height="64" rx="${rx}" fill="url(#${id}-glow)"/>
  ${shape === 'rounded' ? `<rect x=".75" y=".75" width="62.5" height="62.5" rx="14.25" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.5"/>` : ''}
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(3)})" fill="none" stroke-width="${SW}" stroke-linecap="round">
    <path d="${lower}" stroke="url(#${id}-g)"/>
    <path d="${upper}" stroke="#fff"/>
  </g>
</svg>`;
}

// Back-compat aliases (older imports)
export const markSvg = iconSvg;
export const lockupSvg = ({ color = '#1d1d1f' } = {}) => wordmarkSvg({ color, pad: 6 });
