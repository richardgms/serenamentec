/**
 * Journey utility functions
 * Helpers for working with self-discovery journeys
 */

export type JourneyType = 'AM_I_AUTISTIC' | 'UNDERSTANDING_ADHD' | 'SENSORY_PROCESSING';

export interface JourneyInfo {
  type: JourneyType;
  title: string;
  description: string;
  totalSteps: number;
  emoji: string;
  color: string;
  gradient: string;
}

/**
 * Journey metadata
 */
export const journeyInfo: Record<JourneyType, JourneyInfo> = {
  AM_I_AUTISTIC: {
    type: 'AM_I_AUTISTIC',
    title: 'Será que sou autista?',
    description: 'Uma jornada de autoconhecimento sobre características do autismo',
    totalSteps: 10,
    emoji: '🧩',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
  },
  UNDERSTANDING_ADHD: {
    type: 'UNDERSTANDING_ADHD',
    title: 'Entendendo o TDAH',
    description: 'Explore as características e desafios do TDAH',
    totalSteps: 8,
    emoji: '⚡',
    color: '#ACFFF9',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  SENSORY_PROCESSING: {
    type: 'SENSORY_PROCESSING',
    title: 'Processamento Sensorial',
    description: 'Compreenda suas sensibilidades e necessidades sensoriais',
    totalSteps: 12,
    emoji: '✨',
    color: '#EFFFEA',
    gradient: 'from-[var(--surface-card)]/60 to-[var(--surface-card)]/20',
  },
};

/**
 * Get journey info by type
 */
export function getJourneyInfo(type: JourneyType): JourneyInfo {
  return journeyInfo[type];
}

/**
 * Get all journeys
 */
export function getAllJourneys(): JourneyInfo[] {
  return Object.values(journeyInfo);
}

/**
 * Get all journey types
 */
export function getAllJourneyTypes(): JourneyType[] {
  return Object.keys(journeyInfo) as JourneyType[];
}

/**
 * Get journey icon name (for server-side usage)
 */
export function getJourneyIconName(type: JourneyType): string {
  const iconNames = {
    AM_I_AUTISTIC: 'Brain',
    UNDERSTANDING_ADHD: 'Target',
    SENSORY_PROCESSING: 'Sparkle',
  };
  return iconNames[type];
}

/**
 * Get journey icon component (for client-side usage only)
 * @deprecated Use getJourneyIconName and import icons where needed
 */
export function getJourneyIcon(type: JourneyType) {
  // This function is deprecated to avoid SSR issues
  // Import icons dynamically to avoid SSR issues
  const iconNames = {
    AM_I_AUTISTIC: 'Brain',
    UNDERSTANDING_ADHD: 'Target',
    SENSORY_PROCESSING: 'Sparkle',
  };
  return iconNames[type];
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completedSteps: number[], totalSteps: number): number {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps.length / totalSteps) * 100);
}

/**
 * Get journey status
 */
export function getJourneyStatus(
  completedSteps: number[],
  totalSteps: number
): 'not_started' | 'in_progress' | 'completed' {
  if (completedSteps.length === 0) return 'not_started';
  if (completedSteps.length === totalSteps) return 'completed';
  return 'in_progress';
}

/**
 * Get status label in Portuguese
 */
export function getStatusLabel(
  status: 'not_started' | 'in_progress' | 'completed'
): string {
  const labels = {
    not_started: 'Não iniciada',
    in_progress: 'Em andamento',
    completed: 'Concluída',
  };
  return labels[status];
}

/**
 * Get status color
 */
export function getStatusColor(
  status: 'not_started' | 'in_progress' | 'completed'
): string {
  const colors = {
    not_started: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-primary/10 text-primary',
    completed: 'bg-green-100 text-green-700',
  };
  return colors[status];
}

/**
 * Check if step is completed
 */
export function isStepCompleted(step: number, completedSteps: number[]): boolean {
  return completedSteps.includes(step);
}

/**
 * Format step number (e.g., "Etapa 1 de 10")
 */
export function formatStepNumber(current: number, total: number): string {
  return `Etapa ${current} de ${total}`;
}
