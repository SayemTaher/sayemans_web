import { stats } from '@/data/content';
import Counter from '../ui/Counter';
import { Reveal } from '../ui/Reveal';

export default function StatsBand({ items = stats }) {
  return (
    <section className="container-x py-20">
      <div className="grid grid-cols-2 gap-y-12 border-y border-line py-14 md:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="px-4 text-center">
            <p className="font-display text-5xl font-extrabold tracking-[-0.05em] sm:text-7xl">
              <Counter value={s.value} suffix={s.suffix} className="text-gradient" />
            </p>
            <p className="mx-auto mt-3 max-w-[16ch] text-[14px] text-fg-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
