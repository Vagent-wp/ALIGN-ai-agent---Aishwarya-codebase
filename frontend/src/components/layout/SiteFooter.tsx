import { Link } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { BRAND } from '@/lib/brand';

const footerLinks = {
  product: [
    { to: '/about', label: `About ${BRAND.assistant}` },
    { to: '/early-access', label: 'Early Access' },
    { to: '/contact', label: 'Contact' },
  ],
  legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card pb-safe">
      <div className="page-shell py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <AlignBrand variant="full" size="sm" linkToHome />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {BRAND.taglinePrimary} {BRAND.taglineAlt}
            </p>
            <p className="mt-2 text-[11px] font-medium text-muted-foreground">
              {BRAND.platform} · Powered by {BRAND.assistant}
            </p>
          </div>

          <div>
            <p className="section-title mb-4 text-left">Product</p>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-title mb-4 text-left">Legal</p>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.company}. All rights reserved.
          </p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {BRAND.expansion}
          </p>
        </div>
      </div>
    </footer>
  );
}
