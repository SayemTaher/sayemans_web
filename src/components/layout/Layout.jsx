import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import Toast from './Toast';

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative">{children}</main>
      <Footer />
      <CookieConsent />
      <Toast />
    </>
  );
}
