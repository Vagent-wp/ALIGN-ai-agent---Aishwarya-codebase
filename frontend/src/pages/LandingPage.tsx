import { AlignHero } from '@/components/marketing/AlignHero';
import { TrustMarquee } from '@/components/marketing/TrustMarquee';
import { WhatWeDoSection } from '@/components/marketing/WhatWeDoSection';
import { PastelFeatureCards } from '@/components/marketing/PastelFeatureCards';
import { ServiceCategoriesSection } from '@/components/marketing/ServiceCategoriesSection';
import { IndustriesSection } from '@/components/marketing/IndustriesSection';
import { ProjectsGallerySection } from '@/components/marketing/ProjectsGallerySection';
import { FlagshipProductsSection } from '@/components/marketing/FlagshipProductsSection';
import { StatsBand, HowItWorksSection, MissionSection, FinalCTA } from '@/components/marketing/MissionAndCTA';

/**
 * Homepage section order (top → bottom):
 * Hero → Trust → Intro → Highlights → Services → Industries → Projects → Products → Stats → Process → Mission → CTA
 */
export function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <AlignHero />
      <TrustMarquee />
      <WhatWeDoSection />
      <PastelFeatureCards />
      <ServiceCategoriesSection />
      <IndustriesSection />
      <ProjectsGallerySection />
      <FlagshipProductsSection />
      <StatsBand />
      <HowItWorksSection />
      <MissionSection />
      <FinalCTA />
    </div>
  );
}
