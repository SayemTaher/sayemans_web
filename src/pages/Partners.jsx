import PageHero from '@/components/sections/PageHero';
import PartnerSpotlight from '@/components/sections/PartnerSpotlight';
import CTASection from '@/components/sections/CTASection';

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Better together."
        intro="We work with a small number of partners whose work continues where ours stops, so clients get the full picture without managing extra agencies."
      />
      <div className="-mt-16">
        <PartnerSpotlight detailed headingAs="h2" />
      </div>
      <CTASection
        title="Need the product and the customers?"
        text="Tell us what you are building. If advertising is part of the plan, we bring Mentic into the conversation from day one."
      />
    </>
  );
}
