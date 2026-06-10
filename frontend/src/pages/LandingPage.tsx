import { InvisibleHero } from '@/components/marketing/invisible/InvisibleHero';
import { InvisibleTrustStrip } from '@/components/marketing/invisible/InvisibleTrustStrip';
import { InvisibleIntroSection } from '@/components/marketing/invisible/InvisibleIntroSection';
import { FeatureSpotlightBand } from '@/components/marketing/invisible/FeatureSpotlightBand';
import { InvisiblePlatformShowcase } from '@/components/marketing/invisible/InvisiblePlatformShowcase';
import { KayaAgentShowcaseSection } from '@/components/marketing/notion/KayaAgentShowcaseSection';
import { InvisibleNetworkShowcase } from '@/components/marketing/invisible/InvisibleNetworkShowcase';
import { InvisibleProductsSection } from '@/components/marketing/invisible/InvisibleProductsSection';
import { ProjectsGallerySection } from '@/components/marketing/ProjectsGallerySection';
import {
  InvisibleStatsBand,
  InvisibleHowItWorks,
  InvisibleFinalCTA,
} from '@/components/marketing/invisible/InvisibleClosingSections';

/** Editorial sketchbook homepage — rich mockups, blue & orange accents */
export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <InvisibleHero />
      <InvisibleTrustStrip />
      <InvisibleIntroSection />
      <FeatureSpotlightBand />
      <InvisiblePlatformShowcase />
      <KayaAgentShowcaseSection />
      <InvisibleNetworkShowcase />
      <InvisibleProductsSection />
      <ProjectsGallerySection />
      <InvisibleStatsBand />
      <InvisibleHowItWorks />
      <InvisibleFinalCTA />
    </div>
  );
}
