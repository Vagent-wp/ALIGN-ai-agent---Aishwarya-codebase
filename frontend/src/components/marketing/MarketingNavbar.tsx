import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { MarketingNavMegaMenu } from '@/components/marketing/MarketingNavMegaMenu';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { useIsMobile } from '@/hooks/use-mobile';
import { navMegaMenus, simpleNavLinks } from '@/lib/marketing/navContent';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { cn } from '@/lib/utils';

interface MarketingNavbarProps {
  heroOverlay?: boolean;
}

export function MarketingNavbar({ heroOverlay = true }: MarketingNavbarProps) {
  const scrolled = useNavbarScroll(32);
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const isSolid = scrolled || open || !heroOverlay || Boolean(activeMega);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setActiveMega(null);
    setOpen(false);
  }, [location.pathname]);

  const linkClass = (active: boolean) =>
    cn(
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
      isSolid
        ? active
          ? 'bg-primary/10 font-semibold text-primary'
          : 'text-foreground/80 hover:bg-muted/80 hover:text-primary'
        : active
          ? 'bg-white/15 text-white'
          : 'text-white hover:bg-white/12 hover:text-white'
    );

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[200] pt-safe transition-all duration-300 ease-out',
          isSolid
            ? 'border-b border-border/80 bg-white/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/90'
            : 'border-b border-white/10 bg-[#060612]/50 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md'
        )}
        initial={false}
      >
        <div className={cn('marketing-container flex items-center justify-between gap-4', MARKETING_NAV_HEIGHT.bar)}>
          <div
            className={cn(
              'shrink-0 rounded-xl',
              !isSolid ? 'bg-white px-3 py-2 shadow-sm ring-1 ring-black/5' : 'py-1 pr-1'
            )}
          >
            <AlignBrand variant="full" size="nav" />
          </div>

          {!isMobile && (
            <nav className="hidden items-center gap-0.5 lg:flex">
              {navMegaMenus.map((menu) => (
                <MarketingNavMegaMenu
                  key={menu.id}
                  menu={menu}
                  open={activeMega === menu.id}
                  isSolid={isSolid}
                  onOpen={() => setActiveMega(menu.id)}
                  onClose={() => setActiveMega(null)}
                />
              ))}

              {simpleNavLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} className={linkClass(active)}>
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to="/early-access"
                className={cn(
                  'ml-3 inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-semibold shadow-md transition-transform active:scale-[0.98]',
                  isSolid
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-white text-[#060612] hover:bg-white/90'
                )}
              >
                Get Early Access
              </Link>
            </nav>
          )}

          {isMobile && (
            <button
              type="button"
              className={cn(
                'touch-target flex h-10 w-10 items-center justify-center rounded-xl lg:hidden',
                isSolid ? 'hover:bg-foreground/5' : 'text-white hover:bg-white/10'
              )}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </motion.header>

      <div className={MARKETING_NAV_HEIGHT.spacer} aria-hidden />

      <AnimatePresence>
        {isMobile && open && (
          <motion.nav
            className={cn(
              'fixed inset-0 z-[210] overflow-y-auto bg-background/98 backdrop-blur-md lg:hidden',
              MARKETING_NAV_HEIGHT.top
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="marketing-container flex flex-col gap-6 py-6 pb-10">
              {navMegaMenus.map((menu, menuIndex) => (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + menuIndex * 0.04 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{menu.label}</p>
                  <div className="mt-2 space-y-1">
                    {menu.columns.flatMap((col) => col.links).map((link) =>
                      link.href.startsWith('/') ? (
                        <Link
                          key={`${menu.id}-${link.label}`}
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-[44px] items-center rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm font-medium active:scale-[0.98]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={`${menu.id}-${link.label}`}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-[44px] items-center rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm font-medium active:scale-[0.98]"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                </motion.div>
              ))}

              {simpleNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium active:scale-[0.98]"
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/early-access" onClick={() => setOpen(false)} className="btn-marketing-primary w-full">
                Get Early Access
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
