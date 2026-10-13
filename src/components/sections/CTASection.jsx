import { useRef } from 'react';
import { company } from '@/config/company';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import FloatingShapes from '../ui/Shapes';
import { Reveal, RevealText } from '../ui/Reveal';

const shapes = [
  { shape: 'star', className: 'top-[12%] left-[7%]', size: 70, rot: -10, depth: 1.2 },
  { shape: 'ring', className: '-bottom-6 right-[6%]', size: 130, depth: 0.7, colors: { a: '#f4ffd0', b: '#a3d417' } },
  { shape: 'ball', className: 'top-[16%] right-[16%] hidden sm:block', size: 44, depth: 1.4, colors: { a: '#ffffff', b: '#ddd0ff' } },
  { shape: 'bolt', className: 'bottom-[14%] left-[14%] hidden md:block', size: 40, rot: 16, depth: 1 },
];

export default function CTASection({ title = 'Have an idea? Let’s *talk*.', text }) {
  const ref = useRef(null);
  return (
    <section ref={ref} className="container-x py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[40px] bg-[#2b39ff] px-6 py-20 text-center text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),inset_0_-6px_0_rgb(0_0_0/0.18),0_40px_80px_-40px_rgb(43_57_255/0.8)] sm:rounded-[56px] sm:py-28">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.2px)] [background-size:22px_22px]" />
          <FloatingShapes items={shapes} target={ref} />
          <div className="flex flex-col items-center">
            <RevealText text={title} className="max-w-3xl font-display text-headline font-extrabold [&_.serif-accent]:text-lime" />
            <p className="mt-6 max-w-xl text-lg text-white/80">
              {text ?? `Tell us about your idea or challenge. We reply ${company.responseTime} with honest advice and clear next steps.`}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" variant="lime">Start a project</Button>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 px-8 text-[17px] font-medium text-white transition-colors hover:bg-white/10"
              >
                <Icon name="Mail" size={18} />
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
