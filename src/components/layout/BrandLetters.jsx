import { BRAND_NAME } from '@/brand/mark';

// Per-letter tile colour, shape and tilt (deterministic, so SSR matches).
const colors = ['#c8f04a', '#ddd0ff', '#ffd9c2', '#f3efe6', '#fbeaa8', '#cdeedd', '#ff9a5c', '#cfe0ff'];
const shapes = ['50%', '22%', '50% 50% 18% 18%', '30% 70% 70% 30% / 30% 30% 70% 70%', '18%', '50% 50% 50% 12%', '40%', '14% 50% 14% 50%'];
const tilts = [-14, 9, -6, 12, -10, 7, -12, 10];

/**
 * The company name as a row of letter tiles. Shared by the opening intro
 * (tiles pop in once) and the global loader (tiles keep morphing).
 * Built from BRAND_NAME, so renaming the brand updates both.
 */
export default function BrandLetters({ letterClass = '' }) {
  return (
    <span className="intro-word" aria-hidden="true">
      {BRAND_NAME.split('').map((c, i) => (
        <span
          key={i}
          className={`tile ${letterClass}`}
          style={{ '--i': i, '--r': `${tilts[i % tilts.length]}deg`, '--c': colors[i % colors.length], '--shape': shapes[i % shapes.length] }}
        >
          <span className="glyph">{c}</span>
        </span>
      ))}
    </span>
  );
}
