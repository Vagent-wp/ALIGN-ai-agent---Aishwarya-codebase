import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'Content will appear here when available.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex animate-fade-in-up flex-col items-center py-16 text-center', className)}>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-[240px] text-sm text-muted-foreground">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
