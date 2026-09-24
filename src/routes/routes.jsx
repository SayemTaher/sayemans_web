import { lazyPage } from './lazyPage';
import { services, getService } from '@/data/services';
import { insights, getInsight } from '@/data/insights';
import { generalFaqs } from '@/data/content';
import { pricingFaqs } from '@/data/pricing';
import { taalmeester } from '@/data/products';
import { company } from '@/config/company';
import { breadcrumbLd, faqLd, organizationLd, taalmeesterLd, websiteLd } from '@/config/seo';

// ─────────────────────────────────────────────────────────────
// Route table — single source of truth for routing, SEO metadata,
// prerendering and sitemap generation.
//   seo(params)  → { title, description, jsonLd?, noindex?, image? }
//   prerender    → list of concrete paths to render at build time
//   sitemap      → { priority, changefreq } (omit to exclude)
// ─────────────────────────────────────────────────────────────

const Home = lazyPage(() => import('@/pages/Home'));
const Services = lazyPage(() => import('@/pages/Services'));
const ServiceDetail = lazyPage(() => import('@/pages/ServiceDetail'));
const Solutions = lazyPage(() => import('@/pages/Solutions'));
const Products = lazyPage(() => import('@/pages/Products'));
const TaalMeester = lazyPage(() => import('@/pages/TaalMeester'));
const Pricing = lazyPage(() => import('@/pages/Pricing'));
const Process = lazyPage(() => import('@/pages/Process'));
const About = lazyPage(() => import('@/pages/About'));
const Insights = lazyPage(() => import('@/pages/Insights'));
const InsightArticle = lazyPage(() => import('@/pages/InsightArticle'));
const Contact = lazyPage(() => import('@/pages/Contact'));
const Privacy = lazyPage(() => import('@/pages/legal/Privacy'));
const Terms = lazyPage(() => import('@/pages/legal/Terms'));
const Cookies = lazyPage(() => import('@/pages/legal/Cookies'));
const Admin = lazyPage(() => import('@/pages/admin/Admin'));
const NotFound = lazyPage(() => import('@/pages/NotFound'));

