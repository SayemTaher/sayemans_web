// Pricing models. All prices in EUR, excluding 21% BTW (VAT).
// TODO(owner): confirm final price points before launch.

export const projectPlans = [
  {
    id: 'launch',
    name: 'Launch',
    price: 4900,
    prefix: 'from',
    unit: 'per project',
    description: 'For startups and small businesses that need a high-converting presence or a validated prototype.',
    timeline: '3–5 weeks',
    features: [
      'Discovery workshop',
      'Up to 8 pages or 12 app screens',
      'Custom UI design + interactive prototype',
      'Responsive React build, SEO-ready',
      'CMS or Firebase integration',
      'Analytics & cookie consent (GDPR)',
      '30 days post-launch support',
    ],
    cta: 'Start a Launch project',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 14900,
    prefix: 'from',
    unit: 'per project',
    description: 'For B2B and SaaS teams building a web app, MVP or customer portal that needs to grow.',
    timeline: '8–14 weeks',
    featured: true,
    features: [
      'Everything in Launch',
      'UX research & usability testing',
      'Full product design + design system',
      'Web app or mobile app (MVP)',
      'Authentication, roles & dashboards',
      'Payments / subscriptions integration',
      'CI/CD, monitoring & staging environment',
      '90 days post-launch support',
    ],
    cta: 'Start a Scale project',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    prefix: '',
    unit: 'tailored',
    description: 'For complex platforms, multi-product ecosystems and organisations with compliance needs.',
    timeline: 'Custom roadmap',
    features: [
      'Everything in Scale',
      'Dedicated product team',
      'Architecture & security review',
      'Integrations with CRM / ERP / SSO',
      'SLA-backed support & uptime',
      'Quarterly roadmap & reporting',
    ],
    cta: 'Talk to us',
  },
];

export const subscriptionPlans = [
  {
    id: 'design-partner',
    name: 'Design Partner',
    price: 3950,
    unit: 'per month',
    description: 'A senior product designer on demand. One active request at a time, unlimited queue.',
    features: [
      'Unlimited design requests',
      'Average 48h turnaround per task',
      'UI/UX, web, app & brand assets',
      'Figma source files',
      'Pause or cancel any month',
    ],
  },
  {
    id: 'product-team',
    name: 'Product Team',
    price: 8900,
    unit: 'per month',
    featured: true,
    description: 'Design and engineering as a service: ship features every sprint without hiring.',
    features: [
      'Designer + full-stack engineer',
      'Two-week sprints with demos',
      'Web, mobile & back-end work',
      'Shared Slack channel',
      'Monthly roadmap review',
      'Minimum 3 months',
    ],
  },
  {
    id: 'care',
    name: 'Care Plan',
    price: 290,
    prefix: 'from',
    unit: 'per month',
    description: 'Maintenance, security and continuous improvement for live websites and apps.',
    features: [
      'Security & dependency updates',
      'Uptime monitoring & backups',
      'Bug fixes within SLA',
      'Improvement hours included',
      'Monthly performance report',
    ],
  },
];

export const hourlyRate = { price: 95, unit: 'per hour', note: 'For audits, consulting and small change requests.' };

export const pricingFaqs = [
  {
    q: 'Are your prices including VAT?',
    a: 'All prices are shown excluding 21% Dutch BTW. For B2B clients within the EU, the reverse-charge mechanism applies where applicable.',
  },
  {
    q: 'How do payments work for fixed projects?',
    a: 'Fixed projects are typically invoiced in three milestones: 40% at kick-off, 40% at design approval and 20% at launch. Invoices have a 14-day payment term.',
  },
  {
    q: 'What if my project does not fit a package?',
    a: 'Most projects are tailored. The packages are reference points. After a free intro call we send a fixed quote with scope, timeline and milestones.',
  },
  {
    q: 'Can I pause or cancel a subscription?',
    a: 'Design Partner can be paused or cancelled any month. Product Team has a minimum term of three months, then monthly.',
  },
  {
    q: 'Who owns the code and designs?',
    a: 'You do. Full intellectual-property rights transfer to you upon final payment, including source code and Figma files.',
  },
];

export const formatPrice = (value) =>
  value == null
    ? 'Custom'
    : new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
