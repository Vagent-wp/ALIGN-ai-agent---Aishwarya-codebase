import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectBySlug, portfolioProjects } from '@/lib/marketing/projects';
import { NetworkDashboardMockup } from '@/components/marketing/mockups/ProductMockups';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function ProjectDashboardPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const currentIndex = portfolioProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  return (
    <div className="page-shell py-8 md:py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="marketing-eyebrow">{project.industry}</p>
          <h1 className="marketing-heading mt-2">{project.title}</h1>
          <p className="marketing-subtitle mt-3 max-w-2xl">{project.summary}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Build something similar
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border shadow-md ring-1 ring-black/[0.04]">
        <img src={project.image} alt={project.title} className="aspect-[21/9] w-full object-cover" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="dashboard-panel overflow-hidden p-2 sm:p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Live dashboard preview
          </p>
          <NetworkDashboardMockup className="h-auto w-full" />
        </div>

        <div className="space-y-6">
          <div className="dashboard-panel p-6">
            <p className="section-title text-left">Key metrics</p>
            <div className="mt-4 grid gap-3">
              {project.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                  <p className="font-poppins text-xl font-bold tabular-nums text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel p-6">
            <p className="section-title text-left">Delivered features</p>
            <ul className="mt-4 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="text-sm text-foreground/85 before:mr-2 before:content-['·']">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {nextProject && (
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl pastel-card-sky p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next project</p>
            <p className="mt-1 font-poppins text-lg font-bold">{nextProject.title}</p>
          </div>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
