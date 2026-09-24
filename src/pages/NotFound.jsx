import Aurora from '@/components/ui/Aurora';
import Button from '@/components/ui/Button';
import { RevealText } from '@/components/ui/Reveal';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden px-5 text-center">
      <Aurora intensity={0.6} />
      <div>
        <p className="text-[clamp(6rem,20vw,14rem)] leading-none font-bold tracking-[-0.06em] text-gradient">404</p>
        <RevealText as="h1" animateOnMount text="This page drifted away." className="mt-4 text-3xl font-semibold sm:text-4xl" />
        <p className="mt-4 text-fg-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Back home</Button>
          <Button to="/contact" variant="glass">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
