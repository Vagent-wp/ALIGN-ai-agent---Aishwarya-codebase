import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { BRAND } from '@/lib/brand';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-12 pt-8 md:pb-20 md:pt-16">
      <div className="page-shell">
        <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary">
            {BRAND.assistant} · {BRAND.platform}
          </Badge>

          <div className="flex flex-col items-center">
            <AlignBrand variant="full" size="lg" linkToHome={false} />
            <p className="mt-4 text-[11px] font-medium tracking-wide text-muted-foreground md:text-xs">
              {BRAND.expansion}
            </p>
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {BRAND.taglinePrimary.replace('.', '')}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {BRAND.platform} brings business discovery, opportunity matching, and professional networking
            into one intelligent ecosystem. Describe your requirements naturally — {BRAND.assistant} finds
            the most relevant people, businesses, and opportunities for you.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-primary">
            <span>Discover.</span>
            <span className="text-muted-foreground">·</span>
            <span>Connect.</span>
            <span className="text-muted-foreground">·</span>
            <span>Grow.</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/onboarding"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90 active:scale-[0.97] sm:w-auto"
            >
              Join ALIGN Network
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-input bg-background px-8 text-base font-semibold hover:bg-accent sm:w-auto"
            >
              About {BRAND.platform}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 md:gap-4">
            {['WhatsApp Native', 'AI-Powered', 'Trusted Network'].map((label) => (
              <div key={label} className="dashboard-panel flex flex-col items-center p-3 md:p-4">
                <span className="text-[10px] font-semibold text-muted-foreground md:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
