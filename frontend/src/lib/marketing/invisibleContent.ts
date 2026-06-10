import { Bot, Database, Layers, LayoutGrid, Network, Search, type LucideIcon } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import type { MockupAssetId } from '@/lib/marketing/visualAssets';

export interface IntroBuildPillar {
  id: string;
  title: string;
  description: string;
  href: string;
  tone: 'peach' | 'sky' | 'lavender';
  icon: LucideIcon;
}

export const introBuildPillars: IntroBuildPillar[] = [
  {
    id: 'ai-agents',
    title: 'AI agents',
    description: 'WhatsApp, voice, and support agents built for real conversations — not scripted bots.',
    href: '/services#ai-agents',
    tone: 'peach',
    icon: Bot,
  },
  {
    id: 'automation',
    title: 'Automation pipelines',
    description: 'CRM sync, lead routing, document processing, and follow-ups — automated end to end.',
    href: '/services#automation',
    tone: 'sky',
    icon: Layers,
  },
  {
    id: 'saas',
    title: 'SaaS platforms',
    description: 'Multi-tenant products, subscription systems, and enterprise dashboards — from MVP to scale.',
    href: '/services#saas',
    tone: 'lavender',
    icon: LayoutGrid,
  },
  {
    id: 'crm',
    title: 'CRM systems',
    description: 'Lead, sales, recruitment, and pharma CRM with workflows your team will actually use.',
    href: '/services#crm',
    tone: 'peach',
    icon: Database,
  },
];

export const PLATFORM_CYCLE_MS = 8500;
export const NETWORK_CYCLE_MS = 8000;

export interface PlatformShowcaseItem {
  id: string;
  tab: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  mockupId: MockupAssetId;
  stageVariant: 'blue' | 'teal' | 'warm';
  ctaHref: string;
}

export const platformShowcaseItems: PlatformShowcaseItem[] = [
  {
    id: 'ai-agents',
    tab: 'AI agents',
    icon: Bot,
    headline: 'Agents that work where your team already is',
    description:
      'WhatsApp, voice, and support agents built for real conversations — not scripted bots. Deploy in days, not months.',
    mockupId: 'kaya-chat',
    stageVariant: 'warm',
    ctaHref: '/services',
  },
  {
    id: 'network',
    tab: 'ALIGN network',
    icon: Network,
    headline: 'Discovery that connects people to opportunity',
    description: `${BRAND.platform} maps founders, agencies, investors, and service providers into one intelligent graph.`,
    mockupId: 'network-dashboard',
    stageVariant: 'teal',
    ctaHref: '/onboarding',
  },
  {
    id: 'automation',
    tab: 'Automation',
    icon: Layers,
    headline: 'Workflows that remove repetitive work',
    description:
      'CRM sync, lead routing, document processing, and follow-ups — automated end to end with full visibility.',
    mockupId: 'analytics-dashboard',
    stageVariant: 'blue',
    ctaHref: '/services',
  },
  {
    id: 'discovery',
    tab: 'Smart search',
    icon: Search,
    headline: 'Find the right business in plain language',
    description:
      'Describe who you need. AI searches the ecosystem and returns ranked, explainable matches in seconds.',
    mockupId: 'ai-search',
    stageVariant: 'blue',
    ctaHref: '/onboarding',
  },
];

export interface NetworkShowcaseItem {
  id: string;
  tab: string;
  query: string;
  results: { name: string; meta: string }[];
  /** AI-parsed intent chips shown beside the live query */
  signals: string[];
  matchScore: number;
  scanTime: string;
  nodesScanned: string;
}

export const networkShowcaseItems: NetworkShowcaseItem[] = [
  {
    id: 'founders',
    tab: 'Founders',
    query: 'Fintech founders in Pune building B2B SaaS',
    signals: ['Fintech', 'Pune', 'B2B SaaS'],
    matchScore: 96,
    scanTime: '0.3s',
    nodesScanned: '1.8k',
    results: [
      { name: 'Arjun Mehta', meta: 'CEO · PayFlow · Seed stage' },
      { name: 'Sneha Kulkarni', meta: 'Co-founder · LedgerX · Series A' },
      { name: 'Rohit Desai', meta: 'Founder · FinBridge · Pre-seed' },
    ],
  },
  {
    id: 'agencies',
    tab: 'Agencies',
    query: 'UI/UX agencies with healthcare portfolio',
    signals: ['Healthcare', 'UI/UX', 'Portfolio'],
    matchScore: 93,
    scanTime: '0.4s',
    nodesScanned: '2.1k',
    results: [
      { name: 'Studio Meridian', meta: '12 healthcare projects · 4.9 rating' },
      { name: 'Pixel & Pulse', meta: 'FDA-compliant design systems' },
      { name: 'Align Creative', meta: 'MedTech UX specialists' },
    ],
  },
  {
    id: 'investors',
    tab: 'Investors',
    query: 'Angels investing in AI automation startups',
    signals: ['AI', 'Automation', 'Angels'],
    matchScore: 91,
    scanTime: '0.5s',
    nodesScanned: '940',
    results: [
      { name: 'Priya Shah', meta: 'Angel · 8 AI portfolio cos' },
      { name: 'Westbridge Capital', meta: 'Pre-seed to Series A' },
      { name: 'Nexus Angels Network', meta: 'B2B SaaS focus' },
    ],
  },
  {
    id: 'services',
    tab: 'Services',
    query: 'Dev shops building multi-tenant SaaS platforms',
    signals: ['Multi-tenant', 'SaaS', 'Dev shops'],
    matchScore: 94,
    scanTime: '0.4s',
    nodesScanned: '2.4k',
    results: [
      { name: 'ALIGN Agent Labs', meta: '13 service categories' },
      { name: 'CloudForge India', meta: 'Enterprise SaaS · 40+ engineers' },
      { name: 'Stackwise', meta: 'MVP to scale · React + Node' },
    ],
  },
];

export const heroSketchPositions = [
  { id: 'globe', className: 'top-[8%] right-[4%] hidden lg:block', rotate: 12 },
  { id: 'nodes', className: 'bottom-[18%] left-[2%] hidden md:block', rotate: -8 },
  { id: 'spark', className: 'top-[42%] right-[12%] hidden xl:block', rotate: 6 },
] as const;

export const trustLogos = [
  'Pharma',
  'Recruitment',
  'SaaS',
  'Real Estate',
  'Manufacturing',
  'Education',
  'Events',
  'Agencies',
];
