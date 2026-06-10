import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { BRAND, LOGO } from '@/lib/brand';

interface AlignBrandProps {
  /** Full wordmark image or icon-only mark */
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'nav';
  /** Show official expansion below logo (full variant only) */
  showExpansion?: boolean;
  /** Show platform + assistant line below logo */
  showPlatformLine?: boolean;
  className?: string;
  linkToHome?: boolean;
}

const fullHeights = {
  sm: 'h-8 md:h-9',
  md: 'h-10 md:h-11',
  lg: 'h-12 md:h-16 lg:h-[4.5rem]',
  nav: 'h-12 w-auto sm:h-14 md:h-16 lg:h-[4.25rem]',
};

const iconSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  nav: 'h-10 w-10 sm:h-11 sm:w-11',
};

export function AlignBrand({
  variant = 'full',
  size = 'md',
  showExpansion = false,
  showPlatformLine = false,
  className,
  linkToHome = true,
}: AlignBrandProps) {
  const content = (
    <div className={cn('flex flex-col', className)}>
      {variant === 'icon' ? (
        <img
          src={LOGO.icon}
          alt={BRAND.company}
          className={cn('object-contain', iconSizes[size])}
        />
      ) : (
        <img
          src={LOGO.full}
          alt={`${BRAND.company} — ${BRAND.platform}`}
          className={cn(
            'w-auto max-w-[min(100%,240px)] object-contain object-left sm:max-w-[280px] md:max-w-none',
            fullHeights[size]
          )}
        />
      )}

      {showExpansion && variant === 'full' && (
        <span className="mt-2 text-[11px] font-medium leading-snug tracking-wide text-muted-foreground md:text-xs">
          {BRAND.expansion}
        </span>
      )}

      {showPlatformLine && variant === 'full' && (
        <span className="mt-1 text-[11px] font-semibold text-primary md:text-xs">
          {BRAND.platform} · {BRAND.assistant}
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
