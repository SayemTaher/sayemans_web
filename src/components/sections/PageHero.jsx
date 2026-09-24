import Aurora from '../ui/Aurora';
import { RevealText } from '../ui/Reveal';

export default function PageHero({ eyebrow, title, intro, children, aurora = true }) {
  return (
    <section className="noise relative isolate overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24">
      {aurora && <Aurora intensity={0.7} />}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      <div className="container-x relative flex flex-col items-center text-center">
        {eyebrow && <p className="enter eyebrow">{eyebrow}</p>}
        <RevealText as="h1" animateOnMount text={title} className="mt-5 max-w-4xl text-display font-semibold text-chrome" />
        {intro && (
          <p style={{ '--d': '0.3s' }} className="enter mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            {intro}
          </p>
        )}
        {children && <div style={{ '--d': '0.4s' }} className="enter mt-10">{children}</div>}
      </div>
    </section>
  );
}
