// ─────────────────────────────────────────────────────────────
// SAYEMANS brand mark — "Layered S".
// Two glass arcs form the S: the upper arc (design) overlaps the
// lower arc (engineering) at the joint and casts depth onto it —
// two disciplines layered into one product, in Liquid Glass.
//
// Single source of truth: used by the React <LogoMark/> component
// and by scripts/generate-images.mjs (favicon, app icons, OG image).
// ─────────────────────────────────────────────────────────────

/**
 * @param {object} o
 * @param {string} [o.id]      unique prefix for gradient/filter ids
 * @param {'rounded'|'square'} [o.shape] square = full-bleed (iOS/maskable icons)
 * @param {number} [o.glyphScale] shrink the S for icon safe zones
 * @param {boolean} [o.xmlns] include xmlns (standalone .svg files)
 */
export function markSvg({ id = 'sm', shape = 'rounded', glyphScale = 1, xmlns = true } = {}) {
  const rx = shape === 'square' ? 0 : 15;
  const t = glyphScale === 1 ? '' : ` transform="translate(${32 - 32 * glyphScale} ${32 - 32 * glyphScale}) scale(${glyphScale})"`;
  return `<svg${xmlns ? ' xmlns="http://www.w3.org/2000/svg"' : ''} viewBox="0 0 64 64" role="img" aria-label="SAYEMANS">
  <defs>
    <linearGradient id="${id}-bg" x1="8" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0a84ff"/><stop offset=".5" stop-color="#5e5ce6"/><stop offset="1" stop-color="#ff375f"/>
    </linearGradient>
    <linearGradient id="${id}-sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-low" x1="24" y1="32" x2="40" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset="1" stop-color="#fff" stop-opacity=".92"/>
    </linearGradient>
    <filter id="${id}-depth" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="1.6" stdDeviation="1.4" flood-color="#1a0b3d" flood-opacity=".45"/>
    </filter>
  </defs>
  <rect width="64" height="64" rx="${rx}" fill="url(#${id}-bg)"/>
  <rect width="64" height="64" rx="${rx}" fill="url(#${id}-sheen)"/>
  ${shape === 'rounded' ? `<rect x=".75" y=".75" width="62.5" height="62.5" rx="14.25" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.5"/>` : ''}
  <g${t}>
    <path d="M32 32 A9 9 0 1 1 23.5 44.1" fill="none" stroke="url(#${id}-low)" stroke-width="8" stroke-linecap="round"/>
    <path d="M40.5 19.9 A9 9 0 1 0 33.6 31.86" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" filter="url(#${id}-depth)"/>
  </g>
</svg>`;
}

/** Horizontal lockup: mark + wordmark (for README, documents, email signatures). */
export function lockupSvg({ color = '#1d1d1f' } = {}) {
  const inner = markSvg({ id: 'lk', xmlns: false }).replace('<svg viewBox="0 0 64 64" role="img" aria-label="SAYEMANS">', '<svg x="0" y="0" width="64" height="64" viewBox="0 0 64 64">');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 64" role="img" aria-label="SAYEMANS">
  ${inner}
  <text x="84" y="43" font-family="-apple-system, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="27" font-weight="600" letter-spacing="5.5" fill="${color}">SAYEMANS</text>
</svg>`;
}
