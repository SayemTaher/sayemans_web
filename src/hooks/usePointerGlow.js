import { useCallback } from 'react';

/** Sets --mx / --my CSS vars on the element so .glass-spec highlights follow the pointer. */
export default function usePointerGlow() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}
