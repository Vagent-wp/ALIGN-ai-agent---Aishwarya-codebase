import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { ClampReadMore } from '@/components/marketing/invisible/ClampReadMore';
import { RichMockupStage } from '@/components/marketing/invisible/RichMockupStage';
import type { MockupAssetId } from '@/lib/marketing/visualAssets';

interface SpotlightItem {
  id: string;
  tone: 'peach' | 'sky' | 'lavender';
  stageVariant: 'blue' | 'teal' | 'warm';
  mockupId: MockupAssetId;
  title: string;
  description: string;
  cta: { label: string; href: string };
}

const spotlightItems: SpotlightItem[] = [
  {
    id: 'ai-search',
    tone: 'peach',
    stageVariant: 'warm',
    mockupId: 'ai-search',
    title: 'AI-assisted talent discovery',
    description:
      'Find the right candidates in seconds with skill filters, match insights, and bulk tools built for recruitment teams.',
    cta: { label: 'Explore features', href: '/services' },
  },
  {
    id: 'analytics',
    tone: 'lavender',
    stageVariant: 'blue',
    mockupId: 'analytics-dashboard',
    title: 'Dashboards your team will actually use',
    description:
      'Hiring analytics, pipeline visibility, and export-ready reports — without dashboard overload.',
    cta: { label: 'View showcase', href: '/projects' },
  },
  {
    id: 'network',
    tone: 'sky',
    stageVariant: 'teal',
    mockupId: 'network-dashboard',
    title: 'One network for every opportunity',
    description:
      'Semantic search, warm intros, and AI-ranked matches — so founders, agencies, and investors connect faster.',
    cta: { label: 'Join the network', href: '/onboarding' },
  },
];

function SpotlightCard({ item }: { item: SpotlightItem }) {
  const bandClass =
    item.tone === 'peach'
      ? 'inv-feature-band--peach'
      : item.tone === 'sky'
        ? 'inv-feature-band--sky'
        : 'inv-feature-band--lavender';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inv-feature-band inv-grid-card ${bandClass} flex h-full flex-col`}
    >
      <div className="inv-spotlight-mock shrink-0 overflow-hidden rounded-2xl">
        <RichMockupStage
          mockupId={item.mockupId}
          variant={item.stageVariant}
          tilt
          className="!h-full !min-h-0 !p-2 sm:!p-4"
        />
      </div>
      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-5">
        <h3 className="inv-heading-lg line-clamp-2 !text-[clamp(0.95rem,2.5vw,1.5rem)]">{item.title}</h3>
        <ClampReadMore
          text={item.description}
          className="inv-body mt-2 text-[13px] sm:mt-3 sm:text-base"
        />
        <Link
          to={item.cta.href}
          className="inv-btn-outline-blue mt-3 inline-flex self-start text-[12px] sm:mt-4 sm:text-sm lg:mt-auto"
        >
          {item.cta.label}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

/** Full-width feature bands with real product mockups — mas3 / mok1 inspired */
export function FeatureSpotlightBand() {
  return (
    <section className="inv-section scroll-mt-24" aria-labelledby="spotlight-heading">
      <div className="inv-container">
        <InvLabel>Product highlights</InvLabel>
        <h2 id="spotlight-heading" className="inv-heading-lg mt-4 max-w-2xl">
          Built to feel{' '}
          <span className="inv-accent-blue">real</span>
          {' '}— not empty.
        </h2>

        <div className="mt-10 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {spotlightItems.map((item) => (
            <SpotlightCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
