import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { BRAND } from '@/lib/brand';
import { introBuildPillars } from '@/lib/marketing/invisibleContent';

function pillarToneClass(tone: 'peach' | 'sky' | 'lavender') {
  if (tone === 'peach') return 'inv-feature-band--peach';
  if (tone === 'sky') return 'inv-feature-band--sky';
  return 'inv-feature-band--lavender';
}

export function InvisibleIntroSection() {
  return (
    <section className="inv-section">
      <div className="inv-container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-20">
          <div>
            <InvLabel>What we build</InvLabel>
            <TwoToneHeadline
              className="mt-4"
              primary="Intelligent ecosystems"
              secondary="for modern businesses."
            />
          </div>
          <div className="lg:pt-10">
            <p className="inv-body max-w-xl">
              {BRAND.company} designs and ships AI agents, automation pipelines, SaaS platforms, and CRM systems —
              then connects them through {BRAND.platform} so opportunities find the right people.
            </p>
            <Link to="/services" className="inv-link mt-6 inline-flex">
              View all services
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {introBuildPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`inv-feature-band ${pillarToneClass(pillar.tone)} flex flex-col !p-6`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ash)] bg-white/70 text-[var(--color-align-blue)]">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <h3 className="inv-heading mt-4 !text-lg">{pillar.title}</h3>
                <p className="inv-body-sm mt-2 flex-1">{pillar.description}</p>
                <Link to={pillar.href} className="inv-link mt-5 inline-flex text-[13px]">
                  Learn more
                  <span aria-hidden>→</span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inv-ice-panel mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
        >
          <div>
            <p className="inv-label">Connected by {BRAND.platform}</p>
            <p className="inv-body-sm mt-2 max-w-xl">
              Every system plugs into one intelligent graph — so founders, agencies, investors, and service providers
              find each other faster.
            </p>
          </div>
          <Link to="/onboarding" className="inv-btn-outline-blue shrink-0">
            Join the network
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
