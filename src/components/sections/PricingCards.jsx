import { motion } from 'motion/react';
import { formatPrice } from '@/data/pricing';
import Glass from '../ui/Glass';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Stagger, staggerItem } from '../ui/Reveal';

export function PriceCard({ plan, ctaTo = '/contact' }) {
  const featured = plan.featured;
  return (
    <motion.div variants={staggerItem} className="h-full">
      <Glass
        as="article"
        className={`relative flex h-full flex-col rounded-[32px] p-7 sm:p-8 ${featured ? 'ring-1 ring-blue/40 shadow-[0_30px_80px_-30px_var(--color-blue)]' : ''}`}
      >
        {featured && (
          <span className="absolute -top-3 left-8 rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-indigo))] px-3 py-1 text-[11px] font-semibold text-white">
            Most popular
          </span>
        )}
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-fg-muted">{plan.description}</p>
        <p className="mt-6 flex items-baseline gap-2">
          {plan.prefix && <span className="text-[14px] text-fg-subtle">{plan.prefix}</span>}
          <span className="text-5xl font-semibold tracking-[-0.04em]">{formatPrice(plan.price)}</span>
        </p>
        <p className="mt-1 text-[13px] text-fg-subtle">
          {plan.unit}
          {plan.price != null && ' · excl. BTW'}
          {plan.timeline && ` · ${plan.timeline}`}
        </p>
        <ul className="mt-7 space-y-3 border-t border-line pt-7">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 text-[15px]">
              <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-blue" strokeWidth={2.25} />
              <span className="text-fg-muted">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <Button to={`${ctaTo}?plan=${plan.id}`} variant={featured ? 'accent' : 'glass'} className="w-full">
            {plan.cta ?? `Choose ${plan.name}`}
          </Button>
        </div>
      </Glass>
    </motion.div>
  );
}

export default function PricingCards({ plans }) {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3">
      {plans.map((p) => (
        <PriceCard key={p.id} plan={p} />
      ))}
    </Stagger>
  );
}
