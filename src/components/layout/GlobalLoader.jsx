import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadReset, selectPendingLoads, showToast } from '@/store/slices/ui';
import { loaderConfig } from '@/config/loader';
import BrandLetters from './BrandLetters';

const RELOAD_KEY = 'sayemans:loader-reloaded';

/**
 * Global loading overlay. Anything can register work with useLoading() or
 * trackLoading(). When work takes longer than showAfterMs, the SAYEMANS
 * letters bounce until everything resolves. After timeoutMs the visitor is
 * sent home (or, if already home, the page reloads once).
 */
export default function GlobalLoader() {
  const pending = useAppSelector(selectPendingLoads);
  const busy = pending > 0;
  const [visible, setVisible] = useState(false);
  const shownAt = useRef(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = useRef(pathname);
  useEffect(() => {
    path.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!busy) {
      // Keep it on screen for minVisibleMs so it never flickers.
      const left = shownAt.current ? Math.max(0, loaderConfig.minVisibleMs - (Date.now() - shownAt.current)) : 0;
      const hide = setTimeout(() => {
        shownAt.current = 0;
        setVisible(false);
      }, left);
      return () => clearTimeout(hide);
    }

    const show = setTimeout(() => {
      shownAt.current = Date.now();
      setVisible(true);
    }, loaderConfig.showAfterMs);

    const giveUp = setTimeout(() => {
      shownAt.current = 0;
      setVisible(false);
      // Clear whatever is stuck so the loader re-arms cleanly.
      dispatch(loadReset());
      if (path.current !== '/') {
        navigate('/');
        dispatch(showToast({ message: 'That took too long, so we brought you back home.' }));
        return;
      }
      let reloaded = false;
      try {
        reloaded = sessionStorage.getItem(RELOAD_KEY) === '1';
        if (!reloaded) sessionStorage.setItem(RELOAD_KEY, '1');
      } catch {
        /* storage unavailable */
      }
      if (!reloaded) {
        window.location.reload();
      } else {
        dispatch(showToast({ message: 'Still loading. Please check your connection.', tone: 'error' }));
      }
    }, loaderConfig.timeoutMs);

    return () => {
      clearTimeout(show);
      clearTimeout(giveUp);
    };
  }, [busy, dispatch, navigate]);

  // A successful load clears the one-time reload guard.
  useEffect(() => {
    if (!busy) {
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [busy]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="loader-overlay"
        >
          <BrandLetters letterClass="loader-letter" />
          <span className="sr-only">Loading…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
