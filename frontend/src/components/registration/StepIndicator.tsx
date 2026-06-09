interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-lg gap-1.5 md:max-w-2xl">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-[5px] flex-1 rounded-full transition-colors duration-300 ${
              index <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="mx-auto mt-2 flex max-w-lg justify-between md:max-w-2xl">
        {steps.map((label, index) => (
          <span
            key={label}
            className={`text-[10px] font-semibold tracking-wide ${
              index === currentStep
                ? 'text-primary'
                : index < currentStep
                  ? 'text-primary/60'
                  : 'text-muted-foreground/50'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
