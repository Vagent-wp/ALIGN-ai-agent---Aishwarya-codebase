import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { howItWorksSteps, stats } from '@/lib/marketing/content';

export function InvisibleStatsBand() {
  return (
    <section className="inv-stats-band" aria-label="Key metrics">
      <div className="inv-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="inv-stat-value">{stat.value}</p>
              <p className="inv-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvisibleHowItWorks() {
  return (
    <section className="inv-section">
      <div className="inv-container">
        <InvLabel>How it works</InvLabel>
        <TwoToneHeadline
          className="mt-4"
          primary="From idea to ecosystem"
          secondary="in four steps."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {howItWorksSteps.map((step, i) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="inv-card"
            >
              <span className="font-[family-name:var(--font-apkpraktikal)] text-2xl text-[var(--color-cobalt-spark)]">
                {step.step}
              </span>
              <h3 className="inv-heading mt-3 !text-xl">{step.title}</h3>
              <p className="inv-body-sm mt-2">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvisibleFinalCTA() {
  return (
    <section className="inv-section border-t border-[var(--color-ash)]">
      <div className="inv-container text-center lg:text-left">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <TwoToneHeadline
            primary="Ready to build"
            secondary="your intelligent ecosystem?"
          />
          <div className="lg:pt-4">
            <p className="inv-body max-w-md lg:ml-auto">
              Join the network and discover how AI connects opportunities with the people who need them.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-end">
              <Link to="/onboarding" className="inv-btn-lime min-w-[200px]">
                Join network
              </Link>
              <Link to="/contact" className="inv-btn-ghost min-w-[200px]">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
