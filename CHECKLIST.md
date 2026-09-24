# SAYEMANS Website: Delivery Checklist & Progress Tracker

> Single source of truth for **what's done, what's due and where we left off**.
> Update this file at the end of every work session.
> Legend: `[x]` done · `[ ]` to do · 🔴 blocked on owner input · 🟡 nice-to-have

---

## 📍 Where we left off

**Last session: 24 Sep 2026, Phase 1 (Foundation) complete.**
The full site runs locally in dev (`npm run dev`) and as a prerendered production build (`npm run build && npm run preview`).
Firebase is **not connected yet**: forms and analytics currently use the local fallback adapter (browser storage).

Code is on GitHub: https://github.com/SayemTaher/sayemans_web (branch `main`).

**Next up:** connect the repo in Cloudflare Pages (see Phase 2) → remaining 🔴 owner inputs (house number, BTW-id, prices, socials) → create the Firebase project → deploy to Cloudflare Pages (Phase 2).

---

## 🔴 Owner inputs needed (blocking launch)

| # | Item | Where it goes |
|---|------|---------------|
| 1 | ~~KvK number~~ ✅ 85588105 (vestigingsnr. 000051624834) | done |
| 2 | BTW-id (VAT number, format NL…B..; **not** the omzetbelastingnummer) | `src/config/company.js` → `vat` |
| 3 | ~~Legal name~~ ✅ SAYEMANS, Eenmanszaak, SBI 62100 | done |
| 4 | Business address: ✅ Brunelleschiweg, 5624 CJ Eindhoven. **House number still missing** | `company.address.street` |
| 5 | ~~Domain~~ ✅ sayemtaher.org | done |
| 6 | Confirm prices (projects, subscriptions, hourly €95) | `src/data/pricing.js` |
| 7 | ~~Founding date~~ ✅ 14 Feb 2022 | done |
| 8 | Social links (LinkedIn, Instagram, GitHub) | `company.socials` |
| 9 | Phone number (optional) | `company.phone` |
| 10 | Confirm TaalMeester "What we delivered" list & stats | `src/data/products.js` |
| 11 | Logo files (SVG) if you have a brand mark; currently a generated "S" glyph | `public/favicon.svg`, `components/layout/Logo.jsx` |
| 12 | Legal review of Privacy / Terms / Cookie pages (templates, not legal advice) | `src/pages/legal/*` |

---

## Phase 1: Foundation ✅

### Architecture
- [x] React 19 + Vite 8 + Tailwind CSS 4 project scaffold
- [x] React Router 8 with a single route table (`src/routes/routes.jsx`) driving routing, SEO, prerender and sitemap
- [x] Code-split pages (`lazyPage`) with preload for SSR/hydration (no content flash)
- [x] State: Context + `useSyncExternalStore` store with a **Redux-compatible API** (`createSlice`, `combineReducers`, `dispatch`, middleware, thunks) → drop-in migration to Redux Toolkit (see `src/store/core.js`)
- [x] Slices: `ui` (theme, nav, toasts), `consent` (cookies), `auth` (admin)
- [x] Persist middleware (theme + consent → localStorage)
- [x] Path alias `@/` → `src/`
- [x] ESLint 9 flat config (react, hooks, refresh); lint clean

### Design system (Apple Liquid Glass)
- [x] Design tokens in `src/styles/index.css` (`@theme`): Apple system colours, SF Pro font stack + self-hosted Inter fallback (GDPR-safe, no Google CDN)
- [x] Light / dark / system themes with no flash on load
- [x] `.glass` material: blur + saturation, specular rim light, pointer-tracking highlight
- [x] Real refraction via SVG displacement filter on Chromium (nav bar), graceful fallback elsewhere
- [x] Respects `prefers-reduced-motion` and `prefers-reduced-transparency`
- [x] Motion: spring physics, word-by-word blur reveals, scroll-linked 3D hero, scroll-lit statement text, sticky process timeline, parallax, count-up stats, page transitions, shared-layout nav pill
- [x] GPU hygiene: filters/transforms released after animations (prevents black-layer rendering)

### Pages (17 routes, 26 prerendered URLs)
- [x] Home: hero, capabilities marquee, statement, services bento, **TaalMeester spotlight**, process, pricing, industries, stats, principles, FAQ, CTA
- [x] Services overview + 8 service detail pages
- [x] Solutions (B2B, SaaS, startups, EdTech, web, design systems)
- [x] Products + **TaalMeester case study** (curriculum, features, business model, App Store/website/Instagram links)
- [x] Pricing: fixed projects, subscriptions, hourly, billing FAQ
- [x] Process · About (company facts incl. KvK/BTW when filled) · Insights (3 articles) + article pages
- [x] Contact: multi-step-feel inquiry form (services, budget, timeline), validation, honeypot, success state, `?service=` / `?plan=` prefill
- [x] Legal: Privacy (GDPR/AVG), Terms, Cookies (with "open cookie settings")
- [x] 404 page (served as `404.html` on Cloudflare)
- [x] Mobile menu, mega menu, skip link, focus states

