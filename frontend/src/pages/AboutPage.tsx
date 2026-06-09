import { SectionHeading } from '@/components/shared/SectionTitle';
import { BRAND } from '@/lib/brand';

export function AboutPage() {
  return (
    <div className="page-shell py-10 md:py-16">
      <SectionHeading
        title={`About ${BRAND.company}`}
        subtitle={`${BRAND.expansion} — building intelligent ecosystems where people, businesses, opportunities, and communities connect and grow.`}
      />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="dashboard-panel p-6 md:p-8">
          <p className="section-title text-left">{BRAND.platform}</p>
          <h2 className="mt-2 text-xl font-semibold">The platform</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {BRAND.platform} is a business discovery, opportunity matching, professional networking, and
            collaboration ecosystem. Founders, startups, businesses, agencies, freelancers, consultants,
            students, job seekers, investors, mentors, recruiters, professionals, service providers, and
            communities — all in one place.
          </p>
        </div>

        <div className="dashboard-panel p-6 md:p-8">
          <p className="section-title text-left">{BRAND.assistant}</p>
          <h2 className="mt-2 text-xl font-semibold">The AI assistant</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {BRAND.assistant} is the {BRAND.assistantRole}. She lives on WhatsApp and helps you describe
            requirements naturally — then discovers the most relevant people, businesses, opportunities, and
            solutions across the network.
          </p>
          <p className="mt-4 rounded-xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Example:</span> You say &ldquo;I need a React developer in Pune.&rdquo;{' '}
            {BRAND.assistant} finds relevant developers, agencies, and startups that match your requirement.
          </p>
        </div>

        <div className="dashboard-panel p-6 md:p-8">
          <p className="section-title text-left">Brand story</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            Opportunities exist. People exist. But finding the right people, services, businesses, partners,
            jobs, clients, and opportunities is still fragmented.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {BRAND.company} created {BRAND.platform} to bring everything together into one intelligent
            ecosystem — powered by {BRAND.assistant}, so users can simply describe what they need and
            discover what matters.
          </p>
        </div>

        <div className="dashboard-panel p-6 md:p-8">
          <p className="section-title text-left">Our mission</p>
          <p className="mt-2 text-base leading-relaxed md:text-lg">
            <strong className="text-foreground">{BRAND.taglineAlt}</strong> — {BRAND.taglinePrimary}
            Building intelligent ecosystems where people, businesses, opportunities, services, knowledge,
            and communities can connect and grow.
          </p>
        </div>
      </div>
    </div>
  );
}
