import { Link } from 'react-router-dom';
import { IndustriesSection } from '@/components/marketing/IndustriesSection';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { industries } from '@/lib/marketing/content';

export function IndustriesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section border-b border-[var(--color-ash)] !pb-10 !pt-8 md:!pb-14 md:!pt-10">
        <div className="inv-container">
          <InvLabel>Industries we serve</InvLabel>
          <h1 className="inv-heading-lg mt-4 max-w-3xl">
            Technology built for{' '}
            <span className="inv-accent-blue">your sector</span>
          </h1>
          <p className="inv-body mt-4 max-w-2xl">
            Pharmaceutical, recruitment, SaaS, real estate, events, manufacturing, education, and more — with solutions
            tailored to how your industry operates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inv-btn-black">
              Discuss your industry
            </Link>
            <Link to="/projects" className="inv-btn-ghost">
              View case studies
            </Link>
          </div>
          <p className="inv-body-sm mt-6 text-[var(--color-steel)]">
            {industries.length} industry verticals · Regulated & high-growth sectors
          </p>
        </div>
      </section>

      <IndustriesSection standalone />
    </div>
  );
}
