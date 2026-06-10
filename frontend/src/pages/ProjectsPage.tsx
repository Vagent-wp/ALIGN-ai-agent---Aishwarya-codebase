import { useNavigate } from 'react-router-dom';
import { ExpandHoverGallerySection } from '@/components/ui/expand-hover-gallery';
import { portfolioProjects } from '@/lib/marketing/projects';

export function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <ExpandHoverGallerySection
      title="Our project portfolio"
      subtitle="Explore the platforms, dashboards, and intelligent systems we've built across industries."
      archiveButton={{ text: 'Discuss your project', href: '/contact' }}
      className="!pt-10"
      items={portfolioProjects.map((p) => ({
        src: p.image,
        alt: p.title,
        title: p.title,
        subtitle: p.industry,
        slug: p.slug,
      }))}
      onItemClick={(index) => {
        const project = portfolioProjects[index];
        if (project) navigate(`/projects/${project.slug}`);
      }}
    />
  );
}
