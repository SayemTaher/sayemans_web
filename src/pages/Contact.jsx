import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '@/components/sections/PageHero';
import Glass from '@/components/ui/Glass';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';
import { company } from '@/config/company';
import { submitLead } from '@/services/leads';
import { track } from '@/services/analytics';

const serviceOptions = [...services.map((s) => ({ id: s.slug, label: s.title })), { id: 'venture', label: 'Venture / co-build' }];
const budgets = ['< €5k', '€5k–15k', '€15k–40k', '€40k–100k', '€100k+', 'Not sure yet'];
const timelines = ['ASAP', '1–3 months', '3–6 months', 'Flexible'];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${
        active ? 'border-transparent bg-fg text-bg shadow-md' : 'border-line text-fg-muted hover:border-fg/30 hover:text-fg'
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, id, error, ...props }) {
  const Tag = props.rows ? 'textarea' : 'input';
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-2xl border bg-bg-elevated/60 px-4 py-3 text-[16px] outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-blue focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-blue)_18%,transparent)] ${
          error ? 'border-pink' : 'border-line'
        }`}
        {...props}
      />
      {error && <p id={`${id}-err`} className="mt-1.5 text-[13px] text-pink">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const preService = params.get('service');
  const plan = params.get('plan');

  const [form, setForm] = useState({
    name: '', email: '', company: '', website: '',
    services: preService ? [preService] : [],
    budget: '', timeline: '',
    message: plan ? `I’m interested in the “${plan}” plan. ` : '',
    consent: false, hp: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const toggleService = (id) =>
    setForm((f) => ({ ...f, services: f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id] }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) e.message = 'A few more words about your project, please (min. 10 characters).';
    if (!form.consent) e.consent = 'Please agree so we can reply to you.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.hp) return setStatus('sent'); // honeypot: bots get a fake success
    if (!validate()) return;
    setStatus('sending');
    try {
      await submitLead({ ...form, source: plan ? `pricing:${plan}` : 'contact' });
      track('lead_submitted', { services: form.services.join(','), budget: form.budget }, 'generate_lead');
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us about your idea." intro={`Tell us about your product. We reply ${company.responseTime}, usually with a few smart questions and an invite for a free intro call.`} />

      <section className="container-x grid gap-8 pb-16 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Glass interactive={false} className="rounded-[36px] p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-green text-white shadow-[0_20px_50px_-15px_var(--color-green)]"
                  >
                    <Icon name="Check" size={36} strokeWidth={2.5} />
                  </motion.span>
                  <h2 className="mt-8 text-3xl font-semibold tracking-tight">Thank you, {form.name.split(' ')[0]}.</h2>
                  <p className="mt-3 max-w-md text-fg-muted">We received your message and will get back to you at <strong className="text-fg">{form.email}</strong> {company.responseTime}.</p>
                  <div className="mt-8"><Button to="/products/taalmeester" variant="glass">Meanwhile, see TaalMeester</Button></div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }} className="space-y-8">
                  <fieldset>
                    <legend className="mb-3 text-[14px] font-medium">What can we help with?</legend>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((s) => (
                        <Chip key={s.id} active={form.services.includes(s.id)} onClick={() => toggleService(s.id)}>{s.label}</Chip>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Your name *" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} placeholder="Jane de Vries" />
                    <Field id="email" type="email" label="Work email *" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="jane@company.com" />
                    <Field id="company" label="Company" autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Company B.V." />
                    <Field id="website" label="Website" type="url" autoComplete="url" value={form.website} onChange={set('website')} placeholder="https://" />
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-[14px] font-medium">Estimated budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <Chip key={b} active={form.budget === b} onClick={() => setForm((f) => ({ ...f, budget: f.budget === b ? '' : b }))}>{b}</Chip>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-[14px] font-medium">Timeline</legend>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <Chip key={t} active={form.timeline === t} onClick={() => setForm((f) => ({ ...f, timeline: f.timeline === t ? '' : t }))}>{t}</Chip>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="message" label="Tell us about your project *" rows={5} value={form.message} onChange={set('message')} error={errors.message} placeholder="Goals, audience, current situation, deadlines…" />

                  {/* Honeypot: hidden from humans */}
                  <input type="text" name="company_url" tabIndex={-1} autoComplete="off" value={form.hp} onChange={set('hp')} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

                  <div>
                    <label className="flex items-start gap-3 text-[14px] text-fg-muted">
                      <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 size-4 accent-blue" />
                      <span>
                        I agree that SAYEMANS stores my details to respond to this inquiry, as described in the{' '}
                        <Link to="/privacy" className="text-blue underline-offset-4 hover:underline">privacy policy</Link>.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1.5 text-[13px] text-pink">{errors.consent}</p>}
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-2xl bg-pink/10 p-4 text-[14px] text-pink">
                      Something went wrong sending your message. Please try again or email us at {company.email}.
                    </p>
                  )}

                  <Button type="submit" size="lg" variant="accent" className="w-full sm:w-auto" disabled={status === 'sending'} iconRight={status === 'sending' ? null : 'ArrowRight'}>
                    {status === 'sending' ? 'Sending…' : 'Send inquiry'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Glass>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <Glass className="rounded-[32px] p-7">
              <Icon name="Mail" size={22} className="text-blue" />
              <h2 className="mt-4 text-lg font-semibold">Email us directly</h2>
              <a href={`mailto:${company.email}`} className="mt-1 block text-fg-muted hover:text-blue">{company.email}</a>
            </Glass>
          </Reveal>
          <Reveal delay={0.15}>
            <Glass className="rounded-[32px] p-7">
              <Icon name="Clock" size={22} className="text-purple" />
              <h2 className="mt-4 text-lg font-semibold">What happens next</h2>
              <ol className="mt-3 space-y-2 text-[15px] text-fg-muted">
                <li>1. We reply {company.responseTime}.</li>
                <li>2. Free 30-minute intro call.</li>
                <li>3. Fixed proposal within 3 business days.</li>
              </ol>
            </Glass>
          </Reveal>
          <Reveal delay={0.2}>
            <Glass className="rounded-[32px] p-7">
              <Icon name="MapPin" size={22} className="text-pink" />
              <h2 className="mt-4 text-lg font-semibold">Based in Eindhoven</h2>
              <p className="mt-1 text-[15px] text-fg-muted">From Brainport Eindhoven we work remote-first with clients across the Netherlands and the EU. We speak English and Dutch.</p>
            </Glass>
          </Reveal>
        </div>
      </section>
    </>
  );
}
