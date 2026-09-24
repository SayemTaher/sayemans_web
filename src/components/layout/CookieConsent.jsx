import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConsent, setConsent } from '@/store/slices/consent';
import Glass from '../ui/Glass';

/** GDPR / Telecommunicatiewet compliant: nothing non-essential runs before a choice is made. */
export default function CookieConsent() {
  const consent = useAppSelector(selectConsent);
  const dispatch = useAppDispatch();
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const visible = consent.hydrated && consent.status === 'unknown';
  const decide = (a, m = false) => dispatch(setConsent({ analytics: a, marketing: m }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[60] sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-md"
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
          exit={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.6 }}
        >
          <Glass className="rounded-[28px] p-5">
            <p className="text-[15px] font-semibold">Your privacy, your choice</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
              We use essential cookies to run this site. With your permission we also use analytics to understand how it is used and improve it. See our{' '}
              <Link to="/cookies" className="underline">cookie policy</Link>.
            </p>

            <AnimatePresence initial={false}>
              {custom && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-4 space-y-3 text-[13px]">
                    <label className="flex items-center justify-between gap-4 opacity-70">
                      <span><strong className="font-medium">Essential</strong>: required for the site to work</span>
                      <input type="checkbox" checked disabled className="size-4 accent-blue" />
                    </label>
                    <label className="flex items-center justify-between gap-4">
                      <span><strong className="font-medium">Analytics</strong>: anonymous usage statistics</span>
                      <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="size-4 accent-blue" />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap gap-2">
              {custom ? (
                <button onClick={() => decide(analytics)} className="h-9 flex-1 rounded-full bg-fg px-4 text-[13px] font-medium text-bg">Save choices</button>
              ) : (
                <>
                  <button onClick={() => decide(true)} className="h-9 flex-1 rounded-full bg-fg px-4 text-[13px] font-medium text-bg">Accept all</button>
                  <button onClick={() => decide(false)} className="h-9 flex-1 rounded-full bg-fg/10 px-4 text-[13px] font-medium">Decline</button>
                  <button onClick={() => setCustom(true)} className="h-9 px-2 text-[13px] font-medium text-blue">Customise</button>
                </>
              )}
            </div>
          </Glass>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
