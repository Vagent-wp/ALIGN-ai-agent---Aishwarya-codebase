/** Generated 3D claymorphism mascots & UI mockups — served from /public/assets */

export const MASCOT_ASSETS = {
  consultant: '/assets/mascots/consultant.png',
  team: '/assets/mascots/team.png',
  'ai-assistant': '/assets/mascots/ai-assistant.png',
} as const;

export const MOCKUP_ASSETS = {
  'analytics-dashboard': '/assets/mockups/analytics.png',
  'ai-search': '/assets/mockups/ai-search.png',
  'kaya-chat': '/assets/mockups/kaya-chat.png',
  'network-dashboard': '/assets/mockups/network.png',
} as const;

export type MascotAssetId = keyof typeof MASCOT_ASSETS;
export type MockupAssetId = keyof typeof MOCKUP_ASSETS;

export const VISUAL_ALT: Record<MascotAssetId | MockupAssetId, string> = {
  consultant: '3D illustration — ALIGN ecosystem guide with AI, pharma, and business service icons',
  team: '3D illustration — founders, agencies, and enterprises collaborating on intelligent systems',
  'ai-assistant': '3D illustration — AI assistant with semantic search and opportunity matching',
  'analytics-dashboard': 'ALIGN Network analytics dashboard — pipeline and match rate insights',
  'ai-search': 'ALIGN semantic discovery — AI-powered search and shortlist',
  'kaya-chat': 'Kaya on WhatsApp — intelligent business matchmaking conversation',
  'network-dashboard': 'ALIGN Network platform dashboard — opportunities and connections',
};
