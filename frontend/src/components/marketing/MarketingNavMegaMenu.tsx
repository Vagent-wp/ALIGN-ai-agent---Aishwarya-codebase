import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { MegaMenuConfig } from '@/lib/marketing/navContent';
import { cn } from '@/lib/utils';

const VIEWPORT_PADDING = 16;
const MENU_MAX_WIDTH = 920;

interface MarketingNavMegaMenuProps {
  menu: MegaMenuConfig;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MarketingNavMegaMenu({ menu, open, onOpen, onClose }: MarketingNavMegaMenuProps) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onOpen();
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(onClose, 160);
  };

  const updatePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(MENU_MAX_WIDTH, window.innerWidth - VIEWPORT_PADDING * 2);
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - width - VIEWPORT_PADDING));

    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 10,
      left,
      width,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, menu.id]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => updatePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [open]);

  const gridCols = menu.featured
    ? `repeat(${menu.columns.length}, minmax(0, 1fr)) minmax(180px, 220px)`
    : `repeat(${menu.columns.length}, minmax(0, 1fr))`;

  return (
    <div ref={triggerRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={menu.href}
        className={cn(
          'linear-nav-link mega-menu-trigger group inline-flex items-center gap-1',
          open && 'mega-menu-trigger-active'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {menu.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mega-menu-dropdown mega-menu-dropdown-fixed"
            style={menuStyle}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="mega-menu-grid" style={{ gridTemplateColumns: gridCols }}>
              {menu.columns.map((column) => (
                <div key={column.title} className="min-w-0">
                  <p className="mega-menu-column-title">{column.title}</p>
                  <ul className="mt-3 space-y-0.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith('/') ? (
                          <Link to={link.href} onClick={onClose} className="mega-menu-link">
                            <span className="mega-menu-link-label">{link.label}</span>
                            {link.description && (
                              <span className="mega-menu-link-desc">{link.description}</span>
                            )}
                          </Link>
                        ) : (
                          <a href={link.href} onClick={onClose} className="mega-menu-link">
                            <span className="mega-menu-link-label">{link.label}</span>
                            {link.description && (
                              <span className="mega-menu-link-desc">{link.description}</span>
                            )}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {menu.featured && (
                <div className="mega-menu-featured">
                  <p className="mega-menu-featured-eyebrow">Explore</p>
                  <p className="mega-menu-featured-title">{menu.featured.title}</p>
                  <p className="mega-menu-featured-body">{menu.featured.body}</p>
                  {menu.featured.href.startsWith('/') ? (
                    <Link to={menu.featured.href} onClick={onClose} className="mega-menu-featured-cta">
                      {menu.featured.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <a href={menu.featured.href} onClick={onClose} className="mega-menu-featured-cta">
                      {menu.featured.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
