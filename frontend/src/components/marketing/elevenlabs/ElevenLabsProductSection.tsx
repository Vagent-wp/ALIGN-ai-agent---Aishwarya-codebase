import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AmbientVoiceOrb } from '@/components/marketing/elevenlabs/AmbientVoiceOrb';
import { BRAND } from '@/lib/brand';
import {
  elevenlabsProductTabs,
  voiceOrbCategories,
  elevenlabsFeatureCards,
  elevenlabsDarkPreviewRows,
  elevenlabsTabContent,
} from '@/lib/marketing/elevenlabsContent';

/** ElevenLabs-inspired AI product presentation — parchment surfaces, orb carousel, dark inset */
export function ElevenLabsProductSection() {
  const [activeTab, setActiveTab] = useState(elevenlabsProductTabs[0].id);
  const tabContent = elevenlabsTabContent[activeTab] ?? elevenlabsTabContent.network;

  return (
    <section
      className="elevenlabs-section marketing-elevenlabs"
      aria-labelledby="elevenlabs-products-heading"
    >
      <div className="elevenlabs-container">
        {/* Asymmetric hero */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="elevenlabs-eyebrow">{BRAND.company}</p>
            <h2 id="elevenlabs-products-heading" className="elevenlabs-display mt-4">
              AI products built to be heard
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/onboarding" className="elevenlabs-btn-primary">
                Create your agent
              </Link>
              <Link to="/contact" className="elevenlabs-btn-ghost">
                Contact sales
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="elevenlabs-body max-w-md lg:pt-12">
              {BRAND.assistant} and {BRAND.platform} bring voice, search, and intelligent
              matchmaking together — presented with clarity, hierarchy, and zero decorative noise
              in the interface itself.
            </p>
          </motion.div>
        </div>

        {/* Product panel — tabs + orb carousel */}
        <motion.div
          className="elevenlabs-product-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="elevenlabs-tab-bar" role="tablist" aria-label="Product areas">
            {elevenlabsProductTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`elevenlabs-tab${activeTab === tab.id ? ' elevenlabs-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="px-8 pb-4">
            <h3 className="elevenlabs-heading text-[clamp(1.25rem,3vw,1.75rem)]">{tabContent.headline}</h3>
            <p className="elevenlabs-body-sm mt-2 max-w-xl">{tabContent.body}</p>
          </div>

          <div className="elevenlabs-orb-carousel" aria-label="AI agent categories">
            {voiceOrbCategories.map((orb) => (
              <div key={orb.id} className="elevenlabs-orb-item">
                <AmbientVoiceOrb gradient={orb.gradient} />
                <div>
                  <p className="elevenlabs-orb-label">{orb.label}</p>
                  <p className="elevenlabs-orb-sublabel">{orb.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="elevenlabs-feature-grid">
          {elevenlabsFeatureCards.map((card, index) => (
            <motion.article
              key={card.id}
              className="elevenlabs-feature-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="elevenlabs-feature-card-title">{card.title}</h4>
              <p className="elevenlabs-feature-card-body">{card.body}</p>
            </motion.article>
          ))}
        </div>

        {/* Dark mode inset — product UI preview */}
        <motion.div
          className="elevenlabs-dark-inset"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="elevenlabs-dark-inset-header">
                <h3 className="elevenlabs-dark-inset-title">Agent command center</h3>
                <span className="elevenlabs-dark-inset-badge">Dark mode</span>
              </div>
              <p className="elevenlabs-dark-inset-body">
                Monitor active agents, conversation flows, and match pipelines — a focused dark
                surface for operators who live in the product daily.
              </p>
              <Link
                to="/services"
                className="elevenlabs-btn-secondary mt-6 !border-white/20 !bg-transparent !text-[#fdfcfc] hover:!bg-white/5"
              >
                Explore platforms
              </Link>
            </div>

            <div className="elevenlabs-elevated-card !bg-[#1a1a1a] !shadow-none !border !border-white/8">
              <div className="elevenlabs-dark-preview !mt-0 !bg-transparent !border-0 !p-0">
                {elevenlabsDarkPreviewRows.map((row) => (
                  <div key={row.label} className="elevenlabs-dark-preview-row">
                    <span className="elevenlabs-dark-preview-dot" style={{ background: row.dot }} />
                    <span className="elevenlabs-dark-preview-text">{row.label}</span>
                    <span className="elevenlabs-dark-preview-meta">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
