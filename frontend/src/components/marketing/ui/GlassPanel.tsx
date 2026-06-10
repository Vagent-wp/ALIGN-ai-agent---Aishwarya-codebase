import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}

export function GlassPanel({ children, className, variant = 'dark' }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variant === 'dark' ? 'glass-panel' : 'glass-panel-light',
        className
      )}
    >
      {children}
    </div>
  );
}
