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
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <AlignBrand variant="full" size="footer" surface="light" linkToHome />
            <p className="inv-body-sm mt-4 max-w-xs">{BRAND.taglinePrimary}</p>
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

          <div className="col-span-2 sm:col-span-1">
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

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-ash)] pt-8 md:mt-12 md:flex-row md:items-center md:justify-between">
          <p className="inv-body-sm text-[var(--color-slate)]">
            © {new Date().getFullYear()} {BRAND.company}. All rights reserved.
          </p>
          <div className="inv-body-sm flex flex-col gap-1 text-[var(--color-slate)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1">
            <span className="text-[var(--color-carbon-ink)]">{CONTACT.name}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <a href={CONTACT.phoneHref} className="inv-footer-link">
              {CONTACT.phoneDisplay}
            </a>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <a href={`mailto:${CONTACT.emails[0].address}`} className="inv-footer-link break-all sm:break-normal">
              {CONTACT.emails[0].address}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
