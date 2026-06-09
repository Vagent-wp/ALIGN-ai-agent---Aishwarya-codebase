import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touch?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, touch, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full bg-background text-foreground placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        touch
          ? 'h-12 rounded-xl border-2 border-border/60 px-4 text-[15px] font-medium focus:border-primary touch-target'
          : 'h-10 rounded-md border border-input px-3 py-2 text-base md:text-sm',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
