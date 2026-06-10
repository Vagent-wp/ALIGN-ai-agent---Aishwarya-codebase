import { marqueeIndustries } from '@/lib/marketing/content';

export function TrustMarquee() {
  const items = [...marqueeIndustries, ...marqueeIndustries];

  return (
    <section className="border-y border-border/60 bg-muted/40 py-6">
      <div className="marketing-container">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Industries we serve
        </p>
        <div className="marquee-fade overflow-hidden">
          <div className="marquee-track gap-12">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-poppins text-sm font-semibold text-foreground/70 sm:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
