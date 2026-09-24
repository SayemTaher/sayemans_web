import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

/** Apple-style paragraph whose words light up as you scroll through it. */
export default function ScrollStatement({ text, eyebrow }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const words = text.split(' ');
  return (
    <section ref={ref} className="container-x py-28 sm:py-40">
      {eyebrow && <p className="eyebrow mb-8">{eyebrow}</p>}
      <p className="max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}
