import { SectionHeading, SectionTitle } from '@/components/shared/SectionTitle';

const steps = [
  { step: '01', title: 'Message Aishwarya', desc: 'Start a conversation on WhatsApp. No app download required.' },
  { step: '02', title: 'Describe your need', desc: 'Tell her naturally — "I need a UI designer for my fintech startup" works perfectly.' },
  { step: '03', title: 'Get matched', desc: 'Aishwarya searches the ecosystem and presents the best matches.' },
  { step: '04', title: 'Connect & grow', desc: 'Choose who to connect with. Build relationships that matter.' },
];

export function HowItWorksSection() {
  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="page-shell">
        <SectionTitle>How It Works</SectionTitle>
        <SectionHeading title="Four simple steps" subtitle="From requirement to connection in minutes." />

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="dashboard-panel relative p-5 md:p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{step}</span>
              <h3 className="mt-2 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
