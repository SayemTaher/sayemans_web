import { useId } from 'react';
import { wordmarkSvg, WORDMARK_RATIO } from '@/brand/mark';

/** SAYEMANS custom logotype. Ink follows `currentColor`, so it adapts to the theme. */
export default function Wordmark({ height = 18, className = '' }) {
  const id = `wm${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 [&>svg]:block [&>svg]:size-full ${className}`}
      style={{ height, width: height * WORDMARK_RATIO }}
      dangerouslySetInnerHTML={{ __html: wordmarkSvg({ id, xmlns: false }) }}
    />
  );
}
