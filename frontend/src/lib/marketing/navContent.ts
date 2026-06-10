export interface PastelFeatureCard {
  id: string;
  tone: 'peach' | 'sky';
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  visual: 'cartoon-ai' | 'workflow-mockup';
}

export const pastelFeatureCards: PastelFeatureCard[] = [
  {
    id: 'ai-tools',
    tone: 'peach',
    title: 'Scale faster with AI agents & automation',
    body: 'WhatsApp AI, voice agents, lead qualification, CRM automation, and workflow systems — everything your team needs to move faster without losing quality.',
    cta: 'Explore AI solutions',
    ctaHref: '/services#ai-agents',
    visual: 'cartoon-ai',
  },
  {
    id: 'workflows',
    tone: 'sky',
    title: 'Structured systems for every business role',
    body: 'Startups, agencies, and enterprises each get clear workspaces — dashboards, pipelines, analytics, and client portals without spreadsheet chaos.',
    cta: 'Explore platforms',
    ctaHref: '/services#saas',
    visual: 'workflow-mockup',
  },
];

export interface MegaMenuColumn {
  title: string;
  links: { label: string; href: string; description?: string }[];
}

export interface MegaMenuConfig {
  id: string;
  label: string;
  /** Primary page — clicking the nav label navigates here */
  href: string;
  columns: MegaMenuColumn[];
  featured?: { title: string; body: string; href: string; cta: string };
}

export const navMegaMenus: MegaMenuConfig[] = [
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    columns: [
      {
        title: 'AI & Intelligence',
        links: [
          { label: 'AI Agents & Solutions', href: '/services#ai-agents', description: 'WhatsApp, voice, support, RAG assistants' },
          { label: 'Computer Vision', href: '/services#cv', description: 'Face recognition, attendance, access control' },
          { label: 'Data & Analytics', href: '/services#analytics', description: 'Power BI, KPI monitoring, reporting' },
        ],
      },
      {
        title: 'Automation & Platforms',
        links: [
          { label: 'Automation Solutions', href: '/services#automation', description: 'Email, CRM, workflow, document processing' },
          { label: 'SaaS Development', href: '/services#saas', description: 'MVPs, multi-tenant, subscription systems' },
          { label: 'CRM & Business Systems', href: '/services#crm', description: 'Lead, sales, recruitment, pharma CRM' },
        ],
      },
      {
        title: 'Web & Experience',
        links: [
          { label: 'Web Development', href: '/services#web', description: 'Corporate sites, landing pages, enterprise apps' },
          { label: 'Progressive Web Apps', href: '/services#pwa', description: 'Installable, offline, push notifications' },
          { label: '3D & Virtual Experiences', href: '/services#3d', description: 'Virtual tours, product demos, presentations' },
        ],
      },
      {
        title: 'Industry Solutions',
        links: [
          { label: 'Recruitment & HR Tech', href: '/services#recruitment', description: 'ATS, candidate portals, AI matching' },
          { label: 'Pharma Technology', href: '/services#pharma', description: 'SFA, DCR, e-detailing, doctor engagement' },
          { label: 'Digital Marketing & Branding', href: '/services#marketing', description: 'SEO, lead gen, logo & identity design' },
        ],
      },
    ],
    featured: {
      title: 'Need a custom build?',
      body: 'Tell us your requirement — we design and deliver end-to-end intelligent systems.',
      href: '/contact',
      cta: 'Talk to us',
    },
  },
  {
    id: 'industries',
    label: 'Industries',
    href: '/industries',
    columns: [
      {
        title: 'Enterprise & Regulated',
        links: [
          { label: 'Pharmaceutical', href: '/industries#pharma', description: 'SFA, DCR, doctor engagement' },
          { label: 'Manufacturing', href: '/industries#manufacturing', description: 'CRM, automation, dashboards' },
          { label: 'Professional Services', href: '/industries#professional', description: 'Legal, HR, consulting firms' },
        ],
      },
      {
        title: 'Growth & Talent',
        links: [
          { label: 'Recruitment & HR', href: '/industries#recruitment', description: 'ATS, portals, AI matching' },
          { label: 'Startups & SaaS', href: '/industries#startups', description: 'MVPs, platforms, AI products' },
          { label: 'Marketing & Agencies', href: '/industries#agencies', description: 'CRM, lead gen, automation' },
        ],
      },
      {
        title: 'Markets & Media',
        links: [
          { label: 'Real Estate', href: '/industries#realestate', description: 'CRM, virtual tours, lead systems' },
          { label: 'Events & Media', href: '/industries#events', description: 'Registration, attendee CRM' },
          { label: 'Education', href: '/industries#education', description: 'Learning platforms, AI assistants' },
        ],
      },
    ],
    featured: {
      title: 'See what we deliver',
      body: 'SFA systems, recruitment platforms, AI lead gen, CRM, and automation across sectors.',
      href: '/industries',
      cta: 'View industries',
    },
  },
];

export const simpleNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];
