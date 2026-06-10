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

/** Stripe-style footer — white surface, mist border, four-column grid */
export function SiteFooter() {
  return (
    <footer className="stripe-footer pb-safe">
      <div className="marketing-container px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <AlignBrand variant="full" size="sm" surface="light" linkToHome />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#7d8ba4]">
              {BRAND.taglinePrimary}
            </p>
            <p className="mt-2 text-xs text-[#7d8ba4]">
              {BRAND.platform} · Powered by {BRAND.assistant}
            </p>
          </div>

          <div>
            <p className="stripe-footer-heading">Product</p>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="stripe-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="stripe-footer-heading">Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="stripe-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="stripe-footer-heading">Legal</p>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="stripe-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#e5edf5] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#7d8ba4]">
            © {new Date().getFullYear()} {BRAND.company}. All rights reserved.
          </p>
          <div className="text-sm text-[#7d8ba4]">
            <span className="text-[#061b31]">{CONTACT.name}</span>
            {' · '}
            <a href={CONTACT.phoneHref} className="stripe-footer-link">
              {CONTACT.phoneDisplay}
            </a>
            {' · '}
            <a href={`mailto:${CONTACT.emails[0].address}`} className="stripe-footer-link">
              {CONTACT.emails[0].address}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
