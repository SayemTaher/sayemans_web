// Service catalogue. `icon` maps to a lucide-react icon name (see components/ui/Icon.jsx).
// `tint` is a CSS gradient used for the glass accent of each service.

export const services = [
  {
    slug: 'ui-ux-design',
    icon: 'PenTool',
    title: 'UI/UX Design',
    kicker: 'Interfaces that make sense',
    summary:
      'Research-led product design: user flows, wireframes, high-fidelity UI and interactive prototypes, grounded in real user behaviour.',
    description:
      'Good software is easy to understand. We get there by understanding your users first: interviews, analytics review and competitive audits. Then we turn those insights into flows, wireframes and carefully detailed interfaces. Every screen is prototyped and tested before a single line of production code is written, so you ship with confidence rather than assumptions.',
    deliverables: [
      'UX research & stakeholder workshops',
      'User journeys, flows & information architecture',
      'Wireframes & clickable prototypes',
      'High-fidelity UI for web, iOS & Android',
      'Usability testing & iteration rounds',
      'Developer-ready Figma handoff',
    ],
    outcomes: ['Higher conversion & activation', 'Fewer support tickets', 'Faster development cycles'],
    stack: ['Figma', 'FigJam', 'Maze', 'Hotjar', 'Framer'],
    tint: 'from-[#0a84ff] to-[#5e5ce6]',
  },
  {
    slug: 'web-development',
    icon: 'Code2',
    title: 'Web Development',
    kicker: 'Fast, accessible, search-ready',
    summary:
      'Marketing sites and web applications built on modern frameworks, fast by default, accessible and SEO-optimised from day one.',
    description:
      'We engineer websites and web apps that load instantly and rank well. Our front-ends are built with React and modern tooling, deployed to the edge and wired to scalable back-ends. Performance budgets, Core Web Vitals and WCAG accessibility are acceptance criteria, not afterthoughts.',
    deliverables: [
      'Marketing websites & landing pages',
      'Web applications & customer portals',
      'Headless CMS integration',
      'Technical SEO & Core Web Vitals',
      'Analytics & conversion tracking',
      'Edge hosting & CI/CD pipelines',
    ],
    outcomes: ['Sub-second load times', 'Better organic visibility', 'Easy content editing'],
    stack: ['React', 'Vite', 'Next.js', 'Tailwind CSS', 'Cloudflare', 'Firebase'],
    tint: 'from-[#30d158] to-[#0a84ff]',
  },
  {
    slug: 'mobile-app-development',
    icon: 'Smartphone',
    title: 'Mobile Apps',
    kicker: 'Native feel on every device',
    summary:
      'iOS and Android applications designed to platform guidelines, from MVP to App Store launch and beyond.',
    description:
      'From concept to App Store, we build mobile apps that feel at home on the platform: native gestures, Dynamic Type, VoiceOver, haptics and offline-first data. We handle the full lifecycle, including in-app purchases, subscriptions, push notifications, analytics and store submission. Our own app, TaalMeester, is proof.',
    deliverables: [
      'iOS (Swift / SwiftUI) & cross-platform apps',
      'Subscriptions & in-app purchases',
      'Push notifications & deep links',
      'Offline sync & secure storage',
      'App Store & Play Store submission',
      'Crash reporting & release management',
    ],
    outcomes: ['Store-ready in weeks, not months', 'High ratings & retention', 'Predictable releases'],
    stack: ['Swift', 'SwiftUI', 'React Native', 'Expo', 'Firebase', 'RevenueCat'],
    tint: 'from-[#ff9f0a] to-[#ff375f]',
  },
  {
    slug: 'saas-product-development',
    icon: 'Boxes',
    title: 'SaaS Product Development',
    kicker: 'From first version to growth',
    summary:
      'End-to-end SaaS builds with multi-tenant architecture, billing, auth, dashboards and the infrastructure to grow.',
    description:
      'We partner with founders and product teams to take SaaS ideas from whiteboard to paying customers. That means validating the MVP scope, designing the product, building a secure multi-tenant platform with authentication, role-based access, subscription billing and admin tooling, then iterating on real usage data.',
    deliverables: [
      'MVP scoping & product roadmap',
      'Multi-tenant architecture',
      'Auth, roles & permissions',
      'Stripe billing & subscription logic',
      'Admin dashboards & reporting',
      'Scalable cloud infrastructure',
    ],
    outcomes: ['Launch faster with less risk', 'Architecture that scales', 'Recurring revenue from day one'],
    stack: ['React', 'Node.js', 'Firebase', 'PostgreSQL', 'Stripe', 'Cloudflare Workers'],
    tint: 'from-[#5e5ce6] to-[#bf5af2]',
  },
  {
    slug: 'design-systems',
    icon: 'Layers',
    title: 'Design Systems & Branding',
    kicker: 'One look, everywhere',
    summary:
      'Visual identities, component libraries and design tokens that keep every product and touchpoint coherent.',
    description:
      'As products grow, consistency erodes. We build design systems that stop the drift: brand foundations, design tokens, accessible component libraries in Figma and code, and documentation your whole team can follow. The result is faster design, faster development and a brand that looks and feels the same everywhere.',
    deliverables: [
      'Brand identity & visual language',
      'Design tokens (colour, type, spacing, motion)',
      'Figma component libraries',
      'Coded React component libraries',
      'Accessibility guidelines',
      'Living documentation',
    ],
    outcomes: ['Faster feature delivery', 'Consistent brand experience', 'Lower design debt'],
    stack: ['Figma', 'Tokens Studio', 'Storybook', 'React', 'Tailwind CSS'],
    tint: 'from-[#ff375f] to-[#bf5af2]',
  },
  {
    slug: 'digital-strategy',
    icon: 'Compass',
    title: 'Product Strategy & Consulting',
    kicker: 'Clarity before code',
    summary:
      'Discovery sprints, product audits and technical roadmaps, so you know what to build before you spend money on it.',
    description:
      'Not sure what to build, or why the current product under-performs? Our discovery sprints and audits give you clarity. We review UX, analytics, tech stack and market position, then deliver a prioritised roadmap with effort estimates, so every euro goes to what actually makes a difference.',
    deliverables: [
      'Discovery & design sprints',
      'UX and conversion audits',
      'Technical architecture review',
      'Competitive & market analysis',
      'Prioritised product roadmap',
      'Budget & timeline estimation',
    ],
    outcomes: ['Validated direction', 'Aligned stakeholders', 'Reduced build risk'],
    stack: ['Workshops', 'Analytics', 'Lean canvas', 'Jobs-to-be-done'],
    tint: 'from-[#64d2ff] to-[#30d158]',
  },
  {
    slug: 'cloud-and-integrations',
    icon: 'Cloud',
    title: 'Cloud, APIs & Integrations',
    kicker: 'Systems that talk to each other',
    summary:
      'Serverless back-ends, REST/GraphQL APIs, automation and integrations with the tools your business already runs on.',
    description:
      'We connect your product to the tools your business already uses. Serverless back-ends on Firebase and Cloudflare, secure APIs, CRM, ERP and payment integrations, and workflow automation that removes manual work, all monitored and documented.',
    deliverables: [
      'Serverless back-ends & APIs',
      'CRM, ERP & payment integrations',
      'Workflow automation',
      'Data pipelines & reporting',
      'Security hardening & GDPR compliance',
      'Monitoring & alerting',
    ],
    outcomes: ['Less manual work', 'Single source of truth', 'Secure, compliant data'],
    stack: ['Firebase', 'Cloudflare Workers', 'Node.js', 'REST', 'GraphQL', 'Zapier/Make'],
    tint: 'from-[#0a84ff] to-[#64d2ff]',
  },
  {
    slug: 'care-and-growth',
    icon: 'LifeBuoy',
    title: 'Care & Growth Plans',
    kicker: 'Looked after, month after month',
    summary:
      'Ongoing maintenance, security updates, performance monitoring and continuous improvement after launch.',
    description:
      'Digital products are never finished. Our care plans keep yours secure, fast and evolving: dependency and security updates, uptime monitoring, backups, bug fixes and a monthly block of improvement hours, backed by a clear SLA.',
    deliverables: [
      'Security & dependency updates',
      'Uptime & performance monitoring',
      'Backups & disaster recovery',
      'Bug fixes with SLA',
      'Monthly improvement hours',
      'Analytics & growth reporting',
    ],
    outcomes: ['Peace of mind', 'Continuous improvement', 'Predictable monthly cost'],
    stack: ['Sentry', 'Cloudflare', 'Firebase', 'GitHub Actions'],
    tint: 'from-[#30d158] to-[#ffd60a]',
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
