import { useState } from 'react';
import { Link } from 'react-router';
import { footerNav } from '@/config/navigation';
import { company, formatAddress } from '@/config/company';
import { subscribe } from '@/services/leads';
import { useAppDispatch } from '@/store';
import { reopenConsent, } from '@/store/slices/consent';
import { showToast } from '@/store/slices/ui';
import Logo from './Logo';
import Icon from '../ui/Icon';
import Glass from '../ui/Glass';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const dispatch = useAppDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setState('loading');
    try {
      await subscribe(email);
      setState('done');
      setEmail('');
      dispatch(showToast({ message: 'You’re subscribed. Welcome aboard!', tone: 'success' }));
    } catch {
      setState('idle');
      dispatch(showToast({ message: 'Something went wrong. Please try again.', tone: 'error' }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <label htmlFor="newsletter" className="mb-3 block text-sm font-medium">Studio notes, monthly</label>
      <Glass interactive={false} className="flex items-center gap-1 rounded-full p-1 pl-4">
        <input
          id="newsletter"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
        />
        <button disabled={state === 'loading'} className="h-9 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50">
          {state === 'done' ? 'Subscribed' : 'Subscribe'}
        </button>
      </Glass>
      <p className="mt-2 text-xs text-fg-subtle">No spam. Unsubscribe anytime. See our <Link to="/privacy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}

export default function Footer() {
  const dispatch = useAppDispatch();
  const year = new Date().getFullYear();
  const address = formatAddress();

  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-x py-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm space-y-6">
            <Logo />
            <p className="text-[15px] leading-relaxed text-fg-muted">{company.description}</p>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 text-[15px] font-medium hover:text-blue">
              <Icon name="Mail" size={16} /> {company.email}
            </a>
            <div className="flex gap-2">
              {company.socials.linkedin && (
                <a href={company.socials.linkedin} aria-label="LinkedIn" className="glass grid size-10 place-items-center rounded-full" target="_blank" rel="noopener noreferrer"><Icon name="Linkedin" size={16} /></a>
              )}
              {company.socials.instagram && (
                <a href={company.socials.instagram} aria-label="Instagram" className="glass grid size-10 place-items-center rounded-full" target="_blank" rel="noopener noreferrer"><Icon name="Instagram" size={16} /></a>
              )}
            </div>
          </div>
          <Newsletter />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">{col.title}</h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[14px] text-fg-muted transition-colors hover:text-fg">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-fg-subtle md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {year} {company.legalName}. All rights reserved.</span>
            {company.kvk && <span>KvK {company.kvk}</span>}
            {company.vat && <span>BTW {company.vat}</span>}
            {address && <span>{address}</span>}
          </p>
          <button onClick={() => dispatch(reopenConsent())} className="text-left hover:text-fg">Cookie settings</button>
        </div>
      </div>
    </footer>
  );
}
