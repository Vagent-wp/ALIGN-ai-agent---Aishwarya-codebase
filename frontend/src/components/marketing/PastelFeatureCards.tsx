import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { AlignVisual } from '@/components/marketing/illustrations/AlignVisual';
import { pastelFeatureCards } from '@/lib/marketing/navContent';
import type { AlignVisualId } from '@/components/marketing/illustrations/AlignVisual';
import { captureCardClass } from '@/lib/marketing/capturePalette';
import { cn } from '@/lib/utils';

const featureIcons = [Sparkles, Layers];

export function PastelFeatureCards() {
  return (
    <section className="marketing-section align-band-white">
      <div className="marketing-container space-y-8 px-6">
        {pastelFeatureCards.map((card, index) => {
          const reversed = index % 2 === 1;
          const Icon = featureIcons[index % featureIcons.length] ?? Sparkles;
          return (
            <motion.article
              key={card.id}
              className={cn(
                'align-capture-card grid items-center gap-10 lg:grid-cols-2 lg:gap-14',
                captureCardClass(card.tone),
                reversed && 'lg:[&>*:first-child]:order-2'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="align-capture-icon">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="linear-mono mt-5 text-[var(--color-indigo)]">
                  FEATURE · {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="linear-heading-lg mt-3">{card.title}</h3>
                <p className="linear-body-lg mt-4">{card.body}</p>
                <Link
                  to={card.ctaHref}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-[510] text-[var(--color-mist)] transition-colors hover:text-[var(--color-snow)]"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className={reversed ? 'lg:order-1' : ''}>
                <AlignVisual visual={card.visual as AlignVisualId} />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
