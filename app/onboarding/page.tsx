'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { useUser } from '@/lib/hooks/useUser';
import {
  personalInfoSchema,
  diagnosisSchema,
  type PersonalInfoFormData,
  type DiagnosisFormData,
} from '@/lib/validations/onboarding';
import Step1PersonalInfo from '@/components/onboarding/Step1PersonalInfo';
import Step2Diagnosis from '@/components/onboarding/Step2Diagnosis';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { logger } from '@/lib/utils/logger';
import { ArrowLeft, ArrowRight } from '@/lib/constants/icons';

export default function OnboardingPage() {
  const router = useRouter();
  const { user: clerkUser } = useClerkUser();
  const { refetch } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  // Form for Step 1
  const step1Form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: clerkUser?.firstName || '',
      lastName: clerkUser?.lastName || '',
      age: undefined,
      profilePicture: undefined,
    },
  });

  // Form for Step 2
  const step2Form = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      diagnosisType: undefined,
    },
  });

  const handleStep1Next = async () => {
    const isValid = await step1Form.trigger();
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = async () => {
    setIsSubmitting(true);

    try {
      const step1Data = step1Form.getValues();
      const step2Data = step2Form.getValues();

      const onboardingData = {
        ...step1Data,
        ...step2Data,
        profilePicture: photoUrl,
      };

      // Call API to save onboarding data
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error('Failed to save onboarding data');
      }

      // Refetch user data to update cache with onboardingCompleted: true
      await refetch();

      // Redirect to home
      router.push('/home');
    } catch (error) {
      logger.error('Onboarding submission failed', error, 'OnboardingPage');
      alert('Erro ao salvar seus dados. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <main className="max-w-[428px] mx-auto min-h-screen px-6 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Passo {currentStep} de 2
          </span>
          <span className="text-sm text-text-tertiary">{currentStep === 1 ? '50%' : '100%'}</span>
        </div>
        <div className="h-2 w-full rounded-full" style={{ backgroundColor: 'rgba(125, 211, 192, 0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(currentStep / 2) * 100}%`,
              backgroundColor: 'var(--primary)'
            }}
          />
        </div>
      </div>

      {/* Steps Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStep1Next();
              }}
            >
              <Step1PersonalInfo
                register={step1Form.register}
                errors={step1Form.formState.errors}
                photoValue={photoUrl}
                onPhotoChange={setPhotoUrl}
              />

              <div className="mt-8">
                <Button type="submit" variant="primary" className="w-full">
                  Próximo
                  <OptimizedIcon icon={ArrowRight} size={20} className="ml-2" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStep2Submit();
              }}
            >
              <Step2Diagnosis setValue={step2Form.setValue} watch={step2Form.watch} />

              <div className="mt-8 space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="mr-2 border-white" />
                      Finalizando...
                    </>
                  ) : (
                    'Finalizar'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <OptimizedIcon icon={ArrowLeft} size={20} className="mr-2" />
                  Voltar
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
