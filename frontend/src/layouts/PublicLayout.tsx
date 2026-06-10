import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MarketingNavbar } from '@/components/marketing/MarketingNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EchoWidget } from '@/components/echo/EchoWidget';

export function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#industries') {
      navigate(`/industries${location.hash}`, { replace: true });
    }
  }, [location.pathname, location.hash, navigate]);

  return (
    <div className="marketing-invisible flex min-h-screen flex-col">
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <EchoWidget />
    </div>
  );
}
