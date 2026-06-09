import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ children, className, align = 'center' }: SectionTitleProps) {
  return (
    <p className={cn('section-title mb-3', align === 'center' && 'text-center', className)}>
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 text-center md:mb-10', className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
