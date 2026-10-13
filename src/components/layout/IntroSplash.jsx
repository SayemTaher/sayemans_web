import { company } from '@/config/company';
import BrandLetters from './BrandLetters';

/**
 * Opening intro on every full page load (first visit or refresh), pure CSS so
 * it plays straight from the prerendered HTML: letter tiles pop in, the
 * variable font swells from hairline to heavy, a lime squiggle draws, then the
 * ultramarine stage lifts away. Skipped with reduced motion; click/tap skips it.
 */
export default function IntroSplash() {
  return (
    <div className="intro" aria-hidden="true" onClick={(e) => e.currentTarget.classList.add('intro-skip')}>
      <BrandLetters />
      <svg className="intro-squiggle" viewBox="0 0 520 22" fill="none" preserveAspectRatio="none">
        <path pathLength="1" d="M4 14 C 40 2, 70 22, 104 12 S 170 2, 208 12 S 276 22, 312 12 S 380 2, 416 12 S 484 22, 516 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <p className="intro-sub">{company.tagline}</p>
    </div>
  );
}
