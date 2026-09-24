# CLAUDE.md

Website for SAYEMANS (digital product studio, NL). React 19 + Vite 8 + Tailwind 4 + React Router 8 + Motion; prerendered (SSG) for SEO; Cloudflare Pages hosting; Firebase backend.

- **Progress tracker:** `CHECKLIST.md`. Read it first; update "Where we left off" and the session log at the end of every session.
- Commands: `npm run dev`, `npm run build` (client + SSR prerender), `npm run preview`, `npm run lint`.
- Routing, SEO metadata, prerender list and sitemap all come from `src/routes/routes.jsx`. New pages need one entry there.
- Content lives in `src/data/*` and `src/config/company.js`; components should not hardcode copy that belongs there.
- State: `src/store` is a Redux-compatible Context store. Keep slices pure (return new state) so an RTK migration stays drop-in.
- Firebase is lazy-loaded and optional; every service must keep working with `localAdapter` when env vars are missing.

## Gotchas
- Never put CSS `filter` on page-tall wrappers (renders black: GPU texture limit). Entrance animations must use `transitionEnd` to drop filter/transform.
- `background-clip: text` gradients must sit on the animated word spans (RevealText handles it), not on a parent.
- Server/client markup must match: compute active nav state from `pathname` (not NavLink), read localStorage only in effects.
- Prerender uses `progressiveChunkSize: MAX` so React doesn't outline Suspense content.
- `vite preview` needs the custom middleware in `vite.config.js` to serve nested `index.html`.
- npm global cache has permission issues on this machine; use `npm_config_cache=<scratch>` if installs fail with EACCES.
