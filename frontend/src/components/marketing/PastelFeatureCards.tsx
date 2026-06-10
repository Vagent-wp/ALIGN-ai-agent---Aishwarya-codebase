import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LinearHeroMockup } from '@/components/marketing/linear/LinearHeroMockup';
import { pastelFeatureCards } from '@/lib/marketing/navContent';
import { cn } from '@/lib/utils';

export function PastelFeatureCards() {
  return (
    <section className="marketing-section bg-[#08090a]">
      <div className="marketing-container space-y-[100px] px-6">
        {pastelFeatureCards.map((card, index) => {
          const reversed = index % 2 === 1;
          return (
            <motion.article
              key={card.id}
              className={cn(
                'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
                reversed && 'lg:[&>*:first-child]:order-2'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <p className="linear-mono text-[#5e6ad2]">FEATURE · {String(index + 1).padStart(2, '0')}</p>
                <h3 className="linear-heading-lg mt-4">{card.title}</h3>
                <p className="linear-body-lg mt-4">{card.body}</p>
                <Link
                  to={card.ctaHref}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-[510] text-[#d0d6e0] transition-colors hover:text-[#f7f8f8]"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className={reversed ? 'lg:order-1' : ''}>
                <LinearHeroMockup />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
