import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClampReadMore } from '@/components/marketing/invisible/ClampReadMore';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { howItWorksSteps, stats } from '@/lib/marketing/content';

export function InvisibleStatsBand() {
  return (
    <section className="inv-stats-band" aria-label="Key metrics">
      <div className="inv-container">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
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

        <div className="mt-10 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:mt-14 sm:gap-6">
          {howItWorksSteps.map((step, i) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="inv-card inv-grid-card flex h-full flex-col"
            >
              <span className="font-[family-name:var(--font-apkpraktikal)] text-xl text-[var(--color-cobalt-spark)] sm:text-2xl">
                {step.step}
              </span>
              <h3 className="inv-heading mt-2 line-clamp-2 !text-base sm:mt-3 sm:!text-xl">{step.title}</h3>
              <ClampReadMore text={step.desc} className="inv-body-sm mt-2" />
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
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-end">
              <Link to="/onboarding" className="inv-btn-lime w-full text-center sm:w-auto sm:min-w-[200px]">
                Join network
              </Link>
              <Link to="/contact" className="inv-btn-ghost w-full text-center sm:w-auto sm:min-w-[200px]">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
