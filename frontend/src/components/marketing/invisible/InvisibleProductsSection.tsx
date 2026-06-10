import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { RichMockupStage } from '@/components/marketing/invisible/RichMockupStage';
import { KayaWhatsAppAnimatedMockup } from '@/components/marketing/mockups/KayaWhatsAppAnimatedMockup';
import { flagshipProducts } from '@/lib/marketing/content';
import { kayaShowcaseScenarios } from '@/lib/marketing/kayaShowcaseContent';
import { cn } from '@/lib/utils';

function ProductCard({
  children,
  tone,
}: {
  children: ReactNode;
  tone: 'sky' | 'peach';
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'inv-feature-band inv-grid-card flex h-full flex-col !p-4 sm:!p-6',
        tone === 'sky' ? 'inv-feature-band--sky' : 'inv-feature-band--peach'
      )}
    >
      {children}
    </motion.article>
  );
}

export function InvisibleProductsSection() {
  const network = flagshipProducts[0];
  const kaya = flagshipProducts[1];
  const kayaScenario = kayaShowcaseScenarios[0]!;

  return (
    <section id="products" className="inv-section scroll-mt-24 border-t border-[var(--color-ash)]">
      <div className="inv-container">
        <InvLabel>Flagship products</InvLabel>
        <TwoToneHeadline
          className="mt-4"
          primary="The ALIGN ecosystem"
          secondary="connected end to end."
        />

        <div className="mt-10 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:mt-16 sm:gap-4 lg:gap-6">
          {network && (
            <ProductCard tone="sky">
              <div className="inv-spotlight-mock shrink-0 overflow-hidden rounded-2xl">
                <RichMockupStage
                  mockupId="network-dashboard"
                  variant="teal"
                  tilt
                  className="!h-full !min-h-0 !p-2 sm:!p-4"
                />
              </div>
              <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-4">
                <h3 className="inv-heading-lg line-clamp-2 !text-[clamp(0.95rem,2.5vw,1.5rem)]">
                  {network.title}
                </h3>
                <p className="inv-body-sm mt-2 text-[13px] sm:text-base">{network.subtitle}</p>
                <p className="inv-label mt-3 !text-[10px] sm:mt-4 sm:!text-[11px]">Connects</p>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {network.connects?.slice(0, 6).map((item) => (
                    <span key={item} className="inv-pill-badge !text-[10px] sm:!text-[11px]">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  to="/onboarding"
                  className="inv-btn-outline-blue mt-3 inline-flex self-start text-[11px] sm:mt-4 sm:text-sm lg:mt-auto"
                >
                  Explore network
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </ProductCard>
          )}

          {kaya && (
            <ProductCard tone="peach">
              <div className="inv-spotlight-mock inv-product-kaya-mock shrink-0 overflow-hidden rounded-2xl bg-white">
                <KayaWhatsAppAnimatedMockup
                  scenarioKey={kayaScenario.id}
                  messages={kayaScenario.messages}
                  compact
                />
              </div>
              <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-4">
                <h3 className="inv-heading-lg line-clamp-2 !text-[clamp(0.95rem,2.5vw,1.5rem)]">
                  {kaya.title}
                </h3>
                <p className="inv-body-sm mt-2 text-[13px] sm:text-base">{kaya.subtitle}</p>
                <ul className="mt-3 flex flex-col gap-1 sm:mt-4 sm:gap-1.5">
                  {kaya.capabilities?.map((cap) => (
                    <li
                      key={cap}
                      className="inv-body-sm text-[11px] before:mr-1.5 before:text-[var(--color-align-orange)] before:content-['·'] sm:text-[13px]"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
                {kaya.example && (
                  <div className="inv-card mt-3 !border-[var(--color-align-blue)]/20 !bg-white !p-3 sm:mt-4 sm:!p-4">
                    <p className="inv-body-sm text-[11px] sm:text-[13px]">
                      <span className="font-medium text-[var(--color-carbon-ink)]">You:</span>{' '}
                      {kaya.example.user}
                    </p>
                    <p className="inv-body-sm mt-1.5 text-[11px] sm:mt-2 sm:text-[13px]">
                      <span className="font-medium inv-accent-blue">{kaya.title}:</span>{' '}
                      {kaya.example.assistant}
                    </p>
                  </div>
                )}
              </div>
            </ProductCard>
          )}
        </div>
      </div>
    </section>
  );
}
