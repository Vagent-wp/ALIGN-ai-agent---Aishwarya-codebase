import { marqueeIndustries } from '@/lib/marketing/content';

export function TrustMarquee() {
  const items = [...marqueeIndustries, ...marqueeIndustries];

  return (
    <section className="py-12">
      <div className="marketing-container px-6">
        <div className="linear-logo-strip flex flex-wrap items-center justify-center gap-x-[60px] gap-y-4">
          {items.slice(0, marqueeIndustries.length).map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
