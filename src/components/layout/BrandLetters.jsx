import { BRAND_NAME } from '@/brand/mark';

// Slight tilt per letter as it falls (deterministic, so SSR matches).
const tilts = [-14, 9, -6, 12, -10, 7, -12, 10];

/**
 * The company name split into animatable letters. Shared by the opening
 * intro (letters drop in once) and the global loader (letters keep bouncing).
 * Built from BRAND_NAME, so renaming the brand updates both.
 */
export default function BrandLetters({ letterClass }) {
  return (
    <span className="intro-word" aria-hidden="true">
      {BRAND_NAME.split('').map((c, i) => (
        <span key={i} className={letterClass} style={{ '--i': i, '--r': `${tilts[i % tilts.length]}deg` }}>
          {c}
        </span>
      ))}
    </span>
  );
}
