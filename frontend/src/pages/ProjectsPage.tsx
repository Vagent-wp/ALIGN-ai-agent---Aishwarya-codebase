import { useNavigate } from 'react-router-dom';
import { PortfolioGallery } from '@/components/ui/portfolio-gallery';
import { portfolioGalleryImages, portfolioProjects } from '@/lib/marketing/projects';

export function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <PortfolioGallery
      variant="page"
      title="Our Project Portfolio"
      subtitle="Explore the platforms, dashboards, and intelligent systems we've built across industries."
      archiveButton={{ text: 'Discuss your project', href: '/contact' }}
      images={portfolioGalleryImages()}
      className="min-h-0 py-10 md:py-16"
      onImageClick={(index) => {
        const project = portfolioProjects[index];
        if (project) navigate(`/projects/${project.slug}`);
      }}
    />
  );
}
