import { BRAND } from '@/lib/brand';

export const heroTypewriterPhrases = [
  'through intelligent systems',
  'with AI & automation',
  'that help businesses scale',
  'for founders, teams, and enterprises',
];

export const heroTrustBullets = [
  'AI agents & automation',
  'End-to-end SaaS development',
  'Enterprise-ready systems',
];

export const marqueeIndustries = [
  'Pharmaceutical',
  'Recruitment & HR',
  'Startups & SaaS',
  'Events & Media',
  'Real Estate',
  'Manufacturing',
  'Education',
];

export interface ServiceCategory {
  id: string;
  title: string;
  summary: string;
  services: string[];
  examples?: string[];
  useCases?: string[];
  features?: string[];
  benefits?: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents & AI Solutions',
    summary: 'Transform customer interactions, support, sales, and operations using AI-powered systems.',
    services: [
      'WhatsApp AI Agents', 'Voice AI Agents', 'Customer Support AI', 'Lead Qualification AI',
      'Recruitment AI', 'Knowledge Base AI', 'Business Discovery AI', 'RAG-Based AI Assistants',
      'Internal Company AI Assistants', 'Custom AI Agent Development',
    ],
    useCases: ['Lead Generation', 'Customer Support', 'Recruitment', 'Knowledge Management', 'Appointment Booking', 'Sales Automation', 'Business Discovery'],
  },
  {
    id: 'automation',
    title: 'Automation Solutions',
    summary: 'Reduce manual work and improve operational efficiency.',
    services: ['WhatsApp Automation', 'Email Automation', 'CRM Automation', 'Workflow Automation', 'Document Processing Automation', 'Lead Routing Automation', 'Notification Systems', 'Follow-Up Automation'],
    examples: ['Auto download and process email attachments', 'Lead qualification and assignment', 'Automated reporting', 'CRM synchronization'],
  },
  {
    id: 'saas',
    title: 'SaaS Product Development',
    summary: 'End-to-end SaaS platform development.',
    services: ['SaaS MVP Development', 'Multi-Tenant SaaS Platforms', 'Subscription Systems', 'User Management Systems', 'Admin Portals', 'Client Portals', 'Enterprise Dashboards'],
    examples: ['Recruitment Platforms', 'CRM Systems', 'SFA Systems', 'Marketplace Platforms', 'Internal Business Tools'],
  },
  {
    id: 'crm',
    title: 'CRM & Business Management Systems',
    summary: 'Build systems that centralize operations.',
    services: ['Lead Management CRM', 'Sales CRM', 'Recruitment CRM', 'Pharma CRM', 'Customer Support CRM', 'Workflow Management Systems', 'Business Dashboards'],
    features: ['Lead Tracking', 'Pipeline Management', 'Team Management', 'Analytics', 'Notifications', 'Reports'],
  },
  {
    id: 'web',
    title: 'Web Development',
    summary: 'Professional business websites and web applications.',
    services: ['Startup Websites', 'Corporate Websites', 'Product Websites', 'Landing Pages', 'Portfolio Websites', 'Enterprise Web Applications'],
    features: ['Responsive Design', 'SEO Ready', 'Fast Performance', 'CMS Integration', 'Analytics Integration'],
  },
  {
    id: 'pwa',
    title: 'Progressive Web Apps (PWA)',
    summary: 'Build applications that work like mobile apps.',
    services: ['PWA Development', 'Mobile Dashboards', 'Offline Applications', 'Installable Business Apps'],
    benefits: ['Android Support', 'iPhone Support', 'Push Notifications', 'Offline Access'],
  },
  {
    id: 'recruitment',
    title: 'Recruitment & HR Technology',
    summary: 'Technology solutions for hiring and talent management.',
    services: ['Recruitment Platforms', 'Candidate Portals', 'Resume Search Systems', 'Applicant Tracking Systems', 'AI Candidate Matching', 'Recruitment Dashboards'],
  },
  {
    id: 'pharma',
    title: 'Pharma Technology Solutions',
    summary: 'Digital systems designed for pharmaceutical companies.',
    services: ['SFA Portals', 'DCR Systems', 'E-Detailing Platforms', 'Tour Program Management', 'Doctor Engagement Systems', 'Pharma CRM Solutions'],
  },
  {
    id: 'cv',
    title: 'Computer Vision Solutions',
    summary: 'AI-powered visual recognition systems.',
    services: ['Face Recognition Systems', 'Attendance Management', 'Identity Verification', 'Access Control Systems'],
  },
  {
    id: 'analytics',
    title: 'Data & Analytics',
    summary: 'Turn data into actionable insights.',
    services: ['Power BI Dashboards', 'Business Intelligence', 'KPI Monitoring', 'Reporting Systems', 'Custom Analytics Platforms'],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing & Growth',
    summary: 'Technology-driven marketing solutions.',
    services: ['SEO', 'Lead Generation Systems', 'Marketing Automation', 'AI-Powered Content Systems', 'GPT Ads Integration'],
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    summary: 'Build strong brand identities.',
    services: ['Logo Design', 'Brand Identity Design', 'Business Presentation Design', 'Corporate Branding', 'Marketing Creatives'],
  },
  {
    id: '3d',
    title: '3D & Virtual Experiences',
    summary: 'Immersive digital experiences.',
    services: ['Virtual Property Tours', 'Real Estate Visualization', 'Interactive Product Demonstrations', '3D Business Presentations'],
  },
];

