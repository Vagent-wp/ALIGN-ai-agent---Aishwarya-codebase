import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SketchAccent = 'blue' | 'lime' | 'violet' | 'none';
export type SketchSize = 'sm' | 'md' | 'lg';
export type SketchVariant = 'frame' | 'pill' | 'tag' | 'sticker' | 'chip';

const sizeMap: Record<SketchSize, { box: string; icon: string; dot: string; label: string }> = {
  sm: { box: 'p-2.5', icon: 'h-5 w-5', dot: 'h-2 w-2', label: 'text-[9px]' },
  md: { box: 'p-3.5', icon: 'h-7 w-7', dot: 'h-2.5 w-2.5', label: 'text-[10px]' },
  lg: { box: 'p-4', icon: 'h-9 w-9', dot: 'h-3 w-3', label: 'text-[11px]' },
};

const accentDot: Record<Exclude<SketchAccent, 'none'>, string> = {
  blue: 'bg-[var(--color-cobalt-spark)]',
  lime: 'bg-[var(--color-lime-glow)]',
  violet: 'bg-[#9382ff]',
};

const accentWash: Record<Exclude<SketchAccent, 'none'>, string> = {
  blue: 'bg-[var(--color-ice-blue)]/80',
  lime: 'bg-[var(--color-lime-glow)]/35',
  violet: 'bg-[#f0eeff]/90',
};

export function SketchLucideIcon({
  icon: Icon,
  label,
  accent = 'blue',
  size = 'md',
  variant = 'frame',
  className,
  rotate = 0,
}: {
  icon: LucideIcon;
  label?: string;
  accent?: SketchAccent;
  size?: SketchSize;
  variant?: SketchVariant;
  className?: string;
  rotate?: number;
}) {
  const dims = sizeMap[size];
  const labelClass = cn(
    'font-[family-name:var(--font-apkpraktikal)] uppercase tracking-wider text-[var(--color-steel)]',
    dims.label
  );

  if (variant === 'pill') {
    return (
      <div
        className={cn('inline-flex', className)}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      >
        <div
          className={cn(
            'inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--color-carbon-ink)] bg-white/95 px-3 py-1.5',
            'shadow-[2px_2px_0_var(--color-carbon-ink)]',
            accent !== 'none' && accentWash[accent]
          )}
        >
          <Icon className={cn(dims.icon, 'shrink-0 text-[var(--color-carbon-ink)]')} strokeWidth={1.5} />
          {label && <span className={labelClass}>{label}</span>}
        </div>
      </div>
    );
  }

  if (variant === 'chip') {
    return (
      <div
        className={cn('inline-flex', className)}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      >
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full border-[1.5px] border-[var(--color-carbon-ink)]',
            'shadow-[1px_2px_0_var(--color-carbon-ink)]',
            size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-14 w-14' : 'h-12 w-12',
            accent !== 'none' ? accentWash[accent] : 'bg-white/90'
          )}
        >
          <Icon className={cn(dims.icon, 'text-[var(--color-carbon-ink)]')} strokeWidth={1.5} />
        </div>
      </div>
    );
  }

  if (variant === 'tag') {
    return (
      <div
        className={cn('inline-flex flex-col items-center gap-1', className)}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      >
        <div
          className={cn(
            'relative inline-flex flex-col items-center gap-1 rounded-lg border border-dashed border-[var(--color-carbon-ink)] px-2.5 py-2',
            accent !== 'none' ? accentWash[accent] : 'bg-white/85'
          )}
        >
          <Icon className={cn(dims.icon, 'text-[var(--color-carbon-ink)]')} strokeWidth={1.5} />
          {label && <span className={labelClass}>{label}</span>}
        </div>
      </div>
    );
  }

  if (variant === 'sticker') {
    return (
      <div
        className={cn('inline-flex flex-col items-center gap-1', className)}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      >
        <div
          className={cn(
            'relative rounded-2xl border-2 border-[var(--color-carbon-ink)] px-3 py-2.5',
            'shadow-[3px_4px_0_var(--color-carbon-ink)]',
            accent !== 'none' ? accentWash[accent] : 'bg-white'
          )}
        >
          <Icon className={cn(dims.icon, 'mx-auto text-[var(--color-carbon-ink)]')} strokeWidth={1.75} />
          {label && <span className={cn(labelClass, 'mt-1.5 block text-center')}>{label}</span>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('inline-flex flex-col items-center gap-1.5', className)}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <div
        className={cn(
          'relative rounded-xl border-[1.5px] border-[var(--color-carbon-ink)] bg-white/90',
          'shadow-[2px_3px_0_var(--color-carbon-ink)]',
          dims.box
        )}
      >
        {accent !== 'none' && (
          <span
            aria-hidden
            className={cn(
              'absolute -right-1 -top-1 rounded-full border border-[var(--color-carbon-ink)]',
              dims.dot,
              accentDot[accent]
            )}
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 -left-0.5 h-3 w-5 rounded-sm bg-[var(--color-lime-glow)] opacity-50"
        />
        <Icon className={cn(dims.icon, 'relative z-[1] text-[var(--color-carbon-ink)]')} strokeWidth={1.5} />
      </div>
      {label && <span className={labelClass}>{label}</span>}
    </div>
  );
}
