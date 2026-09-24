import { Link } from 'react-router';
import PageHero from '@/components/sections/PageHero';
import TaalMeesterSpotlight from '@/components/sections/TaalMeesterSpotlight';
import CTASection from '@/components/sections/CTASection';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="We build our own products, too."
        intro="Running our own products keeps our skills sharp. Every lesson learned in pricing, retention and scaling feeds straight into client work."
      />
      <TaalMeesterSpotlight />
      <section className="container-x py-16">
        <Reveal>
          <Glass className="flex flex-col items-start justify-between gap-6 rounded-[32px] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="eyebrow">In the lab</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">More products are on the way.</h2>
              <p className="mt-2 max-w-xl text-fg-muted">Have a product idea and want a partner rather than a vendor? We co-build with founders on selected ventures.</p>
            </div>
            <Link to="/contact?service=venture" className="inline-flex items-center gap-2 font-medium text-blue">
              Pitch us your idea <Icon name="ArrowRight" size={16} />
            </Link>
          </Glass>
        </Reveal>
      </section>
      <CTASection />
    </>
  );
}