export const routes = [
  {
    path: '/',
    Component: Home,
    sitemap: { priority: 1.0, changefreq: 'weekly' },
    seo: () => ({
      title: '',
      description:
        'SAYEMANS is a digital product studio in Eindhoven, the Netherlands. We design and build websites, SaaS platforms, mobile apps and design systems for B2B companies and startups.',
      jsonLd: [organizationLd(), websiteLd(), faqLd(generalFaqs)],
    }),
  },
  {
    path: '/services',
    Component: Services,
    sitemap: { priority: 0.9, changefreq: 'monthly' },
    seo: () => ({
      title: 'Services',
      description:
        'UI/UX design, web development, mobile apps, SaaS product development, design systems, cloud integrations and care plans, end to end.',
      jsonLd: [breadcrumbLd([{ name: 'Services', path: '/services' }])],
    }),
  },
  {
    path: '/services/:slug',
    Component: ServiceDetail,
    prerender: services.map((s) => `/services/${s.slug}`),
    sitemap: { priority: 0.8, changefreq: 'monthly' },
    seo: ({ slug }) => {
      const s = getService(slug);
      if (!s) return { title: 'Service not found', description: '', noindex: true };
      return {
        title: s.title,
        description: s.summary,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.title,
            description: s.description,
            provider: { '@id': `${company.siteUrl}/#organization` },
            areaServed: ['NL', 'EU'],
          },
          breadcrumbLd([{ name: 'Services', path: '/services' }, { name: s.title, path: `/services/${s.slug}` }]),
        ],
      };
    },
  },
  {
    path: '/solutions',
    Component: Solutions,
    sitemap: { priority: 0.8, changefreq: 'monthly' },
    seo: () => ({
      title: 'Solutions for B2B, SaaS & Startups',
      description:
        'Digital solutions tailored to B2B companies, SaaS teams, startups, EdTech and e-commerce: portals, MVPs, dashboards and apps.',
    }),
  },
  {
    path: '/products',
    Component: Products,
    sitemap: { priority: 0.8, changefreq: 'monthly' },
    seo: () => ({
      title: 'Products',
      description: 'Products designed, built and operated by SAYEMANS, including TaalMeester, the Dutch learning app for expats.',
    }),
  },
  {
    path: '/products/taalmeester',
    Component: TaalMeester,
    sitemap: { priority: 0.9, changefreq: 'monthly' },
    seo: () => ({
      title: 'TaalMeester: Dutch learning app for inburgering',
      description: taalmeester.summary,
      type: 'article',
      jsonLd: [taalmeesterLd(), breadcrumbLd([{ name: 'Products', path: '/products' }, { name: 'TaalMeester', path: '/products/taalmeester' }])],
    }),
  },
  {
    path: '/pricing',
    Component: Pricing,
    sitemap: { priority: 0.9, changefreq: 'monthly' },
    seo: () => ({
      title: 'Pricing',
      description:
        'Transparent pricing for fixed-scope projects, monthly design & development subscriptions and care plans. All prices in EUR excl. VAT.',
      jsonLd: [faqLd(pricingFaqs)],
    }),
  },
  {
    path: '/process',
    Component: Process,
    sitemap: { priority: 0.7, changefreq: 'yearly' },
    seo: () => ({
      title: 'Our Process',
      description: 'Discover, define, design, develop, deliver, evolve. How SAYEMANS takes digital products from idea to growth.',
    }),
  },
  {
    path: '/about',
    Component: About,
    sitemap: { priority: 0.7, changefreq: 'yearly' },
    seo: () => ({
      title: 'About',
      description: 'SAYEMANS is a digital product studio in Eindhoven (KvK 85588105), founded in 2022 and focused on craft, speed and measurable outcomes.',
    }),
  },
  {
    path: '/insights',
    Component: Insights,
    sitemap: { priority: 0.7, changefreq: 'weekly' },
    seo: () => ({
      title: 'Insights',
      description: 'Articles on product strategy, design and engineering from the SAYEMANS studio.',
    }),
  },
  {
    path: '/insights/:slug',
    Component: InsightArticle,
    prerender: insights.map((i) => `/insights/${i.slug}`),
    sitemap: { priority: 0.6, changefreq: 'yearly' },
    seo: ({ slug }) => {
      const a = getInsight(slug);
      if (!a) return { title: 'Article not found', description: '', noindex: true };
      return {
        title: a.title,
        description: a.excerpt,
        type: 'article',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.excerpt,
            datePublished: a.date,
            author: { '@type': 'Organization', name: 'SAYEMANS' },
            publisher: { '@id': `${company.siteUrl}/#organization` },
          },
        ],
      };
    },
  },
  {
    path: '/contact',
    Component: Contact,
    sitemap: { priority: 0.9, changefreq: 'yearly' },
    seo: () => ({
      title: 'Start a project',
      description: 'Tell us about your product. We reply within one business day with next steps and a free intro call.',
    }),
  },
  { path: '/privacy', Component: Privacy, sitemap: { priority: 0.2, changefreq: 'yearly' }, seo: () => ({ title: 'Privacy Policy', description: 'How SAYEMANS collects, uses and protects personal data under the GDPR (AVG).' }) },
  { path: '/terms', Component: Terms, sitemap: { priority: 0.2, changefreq: 'yearly' }, seo: () => ({ title: 'Terms & Conditions', description: 'General terms and conditions of SAYEMANS.' }) },
  { path: '/cookies', Component: Cookies, sitemap: { priority: 0.2, changefreq: 'yearly' }, seo: () => ({ title: 'Cookie Policy', description: 'Which cookies SAYEMANS uses and how to manage your preferences.' }) },
  { path: '/admin', Component: Admin, bare: true, seo: () => ({ title: 'Admin', description: 'Restricted area.', noindex: true }) },
  { path: '*', Component: NotFound, seo: () => ({ title: 'Page not found', description: 'The page you are looking for does not exist.', noindex: true }) },
];

/** All concrete paths to prerender at build time. */
export const prerenderPaths = () =>
  routes.flatMap((r) => (r.prerender ? r.prerender : r.path.includes(':') || r.path === '*' ? [] : [r.path]));

export const sitemapEntries = () =>
  routes.filter((r) => r.sitemap).flatMap((r) => (r.prerender ?? [r.path]).map((path) => ({ path, ...r.sitemap })));

/** Load the code for the route matching `pathname` (used before SSR render and client hydration). */
export async function preloadRoute(pathname) {
  const { matchRoutes } = await import('react-router');
  const match = matchRoutes(routes, pathname)?.[0];
  await match?.route.Component.preload?.();
}
