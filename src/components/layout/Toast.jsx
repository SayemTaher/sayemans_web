import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearToast, selectToast } from '@/store/slices/ui';
import Icon from '../ui/Icon';

export default function Toast() {
  const toast = useAppSelector(selectToast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(clearToast()), 4200);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-24 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="glass glass-rim pointer-events-auto flex items-center gap-3 rounded-full py-2.5 pr-5 pl-3 text-sm font-medium"
          >
            <span className={`grid size-6 place-items-center rounded-full text-white ${toast.tone === 'error' ? 'bg-pink' : 'bg-green'}`}>
              <Icon name={toast.tone === 'error' ? 'X' : 'Check'} size={14} strokeWidth={2.5} />
            </span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
