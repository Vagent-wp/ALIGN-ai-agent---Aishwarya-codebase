import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <header className="glass sticky top-0 z-30 border-b border-border/40 pt-safe">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <AlignBrand variant={isMobile ? 'icon' : 'full'} size="md" />

        {!isMobile && (
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/onboarding"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:text-sm"
            >
              Join Network
            </Link>
          </nav>
        )}

        {isMobile && (
          <button
            type="button"
            className="touch-target flex h-10 w-10 items-center justify-center rounded-xl hover:bg-foreground/5 active:scale-95 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      {isMobile && open && (
        <nav className="animate-fade-in border-t border-border/40 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={cn(
                  'touch-target rounded-xl px-4 py-3 text-sm font-medium',
                  location.pathname === link.to ? 'bg-primary/10 text-primary' : 'text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/onboarding"
              onClick={() => setOpen(false)}
              className="touch-target mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground active:scale-[0.97]"
            >
              Join Network
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
