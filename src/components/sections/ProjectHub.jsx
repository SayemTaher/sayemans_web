import { motion } from 'motion/react';
import Icon from '../ui/Icon';
import Wordmark from '../layout/Wordmark';

/**
 * Illustrative "Project Hub": the client workspace during a SAYEMANS
 * engagement. It tells the story of how we work: phases, sprint
 * deliverables, live staging with quality scores, demos and a fixed budget.
 * Pure HTML, so it's crisp, themeable and light.
 */

const ease = [0.16, 1, 0.3, 1];

const phases = [
  { name: 'Discover', state: 'done' },
  { name: 'Define', state: 'done' },
  { name: 'Design', state: 'done' },
  { name: 'Develop', state: 'active', progress: 64 },
  { name: 'Deliver', state: 'todo' },
  { name: 'Evolve', state: 'todo' },
];

const sprint = [
  { label: 'Design system v2: Figma tokens → code', tag: 'Design', state: 'done' },
  { label: 'Onboarding flow (web + iOS)', tag: 'UX', state: 'done' },
  { label: 'Stripe subscriptions & billing portal', tag: 'Backend', state: 'active' },
  { label: 'iOS TestFlight build 1.0 (12)', tag: 'Mobile', state: 'todo' },
];

const activity = [
  { icon: 'PenTool', tone: 'text-pink', text: 'Checkout v3 designs shared for review', time: '1h' },
  { icon: 'Code2', tone: 'text-blue', text: 'Build #142 passed 318 tests · merged to main', time: '2m' },
  { icon: 'Users', tone: 'text-green', text: 'Usability test: 5/5 users completed onboarding', time: 'Yesterday' },
];

const vitals = [
  ['LCP', '0.9s'],
  ['INP', '48ms'],
  ['CLS', '0.00'],
];

const scores = [
  { label: 'Perf', value: 98 },
  { label: 'A11y', value: 100 },
  { label: 'Best', value: 100 },
  { label: 'SEO', value: 100 },
];

function Ring({ value, label, delay }) {
  const c = 2 * Math.PI * 15;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-11">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity=".1" strokeWidth="3.5" />
          <motion.circle
            cx="18" cy="18" r="15" fill="none" stroke="var(--color-green)" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ delay, duration: 1.4, ease }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold tabular-nums">{value}</span>
      </div>
      <span className="text-[9px] text-fg-subtle">{label}</span>
    </div>
  );
}

