import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { BRAND, LOGO } from '@/lib/brand';

interface AlignBrandProps {
  /** Full wordmark (mark + divider + text) or icon-only mark */
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'footer' | 'nav';
  /**
   * dark — compose 1.png + 2.png (black PNG bg blends on dark nav)
   * light — use merge.png (white background, for footer & light pages)
   */
  surface?: 'dark' | 'light';
  showExpansion?: boolean;
  showPlatformLine?: boolean;
  className?: string;
  linkToHome?: boolean;
}

const compositeHeights = {
  sm: 'h-10 md:h-11',
  md: 'h-12 md:h-14',
  lg: 'h-16 md:h-[4.5rem]',
  footer: 'h-14 md:h-16 lg:h-[4.5rem]',
  nav: 'h-9 sm:h-10 md:h-11',
};

const markOnlyHeights = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-12 w-12',
  footer: 'h-12 w-12',
  nav: 'h-9 w-9 sm:h-10 sm:w-10',
};

const mergedHeights = {
  sm: 'h-10 md:h-11',
  md: 'h-12 md:h-14',
  lg: 'h-16 md:h-[4.5rem]',
  footer: 'h-14 md:h-16 lg:h-[4.5rem]',
  nav: 'h-9 sm:h-10 md:h-11',
};

const wordmarkMaxWidths: Record<NonNullable<AlignBrandProps['size']>, string> = {
  sm: 'max-w-[min(52vw,200px)] sm:max-w-[220px]',
  md: 'max-w-[min(55vw,220px)] sm:max-w-[260px] md:max-w-[280px]',
  lg: 'max-w-[min(60vw,260px)] sm:max-w-[300px] md:max-w-[340px]',
  footer: 'max-w-[min(65vw,280px)] sm:max-w-[320px] md:max-w-[360px]',
  nav: 'max-w-[min(52vw,180px)] sm:max-w-[200px] md:max-w-[240px]',
};

const mergedMaxWidths: Record<NonNullable<AlignBrandProps['size']>, string> = {
  sm: 'max-w-[min(100%,220px)]',
  md: 'max-w-[min(100%,280px)]',
  lg: 'max-w-[min(100%,340px)]',
  footer: 'max-w-[min(100%,360px)]',
  nav: 'max-w-[min(100%,280px)]',
};

function ComposedLogo({
  size,
  surface,
}: {
  size: NonNullable<AlignBrandProps['size']>;
  surface: 'dark' | 'light';
}) {
  /* Nav + footer/lg use composed mark + wordmark for clarity; merge.png only on compact sm */
  const useMerged = surface === 'light' && size === 'sm';

  if (useMerged) {
    return (
      <img
        src={LOGO.merged}
        alt={`${BRAND.company} — ${BRAND.platform}`}
        className={cn('w-auto object-contain object-left', mergedMaxWidths[size], mergedHeights[size])}
        draggable={false}
      />
    );
  }

  const dividerClass = surface === 'dark' ? 'bg-[#d0d6e0]/35' : 'bg-[#dbdbdb]';

  return (
    <div className={cn('flex items-center gap-2 sm:gap-2.5', compositeHeights[size])}>
      <img
        src={LOGO.mark}
        alt=""
        className="h-[88%] w-auto shrink-0 object-contain"
        draggable={false}
        aria-hidden
      />
      <span className={cn('h-[72%] w-px shrink-0', dividerClass)} aria-hidden />
      <img
        src={LOGO.wordmark}
        alt={`${BRAND.company}`}
        className={cn('h-full w-auto object-contain object-left', wordmarkMaxWidths[size])}
        draggable={false}
      />
    </div>
  );
}

export function AlignBrand({
  variant = 'full',
  size = 'md',
  surface = 'light',
  showExpansion = false,
  showPlatformLine = false,
  className,
  linkToHome = true,
}: AlignBrandProps) {
  const content = (
    <div className={cn('flex flex-col', className)}>
      {variant === 'icon' ? (
        <img
          src={LOGO.mark}
          alt={BRAND.company}
          className={cn('object-contain', markOnlyHeights[size])}
          draggable={false}
        />
      ) : (
        <ComposedLogo size={size} surface={surface} />
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
      <Link
        to="/"
        className="inline-flex h-full shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
