import Aurora from '../ui/Aurora';
import FloatingShapes from '../ui/Shapes';
import { RevealText } from '../ui/Reveal';

const shapes = [
  { shape: 'star', className: 'top-[26%] right-[8%]', size: 64, rot: 12, depth: 1.2 },
  { shape: 'ring', className: 'bottom-[10%] left-[5%] hidden sm:block', size: 84, depth: 0.8 },
  { shape: 'pill', className: 'top-[18%] left-[12%] hidden lg:block', size: 84, rot: -24, depth: 0.6 },
];

export default function PageHero({ eyebrow, title, intro, children, aurora = true }) {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24">
      {aurora && <Aurora intensity={0.7} />}
      <FloatingShapes items={shapes} delay={1.5} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      <div className="container-x relative flex flex-col items-center text-center">
        {eyebrow && <p className="enter eyebrow">{eyebrow}</p>}
        <RevealText as="h1" animateOnMount text={title} className="mt-5 max-w-4xl font-display text-display font-extrabold" />
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
