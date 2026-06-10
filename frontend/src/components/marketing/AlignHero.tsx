import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShaderBackground } from '@/components/marketing/ui/ShaderBackground';
import { Typewriter } from '@/components/marketing/ui/Typewriter';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { BRAND } from '@/lib/brand';
import { heroTrustBullets, heroTypewriterPhrases } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

export function AlignHero() {
  return (
    <section className={cn('relative overflow-hidden', MARKETING_NAV_HEIGHT.heroOverlap)}>
      <ShaderBackground />

      <div
        className={cn(
          'relative z-[1] marketing-container pb-16 pt-10 sm:pb-20 sm:pt-14 lg:flex lg:items-center lg:pb-24 lg:pt-20',
          MARKETING_NAV_HEIGHT.heroMinHeight
        )}
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300/90">
            {BRAND.company}
          </p>
          <p className="mt-2 text-xs font-medium text-slate-300/80 sm:text-sm">
            {BRAND.expansion}
          </p>

          <h1 className="mt-5 font-poppins text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Building intelligent systems{' '}
            <span className="text-violet-200">
              <Typewriter phrases={heroTypewriterPhrases} />
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-200/95 sm:text-xl">
            <span className="sm:hidden">
              AI, automation, and software ecosystems for startups, businesses, and enterprises.
            </span>
            <span className="hidden sm:inline">
              We help startups, businesses, agencies, and enterprises automate operations, generate leads,
              and build scalable digital ecosystems through AI, automation, and intelligent business systems.
            </span>
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/early-access" className="btn-marketing-primary min-w-[200px]">
              Get Early Access
            </Link>
            <Link to="/contact" className="btn-marketing-outline-light min-w-[200px]">
              Talk to Us
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {heroTrustBullets.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-300/90">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