export interface IndustryItem {
  id: string;
  title: string;
  label: string;
  summary: string;
  projects: string[];
}

export const industries: IndustryItem[] = [
  {
    id: 'pharma',
    title: 'Pharmaceutical',
    label: 'Pharmaceutical',
    summary: 'Field force automation, compliance workflows, and doctor engagement for regulated pharma operations.',
    projects: ['SFA Systems', 'DCR Management', 'E-Detailing', 'Doctor Engagement Platforms'],
  },
  {
    id: 'events',
    title: 'Events & Media',
    label: 'Events & Media',
    summary: 'Event platforms, AI lead capture, and automated outreach for media and live experiences.',
    projects: ['Event Management Website', 'AI Lead Generation Systems', 'WhatsApp Automation', 'Voice AI Systems'],
  },
  {
    id: 'recruitment',
    title: 'Recruitment & HR',
    label: 'Recruitment & HR',
    summary: 'Candidate portals, resume search, and ATS platforms built for high-volume hiring teams.',
    projects: ['Recruitment Platform', 'Candidate Portals', 'Resume Search Systems', 'ATS Solutions'],
  },
  {
    id: 'startups',
    title: 'Startups & SaaS',
    label: 'Startups & SaaS',
    summary: 'MVPs, SaaS products, and AI-native platforms designed to ship fast and scale cleanly.',
    projects: ['MVP Development', 'SaaS Platforms', 'AI Products', 'Automation Systems'],
  },
  {
    id: 'agencies',
    title: 'Marketing & Agencies',
    label: 'Marketing & Agencies',
    summary: 'CRM, lead gen, and automation stacks that help agencies run campaigns at scale.',
    projects: ['CRM Systems', 'Lead Generation Tools', 'WhatsApp Agents', 'Automation Platforms'],
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    label: 'Real Estate',
    summary: 'Lead systems, CRM, virtual tours, and property discovery for developers and brokerages.',
    projects: ['AI Lead Systems', 'CRM Platforms', 'Virtual Tours', 'Property Discovery Systems'],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    label: 'Manufacturing',
    summary: 'CRM, automation, and reporting dashboards for production and internal operations.',
    projects: ['CRM Systems', 'Business Automation', 'Reporting Dashboards', 'Internal Management Systems'],
  },
  {
    id: 'education',
    title: 'Education',
    label: 'Education',
    summary: 'Learning platforms, knowledge systems, and AI assistants for institutions and ed-tech.',
    projects: ['Learning Platforms', 'Knowledge Systems', 'AI Assistants', 'Student Portals'],
  },
];

export const whatWeDo = {
  headline: 'Building Intelligent Systems That Help Businesses Scale, Automate, and Grow',
  body: `${BRAND.company} helps startups, businesses, agencies, enterprises, and organizations automate operations, generate leads, improve efficiency, and build scalable digital ecosystems using AI, automation, software, and intelligent business systems.`,
};

export const brandStory = {
  problem: 'Opportunities exist. People exist. But finding the right people, services, businesses, partners, jobs, clients, and opportunities is still fragmented.',
  solution: `${BRAND.platform} brings everything together into one intelligent ecosystem. Powered by ${BRAND.assistant}, users can simply describe their requirements naturally and discover the most relevant people, businesses, opportunities, and solutions.`,
};

export const flagshipProducts = [
  {
    id: 'network',
    title: BRAND.platform,
    subtitle: 'An AI-powered business discovery and opportunity ecosystem.',
    connects: ['Founders', 'Startups', 'Businesses', 'Agencies', 'Freelancers', 'Investors', 'Recruiters', 'Students', 'Professionals'],
  },
  {
    id: 'aishwarya',
    title: BRAND.assistant,
    subtitle: `The intelligent business matchmaking assistant of ${BRAND.platform}.`,
    capabilities: ['Understand requirements naturally', 'Discover relevant businesses', 'Find service providers', 'Match opportunities', 'Generate qualified leads', 'Connect people to solutions'],
    example: { user: 'I need a React developer in Pune.', assistant: 'I found 8 relevant developers, 3 agencies, and 2 startups that match your requirement.' },
  },
];

export const stats = [
  { value: '13+', label: 'Service Categories' },
  { value: '9+', label: 'Industries Served' },
  { value: 'AI', label: 'First Approach' },
  { value: '100%', label: 'Custom Solutions' },
];

export const howItWorksSteps = [
  { step: '01', title: 'Discover', desc: 'Share your requirement — AI agents, automation, SaaS, CRM, or full ecosystem build.' },
  { step: '02', title: 'Design', desc: 'We architect intelligent systems tailored to your business goals and scale.' },
  { step: '03', title: 'Build', desc: 'Development, integration, and deployment with enterprise-grade quality.' },
  { step: '04', title: 'Grow', desc: 'Ongoing optimization, analytics, and ecosystem expansion through ALIGN Network.' },
];
