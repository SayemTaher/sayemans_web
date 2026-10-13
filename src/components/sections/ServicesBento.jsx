import { Link } from 'react-router';
import { motion } from 'motion/react';
import { services } from '@/data/services';
import SectionHeader from '../ui/SectionHeader';
import Icon from '../ui/Icon';
import { Stagger, staggerItem } from '../ui/Reveal';

// Pastel clay fill per card (light); in dark mode the same hue at low strength.
const fills = ['#ddd0ff', '#ffd9c2', '#cdeedd', '#fbeaa8', '#cfe0ff', '#ffd6e7', '#e6f6b4', '#f3e6d6'];

const spans = ['md:col-span-4 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3'];

export default function ServicesBento({ limit = services.length, header = true }) {
  return (
    <section className="container-x py-24 sm:py-32">
      {header && (
        <SectionHeader
          eyebrow="What we do"
          title="Everything your product needs. Under *one* roof."
          intro="Strategy, design, engineering and growth. One team and one process, so nothing gets lost between agencies."
        />
      )}
      <Stagger className="mt-16 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
        {services.slice(0, limit).map((s, i) => {
          const big = i === 0;
          return (
            <motion.div key={s.slug} variants={staggerItem} className={spans[i] ?? 'md:col-span-2'}>
              <Link to={`/services/${s.slug}`} className="group block h-full">
                <article
                  style={{ '--fill': fills[i % fills.length] }}
                  className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[var(--fill)] p-7 text-[#16140f] shadow-[inset_0_1px_0_rgb(255_255_255/0.7),inset_0_-2px_0_rgb(0_0_0/0.05),12px_16px_32px_-16px_rgb(120_104_76/0.45)] transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg] sm:p-8 dark:bg-[color-mix(in_oklab,var(--fill)_22%,#1a1815)] dark:text-fg dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),12px_16px_32px_-14px_rgb(0_0_0/0.8)]"
                >
                  <div className="flex items-start justify-between">
                    <motion.span
                      initial={{ scale: 0.4, rotate: -14, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.15 + i * 0.05 }}
                      className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-3px_0_rgb(0_0_0/0.15),0_10px_18px_-8px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:-rotate-8 group-hover:scale-110`}
                    >
                      <Icon name={s.icon} size={22} />
                    </motion.span>
                    <span className="font-mono text-[12px] tracking-[0.1em] opacity-60">[{String(i + 1).padStart(2, '0')}]</span>
                  </div>
                  <p className="mt-6 font-mono text-[11.5px] tracking-[0.12em] uppercase opacity-60">{s.kicker}</p>
                  <h3 className={`mt-2 font-display font-bold tracking-[-0.035em] ${big ? 'text-4xl sm:text-5xl' : 'text-2xl'}`}>{s.title}</h3>
                  <p className={`mt-3 leading-relaxed opacity-75 ${big ? 'max-w-md text-[17px]' : 'text-[15px]'}`}>{s.summary}</p>
                  {big && (
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {s.deliverables.slice(0, 6).map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[14px] opacity-80">
                          <Icon name="Check" size={15} strokeWidth={2.5} /> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-semibold">
                    <span className="grid size-8 place-items-center rounded-full bg-[#16140f] text-white transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:rotate-[-45deg] dark:bg-fg dark:text-bg">
                      <Icon name="ArrowRight" size={15} />
                    </span>
                    Learn more
                  </span>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </Stagger>
    </section>
  );
}
