import { BRAND } from '@/lib/brand';

export interface KayaChatMessage {
  from: 'user' | 'kaya';
  text: string;
}

export interface KayaShowcaseScenario {
  id: string;
  tab: string;
  headline: string;
  description: string;
  messages: KayaChatMessage[];
}

export const kayaShowcaseScenarios: KayaShowcaseScenario[] = [
  {
    id: 'matchmaking',
    tab: 'Business matchmaking',
    headline: `${BRAND.assistant} understands what you need`,
    description: 'Describe requirements in plain language — no forms, no filters. Kaya searches the ecosystem and surfaces the best matches.',
    messages: [
      { from: 'user', text: 'I need a React developer in Pune for a fintech startup.' },
      { from: 'kaya', text: 'Got it! Searching ALIGN Network for React developers in Pune with fintech experience…' },
      {
        from: 'kaya',
        text: 'Found 8 developers · 3 agencies · 2 startups\n\nTop match: Priya S. — 5 yrs React, built 2 fintech apps\n\nWant me to connect you?',
      },
    ],
  },
  {
    id: 'leads',
    tab: 'Lead qualification',
    headline: 'Qualify and route leads automatically',
    description: 'Kaya scores inbound leads, checks fit, and routes them to the right team member — 24/7 on WhatsApp.',
    messages: [
      { from: 'user', text: 'We got 47 inbound leads from our landing page this week.' },
      { from: 'kaya', text: 'On it. Scoring by budget signals, industry fit, and urgency…' },
      {
        from: 'kaya',
        text: '12 hot leads ready for sales · 23 nurture · 12 disqualified\n\nTop lead: MedTech Solutions — ₹50L budget, needs CRM by Q2\n\nShall I schedule intro calls?',
      },
    ],
  },
  {
    id: 'discovery',
    tab: 'Opportunity discovery',
    headline: 'Find businesses and partners instantly',
    description: 'Ask naturally and Kaya maps the network — founders, agencies, investors, and service providers in seconds.',
    messages: [
      { from: 'user', text: 'Who in our network does AI automation for pharma companies?' },
      { from: 'kaya', text: 'Searching pharma + AI automation expertise across ALIGN Network…' },
      {
        from: 'kaya',
        text: '4 verified matches:\n\n• ALIGN Agent Labs — 6 pharma automations\n• NexPharma AI — RAG + compliance\n• DataRx Systems — workflow bots\n\nWant profiles or a warm intro?',
      },
    ],
  },
  {
    id: 'support',
    tab: 'Customer support',
    headline: 'Always-on support on WhatsApp',
    description: 'Kaya handles FAQs, ticket routing, and follow-ups — your team focuses on what matters.',
    messages: [
      { from: 'user', text: 'A client asked about our enterprise pricing and SLA options.' },
      { from: 'kaya', text: 'I pulled the latest enterprise tier details and SLA docs…' },
      {
        from: 'kaya',
        text: 'Draft reply ready:\n\n"Enterprise starts at custom pricing with 99.9% SLA, dedicated support, and onboarding in 2 weeks."\n\nSend now or edit first?',
      },
    ],
  },
];

export const KAYA_TAB_CYCLE_MS = 9000;
