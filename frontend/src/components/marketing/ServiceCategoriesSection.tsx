import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { useHashSection } from '@/hooks/useHashSection';
import { serviceCategories } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

interface ServiceCategoriesSectionProps {
  standalone?: boolean;
}

const SERVICE_IDS = serviceCategories.map((c) => c.id);

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="inv-label mb-3">{title}</p>
      <ul className="grid grid-cols-2 gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="inv-body-sm before:mr-2 before:text-[var(--color-align-orange)] before:content-['·']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceCategoriesSection({ standalone = false }: ServiceCategoriesSectionProps) {
  const { activeId, selectSection } = useHashSection(
    SERVICE_IDS,
    serviceCategories[0]?.id ?? '',
    { pagePath: '/services' },
  );

  const active = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];

  const selectCategory = (id: string) => {
    if (standalone) {
      selectSection(id, '/services');
      return;
    }
    selectSection(id, window.location.pathname);
  };

  return (
    <section id="services" className={cn('inv-section scroll-mt-24', standalone && '!pt-10')}>
      <div className="inv-container">
        {!standalone && (
          <>
            <InvLabel>Core service categories</InvLabel>
            <TwoToneHeadline
              className="mt-4"
              primary="Everything you need to scale"
              secondary="with intelligent systems."
            />
            <p className="inv-body mt-4 max-w-2xl">
              From AI agents and automation to SaaS, CRM, web apps, and immersive 3D experiences — built for your
              business.
            </p>
          </>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-8">
          <div className="inv-scroll-tabs flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {serviceCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className={cn(
                    'shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-200 lg:w-full',
                    isActive
                      ? 'inv-feature-band inv-feature-band--sky border-[rgba(37,99,235,0.12)] text-[var(--color-carbon-ink)] shadow-sm'
                      : 'border border-transparent text-[var(--color-steel)] hover:bg-[var(--color-mist)] hover:text-[var(--color-carbon-ink)]'
                  )}
                >
                  <p className="text-sm font-medium sm:text-base">{cat.title}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                id={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="inv-card scroll-mt-28 p-6 sm:p-8"
              >
                <h3 className="inv-heading !text-xl sm:!text-2xl">{active.title}</h3>
                <p className="inv-body mt-2">{active.summary}</p>

                <div className="mt-6 space-y-6">
                  <DetailList title="Services" items={active.services} />
                  {active.useCases && <DetailList title="Use Cases" items={active.useCases} />}
                  {active.examples && <DetailList title="Examples" items={active.examples} />}
                  {active.features && <DetailList title="Features" items={active.features} />}
                  {active.benefits && <DetailList title="Benefits" items={active.benefits} />}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-ash)] pt-6">
                  <Link to="/contact" className="inv-btn-black w-full text-center text-sm sm:w-auto">
                    <span className="sm:hidden">Get a quote</span>
                    <span className="hidden sm:inline">Get a quote for {active.title}</span>
                  </Link>
                  <Link to="/projects" className="inv-link text-sm">
                    See related projects
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
