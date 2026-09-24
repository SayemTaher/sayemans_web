import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { authActions, selectAuth } from '@/store/slices/auth';
import { fetchCollection, signIn, signOut, updateLeadStatus, watchAuth } from '@/services/admin';
import { isFirebaseConfigured } from '@/services/firebase';
import Aurora from '@/components/ui/Aurora';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/layout/Logo';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { trackLoading, useLoading } from '@/hooks/useLoading';

const STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const statusTone = {
  new: 'bg-blue/15 text-blue',
  contacted: 'bg-purple/15 text-purple',
  qualified: 'bg-orange/15 text-orange',
  proposal: 'bg-teal/15 text-teal',
  won: 'bg-green/15 text-green',
  lost: 'bg-fg/10 text-fg-subtle',
};

const fmt = (d) => (d instanceof Date && !isNaN(d) ? d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—');

function countBy(list, fn, top = 6) {
  const m = new Map();
  list.forEach((x) => {
    const k = fn(x) || '(direct)';
    m.set(k, (m.get(k) || 0) + 1);
  });
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, top);
}

function toCsv(rows) {
  const cols = ['createdAt', 'status', 'name', 'email', 'company', 'website', 'services', 'budget', 'timeline', 'message', 'source'];
  const esc = (v) => `"${String(Array.isArray(v) ? v.join('; ') : v instanceof Date ? v.toISOString() : v ?? '').replace(/"/g, '""')}"`;
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n');
}

/* ───────────────────────── Login ───────────────────────── */
function Login() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signIn(email, password);
      if (!isFirebaseConfigured) dispatch(authActions.signedIn({ user: { uid: 'local-dev', email: 'dev@localhost' }, isAdmin: true }));
    } catch (err) {
      dispatch(authActions.failed(err.message?.replace('Firebase: ', '') || 'Sign-in failed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative isolate grid min-h-screen place-items-center px-4">
      <Aurora intensity={0.8} />
      <Glass as="form" onSubmit={onSubmit} className="w-full max-w-sm rounded-[32px] p-8">
        <Logo />
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Studio admin</h1>
        <p className="mt-1 text-[14px] text-fg-muted">Sign in to view leads and analytics.</p>
        {!isFirebaseConfigured && (
          <p className="mt-4 rounded-2xl bg-orange/10 p-3 text-[13px] text-orange">
            Dev mode: Firebase is not configured. Any credentials work locally, and data comes from this browser’s storage.
          </p>
        )}
        <div className="mt-6 space-y-3">
          <input type="email" required autoComplete="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-line bg-bg-elevated/60 px-4 py-3 outline-none focus:border-blue" />
          <input type="password" required autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-line bg-bg-elevated/60 px-4 py-3 outline-none focus:border-blue" />
        </div>
        {error && <p role="alert" className="mt-3 text-[13px] text-pink">{error}</p>}
        <button disabled={busy} className="mt-6 h-12 w-full rounded-full bg-fg font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="mt-4 block text-center text-[13px] text-fg-subtle hover:text-fg">← Back to website</Link>
      </Glass>
    </div>
  );
}

/* ───────────────────────── Widgets ───────────────────────── */
function Kpi({ label, value, icon, tone }) {
  return (
    <Glass className="rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-fg-subtle">{label}</p>
        <Icon name={icon} size={18} className={tone} />
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
    </Glass>
  );
}

function BarList({ title, rows }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <Glass className="rounded-3xl p-5">
      <h3 className="text-[15px] font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {rows.length === 0 && <li className="text-[13px] text-fg-subtle">No data yet.</li>}
        {rows.map(([k, v]) => (
          <li key={k} className="relative flex justify-between overflow-hidden rounded-lg px-3 py-1.5 text-[13px]">
            <span className="absolute inset-y-0 left-0 rounded-lg bg-blue/12" style={{ width: `${(v / max) * 100}%` }} />
            <span className="relative truncate">{k}</span>
            <span className="relative tabular-nums text-fg-muted">{v}</span>
          </li>
        ))}
      </ul>
    </Glass>
  );
}

