import PageHero from '@/components/sections/PageHero';
import ProcessSticky from '@/components/sections/ProcessSticky';
import FeatureGrid from '@/components/sections/FeatureGrid';
import CTASection from '@/components/sections/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';

const rituals = [
  { icon: 'Calendar', title: 'Weekly demos', text: 'See real progress every week on a live staging environment.' },
  { icon: 'Workflow', title: 'Shared roadmap', text: 'One board with priorities, estimates and status. Always up to date.' },
  { icon: 'Users', title: 'Direct access', text: 'Talk directly to the designers and engineers building your product.' },
  { icon: 'ShieldCheck', title: 'Quality gates', text: 'Code review, automated tests, accessibility and performance checks on every release.' },
  { icon: 'Lock', title: 'Security & GDPR', text: 'Secure defaults, least-privilege access and a DPA (verwerkersovereenkomst) as standard.' },
  { icon: 'LineChart', title: 'Measured outcomes', text: 'We agree on KPIs up front and report against them after launch.' },
];

export default function Process() {
  return (
    <>
      <PageHero eyebrow="Process" title="Clarity at every step." intro="A proven six-phase process that de-risks your investment and keeps momentum high from kickoff to growth." />
      <ProcessSticky cta={false} />
      <section className="container-x py-24">
        <SectionHeader eyebrow="Ways of working" title="How collaboration feels." />
        <div className="mt-14"><FeatureGrid items={rituals} /></div>
      </section>
      <CTASection />
    </>
  );
}
