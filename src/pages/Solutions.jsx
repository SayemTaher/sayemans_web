import { motion } from 'motion/react';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/sections/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { Stagger, staggerItem } from '@/components/ui/Reveal';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { industries } from '@/data/content';

const solutions = [
  {
    icon: 'Building2',
    title: 'B2B platforms & portals',
    audience: 'For established B2B companies',
    problem: 'Legacy tools, spreadsheets and email threads slow down your customers and your team.',
    solution: 'Customer portals, partner platforms and internal tools that automate workflows and integrate with your CRM/ERP.',
    includes: ['Role-based dashboards', 'CRM / ERP integrations', 'SSO & audit logs', 'Reporting & exports'],
    service: 'saas-product-development',
  },
  {
    icon: 'Boxes',
    title: 'SaaS products',
    audience: 'For SaaS founders & product teams',
    problem: 'Trials that do not convert, onboarding that confuses and a UI that grew without a system.',
    solution: 'Product design and engineering focused on activation, retention and expansion revenue.',
    includes: ['Onboarding & activation flows', 'Billing & subscriptions', 'Design system', 'Product analytics'],
    service: 'saas-product-development',
  },
  {
    icon: 'Rocket',
    title: 'Startup MVPs',
    audience: 'For pre-seed to Series A startups',
    problem: 'You need to validate fast, impress investors and avoid a rewrite six months later.',
    solution: 'Discovery sprint, clickable prototype and a production-grade MVP on a stack that scales.',
    includes: ['Discovery sprint', 'Investor-ready prototype', 'MVP in 8–12 weeks', 'Scalable architecture'],
    service: 'digital-strategy',
  },
  {
    icon: 'Smartphone',
    title: 'Consumer & EdTech apps',
    audience: 'For product companies going mobile',
    problem: 'Building an app people keep opening, and pay for, is harder than it looks.',
    solution: 'Native-quality apps with habit loops, subscriptions and accessibility, proven with TaalMeester.',
    includes: ['iOS & Android', 'Subscriptions & paywalls', 'Gamification', 'Store optimisation'],
    service: 'mobile-app-development',
  },
  {
    icon: 'Globe',
    title: 'Marketing websites',
    audience: 'For companies that sell online',
    problem: 'A slow, dated website that ranks poorly and does not generate leads.',
    solution: 'Fast, SEO-optimised websites with a CMS your team can edit and analytics you can trust.',
    includes: ['Conversion copy & UX', 'Headless CMS', 'Technical SEO', 'GDPR-proof analytics'],
    service: 'web-development',
  },
  {
    icon: 'Layers',
    title: 'Design system rollouts',
    audience: 'For scaling product organisations',
    problem: 'Multiple teams, inconsistent UI, and every feature takes longer than it should.',
    solution: 'A shared design language in Figma and code, with governance your teams actually adopt.',
    includes: ['Audit & inventory', 'Tokens & components', 'Documentation', 'Team enablement'],
    service: 'design-systems',
  },
];

export default function Solutions() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Solutions shaped around your stage." intro="Whether you are modernising a B2B workflow or launching your first SaaS, we bring a proven playbook for your situation." />

      <section className="container-x py-12">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <motion.div key={s.title} variants={staggerItem}>
              <Glass as="article" className="flex h-full flex-col rounded-[32px] p-8">
                <div className="flex items-center gap-4">
                  <span className="glass grid size-12 place-items-center rounded-2xl text-blue"><Icon name={s.icon} size={22} /></span>
                  <div>
                    <h2 className="text-xl font-semibold">{s.title}</h2>
                    <p className="text-[13px] text-fg-subtle">{s.audience}</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
                  <div><dt className="font-medium">The challenge</dt><dd className="text-fg-muted">{s.problem}</dd></div>
                  <div><dt className="font-medium">Our solution</dt><dd className="text-fg-muted">{s.solution}</dd></div>
                </dl>
                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {s.includes.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-[14px] text-fg-muted"><Icon name="Check" size={15} className="text-blue" />{i}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button to={`/services/${s.service}`} variant="ghost">Related service</Button>
                </div>
              </Glass>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="container-x py-24">
        <SectionHeader eyebrow="Industries" title="Where we do our best work." />
        <div className="mt-14"><FeatureGrid items={industries} /></div>
      </section>

      <CTASection />
    </>
  );
}