function DailyChart({ events }) {
  const days = useMemo(() => {
    const out = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      out.push({ d, n: 0 });
    }
    events.forEach((e) => {
      if (e.type !== 'page_view') return;
      const t = new Date(e.createdAt);
      t.setHours(0, 0, 0, 0);
      const slot = out.find((x) => x.d.getTime() === t.getTime());
      if (slot) slot.n++;
    });
    return out;
  }, [events]);
  const max = Math.max(1, ...days.map((d) => d.n));
  return (
    <Glass className="rounded-3xl p-5">
      <h3 className="text-[15px] font-semibold">Page views, last 30 days</h3>
      <div className="mt-6 flex h-40 items-end gap-1">
        {days.map((d, i) => (
          <motion.div
            key={i}
            title={`${d.d.toLocaleDateString('en-GB')}: ${d.n}`}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(2, (d.n / max) * 100)}%` }}
            transition={{ delay: i * 0.015, type: 'spring', stiffness: 120, damping: 20 }}
            className="flex-1 rounded-t bg-[linear-gradient(180deg,var(--color-blue),var(--color-indigo))]"
          />
        ))}
      </div>
    </Glass>
  );
}

/* ───────────────────────── Dashboard ───────────────────────── */
function Dashboard({ user }) {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState({ leads: [], events: [], subscribers: [], loading: true, error: null });
  const [openLead, setOpenLead] = useState(null);
  const dispatch = useAppDispatch();

  const load = async () => {
    setData((d) => ({ ...d, loading: true, error: null }));
    try {
      const [leads, events, subscribers] = await trackLoading(
        dispatch,
        Promise.all([fetchCollection('leads'), fetchCollection('events', 2000), fetchCollection('subscribers')]),
      );
      setData({ leads, events, subscribers, loading: false, error: null });
    } catch (err) {
      setData((d) => ({ ...d, loading: false, error: err.message }));
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load once on mount

  const views = data.events.filter((e) => e.type === 'page_view');
  const visitors = new Set(views.map((e) => e.visitorId)).size;

  const changeStatus = async (id, status) => {
    await updateLeadStatus(id, status);
    setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, status } : l)) }));
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(data.leads)], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sayemans-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const tabs = [
    ['overview', 'Overview'],
    ['leads', `Leads (${data.leads.length})`],
    ['subscribers', `Subscribers (${data.subscribers.length})`],
  ];

  return (
    <div className="relative isolate min-h-screen">
      <Aurora intensity={0.35} />
      <header className="sticky top-0 z-30 px-3 pt-3">
        <Glass className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pr-2 pl-4">
          <div className="flex items-center gap-3"><Logo /><span className="rounded-full bg-fg/10 px-2 py-0.5 text-[11px] font-semibold">ADMIN</span></div>
          <div className="flex items-center gap-1">
            <span className="hidden text-[13px] text-fg-subtle sm:inline">{user.email}</span>
            <ThemeToggle />
            <button onClick={load} className="grid size-9 place-items-center rounded-full hover:bg-fg/5" aria-label="Refresh"><Icon name="Workflow" size={16} /></button>
            <button onClick={async () => { await signOut(); dispatch(authActions.signedOut()); }} className="grid size-9 place-items-center rounded-full hover:bg-fg/5" aria-label="Sign out"><Icon name="LogOut" size={16} /></button>
          </div>
        </Glass>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <nav className="glass inline-flex rounded-full p-1" aria-label="Admin sections">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className="relative rounded-full px-4 py-2 text-[14px] font-medium">
              {tab === id && <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <span className={`relative ${tab === id ? 'text-bg' : 'text-fg-muted'}`}>{label}</span>
            </button>
          ))}
        </nav>

        {data.error && <p className="mt-6 rounded-2xl bg-pink/10 p-4 text-[14px] text-pink">Could not load data: {data.error}. Check that your account is listed in the Firestore <code>admins</code> collection.</p>}
        {data.loading && <p className="mt-6 flex items-center gap-2 text-fg-subtle"><Icon name="Loader2" className="animate-spin" size={16} /> Loading…</p>}

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8">
            {tab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <Kpi label="New leads" value={data.leads.filter((l) => l.status === 'new').length} icon="Inbox" tone="text-blue" />
                  <Kpi label="Total leads" value={data.leads.length} icon="Users" tone="text-purple" />
                  <Kpi label="Page views" value={views.length} icon="Eye" tone="text-green" />
                  <Kpi label="Unique visitors" value={visitors} icon="MousePointerClick" tone="text-orange" />
                </div>
                <DailyChart events={data.events} />
                <div className="grid gap-4 md:grid-cols-3">
                  <BarList title="Top pages" rows={countBy(views, (e) => e.path)} />
                  <BarList title="Referrers" rows={countBy(views, (e) => e.referrer)} />
                  <BarList title="Devices" rows={countBy(views, (e) => e.device?.type)} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <BarList title="Campaigns (utm_source)" rows={countBy(views, (e) => e.utm?.source)} />
                  <BarList title="Lead sources" rows={countBy(data.leads, (l) => l.source)} />
                </div>
                <p className="text-[12px] text-fg-subtle">Analytics include only visitors who accepted analytics cookies.</p>
              </div>
            )}

            {tab === 'leads' && (
              <div>
                <div className="mb-4 flex justify-end">
                  <button onClick={exportCsv} className="glass rounded-full px-4 py-2 text-[13px] font-medium">Export CSV</button>
                </div>
                <div className="space-y-3">
                  {data.leads.length === 0 && !data.loading && <p className="text-fg-subtle">No leads yet.</p>}
                  {data.leads.map((l) => (
                    <Glass key={l.id} interactive={false} className="rounded-3xl p-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <button onClick={() => setOpenLead(openLead === l.id ? null : l.id)} className="min-w-0 flex-1 text-left">
                          <p className="truncate font-semibold">{l.name} <span className="font-normal text-fg-subtle">· {l.company || 'no company'}</span></p>
                          <p className="truncate text-[13px] text-fg-subtle">{l.email} · {fmt(l.createdAt)}</p>
                        </button>
                        <select
                          value={l.status}
                          onChange={(e) => changeStatus(l.id, e.target.value)}
                          className={`rounded-full px-3 py-1.5 text-[12px] font-semibold capitalize outline-none ${statusTone[l.status] ?? ''}`}
                          aria-label="Lead status"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <AnimatePresence initial={false}>
                        {openLead === l.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <dl className="mt-4 grid gap-3 border-t border-line pt-4 text-[14px] sm:grid-cols-3">
                              <div><dt className="text-fg-subtle">Services</dt><dd>{l.services?.join(', ') || '—'}</dd></div>
                              <div><dt className="text-fg-subtle">Budget</dt><dd>{l.budget || '—'}</dd></div>
                              <div><dt className="text-fg-subtle">Timeline</dt><dd>{l.timeline || '—'}</dd></div>
                              <div><dt className="text-fg-subtle">Website</dt><dd className="truncate">{l.website || '—'}</dd></div>
                              <div><dt className="text-fg-subtle">Source</dt><dd>{l.source} {l.meta?.utm_source && `· ${l.meta.utm_source}`}</dd></div>
                              <div><dt className="text-fg-subtle">Landing</dt><dd>{l.meta?.landing || '—'}</dd></div>
                            </dl>
                            <p className="mt-4 whitespace-pre-wrap rounded-2xl bg-fg/[0.04] p-4 text-[15px] leading-relaxed">{l.message}</p>
                            <a href={`mailto:${l.email}?subject=Re: your inquiry with SAYEMANS`} className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-blue">
                              <Icon name="Mail" size={15} /> Reply by email
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Glass>
                  ))}
                </div>
              </div>
            )}

            {tab === 'subscribers' && (
              <Glass interactive={false} className="overflow-hidden rounded-3xl">
                <table className="w-full text-left text-[14px]">
                  <thead className="text-fg-subtle"><tr><th className="p-4 font-medium">Email</th><th className="p-4 font-medium">Source</th><th className="p-4 font-medium">Subscribed</th></tr></thead>
                  <tbody>
                    {data.subscribers.map((s) => (
                      <tr key={s.id} className="border-t border-line"><td className="p-4">{s.email}</td><td className="p-4 text-fg-muted">{s.source}</td><td className="p-4 text-fg-muted">{fmt(s.createdAt)}</td></tr>
                    ))}
                  </tbody>
                </table>
                {data.subscribers.length === 0 && <p className="p-4 text-fg-subtle">No subscribers yet.</p>}
              </Glass>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ───────────────────────── Gate ───────────────────────── */
export default function Admin() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  useLoading(auth.status !== 'ready');

  useEffect(() => {
    dispatch(authActions.pending());
    let unsub = () => {};
    watchAuth(({ user, isAdmin }) => {
      if (user) dispatch(authActions.signedIn({ user, isAdmin }));
      else dispatch(authActions.signedOut());
    }).then((u) => (unsub = u));
    return () => unsub();
  }, [dispatch]);

  if (auth.status !== 'ready') {
    return <div className="min-h-screen" aria-busy="true" />;
  }
  if (!auth.user) return <Login />;
  if (!auth.isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <Icon name="Lock" size={32} className="mx-auto text-fg-subtle" />
          <h1 className="mt-4 text-2xl font-semibold">No admin access</h1>
          <p className="mt-2 text-fg-muted">{auth.user.email} is signed in but not listed as an admin.</p>
          <button onClick={async () => { await signOut(); dispatch(authActions.signedOut()); }} className="mt-6 rounded-full bg-fg px-5 py-2.5 text-bg">Sign out</button>
        </div>
      </div>
    );
  }
  return <Dashboard user={auth.user} />;
}
