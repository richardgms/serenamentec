import { z } from 'zod';

const diagnosisEnum = z.enum(['TEA', 'TDAH', 'BOTH', 'EXPLORING']);
const crisisTypeEnum = z.enum(['SENSORY', 'EMOTIONAL', 'EXECUTIVE', 'OTHER']);
const crisisDurationEnum = z.enum([
  'LESS_5MIN',
  'MIN_5_30',
  'MIN_30_60',
  'MORE_60MIN',
]);
const crisisPeriodEnum = z.enum(['7days', '30days', '90days', 'all']);

const coerceNumber = z
  .union([z.string(), z.number()])
  .transform((value) => {
    if (typeof value === 'number') return value;
    if (!value) return NaN;
    return Number(value);
  })
  .refine((value) => Number.isInteger(value), 'Valor numerico invalido');

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome muito longo'),
  age: coerceNumber
    .refine((value) => !Number.isNaN(value), 'Idade obrigatoria')
    .refine((value) => value >= 13 && value <= 120, 'Idade invalida'),
  diagnosisType: diagnosisEnum.nullable().optional(),
  profilePicture: z
    .string()
    .trim()
    .url('URL invalida')
    .optional()
    .or(z.literal(''))
    .or(z.null()),
});

export const preferencesUpdateSchema = z
  .object({
    vibrationEnabled: z.boolean().optional(),
    soundEnabled: z.boolean().optional(),
  })
  .refine(
    (data) =>
      typeof data.vibrationEnabled === 'boolean' ||
      typeof data.soundEnabled === 'boolean',
    {
      message: 'Informe ao menos uma preferencia',
      path: ['vibrationEnabled'],
    }
  );

export const crisisLogSchema = z
  .object({
    intensity: coerceNumber
      .refine((value) => !Number.isNaN(value), 'Intensidade obrigatoria')
      .refine(
        (value) => value >= 1 && value <= 5,
        'Intensidade deve ser entre 1 e 5'
      ),
    crisisTypes: z
      .array(crisisTypeEnum)
      .min(1, 'Selecione pelo menos um tipo de crise'),
    duration: crisisDurationEnum,
    whatHelped: z
      .array(z.string().min(1))
      .min(1, 'Selecione pelo menos uma estrategia'),
    additionalNotes: z
      .string()
      .trim()
      .max(1000, 'Escreva no maximo 1000 caracteres')
      .optional()
      .transform((value) => (value ? value : undefined)),
    triggers: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(80, 'Cada gatilho deve ter no maximo 80 caracteres')
      )
      .optional()
      .transform((value) => value?.filter(Boolean) ?? undefined),
    location: z
      .string()
      .trim()
      .max(120, 'Local deve ter no maximo 120 caracteres')
      .optional()
      .transform((value) => (value ? value : undefined)),
    otherSupport: z
      .string()
      .trim()
      .max(120, 'Escreva no maximo 120 caracteres')
      .optional()
      .transform((value) => (value ? value : undefined)),
  })
  .refine(
    (data) => !(data.whatHelped.length === 0 && !data.otherSupport),
    {
      message: 'Informe o que ajudou durante a crise',
      path: ['whatHelped'],
    }
  );

export const crisisHistoryQuerySchema = z.object({
  period: crisisPeriodEnum.default('30days'),
  page: coerceNumber
    .optional()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .optional()
    .refine((value) => (value ? value >= 1 : true), 'Pagina invalida'),
  limit: coerceNumber
    .optional()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .refine(
      (value) => (value ? value >= 1 && value <= 50 : true),
      'Limite invalido'
    ),
});

export const accountDeletionSchema = z.object({
  acknowledge: z.literal(true, {
    errorMap: () => ({ message: 'Confirme que entende a exclusao' }),
  }),
  confirmationText: z.literal('EXCLUIR', {
    errorMap: () => ({
      message: 'Digite EXCLUIR para confirmar',
    }),
  }),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type PreferencesUpdateInput = z.infer<typeof preferencesUpdateSchema>;
export type CrisisLogInput = z.infer<typeof crisisLogSchema>;
export type CrisisHistoryQuery = z.infer<typeof crisisHistoryQuerySchema>;
export type AccountDeletionInput = z.infer<typeof accountDeletionSchema>;
