import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react';

const words = ['Research', 'Design', 'Build', 'Launch', 'Grow'];

/**
 * Big kinetic word band. Drifts on its own; scrolling speeds it up, and
 * scrolling up reverses it, so the page feels physically connected to the wheel.
 */
function Row({ baseVelocity = -2, outline = false }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const pct = useTransform(x, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    x.set(x.get() + move);
  });

  const items = [...words, ...words];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x: pct }} className="flex shrink-0 items-center">
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={`px-6 text-[clamp(3rem,9vw,8rem)] leading-none font-semibold tracking-[-0.04em] ${
                    outline ? 'text-transparent [-webkit-text-stroke:1.5px_var(--fg-subtle)]' : 'text-chrome'
                  }`}
                >
                  {w}
                </span>
                <span className="size-3 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-pink))]" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function KineticBand() {
  return (
    <section aria-hidden="true" className="mask-fade-x space-y-2 py-16 sm:py-24">
      <Row baseVelocity={-2} />
      <Row baseVelocity={2} outline />
    </section>
  );
}
