import { useEffect, useId } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';

/*
 * Soft 3D "clay" shapes: SVG with radial/linear shading so they read as
 * objects, not icons. Used as playful set dressing (hero, product spotlight,
 * CTA). Purely decorative: always aria-hidden.
 */

function Star({ a = '#ffb07a', b = '#ff5a1f' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className="size-full overflow-visible">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </radialGradient>
      </defs>
      <path d="M50 0 C55 38 62 45 100 50 C62 55 55 62 50 100 C45 62 38 55 0 50 C38 45 45 38 50 0Z" fill={`url(#${id})`} />
    </svg>
  );
}

function Ring({ a = '#efe6ff', b = '#9b7bff' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className="size-full overflow-visible">
      <defs>
        <radialGradient id={id} cx="0.32" cy="0.28" r="0.85">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="none" stroke={`url(#${id})`} strokeWidth="22" />
    </svg>
  );
}

function Pill({ a = '#ecff9c', b = '#a3d417' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 44" className="size-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="100" height="44" rx="22" fill={`url(#${id})`} />
      <rect x="12" y="7" width="54" height="9" rx="4.5" fill="#fff" opacity="0.45" />
    </svg>
  );
}

function Bolt({ a = '#fff27a', b = '#ffc21a' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 70 100" className="size-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <path d="M42 0 L4 58 H32 L24 100 L66 36 H38 Z" fill={`url(#${id})`} strokeLinejoin="round" stroke={`url(#${id})`} strokeWidth="4" />
    </svg>
  );
}

function HalfDisc({ a = '#9fb0ff', b = '#2b39ff' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 50" className="size-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <path d="M0 50 A50 50 0 0 1 100 50 Z" fill={`url(#${id})`} />
    </svg>
  );
}

function Ball({ a = '#ffe1ef', b = '#ff6fae' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className="size-full overflow-visible">
      <defs>
        <radialGradient id={id} cx="0.34" cy="0.3" r="0.75">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#${id})`} />
    </svg>
  );
}

export const shapeComponents = { star: Star, ring: Ring, pill: Pill, bolt: Bolt, half: HalfDisc, ball: Ball };

/**
 * One floating shape, positioned absolutely. `depth` scales scroll + pointer
 * parallax (bigger = closer to the viewer).
 */
function Floater({ shape, className, size, rot = 0, depth = 1, delay = 0, progress, px, py, colors }) {
  const Cmp = shapeComponents[shape];
  const y = useTransform(progress, [0, 1], [0, -260 * depth]);
  const scrollRot = useTransform(progress, [0, 1], [rot, rot + 60 * depth]);
  const x2 = useTransform(px, (v) => v * 28 * depth);
  const y2 = useTransform(py, (v) => v * 28 * depth);
  return (
    <motion.div aria-hidden="true" style={{ y, rotate: scrollRot }} className={`pointer-events-none absolute ${className}`}>
      <motion.div style={{ x: x2, y: y2, width: size }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 12, delay: delay }}
          className="drop-shadow-[0_18px_22px_rgb(60_40_10/0.18)]"
        >
          <div className="animate-bob" style={{ animationDelay: `${-delay * 3}s` }}>
            <Cmp {...colors} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * A field of floating shapes over a section. Pass `items` like
 * [{ shape: 'star', className: 'top-10 left-6', size: 80, depth: 1.2 }].
 * `delay` lets the hero wait for the opening intro.
 */
export default function FloatingShapes({ items, target, delay = 0 }) {
  const { scrollYProgress } = useScroll(target ? { target, offset: ['start end', 'end start'] } : undefined);
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 50, damping: 18 });
  const py = useSpring(rawY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const move = (e) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [rawX, rawY]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {items.map((it, i) => (
        <Floater key={i} {...it} delay={delay + (it.delay ?? i * 0.08)} progress={progress} px={px} py={py} />
      ))}
    </div>
  );
}