### SEO
- [x] Build-time prerender (SSG) of every page → full HTML for crawlers
- [x] Per-page title, description, canonical, Open Graph, Twitter cards
- [x] JSON-LD: ProfessionalService/Organization, WebSite, Service, BreadcrumbList, FAQPage, BlogPosting, MobileApplication (TaalMeester)
- [x] `sitemap.xml` auto-generated from the route table, `robots.txt`
- [x] Semantic HTML, one `h1` per page, accessible headings

### Backend foundations (Firebase)
- [x] Lazy Firebase SDK loading (only when needed)
- [x] Local fallback adapter when Firebase env is missing
- [x] Leads → Firestore `leads` (with UTM/referrer/landing attribution)
- [x] Newsletter → Firestore `subscribers`
- [x] Consent-gated first-party analytics → Firestore `events` (+ GA4 via Firebase Analytics when measurement ID is set)
- [x] Firestore security rules (create-only, schema-validated public writes; admin-only reads)
- [x] Firestore indexes
- [x] Admin dashboard `/admin`: Firebase Auth login, admin allowlist, KPIs, 30-day page views, top pages/referrers/devices/campaigns, lead pipeline with status (new → won/lost), lead detail, CSV export, subscribers list
- [x] Optional App Check (reCAPTCHA Enterprise) hook

### Hosting (Cloudflare)
- [x] `wrangler.toml` for Cloudflare Pages
- [x] `_headers`: security headers (HSTS, XFO, nosniff, referrer, permissions), immutable asset caching, noindex for `/admin`
- [x] `npm run deploy:pages` script

---

## Phase 2: Go live ⏳ (next)

- [ ] 🔴 Fill owner inputs above
- [ ] Create Firebase project (region **europe-west** for EU data residency) and add a Web App
- [ ] Copy `.env.example` → `.env` and fill the Firebase keys
- [ ] Enable Firestore, Authentication (Email/Password), Analytics
- [ ] `npm i -g firebase-tools` → `firebase login` → `npm run deploy:rules`
- [ ] Create your admin user in Firebase Auth → add doc `admins/{uid}` in Firestore
- [x] Push code to GitHub (`SayemTaher/sayemans_web`, branch `main`)
- [ ] Create Cloudflare Pages project `sayemans` → Connect to Git → `SayemTaher/sayemans_web`
  - Build command `npm run build`, output `dist`, env `NODE_VERSION=22` + all `VITE_*` vars
- [ ] Connect custom domain `sayemtaher.org` + `www.sayemtaher.org` redirect
- [ ] Add the domain to Firebase Auth → Authorized domains
- [ ] Create `public/og-image.png` (1200×630) for social sharing
- [ ] Apple touch icon (`apple-touch-icon.png` 180×180)
- [ ] Google Search Console + Bing Webmaster: verify and submit the sitemap
- [ ] Test: form submit → lead appears in `/admin`; analytics after consent
- [ ] Lighthouse pass (target ≥ 95 in all four categories)

## Phase 3: Hardening & growth 🟡

- [ ] Cloudflare Turnstile on the contact form, verified in a Pages Function (`functions/api/lead.js`)
- [ ] Email notification on new lead (Firebase Extension "Trigger Email" or Pages Function + Resend/Postmark)
- [ ] Auto-reply email to the prospect
- [ ] Firebase App Check enforcement
- [ ] Data retention job: delete `events` older than 14 months (scheduled Cloud Function / Cloudflare Cron Worker)
- [ ] Dutch translation (`/nl/*`) with `hreflang` (i18n-ready structure: move copy into `src/locales`)
- [ ] CMS for Insights (Firestore `posts` or headless CMS) instead of `src/data/insights.js`
- [ ] Case studies section (`/work`) as client projects come in
- [ ] Testimonials / client logos (only real ones)
- [ ] Booking integration (Cal.com) for intro calls
- [ ] Careers page
- [ ] Sentry error monitoring
- [ ] Unit tests (Vitest + Testing Library) and e2e (Playwright)
- [ ] GitHub Actions CI: lint → build → deploy preview per PR

## Phase 4: Scale 🟡

- [ ] Migrate store to Redux Toolkit when state grows (see `src/store/core.js` header for the 3-step migration)
- [ ] Client portal (project status, invoices, files) on the same Firebase Auth
- [ ] Admin: lead notes, assignees, pipeline value, email templates
- [ ] A/B testing of hero and pricing copy

---

## 🔧 Maintenance routine

| Frequency | Task |
|-----------|------|
| Weekly | Check `/admin` leads; reply within 24h |
| Monthly | `npm outdated` → update deps; `npm audit`; review Firestore usage and costs |
| Monthly | Publish 1–2 Insights articles (SEO) |
| Quarterly | Lighthouse and accessibility audit; review pricing; review legal pages |
| Yearly | Renew domain; review privacy policy & processors; rotate admin passwords |

---

## 📓 Session log

| Date | Summary |
|------|---------|
| 2026-09-24 | Domain set to sayemtaher.org; git repo initialised and pushed to GitHub `main`. |
| 2026-09-24 | Added KvK registry data (KvK, legal form, SBI, Eindhoven address, founding date) to config, About, footer, legal pages, JSON-LD; Eindhoven local-SEO copy. |
| 2026-09-24 | Phase 1 complete: architecture, Liquid Glass design system, 17 routes / 26 prerendered pages, SEO, Firebase-ready backend with admin dashboard, Cloudflare config. Verified in browser (desktop, mobile, light, dark, hydration). |
