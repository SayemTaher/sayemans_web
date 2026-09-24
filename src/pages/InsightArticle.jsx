import { Link, useParams } from 'react-router';
import { getInsight } from '@/data/insights';
import CTASection from '@/components/sections/CTASection';
import Icon from '@/components/ui/Icon';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import NotFound from './NotFound';
import { fmtDate } from './Insights';

export default function InsightArticle() {
  const { slug } = useParams();
  const a = getInsight(slug);
  if (!a) return <NotFound />;
  return (
    <>
      <article className="container-x max-w-3xl! pt-40 pb-16">
        <Reveal>
          <Link to="/insights" className="inline-flex items-center gap-1 text-[14px] text-fg-subtle hover:text-fg">
            <Icon name="ArrowRight" size={14} className="rotate-180" /> All insights
          </Link>
        </Reveal>
        <Reveal as="p" className="mt-10 text-[13px] font-medium text-blue">{a.category}</Reveal>
        <RevealText as="h1" animateOnMount text={a.title} className="mt-3 text-headline font-semibold text-chrome" />
        <Reveal as="p" className="mt-6 text-[14px] text-fg-subtle">
          <time dateTime={a.date}>{fmtDate(a.date)}</time> · {a.readingTime} min read · SAYEMANS Studio
        </Reveal>
        <Reveal delay={0.1} className="prose-apple mt-12 border-t border-line pt-10">
          <p className="text-xl! text-fg!">{a.excerpt}</p>
          {a.body.map((b, i) => (b.type === 'h2' ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>))}
        </Reveal>
      </article>
      <CTASection />
    </>
  );
}
