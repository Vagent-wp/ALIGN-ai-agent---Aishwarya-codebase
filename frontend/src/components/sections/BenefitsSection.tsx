import { SectionHeading, SectionTitle } from '@/components/shared/SectionTitle';
import { BRAND } from '@/lib/brand';

const benefits = [
  { title: 'Save hours every week', desc: 'Stop scrolling through groups. Get matched in minutes, not days.' },
  { title: 'Precision matching', desc: 'AI understands intent — not just keywords — for better connections.' },
  { title: 'Ecosystem-wide reach', desc: 'Access founders, agencies, mentors, investors, and service providers in one place.' },
  { title: 'Grow your network', desc: 'Every conversation builds your profile and unlocks more opportunities.' },
];

export function BenefitsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="page-shell">
        <SectionTitle>Benefits</SectionTitle>
        <SectionHeading title={`Why ${BRAND.platform}`} />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {benefits.map(({ title, desc }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
