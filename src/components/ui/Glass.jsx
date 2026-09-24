import usePointerGlow from '@/hooks/usePointerGlow';

/**
 * Liquid Glass surface.
 * @param {'div'|'section'|'article'|'li'} as
 * @param {boolean} interactive  pointer-tracking specular highlight
 * @param {boolean} refract      real refraction (Chromium) — use on small chrome like nav bars
 */
export default function Glass({ as: Tag = 'div', interactive = true, refract = false, className = '', children, ...rest }) {
  const onPointerMove = usePointerGlow();
  return (
    <Tag
      className={`glass glass-rim ${interactive ? 'glass-spec' : ''} ${refract ? 'glass-refract' : ''} ${className}`}
      onPointerMove={interactive ? onPointerMove : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
