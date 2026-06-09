import { EmptyState } from '@/components/shared/EmptyState';

interface StepPlaceholderProps {
  stepNumber: number;
  title: string;
  description: string;
}

/** Placeholder step content — form fields injected later */
export function StepPlaceholder({ stepNumber, title, description }: StepPlaceholderProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="section-title text-left">Step {stepNumber}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <EmptyState
        title="Form fields coming soon"
        message="This step container is ready. Onboarding fields will be added when the architecture is provided."
      />
    </div>
  );
}
