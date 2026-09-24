import Aurora from '../ui/Aurora';
import { Reveal, RevealText } from '../ui/Reveal';

export default function PageHero({ eyebrow, title, intro, children, aurora = true }) {
  return (
    <section className="noise relative isolate overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24">
      {aurora && <Aurora intensity={0.7} />}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      <div className="container-x relative flex flex-col items-center text-center">
        {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
        <RevealText as="h1" animateOnMount text={title} className="mt-5 max-w-4xl text-display font-semibold text-chrome" />
        {intro && (
          <Reveal as="p" delay={0.3} className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            {intro}
          </Reveal>
        )}
        {children && <Reveal delay={0.4} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
