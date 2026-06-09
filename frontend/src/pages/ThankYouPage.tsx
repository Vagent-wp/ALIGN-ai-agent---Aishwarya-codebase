import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

export function ThankYouPage() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="animate-fade-in-up max-w-md">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">You're on the list</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Thank you for registering for early access to {BRAND.platform}. We'll notify you when your spot is ready.
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {BRAND.taglineAlt}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
