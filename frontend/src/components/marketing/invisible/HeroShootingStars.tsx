import type { CSSProperties } from 'react';

/** Sketch-style shooting stars — ink trail, cobalt head, lime sparkle */

const shootingStars = [
  { top: '12%', duration: 5.5, delay: 0, angle: 24, length: 72 },
  { top: '38%', duration: 6.2, delay: 2.8, angle: 22, length: 64 },
  { top: '62%', duration: 5, delay: 5.5, angle: 26, length: 80 },
  { top: '82%', duration: 6.8, delay: 8.2, angle: 20, length: 56 },
] as const;

function SketchShootingStar({ length }: { length: number }) {
  return (
    <svg
      width={length + 12}
      height={12}
      viewBox={`0 0 ${length + 12} 12`}
      className="overflow-visible"
      aria-hidden
      fill="none"
    >
      <path
        d={`M0 6 L${length} 6`}
        stroke="#0f0f0f"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="5 4"
        opacity="0.55"
      />
      <path
        d={`M${length * 0.5} 6 L${length} 6`}
        stroke="#dcf58f"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx={length + 4} cy={6} r="3.5" fill="#0c76fe" opacity="0.9" />
      <path
        d="M0 0l1.2 2.4 2.6 0.4-1.9 1.4 0.5 2.5-2.2-1.6-2.2 1.6 0.5-2.5-1.9-1.4 2.6-0.4z"
        fill="#dcf58f"
        fillOpacity="0.8"
        transform={`translate(${length + 1}, 1.5) scale(0.5)`}
      />
    </svg>
  );
}

export function HeroShootingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
      {shootingStars.map((star, index) => (
        <div
          key={index}
          className="inv-shooting-star"
          style={{
            top: star.top,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          <div
            className="inv-shooting-star-track"
            style={
              {
                '--inv-shoot-duration': `${star.duration}s`,
                '--inv-shoot-delay': `${star.delay}s`,
              } as CSSProperties
            }
          >
            <SketchShootingStar length={star.length} />
          </div>
        </div>
      ))}
    </div>
  );
}
