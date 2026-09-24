import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectTheme, setTheme } from '@/store/slices/ui';
import { hydrateConsent, selectConsent } from '@/store/slices/consent';
import { readPersisted } from '@/store/persist';
import { setAnalyticsConsent, trackPageView } from '@/services/analytics';

/** Side effects that bridge the store to the browser (theme, consent, analytics). */
export default function SiteEffects() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const consent = useAppSelector(selectConsent);
  const { pathname } = useLocation();

  // Hydrate persisted state once on the client.
  useEffect(() => {
    const p = readPersisted();
    if (p.theme) dispatch(setTheme(p.theme));
    dispatch(hydrateConsent(p.consent ? { ...p.consent } : {}));
  }, [dispatch]);

  // Apply theme + follow the OS when set to "system".
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const resolved = theme === 'system' ? (mq.matches ? 'light' : 'dark') : theme;
      document.documentElement.dataset.theme = resolved;
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  // Analytics consent gate.
  useEffect(() => {
    if (consent.hydrated && consent.status === 'decided') setAnalyticsConsent(consent.analytics);
  }, [consent.hydrated, consent.status, consent.analytics]);

  // Page views.
  useEffect(() => {
    if (!pathname.startsWith('/admin')) trackPageView(pathname);
  }, [pathname]);

  return null;
}
