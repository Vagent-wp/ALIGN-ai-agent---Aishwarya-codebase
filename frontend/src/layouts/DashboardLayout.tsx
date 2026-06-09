import { Outlet } from 'react-router-dom';
import { EmptyState } from '@/components/shared/EmptyState';

/** Future-ready dashboard shell — placeholder only */
export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="page-shell py-8">
        <EmptyState
          title="Dashboard coming soon"
          message="This area is reserved for authenticated user dashboards, profiles, and admin tools."
        />
        <Outlet />
      </div>
    </div>
  );
}
