import { AlignHero } from '@/components/marketing/AlignHero';
import { PerplexityDiscoverySection } from '@/components/marketing/perplexity/PerplexityDiscoverySection';
import { ElevenLabsProductSection } from '@/components/marketing/elevenlabs/ElevenLabsProductSection';
import { VercelPlatformSection } from '@/components/marketing/vercel/VercelPlatformSection';
import { StripeProductShowcase } from '@/components/marketing/stripe/StripeProductShowcase';
import { PricingSection } from '@/components/marketing/stripe/PricingSection';
import { WhatWeDoSection } from '@/components/marketing/WhatWeDoSection';
import { PastelFeatureCards } from '@/components/marketing/PastelFeatureCards';
import { ServiceCategoriesSection } from '@/components/marketing/ServiceCategoriesSection';
import { IndustriesSection } from '@/components/marketing/IndustriesSection';
import { ProjectsGallerySection } from '@/components/marketing/ProjectsGallerySection';
import { FlagshipProductsSection } from '@/components/marketing/FlagshipProductsSection';
import { StatsBand, HowItWorksSection, MissionSection, FinalCTA } from '@/components/marketing/MissionAndCTA';

/**
 * Hybrid homepage — 40% Linear + 25% Stripe + 20% Perplexity + 10% ElevenLabs + 5% Vercel
 * Hero → Trust → Intro → AI Discovery → Highlights → ElevenLabs → Stripe → … → Vercel → Pricing → CTA
 */
export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <AlignHero />
      <WhatWeDoSection />
      <PerplexityDiscoverySection />
      <PastelFeatureCards />
      <ElevenLabsProductSection />
      <StripeProductShowcase />
      <ServiceCategoriesSection />
      <IndustriesSection />
      <ProjectsGallerySection />
      <FlagshipProductsSection />
      <StatsBand />
      <HowItWorksSection />
      <MissionSection />
      <VercelPlatformSection />
      <PricingSection />
      <FinalCTA />
    </div>
  );
}
