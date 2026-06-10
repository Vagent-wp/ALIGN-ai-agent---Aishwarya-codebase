import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarketingIllustrationFrameProps {
  children: ReactNode;
  className?: string;
}

export function MarketingIllustrationFrame({ children, className }: MarketingIllustrationFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-white p-3 shadow-[0_12px_48px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.05] sm:p-4',
        className
      )}
    >
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white">{children}</div>
    </div>
  );
}
