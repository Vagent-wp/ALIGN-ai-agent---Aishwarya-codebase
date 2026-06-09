import { SectionHeading, SectionTitle } from '@/components/shared/SectionTitle';
import { BRAND } from '@/lib/brand';

const features = [
  {
    title: 'No more group scrolling',
    desc: 'Forget digging through hundreds of WhatsApp groups. Just describe what you need in plain language.',
  },
  {
    title: 'Intelligent discovery',
    desc: `${BRAND.assistant} searches ${BRAND.platform} semantically — finding matches by intent, not keywords.`,
  },
  {
    title: 'Always available',
    desc: `Reach ${BRAND.assistant} on WhatsApp anytime. She responds instantly and remembers your conversation context.`,
  },
];

export function AboutAishwaryaSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="page-shell">
        <SectionTitle>About {BRAND.assistant}</SectionTitle>
        <SectionHeading
          title={`The intelligent assistant of ${BRAND.platform}`}
          subtitle={`${BRAND.assistant} understands natural language, learns your requirements, and connects you with relevant people, opportunities, businesses, services, and experts.`}
        />

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {features.map(({ title, desc }) => (
            <div key={title} className="dashboard-panel animate-fade-in-up p-6">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
