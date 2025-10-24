export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  benefit: string;
  emoji: string;
  phases: {
    inhale: number;
    hold: number;
    exhale: number;
    pause?: number;
  };
  type: 'ANXIETY_478' | 'BALANCE_4444' | 'SLEEP_466' | 'CUSTOM';
  gradient: string;
}

export const breathingPatterns: Record<string, BreathingPattern> = {
  ANXIETY_478: {
    id: 'anxiety-478',
    name: '4-7-8',
    description: 'Respiração para Ansiedade',
    benefit: 'Reduz ansiedade e acalma o sistema nervoso',
    emoji: '🌬️',
    phases: {
      inhale: 4,
      hold: 7,
      exhale: 8,
    },
    type: 'ANXIETY_478',
    gradient: 'from-[#5DADE2] to-[#3498DB]',
  },
  BALANCE_4444: {
    id: 'balance-4444',
    name: '4-4-4-4',
    description: 'Respiração Quadrada',
    benefit: 'Promove equilíbrio e concentração',
    emoji: '⚖️',
    phases: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4,
    },
    type: 'BALANCE_4444',
    gradient: 'from-[#7DD3C0] to-[#58B09C]',
  },
  SLEEP_466: {
    id: 'sleep-466',
    name: '4-6-6',
    description: 'Respiração para Dormir',
    benefit: 'Ajuda a relaxar e preparar para o sono',
    emoji: '💤',
    phases: {
      inhale: 4,
      hold: 6,
      exhale: 6,
    },
    type: 'SLEEP_466',
    gradient: 'from-[#A29BFE] to-[#6C5CE7]',
  },
};

export const getPhaseLabel = (phase: BreathingPhase): string => {
  const labels: Record<BreathingPhase, string> = {
    inhale: 'Inspire',
    hold: 'Segure',
    exhale: 'Expire',
    pause: 'Pausa',
  };
  return labels[phase];
};

export const getPhaseColor = (phase: BreathingPhase): string => {
  const colors: Record<BreathingPhase, string> = {
    inhale: 'text-blue-500',
    hold: 'text-yellow-500',
    exhale: 'text-green-500',
    pause: 'text-gray-500',
  };
  return colors[phase];
};

export const getPhaseGradient = (phase: BreathingPhase): string => {
  const gradients: Record<BreathingPhase, string> = {
    inhale: 'from-blue-100 to-blue-200',
    hold: 'from-yellow-100 to-yellow-200',
    exhale: 'from-green-100 to-green-200',
    pause: 'from-gray-100 to-gray-200',
  };
  return gradients[phase];
};

export const calculateTotalCycleDuration = (phases: {
  inhale: number;
  hold: number;
  exhale: number;
  pause?: number;
}): number => {
  return phases.inhale + phases.hold + phases.exhale + (phases.pause || 0);
};

export const calculateTotalSessionDuration = (
  phases: {
    inhale: number;
    hold: number;
    exhale: number;
    pause?: number;
  },
  cycles: number
): number => {
  return calculateTotalCycleDuration(phases) * cycles;
};
