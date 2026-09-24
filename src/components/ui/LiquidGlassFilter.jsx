import { useEffect } from 'react';

/**
 * SVG displacement filter used by `.glass-refract`. Only Chromium supports
 * url() inside backdrop-filter, so we feature-detect and set a root class.
 */
export default function LiquidGlassFilter() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const chromium = /Chrome\//.test(ua); // Chrome, Edge, Opera, Brave (not iOS/Safari/Firefox)
    const reduced = matchMedia('(prefers-reduced-transparency: reduce)').matches;
    if (chromium && !reduced) document.documentElement.classList.add('supports-refraction');
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
