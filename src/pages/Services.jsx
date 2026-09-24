import PageHero from '@/components/sections/PageHero';
import ServicesBento from '@/components/sections/ServicesBento';
import ProcessSticky from '@/components/sections/ProcessSticky';
import CTASection from '@/components/sections/CTASection';
import Marquee from '@/components/ui/Marquee';
import Button from '@/components/ui/Button';
import { capabilities } from '@/data/content';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From first idea to a product people use."
        intro="Eight disciplines, one integrated team. Engage us for a single service or the entire product lifecycle."
      >
        <Button to="/contact" variant="accent" size="lg">Get a proposal</Button>
      </PageHero>
      <Marquee items={capabilities} />
      <ServicesBento header={false} />
      <ProcessSticky />
      <CTASection title="Not sure what you need?" text="Book a free 30-minute intro call. We will help you define scope, budget and the fastest route to launch." />
    </>
  );
}
