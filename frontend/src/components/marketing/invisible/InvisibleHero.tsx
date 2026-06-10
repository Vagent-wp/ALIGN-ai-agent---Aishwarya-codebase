import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { HeroShootingStars } from '@/components/marketing/invisible/HeroShootingStars';
import { HeroTypewriterHeadline } from '@/components/marketing/invisible/HeroTypewriterHeadline';
import { MockWindowFrame } from '@/components/marketing/invisible/MockWindowFrame';
import { SketchDecor } from '@/components/marketing/invisible/SketchDecor';
import AuroraBackground from '@/components/ui/aurora-background';
import { BRAND } from '@/lib/brand';
import { heroSketchPositions } from '@/lib/marketing/invisibleContent';

export function InvisibleHero() {
  return (
    <section className="inv-graph-paper relative overflow-hidden pt-8 pb-20 md:pb-28 lg:pt-12">
      <AuroraBackground
        variant="hero"
        contained
        starCount={40}
        pulseDuration={12}
        gradientColors={[
          'var(--aurora-color1, rgba(37, 99, 235, 0.16))',
          'var(--aurora-color2, rgba(249, 115, 22, 0.12))',
        ]}
        className="pointer-events-none absolute inset-0 z-0"
        ariaLabel="Hero aurora background"
      />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroShootingStars />
      </div>

      {heroSketchPositions.map(({ id, className, rotate }) => (
        <div
          key={id}
          className={`pointer-events-none absolute z-[1] ${className}`}
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <SketchDecor id={id} />
        </div>
      ))}

      <div className="inv-container relative z-[2]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <InvLabel>{BRAND.company}</InvLabel>
            <div className="mt-4">
              <HeroTypewriterHeadline />
            </div>
            <p className="inv-body mt-6 max-w-lg">
              {BRAND.platform} and {BRAND.assistant} connect people, businesses, and opportunities — AI agents,
              automation, and custom platforms built to scale.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/services" className="inv-btn-black">
                Explore platform
              </Link>
              <Link to="/contact" className="inv-link mt-1">
                Talk to our team
              </Link>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MockWindowFrame title={BRAND.platform}>
              <div className="space-y-3">
                {[
                  { id: 'ALN-2401', title: 'Match founders with AI agents', status: 'In progress' },
                  { id: 'ALN-2398', title: 'Onboard service providers', status: 'Complete' },
                  { id: 'ALN-2395', title: 'Semantic profile search', status: 'Queued' },
                ].map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                    className="flex items-start justify-between gap-3 border-b border-[var(--color-ash)] pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-[family-name:var(--font-apkpraktikal)] text-[11px] uppercase tracking-wider text-[var(--color-steel)]">
                        {row.id}
                      </p>
                      <p className="inv-body-sm mt-1 font-medium text-[var(--color-carbon-ink)]">{row.title}</p>
                    </div>
                    <span className="inv-pill-badge shrink-0">{row.status}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-[var(--color-ash)] bg-[var(--color-mist)] px-3 py-2.5">
                <p className="font-[family-name:var(--font-apkpraktikal)] text-[11px] text-[var(--color-steel)]">
                  Describe who you need to find…
                </p>
              </div>
            </MockWindowFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
