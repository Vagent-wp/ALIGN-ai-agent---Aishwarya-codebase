import { Link } from 'react-router-dom';
import { IndustriesSection } from '@/components/marketing/IndustriesSection';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { industries } from '@/lib/marketing/content';

export function IndustriesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-[#23252a] pt-6 pb-10 md:pt-10 md:pb-14">
        <div className="marketing-container px-6">
          <SectionHeader
            eyebrow="Industries we serve"
            title="Technology built for your sector"
            subtitle="Pharmaceutical, recruitment, SaaS, real estate, events, manufacturing, education, and more — with solutions tailored to how your industry operates."
            align="left"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="linear-btn-primary">
              Discuss your industry
            </Link>
            <Link to="/projects" className="linear-btn-ghost border border-[#23252a] px-6">
              View case studies
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#62666d]">
            {industries.length} industry verticals · Regulated & high-growth sectors
          </p>
        </div>
      </section>

      <IndustriesSection standalone />
    </div>
  );
}
