import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { industries } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

export function IndustriesSection() {
  const [activeId, setActiveId] = useState(industries[0]?.id ?? '');

  const active = industries.find((i) => i.id === activeId) ?? industries[0];

  return (
    <section id="industries" className="marketing-section bg-background scroll-mt-20">
      <div className="marketing-container">
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Proven solutions across sectors"
          subtitle="We deliver tailored technology for pharmaceutical, recruitment, startups, real estate, and more."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {industries.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => setActiveId(ind.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                activeId === ind.id
                  ? 'border-primary bg-primary text-primary-foreground shadow-md'
                  : 'border-border bg-card text-foreground/80 hover:border-primary/30 hover:text-primary'
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-10 max-w-2xl rounded-3xl pastel-card-peach p-8 text-center shadow-sm"
            >
              <h3 className="font-poppins text-2xl font-bold">{active.title}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Projects Delivered
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.projects.map((project) => (
                  <li
                    key={project}
                    className="rounded-xl border border-border/50 bg-card/80 px-4 py-3 text-sm font-medium text-foreground"
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
