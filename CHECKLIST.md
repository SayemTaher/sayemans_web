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
| 5 | ~~Domain~~ ✅ sayemans.org | done |
| 6 | Confirm prices (projects, subscriptions, hourly €95) | `src/data/pricing.js` |
| 7 | ~~Founding date~~ ✅ 14 Feb 2022 | done |
| 8 | Social links (LinkedIn, Instagram, GitHub) | `company.socials` |
| 9 | Phone number (optional) | `company.phone` |
| 10 | Confirm TaalMeester "What we delivered" list & stats | `src/data/products.js` |
| 11 | ~~Logo~~ ✅ Minimal text logo "SAYEMANS" (`src/brand/mark.js`) | done |
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
- [x] Partners page + homepage section (Mentic, affiliated business partner)
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
- [x] Firebase project `sayemans` created + Web App registered; config committed in `.env.production` (public by design) and `.firebaserc`
- [ ] 🔴 Firestore: Console → Build → Firestore Database → Create database (location **eur3** or europe-west4, production mode)
- [ ] 🔴 Authentication: Console → Build → Authentication → Get started → enable Email/Password
- [ ] 🔴 Deploy rules: `npx -y firebase-tools login` → `npm run deploy:rules`
- [ ] 🔴 Create your admin user in Auth → Firestore doc `admins/{your-uid}`
- [ ] Auth → Settings → Authorized domains → add `sayemans.org`
- [x] Push code to GitHub (`SayemTaher/sayemans_web`, branch `main`)
- [x] Cloudflare Worker (static assets) connected to Git; `wrangler.toml` switched from Pages to Workers `[assets]` config
- [ ] Confirm first successful deploy (Worker name must match `name` in `wrangler.toml`)
  - Build `npm run build`, deploy `npx wrangler deploy`, env `NODE_VERSION=22` + all `VITE_*` vars
- [ ] Connect custom domain `sayemans.org` + `www.sayemans.org` redirect
- [ ] Add the domain to Firebase Auth → Authorized domains
- [x] `public/og-image.png` (1200×630) for social sharing (`npm run images`)
- [x] Apple touch icon + 192/512 PWA icons
- [ ] Google Search Console + Bing Webmaster: verify and submit the sitemap
- [ ] Test: form submit → lead appears in `/admin`; analytics after consent
- [x] GitHub Actions CI (lint → build → verify prerender)
- [~] Lighthouse (local, mobile sim): Perf 90–94, A11y 96–100, Best Practices 100, SEO 100. Remaining: homepage scroll-statement dim words (intentional effect); CSS inlining for FCP
- [ ] Re-run Lighthouse on the live domain

## Phase 3: Hardening & growth 🟡

- [ ] Cloudflare Turnstile on the contact form, verified in a Pages Function (`functions/api/lead.js`)
- [x] Email on new lead + newsletter sign-up: Worker `/api/contact` & `/api/subscribe` → Resend → sayemans.org@gmail.com (code done, tested locally)
- [ ] 🔴 Add `RESEND_API_KEY` secret in Cloudflare (Resend account must be registered with sayemans.org@gmail.com until a domain is verified)
- [ ] Verify `sayemans.org` in Resend → set `MAIL_FROM` to `hello@sayemans.org` and `CONFIRMATION_EMAILS="true"` (auto-reply to visitors)
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
| 2026-09-25 | Intro now plays on every full page load. Same bouncing SAYEMANS letters power a global loader: anything registers via useLoading()/trackLoading(); overlay after 350ms, bounces until resolved, after 12s sends visitor home (or reloads once on home). Failed page-code downloads recover via RouteErrorBoundary. Settings in src/config/loader.js. |
| 2026-09-25 | Motion & "show, don't tell" pass (inspired by Mentic's playful springs): CSS opening intro (bouncing SAYEMANS letters, once per session), logo letter-wave on hover, before/after checkout slider, chat-thread "week with SAYEMANS", scroll-velocity kinetic word band, spring-pop service icons. Industries/Principles moved off the homepage. |
| 2026-09-25 | Added affiliated partner Mentic (mentic.io): homepage section + /partners page, facts verified from their site, independence disclaimer. |
| 2026-09-25 | Live domain is **sayemans.org** (sayemtaher.org does not exist, NXDOMAIN): all URLs, sitemap, OG, CORS origins switched. Found live site stuck on commit b80ce56 → Worker deploys (1a364c6, faab0db) not live yet. Firestore DB + Auth now exist; security rules still Firebase defaults (deny all). |
| 2026-09-25 | Firebase project `sayemans` wired into production builds. Leads/subscribers now saved via email OR Firestore (either succeeding counts), with an 8s Firestore timeout. Firestore + Auth still need enabling in the console. |
| 2026-09-25 | Contact form now emails inquiries via Cloudflare Worker + Resend (to sayemans.org@gmail.com); business email changed to sayemans.org@gmail.com; logo simplified to plain text name; URLs served without trailing slash. |
| 2026-09-24 | Copy pass: removed overused buzzwords (craft, ambitious, effortless, momentum, next generation, etc.); new tagline "Digital products, built with passion." |
| 2026-09-24 | Logo is now a custom-drawn SAYEMANS wordmark (no initial tile); favicon/app icons use the wordmark S. Hero dashboard replaced by a content-rich "Project Hub" (phases, sprint, activity, staging + Lighthouse/CWV, demo, budget). |
| 2026-09-24 | New brand mark "Layered S" (src/brand/mark.js): navbar/footer/admin logo, favicon (SVG + 32px PNG), apple-touch, PWA + maskable icons, logo.svg/logo-white.svg/logo.png lockups, OG image, JSON-LD logo. |
| 2026-09-24 | TaalMeester phone now shows the real app screenshot (assets-src/taalmeester_home.png → 33/54 KB WebP via `npm run images`). |
| 2026-09-24 | Light-mode link blue #0066cc (contrast), stronger mockup text; pushed to trigger Cloudflare redeploy. |
| 2026-09-24 | Switched hosting config to Cloudflare Workers static assets (fixes `wrangler deploy` error). Added OG image, app icons, CI, CSS-first hero entrance (Speed Index 5.9s → 2.8s), contrast fixes. |
| 2026-09-24 | Domain set to sayemans.org; git repo initialised and pushed to GitHub `main`. |
| 2026-09-24 | Added KvK registry data (KvK, legal form, SBI, Eindhoven address, founding date) to config, About, footer, legal pages, JSON-LD; Eindhoven local-SEO copy. |
| 2026-09-24 | Phase 1 complete: architecture, Liquid Glass design system, 17 routes / 26 prerendered pages, SEO, Firebase-ready backend with admin dashboard, Cloudflare config. Verified in browser (desktop, mobile, light, dark, hydration). |
