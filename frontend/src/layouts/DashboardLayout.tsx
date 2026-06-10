import { Link, Outlet, useLocation } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { EmptyState } from '@/components/shared/EmptyState';

export function DashboardLayout() {
  const { pathname } = useLocation();
  const isOnboarding = pathname.includes('/onboarding');

  if (isOnboarding) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="page-shell flex min-h-14 items-center justify-between py-3">
          <AlignBrand variant="full" size="sm" linkToHome />
          <Link
            to="/dashboard/onboarding"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Complete profile
          </Link>
        </div>
      </header>
      <div className="page-shell py-8">
        <EmptyState
          title="ALIGN Network Dashboard"
          message="Manage your profile, leads, and verification from here. Start with the full onboarding form."
        />
        <Outlet />
      </div>
    </div>
  );
}
