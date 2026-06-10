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
    ctaHref: '/#services',
    visual: 'cartoon-ai',
  },
  {
    id: 'workflows',
    tone: 'sky',
    title: 'Structured systems for every business role',
    body: 'Startups, agencies, and enterprises each get clear workspaces — dashboards, pipelines, analytics, and client portals without spreadsheet chaos.',
    cta: 'Explore platforms',
    ctaHref: '/#products',
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
  columns: MegaMenuColumn[];
  featured?: { title: string; body: string; href: string; cta: string };
}

export const navMegaMenus: MegaMenuConfig[] = [
  {
    id: 'services',
    label: 'Services',
    columns: [
      {
        title: 'AI & Intelligence',
        links: [
          { label: 'AI Agents & Solutions', href: '/#services', description: 'WhatsApp, voice, support, RAG assistants' },
          { label: 'Computer Vision', href: '/#services', description: 'Face recognition, attendance, access control' },
          { label: 'Data & Analytics', href: '/#services', description: 'Power BI, KPI monitoring, reporting' },
        ],
      },
      {
        title: 'Automation & Platforms',
        links: [
          { label: 'Automation Solutions', href: '/#services', description: 'Email, CRM, workflow, document processing' },
          { label: 'SaaS Development', href: '/#services', description: 'MVPs, multi-tenant, subscription systems' },
          { label: 'CRM & Business Systems', href: '/#services', description: 'Lead, sales, recruitment, pharma CRM' },
        ],
      },
      {
        title: 'Web & Experience',
        links: [
          { label: 'Web Development', href: '/#services', description: 'Corporate sites, landing pages, enterprise apps' },
          { label: 'Progressive Web Apps', href: '/#services', description: 'Installable, offline, push notifications' },
          { label: '3D & Virtual Experiences', href: '/#services', description: 'Virtual tours, product demos, presentations' },
        ],
      },
      {
        title: 'Industry Solutions',
        links: [
          { label: 'Recruitment & HR Tech', href: '/#services', description: 'ATS, candidate portals, AI matching' },
          { label: 'Pharma Technology', href: '/#services', description: 'SFA, DCR, e-detailing, doctor engagement' },
          { label: 'Digital Marketing & Branding', href: '/#services', description: 'SEO, lead gen, logo & identity design' },
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
    columns: [
      {
        title: 'Enterprise & Regulated',
        links: [
          { label: 'Pharmaceutical', href: '/#industries' },
          { label: 'Manufacturing', href: '/#industries' },
          { label: 'Professional Services', href: '/#industries' },
        ],
      },
      {
        title: 'Growth & Talent',
        links: [
          { label: 'Recruitment & HR', href: '/#industries' },
          { label: 'Startups & SaaS', href: '/#industries' },
          { label: 'Marketing & Agencies', href: '/#industries' },
        ],
      },
      {
        title: 'Markets & Media',
        links: [
          { label: 'Real Estate', href: '/#industries' },
          { label: 'Events & Media', href: '/#industries' },
          { label: 'Education', href: '/#industries' },
        ],
      },
    ],
    featured: {
      title: 'See what we deliver',
      body: 'SFA systems, recruitment platforms, AI lead gen, CRM, and automation across sectors.',
      href: '/#industries',
      cta: 'View industries',
    },
  },
  {
    id: 'products',
    label: 'Products',
    columns: [
      {
        title: 'ALIGN Ecosystem',
        links: [
          { label: 'ALIGN Network', href: '/#products', description: 'Business discovery & opportunity ecosystem' },
          { label: 'Aishwarya AI', href: '/#products', description: 'Intelligent business matchmaking assistant' },
        ],
      },
      {
        title: 'Get started',
        links: [
          { label: 'Early Access', href: '/early-access', description: 'Join the ALIGN Network waitlist' },
          { label: 'About Aishwarya', href: '/about', description: 'How our AI assistant works' },
          { label: 'Contact Sales', href: '/contact', description: 'Discuss your project requirements' },
        ],
      },
    ],
    featured: {
      title: 'Where Opportunities Find People.',
      body: 'Connect founders, businesses, agencies, investors, and professionals in one intelligent network.',
      href: '/early-access',
      cta: 'Get early access',
    },
  },
];

export const simpleNavLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];
