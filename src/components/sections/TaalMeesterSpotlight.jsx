import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { taalmeester } from '@/data/products';
import PhoneMockup from './PhoneMockup';
import Button from '../ui/Button';
import Counter from '../ui/Counter';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import { Reveal, RevealText } from '../ui/Reveal';

export default function TaalMeesterSpotlight({ headingAs = 'h2' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotate = useTransform(p, [0, 0.5, 1], [-14, 0, 8]);
  const rotateY = useTransform(p, [0, 0.5], [28, 0]);
  const y = useTransform(p, [0, 1], [120, -120]);
  const glow = useTransform(p, [0.2, 0.5], [0.2, 1]);
  const chipA = useTransform(p, [0, 1], [60, -200]);
  const chipB = useTransform(p, [0, 1], [0, -90]);

  return (
    <section ref={ref} id="taalmeester" className="relative isolate overflow-hidden py-28 sm:py-40">
      {/* warm TaalMeester glow */}
      <motion.div style={{ opacity: glow }} aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-[60%] size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_107_53/0.35),transparent_60%)] blur-2xl" />
        <div className="absolute top-[30%] left-[20%] size-[40vmax] rounded-full bg-[radial-gradient(circle,rgb(255_55_95/0.18),transparent_60%)] blur-2xl" />
      </motion.div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <Glass className="inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[13px] font-medium">
              <span className="rounded-full bg-taal px-2.5 py-0.5 text-[11px] font-semibold text-white">Our product</span>
              Designed & built by SAYEMANS
            </Glass>
          </Reveal>

          <RevealText as={headingAs} text="TaalMeester." className="mt-7 text-display font-semibold tracking-[-0.05em] text-[#ff6b35]" />
          <RevealText as="p" text={taalmeester.tagline} delay={0.1} className="mt-2 text-headline font-semibold text-chrome" />

          <Reveal delay={0.2} as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {taalmeester.description}
          </Reveal>

          <Reveal delay={0.3} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {taalmeester.stats.map((s) => (
              <Glass key={s.label} className="rounded-3xl p-4">
                <p className="text-3xl font-semibold tracking-tight">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[12px] leading-snug text-fg-subtle">{s.label}</p>
              </Glass>
            ))}
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={taalmeester.appStore} size="lg" variant="primary" icon="Apple" iconRight={null}>
              Download on the App Store
            </Button>
            <Button to="/products/taalmeester" size="lg" variant="glass">Read the case study</Button>
          </Reveal>

          <Reveal delay={0.5} as="p" className="mt-6 flex items-center gap-2 text-[13px] text-fg-subtle">
            <Icon name="Globe" size={14} />
            <a href={taalmeester.website} target="_blank" rel="noopener noreferrer" className="hover:text-fg">taalmeester.net</a>
          </Reveal>
        </div>

        <div className="relative [perspective:1400px]">
          <PhoneMockup style={{ rotate, rotateY, y }} />
          <motion.div style={{ y: chipA }} className="absolute top-[12%] -left-2 hidden sm:block lg:-left-10">
            <Glass className="flex items-center gap-2.5 rounded-2xl p-3 pr-4">
              <span className="text-xl">🏆</span>
              <span>
                <span className="block text-[12px] font-semibold">Achievement unlocked</span>
                <span className="block text-[11px] text-fg-subtle">A0 complete</span>
              </span>
            </Glass>
          </motion.div>
          <motion.div style={{ y: chipB }} className="absolute right-0 bottom-[18%] hidden sm:block lg:-right-6">
            <Glass className="rounded-2xl p-3 pr-4">
              <p className="text-[11px] text-fg-subtle">Levels</p>
              <p className="flex gap-1.5 pt-1">
                {['A0', 'A1', 'A2'].map((l, i) => (
                  <span key={l} className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${i < 2 ? 'bg-taal text-white' : 'bg-fg/10'}`}>{l}</span>
                ))}
              </p>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
