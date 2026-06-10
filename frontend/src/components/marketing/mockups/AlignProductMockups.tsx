import { KayaWhatsAppAnimatedMockup } from '@/components/marketing/mockups/KayaWhatsAppAnimatedMockup';
import { kayaShowcaseScenarios } from '@/lib/marketing/kayaShowcaseContent';
import { MOCKUP_ASSETS, VISUAL_ALT, type MockupAssetId } from '@/lib/marketing/visualAssets';
import { cn } from '@/lib/utils';

interface MockupImageProps {
  id: MockupAssetId;
  className?: string;
}

function MockupImage({ id, className }: MockupImageProps) {
  return (
    <img
      src={MOCKUP_ASSETS[id]}
      alt={VISUAL_ALT[id]}
      className={cn('h-auto w-full object-contain', className)}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

export function AlignAnalyticsDashboardMockup({ className }: { className?: string }) {
  return <MockupImage id="analytics-dashboard" className={className} />;
}

export function AlignAISearchMockup({ className }: { className?: string }) {
  return <MockupImage id="ai-search" className={className} />;
}

export function AlignKayaChatMockup({ className, animated = true }: { className?: string; animated?: boolean }) {
  const scenario = kayaShowcaseScenarios[0]!;

  if (animated) {
    return (
      <KayaWhatsAppAnimatedMockup
        scenarioKey={scenario.id}
        messages={scenario.messages}
        className={className}
      />
    );
  }

  return <MockupImage id="kaya-chat" className={className} />;
}

export function AlignNetworkDashboardMockup({ className }: { className?: string }) {
  return <MockupImage id="network-dashboard" className={className} />;
}
