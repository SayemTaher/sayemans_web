import { Reveal, RevealText } from './Reveal';

export default function SectionHeader({ eyebrow, title, intro, align = 'center', className = '', titleClass = '' }) {
  const a = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${a} ${className}`}>
      {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
      <RevealText text={title} className={`text-headline font-semibold text-chrome ${titleClass}`} />
      {intro && (
        <Reveal as="p" delay={0.15} className="text-lg leading-relaxed text-fg-muted sm:text-xl">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
