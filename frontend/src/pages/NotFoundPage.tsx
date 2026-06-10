import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="inv-container">
          <h1 className="inv-heading-lg !text-5xl">404</h1>
          <p className="inv-body mt-3">This page doesn&apos;t exist.</p>
          <Link to="/" className="inv-link mt-6 inline-flex">
            Return home
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
