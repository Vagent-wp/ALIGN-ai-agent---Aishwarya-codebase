import { Link } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { EmptyState } from '@/components/shared/EmptyState';
import { Lock } from 'lucide-react';

/** Member dashboard — login-protected area (coming soon) */
export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="page-shell flex min-h-14 items-center justify-between py-3">
          <AlignBrand variant="full" size="md" linkToHome />
          <Link
            to="/onboarding"
            className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5"
          >
            Join ALIGN Network
          </Link>
        </div>
      </header>
      <div className="page-shell py-12">
        <div className="dashboard-panel mx-auto max-w-lg p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <EmptyState
            title="Member dashboard coming soon"
            message="This area will be available after you register and sign in. You'll manage your profile, leads, verification, and matches here."
          />
          <p className="mt-6 text-sm text-muted-foreground">
            Haven&apos;t joined yet?{' '}
            <Link to="/onboarding" className="font-semibold text-primary hover:underline">
              Complete your profile onboarding
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
