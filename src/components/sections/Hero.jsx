import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Aurora from '../ui/Aurora';
import Button from '../ui/Button';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import { RevealText } from '../ui/Reveal';
import ProjectHub from './ProjectHub';

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const rotateX = useTransform(p, [0, 0.45], [24, 0]);
  const scale = useTransform(p, [0, 0.45], [0.88, 1]);
  const y = useTransform(p, [0, 0.45], [0, -40]);
  const copyOpacity = useTransform(p, [0, 0.25], [1, 0]);
  const copyY = useTransform(p, [0, 0.25], [0, -60]);
  const chipY1 = useTransform(p, [0, 1], [0, -160]);
  const chipY2 = useTransform(p, [0, 1], [0, -90]);

  return (
    <section ref={ref} className="noise relative isolate overflow-hidden pt-36 pb-24 sm:pt-44">
      <Aurora />
      <div className="absolute inset-x-0 bottom-0 -z-0 h-64 bg-gradient-to-b from-transparent to-bg" />

      <motion.div style={{ opacity: copyOpacity, y: copyY }} className="container-x relative z-10 flex flex-col items-center text-center">
        <div className="enter">
          <Glass className="inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[13px] font-medium">
            <span className="rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-purple))] px-2.5 py-0.5 text-[11px] font-semibold text-white">New</span>
            Now booking Q4 product sprints
            <Icon name="ArrowRight" size={14} />
          </Glass>
        </div>

        <h1 className="mt-8 max-w-5xl text-display font-semibold">
          <RevealText as="span" animateOnMount delay={0.15} text="Digital products," className="block text-chrome" />
          <RevealText as="span" animateOnMount delay={0.35} text="engineered with craft." className="block text-gradient pb-2" />
        </h1>

        <p
          style={{ '--d': '0.6s' }}
          className="enter mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl"
        >
          SAYEMANS is a digital product studio from Eindhoven, the Netherlands. We design and build websites, SaaS platforms and apps
          for B2B companies and ambitious startups, from first sketch to scale.
        </p>

        <div style={{ '--d': '0.75s' }} className="enter mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" size="lg" variant="accent">Start a project</Button>
          <Button to="/services" size="lg" variant="glass" iconRight="ArrowUpRight">Explore services</Button>
        </div>
      </motion.div>

      {/* 3D product stage */}
      <div className="container-x relative mt-20 [perspective:1600px] sm:mt-24">
        <motion.div
          style={{ rotateX, scale, y, transformOrigin: 'center top' }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease }}
          className="relative mx-auto max-w-5xl"
        >
          <Glass interactive={false} className="overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="mx-auto rounded-full bg-fg/[0.05] px-4 py-1 text-[11px] text-fg-subtle">hub.sayemans · your project, live</span>
            </div>
            <div className="aspect-[16/9] bg-bg-elevated/60 max-sm:aspect-auto">
              <ProjectHub />
            </div>
          </Glass>

          {/* Floating glass chips */}
          <motion.div style={{ y: chipY1 }} className="absolute top-[52%] -left-4 hidden md:block lg:-left-16">
            <Glass className="animate-float flex items-center gap-3 rounded-2xl p-3 pr-5">
              <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-pink),var(--color-orange))] text-white"><Icon name="PenTool" size={18} /></span>
              <span className="text-left">
                <span className="block text-[13px] font-semibold">Design system</span>
                <span className="block text-[11px] text-fg-subtle">Tokens synced to code</span>
              </span>
            </Glass>
          </motion.div>
          <motion.div style={{ y: chipY2 }} className="absolute -right-4 -bottom-8 hidden md:block lg:-right-14">
            <Glass className="animate-float flex items-center gap-3 rounded-2xl p-3 pr-5 [animation-delay:-3s]">
              <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-green),var(--color-teal))] text-white"><Icon name="Zap" size={18} /></span>
              <span className="text-left">
                <span className="block text-[13px] font-semibold">Deployed to the edge</span>
                <span className="block text-[11px] text-fg-subtle">Lighthouse 100 · Core Web Vitals ✓</span>
              </span>
            </Glass>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
