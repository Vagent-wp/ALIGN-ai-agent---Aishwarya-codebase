import { Sparkles } from 'lucide-react';
import { PortfolioPage, type PortfolioPageProps } from '@/components/ui/starfall-portfolio-landing';
import { SketchLucideIcon } from '@/components/marketing/invisible/SketchLucideIcon';
import { BRAND } from '@/lib/brand';

const UNSPLASH = {
  ecommerce:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=240&fit=crop&auto=format',
  dashboard:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=240&fit=crop&auto=format',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=480&h=240&fit=crop&auto=format',
} as const;

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full rounded-lg object-cover"
    />
  );
}

const alignPortfolioData: PortfolioPageProps = {
  logo: {
    initials: 'AL',
    name: 'ALIGN Agent Labs',
  },
  navLinks: [
    { label: 'Platform', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#skills' },
  ],
  resume: {
    label: 'View services',
    onClick: () => {
      window.location.href = '/services';
    },
  },
  hero: {
    titleLine1: `${BRAND.expansion} —`,
    titleLine2Gradient: BRAND.taglinePrimary,
    subtitle: `${BRAND.platform} and ${BRAND.assistant} connect people, businesses, and opportunities. AI agents, automation, and custom platforms built to scale.`,
  },
  ctaButtons: {
    primary: {
      label: 'Explore platform',
      onClick: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    secondary: {
      label: 'Talk to our team',
      onClick: () => {
        window.location.href = '/contact';
      },
    },
  },
  projects: [
    {
      title: 'E-commerce Platform',
      description: 'A scalable online store built with Next.js, TypeScript, and Stripe.',
      tags: ['Next.js', 'Stripe', 'Vercel'],
      imageContent: <ProjectImage src={UNSPLASH.ecommerce} alt="E-commerce checkout on laptop" />,
    },
    {
      title: 'SaaS Dashboard',
      description: 'Real-time analytics dashboard for a B2B software-as-a-service product.',
      tags: ['React', 'Chart.js', 'Firebase'],
      imageContent: <ProjectImage src={UNSPLASH.dashboard} alt="Analytics dashboard on screen" />,
    },
    {
      title: 'AI Content Generator',
      description: 'Leveraging OpenAI to generate marketing copy for businesses.',
      tags: ['SvelteKit', 'OpenAI', 'Tailwind CSS'],
      imageContent: (
        <div className="relative h-full w-full">
          <ProjectImage src={UNSPLASH.ai} alt="Abstract AI visualization" />
          <div className="absolute bottom-2 right-2">
            <SketchLucideIcon icon={Sparkles} accent="lime" size="sm" rotate={-6} />
          </div>
        </div>
      ),
    },
  ],
  stats: [
    { value: '13+', label: 'Service categories' },
    { value: '50+', label: 'Client projects' },
    { value: '99%', label: 'Client satisfaction' },
  ],
  showAnimatedBackground: true,
};

/** Full-page portfolio layout demo — wrap in `.marketing-invisible` for sketch styling */
export function StarfallPortfolioDemo() {
  return (
    <div className="marketing-invisible min-h-screen">
      <PortfolioPage {...alignPortfolioData} />
    </div>
  );
}

