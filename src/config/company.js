// ─────────────────────────────────────────────────────────────
// Single source of truth for legal & company details.
// Everything that renders company info (footer, legal pages,
// JSON-LD structured data, contact page) reads from here.
// Fields set to `null` are hidden until filled in.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: 'SAYEMANS',
  legalName: 'SAYEMANS', // as registered at the KvK (trade name SAYEMANS)
  legalForm: 'Eenmanszaak', // sole proprietorship
  industry: 'Computer programming / software design (SBI 62100)',
  sbi: '62100',
  tagline: 'Digital products, engineered with craft.',
  description:
    'SAYEMANS is a digital product studio from Eindhoven, the Netherlands, that designs and builds websites, SaaS platforms, mobile apps and design systems for B2B companies and ambitious startups.',
  email: 'sayemans.inc@gmail.com',
  phone: null, // e.g. '+31 6 12345678'
  kvk: '85588105', // KvK (Chamber of Commerce) number
  establishmentNumber: '000051624834', // KvK vestigingsnummer (hoofdvestiging)
  vat: null, // TODO: BTW-id, e.g. 'NL000000000B01'
  address: {
    street: 'Brunelleschiweg', // TODO: add house number
    postalCode: '5624 CJ',
    city: 'Eindhoven',
    region: 'Noord-Brabant',
    country: 'Netherlands',
    countryCode: 'NL',
  },
  foundingDate: '2022-02-14',
  foundingYear: 2022,
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://sayemtaher.org',
  socials: {
    linkedin: null, // e.g. 'https://www.linkedin.com/company/sayemans'
    instagram: null,
    github: null,
  },
  responseTime: 'within one business day',
  languages: ['English', 'Nederlands'],
};

export const formatAddress = (a = company.address) =>
  [a.street, [a.postalCode, a.city].filter(Boolean).join(' '), a.country].filter(Boolean).join(', ');
