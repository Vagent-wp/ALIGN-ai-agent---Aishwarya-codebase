import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function InvLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('inv-label', className)}>
      <span className="inv-label-dot" aria-hidden />
      {children}
    </p>
  );
}

export function TwoToneHeadline({
  primary,
  secondary,
  as: Tag = 'h2',
  className,
  id,
}: {
  primary: string;
  secondary: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn('inv-display max-w-[900px]', className)}>
      {primary}{' '}
      <span className="inv-display-muted">{secondary}</span>
    </Tag>
  );
}

export function InvLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      {children}
      <span aria-hidden>{external ? '↗' : '→'}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={cn('inv-link', className)} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={cn('inv-link', className)}>
      {content}
    </a>
  );
}

export function SideTab({
  label,
  icon: Icon,
  isActive,
  progress,
  onSelect,
}: {
  label: string;
  icon?: LucideIcon;
  isActive: boolean;
  progress: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive ? 'true' : 'false'}
      className="inv-side-tab"
      onClick={onSelect}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <span className="inv-side-tab-label">
          {Icon && <Icon size={18} strokeWidth={1.5} className="text-[var(--color-carbon-ink)]" />}
          {label}
        </span>
        <span className="inv-side-tab-arrow" aria-hidden>
          →
        </span>
      </div>
      {isActive && (
        <div className="inv-progress-bar">
          <div className="inv-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </button>
  );
}
