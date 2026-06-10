import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { serviceCategories } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

interface ServiceCategoriesSectionProps {
  standalone?: boolean;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-[510] uppercase tracking-wider text-[#62666d]">{title}</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-[#d0d6e0] before:mr-2 before:text-[#5e6ad2] before:content-['·']">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceCategoriesSection({ standalone = false }: ServiceCategoriesSectionProps) {
  const [activeId, setActiveId] = useState(serviceCategories[0]?.id ?? '');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && serviceCategories.some((c) => c.id === hash)) {
      setActiveId(hash);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const active = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];

  const selectCategory = (id: string) => {
    setActiveId(id);
    if (standalone) {
      window.history.replaceState(null, '', `/services#${id}`);
    }
  };

  return (
    <section id="services" className={cn('marketing-section scroll-mt-24', standalone && 'pt-10')}>
      <div className="marketing-container px-6">
        {!standalone && (
          <SectionHeader
            eyebrow="Core Service Categories"
            title="Everything you need to scale with intelligent systems"
            subtitle="From AI agents and automation to SaaS, CRM, web apps, and immersive 3D experiences — built for your business."
          />
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-8">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {serviceCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className={cn(
                    'shrink-0 rounded-md border px-4 py-3 text-left transition-all duration-200 lg:w-full',
                    isActive
                      ? 'linear-card-deep border-[#383b3f] text-[#f7f8f8]'
                      : 'border-transparent text-[#8a8f98] hover:bg-[#161718] hover:text-[#f7f8f8]'
                  )}
                >
                  <p className="text-sm font-[510] sm:text-base">{cat.title}</p>
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
                className="linear-card scroll-mt-28 p-6 sm:p-8"
              >
                <h3 className="text-xl font-[510] text-[#f7f8f8] sm:text-2xl">{active.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8f98] sm:text-base">{active.summary}</p>

                <div className="mt-6 space-y-6">
                  <DetailList title="Services" items={active.services} />
                  {active.useCases && <DetailList title="Use Cases" items={active.useCases} />}
                  {active.examples && <DetailList title="Examples" items={active.examples} />}
                  {active.features && <DetailList title="Features" items={active.features} />}
                  {active.benefits && <DetailList title="Benefits" items={active.benefits} />}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-[#23252a] pt-6">
                  <Link to="/contact" className="linear-btn-primary text-sm">
                    Get a quote for {active.title}
                  </Link>
                  <Link
                    to="/projects"
                    className="text-sm font-[510] text-[#8a8f98] transition-colors hover:text-[#f7f8f8]"
                  >
                    See related projects →
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
