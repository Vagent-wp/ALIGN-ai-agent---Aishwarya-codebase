import { SectionHeading, SectionTitle } from '@/components/shared/SectionTitle';
import { BRAND } from '@/lib/brand';

export function CommunityVisionSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="page-shell">
        <div className="dashboard-panel overflow-hidden p-6 md:p-10">
          <SectionTitle className="text-left">Community Vision</SectionTitle>
          <SectionHeading
            className="text-left md:text-left [&_h2]:text-left [&_p]:mx-0"
            title="Building intelligent ecosystems"
            subtitle={`${BRAND.company} is creating a network where opportunities find people — not the other way around. A place where founders, freelancers, agencies, mentors, and professionals thrive together.`}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-background p-4">
              <h3 className="text-sm font-semibold">Inclusive ecosystem</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                From students to investors — everyone belongs on {BRAND.platform}.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background p-4">
              <h3 className="text-sm font-semibold">Human-first AI</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {BRAND.assistant} amplifies human connection — she never replaces it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
