import { ClampReadMore } from '@/components/marketing/invisible/ClampReadMore';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { BRAND } from '@/lib/brand';

export function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section">
        <div className="inv-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <InvLabel>About us</InvLabel>
            <h1 className="inv-heading-lg mt-4">About {BRAND.company}</h1>
            <p className="inv-body mt-4">
              {BRAND.expansion} — building intelligent ecosystems where people, businesses, opportunities, and
              communities connect and grow.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl auto-rows-fr grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="inv-card inv-grid-card flex h-full flex-col p-5 sm:p-6 md:p-8">
              <InvLabel>{BRAND.platform}</InvLabel>
              <h2 className="inv-heading mt-3 !text-lg sm:!text-xl">The platform</h2>
              <ClampReadMore
                className="inv-body mt-3 sm:mt-4"
                text={`${BRAND.platform} is a business discovery, opportunity matching, professional networking, and collaboration ecosystem. Founders, startups, businesses, agencies, freelancers, consultants, students, job seekers, investors, mentors, recruiters, professionals, service providers, and communities — all in one place.`}
              />
            </div>

            <div className="inv-card inv-grid-card flex h-full flex-col p-5 sm:p-6 md:p-8">
              <InvLabel>{BRAND.assistant}</InvLabel>
              <h2 className="inv-heading mt-3 !text-lg sm:!text-xl">The AI assistant</h2>
              <ClampReadMore
                className="inv-body mt-3 sm:mt-4"
                text={`${BRAND.assistant} is the ${BRAND.assistantRole}. She lives on WhatsApp and helps you describe requirements naturally — then discovers the most relevant people, businesses, opportunities, and solutions across the network.`}
              />
              <p className="inv-body-sm mt-3 rounded-xl border border-[var(--color-ash)] bg-[var(--color-mist)]/50 p-3 sm:mt-4 sm:p-4">
                <span className="font-medium text-[var(--color-carbon-ink)]">Example:</span>{' '}
                You say &ldquo;I need a React developer in Pune.&rdquo; {BRAND.assistant} finds relevant developers,
                agencies, and startups that match your requirement.
              </p>
            </div>

            <div className="inv-card inv-grid-card flex h-full flex-col p-5 sm:p-6 md:p-8">
              <InvLabel>Brand story</InvLabel>
              <ClampReadMore
                className="inv-body mt-3"
                text={`Opportunities exist. People exist. But finding the right people, services, businesses, partners, jobs, clients, and opportunities is still fragmented. ${BRAND.company} created ${BRAND.platform} to bring everything together into one intelligent ecosystem — powered by ${BRAND.assistant}, so users can simply describe what they need and discover what matters.`}
              />
            </div>

            <div className="inv-card p-5 sm:col-span-2 sm:p-6 md:p-8">
              <InvLabel>Our mission</InvLabel>
              <p className="inv-body mt-3">
                <strong className="text-[var(--color-carbon-ink)]">{BRAND.taglineAlt}</strong> — {BRAND.taglinePrimary}
                Building intelligent ecosystems where people, businesses, opportunities, services, knowledge,
                and communities can connect and grow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
