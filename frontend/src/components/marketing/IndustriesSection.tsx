import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { industries } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

interface IndustriesSectionProps {
  standalone?: boolean;
}

export function IndustriesSection({ standalone = false }: IndustriesSectionProps) {
  const [activeId, setActiveId] = useState(industries[0]?.id ?? '');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && industries.some((i) => i.id === hash)) {
      setActiveId(hash);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const active = industries.find((i) => i.id === activeId) ?? industries[0];

  const selectIndustry = (id: string) => {
    setActiveId(id);
    if (standalone) {
      window.history.replaceState(null, '', `/industries#${id}`);
    }
  };

  return (
    <section id="industries" className={cn('marketing-section scroll-mt-24', standalone && 'pt-10')}>
      <div className="marketing-container px-6">
        {!standalone && (
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Proven solutions across sectors"
            subtitle="We deliver tailored technology for pharmaceutical, recruitment, startups, real estate, and more."
          />
        )}

        <div className={cn('flex flex-wrap justify-center gap-2 sm:gap-3', !standalone && 'mt-10')}>
          {industries.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => selectIndustry(ind.id)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-[510] transition-all duration-200',
                activeId === ind.id
                  ? 'bg-[#383b3f] text-[#f7f8f8] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]'
                  : 'text-[#8a8f98] hover:text-[#f7f8f8]'
              )}
            >
              {ind.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              id={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="linear-card mx-auto mt-10 max-w-2xl scroll-mt-28 p-8 text-center"
            >
              <h3 className="linear-heading-lg text-2xl sm:text-3xl">{active.title}</h3>
              <p className="mt-2 text-sm font-[510] uppercase tracking-wider text-[#62666d]">Projects Delivered</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.projects.map((project) => (
                  <li key={project} className="linear-card-deep px-4 py-3 text-sm font-[510] text-[#d0d6e0]">
                    {project}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
