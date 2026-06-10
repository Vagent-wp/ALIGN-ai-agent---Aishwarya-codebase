import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { InvLabel, SideTab } from '@/components/marketing/invisible/Editorial';
import { RichMockupStage } from '@/components/marketing/invisible/RichMockupStage';
import { useAutoCycle } from '@/hooks/useAutoCycle';
import {
  networkShowcaseItems,
  NETWORK_CYCLE_MS,
} from '@/lib/marketing/invisibleContent';

/** Auto-cycling network discovery with rich AI search mockup */
export function InvisibleNetworkShowcase() {
  const { activeIndex, progress, goTo, pauseHandlers } = useAutoCycle(
    networkShowcaseItems.length,
    NETWORK_CYCLE_MS
  );
  const active = networkShowcaseItems[activeIndex]!;

  return (
    <section
      className="inv-section scroll-mt-24 bg-[var(--color-align-lavender)]/30"
      aria-labelledby="network-heading"
      {...pauseHandlers}
    >
      <div className="inv-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <InvLabel>Discovery</InvLabel>
            <h2 id="network-heading" className="inv-heading-lg mt-4">
              Find the right people{' '}
              <span className="inv-accent-orange">in plain language.</span>
            </h2>

            <div className="mt-10" role="tablist" aria-label="Network segments">
              {networkShowcaseItems.map((item, index) => (
                <SideTab
                  key={item.id}
                  label={item.tab}
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
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <div className="inv-card !border-[var(--color-align-blue)]/15 !bg-white">
                  <p className="font-[family-name:var(--font-apkpraktikal)] text-[11px] uppercase tracking-wider text-[var(--color-slate)]">
                    Live query
                  </p>
                  <p className="inv-body-sm mt-2 font-medium text-[var(--color-carbon-ink)]">
                    "{active.query}"
                  </p>
                  <div className="mt-4 space-y-2">
                    {active.results.map((result) => (
                      <div
                        key={result.name}
                        className="flex items-center justify-between gap-3 rounded-lg bg-[var(--color-align-sky)]/60 px-3 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-medium text-[var(--color-carbon-ink)]">
                            {result.name}
                          </p>
                          <p className="text-xs text-[var(--color-iron)]">{result.meta}</p>
                        </div>
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-align-orange)]" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <Link to="/onboarding" className="inv-btn-outline-blue mt-8 inline-flex">
              Join the network
              <span aria-hidden>→</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <RichMockupStage mockupId="ai-search" variant="blue" tilt />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
