import { motion } from 'motion/react';

const spring = { type: 'spring', stiffness: 90, damping: 20, mass: 0.9 };

// Once revealed, drop filter/transform so elements stop holding GPU layers.
const done = { filter: 'none', transform: 'none' };

/** Fade + rise + de-blur when scrolled into view (Apple product-page style). */
export function Reveal({ as = 'div', delay = 0, y = 32, blur = 10, className = '', children, ...rest }) {
  const Cmp = motion[as] ?? motion.div;
  return (
    <Cmp
      className={`reveal ${className}`}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: done }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ ...spring, delay }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

/** Headline that reveals word-by-word. */
export function RevealText({ text, as = 'h2', className = '', delay = 0, stagger = 0.05, animateOnMount = false }) {
  const Tag = motion[as];
  const words = text.split(' ');
  // background-clip:text cannot paint through transformed children, so gradient
  // classes move onto each word; each word shows its slice of one wide gradient.
  const gradient = className.split(' ').filter((c) => /^text-(gradient|chrome)/.test(c)).join(' ');
  const outer = className.split(' ').filter((c) => !/^text-(gradient|chrome)/.test(c)).join(' ');
  const n = words.length;
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };
  return (
    <Tag className={outer} initial="hidden" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`reveal inline-block ${gradient ? `${gradient} -mb-[0.14em] pb-[0.14em]` : ""}`}
          style={gradient ? { backgroundSize: `${n * 100}% 100%`, backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0` } : undefined}
          variants={{
            hidden: { opacity: 0, y: '0.45em', filter: 'blur(12px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: done, transition: { type: 'spring', stiffness: 110, damping: 20 } },
          }}
        >
          {w}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Staggered children container. */
export function Stagger({ className = '', children, gap = 0.08, as = 'div' }) {
  const Cmp = motion[as];
  return (
    <Cmp className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ staggerChildren: gap }}>
      {children}
    </Cmp>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: done, transition: spring },
};
