import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { howItWorksSteps, stats } from '@/lib/marketing/content';

export function MissionSection() {
  return (
    <section className="marketing-section pastel-card-mint">
      <div className="marketing-container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="marketing-eyebrow">Our Mission</p>
          <h2 className="marketing-heading mt-3">{BRAND.taglinePrimary}</h2>
          <p className="marketing-subtitle mt-5">
            {BRAND.company} is building intelligent ecosystems that connect people, businesses, opportunities,
            services, and growth through AI-powered technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="border-y border-border/60 bg-card py-10">
      <div className="marketing-container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-poppins text-xl font-bold tabular-nums text-primary sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
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
    <section className="marketing-section bg-background">
      <div className="marketing-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="marketing-eyebrow">How It Works</p>
          <h2 className="marketing-heading mt-3">From idea to intelligent ecosystem</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="font-poppins text-3xl font-bold text-primary/30">{step.step}</span>
              <h3 className="mt-2 font-poppins text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="marketing-section bg-[#060612] text-white">
      <div className="marketing-container text-center">
        <h2 className="font-poppins text-3xl font-bold sm:text-4xl">
          Ready to build your intelligent ecosystem?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
          Join {BRAND.platform} and discover how {BRAND.assistant} connects opportunities with the people who need them.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/early-access" className="btn-marketing-primary min-w-[200px]">
            Get Early Access
          </Link>
          <Link to="/contact" className="btn-marketing-outline-light min-w-[200px]">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
