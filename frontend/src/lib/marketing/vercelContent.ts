import { BRAND } from '@/lib/brand';

export const vercelCategoryFilters = [
  { id: 'agents', label: 'AI Agents' },
  { id: 'network', label: BRAND.platform },
  { id: 'saas', label: 'SaaS Platforms' },
  { id: 'automation', label: 'Automation' },
  { id: 'enterprise', label: 'Enterprise' },
];

export const vercelFeatureCards = [
  {
    id: 'dashboard',
    title: 'Operator dashboard',
    body: 'Monitor agents, match pipelines, and profile completeness from a compact control surface built for daily use.',
    href: '/onboarding',
  },
  {
    id: 'api',
    title: 'API-first architecture',
    body: 'RESTful endpoints for profiles, search, and onboarding — integrate ALIGN into your existing stack.',
    href: '/services',
  },
  {
    id: 'deploy',
    title: 'Deploy anywhere',
    body: 'Cloud-native delivery with environment configs, webhooks, and production-ready infrastructure patterns.',
    href: '/contact',
  },
];

export const vercelDashboardRows = [
  { label: 'aishwarya-agent', status: 'Running', highlight: true },
  { label: 'profile-indexer', status: 'Healthy', highlight: false },
  { label: 'match-engine', status: 'Queued', highlight: false },
];
