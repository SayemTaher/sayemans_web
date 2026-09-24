import LegalLayout from './LegalLayout';
import { useAppDispatch } from '@/store';
import { reopenConsent } from '@/store/slices/consent';

const rows = [
  ['sayemans:theme', 'Essential', 'Remembers your light/dark preference', 'Persistent (localStorage)'],
  ['sayemans:consent', 'Essential', 'Stores your cookie choices', 'Persistent (localStorage)'],
  ['sayemans:sid', 'Analytics (consent)', 'Pseudonymous session identifier', 'Session'],
  ['sayemans:vid', 'Analytics (consent)', 'Pseudonymous visitor identifier', 'Persistent (localStorage)'],
  ['_ga, _ga_*', 'Analytics (consent)', 'Google Analytics 4 via Firebase', 'Up to 14 months'],
];

export default function Cookies() {
  const dispatch = useAppDispatch();
  return (
    <LegalLayout title="Cookie Policy" updated="24 September 2026">
      <p>
        We use a minimal set of cookies and similar technologies (such as localStorage). Non-essential analytics only run after you give consent, in line with
        the GDPR and the Dutch Telecommunicatiewet.
      </p>
      <h2>Overview</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead className="text-fg-subtle">
            <tr>{['Name', 'Type', 'Purpose', 'Duration'].map((h) => <th key={h} className="border-b border-line py-3 pr-4 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>{r.map((c, i) => <td key={i} className="border-b border-line py-3 pr-4 text-fg-muted">{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Manage your preferences</h2>
      <p>You can change your choice at any time.</p>
      <button onClick={() => dispatch(reopenConsent())} className="rounded-full bg-fg px-5 py-2.5 text-[15px] font-medium text-bg">Open cookie settings</button>
    </LegalLayout>
  );
}
