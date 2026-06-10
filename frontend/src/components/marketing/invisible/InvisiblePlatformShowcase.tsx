import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { RichMockupStage } from '@/components/marketing/invisible/RichMockupStage';
import { useAutoCycle } from '@/hooks/useAutoCycle';
import {
  platformShowcaseItems,
  PLATFORM_CYCLE_MS,
} from '@/lib/marketing/invisibleContent';

/** Together.ai-style platform tabs with rich product mockup previews */
export function InvisiblePlatformShowcase() {
  const { activeIndex, progress, goTo, pauseHandlers } = useAutoCycle(
    platformShowcaseItems.length,
    PLATFORM_CYCLE_MS
  );
  const active = platformShowcaseItems[activeIndex]!;

  return (
    <section
      id="platform"
      className="inv-section scroll-mt-24"
      aria-labelledby="platform-heading"
      {...pauseHandlers}
    >
      <div className="inv-container">
        <InvLabel>Our platform</InvLabel>
        <h2 id="platform-heading" className="inv-heading-lg mt-4 max-w-2xl">
          Everything you need to{' '}
          <span className="inv-accent-blue">scale with intelligence.</span>
        </h2>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-16">
          <div role="tablist" aria-label="Platform capabilities">
            {platformShowcaseItems.map((item, index) => {
              const isActive = index === activeIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-active={isActive ? 'true' : 'false'}
                  className="inv-platform-tab"
                  onClick={() => goTo(index)}
                >
                  <div className="flex items-start gap-4">
                    <span className="inv-platform-tab-icon">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="inv-platform-tab-title">{item.tab}</p>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="inv-platform-tab-desc">{item.description}</p>
                          <Link
                            to={item.ctaHref}
                            className="inv-btn-black mt-5 inline-flex !text-[12px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Learn more
                          </Link>
                          <div className="inv-progress-bar mt-4">
                            <div
                              className="inv-progress-fill !bg-[var(--color-align-orange)]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <RichMockupStage
                mockupId={active.mockupId}
                variant={active.stageVariant}
                tilt
                className="min-h-[380px] lg:min-h-[440px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
