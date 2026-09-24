import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectTheme, setTheme } from '@/store/slices/ui';
import Icon from '../ui/Icon';

const order = ['system', 'light', 'dark'];
const icon = { system: 'Monitor', light: 'Sun', dark: 'Moon' };

export default function ThemeToggle({ className = '' }) {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const next = order[(order.indexOf(theme) + 1) % order.length];
  // Store starts as 'system' on server and client; the persisted value arrives after hydration.
  const current = theme;

  return (
    <button
      onClick={() => dispatch(setTheme(next))}
      className={`relative grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg ${className}`}
      aria-label={`Theme: ${current}. Switch to ${next}`}
      title={`Theme: ${current}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={current} initial={{ opacity: 0, rotate: -90, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.6 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <Icon name={icon[current]} size={17} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
