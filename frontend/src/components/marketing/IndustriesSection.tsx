import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
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
    <section id="industries" className={cn('inv-section scroll-mt-24', standalone && '!pt-10')}>
      <div className="inv-container">
        {!standalone && (
          <>
            <InvLabel>Industries we serve</InvLabel>
            <TwoToneHeadline
              className="mt-4"
              primary="Proven solutions"
              secondary="across sectors."
            />
            <p className="inv-body mt-4 max-w-2xl">
              We deliver tailored technology for pharmaceutical, recruitment, startups, real estate, and more.
            </p>
          </>
        )}

        <div className={cn('flex flex-wrap justify-center gap-2 sm:gap-3', !standalone && 'mt-10')}>
          {industries.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => selectIndustry(ind.id)}
              className={cn(
                'rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200',
                activeId === ind.id
                  ? 'pastel-card-mint border-[var(--align-mint-border)] text-[var(--color-carbon-ink)] shadow-sm'
                  : 'border border-transparent text-[var(--color-steel)] hover:bg-[var(--color-mist)] hover:text-[var(--color-carbon-ink)]'
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
              className="inv-card mx-auto mt-10 max-w-2xl scroll-mt-28 p-8 text-center"
            >
              <h3 className="inv-heading !text-2xl sm:!text-3xl">{active.title}</h3>
              <p className="inv-label mt-3 justify-center">Projects delivered</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.projects.map((project) => (
                  <li
                    key={project}
                    className="inv-card !border-[var(--color-ash)] !bg-[var(--color-mist)]/50 !p-4 text-sm font-medium"
                  >
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
