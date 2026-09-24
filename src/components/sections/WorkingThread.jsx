import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import Glass from '../ui/Glass';
import Icon from '../ui/Icon';
import { Reveal, RevealText } from '../ui/Reveal';

/**
 * "Show, don't tell": a shared project channel that plays out one real-feeling
 * week, from a client request to a production release.
 */
const people = {
  client: { name: 'You', role: 'Client', badge: 'bg-fg text-bg', initials: 'YO' },
  design: { name: 'SAYEMANS', role: 'Design', badge: 'bg-gradient-to-br from-pink to-purple text-white', initials: 'SD' },
  dev: { name: 'SAYEMANS', role: 'Engineering', badge: 'bg-gradient-to-br from-blue to-indigo text-white', initials: 'SE' },
};

const thread = [
  { from: 'client', time: 'Mon 09:12', text: 'Customers keep asking for Apple Pay at checkout. Can we fit it into this sprint?' },
  {
    from: 'design',
    time: 'Mon 11:40',
    text: 'Yes. Here is the new flow: three screens, one tap to pay.',
    attachment: { kind: 'design', title: 'Checkout v3', meta: 'Figma · 3 screens' },
  },
  {
    from: 'dev',
    time: 'Thu 16:05',
    text: 'Built and tested. Try it on your phone:',
    attachment: { kind: 'link', title: 'staging.yourproduct.com', meta: '318 tests passed · Lighthouse 98' },
  },
  { from: 'client', time: 'Thu 16:22', text: 'Works perfectly. Ship it 🚀' },
  { from: 'dev', time: 'Fri 10:00', text: 'Live in production, no downtime. First numbers in Monday’s report.', release: true },
];

function Attachment({ a }) {
  if (a.kind === 'design') {
    return (
      <div className="mt-2.5 overflow-hidden rounded-2xl border border-line bg-bg-elevated/70">
        <div className="flex gap-2 bg-fg/[0.03] p-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex h-24 flex-1 flex-col gap-1.5 rounded-lg border border-line bg-bg-elevated p-2">
              <span className="h-1.5 w-2/3 rounded-full bg-fg/15" />
              <span className="h-1.5 w-1/2 rounded-full bg-fg/10" />
              <span className="mt-auto h-4 rounded-md bg-fg/10" />
              <span className={`h-4 rounded-md ${i === 2 ? 'bg-green' : 'bg-fg'}`} />
            </div>
          ))}
        </div>
        <p className="flex items-center gap-2 px-3 py-2 text-[12px]">
          <Icon name="PenTool" size={13} className="text-pink" />
          <span className="font-medium">{a.title}</span>
          <span className="text-fg-subtle">{a.meta}</span>
        </p>
      </div>
    );
  }
  return (
    <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-line bg-bg-elevated/70 p-3">
      <span className="grid size-9 place-items-center rounded-xl bg-green/15 text-green">
        <Icon name="Globe" size={16} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-medium text-blue">{a.title}</span>
        <span className="block text-[11px] text-fg-subtle">{a.meta}</span>
      </span>
    </div>
  );
}

function Message({ m }) {
  const p = people[m.from];
  const mine = m.from === 'client';
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={`flex gap-3 ${mine ? 'flex-row-reverse text-right' : ''}`}
      style={{ transformOrigin: mine ? '100% 100%' : '0% 100%' }}
    >
      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ${p.badge}`}>{p.initials}</span>
      <div className={`max-w-[82%] ${mine ? 'items-end' : ''}`}>
        <p className="mb-1 text-[11px] text-fg-subtle">
          <span className="font-semibold text-fg-muted">{p.name}</span> · {p.role} · {m.time}
        </p>
        <div
          className={`inline-block rounded-2xl px-4 py-2.5 text-left text-[14px] leading-relaxed ${
            mine ? 'rounded-tr-md bg-fg text-bg' : 'rounded-tl-md bg-fg/[0.06]'
          }`}
        >
          {m.text}
          {m.attachment && <Attachment a={m.attachment} />}
        </div>
        {m.release && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green/15 px-3 py-1 text-[12px] font-semibold text-green">
            <Icon name="Rocket" size={13} /> Released to production
          </p>
        )}
      </div>
    </motion.li>
  );
}

function Typing({ from }) {
  const p = people[from];
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`flex items-center gap-3 ${from === 'client' ? 'flex-row-reverse' : ''}`}
    >
      <span className={`grid size-8 place-items-center rounded-full text-[10px] font-bold ${p.badge}`}>{p.initials}</span>
      <span className="flex gap-1 rounded-2xl bg-fg/[0.06] px-3.5 py-3" aria-label="typing">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot size-1.5 rounded-full bg-fg-muted" />
        ))}
      </span>
    </motion.li>
  );
}

export default function WorkingThread() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      for (let i = 0; i < thread.length && !cancelled; i++) {
        setTyping(true);
        await wait(i === 0 ? 500 : 900);
        if (cancelled) return;
        setTyping(false);
        setShown(i + 1);
        await wait(700);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  // Reduced motion: show the whole thread immediately, no typing sequence.
  const count = reduce ? thread.length : shown;
  const next = thread[count];

  return (
    <section ref={ref} className="container-x grid items-start gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div className="lg:sticky lg:top-32">
        <Reveal as="p" className="eyebrow">Working together</Reveal>
        <RevealText text="Less talk. More shipping." className="mt-5 text-headline font-semibold text-chrome" />
        <Reveal as="p" delay={0.1} className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
          One shared channel, the people doing the work, and a staging link you can open any time. This is a normal week.
        </Reveal>
        <Reveal delay={0.2} className="mt-8 grid max-w-md grid-cols-3 gap-3">
          {[
            ['< 24h', 'replies'],
            ['Weekly', 'demos'],
            ['Always', 'on staging'],
          ].map(([v, l]) => (
            <Glass key={l} className="rounded-2xl p-3.5">
              <p className="text-lg font-semibold tracking-tight">{v}</p>
              <p className="text-[12px] text-fg-subtle">{l}</p>
            </Glass>
          ))}
        </Reveal>
      </div>

      <Glass interactive={false} className="overflow-hidden rounded-[32px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <p className="flex items-center gap-2 text-[14px] font-semibold">
            <span className="text-fg-subtle">#</span>yourproduct-sayemans
          </p>
          <p className="flex items-center gap-1.5 text-[12px] text-fg-subtle">
            <span className="size-2 rounded-full bg-green" /> 4 members
          </p>
        </div>
        {/* Screen readers get the full thread at once */}
        <ol className="sr-only">
          {thread.map((m) => (
            <li key={m.time}>{`${people[m.from].name} (${people[m.from].role}), ${m.time}: ${m.text}`}</li>
          ))}
        </ol>
        <ol aria-hidden="true" className="flex min-h-[560px] flex-col justify-end gap-5 p-5 sm:p-6">
          {thread.slice(0, count).map((m) => (
            <Message key={m.time} m={m} />
          ))}
          <AnimatePresence>{typing && next && <Typing key={`t-${count}`} from={next.from} />}</AnimatePresence>
        </ol>
      </Glass>
    </section>
  );
}
