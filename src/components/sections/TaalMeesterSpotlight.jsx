import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { taalmeester } from '@/data/products';
import PhoneMockup from './PhoneMockup';
import Button from '../ui/Button';
import Counter from '../ui/Counter';
import Icon from '../ui/Icon';
import FloatingShapes from '../ui/Shapes';
import { Reveal, RevealText } from '../ui/Reveal';

const shapes = [
  { shape: 'star', className: 'top-[8%] right-[6%]', size: 86, rot: 12, depth: 1.3 },
  { shape: 'ball', className: 'bottom-[12%] left-[46%]', size: 54, depth: 0.8, colors: { a: '#ffe0c9', b: '#ec6f2d' } },
  { shape: 'ring', className: 'bottom-[6%] -right-6', size: 120, depth: 0.6, colors: { a: '#ffe7d6', b: '#ff9a5c' } },
];

/** Sticker-style stat that floats next to the phones. */
function Sticker({ style, className, children }) {
  return (
    <motion.div style={style} className={`absolute z-20 hidden sm:block ${className}`}>
      <div className="glass flex items-center gap-2.5 rounded-2xl p-2.5 pr-4 text-left">{children}</div>
    </motion.div>
  );
}

export default function TaalMeesterSpotlight({ headingAs = 'h2' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  // Three phones start stacked and fan out as the section scrolls into view.
  const spread = useTransform(p, [0.12, 0.45], [0, 1]);
  const leftX = useTransform(spread, [0, 1], ['0%', '-62%']);
  const rightX = useTransform(spread, [0, 1], ['0%', '62%']);
  const leftR = useTransform(spread, [0, 1], [0, -9]);
  const rightR = useTransform(spread, [0, 1], [0, 9]);
  const sideY = useTransform(spread, [0, 1], ['0%', '7%']);
  const centerY = useTransform(p, [0, 1], [80, -60]);
  const chipA = useTransform(p, [0, 1], [80, -160]);
  const chipB = useTransform(p, [0, 1], [20, -90]);
  const tagline = taalmeester.tagline.replace(/(\S+)\.$/, '*$1*.');

  return (
    <section ref={ref} id="taalmeester" className="relative isolate px-3 py-10 sm:px-5 sm:py-16">
      <div className="relative isolate overflow-hidden rounded-[40px] bg-[linear-gradient(160deg,#fff3ea,#ffe2cf_55%,#ffd2b8)] py-20 sm:rounded-[56px] sm:py-28 dark:bg-[linear-gradient(160deg,#2a1c13,#1d140e_60%,#140f0b)]">
        <FloatingShapes items={shapes} target={ref} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(236_111_45/0.16)_1px,transparent_1.2px)] [background-size:22px_22px]" />

        <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-4 pl-1.5 text-[13px] font-medium text-[#3b2414] shadow-[0_1px_0_rgb(255_255_255),0_6px_16px_-8px_rgb(236_111_45/0.5)] dark:bg-white/10 dark:text-[#ffd9c2]">
                <span className="rounded-full bg-taal px-2.5 py-0.5 text-[11px] font-semibold text-white">Our product</span>
                Designed & built by SAYEMANS
              </span>
            </Reveal>

            <RevealText as={headingAs} text="TaalMeester." className="mt-7 font-display text-display font-extrabold tracking-[-0.055em] text-taal" />
            <RevealText as="p" text={tagline} delay={0.1} className="mt-3 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.035em]" />

            <Reveal delay={0.2} as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              {taalmeester.description}
            </Reveal>

            <Reveal delay={0.3} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {taalmeester.stats.map((s) => (
                <div key={s.label} className="rounded-3xl bg-white/60 p-4 shadow-[inset_0_1px_0_rgb(255_255_255),0_10px_24px_-14px_rgb(160_70_20/0.45)] dark:bg-white/[0.06] dark:shadow-none">
                  <p className="font-display text-3xl font-bold tracking-tight">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-fg-subtle">{s.label}</p>
                </div>
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

          {/* Phone fan: learning path · home · grammar rule */}
          <div className="relative mx-auto w-[200px] py-6 sm:w-[250px]">
            <motion.div className="absolute inset-x-0 top-6" style={{ x: leftX, rotate: leftR, y: sideY }}>
              <PhoneMockup screen="path" className="w-full" sizes="250px" eager={headingAs === 'h1'} />
            </motion.div>
            <motion.div className="absolute inset-x-0 top-6" style={{ x: rightX, rotate: rightR, y: sideY }}>
              <PhoneMockup screen="de-het-rule" className="w-full" sizes="250px" eager={headingAs === 'h1'} />
            </motion.div>
            <PhoneMockup screen="home" className="relative z-10 w-full" style={{ y: centerY }} sizes="250px" eager={headingAs === 'h1'} />

            <Sticker style={{ y: chipA }} className="top-[10%] -left-[70%]">
              <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#ff9a5c,#ec6f2d)] text-white"><Icon name="Flame" size={18} /></span>
              <span>
                <span className="block text-[12px] font-semibold">4 days in a row</span>
                <span className="block text-[11px] text-fg-subtle">Streaks that mean something</span>
              </span>
            </Sticker>
            <Sticker style={{ y: chipB }} className="-right-[68%] bottom-[16%]">
              <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#5fd39a,#17a865)] text-white"><Icon name="Check" size={18} strokeWidth={2.5} /></span>
              <span>
                <span className="block text-[12px] font-semibold">De verzekering ✓</span>
                <span className="block text-[11px] text-fg-subtle">Words ending in -ing are de-words</span>
              </span>
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}
