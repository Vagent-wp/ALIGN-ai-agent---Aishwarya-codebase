import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { FileUploadZone } from '@/components/registration/FileUploadZone';
import { StepIndicator } from '@/components/registration/StepIndicator';
import { StepPlaceholder } from '@/components/registration/StepPlaceholder';
import { WizardFooter } from '@/components/registration/WizardFooter';
import { validateStep } from '@/lib/validation';

const STEPS = ['Profile', 'Details', 'Review'];

export function EarlyAccessPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.success) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    navigate('/thank-you');
  };

  const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <header className="glass shrink-0 border-b border-border/40 pt-safe">
        <div className="flex min-h-14 items-center justify-center px-4">
          <AlignBrand variant="full" size="sm" linkToHome />
        </div>
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y pb-28">
        <div className="page-shell py-6">
          {currentStep === 0 && (
            <StepPlaceholder
              stepNumber={1}
              title="Your profile"
              description="Tell us who you are in the ecosystem. Form fields will be added here."
            />
          )}
          {currentStep === 1 && (
            <>
              <StepPlaceholder
                stepNumber={2}
                title="Additional details"
                description="More information about your needs and interests."
              />
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold">Upload framework (optional)</p>
                <FileUploadZone onFilesChange={(files) => setFormData({ ...formData, files: files.length })} />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <StepPlaceholder
              stepNumber={3}
              title="Review & submit"
              description="Confirm your information before joining the waitlist."
            />
          )}
        </div>
      </div>

      <WizardFooter
        onBack={handleBack}
        onNext={handleNext}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === STEPS.length - 1}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
