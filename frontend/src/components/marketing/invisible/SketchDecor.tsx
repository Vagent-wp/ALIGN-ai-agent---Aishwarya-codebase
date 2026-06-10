/** Loose editorial sketch doodles — cobalt + lime accents, ink outlines */

type SketchSize = 'sm' | 'md' | 'lg';

const sizeClass: Record<SketchSize, string> = {
  sm: 'w-[72px]',
  md: 'w-[100px]',
  lg: 'w-[128px]',
};

export function SketchGlobe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden fill="none">
      <circle cx="60" cy="60" r="44" stroke="#0f0f0f" strokeWidth="1.5" />
      <ellipse cx="60" cy="60" rx="18" ry="44" stroke="#0f0f0f" strokeWidth="1.2" />
      <path d="M16 60h88M60 16v88" stroke="#0f0f0f" strokeWidth="1" />
      <circle cx="82" cy="38" r="8" fill="#0c76fe" opacity="0.85" />
      <path d="M28 78c8 6 18 10 32 10" stroke="#dcf58f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SketchNetwork({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} aria-hidden fill="none">
      <circle cx="70" cy="50" r="10" fill="#0c76fe" />
      <circle cx="30" cy="28" r="7" stroke="#0f0f0f" strokeWidth="1.5" />
      <circle cx="110" cy="24" r="7" stroke="#0f0f0f" strokeWidth="1.5" />
      <circle cx="24" cy="72" r="7" stroke="#0f0f0f" strokeWidth="1.5" />
      <circle cx="116" cy="68" r="7" fill="#dcf58f" stroke="#0f0f0f" strokeWidth="1.2" />
      <path d="M38 32L62 44M102 30L78 44M34 66L60 56M106 62L80 54" stroke="#0f0f0f" strokeWidth="1.2" />
    </svg>
  );
}

export function SketchSpark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden fill="none">
      <path
        d="M40 8l6 18h19l-15 11 6 18-16-12-16 12 6-18-15-11h19z"
        stroke="#0f0f0f"
        strokeWidth="1.5"
        fill="#dcf58f"
        fillOpacity="0.6"
      />
      <circle cx="58" cy="58" r="6" fill="#0c76fe" />
    </svg>
  );
}

export function SketchOrbit({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden fill="none">
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke="#0f0f0f" strokeWidth="1.2" />
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke="#0f0f0f" strokeWidth="1.2" transform="rotate(60 60 60)" />
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke="#0f0f0f" strokeWidth="1.2" transform="rotate(-60 60 60)" />
      <circle cx="60" cy="60" r="14" stroke="#0f0f0f" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="6" fill="#0c76fe" />
      <circle cx="98" cy="42" r="5" fill="#dcf58f" stroke="#0f0f0f" strokeWidth="1" />
    </svg>
  );
}

export function SketchFlow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 90" className={className} aria-hidden fill="none">
      <rect x="4" y="28" width="36" height="28" rx="6" stroke="#0f0f0f" strokeWidth="1.5" />
      <rect x="57" y="28" width="36" height="28" rx="6" stroke="#0f0f0f" strokeWidth="1.5" fill="#dcf58f" fillOpacity="0.35" />
      <rect x="110" y="28" width="36" height="28" rx="6" stroke="#0f0f0f" strokeWidth="1.5" />
      <path d="M40 42h14M52 38l4 4-4 4" stroke="#0f0f0f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M93 42h14M105 38l4 4-4 4" stroke="#0f0f0f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="75" cy="14" r="5" fill="#0c76fe" />
      <path d="M75 19v6" stroke="#0f0f0f" strokeWidth="1" />
    </svg>
  );
}

