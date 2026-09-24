import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter, matchRoutes } from 'react-router';
import App from './App';
import { routes, prerenderPaths, sitemapEntries, preloadRoute } from './routes/routes';
import { buildHead, headToString } from './components/layout/Head';

async function streamToString(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}

export async function render(url) {
  await preloadRoute(url);
  const match = matchRoutes(routes, url)?.[0];
  const seo = match?.route?.seo?.(match.params) ?? {};
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // Keep all markup inline (no outlined Suspense segments) for crawlers.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const html = await streamToString(prelude);
  return { html, head: headToString(buildHead(seo, url)) };
}

export { prerenderPaths, sitemapEntries };
