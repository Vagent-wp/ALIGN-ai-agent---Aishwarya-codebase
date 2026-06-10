import { BRAND } from '@/lib/brand';

export interface ElevenLabsProductTab {
  id: string;
  label: string;
}

export const elevenlabsProductTabs: ElevenLabsProductTab[] = [
  { id: 'network', label: BRAND.platform },
  { id: 'assistant', label: BRAND.assistant },
  { id: 'build', label: 'Custom Build' },
];

export interface VoiceOrbCategory {
  id: string;
  label: string;
  sublabel: string;
  /** CSS gradient for decorative orb — violet/orange only in SVG/CSS, never UI state */
  gradient: string;
}

export const voiceOrbCategories: VoiceOrbCategory[] = [
  {
    id: 'discovery',
    label: 'Discovery',
    sublabel: 'Business matching',
    gradient: 'radial-gradient(circle at 35% 35%, #0447ff 0%, #ff4704 55%, #ffb088 100%)',
  },
  {
    id: 'support',
    label: 'Support',
    sublabel: 'Customer care',
    gradient: 'radial-gradient(circle at 40% 30%, #0447ff 0%, #c44dff 45%, #ff4704 100%)',
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    sublabel: 'HR & hiring',
    gradient: 'radial-gradient(circle at 30% 40%, #ff4704 0%, #ff6b9d 40%, #0447ff 100%)',
  },
  {
    id: 'sales',
    label: 'Sales',
    sublabel: 'Lead qualification',
    gradient: 'radial-gradient(circle at 50% 35%, #0447ff 0%, #ff8844 50%, #ff4704 100%)',
  },
  {
    id: 'voice',
    label: 'Voice',
    sublabel: 'WhatsApp & calls',
    gradient: 'radial-gradient(circle at 45% 45%, #ff4704 0%, #ff6b4a 35%, #0447ff 100%)',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    sublabel: 'RAG assistants',
    gradient: 'radial-gradient(circle at 35% 50%, #0447ff 0%, #8099ff 40%, #ff4704 100%)',
  },
];

export const elevenlabsFeatureCards = [
  {
    id: 'agents',
    title: 'AI agents that sound human',
    body: 'WhatsApp-native and voice agents built for real conversations — not scripted bots.',
  },
  {
    id: 'platform',
    title: 'One intelligent platform',
    body: `${BRAND.platform} unifies discovery, onboarding, and matchmaking in a single product surface.`,
  },
  {
    id: 'enterprise',
    title: 'Enterprise-ready delivery',
    body: 'From pharma compliance to HR systems — scoped builds with architecture you can trust.',
  },
];

export const elevenlabsDarkPreviewRows = [
  { label: 'Match founders with AI agents', status: 'Active', dot: '#e5e5e5' },
  { label: 'Voice onboarding via WhatsApp', status: 'Running', dot: '#b1b0b0' },
  { label: 'Semantic profile search', status: 'Queued', dot: '#777169' },
];

export const elevenlabsTrustLogos = [
  'Pharma',
  'HR Tech',
  'SaaS',
  'Real Estate',
  'Manufacturing',
  'Education',
];

export const elevenlabsTabContent: Record<
  string,
  { headline: string; body: string }
> = {
  network: {
    headline: 'Intelligent business discovery',
    body: `${BRAND.platform} surfaces founders, providers, and investors through semantic search and AI-powered match cards.`,
  },
  assistant: {
    headline: 'Your always-on business assistant',
    body: `${BRAND.assistant} understands requirements in natural language and connects you to the right people on WhatsApp.`,
  },
  build: {
    headline: 'Custom AI systems, end to end',
    body: 'From discovery to deployment — AI agents, SaaS platforms, CRM, and automation built for your industry.',
  },
};
