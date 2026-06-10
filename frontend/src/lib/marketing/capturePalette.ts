export const CAPTURE_CARD_TONES = [
  'align-capture-card-peach',
  'align-capture-card-sky',
  'align-capture-card-mint',
  'align-capture-card-lavender',
] as const;

export const CAPTURE_BAND_TONES = [
  'align-band-peach',
  'align-band-sky',
  'align-band-mint',
  'align-band-lavender',
] as const;

export type CaptureTone = 'peach' | 'sky' | 'mint' | 'lavender';

export function captureCardClass(tone: CaptureTone): string {
  return `align-capture-card align-capture-card-${tone}`;
}

export function captureCardByIndex(index: number): string {
  const tone = CAPTURE_CARD_TONES[index % CAPTURE_CARD_TONES.length]!;
  return `align-capture-card ${tone}`;
}
