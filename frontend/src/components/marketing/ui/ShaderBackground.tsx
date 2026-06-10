import { cn } from '@/lib/utils';

interface ShaderBackgroundProps {
  className?: string;
}

export function ShaderBackground({ className }: ShaderBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden hero-plasma-bg', className)} aria-hidden>
      <div className="absolute inset-0 hero-plasma-grid opacity-40" />
      <div className="hero-plasma-orb-1" />
      <div className="hero-plasma-orb-2" />
      <div className="absolute inset-0 bg-[#060612]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060612]/86 via-[#0a0820]/42 to-[#12082a]/12" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060612]/28 via-transparent to-[#060612]/78" />
    </div>
  );
}
