import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { RichMockupStage } from '@/components/marketing/invisible/RichMockupStage';
import { KayaWhatsAppAnimatedMockup } from '@/components/marketing/mockups/KayaWhatsAppAnimatedMockup';
import { flagshipProducts } from '@/lib/marketing/content';
import { kayaShowcaseScenarios } from '@/lib/marketing/kayaShowcaseContent';

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

        <div className="mt-16 space-y-10">
          {network && (
            <article className="inv-feature-band inv-feature-band--sky">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <h3 className="inv-heading-lg !text-[clamp(1.375rem,2.5vw,1.875rem)]">
                    {network.title}
                  </h3>
                  <p className="inv-body mt-3">{network.subtitle}</p>
                  <p className="inv-label mt-6 !text-[11px]">Connects</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {network.connects?.slice(0, 6).map((item) => (
                      <span key={item} className="inv-pill-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link to="/onboarding" className="inv-btn-outline-blue mt-6 inline-flex">
                    Explore network
                    <span aria-hidden>→</span>
                  </Link>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <RichMockupStage mockupId="network-dashboard" variant="teal" tilt />
                </motion.div>
              </div>
            </article>
          )}

          {kaya && (
            <article className="inv-feature-band inv-feature-band--peach">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <motion.div
                  className="order-2 lg:order-1"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <div className="mx-auto max-w-[380px] rounded-2xl border border-[var(--color-ash)] bg-white p-4 shadow-sm">
                    <KayaWhatsAppAnimatedMockup
                      scenarioKey={kayaScenario.id}
                      messages={kayaScenario.messages}
                    />
                  </div>
                </motion.div>
                <div className="order-1 lg:order-2">
                  <h3 className="inv-heading-lg !text-[clamp(1.375rem,2.5vw,1.875rem)]">
                    {kaya.title}
                  </h3>
                  <p className="inv-body mt-3">{kaya.subtitle}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {kaya.capabilities?.map((cap) => (
                      <li
                        key={cap}
                        className="inv-body-sm before:mr-2 before:text-[var(--color-align-orange)] before:content-['·']"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                  {kaya.example && (
                    <div className="inv-card mt-6 !border-[var(--color-align-blue)]/20 !bg-white !p-4">
                      <p className="inv-body-sm">
                        <span className="font-medium text-[var(--color-carbon-ink)]">You:</span>{' '}
                        {kaya.example.user}
                      </p>
                      <p className="inv-body-sm mt-2">
                        <span className="font-medium inv-accent-blue">{kaya.title}:</span>{' '}
                        {kaya.example.assistant}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
