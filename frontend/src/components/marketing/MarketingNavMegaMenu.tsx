import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { MegaMenuConfig } from '@/lib/marketing/navContent';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { cn } from '@/lib/utils';

interface MarketingNavMegaMenuProps {
  menu: MegaMenuConfig;
  open: boolean;
  isSolid: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MarketingNavMegaMenu({ menu, open, isSolid, onOpen, onClose }: MarketingNavMegaMenuProps) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onOpen();
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(onClose, 180);
  };

  const triggerClass = cn(
    'group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
    isSolid
      ? open
        ? 'bg-primary/10 text-primary'
        : 'text-foreground/80 hover:bg-muted/80 hover:text-primary'
      : open
        ? 'bg-white/15 text-white'
        : 'text-white hover:bg-white/12 hover:text-white'
  );

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button type="button" className={cn('relative', triggerClass)} aria-expanded={open} aria-haspopup="true">
        {menu.label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
        <span
          className={cn(
            'absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 rounded-full bg-current transition-transform duration-200 group-hover:scale-x-100',
            open && 'scale-x-100'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              'fixed inset-x-0 z-[199] border-b border-border/70 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12)]',
              MARKETING_NAV_HEIGHT.top
            )}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="marketing-container py-8 lg:py-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {menu.columns.map((column) => (
                    <div key={column.title}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {column.title}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            {link.href.startsWith('/') ? (
                              <Link
                                to={link.href}
                                onClick={onClose}
                                className="group/link block rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
                              >
                                <span className="text-sm font-medium text-foreground group-hover/link:text-primary">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                    {link.description}
                                  </span>
                                )}
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                onClick={onClose}
                                className="group/link block rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
                              >
                                <span className="text-sm font-medium text-foreground group-hover/link:text-primary">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                    {link.description}
                                  </span>
                                )}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {menu.featured && (
                  <div className="rounded-2xl pastel-card-sky p-6 lg:min-h-[220px]">
                    <p className="font-poppins text-lg font-bold text-foreground">{menu.featured.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{menu.featured.body}</p>
                    {menu.featured.href.startsWith('/') ? (
                      <Link
                        to={menu.featured.href}
                        onClick={onClose}
                        className="mt-5 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {menu.featured.cta}
                      </Link>
                    ) : (
                      <a
                        href={menu.featured.href}
                        onClick={onClose}
                        className="mt-5 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {menu.featured.cta}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
