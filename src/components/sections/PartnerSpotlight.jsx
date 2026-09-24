import { motion } from 'motion/react';
import { mentic } from '@/data/partners';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { Reveal, RevealText, Stagger, staggerItem } from '../ui/Reveal';

/**
 * Affiliated partner: Mentic. Compact on the homepage (`detailed={false}`),
 * full on /partners.
 */
export default function PartnerSpotlight({ detailed = false, headingAs = 'h2' }) {
  const p = mentic;
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <Glass className="inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[13px] font-medium">
              <span className="rounded-full bg-fg px-2.5 py-0.5 text-[11px] font-semibold text-bg">Partner</span>
              {p.relationship}
            </Glass>
          </Reveal>

          <RevealText as={headingAs} text="Your product, and the people who need it." className="mt-7 text-headline font-semibold text-chrome" />

          <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {p.whyTogether}
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <Glass className="rounded-[28px] p-6">
              <p className="text-[28px] font-semibold tracking-tight lowercase">{p.wordmark}</p>
              <p className="mt-1 text-[13px] text-fg-subtle">“{p.tagline}” · {p.location}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-fg-muted">{p.summary}</p>
              <dl className="mt-5 space-y-2 border-t border-line pt-5 text-[14px]">
                {p.facts.map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="w-20 shrink-0 text-fg-subtle">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Glass>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={p.website} variant="primary" iconRight="ArrowUpRight">Visit mentic.io</Button>
            {detailed ? (
              <Button href={p.demo} variant="glass" icon="Calendar" iconRight={null}>Book a Mentic demo</Button>
            ) : (
              <Button to="/partners" variant="glass">About the partnership</Button>
            )}
          </Reveal>
        </div>

        {/* How a campaign runs */}
        <Reveal delay={0.1}>
          <Glass interactive={false} className="rounded-[32px] p-6 sm:p-8">
            <p className="text-[13px] font-semibold text-fg-muted">How a Mentic campaign runs</p>
            <Stagger as="ol" className="relative mt-6 space-y-5" gap={0.07}>
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-line" />
              {p.pipeline.map((s, i) => (
                <motion.li key={s.step} variants={staggerItem} className="relative flex gap-4">
                  <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-bg text-[11px] font-semibold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{s.step}</span>
                    <span className="block text-[14px] leading-relaxed text-fg-muted">{s.text}</span>
                  </span>
                </motion.li>
              ))}
            </Stagger>
          </Glass>
        </Reveal>
      </div>

      {detailed && (
        <>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {p.points.map((pt) => (
              <motion.div key={pt.title} variants={staggerItem}>
                <Glass className="h-full rounded-[28px] p-7">
                  <span className="glass grid size-11 place-items-center rounded-2xl text-blue">
                    <Icon name={pt.icon} size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{pt.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{pt.text}</p>
                </Glass>
              </motion.div>
            ))}
          </Stagger>
          <p className="mt-10 max-w-3xl text-[13px] leading-relaxed text-fg-subtle">{p.disclaimer}</p>
        </>
      )}
    </section>
  );
}
