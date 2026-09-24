import { Component } from 'react';

const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Failed to fetch|ChunkLoadError|Loading chunk/i;
const RECOVER_KEY = 'sayemans:chunk-recover';

/**
 * Catches errors while loading/rendering a page.
 * A failed code download (e.g. an old tab after a new deploy) sends the
 * visitor home with a fresh page load, once. Anything else shows a calm
 * fallback with a way home.
 */
export default class RouteErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (!CHUNK_ERROR.test(String(error?.message))) return;
    try {
      const last = Number(sessionStorage.getItem(RECOVER_KEY) || 0);
      if (Date.now() - last < 30000) return; // already tried recently: show fallback
      sessionStorage.setItem(RECOVER_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    window.location.assign('/');
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section className="grid min-h-[70vh] place-items-center px-5 text-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Something did not load.</h1>
          <p className="mt-3 text-fg-muted">Please try again, or head back to the home page.</p>
          <a href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-fg px-6 font-medium text-bg">Back home</a>
        </div>
      </section>
    );
  }
}
