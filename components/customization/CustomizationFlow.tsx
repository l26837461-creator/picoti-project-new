"use client";

import { useCallback, useState } from "react";
import {
  INITIAL_CUSTOMIZATION,
  submitCustomization,
  type CustomizationFormData,
  type ProductType,
} from "@/lib/customization";
import { GinghamBackground } from "./GinghamBackground";
import { STEP_BACKGROUND, STEP_COUNT, type StepIndex } from "./types";
import { ConfirmStep } from "./steps/ConfirmStep";
import { InfoStep } from "./steps/InfoStep";
import { ProductTypeStep } from "./steps/ProductTypeStep";
import { UploadStep } from "./steps/UploadStep";
import { WelcomeStep } from "./steps/WelcomeStep";

export function CustomizationFlow() {
  const [currentStep, setCurrentStep] = useState<StepIndex>(0);
  const [formData, setFormData] =
    useState<CustomizationFormData>(INITIAL_CUSTOMIZATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateFormData = useCallback(
    (patch: Partial<CustomizationFormData>) => {
      setFormData((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= STEP_COUNT - 1) return prev;
      return (prev + 1) as StepIndex;
    });
  }, []);

  const goPrevious = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev <= 0) return prev;
      return (prev - 1) as StepIndex;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitCustomization(formData);
      setSubmitSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "提交失败，请稍后重试";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const backgroundVariant = STEP_BACKGROUND[currentStep];

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <GinghamBackground variant={backgroundVariant}>
        <StepContainer step={currentStep}>
          {currentStep === 0 && <WelcomeStep onStart={goNext} />}
          {currentStep === 1 && (
            <ProductTypeStep
              productType={formData.productType}
              onProductTypeChange={(productType: ProductType) =>
                updateFormData({ productType })
              }
              onNext={goNext}
            />
          )}
          {currentStep === 2 && (
            <UploadStep
              photos={formData.photos}
              onPhotosChange={(photos) => updateFormData({ photos })}
              onPrevious={goPrevious}
              onNext={goNext}
            />
          )}
          {currentStep === 3 && (
            <InfoStep
              formData={formData}
              onFormDataChange={updateFormData}
              onPrevious={goPrevious}
              onNext={goNext}
            />
          )}
          {currentStep === 4 && (
            <ConfirmStep
              onPrevious={goPrevious}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
            />
          )}
        </StepContainer>
      </GinghamBackground>
    </div>
  );
}

type StepContainerProps = {
  step: StepIndex;
  children: React.ReactNode;
};

function StepContainer({ step, children }: StepContainerProps) {
  return (
    <div
      key={step}
      role="group"
      aria-label={`步骤 ${step + 1}`}
      className="relative h-full min-h-0 w-full flex-1"
    >
      {children}
    </div>
  );
}
