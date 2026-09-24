import { BRAND_NAME, TRACKING_EM } from '@/brand/mark';

/** SAYEMANS logo: the company name as live text (crisp, theme-aware, no image). */
export default function Wordmark({ size = 15, className = '' }) {
  return (
    <span
      className={`font-semibold leading-none whitespace-nowrap ${className}`}
      style={{ fontSize: size, letterSpacing: `${TRACKING_EM}em` }}
    >
      {BRAND_NAME}
    </span>
  );
}
