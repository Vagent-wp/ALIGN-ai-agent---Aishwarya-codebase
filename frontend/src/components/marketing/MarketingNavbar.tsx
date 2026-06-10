import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { MarketingNavMegaMenu } from '@/components/marketing/MarketingNavMegaMenu';
import { navMegaMenus, simpleNavLinks } from '@/lib/marketing/navContent';
import { MARKETING_NAV_HEIGHT } from '@/lib/marketing/navHeight';
import { cn } from '@/lib/utils';

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();

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

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[200] linear-nav flex overflow-visible pt-safe',
          MARKETING_NAV_HEIGHT.bar
        )}
      >
        <div className="marketing-container flex h-full w-full items-center justify-between gap-4 overflow-visible px-4 sm:px-6">
          <div className="flex h-full shrink-0 items-center">
            <AlignBrand variant="full" size="nav" surface="light" />
          </div>

          <nav className="relative hidden h-full items-center gap-0.5 overflow-visible lg:flex">
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

          <button
            type="button"
            className="touch-target flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full text-[var(--color-carbon-ink)] hover:bg-[var(--color-mist)] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className={MARKETING_NAV_HEIGHT.spacer} aria-hidden />

      <AnimatePresence>
        {open && (
          <motion.nav
            className={cn(
              'fixed inset-0 z-[210] overflow-y-auto bg-[var(--color-canvas-white)] lg:hidden',
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
                className="inv-card flex min-h-[44px] items-center px-4 py-3 text-sm text-[var(--color-carbon-ink)]"
              >
                Home
              </Link>

              {navMegaMenus.map((menu) => (
                <div key={menu.id}>
                  <Link
                    to={menu.href}
                    onClick={() => setOpen(false)}
                    className="mb-2 block text-sm font-medium text-[var(--color-carbon-ink)]"
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
                          className="inv-card flex min-h-[44px] items-center px-4 py-2.5 text-sm text-[var(--color-iron)]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={`${menu.id}-${link.label}`}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="inv-card flex min-h-[44px] items-center px-4 py-2.5 text-sm text-[var(--color-iron)]"
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
                  className="inv-card px-4 py-3 text-sm text-[var(--color-iron)]"
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/onboarding" onClick={() => setOpen(false)} className="inv-btn-lime w-full text-center">
                Join Network
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
