import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { mainNav } from '@/config/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { closeNav, selectNavOpen, toggleNav } from '@/store/slices/ui';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import usePointerGlow from '@/hooks/usePointerGlow';

const spring = { type: 'spring', stiffness: 260, damping: 30 };

export default function Navbar() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuState, setMenuState] = useState({ id: null, path: null });
  const open = useAppSelector(selectNavOpen);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  // Menu auto-closes on navigation: it is only "open" for the path it was opened on.
  const menu = menuState.path === pathname ? menuState.id : null;
  const setMenu = (id) => setMenuState({ id, path: pathname });
  // Computed from the pathname (not NavLink) so server and client markup always agree.
  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);
  const glow = usePointerGlow();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > 24);
    setHidden(y > 600 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    dispatch(closeNav());
  }, [pathname, dispatch]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
        animate={{ y: hidden ? -110 : 0 }}
        transition={spring}
      >
        <motion.nav
          aria-label="Main"
          onPointerMove={glow}
          onMouseLeave={() => setMenu(null)}
          layout
          transition={spring}
          className={`glass glass-rim glass-spec glass-refract relative flex w-full items-center justify-between gap-2 rounded-full pr-2 pl-4 transition-[max-width,height] duration-500 ease-[var(--ease-out-expo)] ${
            compact ? 'h-14 max-w-[980px]' : 'h-16 max-w-[1200px]'
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => (
              <li key={item.to} className="relative" onMouseEnter={() => setMenu(item.children ? item.to : null)}>
                <Link
                  to={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors ${isActive(item.to) ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
                >
                  <>
                      {isActive(item.to) && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07] dark:bg-white/10" transition={spring} />
                      )}
                      {item.label}
                      {item.children && <Icon name="ChevronDown" size={14} className={`transition-transform ${menu === item.to ? 'rotate-180' : ''}`} />}
                  </>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <span className="hidden sm:block">
              <Button to="/contact" size="sm" variant="primary">Start a project</Button>
            </span>
            <button
              className="grid size-10 place-items-center rounded-full lg:hidden"
              onClick={() => dispatch(toggleNav())}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'X' : 'Menu'} size={20} />
            </button>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                exit={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(8px)' }}
                transition={spring}
                className="absolute top-[calc(100%+10px)] left-1/2 hidden w-[min(860px,94vw)] -translate-x-1/2 lg:block"
              >
                <div className="glass glass-rim grid grid-cols-2 gap-1 rounded-[28px] p-3">
                  {mainNav.find((n) => n.to === menu)?.children?.map((c) => (
                    <Link key={c.to} to={c.to} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-fg/5">
                      <span className="glass grid size-10 shrink-0 place-items-center rounded-xl text-blue">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium">{c.label}</span>
                        <span className="block text-[13px] text-fg-subtle">{c.text}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/60 backdrop-blur-2xl" onClick={() => dispatch(closeNav())} />
            <motion.nav
              aria-label="Mobile"
              className="relative flex h-full flex-col px-6 pt-28 pb-10"
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ staggerChildren: 0.04 }}
            >
              {[...mainNav, { label: 'Insights', to: '/insights' }, { label: 'Contact', to: '/contact' }].map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } } }}
                  transition={spring}
                >
                  <Link to={item.to} aria-current={isActive(item.to) ? 'page' : undefined} className={`block py-2.5 text-3xl font-semibold tracking-tight ${isActive(item.to) ? 'text-fg' : 'text-fg-muted'}`}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div className="mt-auto" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Button to="/contact" size="lg" variant="accent" className="w-full">Start a project</Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
