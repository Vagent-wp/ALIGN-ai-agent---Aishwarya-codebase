import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LinearHeroMockup } from '@/components/marketing/linear/LinearHeroMockup';
import { productShowcaseItems } from '@/lib/marketing/stripeContent';

/** Stripe product showcase — 3-column cards with warm gradient wash + floating mockup */
export function StripeProductShowcase() {
  return (
    <section className="stripe-section" aria-labelledby="product-showcase-heading">
      <div className="stripe-section-header">
        <p className="stripe-eyebrow">Platform & products</p>
        <h2 id="product-showcase-heading" className="stripe-heading-gradient max-w-2xl">
          Intelligent systems built for scale
        </h2>
        <p className="stripe-body mt-4 max-w-xl">
          From AI matchmaking to custom enterprise platforms — product art that shows what we ship, not what we promise.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productShowcaseItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="stripe-product-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stripe-product-card-mockup">
                <LinearHeroMockup className="!shadow-none !rounded-none border-0" />
              </div>
              <h3 className="stripe-product-card-title">{item.title}</h3>
              <p className="stripe-product-card-body">{item.body}</p>
              <Link
                to={item.href}
                className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-normal text-[#533afd] transition-colors hover:text-[#061b31]"
              >
                {item.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
