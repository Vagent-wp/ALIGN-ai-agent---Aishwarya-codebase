import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LinearHeroMockup } from '@/components/marketing/linear/LinearHeroMockup';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { BRAND } from '@/lib/brand';
import { heroTrustBullets } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

export function AlignHero() {
  return (
    <section className={cn('relative overflow-hidden bg-[#08090a]', MARKETING_NAV_HEIGHT.heroMinHeight)}>
      {/* Stripe 25% — atmospheric halo bleeding from right */}
      <div className="stripe-hero-halo" aria-hidden />

      <div className="marketing-container relative px-6 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left 60% — Linear structure + Stripe gradient headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="linear-announcement linear-fade-up">
              <span className="linear-announcement-dot" aria-hidden />
              <span>{BRAND.platform} is live — intelligent opportunity discovery</span>
              <Link to="/onboarding" className="text-[#8a8f98] transition-colors hover:text-[#f7f8f8]">
                Join now →
              </Link>
            </div>

            <h1 className="mt-8 linear-fade-up linear-fade-up-delay-1">
              <span className="stripe-gradient-text block text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-[1.07] tracking-[-0.03em]">
                Where opportunities
              </span>
              <span className="block text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-[1.07] tracking-[-0.03em] text-[#f7f8f8]">
                find people.
              </span>
            </h1>

            <p className="linear-body-lg mt-6 max-w-xl linear-fade-up linear-fade-up-delay-2">
              {BRAND.company} builds AI agents, automation, and intelligent business systems — powered by{' '}
              <span className="text-[#f7f8f8]">{BRAND.assistant}</span> on {BRAND.platform}.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row linear-fade-up linear-fade-up-delay-3">
              <Link to="/onboarding" className="linear-btn-primary min-w-[200px]">
                Join {BRAND.platform}
              </Link>
              <Link to="/contact" className="linear-btn-ghost min-w-[160px]">
                Talk to us
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              {heroTrustBullets.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#8a8f98]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#533afd]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right 40% — Linear product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <LinearHeroMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
