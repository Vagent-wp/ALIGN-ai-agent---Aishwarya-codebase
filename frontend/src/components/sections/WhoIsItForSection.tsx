import { SectionHeading, SectionTitle } from '@/components/shared/SectionTitle';
import { BRAND } from '@/lib/brand';

const audiences = [
  { label: 'Founders', desc: 'Find co-founders, mentors, and early team members' },
  { label: 'Freelancers', desc: 'Discover projects and clients that match your skills' },
  { label: 'Agencies', desc: 'Connect with businesses seeking your services' },
  { label: 'Businesses', desc: 'Source vendors, consultants, and partners' },
  { label: 'Students', desc: 'Explore internships, mentors, and startup roles' },
  { label: 'Professionals', desc: 'Grow your network and find new opportunities' },
];

export function WhoIsItForSection() {
  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="page-shell">
        <SectionTitle>Who Is It For</SectionTitle>
        <SectionHeading
          title="Built for the entire ecosystem"
          subtitle={`Whether you're building, hiring, selling, learning, or investing — ${BRAND.assistant} on ${BRAND.platform} connects you to the right people.`}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
          {audiences.map(({ label, desc }) => (
            <div key={label} className="dashboard-panel p-4 md:p-6">
              <h3 className="text-sm font-semibold md:text-base">{label}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground md:text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