function Card({ title, icon, action, children, className = '' }) {
  return (
    <div className={`flex min-w-0 flex-col rounded-2xl border border-line bg-fg/[0.025] p-3.5 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-fg-muted">
          <Icon name={icon} size={13} /> {title}
        </p>
        {action && <span className="text-[10px] font-medium text-blue">{action}</span>}
      </div>
      {children}
    </div>
  );
}

export default function ProjectHub() {
  return (
    <div aria-hidden="true" className="grid h-full grid-cols-[168px_minmax(0,1fr)] text-left max-md:grid-cols-1">
      {/* Sidebar */}
      <aside className="hidden flex-col border-r border-line p-4 md:flex">
        <Wordmark height={11} className="mb-1 text-fg" />
        <p className="mb-5 text-[10px] text-fg-subtle">Client hub</p>
        {[
          ['Overview', 'Gauge'],
          ['Roadmap', 'Workflow'],
          ['Designs', 'PenTool'],
          ['Builds', 'Code2'],
          ['Analytics', 'BarChart3'],
          ['Invoices', 'Inbox'],
        ].map(([l, ic], i) => (
          <span key={l} className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] ${i === 0 ? 'bg-fg/[0.07] font-medium text-fg' : 'text-fg-subtle'}`}>
            <Icon name={ic} size={13} /> {l}
          </span>
        ))}
        <div className="mt-auto">
          <p className="mb-2 text-[10px] text-fg-subtle">Your team</p>
          <div className="flex -space-x-1.5">
            {[
              ['PD', 'from-blue to-indigo'],
              ['FE', 'from-purple to-pink'],
              ['BE', 'from-green to-teal'],
              ['iOS', 'from-orange to-pink'],
            ].map(([n, g]) => (
              <span key={n} className={`grid size-7 place-items-center rounded-full border-2 border-bg-elevated bg-gradient-to-br ${g} text-[8px] font-bold text-white`}>{n}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle">Project · SaaS MVP</p>
            <p className="text-lg font-semibold tracking-tight sm:text-xl">Customer portal & iOS app</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-green/15 px-2.5 py-1 text-[11px] font-semibold text-green">
            <span className="size-1.5 animate-pulse rounded-full bg-green" /> Sprint 4 of 6 · On track
          </span>
        </div>

        {/* Phase tracker */}
        <div className="grid grid-cols-6 gap-1.5">
          {phases.map((p, i) => (
            <div key={p.name}>
              <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-indigo))]"
                  initial={{ width: 0 }}
                  animate={{ width: p.state === 'done' ? '100%' : p.state === 'active' ? `${p.progress}%` : '0%' }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 0.8, ease }}
                />
              </div>
              <p className={`mt-1.5 truncate text-[10px] ${p.state === 'active' ? 'font-semibold text-fg' : p.state === 'done' ? 'text-fg-muted' : 'text-fg-subtle'}`}>
                {p.state === 'done' ? '✓ ' : ''}{p.name}
              </p>
            </div>
          ))}
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[1.35fr_1fr]">
          <Card title="This sprint" icon="Check" action="4 deliverables">
            <ul className="space-y-2">
              {sprint.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.6, ease }}
                  className="flex items-center gap-2 text-[11.5px]"
                >
                  <span
                    className={`grid size-4 shrink-0 place-items-center rounded-full ${
                      s.state === 'done' ? 'bg-green text-white' : s.state === 'active' ? 'border-2 border-blue' : 'border border-fg/25'
                    }`}
                  >
                    {s.state === 'done' && <Icon name="Check" size={10} strokeWidth={3} />}
                  </span>
                  <span className={`min-w-0 flex-1 truncate ${s.state === 'done' ? 'text-fg-muted line-through decoration-fg/30' : ''}`}>{s.label}</span>
                  <span className="shrink-0 rounded-md bg-fg/[0.06] px-1.5 py-0.5 text-[9px] text-fg-subtle">{s.tag}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 mb-2 border-t border-line pt-3 text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">Activity</p>
            <ul className="space-y-2">
              {activity.map((a, i) => (
                <motion.li
                  key={a.text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + i * 0.12, duration: 0.6, ease }}
                  className="flex items-center gap-2 text-[11px]"
                >
                  <span className={`grid size-5 shrink-0 place-items-center rounded-md bg-fg/[0.06] ${a.tone}`}>
                    <Icon name={a.icon} size={11} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-fg-muted">{a.text}</span>
                  <span className="shrink-0 text-[9.5px] text-fg-subtle">{a.time}</span>
                </motion.li>
              ))}
            </ul>
          </Card>

          <div className="grid min-w-0 gap-3">
            <Card title="Staging" icon="Globe" action="Open ↗">
              <p className="mb-2.5 flex items-center gap-1.5 truncate text-[10.5px] text-fg-muted">
                <span className="size-1.5 rounded-full bg-green" /> staging.yourproduct.com · deployed 2 min ago
              </p>
              <div className="flex justify-between">
                {scores.map((s, i) => (
                  <Ring key={s.label} {...s} delay={1.3 + i * 0.1} />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {vitals.map(([k, v]) => (
                  <span key={k} className="rounded-lg bg-green/10 px-2 py-1 text-center">
                    <span className="block text-[9px] text-fg-subtle">{k}</span>
                    <span className="block text-[11px] font-semibold text-green">{v}</span>
                  </span>
                ))}
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-3 max-sm:hidden">
              <Card title="Next demo" icon="Calendar">
                <p className="text-[13px] font-semibold">Thu · 14:00</p>
                <p className="text-[10px] text-fg-subtle">Sprint 4 review · 30 min</p>
                <p className="mt-2 flex -space-x-1">
                  {['bg-blue', 'bg-purple', 'bg-green'].map((c) => (
                    <span key={c} className={`size-4 rounded-full border border-bg-elevated ${c}`} />
                  ))}
                </p>
              </Card>
              <Card title="Budget" icon="ShieldCheck">
                <p className="text-[13px] font-semibold">Fixed price</p>
                <p className="text-[10px] text-green">On budget · no surprises</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/10">
                  <motion.div className="h-full rounded-full bg-green" initial={{ width: 0 }} animate={{ width: '67%' }} transition={{ delay: 1.6, duration: 1, ease }} />
                </div>
                <p className="mt-1 text-[9px] text-fg-subtle">Milestone 2 of 3 invoiced</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
