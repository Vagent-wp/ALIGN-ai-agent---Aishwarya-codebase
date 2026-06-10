import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Use `light` inside stripe / white / cream sections on the marketing site */
  tone?: 'dark' | 'light';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  className,
}: SectionHeaderProps) {
  const isLight = tone === 'light';

  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <p className={cn('mb-3', isLight ? 'stripe-eyebrow !mb-3' : 'marketing-eyebrow')}>{eyebrow}</p>
      )}
      <h2 className={cn(isLight ? 'stripe-heading-gradient' : 'marketing-heading stripe-gradient-text')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4', isLight ? 'stripe-body' : 'marketing-subtitle')}>{subtitle}</p>
      )}
    </div>
  );
}
