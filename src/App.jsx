import { Suspense, useMemo } from 'react';
import { matchRoutes, useLocation, useRoutes } from 'react-router';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { StoreProvider } from '@/store';
import { routes } from '@/routes/routes';
import Layout from '@/components/layout/Layout';
import Head from '@/components/layout/Head';
import SiteEffects from '@/components/layout/SiteEffects';
import LiquidGlassFilter from '@/components/ui/LiquidGlassFilter';

const routerRoutes = routes.map(({ path, Component }) => ({ path, element: <Component /> }));

function PageFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function Page({ location }) {
  const element = useRoutes(routerRoutes, location);
  return (
    <motion.div
      // No CSS filter here: a filter on a page-tall element exceeds GPU texture
      // limits and renders black. Keep page transitions to opacity/transform.
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transitionEnd: { transform: 'none' } }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 160, damping: 26 }}
    >
      <Suspense fallback={<PageFallback />}>{element}</Suspense>
    </motion.div>
  );
}

function BarePage({ location }) {
  const element = useRoutes(routerRoutes, location);
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>;
}

function AppShell() {
  const location = useLocation();
  const match = matchRoutes(routes, location)?.[0];
  const route = match?.route;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seo = useMemo(() => route?.seo?.(match.params) ?? {}, [location.pathname]);

  const scrollTop = () => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Head seo={seo} pathname={location.pathname} />
      <SiteEffects />
      <LiquidGlassFilter />
      {route?.bare ? (
        <BarePage location={location} />
      ) : (
        <Layout>
          <AnimatePresence mode="wait" initial={false} onExitComplete={scrollTop}>
            <Page key={location.pathname} location={location} />
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}

export default function App({ store }) {
  return (
    <StoreProvider store={store}>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </StoreProvider>
  );
}
