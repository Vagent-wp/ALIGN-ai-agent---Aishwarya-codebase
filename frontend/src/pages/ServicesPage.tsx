import { Link } from 'react-router-dom';
import { ServiceCategoriesSection } from '@/components/marketing/ServiceCategoriesSection';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { serviceCategories } from '@/lib/marketing/content';

export function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-[#23252a] pt-6 pb-10 md:pt-10 md:pb-14">
        <div className="marketing-container px-6">
          <SectionHeader
            eyebrow="What we build"
            title="Services that scale your business with AI & intelligent systems"
            subtitle="From AI agents and automation to SaaS platforms, CRM, recruitment tech, pharma systems, and immersive experiences — end-to-end delivery for startups, agencies, and enterprises."
            align="left"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="linear-btn-primary">
              Discuss your project
            </Link>
            <Link to="/projects" className="linear-btn-ghost border border-[#23252a] px-6">
              View our work
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#62666d]">
            {serviceCategories.length} service categories · Custom builds · India & global delivery
          </p>
        </div>
      </section>

      <ServiceCategoriesSection standalone />
    </div>
  );
}
