import { BRAND_NAME, TRACKING_EM } from '@/brand/mark';

/**
 * SAYEMANS logo: the company name as live text (crisp, theme-aware).
 * Each letter is its own span so the logo can do a small wave on hover
 * (see .wm-letter in index.css).
 */
export default function Wordmark({ size = 15, className = '' }) {
  return (
    <span
      aria-label={BRAND_NAME}
      role="img"
      className={`inline-flex font-semibold leading-none whitespace-nowrap ${className}`}
      style={{ fontSize: size, letterSpacing: `${TRACKING_EM}em` }}
    >
      {BRAND_NAME.split('').map((c, i) => (
        <span key={i} aria-hidden="true" className="wm-letter" style={{ '--i': i }}>
          {c}
        </span>
      ))}
    </span>
  );
}
