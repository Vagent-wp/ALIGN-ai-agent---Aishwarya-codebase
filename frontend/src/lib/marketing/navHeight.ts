/** Shared marketing navbar dimensions — keep hero overlap and mega menu top offsets in sync */
export const MARKETING_NAV_HEIGHT = {
  bar: 'min-h-16 sm:min-h-[4.75rem] md:min-h-20',
  spacer: 'h-16 sm:h-[4.75rem] md:h-20',
  top: 'top-16 sm:top-[4.75rem] md:top-20',
  heroOverlap: '-mt-16 sm:-mt-[4.75rem] md:-mt-20',
  heroMinHeight: 'lg:min-h-[calc(100vh-5rem)]',
} as const;
