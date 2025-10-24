'use client';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DiagnosisFormData } from '@/lib/validations/onboarding';
import { Card } from '@/components/ui/Card';

interface Step2Props {
  setValue: UseFormSetValue<DiagnosisFormData>;
  watch: UseFormWatch<DiagnosisFormData>;
}

const diagnosisOptions = [
  {
    value: 'TEA',
    label: 'TEA',
    description: 'Transtorno do Espectro Autista',
    emoji: '🧩',
  },
  {
    value: 'TDAH',
    label: 'TDAH',
    description: 'Transtorno do Déficit de Atenção com Hiperatividade',
    emoji: '⚡',
  },
  {
    value: 'BOTH',
    label: 'Ambos',
    description: 'TEA e TDAH',
    emoji: '🌈',
  },
  {
    value: 'EXPLORING',
    label: 'Explorando',
    description: 'Ainda estou me conhecendo',
    emoji: '🔍',
  },
] as const;

export default function Step2Diagnosis({ setValue, watch }: Step2Props) {
  const selectedValue = watch('diagnosisType');

  const handleSelect = (value: 'TEA' | 'TDAH' | 'BOTH' | 'EXPLORING') => {
    setValue('diagnosisType', value, { shouldValidate: true });
  };

  const handleSkip = () => {
    setValue('diagnosisType', undefined);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-text-primary">
          Como você se identifica?
        </h2>
        <p className="text-text-secondary">
          Isso nos ajuda a personalizar o conteúdo para você
        </p>
      </div>

      {/* Diagnosis Options */}
      <div className="space-y-3">
        {diagnosisOptions.map((option) => (
          <Card
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="cursor-pointer transition-all"
            style={{
              border: selectedValue === option.value
                ? '2px solid var(--primary)'
                : '2px solid var(--border-light)',
              backgroundColor: selectedValue === option.value
                ? 'rgba(125, 211, 192, 0.1)'
                : 'var(--surface-card)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.emoji}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{option.label}</h3>
                <p className="text-sm text-text-secondary">{option.description}</p>
              </div>
              {selectedValue === option.value && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Skip Option */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-text-tertiary hover:text-text-secondary transition-smooth underline"
        >
          Prefiro não informar agora
        </button>
      </div>

      {/* Helper Text */}
      <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: 'var(--surface-card)', color: 'var(--text-secondary)' }}>
        <p>
          💚 <strong>Essa informação é privada</strong> e será usada apenas para
          personalizar sua experiência. Você pode alterá-la a qualquer momento nas
          configurações.
        </p>
      </div>
    </div>
  );
}
