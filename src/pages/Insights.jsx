import { Link } from 'react-router';
import { motion } from 'motion/react';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/sections/CTASection';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import { Stagger, staggerItem } from '@/components/ui/Reveal';
import { insights } from '@/data/insights';

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Notes from the studio." intro="Practical thinking on product strategy, design and engineering." />
      <section className="container-x py-12">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((a) => (
            <motion.div key={a.slug} variants={staggerItem}>
              <Link to={`/insights/${a.slug}`} className="group block h-full">
                <Glass as="article" className="flex h-full flex-col rounded-[32px] p-8 transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="text-[13px] font-medium text-blue">{a.category}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{a.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{a.excerpt}</p>
                  <p className="mt-auto flex items-center gap-3 pt-8 text-[13px] text-fg-subtle">
                    <time dateTime={a.date}>{fmtDate(a.date)}</time> · {a.readingTime} min read
                    <Icon name="ArrowRight" size={14} className="ml-auto transition-transform group-hover:translate-x-1" />
                  </p>
                </Glass>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </section>
      <CTASection />
    </>
  );
}
