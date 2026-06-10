import type { ComponentType } from 'react';
import { MarketingIllustrationFrame } from '@/components/marketing/MarketingIllustrationFrame';
import {
  AlignAIAssistantMascot,
  AlignConsultantMascot,
  AlignTeamMascot,
} from '@/components/marketing/illustrations/AlignMascots';
import {
  AlignAISearchMockup,
  AlignAnalyticsDashboardMockup,
  AlignKayaChatMockup,
  AlignNetworkDashboardMockup,
} from '@/components/marketing/mockups/AlignProductMockups';
import { cn } from '@/lib/utils';

export type AlignVisualId =
  | 'consultant'
  | 'team'
  | 'ai-assistant'
  | 'analytics-dashboard'
  | 'ai-search'
  | 'network-dashboard'
  | 'kaya-chat';

const VISUALS: Record<AlignVisualId, ComponentType<{ className?: string }>> = {
  consultant: AlignConsultantMascot,
  team: AlignTeamMascot,
  'ai-assistant': AlignAIAssistantMascot,
  'analytics-dashboard': AlignAnalyticsDashboardMockup,
  'ai-search': AlignAISearchMockup,
  'network-dashboard': AlignNetworkDashboardMockup,
  'kaya-chat': AlignKayaChatMockup,
};

interface AlignVisualProps {
  visual: AlignVisualId;
  framed?: boolean;
  className?: string;
}

export function AlignVisual({ visual, framed = true, className }: AlignVisualProps) {
  const Component = VISUALS[visual];
  const node = <Component className={cn('h-auto w-full', !framed && className)} />;

  if (!framed) return node;

  return (
    <MarketingIllustrationFrame className={className}>
      <Component className="h-auto w-full" />
    </MarketingIllustrationFrame>
  );
}
