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

1. Create a Firebase project (choose an EU location, e.g. `europe-west4`) and add a **Web app**.
2. `cp .env.example .env` and paste the config values.
3. Enable **Firestore**, **Authentication → Email/Password**, and (optionally) **Analytics**.
4. Deploy rules: `npm i -g firebase-tools && firebase login && firebase use --add && npm run deploy:rules`
5. Create your user in Authentication, then in Firestore create the document `admins/<your-uid>` (any content).
6. Visit `/admin`.

**Collections:** `leads` (contact form), `subscribers` (newsletter), `events` (consented analytics), `admins` (allowlist).

## Deploy (Cloudflare Pages)

In the dashboard: connect the Git repo, build command `npm run build`, output directory `dist`.
Environment variables: `NODE_VERSION=22`, `VITE_SITE_URL`, and all `VITE_FIREBASE_*` values.

Or from the CLI: `npm run deploy:pages` (requires `wrangler login`).

## State management & Redux migration

`src/store` exposes the Redux API (`createSlice`, `combineReducers`, `dispatch`, `subscribe`, middleware, thunks) and react-redux-style hooks (`useAppSelector`, `useAppDispatch`) over React Context + `useSyncExternalStore`. To move to Redux Toolkit, install `@reduxjs/toolkit react-redux`, swap `createStore` for `configureStore`, and replace `StoreProvider` with `<Provider>`. Slices and components stay the same.
