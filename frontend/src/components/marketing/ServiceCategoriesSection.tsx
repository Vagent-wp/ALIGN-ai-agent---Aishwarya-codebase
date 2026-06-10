import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { serviceCategories } from '@/lib/marketing/content';
import { pastelTones, toneCycle } from '@/lib/marketing/pastelColors';
import { cn } from '@/lib/utils';

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-foreground/85 before:mr-2 before:content-['·']">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceCategoriesSection() {
  const [activeId, setActiveId] = useState(serviceCategories[0]?.id ?? '');

  const active = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];

  return (
    <section id="services" className="marketing-section pastel-card-sky scroll-mt-20">
      <div className="marketing-container">
        <SectionHeader
          eyebrow="Core Service Categories"
          title="Everything you need to scale with intelligent systems"
          subtitle="From AI agents and automation to SaaS, CRM, web apps, and immersive 3D experiences — built for your business."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-8">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {serviceCategories.map((cat, i) => {
              const tone = toneCycle[i % toneCycle.length];
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    'shrink-0 rounded-2xl border px-4 py-3 text-left transition-all duration-200 lg:w-full',
                    pastelTones[tone].cardClass,
                    isActive
                      ? 'ring-2 ring-primary/40 shadow-md'
                      : 'opacity-80 hover:opacity-100 hover:shadow-sm'
                  )}
                >
                  <p className="font-poppins text-sm font-bold text-foreground sm:text-base">{cat.title}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-poppins text-xl font-bold sm:text-2xl">{active.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{active.summary}</p>

                <div className="mt-6 space-y-6">
                  <DetailList title="Services" items={active.services} />
                  {active.useCases && <DetailList title="Use Cases" items={active.useCases} />}
                  {active.examples && <DetailList title="Examples" items={active.examples} />}
                  {active.features && <DetailList title="Features" items={active.features} />}
                  {active.benefits && <DetailList title="Benefits" items={active.benefits} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
