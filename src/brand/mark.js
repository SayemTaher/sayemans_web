// ─────────────────────────────────────────────────────────────
// SAYEMANS logo — a minimal wordmark: the company name set in the
// site's typeface (SF Pro / Inter), semibold, with wide tracking.
// No custom letterforms or symbols; the name is the logo.
//
// Used by scripts/generate-images.mjs (favicon, icons, logo files,
// OG image). On the site itself the logo is live text (<Wordmark/>).
// ─────────────────────────────────────────────────────────────

export const BRAND_NAME = 'SAYEMANS';
export const FONT_STACK = `-apple-system, 'SF Pro Display', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

/** Tracking used everywhere the name appears (em). */
export const TRACKING_EM = 0.2;

/**
 * Wordmark as SVG text (for logo files / images).
 * @param {object} o
 * @param {string} [o.color] ink colour
 * @param {number} [o.size]  font size in px (viewBox scales with it)
 */
export function wordmarkSvg({ color = '#1d1d1f', size = 40, xmlns = true } = {}) {
  const w = Math.round(size * 7.9);
  const h = Math.round(size * 1.4);
  return `<svg${xmlns ? ' xmlns="http://www.w3.org/2000/svg"' : ''} viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${BRAND_NAME}">
  <text x="${(w + size * TRACKING_EM) / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT_STACK}" font-size="${size}" font-weight="600" letter-spacing="${(size * TRACKING_EM).toFixed(1)}" fill="${color}">${BRAND_NAME}</text>
</svg>`;
}

/**
 * App icon / favicon: the first letter of the name on a plain dark tile.
 * @param {'rounded'|'square'} [o.shape] square = full-bleed (iOS/maskable)
 * @param {number} [o.glyphScale] shrink for icon safe zones
 */
export function iconSvg({ shape = 'rounded', glyphScale = 1, xmlns = true } = {}) {
  const rx = shape === 'square' ? 0 : 14;
  return `<svg${xmlns ? ' xmlns="http://www.w3.org/2000/svg"' : ''} viewBox="0 0 64 64" role="img" aria-label="${BRAND_NAME}">
  <rect width="64" height="64" rx="${rx}" fill="#0b0b0d"/>
  <text x="32" y="33.5" text-anchor="middle" dominant-baseline="central" font-family="${FONT_STACK}" font-size="${(40 * glyphScale).toFixed(1)}" font-weight="600" fill="#f5f5f7">S</text>
</svg>`;
}
