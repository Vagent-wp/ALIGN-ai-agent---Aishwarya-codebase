import { Link } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { BRAND } from '@/lib/brand';
import { CONTACT } from '@/lib/marketing/contact';

const footerLinks = {
  product: [
    { to: '/services', label: 'Services' },
    { to: '/industries', label: 'Industries' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: `About ${BRAND.assistant}` },
    { to: '/onboarding', label: 'Join Network' },
  ],
  company: [
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'What We Build' },
  ],
  legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="inv-footer pb-safe">
      <div className="inv-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <AlignBrand variant="full" size="sm" surface="light" linkToHome />
            <p className="mt-4 max-w-xs inv-body-sm">{BRAND.taglinePrimary}</p>
            <p className="mt-2 text-[13px] text-[var(--color-slate)]">
              {BRAND.platform} · Powered by {BRAND.assistant}
            </p>
          </div>

          <div>
            <p className="inv-footer-heading">Product</p>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inv-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="inv-footer-heading">Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inv-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="inv-footer-heading">Legal</p>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inv-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-ash)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="inv-body-sm text-[var(--color-slate)]">
            © {new Date().getFullYear()} {BRAND.company}. All rights reserved.
          </p>
          <div className="inv-body-sm text-[var(--color-slate)]">
            <span className="text-[var(--color-carbon-ink)]">{CONTACT.name}</span>
            {' · '}
            <a href={CONTACT.phoneHref} className="inv-footer-link">
              {CONTACT.phoneDisplay}
            </a>
            {' · '}
            <a href={`mailto:${CONTACT.emails[0].address}`} className="inv-footer-link">
              {CONTACT.emails[0].address}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
