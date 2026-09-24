import { Link } from 'react-router';
import { motion } from 'motion/react';
import { services } from '@/data/services';
import SectionHeader from '../ui/SectionHeader';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import { Stagger, staggerItem } from '../ui/Reveal';

const spans = ['md:col-span-4 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3'];

export default function ServicesBento({ limit = services.length, header = true }) {
  return (
    <section className="container-x py-24 sm:py-32">
      {header && (
        <SectionHeader
          eyebrow="What we do"
          title="Everything your product needs. Under one roof."
          intro="Strategy, design, engineering and growth. One team and one process, so nothing gets lost between agencies."
        />
      )}
      <Stagger className="mt-16 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
        {services.slice(0, limit).map((s, i) => {
          const big = i === 0;
          return (
            <motion.div key={s.slug} variants={staggerItem} className={spans[i] ?? 'md:col-span-2'}>
              <Link to={`/services/${s.slug}`} className="group block h-full">
                <Glass
                  as="article"
                  className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 sm:p-8"
                >
                  <div className={`pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-gradient-to-br ${s.tint} opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40`} />
                  <span className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]`}>
                    <Icon name={s.icon} size={22} />
                  </span>
                  <p className="mt-6 text-[13px] font-medium text-fg-subtle">{s.kicker}</p>
                  <h3 className={`mt-1 font-semibold tracking-tight ${big ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{s.title}</h3>
                  <p className={`mt-3 leading-relaxed text-fg-muted ${big ? 'max-w-md text-[17px]' : 'text-[15px]'}`}>{s.summary}</p>
                  {big && (
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {s.deliverables.slice(0, 6).map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[14px] text-fg-muted">
                          <Icon name="Check" size={15} className="text-blue" /> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[14px] font-medium text-blue">
                    Learn more <Icon name="ArrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Glass>
              </Link>
            </motion.div>
          );
        })}
      </Stagger>
    </section>
  );
}
