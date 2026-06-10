export type PastelTone = 'peach' | 'sky' | 'mint' | 'lavender';

export const pastelTones: Record<PastelTone, { bg: string; border: string; cardClass: string }> = {
  peach: { bg: '#FDF0E9', border: '#f5ddd0', cardClass: 'pastel-card-peach' },
  sky: { bg: '#E9F0FF', border: '#d4e2fc', cardClass: 'pastel-card-sky' },
  mint: { bg: '#E8F8F0', border: '#c5ead8', cardClass: 'pastel-card-mint' },
  lavender: { bg: '#F3EFFE', border: '#ddd0f5', cardClass: 'pastel-card-lavender' },
};

export const toneCycle: PastelTone[] = ['peach', 'sky', 'mint', 'lavender'];
