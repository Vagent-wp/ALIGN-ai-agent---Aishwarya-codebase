import { BRAND } from '@/lib/brand';

export const perplexityNavItems = [
  { id: 'discover', label: 'Discover', active: true },
  { id: 'network', label: BRAND.platform, active: false },
  { id: 'assistant', label: BRAND.assistant, active: false },
  { id: 'services', label: 'Services', active: false },
];

export const perplexityHistoryItems = [
  'AI agents for pharma compliance',
  'Recruitment automation providers',
  'SaaS founders in Bangalore',
];

export const perplexitySuggestedQueries = [
  {
    id: 'providers',
    label: `Find service providers on ${BRAND.platform}`,
    icon: 'compass' as const,
  },
  {
    id: 'agents',
    label: 'AI agents for customer support',
    icon: 'grid' as const,
  },
  {
    id: 'investors',
    label: 'Investors interested in HR tech',
    icon: 'chart' as const,
  },
];

export const perplexityTrustPoints = [
  {
    title: 'Natural language discovery',
    body: `Describe who you need in plain language — ${BRAND.assistant} understands intent and surfaces relevant matches.`,
  },
  {
    title: 'Verified business profiles',
    body: 'Every result links to a structured profile with services, industries, and contact paths you can trust.',
  },
  {
    title: 'No noise, just answers',
    body: 'A minimal interface focused on clarity — search, review matches, and connect without distraction.',
  },
];

export const perplexitySearchPlaceholder = `Ask ${BRAND.assistant} to find people, businesses, or opportunities…`;
