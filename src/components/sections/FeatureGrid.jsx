import { motion } from 'motion/react';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import { Stagger, staggerItem } from '../ui/Reveal';

export default function FeatureGrid({ items, cols = 'md:grid-cols-3', accent = 'text-blue' }) {
  return (
    <Stagger className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map((it) => (
        <motion.div key={it.title} variants={staggerItem}>
          <Glass className="h-full rounded-[28px] p-7">
            <span className={`glass grid size-12 place-items-center rounded-2xl ${accent}`}>
              <Icon name={it.icon} size={22} />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{it.text}</p>
          </Glass>
        </motion.div>
      ))}
    </Stagger>
  );
}
