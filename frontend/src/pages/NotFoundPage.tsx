import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-3 text-sm text-muted-foreground md:text-base">This page doesn't exist.</p>
      <Link to="/" className="mt-6 text-sm font-medium text-primary hover:underline">
        Return home
      </Link>
    </div>
  );
}
