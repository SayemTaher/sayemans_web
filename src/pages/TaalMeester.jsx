import { taalmeester as tm } from '@/data/products';
import TaalMeesterSpotlight from '@/components/sections/TaalMeesterSpotlight';
import FeatureGrid from '@/components/sections/FeatureGrid';
import CTASection from '@/components/sections/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';
import { motion } from 'motion/react';

export default function TaalMeester() {
  return (
    <div className="pt-16">
      <TaalMeesterSpotlight headingAs="h1" />

      <section className="container-x py-24">
        <SectionHeader
          eyebrow="The challenge"
          title="Learning Dutch for inburgering is hard. Generic apps make it harder."
          intro="Expats and international students need Dutch for real situations: the huisarts, the gemeente, a rental contract. Generic language apps rarely teach that, and never in a structure aligned with the inburgering path."
        />
      </section>

      <section className="container-x py-12">
        <SectionHeader eyebrow="Curriculum" title="A0 to A2, step by step." />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {tm.levels.map((l, i) => (
            <motion.div key={l.level} variants={staggerItem}>
              <Glass className="h-full rounded-[32px] p-8">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold tracking-tight text-taal">{l.level}</span>
                  <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${i === 0 ? 'bg-green/15 text-green' : 'bg-taal/15 text-taal'}`}>
                    {i === 0 ? 'Free to start' : 'Premium'}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{l.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{l.summary}</p>
                <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-6 text-center">
                  {[['Units', l.units], ['Lessons', l.lessons], ['Hours', `${l.hours}h`]].map(([k, v]) => (
                    <div key={k}><dd className="text-xl font-semibold">{v}</dd><dt className="text-[12px] text-fg-subtle">{k}</dt></div>
                  ))}
                </dl>
              </Glass>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="container-x py-24">
        <SectionHeader eyebrow="Features" title="Designed for daily progress." />
        <div className="mt-14"><FeatureGrid items={tm.features} accent="text-taal" /></div>
      </section>

      <section className="container-x grid gap-6 py-12 lg:grid-cols-2">
        <Reveal>
          <Glass className="h-full rounded-[32px] p-8 sm:p-10">
            <p className="eyebrow">Our role</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">What SAYEMANS delivered</h2>
            <ul className="mt-6 space-y-3">
              {tm.whatWeDid.map((w) => (
                <li key={w} className="flex gap-3 text-[16px] text-fg-muted"><Icon name="Check" size={18} className="mt-0.5 text-taal" strokeWidth={2.25} />{w}</li>
              ))}
            </ul>
          </Glass>
        </Reveal>
        <Reveal delay={0.1}>
          <Glass className="h-full rounded-[32px] p-8 sm:p-10">
            <p className="eyebrow">Business model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Freemium subscription</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {tm.pricing.map((p) => (
                <div key={p.plan} className="rounded-2xl border border-line p-4">
                  <p className="text-[13px] text-fg-subtle">{p.plan}</p>
                  <p className="text-2xl font-semibold">{p.price}</p>
                  <p className="text-[12px] text-fg-subtle">{p.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-fg-subtle">{tm.disclaimer}</p>
          </Glass>
        </Reveal>
      </section>

      <section className="container-x py-16 text-center">
        <Reveal className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={tm.appStore} size="lg" icon="Apple" iconRight={null}>Download on the App Store</Button>
          <Button href={tm.website} size="lg" variant="glass" iconRight="ArrowUpRight">Visit taalmeester.net</Button>
          <Button href={tm.instagram} size="lg" variant="glass" icon="Instagram" iconRight={null}>@taalmeester</Button>
        </Reveal>
      </section>

      <CTASection title="Want an app like TaalMeester?" text="We bring the same product thinking, design quality and engineering to client apps. Let’s talk about yours." />
    </div>
  );
}
