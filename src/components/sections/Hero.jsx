import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { company } from '@/config/company';
import Aurora from '../ui/Aurora';
import Button from '../ui/Button';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import FloatingShapes from '../ui/Shapes';
import ProjectHub from './ProjectHub';
import PhoneMockup from './PhoneMockup';

const ease = [0.16, 1, 0.3, 1];

const shapes = [
  { shape: 'star', className: 'top-[14%] right-[7%]', size: 92, rot: 10, depth: 1.4 },
  { shape: 'ring', className: 'top-[44%] -left-10 sm:left-[2%]', size: 110, depth: 0.9 },
  { shape: 'pill', className: 'top-[30%] right-[22%] hidden md:block', size: 120, rot: -22, depth: 0.7 },
  { shape: 'bolt', className: 'top-[9%] left-[46%] hidden lg:block', size: 46, rot: 14, depth: 1.1 },
  { shape: 'half', className: 'top-[58%] right-[3%] hidden sm:block', size: 90, rot: -30, depth: 1.2 },
];

/** Circular sticker with rotating text: "Now booking Q4 product sprints". */
function BookingBadge() {
  const text = 'Now booking Q4 · Product sprints · ';
  return (
    <Link
      to="/contact"
      aria-label="Now booking Q4 product sprints. Start a project"
      style={{ '--d': '0.9s' }}
      className="enter group relative grid size-32 shrink-0 place-items-center rounded-full bg-lime text-[#16140f] shadow-[inset_0_-4px_0_rgb(0_0_0/0.12),0_18px_30px_-14px_rgb(120_160_0/0.8)] transition-transform duration-500 ease-[var(--ease-bounce)] hover:scale-105 sm:size-36"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="animate-spin-slow absolute inset-0 size-full p-1.5">
        <defs>
          <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current font-mono text-[9px] font-semibold uppercase">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-[#16140f] text-lime transition-transform duration-500 group-hover:rotate-45">
        <Icon name="ArrowUpRight" size={22} strokeWidth={2.25} />
      </span>
    </Link>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const rotateX = useTransform(p, [0, 0.45], [18, 0]);
  const scale = useTransform(p, [0, 0.45], [0.92, 1]);
  const y = useTransform(p, [0, 0.45], [0, -40]);
  const copyOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const copyY = useTransform(p, [0, 0.3], [0, -70]);
  const phoneY = useTransform(p, [0, 1], [60, -180]);
  const phoneR = useTransform(p, [0, 1], [8, -4]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40">
      <Aurora intensity={0.9} />
      <FloatingShapes items={shapes} delay={1.5} />
      <div className="absolute inset-x-0 bottom-0 -z-0 h-64 bg-gradient-to-b from-transparent to-bg" />

      <motion.div style={{ opacity: copyOpacity, y: copyY }} className="container-x relative z-10">
        <div className="enter flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-[11.5px] tracking-[0.14em] text-fg-subtle uppercase">
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-green" />
            </span>
            Digital product studio
          </span>
          <span>{company.address.city}, NL · Since {company.foundingYear}</span>
        </div>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-display font-extrabold">
            <span style={{ '--d': '0.1s' }} className="enter block">Digital products,</span>
            <span style={{ '--d': '0.28s' }} className="enter block">
              built with{' '}
              <span className="relative inline-block">
                <span className="serif-accent">passion.</span>
                <svg viewBox="0 0 300 24" fill="none" preserveAspectRatio="none" aria-hidden="true" style={{ '--d': '0.7s' }} className="draw-line absolute -bottom-[0.08em] left-0 h-[0.2em] w-full text-lime">
                  <path pathLength="1" d="M4 15 C 50 4, 80 22, 124 13 S 200 3, 236 12 S 280 20, 296 8" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          <div className="hidden lg:block">
            <BookingBadge />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <p style={{ '--d': '0.55s' }} className="enter max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            SAYEMANS is a digital product studio from Eindhoven, the Netherlands. We design and build websites, SaaS platforms and apps
            for B2B companies and growing startups, from the first sketch to launch day and long after.
          </p>
          <div style={{ '--d': '0.7s' }} className="enter flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button to="/contact" size="lg" variant="accent">Start a project</Button>
            <Button to="/services" size="lg" variant="glass" iconRight="ArrowUpRight">Explore services</Button>
          </div>
        </div>
      </motion.div>

      {/* Product stage: the client project hub, with our own app beside it */}
      <div className="container-x relative mt-16 [perspective:1600px] sm:mt-20">
        <motion.div
          style={{ rotateX, scale, y, transformOrigin: 'center top' }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease }}
          className="relative mx-auto max-w-5xl lg:mr-[150px]"
        >
          <Glass interactive={false} className="overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="well mx-auto rounded-full px-4 py-1 font-mono text-[11px] text-fg-subtle">hub.sayemans · your project, live</span>
            </div>
            <div className="aspect-[16/9] bg-bg-elevated/60 max-sm:aspect-auto">
              <ProjectHub />
            </div>
          </Glass>

          <motion.div style={{ y: phoneY, rotate: phoneR }} className="absolute -right-[150px] -bottom-24 hidden w-[230px] lg:block">
            <PhoneMockup screen="home" className="w-full" eager sizes="230px" />
            <Link
              to="/products/taalmeester"
              className="glass absolute -bottom-6 -left-20 flex items-center gap-2.5 rounded-2xl p-2.5 pr-4 text-left transition-transform hover:-translate-y-0.5"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-taal font-display text-[13px] font-extrabold text-white">TM</span>
              <span>
                <span className="block text-[12px] font-semibold">Built in-house: TaalMeester</span>
                <span className="block text-[11px] text-fg-subtle">Live on the App Store →</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
