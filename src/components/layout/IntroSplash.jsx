import { company } from '@/config/company';
import BrandLetters from './BrandLetters';

/**
 * Opening intro on every full page load (first visit or refresh), pure CSS so
 * it plays straight from the prerendered HTML: letters drop in, land with a
 * squash and settle, a gradient line draws, then the curtain lifts.
 * Skipped with reduced motion; click/tap skips it.
 */
export default function IntroSplash() {
  return (
    <div className="intro" aria-hidden="true" onClick={(e) => e.currentTarget.classList.add('intro-skip')}>
      <BrandLetters letterClass="intro-letter" />
      <div className="intro-line" />
      <p className="intro-sub">{company.tagline}</p>
    </div>
  );
}
