import { HeroSection } from '@/components/sections/HeroSection';
import { AboutAishwaryaSection } from '@/components/sections/AboutAishwaryaSection';
import { WhoIsItForSection } from '@/components/sections/WhoIsItForSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CommunityVisionSection } from '@/components/sections/CommunityVisionSection';
import { EarlyAccessCTASection } from '@/components/sections/EarlyAccessCTASection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutAishwaryaSection />
      <WhoIsItForSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CommunityVisionSection />
      <EarlyAccessCTASection />
    </>
  );
}