export function SketchChart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 90" className={className} aria-hidden fill="none">
      <path d="M8 78h94" stroke="#0f0f0f" strokeWidth="1.2" />
      <path d="M8 78V18" stroke="#0f0f0f" strokeWidth="1.2" />
      <rect x="18" y="52" width="14" height="26" rx="3" stroke="#0f0f0f" strokeWidth="1.2" />
      <rect x="40" y="38" width="14" height="40" rx="3" stroke="#0f0f0f" strokeWidth="1.2" fill="#dcf58f" fillOpacity="0.5" />
      <rect x="62" y="28" width="14" height="50" rx="3" stroke="#0f0f0f" strokeWidth="1.2" />
      <rect x="84" y="20" width="14" height="58" rx="3" stroke="#0f0f0f" strokeWidth="1.2" fill="#0c76fe" fillOpacity="0.75" />
      <path d="M25 48l22-8 22 4 22-18" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SketchSearch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <circle cx="42" cy="42" r="26" stroke="#0f0f0f" strokeWidth="1.5" />
      <path d="M60 60l28 28" stroke="#0f0f0f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="34" cy="38" r="4" fill="#0c76fe" />
      <circle cx="50" cy="50" r="3" fill="#dcf58f" stroke="#0f0f0f" strokeWidth="1" />
      <path d="M30 52c4 6 10 9 18 9" stroke="#0f0f0f" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

export function SketchChip({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 90" className={className} aria-hidden fill="none">
      <rect x="28" y="18" width="54" height="54" rx="8" stroke="#0f0f0f" strokeWidth="1.5" />
      <rect x="40" y="30" width="30" height="30" rx="4" stroke="#0f0f0f" strokeWidth="1.2" fill="#dcf58f" fillOpacity="0.4" />
      <circle cx="55" cy="45" r="6" fill="#0c76fe" />
      <path d="M28 30H14M28 45H14M28 60H14M82 30h14M82 45h14M82 60h14M45 18V4M60 18V4M45 72v14M60 72v14" stroke="#0f0f0f" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function SketchBot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 100" className={className} aria-hidden fill="none">
      <path d="M45 6v10" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="45" cy="4" r="3" fill="#0c76fe" />
      <rect x="18" y="18" width="54" height="48" rx="10" stroke="#0f0f0f" strokeWidth="1.5" />
      <circle cx="34" cy="38" r="6" stroke="#0f0f0f" strokeWidth="1.5" fill="#dcf58f" fillOpacity="0.5" />
      <circle cx="56" cy="38" r="6" stroke="#0f0f0f" strokeWidth="1.5" fill="#dcf58f" fillOpacity="0.5" />
      <path d="M32 54h26" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 72h30l-6 14H36z" stroke="#0f0f0f" strokeWidth="1.2" fill="#0c76fe" fillOpacity="0.2" />
    </svg>
  );
}

export function SketchLayers({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden fill="none">
      <path d="M55 12L12 34l43 22 43-22z" stroke="#0f0f0f" strokeWidth="1.5" fill="#dcf58f" fillOpacity="0.25" />
      <path d="M55 38L12 60l43 22 43-22z" stroke="#0f0f0f" strokeWidth="1.5" />
      <path d="M55 64L12 86l43 22 43-22z" stroke="#0f0f0f" strokeWidth="1.5" fill="#0c76fe" fillOpacity="0.15" />
      <circle cx="88" cy="28" r="5" fill="#0c76fe" />
    </svg>
  );
}

export type SketchDecorId =
  | 'globe'
  | 'nodes'
  | 'spark'
  | 'orbit'
  | 'flow'
  | 'chart'
  | 'search'
  | 'chip'
  | 'bot'
  | 'layers';

const sketchMap = {
  globe: SketchGlobe,
  nodes: SketchNetwork,
  spark: SketchSpark,
  orbit: SketchOrbit,
  flow: SketchFlow,
  chart: SketchChart,
  search: SketchSearch,
  chip: SketchChip,
  bot: SketchBot,
  layers: SketchLayers,
} satisfies Record<SketchDecorId, (props: { className?: string }) => JSX.Element>;

export function SketchDecor({
  id,
  className = '',
  size = 'md',
  opacity = 0.9,
}: {
  id: SketchDecorId;
  className?: string;
  size?: SketchSize;
  opacity?: number;
}) {
  const Component = sketchMap[id];
  return (
    <div className={className} style={{ opacity }}>
      <Component className={`h-auto ${sizeClass[size]}`} />
    </div>
  );
}
