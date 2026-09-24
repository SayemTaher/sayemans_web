<p><img src="public/logo.svg" alt="SAYEMANS" height="48" /></p>

# SAYEMANS: Digital Product Studio Website

Next-generation marketing site for **SAYEMANS**, built with React 19, Vite, Tailwind CSS 4 and an Apple Liquid Glass-inspired design system.
It is prerendered for SEO, hosted on **Cloudflare Pages** and backed by **Firebase** (Firestore, Auth, Analytics).

➡️ **Progress, owner inputs and roadmap: see [CHECKLIST.md](CHECKLIST.md).**

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # client build + SSR prerender → dist/
npm run preview      # serve dist/ locally (http://localhost:4173)
npm run lint
```

Requires Node **22.12+** (see `.nvmrc`). Without a `.env`, the site runs fully with a **local fallback backend**: leads and events are stored in your browser, and `/admin` accepts any login in dev.

## Project structure

```
src/
  config/        company.js (KvK, BTW, email…), navigation.js, seo.js (JSON-LD)
  data/          services, pricing, products (TaalMeester), content, insights
  routes/        routes.jsx (routing + SEO + sitemap source of truth), lazyPage.jsx
  store/         Redux-compatible store (core.js), slices/, persist middleware
  services/      firebase.js (lazy SDK), leads.js, analytics.js, admin.js, localAdapter.js
  components/
    ui/          Glass, Button, Reveal/RevealText, Counter, Aurora, Marquee, Accordion, Icon
    layout/      Navbar, Footer, CookieConsent, Toast, Head (SEO), SiteEffects
    sections/    Hero, ServicesBento, TaalMeesterSpotlight, ProcessSticky, PricingCards…
  pages/         one file per route (+ legal/, admin/)
  styles/        index.css (design tokens, glass material, themes)
  entry-server.jsx  SSR render used by scripts/prerender.mjs
scripts/prerender.mjs   writes dist/<route>/index.html, 404.html, sitemap.xml
firestore.rules         security rules (public create-only, admin read)
wrangler.toml           Cloudflare Worker static-assets config
src/brand/mark.js       logo source of truth (SAYEMANS wordmark + S app icon) → `npm run images` regenerates favicon, icons, logo files, OG image
public/_headers         Cloudflare security & cache headers
```

### Common edits

| Want to change… | Edit |
|---|---|
| Company details / legal info | `src/config/company.js` |
| Services | `src/data/services.js` (pages, nav, sitemap update automatically) |
| Prices | `src/data/pricing.js` |
| TaalMeester content | `src/data/products.js` |
| Add a page | create `src/pages/X.jsx` + add one entry in `src/routes/routes.jsx` |
| Colours / fonts / glass | `src/styles/index.css` |

## Backend setup (Firebase)

Project: **`sayemans`**. Its web config lives in `.env.production`, which is committed because Firebase web config is public by design; access is controlled by `firestore.rules`. `npm run dev` keeps using the local test adapter; to use real Firebase in dev, copy `.env.production` to `.env.local`.

1. Firebase console → **Firestore Database → Create database** (location `eur3` or `europe-west4`, production mode).
2. **Authentication → Get started → Email/Password → Enable**, and add `sayemans.org` under Settings → Authorized domains.
3. Deploy the security rules: `npx -y firebase-tools login`, then `npm run deploy:rules`.
4. Leads and newsletter sign-ups are both emailed and saved; the visitor sees success if either works.
5. Create your user in Authentication, then in Firestore create the document `admins/<your-uid>` (any content).
6. Visit `/admin`.

**Collections:** `leads` (contact form), `subscribers` (newsletter), `events` (consented analytics), `admins` (allowlist).

## Deploy (Cloudflare Workers, static assets)

Hosted as a Cloudflare Worker serving `dist/` (config: `wrangler.toml`). Workers Builds deploys every push to `main`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build variables: `NODE_VERSION=22`, `VITE_SITE_URL=https://sayemans.org`, and all `VITE_FIREBASE_*` values
- The `name` in `wrangler.toml` must equal the Worker name in the dashboard.

From the CLI: `npm run deploy` (requires `wrangler login`).

## Contact form email (Resend)

`worker/index.js` handles `POST /api/contact` and `/api/subscribe`. It validates each submission, blocks other origins and honeypot bots, and emails it to `CONTACT_TO` (`sayemans.org@gmail.com`) through [Resend](https://resend.com), whose free tier includes 3,000 emails per month. Reply-to is set to the visitor, so you can answer straight from Gmail.

1. Create a free Resend account **with sayemans.org@gmail.com**. Until you verify a domain, Resend only delivers to the account owner's address.
2. Resend → API Keys → create a key with *Sending access*.
3. Cloudflare → Worker → Settings → Variables and Secrets → add a **Secret** named `RESEND_API_KEY`, then redeploy.
4. Optional: in Resend → Domains, add `sayemans.org` and its DNS records in Cloudflare. Then set `MAIL_FROM` to `SAYEMANS <hello@sayemans.org>` and `CONFIRMATION_EMAILS = "true"` in `wrangler.toml` so visitors get an automatic confirmation.

Local test: `npm run build && npx wrangler dev`, with the key in `.dev.vars` (git-ignored).

## State management & Redux migration

`src/store` exposes the Redux API (`createSlice`, `combineReducers`, `dispatch`, `subscribe`, middleware, thunks) and react-redux-style hooks (`useAppSelector`, `useAppDispatch`) over React Context + `useSyncExternalStore`. To move to Redux Toolkit, install `@reduxjs/toolkit react-redux`, swap `createStore` for `configureStore`, and replace `StoreProvider` with `<Provider>`. Slices and components stay the same.
