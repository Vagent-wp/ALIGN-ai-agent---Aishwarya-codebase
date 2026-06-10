import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { clearAdminSession, getAdminEmail, isAdminLoggedIn } from '@/lib/admin/auth';
import { LayoutDashboard, Users, Activity, LogOut } from 'lucide-react';

const NAV = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/profiles', label: 'Profiles', icon: Users },
  { to: '/admin/activity', label: 'Activity', icon: Activity },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="page-shell flex min-h-14 items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <AlignBrand variant="full" size="sm" linkToHome />
            <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground md:inline">{getAdminEmail()}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="page-shell py-6">
        <nav className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname.startsWith(to)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
