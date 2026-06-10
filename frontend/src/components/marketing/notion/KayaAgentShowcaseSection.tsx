import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { InvLabel, SideTab } from '@/components/marketing/invisible/Editorial';
import { KayaWhatsAppAnimatedMockup } from '@/components/marketing/mockups/KayaWhatsAppAnimatedMockup';
import { useAutoCycle } from '@/hooks/useAutoCycle';
import { BRAND } from '@/lib/brand';
import { kayaShowcaseScenarios, KAYA_TAB_CYCLE_MS } from '@/lib/marketing/kayaShowcaseContent';

/** Auto-cycling Kaya WhatsApp showcase — editorial layout with live chat animation */
export function KayaAgentShowcaseSection() {
  const { activeIndex, progress, goTo, pauseHandlers } = useAutoCycle(
    kayaShowcaseScenarios.length,
    KAYA_TAB_CYCLE_MS
  );
  const active = kayaShowcaseScenarios[activeIndex]!;

  return (
    <section
      id="kaya"
      className="inv-section scroll-mt-24 bg-[var(--color-ice-blue)]/50"
      aria-labelledby="kaya-showcase-heading"
      {...pauseHandlers}
    >
      <div className="inv-container">
        <InvLabel>WhatsApp-native AI</InvLabel>
        <h2 id="kaya-showcase-heading" className="inv-heading-lg mt-4 max-w-2xl">
          Keep conversations moving{' '}
          <span className="text-[var(--color-slate)]">24/7.</span>
        </h2>

        <div className="mt-10 grid items-start gap-8 sm:mt-14 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-16 xl:grid-cols-2">
          <motion.div
            className="order-1 mx-auto w-full max-w-[380px] lg:order-2 lg:mx-0 lg:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inv-card !p-4">
              <KayaWhatsAppAnimatedMockup
                key={active.id}
                scenarioKey={active.id}
                messages={active.messages}
              />
            </div>
          </motion.div>

          <div className="order-2 lg:order-1">
            <div role="tablist" aria-label={`${BRAND.assistant} agent capabilities`}>
              {kayaShowcaseScenarios.map((scenario, index) => (
                <SideTab
                  key={scenario.id}
                  label={scenario.tab}
                  isActive={index === activeIndex}
                  progress={index === activeIndex ? progress : 0}
                  onSelect={() => goTo(index)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 max-w-lg"
              >
                <h3 className="inv-heading">{active.headline}</h3>
                <p className="inv-body mt-3">{active.description}</p>
                <Link to="/onboarding" className="inv-link mt-6 inline-flex">
                  Chat with {BRAND.assistant} on WhatsApp
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
