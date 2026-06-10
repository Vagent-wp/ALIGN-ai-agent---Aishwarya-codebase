import { useNavigate } from 'react-router-dom';
import { ExpandHoverGallerySection } from '@/components/ui/expand-hover-gallery';
import { portfolioProjects } from '@/lib/marketing/projects';

const homepageProjects = portfolioProjects.slice(0, 6);

export function ProjectsGallerySection() {
  const navigate = useNavigate();

  return (
    <ExpandHoverGallerySection
      title="Projects we've delivered"
      subtitle="Real platforms built for pharma, recruitment, AI, CRM, SaaS, real estate, events, and analytics — hover to explore, click to open."
      archiveButton={{ text: 'View all projects', href: '/projects' }}
      items={homepageProjects.map((p) => ({
        src: p.image,
        alt: p.title,
        title: p.title,
        subtitle: p.industry,
        slug: p.slug,
      }))}
      onItemClick={(index) => {
        const project = homepageProjects[index];
        if (project) navigate(`/projects/${project.slug}`);
      }}
    />
  );
}
