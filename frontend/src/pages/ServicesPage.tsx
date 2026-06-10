import { Link } from 'react-router-dom';
import { ServiceCategoriesSection } from '@/components/marketing/ServiceCategoriesSection';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { serviceCategories } from '@/lib/marketing/content';

export function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section border-b border-[var(--color-ash)] !pb-10 !pt-8 md:!pb-14 md:!pt-10">
        <div className="inv-container">
          <InvLabel>What we build</InvLabel>
          <h1 className="inv-heading-lg mt-4 max-w-3xl">
            Services that scale your business with{' '}
            <span className="inv-accent-blue">AI & intelligent systems</span>
          </h1>
          <p className="inv-body mt-4 max-w-2xl">
            From AI agents and automation to SaaS platforms, CRM, recruitment tech, pharma systems, and immersive
            experiences — end-to-end delivery for startups, agencies, and enterprises.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inv-btn-black">
              Discuss your project
            </Link>
            <Link to="/projects" className="inv-btn-ghost">
              View our work
            </Link>
          </div>
          <p className="inv-body-sm mt-6 text-[var(--color-steel)]">
            {serviceCategories.length} service categories · Custom builds · India & global delivery
          </p>
        </div>
      </section>

      <ServiceCategoriesSection standalone />
    </div>
  );
}
