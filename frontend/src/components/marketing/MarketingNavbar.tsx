import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { MarketingNavMegaMenu } from '@/components/marketing/MarketingNavMegaMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { navMegaMenus, simpleNavLinks } from '@/lib/marketing/navContent';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { cn } from '@/lib/utils';

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <header className={cn('fixed inset-x-0 top-0 z-[200] linear-nav overflow-visible pt-safe')}>
        <div
          className={cn(
            'marketing-container flex items-center justify-between gap-4 overflow-visible px-6',
            MARKETING_NAV_HEIGHT.bar
          )}
        >
          <AlignBrand variant="full" size="nav" surface="dark" />

          {!isMobile && (
            <nav className="relative hidden items-center gap-0.5 overflow-visible lg:flex">
              <Link to="/" className="linear-nav-link" data-active={isActive('/') ? 'true' : 'false'}>
                Home
              </Link>

              {navMegaMenus.map((menu) => (
                <MarketingNavMegaMenu
                  key={menu.id}
                  menu={menu}
                  open={activeMega === menu.id}
                  onOpen={() => setActiveMega(menu.id)}
                  onClose={() => setActiveMega(null)}
                />
              ))}

              {simpleNavLinks.filter((l) => l.to !== '/').map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="linear-nav-link"
                  data-active={isActive(link.to) ? 'true' : 'false'}
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/onboarding" className="linear-btn-pill ml-3">
                Join Network
              </Link>
            </nav>
          )}

          {isMobile && (
            <button
              type="button"
              className="touch-target flex h-10 w-10 items-center justify-center rounded-md text-[#f7f8f8] hover:bg-[#161718] lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      <div className={MARKETING_NAV_HEIGHT.spacer} aria-hidden />

      <AnimatePresence>
        {isMobile && open && (
          <motion.nav
            className={cn(
              'fixed inset-0 z-[210] overflow-y-auto bg-[#08090a] lg:hidden',
              MARKETING_NAV_HEIGHT.top
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="marketing-container flex flex-col gap-4 px-6 py-6 pb-10">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="linear-card-deep px-4 py-3 text-sm font-[510] text-[#f7f8f8]"
              >
                Home
              </Link>

              {navMegaMenus.map((menu) => (
                <div key={menu.id}>
                  <Link
                    to={menu.href}
                    onClick={() => setOpen(false)}
                    className="mb-2 block text-sm font-[510] text-[#f7f8f8]"
                  >
                    {menu.label}
                  </Link>
                  <div className="space-y-1">
                    {menu.columns.flatMap((col) => col.links).map((link) =>
                      link.href.startsWith('/') ? (
                        <Link
                          key={`${menu.id}-${link.label}`}
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className="linear-card-deep flex min-h-[44px] items-center px-4 py-2.5 text-sm text-[#d0d6e0]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={`${menu.id}-${link.label}`}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="linear-card-deep flex min-h-[44px] items-center px-4 py-2.5 text-sm text-[#d0d6e0]"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              ))}

              {simpleNavLinks.filter((l) => l.to !== '/').map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="linear-card-deep px-4 py-3 text-sm text-[#d0d6e0]"
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/onboarding" onClick={() => setOpen(false)} className="linear-btn-primary w-full text-center">
                Join Network
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
