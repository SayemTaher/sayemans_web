import { company, formatAddress } from './company.js';
import { services } from '../data/services.js';
import { taalmeester } from '../data/products.js';

export const SITE_NAME = 'SAYEMANS';
export const DEFAULT_OG = '/og-image.png';

export const absUrl = (path = '/') => new URL(path, company.siteUrl).toString();

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${company.siteUrl}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: company.siteUrl,
  logo: `${company.siteUrl}/icon-512.png`,
  image: `${company.siteUrl}${DEFAULT_OG}`,
  description: company.description,
  email: company.email,
  ...(company.phone && { telephone: company.phone }),
  ...(company.vat && { vatID: company.vat }),
  ...(company.kvk && { identifier: { '@type': 'PropertyValue', propertyID: 'KvK', value: company.kvk } }),
  foundingDate: company.foundingDate,
  ...(company.sbi && { isicV4: company.sbi }),
  address: {
    '@type': 'PostalAddress',
    ...(company.address.street && { streetAddress: company.address.street }),
    ...(company.address.postalCode && { postalCode: company.address.postalCode }),
    ...(company.address.city && { addressLocality: company.address.city }),
    ...(company.address.region && { addressRegion: company.address.region }),
    addressCountry: company.address.countryCode,
  },
  areaServed: [{ '@type': 'City', name: 'Eindhoven' }, 'NL', 'EU'],
  knowsLanguage: ['en', 'nl'],
  sameAs: Object.values(company.socials).filter(Boolean),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital product services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: `${company.siteUrl}/services/${s.slug}` },
    })),
  },
  owns: { '@type': 'SoftwareApplication', name: taalmeester.name, url: taalmeester.website },
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${company.siteUrl}/#website`,
  url: company.siteUrl,
  name: SITE_NAME,
  publisher: { '@id': `${company.siteUrl}/#organization` },
  inLanguage: 'en',
});

export const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: `${company.siteUrl}${t.path === '/' ? '' : t.path}`,
  })),
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const taalmeesterLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: taalmeester.name,
  operatingSystem: 'iOS',
  applicationCategory: 'EducationalApplication',
  description: taalmeester.summary,
  url: taalmeester.website,
  installUrl: taalmeester.appStore,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@id': `${company.siteUrl}/#organization` },
});

export { formatAddress };
