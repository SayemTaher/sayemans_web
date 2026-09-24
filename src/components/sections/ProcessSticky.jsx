import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { processSteps } from '@/data/content';
import Glass from '../ui/Glass';
import Button from '../ui/Button';
import { Reveal, RevealText } from '../ui/Reveal';

/** Sticky title on the left, steps scrolling on the right with a live progress rail. */
export default function ProcessSticky({ cta = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section ref={ref} className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Reveal as="p" className="eyebrow">How we work</Reveal>
        <RevealText text="A process you can follow." className="mt-5 text-headline font-semibold text-chrome" />
        <Reveal as="p" delay={0.15} className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
          Six clear phases, weekly demos and one shared roadmap. You always know what is happening, what is next and what it costs.
        </Reveal>
        {cta && (
          <Reveal delay={0.25} className="mt-8">
            <Button to="/process" variant="glass">See the full process</Button>
          </Reveal>
        )}
      </div>

      <div className="relative pl-8 sm:pl-12">
        <div className="absolute top-2 bottom-2 left-[11px] w-px bg-line sm:left-[15px]" />
        <motion.div style={{ scaleY }} className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-[linear-gradient(180deg,var(--color-blue),var(--color-purple),var(--color-pink))] sm:left-[15px]" />
        <ol className="space-y-6">
          {processSteps.map((s) => (
            <li key={s.id} className="relative">
              <span className="absolute top-8 -left-8 grid size-6 place-items-center rounded-full border border-line bg-bg text-[10px] font-semibold sm:-left-12 sm:size-8 sm:text-[11px]">
                {s.step}
              </span>
              <Reveal>
                <Glass className="rounded-[28px] p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                    <span className="text-[13px] text-fg-subtle">{s.duration}</span>
                  </div>
                  <p className="mt-3 text-[16px] leading-relaxed text-fg-muted">{s.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.outputs.map((o) => (
                      <span key={o} className="rounded-full bg-fg/[0.06] px-3 py-1 text-[12px] font-medium text-fg-muted">{o}</span>
                    ))}
                  </div>
                </Glass>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
