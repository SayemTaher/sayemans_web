import Hero from '@/components/sections/Hero';
import ScrollStatement from '@/components/sections/ScrollStatement';
import ServicesBento from '@/components/sections/ServicesBento';
import TaalMeesterSpotlight from '@/components/sections/TaalMeesterSpotlight';
import PartnerSpotlight from '@/components/sections/PartnerSpotlight';
import ProcessSticky from '@/components/sections/ProcessSticky';
import PricingCards from '@/components/sections/PricingCards';
import FeatureGrid from '@/components/sections/FeatureGrid';
import StatsBand from '@/components/sections/StatsBand';
import CTASection from '@/components/sections/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';
import Marquee from '@/components/ui/Marquee';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { capabilities, generalFaqs, industries, principles } from '@/data/content';
import { projectPlans } from '@/data/pricing';

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee items={capabilities} className="py-6" />

      <ScrollStatement
        eyebrow="Why SAYEMANS"
        text="We work with B2B companies, SaaS teams and founders to turn complicated ideas into products that are simple to use. One small team researches, designs, builds and launches it, and stays with you afterwards. No handovers, no templates. Honest work, done with passion."
      />

      <ServicesBento />

      <TaalMeesterSpotlight />

      <PartnerSpotlight />

      <ProcessSticky />

      <section className="container-x py-24 sm:py-32">
        <SectionHeader
          eyebrow="Engagement models"
          title="Transparent pricing. No surprises."
          intro="Fixed-scope projects, monthly product subscriptions or hourly consulting. Pick the model that fits your stage."
        />
        <div className="mt-16">
          <PricingCards plans={projectPlans} />
        </div>
        <Reveal className="mt-10 text-center">
          <Button to="/pricing" variant="ghost">Compare all plans & subscriptions</Button>
        </Reveal>
      </section>

      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="Who we serve" title="Built for teams that build." intro="From enterprise workflows to startup MVPs, we take the time to learn how your industry works." />
        <div className="mt-16">
          <FeatureGrid items={industries} />
        </div>
      </section>

      <StatsBand />

      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="Our principles" title="How we think about work." />
        <div className="mt-16">
          <FeatureGrid items={principles} cols="lg:grid-cols-4" accent="text-purple" />
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeader align="left" eyebrow="FAQ" title="Questions, answered." />
        <Accordion items={generalFaqs} />
      </section>

      <CTASection />
    </>
  );
}
