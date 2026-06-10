import { enterpriseTrustLogos } from '@/lib/marketing/stripeContent';

/** Stripe-style enterprise trust band — grayscale logos, no chrome */
export function EnterpriseTrustSection() {
  return (
    <section className="stripe-section py-16 md:py-20" aria-label="Industries and enterprises we serve">
      <div className="stripe-section-header">
        <p className="stripe-eyebrow text-center">Trusted across industries</p>
        <div className="stripe-trust-strip mt-8">
          {enterpriseTrustLogos.map((name) => (
            <span key={name} className="stripe-trust-logo">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
