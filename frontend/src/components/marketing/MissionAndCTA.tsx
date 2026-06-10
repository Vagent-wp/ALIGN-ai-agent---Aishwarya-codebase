import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { howItWorksSteps, stats } from '@/lib/marketing/content';
import { AlignVisual } from '@/components/marketing/illustrations/AlignVisual';
import { captureCardByIndex } from '@/lib/marketing/capturePalette';
import { cn } from '@/lib/utils';

export function MissionSection() {
  return (
    <section className="marketing-section align-band-mint">
      <div className="marketing-container px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="mx-auto max-w-3xl text-center lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="marketing-eyebrow">Our Mission</p>
            <h2 className="marketing-heading mt-3">{BRAND.taglinePrimary}</h2>
            <p className="marketing-subtitle mt-5">
              {BRAND.company} is building intelligent ecosystems that connect people, businesses, opportunities,
              services, and growth through AI-powered technology.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AlignVisual visual="team" className="mx-auto max-w-md lg:mx-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="border-y border-[var(--color-graphite)] bg-[var(--align-lavender)] py-10">
      <div className="marketing-container px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-[510] tabular-nums text-[var(--color-snow)] sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs font-[510] uppercase tracking-wider text-[var(--color-slate)] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="marketing-section align-band-peach">
      <div className="marketing-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="marketing-eyebrow">How It Works</p>
          <h2 className="marketing-heading mt-3">From idea to intelligent ecosystem</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className={cn('p-6', captureCardByIndex(i))}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="linear-mono text-3xl text-[var(--color-indigo)]">{step.step}</span>
              <h3 className="mt-2 text-lg font-[510] text-[var(--color-snow)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fog)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="marketing-section align-band-sky border-t border-[var(--color-graphite)]">
      <div className="marketing-container px-6 text-center">
        <h2 className="linear-heading-lg">Ready to build your intelligent ecosystem?</h2>
        <p className="linear-body-lg mx-auto mt-4 max-w-xl">
          Join {BRAND.platform} and discover how {BRAND.assistant} connects opportunities with the people who need them.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/onboarding" className="linear-btn-primary min-w-[200px]">
            Join ALIGN Network
          </Link>
          <Link to="/contact" className="linear-btn-pill min-w-[200px]">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
