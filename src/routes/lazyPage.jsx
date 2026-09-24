import { lazy } from 'react';

/**
 * React.lazy with a preload hook. Once preloaded, the page renders
 * synchronously — so prerendered HTML contains final markup (no Suspense
 * fallback) and hydration does not flash.
 */
export function lazyPage(load) {
  let mod = null;
  const preload = () => (mod ? Promise.resolve(mod) : load().then((m) => (mod = m)));
  const Lazy = lazy(preload);
  function Page(props) {
    if (mod) {
      const C = mod.default;
      return <C {...props} />;
    }
    return <Lazy {...props} />;
  }
  Page.preload = preload;
  return Page;
}
