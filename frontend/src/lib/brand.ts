export const BRAND = {
  company: 'ALIGN Ecosystems',
  platform: 'ALIGN Network',
  assistant: 'Kaya',
  expansion: 'Artificial Lead Intelligence & Growth Network',
  taglinePrimary: 'Where Opportunities Find People.',
  taglineAlt: 'Discover. Connect. Grow.',
  assistantRole: 'Intelligent business matchmaking assistant of ALIGN Network',
} as const;

/** Logo assets — mark (1.png) + wordmark (2.png) compose like merge.png */
export const LOGO = {
  mark: '/logo/1.png',
  wordmark: '/logo/2.png',
  merged: '/logo/merge.png',
  icon: '/logo/1.png',
  echoMascot: '/logo/aimas.png',
  /** @deprecated use merged or composed mark+wordmark */
  full: '/logo/merge.png',
} as const;
