import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  Clapperboard,
  Factory,
  FlaskConical,
  GraduationCap,
  Megaphone,
  Rocket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { InvLabel, TwoToneHeadline } from '@/components/marketing/invisible/Editorial';
import { useHashSection } from '@/hooks/useHashSection';
import { industries, type IndustryItem } from '@/lib/marketing/content';
import { cn } from '@/lib/utils';

interface IndustriesSectionProps {
  standalone?: boolean;
}

const INDUSTRY_IDS = industries.map((i) => i.id);

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  pharma: FlaskConical,
  events: Clapperboard,
  recruitment: Users,
  startups: Rocket,
  agencies: Megaphone,
  realestate: Building2,
  manufacturing: Factory,
  education: GraduationCap,
};

function SolutionCard({ title, index }: { title: string; index: number }) {
  return (
    <li className="group relative flex h-full min-h-[76px] list-none items-center overflow-hidden rounded-xl border border-[var(--color-ash)] bg-[var(--color-canvas-white)] p-4 sm:min-h-[84px] sm:p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />
      <div className="relative flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-mist)] text-[11px] font-medium tabular-nums text-[var(--color-steel)] transition-colors group-hover:bg-[var(--color-ice-blue)] group-hover:text-[var(--color-cobalt-spark)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-medium leading-snug text-[var(--color-carbon-ink)] sm:text-[15px]">
            {title}
          </span>
        </div>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-[var(--color-steel)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      </div>
    </li>
  );
}

function IndustryPanel({ industry }: { industry: IndustryItem }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-12 xl:gap-14">
      <div className="flex flex-col justify-between gap-8 lg:min-h-[300px] lg:gap-10">
        <div>
          <span className="inv-pill-badge w-fit normal-case tracking-normal">Solutions delivered</span>
          <h3 className="inv-heading mt-4 !text-2xl sm:!text-3xl lg:!text-[2rem] lg:!leading-[1.15]">
            {industry.title}
          </h3>
          <p className="inv-body mt-4 max-w-md leading-relaxed text-[var(--color-steel)]">{industry.summary}</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-ash)] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 sm:pt-7">
          <Link to="/contact" className="inv-btn-black w-full text-center text-sm sm:w-auto">
            Discuss {industry.title.toLowerCase()} solutions
          </Link>
          <Link to="/projects" className="inv-link justify-center text-sm sm:justify-start">
            View projects
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {industry.projects.map((project, index) => (
          <SolutionCard key={project} title={project} index={index} />
        ))}
      </ul>
    </div>
  );
}

export function IndustriesSection({ standalone = false }: IndustriesSectionProps) {
  const { activeId, selectSection } = useHashSection(
    INDUSTRY_IDS,
    industries[0]?.id ?? '',
    { pagePath: '/industries', scrollOnSelect: false, scrollOffset: 96 },
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

        <div className={cn(!standalone && 'mt-8 sm:mt-10')}>
          <div id={active.id} className="scroll-mt-24">
            <div className="inv-scroll-tabs -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
              {industries.map((ind) => {
                const Icon = INDUSTRY_ICONS[ind.id] ?? Rocket;
                const isActive = ind.id === activeId;

                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => selectIndustry(ind.id)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'border border-[rgba(37,99,235,0.12)] bg-[var(--color-mist)] text-[var(--color-carbon-ink)] shadow-sm'
                        : 'border border-transparent text-[var(--color-steel)] hover:bg-[var(--color-mist)]/70 hover:text-[var(--color-carbon-ink)]'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {ind.title}
                  </button>
                );
              })}
            </div>

            <div className="inv-card mt-6 overflow-hidden rounded-2xl !border-[var(--color-ash)] !bg-[var(--color-mist)]/35 !p-6 sm:mt-8 sm:!p-8 lg:!p-10 xl:!p-12">
              <IndustryPanel industry={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
