import { motion, AnimatePresence } from 'framer-motion';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { useHashSection } from '@/hooks/useHashSection';
import { industries } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

interface IndustriesSectionProps {
  standalone?: boolean;
}

const INDUSTRY_IDS = industries.map((i) => i.id);

export function IndustriesSection({ standalone = false }: IndustriesSectionProps) {
  const { activeId, selectSection } = useHashSection(
    INDUSTRY_IDS,
    industries[0]?.id ?? '',
    { pagePath: '/industries' },
  );

  const active = industries.find((i) => i.id === activeId) ?? industries[0];

  const selectIndustry = (id: string) => {
    if (standalone) {
      selectSection(id, '/industries');
      return;
    }
    selectSection(id, window.location.pathname);
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

        <div
          className={cn(
            'grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3',
            !standalone && 'mt-8 sm:mt-10'
          )}
        >
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
              className="inv-card mx-auto mt-8 max-w-2xl scroll-mt-28 p-5 text-center sm:mt-10 sm:p-8"
            >
              <h3 className="inv-heading !text-2xl sm:!text-3xl">{active.title}</h3>
              <p className="inv-label mt-3 justify-center">Projects delivered</p>
              <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                {active.projects.map((project) => (
                  <li
                    key={project}
                    className="inv-card flex min-h-[72px] items-center !border-[var(--color-ash)] !bg-[var(--color-mist)]/50 !p-3 text-sm font-medium sm:min-h-0 sm:!p-4"
                  >
                    <span className="line-clamp-2">{project}</span>
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
