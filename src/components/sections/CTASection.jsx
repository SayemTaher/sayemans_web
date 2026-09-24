import { company } from '@/config/company';
import Aurora from '../ui/Aurora';
import Button from '../ui/Button';
import Glass from '../ui/Glass';
import { Reveal, RevealText } from '../ui/Reveal';

export default function CTASection({ title = 'Let’s build what’s next.', text }) {
  return (
    <section className="container-x py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[40px]">
          <Aurora intensity={1.2} />
          <Glass interactive className="relative flex flex-col items-center rounded-[40px] px-6 py-20 text-center sm:py-28">
            <RevealText text={title} className="max-w-3xl text-headline font-semibold text-chrome" />
            <p className="mt-6 max-w-xl text-lg text-fg-muted">
              {text ?? `Tell us about your idea or challenge. We reply ${company.responseTime} with honest advice and clear next steps.`}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" variant="primary">Start a project</Button>
              <Button href={`mailto:${company.email}`} size="lg" variant="glass" icon="Mail" iconRight={null}>{company.email}</Button>
            </div>
          </Glass>
        </div>
      </Reveal>
    </section>
  );
}
