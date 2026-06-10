import { Outlet, useLocation } from 'react-router-dom';
import { MarketingNavbar } from '@/components/marketing/MarketingNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function PublicLayout() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNavbar heroOverlay={isLanding} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
