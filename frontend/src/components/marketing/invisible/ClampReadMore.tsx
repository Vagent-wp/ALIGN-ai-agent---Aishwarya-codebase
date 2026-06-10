import { cn } from '@/lib/utils';

type ClampReadMoreProps = {
  text: string;
  className?: string;
};

/** Card body copy — full text on all breakpoints */
export function ClampReadMore({ text, className }: ClampReadMoreProps) {
  return <p className={cn(className)}>{text}</p>;
}
