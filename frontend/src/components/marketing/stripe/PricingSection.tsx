import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pricingTiers } from '@/lib/marketing/stripeContent';

/** Stripe-style pricing — flat cards, iris featured tier, 4px radius */
export function PricingSection() {
  return (
    <section className="stripe-section" aria-labelledby="pricing-heading">
      <div className="stripe-section-header">
        <p className="stripe-eyebrow">Pricing</p>
        <h2 id="pricing-heading" className="stripe-heading-gradient max-w-xl">
          Start free. Scale on your terms.
        </h2>
        <p className="stripe-body mt-4 max-w-lg">
          Join the network at no cost, or engage us for custom AI systems and enterprise partnerships.
        </p>

        <div className="stripe-pricing-grid mt-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={cn('stripe-pricing-card', tier.featured && 'stripe-pricing-card-featured')}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <p className="stripe-pricing-tier">{tier.name}</p>
              <p className="stripe-pricing-price">
                {tier.price}
                <span className="stripe-pricing-period"> / {tier.period}</span>
              </p>
              <p className="stripe-body-sm mt-3">{tier.description}</p>

              <ul className="stripe-pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature} className="stripe-pricing-feature">
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={tier.href}
                className={cn(
                  'mt-6 w-full text-center',
                  tier.featured ? 'stripe-btn-primary' : 'stripe-btn-secondary'
                )}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
