import PageHero from '@/components/sections/PageHero';
import FeatureGrid from '@/components/sections/FeatureGrid';
import StatsBand from '@/components/sections/StatsBand';
import CTASection from '@/components/sections/CTASection';
import ScrollStatement from '@/components/sections/ScrollStatement';
import SectionHeader from '@/components/ui/SectionHeader';
import Glass from '@/components/ui/Glass';
import { Reveal } from '@/components/ui/Reveal';
import { principles } from '@/data/content';
import { company, formatAddress } from '@/config/company';

export default function About() {
  const facts = [
    ['Company', company.legalName],
    ['Established', new Date(company.foundingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
    ['Legal form', company.legalForm],
    ['Industry', company.industry],
    ['Based in', formatAddress() || company.address.country],
    ['Languages', company.languages.join(' · ')],
    ['KvK', company.kvk],
    ['BTW / VAT', company.vat],
    ['Email', company.email],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small studio with a lot of passion for good software."
        intro="SAYEMANS was founded in Eindhoven in 2022 with a simple belief: software should feel as considered as the best physical products."
      />

      <ScrollStatement text="We are a small, senior team of designers and engineers. We would rather do one product properly than ten in a hurry. We build our own products, so we understand what it takes to launch, grow and sustain one." />

      <StatsBand />

      <section className="container-x py-24">
        <SectionHeader eyebrow="Principles" title="What we stand for." />
        <div className="mt-14"><FeatureGrid items={principles} cols="lg:grid-cols-4" /></div>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <Glass className="rounded-[32px] p-8 sm:p-12">
            <p className="eyebrow">Company details</p>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="border-t border-line pt-4">
                  <dt className="text-[13px] text-fg-subtle">{k}</dt>
                  <dd className="mt-1 text-[17px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Glass>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
