import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon';

export default function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className={`divide-y divide-line ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium sm:text-xl"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="glass grid size-9 shrink-0 place-items-center rounded-full">
                  <Icon name="Plus" size={16} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-fg-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
