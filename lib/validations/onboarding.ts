import { z } from 'zod';

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
  lastName: z
    .string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome muito longo'),
  age: z
    .number({ invalid_type_error: 'Idade é obrigatória' })
    .min(13, 'Você deve ter pelo menos 13 anos')
    .max(120, 'Idade inválida'),
  profilePicture: z.string().optional(),
});

// Step 2: Diagnosis Schema
export const diagnosisSchema = z.object({
  diagnosisType: z
    .union([
      z.enum(['TEA', 'TDAH', 'BOTH', 'EXPLORING']),
      z.undefined(),
      z.null(),
    ])
    .optional(),
});

// Combined Schema
export const onboardingSchema = personalInfoSchema.merge(diagnosisSchema);

// Types
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type DiagnosisFormData = z.infer<typeof diagnosisSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
