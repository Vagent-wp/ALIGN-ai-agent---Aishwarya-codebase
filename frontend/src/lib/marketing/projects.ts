export interface PortfolioProject {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  image: string;
  features: string[];
  stats: { label: string; value: string }[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'pharma-sfa-portal',
    title: 'Pharma SFA Portal',
    industry: 'Pharmaceutical',
    summary: 'Sales force automation with tour planning, doctor engagement, and field reporting for pharmaceutical teams.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    features: ['SFA workflows', 'DCR management', 'Doctor engagement', 'Tour programs', 'Reporting dashboards'],
    stats: [
      { label: 'Field reps', value: '120+' },
      { label: 'Daily visits', value: '2.4k' },
      { label: 'Reports auto', value: '98%' },
    ],
  },
  {
    slug: 'recruitment-platform',
    title: 'Recruitment Platform',
    industry: 'Recruitment & HR',
    summary: 'End-to-end hiring platform with candidate portals, resume search, and AI-assisted matching.',
    image: 'https://images.unsplash.com/photo-1521737710482-874986f9d662?w=800&h=600&fit=crop&q=80',
    features: ['Applicant tracking', 'Candidate portals', 'Resume search', 'AI matching', 'Recruiter dashboards'],
    stats: [
      { label: 'Candidates', value: '18k+' },
      { label: 'Match accuracy', value: '92%' },
      { label: 'Time to hire', value: '-40%' },
    ],
  },
  {
    slug: 'ai-lead-generation',
    title: 'AI Lead Generation System',
    industry: 'Marketing & Agencies',
    summary: 'Intelligent lead capture, qualification, and routing with WhatsApp and voice AI integrations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    features: ['Lead scoring', 'WhatsApp agents', 'Voice AI', 'CRM sync', 'Automated follow-ups'],
    stats: [
      { label: 'Leads / month', value: '12k+' },
      { label: 'Qualified rate', value: '67%' },
      { label: 'Response time', value: '< 2 min' },
    ],
  },
  {
    slug: 'whatsapp-ai-dashboard',
    title: 'WhatsApp AI Agent Hub',
    industry: 'AI Agents',
    summary: 'Central command for WhatsApp AI agents handling support, sales, and appointment booking.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80',
    features: ['Conversation analytics', 'Agent training', 'Broadcast flows', 'Human handoff', 'Multi-number support'],
    stats: [
      { label: 'Conversations', value: '45k+' },
      { label: 'Resolution rate', value: '89%' },
      { label: 'Avg. response', value: '8 sec' },
    ],
  },
  {
    slug: 'enterprise-crm',
    title: 'Enterprise CRM Platform',
    industry: 'Startups & SaaS',
    summary: 'Multi-team CRM with pipeline management, analytics, notifications, and role-based workspaces.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
    features: ['Lead tracking', 'Pipeline views', 'Team management', 'Reports', 'Workflow automation'],
    stats: [
      { label: 'Active deals', value: '3.2k' },
      { label: 'Teams', value: '24' },
      { label: 'Win rate', value: '+28%' },
    ],
  },
  {
    slug: 'saas-mvp-platform',
    title: 'Multi-Tenant SaaS MVP',
    industry: 'Startups & SaaS',
    summary: 'Subscription-ready SaaS foundation with admin portal, client portal, and billing integration.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
    features: ['Multi-tenant architecture', 'Subscription billing', 'Admin portal', 'User management', 'Analytics'],
    stats: [
      { label: 'Tenants', value: '150+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'MRR tracked', value: '₹48L+' },
    ],
  },
  {
    slug: 'real-estate-crm',
    title: 'Real Estate CRM',
    industry: 'Real Estate',
    summary: 'Property discovery, lead management, virtual tour integration, and sales pipeline for real estate teams.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80',
    features: ['Property listings', 'Virtual tours', 'Lead routing', 'Agent dashboards', 'Client portals'],
    stats: [
      { label: 'Listings', value: '2.8k' },
      { label: 'Site visits', value: '640+' },
      { label: 'Conversion', value: '+35%' },
    ],
  },
  {
    slug: 'event-management-platform',
    title: 'Event Management Platform',
    industry: 'Events & Media',
    summary: 'Event websites, registration flows, attendee management, and media lead capture systems.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80',
    features: ['Event microsites', 'Registration', 'Attendee CRM', 'Media leads', 'Post-event analytics'],
    stats: [
      { label: 'Events hosted', value: '120+' },
      { label: 'Registrations', value: '85k' },
      { label: 'Lead capture', value: '+52%' },
    ],
  },
  {
    slug: 'power-bi-analytics',
    title: 'Power BI Analytics Suite',
    industry: 'Data & Analytics',
    summary: 'Executive dashboards, KPI monitoring, and custom reporting for manufacturing and pharma clients.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    features: ['KPI dashboards', 'Scheduled reports', 'Data pipelines', 'Role-based views', 'Mobile dashboards'],
    stats: [
      { label: 'Dashboards', value: '45+' },
      { label: 'Data sources', value: '18' },
      { label: 'Report time', value: '-70%' },
    ],
  },
  {
    slug: 'align-network',
    title: 'ALIGN Network',
    industry: 'AI Ecosystem',
    summary: 'AI-powered business discovery and opportunity matching powered by Kaya.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
    features: ['Business discovery', 'Opportunity matching', 'Kaya AI agent', 'Network graph', 'Lead generation'],
    stats: [
      { label: 'Profiles', value: '10k+' },
      { label: 'Matches / day', value: '1.2k' },
      { label: 'Satisfaction', value: '94%' },
    ],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function portfolioGalleryImages() {
  return portfolioProjects.map((p) => ({
    src: p.image,
    alt: p.title,
    title: p.title,
    slug: p.slug,
  }));
}
