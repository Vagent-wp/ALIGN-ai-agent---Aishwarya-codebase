import { cn } from '@/lib/utils';
import { MOCKUP_ASSETS, VISUAL_ALT, type MockupAssetId } from '@/lib/marketing/visualAssets';

type StageVariant = 'blue' | 'teal' | 'warm';

interface RichMockupStageProps {
  mockupId: MockupAssetId;
  variant?: StageVariant;
  className?: string;
  tilt?: boolean;
}

export function RichMockupStage({
  mockupId,
  variant = 'blue',
  className,
  tilt = false,
}: RichMockupStageProps) {
  return (
    <div
      className={cn(
        'inv-mock-stage',
        variant === 'blue' && 'inv-mock-stage--blue',
        variant === 'teal' && 'inv-mock-stage--teal',
        variant === 'warm' && 'inv-mock-stage--warm',
        className
      )}
    >
      <img
        src={MOCKUP_ASSETS[mockupId]}
        alt={VISUAL_ALT[mockupId]}
        className={cn('inv-mock-stage-img', tilt && 'origin-bottom-left -rotate-1')}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
