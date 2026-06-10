import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectBySlug, portfolioProjects } from '@/lib/marketing/projects';
import { NetworkDashboardMockup } from '@/components/marketing/mockups/ProductMockups';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
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
    <div className="overflow-x-hidden">
      <section className="inv-section !pt-8 md:!pt-10">
        <div className="inv-container">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 inv-body-sm text-[var(--color-steel)] transition-colors hover:text-[var(--color-carbon-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <InvLabel>{project.industry}</InvLabel>
              <h1 className="inv-heading-lg mt-3">{project.title}</h1>
              <p className="inv-body mt-3 max-w-2xl">{project.summary}</p>
            </div>
            <Link to="/contact" className="inv-btn-black shrink-0">
              Build something similar
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--color-ash)] shadow-sm">
            <img src={project.image} alt={project.title} className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
          </div>

          <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1fr_320px]">
            <div className="inv-card order-2 overflow-hidden p-2 sm:p-4 lg:order-1">
              <p className="inv-label mb-3 px-2">Live dashboard preview</p>
              <NetworkDashboardMockup className="h-auto w-full" />
            </div>

            <div className="order-1 space-y-4 sm:space-y-6 lg:order-2">
              <div className="inv-card p-6">
                <p className="inv-label">Key metrics</p>
                <div className="mt-4 grid gap-3">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[var(--color-ash)] bg-[var(--color-mist)]/50 px-4 py-3"
                    >
                      <p className="inv-heading !text-xl tabular-nums text-[var(--color-align-blue)]">{stat.value}</p>
                      <p className="inv-body-sm text-[var(--color-steel)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inv-card p-6">
                <p className="inv-label">Delivered features</p>
                <ul className="mt-4 space-y-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="inv-body-sm before:mr-2 before:text-[var(--color-align-orange)] before:content-['·']"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {nextProject && (
            <div className="inv-feature-band inv-feature-band--sky mt-10 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="inv-label">Next project</p>
                <p className="inv-heading mt-1 !text-lg">{nextProject.title}</p>
              </div>
              <Link to={`/projects/${nextProject.slug}`} className="inv-link inline-flex">
                View dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
