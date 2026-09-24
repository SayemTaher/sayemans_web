// Shared marketing content: process, industries, principles, FAQs.

export const processSteps = [
  {
    id: 'discover',
    step: '01',
    title: 'Discover',
    duration: '1–2 weeks',
    text: 'Workshops, user research and a technical audit. We define goals, users, constraints and success metrics together.',
    outputs: ['Project brief', 'User personas', 'Success metrics'],
  },
  {
    id: 'define',
    step: '02',
    title: 'Define',
    duration: '1 week',
    text: 'We translate insights into scope: information architecture, user flows and a prioritised backlog with a fixed quote.',
    outputs: ['User flows', 'Sitemap / IA', 'Roadmap & quote'],
  },
  {
    id: 'design',
    step: '03',
    title: 'Design',
    duration: '2–4 weeks',
    text: 'Wireframes become polished UI and interactive prototypes, tested with real users before development starts.',
    outputs: ['Hi-fi UI', 'Prototype', 'Design system'],
  },
  {
    id: 'develop',
    step: '04',
    title: 'Develop',
    duration: '3–10 weeks',
    text: 'Two-week sprints with live demos. Clean, tested code on a staging environment you can click through at any time.',
    outputs: ['Staging builds', 'Sprint demos', 'Test reports'],
  },
  {
    id: 'deliver',
    step: '05',
    title: 'Deliver',
    duration: '1 week',
    text: 'Performance, accessibility and SEO checks, then a zero-downtime launch with analytics and monitoring in place.',
    outputs: ['Production launch', 'Handover docs', 'Training'],
  },
  {
    id: 'evolve',
    step: '06',
    title: 'Evolve',
    duration: 'Ongoing',
    text: 'We measure, learn and iterate. Care plans keep your product secure while growth sprints push metrics up.',
    outputs: ['Analytics reports', 'Iterations', 'SLA support'],
  },
];

export const industries = [
  { icon: 'Building2', title: 'B2B & Enterprise', text: 'Customer portals, internal tools and complex workflows made simple.' },
  { icon: 'Boxes', title: 'SaaS', text: 'MVPs, onboarding, dashboards and billing that turn trials into revenue.' },
  { icon: 'Rocket', title: 'Startups', text: 'Validated prototypes and investor-ready products, shipped fast.' },
  { icon: 'BookOpen', title: 'EdTech', text: 'Learning experiences that motivate. We build our own, too.' },
  { icon: 'Globe', title: 'E-commerce', text: 'Fast storefronts and checkout flows that convert.' },
  { icon: 'Users', title: 'Agencies', text: 'White-label design & development capacity for your clients.' },
];

export const principles = [
  { icon: 'Sparkles', title: 'Craft over templates', text: 'Every product is designed from first principles. No themes, no shortcuts.' },
  { icon: 'Zap', title: 'Speed with rigour', text: 'Short sprints and weekly demos. Momentum without cutting corners.' },
  { icon: 'ShieldCheck', title: 'Privacy by design', text: 'GDPR-compliant architecture, EU-hosted data options and secure defaults.' },
  { icon: 'LineChart', title: 'Outcomes, measured', text: 'We define success metrics up front and report on them after launch.' },
];

export const stats = [
  { value: 100, suffix: '%', label: 'IP ownership transferred to clients' },
  { value: 48, suffix: 'h', label: 'Average design turnaround' },
  { value: 95, suffix: '+', label: 'Lighthouse performance target' },
  { value: 24, suffix: 'h', label: 'Response time on inquiries' },
];

export const capabilities = [
  'Product Strategy', 'UX Research', 'UI Design', 'Prototyping', 'Design Systems', 'Branding',
  'React', 'iOS / SwiftUI', 'SaaS Platforms', 'Firebase', 'Cloudflare', 'APIs', 'SEO', 'Analytics',
  'Accessibility', 'Motion Design',
];

export const generalFaqs = [
  {
    q: 'What kind of companies do you work with?',
    a: 'Mostly B2B companies, SaaS teams and funded startups in the Netherlands and wider EU, but we work with ambitious businesses of any size that care about quality.',
  },
  {
    q: 'How quickly can you start?',
    a: 'Discovery can usually start within 1–2 weeks of a signed proposal. Subscriptions can start the following Monday.',
  },
  {
    q: 'Do you work remotely?',
    a: 'Yes. We work remote-first across the Netherlands and EU, with on-site workshops available when they add value.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'React, Vite and Next.js on the web; Swift/SwiftUI and React Native for mobile; Firebase, Cloudflare and Node.js on the back-end. We pick what fits your product, not what is trendy.',
  },
  {
    q: 'Are you GDPR compliant?',
    a: 'Yes. We build privacy by design: consent management, data minimisation, EU data residency options and data processing agreements (verwerkersovereenkomst) on request.',
  },
];
