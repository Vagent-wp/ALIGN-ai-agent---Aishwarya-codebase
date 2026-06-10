import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MockWindowFrameProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function MockWindowFrame({ title, children, className }: MockWindowFrameProps) {
  return (
    <div className={cn('inv-mock-outer', className)}>
      <div className="inv-mock-inner">
        <div className="inv-mock-chrome">
          <span className="inv-mock-dot" />
          <span className="inv-mock-dot" />
          <span className="inv-mock-dot" />
          {title && (
            <span className="ml-2 font-[family-name:var(--font-apkpraktikal)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-slate)]">
              {title}
            </span>
          )}
        </div>
        <div className="inv-mock-body">{children}</div>
      </div>
    </div>
  );
}
