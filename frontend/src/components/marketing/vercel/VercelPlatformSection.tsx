import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, LayoutDashboard } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import {
  vercelCategoryFilters,
  vercelFeatureCards,
  vercelDashboardRows,
} from '@/lib/marketing/vercelContent';

const featureIcons = {
  dashboard: LayoutDashboard,
  api: Code2,
  deploy: Bot,
} as const;

/** Vercel-inspired platform section — engineer grid, prism mark, feature cards, code block */
export function VercelPlatformSection() {
  const [activeFilter, setActiveFilter] = useState(vercelCategoryFilters[0].id);

  return (
    <section
      className="vercel-section marketing-vercel"
      aria-labelledby="vercel-platform-heading"
    >
      <div className="vercel-engineer-grid" aria-hidden />

      <div className="vercel-container">
        {/* Centered hero */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 id="vercel-platform-heading" className="vercel-display">
            Built for developers who ship
          </h2>
          <p className="vercel-body mt-4">
            Component-level precision, dashboard aesthetics, and infrastructure you can deploy —
            {BRAND.platform} is engineered for teams that build.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/onboarding" className="vercel-btn-primary">
              Start building
            </Link>
            <Link to="/contact" className="vercel-btn-secondary">
              Get a demo
            </Link>
          </div>
        </motion.div>

        {/* Category filters */}
        <div className="vercel-filter-row" role="tablist" aria-label="Platform categories">
          {vercelCategoryFilters.map((chip) => (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === chip.id}
              className={`vercel-filter-chip${activeFilter === chip.id ? ' vercel-filter-chip-active' : ''}`}
              onClick={() => setActiveFilter(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Feature cards */}
        <div className="vercel-feature-grid">
          {vercelFeatureCards.map((card, index) => {
            const Icon = featureIcons[card.id as keyof typeof featureIcons] ?? LayoutDashboard;
            return (
              <motion.article
                key={card.id}
                className="vercel-feature-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="vercel-feature-card-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="vercel-feature-card-title">{card.title}</h3>
                <p className="vercel-feature-card-body">{card.body}</p>
                <Link to={card.href} className="vercel-feature-card-cta" aria-label={`Learn more about ${card.title}`}>
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Dashboard preview + code block */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="vercel-dashboard-preview"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="vercel-dashboard-toolbar">
              <span className="vercel-dashboard-dot" />
              <span className="vercel-dashboard-dot" />
              <span className="vercel-dashboard-dot" />
              <span className="vercel-dashboard-title">{BRAND.platform.toLowerCase()} — dashboard</span>
            </div>
            <div className="vercel-dashboard-body">
              {vercelDashboardRows.map((row) => (
                <div
                  key={row.label}
                  className={`vercel-dashboard-row${row.highlight ? ' vercel-dashboard-row-highlight' : ''}`}
                >
                  <span>{row.label}</span>
                  <span className="vercel-dashboard-row-meta">{row.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="vercel-body-sm mb-3 font-medium text-[#171717]">Quick start</p>
            <div className="vercel-code-block">
              <pre>
                <code>
                  <span className="vercel-code-comment"># Discover businesses via API</span>
                  {'\n'}
                  <span className="vercel-code-keyword">curl</span> -X POST https://api.align.network/v1/discover \
                  {'\n'}
                  {'  '}-H <span className="vercel-code-string">"Authorization: Bearer $ALIGN_API_KEY"</span> \
                  {'\n'}
                  {'  '}-d <span className="vercel-code-string">'{'{'}</span>
                  {'\n'}
                  {'    '}<span className="vercel-code-property">"query"</span>
                  <span className="vercel-code-string">: "Find pharma compliance consultants"</span>,
                  {'\n'}
                  {'    '}<span className="vercel-code-property">"source"</span>
                  <span className="vercel-code-string">: "network"</span>,
                  {'\n'}
                  {'    '}<span className="vercel-code-property">"limit"</span>: 10
                  {'\n'}
                  {'  '}<span className="vercel-code-string">{'}'}</span>'
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          className="vercel-stat-strip"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="vercel-stat-value">
            Ship intelligent systems <span className="vercel-highlight">faster</span>
          </p>
          <p className="vercel-stat-label">
            From API to dashboard — one platform for discovery, agents, and growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
