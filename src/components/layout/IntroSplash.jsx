import { BRAND_NAME } from '@/brand/mark';
import { company } from '@/config/company';

// Slight random-looking tilt per letter as it falls (deterministic for SSR).
const tilts = [-14, 9, -6, 12, -10, 7, -12, 10];

/**
 * Opening intro, pure CSS (plays from the prerendered HTML, no JS needed):
 * the letters of SAYEMANS drop in one by one, land with a squash and settle,
 * a gradient line draws underneath, then the curtain lifts.
 * Shown once per session (see index.html) and never with reduced motion.
 * Click/tap skips it.
 */
export default function IntroSplash() {
  return (
    <div className="intro" aria-hidden="true" onClick={(e) => e.currentTarget.classList.add('intro-skip')}>
      <div className="intro-word">
        {BRAND_NAME.split('').map((c, i) => (
          <span key={i} className="intro-letter" style={{ '--i': i, '--r': `${tilts[i % tilts.length]}deg` }}>
            {c}
          </span>
        ))}
      </div>
      <div className="intro-line" />
      <p className="intro-sub">{company.tagline}</p>
    </div>
  );
}
