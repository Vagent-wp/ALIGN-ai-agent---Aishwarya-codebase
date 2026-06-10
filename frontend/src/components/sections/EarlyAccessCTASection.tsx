import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

export function EarlyAccessCTASection() {
  return (
    <section className="pb-16 pt-4 md:pb-24">
      <div className="page-shell">
        <div className="dashboard-panel mx-auto max-w-2xl p-8 text-center md:p-10">
          <p className="section-title">Join the Network</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Be among the first to experience {BRAND.platform}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground md:text-base">
            Join the waitlist and get priority access when we launch. Limited spots for founding members.
          </p>
          <Link
            to="/onboarding"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90 active:scale-[0.97] sm:w-auto"
          >
            Start onboarding
          </Link>
        </div>
      </div>
    </section>
  );
}
