import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && <p className="marketing-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="marketing-heading text-foreground">{title}</h2>
      {subtitle && <p className="marketing-subtitle mt-4">{subtitle}</p>}
    </div>
  );
}
