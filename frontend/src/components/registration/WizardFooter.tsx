import { Button } from '@/components/ui/button';

interface WizardFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

export function WizardFooter({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Continue',
  isFirstStep = false,
  isLastStep = false,
  isSubmitting = false,
}: WizardFooterProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 bg-background/95 pb-safe shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-lg gap-3 px-4 py-4 md:max-w-2xl">
        {!isFirstStep && (
          <Button type="button" variant="outline" className="min-h-11 flex-1 rounded-lg" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        <Button
          type="button"
          className="min-h-11 flex-1 rounded-lg border border-primary/60 font-bold shadow-sm"
          onClick={onNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : isLastStep ? 'Submit' : nextLabel}
        </Button>
      </div>
    </div>
  );
}
