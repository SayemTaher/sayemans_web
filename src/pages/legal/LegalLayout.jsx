import { RevealText, Reveal } from '@/components/ui/Reveal';

export default function LegalLayout({ title, updated, children }) {
  return (
    <article className="container-x max-w-3xl! pt-40 pb-16">
      <p className="eyebrow">Legal</p>
      <RevealText as="h1" animateOnMount text={title} className="mt-4 text-headline font-semibold text-chrome" />
      <p className="mt-4 text-[14px] text-fg-subtle">Last updated: {updated}</p>
      <Reveal className="prose-apple mt-12 border-t border-line pt-10">{children}</Reveal>
    </article>
  );
}
