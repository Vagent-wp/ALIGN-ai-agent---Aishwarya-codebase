import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MarketingIllustrationFrame } from '@/components/marketing/MarketingIllustrationFrame';
import { CartoonAIProfessional, WorkflowDashboardMockup } from '@/components/marketing/illustrations/PastelCardVisuals';
import { pastelFeatureCards } from '@/lib/marketing/navContent';
import { cn } from '@/lib/utils';

const toneClasses = {
  peach: 'pastel-card-peach',
  sky: 'pastel-card-sky',
} as const;

function CardVisual({ type }: { type: 'cartoon-ai' | 'workflow-mockup' }) {
  if (type === 'cartoon-ai') {
    return <CartoonAIProfessional className="mx-auto h-auto w-full max-w-[280px]" />;
  }
  return <WorkflowDashboardMockup className="mx-auto h-auto w-full max-w-[280px]" />;
}

export function PastelFeatureCards() {
  return (
    <section className="marketing-section bg-background">
      <div className="marketing-container">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {pastelFeatureCards.map((card, index) => (
            <motion.article
              key={card.id}
              className={cn('rounded-3xl border p-6 sm:p-8', toneClasses[card.tone])}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(180px,46%)]">
                <div>
                  <h3 className="font-poppins text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{card.body}</p>
                  <a
                    href={card.ctaHref}
                    className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full border-2 border-primary bg-white/70 px-5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                <MarketingIllustrationFrame>
                  <CardVisual type={card.visual} />
                </MarketingIllustrationFrame>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
