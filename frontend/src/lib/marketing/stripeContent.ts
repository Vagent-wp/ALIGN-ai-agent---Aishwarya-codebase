import { BRAND } from '@/lib/brand';

export const enterpriseTrustLogos = [
  'Pharma & Life Sciences',
  'Recruitment & HR',
  'SaaS Startups',
  'Real Estate',
  'Manufacturing',
  'Education',
  'Agencies',
  'Enterprise IT',
];

export const productShowcaseItems = [
  {
    id: 'network',
    title: BRAND.platform,
    body: 'AI-powered business discovery — match founders, providers, investors, and opportunities in one intelligent ecosystem.',
    href: '/onboarding',
    cta: 'Join the network',
  },
  {
    id: 'aishwarya',
    title: BRAND.assistant,
    body: 'WhatsApp-native AI that understands requirements naturally and surfaces the most relevant people and businesses.',
    href: '/about',
    cta: 'Meet the assistant',
  },
  {
    id: 'platforms',
    title: 'Custom Platforms',
    body: 'SaaS, CRM, recruitment, pharma, and automation systems — end-to-end delivery for startups and enterprises.',
    href: '/services',
    cta: 'Explore services',
  },
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'network',
    name: 'Network',
    price: 'Free',
    period: 'to join',
    description: `Join ${BRAND.platform} and get discovered by AI-powered matching.`,
    features: [
      'Public profile on ALIGN Network',
      'WhatsApp onboarding via Aishwarya',
      'Semantic discovery & match cards',
      'Profile completeness scoring',
    ],
    cta: 'Join Network',
    href: '/onboarding',
  },
  {
    id: 'build',
    name: 'Build',
    price: 'Custom',
    period: 'project-based',
    description: 'AI agents, SaaS, CRM, and automation — scoped to your business goals.',
    features: [
      'Discovery & solution architecture',
      'AI agents & workflow automation',
      'Web, mobile & dashboard delivery',
      'Integration & deployment support',
    ],
    cta: 'Discuss your project',
    href: '/contact',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Tailored',
    period: 'annual partnership',
    description: 'Regulated industries, multi-team rollouts, and long-term platform partnerships.',
    features: [
      'Dedicated solution architect',
      'Pharma, HR & enterprise systems',
      'SLA-backed support & iteration',
      'Custom AI & data integrations',
    ],
    cta: 'Talk to sales',
    href: '/contact',
  },
];
