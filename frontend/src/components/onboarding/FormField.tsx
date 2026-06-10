import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, hint, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-semibold text-foreground">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
