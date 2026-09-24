import { useId } from 'react';
import { markSvg } from '@/brand/mark';

/** The SAYEMANS "Layered S" mark, rendered inline (crisp at any size). */
export default function LogoMark({ size = 32, className = '' }) {
  const id = `sm${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 [&>svg]:size-full ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: markSvg({ id, xmlns: false }) }}
    />
  );
}
