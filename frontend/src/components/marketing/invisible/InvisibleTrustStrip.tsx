import { trustLogos } from '@/lib/marketing/invisibleContent';

const MARQUEE_DURATION = '38s';

function MarqueeTrack({ items, ariaHidden }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <div
      className="inv-trust-marquee-track flex shrink-0 items-center gap-10 px-5 sm:gap-14 sm:px-8"
      aria-hidden={ariaHidden}
    >
      {items.map((name) => (
        <span key={name} className="inv-trust-marquee-item">
          {name}
        </span>
      ))}
    </div>
  );
}

export function InvisibleTrustStrip() {
  const items = trustLogos;

  return (
    <section className="inv-trust-strip border-b border-[var(--color-ash)] py-8" aria-label="Industries served">
      <div className="inv-trust-marquee relative overflow-hidden">
        <div
          className="inv-trust-marquee-inner flex w-max"
          style={{ ['--duration' as string]: MARQUEE_DURATION }}
        >
          <MarqueeTrack items={items} />
          <MarqueeTrack items={items} ariaHidden />
        </div>
      </div>
    </section>
  );
}
