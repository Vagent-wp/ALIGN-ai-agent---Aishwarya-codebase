import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Shield, Sparkles } from 'lucide-react';
import { PerplexitySearchMockup } from '@/components/marketing/perplexity/PerplexitySearchMockup';
import { perplexityTrustPoints } from '@/lib/marketing/perplexityContent';
import { BRAND } from '@/lib/brand';

const trustIcons = [Sparkles, Shield, MessageSquare];

/** Perplexity-inspired AI discovery section — search-first, trust-building, minimal */
export function PerplexityDiscoverySection() {
  return (
    <section
      className="perplexity-section marketing-perplexity"
      aria-labelledby="perplexity-discovery-heading"
    >
      <div className="perplexity-section-header">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="perplexity-eyebrow">AI-first discovery</p>
            <h2 id="perplexity-discovery-heading" className="perplexity-heading">
              Ask. Discover. Connect.
            </h2>
            <p className="perplexity-body mt-4 max-w-lg">
              {BRAND.assistant} on {BRAND.platform} works like a research assistant — type what you
              need in natural language and get structured, trustworthy matches from our business
              ecosystem.
            </p>

            <ul className="perplexity-trust-list">
              {perplexityTrustPoints.map((point, i) => {
                const Icon = trustIcons[i] ?? Sparkles;
                return (
                  <li key={point.title} className="perplexity-trust-item">
                    <span className="perplexity-trust-item-icon">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="perplexity-trust-item-title">{point.title}</p>
                      <p className="perplexity-trust-item-body">{point.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link to="/onboarding" className="perplexity-cta-link">
              Try intelligent discovery
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PerplexitySearchMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
