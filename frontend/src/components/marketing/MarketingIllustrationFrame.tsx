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
        'overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_60px_rgba(49,130,206,0.14),0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-3',
        className
      )}
    >
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-white via-slate-50/40 to-white">
        {children}
      </div>
    </div>
  );
}
