import { services } from '../data/services.js';

export const mainNav = [
  { label: 'Services', to: '/services', children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, icon: s.icon, text: s.kicker })) },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Process', to: '/process' },
  { label: 'About', to: '/about' },
];

export const footerNav = [
  { title: 'Services', links: services.slice(0, 6).map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Process', to: '/process' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'TaalMeester', to: '/products/taalmeester' },
      { label: 'All products', to: '/products' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
    ],
  },
];
