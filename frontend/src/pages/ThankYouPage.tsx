import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

export function ThankYouPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="inv-container">
          <div className="animate-fade-in-up mx-auto max-w-md">
            <h1 className="inv-heading-lg">You&apos;re on the list</h1>
            <p className="inv-body mt-4">
              Thank you for registering for early access to {BRAND.platform}. We&apos;ll notify you when your spot is
              ready.
            </p>
            <p className="inv-label mt-4 justify-center !text-[var(--color-align-blue)]">{BRAND.taglineAlt}</p>
            <Link to="/" className="inv-btn-black mt-8 inline-flex">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
