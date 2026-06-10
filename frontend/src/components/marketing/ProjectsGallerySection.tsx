import { useNavigate } from 'react-router-dom';
import { PortfolioGallery } from '@/components/ui/portfolio-gallery';
import { portfolioProjects } from '@/lib/marketing/projects';

/** Show 8 flagship projects on homepage for cleaner 3D fan layout */
const homepageProjects = portfolioProjects.slice(0, 8);

export function ProjectsGallerySection() {
  const navigate = useNavigate();

  return (
    <PortfolioGallery
      variant="section"
      title="Projects We've Delivered"
      subtitle="Real platforms built for pharma, recruitment, AI, CRM, SaaS, real estate, events, and analytics — click any card to explore."
      archiveButton={{ text: 'View all projects', href: '/projects' }}
      images={homepageProjects.map((p) => ({
        src: p.image,
        alt: p.title,
        title: p.title,
        slug: p.slug,
      }))}
      onImageClick={(index) => {
        const project = homepageProjects[index];
        if (project) navigate(`/projects/${project.slug}`);
      }}
    />
  );
}
