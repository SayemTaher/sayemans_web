import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { getService, services } from '@/data/services';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/sections/CTASection';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;
  const others = services.filter((o) => o.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={s.kicker} title={s.title} intro={s.summary}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={`/contact?service=${s.slug}`} variant="accent" size="lg">Discuss your project</Button>
          <Button to="/pricing" variant="glass" size="lg">View pricing</Button>
        </div>
      </PageHero>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Glass className="h-full rounded-[32px] p-8 sm:p-10">
            <span className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} text-white`}>
              <Icon name={s.icon} size={26} />
            </span>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-fg-muted">{s.description}</p>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-fg-subtle">Outcomes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.outcomes.map((o) => (
                <span key={o} className="rounded-full bg-green/12 px-3.5 py-1.5 text-[13px] font-medium text-green">{o}</span>
              ))}
            </div>
          </Glass>
        </Reveal>
        <Reveal delay={0.1}>
          <Glass className="h-full rounded-[32px] p-8 sm:p-10">
            <h2 className="text-xl font-semibold">What you get</h2>
            <ul className="mt-6 space-y-4">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] text-fg-muted">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-blue" strokeWidth={2.25} /> {d}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-fg-subtle">Tools & stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1 text-[13px]">{t}</span>
              ))}
            </div>
          </Glass>
        </Reveal>
      </section>

      <section className="container-x py-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Related services</h2>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <motion.div key={o.slug} variants={staggerItem}>
              <Link to={`/services/${o.slug}`} className="group block h-full">
                <Glass className="flex h-full items-center gap-4 rounded-3xl p-5">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${o.tint} text-white`}><Icon name={o.icon} size={20} /></span>
                  <span className="flex-1">
                    <span className="block font-medium">{o.title}</span>
                    <span className="block text-[13px] text-fg-subtle">{o.kicker}</span>
                  </span>
                  <Icon name="ArrowRight" size={16} className="text-fg-subtle transition-transform group-hover:translate-x-1" />
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
