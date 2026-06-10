import { MASCOT_ASSETS, VISUAL_ALT, type MascotAssetId } from '@/lib/marketing/visualAssets';
import { cn } from '@/lib/utils';

interface MascotImageProps {
  id: MascotAssetId;
  className?: string;
}

function MascotImage({ id, className }: MascotImageProps) {
  return (
    <img
      src={MASCOT_ASSETS[id]}
      alt={VISUAL_ALT[id]}
      className={cn('h-auto w-full object-contain', className)}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

export function AlignConsultantMascot({ className }: { className?: string }) {
  return <MascotImage id="consultant" className={className} />;
}

export function AlignTeamMascot({ className }: { className?: string }) {
  return <MascotImage id="team" className={className} />;
}

export function AlignAIAssistantMascot({ className }: { className?: string }) {
  return <MascotImage id="ai-assistant" className={className} />;
}
