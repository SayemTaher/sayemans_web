import PageHero from '@/components/sections/PageHero';
import PricingCards from '@/components/sections/PricingCards';
import CTASection from '@/components/sections/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import Glass from '@/components/ui/Glass';
import Button from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { formatPrice, hourlyRate, pricingFaqs, projectPlans, subscriptionPlans } from '@/data/pricing';

const withCta = (plans) => plans.map((p) => ({ ...p, cta: p.cta ?? `Start ${p.name}` }));

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple, honest pricing." intro="Fixed-price projects, flexible subscriptions and transparent rates. All prices in EUR, excluding 21% BTW." />

      <section className="container-x py-12">
        <SectionHeader eyebrow="Projects" title="Fixed scope. Fixed price." intro="Best when you know what you need. Clear milestones, no hourly surprises." />
        <div className="mt-14"><PricingCards plans={projectPlans} /></div>
      </section>

      <section className="container-x py-24">
        <SectionHeader eyebrow="Subscriptions" title="A product team, on tap." intro="Best for continuous product work. Monthly billing, predictable output." />
        <div className="mt-14"><PricingCards plans={withCta(subscriptionPlans)} /></div>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <Glass className="flex flex-col items-start justify-between gap-6 rounded-[32px] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="eyebrow">Hourly</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                {formatPrice(hourlyRate.price)} <span className="text-lg font-normal text-fg-subtle">{hourlyRate.unit} · excl. BTW</span>
              </p>
              <p className="mt-2 text-fg-muted">{hourlyRate.note}</p>
            </div>
            <Button to="/contact?plan=hourly" variant="glass">Book hours</Button>
          </Glass>
        </Reveal>
      </section>

      <section className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeader align="left" eyebrow="Billing FAQ" title="The fine print, made clear." />
        <Accordion items={pricingFaqs} />
      </section>

      <CTASection title="Need a custom quote?" text="Every product is different. Share your goals and we will send a fixed proposal within three business days." />
    </>
  );
}
