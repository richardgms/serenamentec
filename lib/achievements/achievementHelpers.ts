/**
 * Achievement Helper Functions
 * Metadata and utilities for the gamification system
 */

export type AchievementType =
  | 'FIRST_BREATHING'
  | 'EXPLORER_5_VIDEOS'
  | 'SELF_KNOWLEDGE'
  | 'SEVEN_DAYS_JOURNEY'
  | 'REFLECTIVE_10'
  | 'THIRTY_DAYS_CARE';

export interface AchievementInfo {
  type: AchievementType;
  title: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
  requirement: number; // Total needed to unlock
  category: 'breathing' | 'videos' | 'discovery' | 'streak' | 'reflection';
}

/**
 * Achievement metadata
 */
export const achievementInfo: Record<AchievementType, AchievementInfo> = {
  FIRST_BREATHING: {
    type: 'FIRST_BREATHING',
    title: 'Primeira Respiração',
    description: 'Completou sua primeira sessão de respiração guiada',
    emoji: '🫁',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
    requirement: 1,
    category: 'breathing',
  },
  EXPLORER_5_VIDEOS: {
    type: 'EXPLORER_5_VIDEOS',
    title: 'Explorador',
    description: 'Assistiu 5 vídeos diferentes de relaxamento',
    emoji: '🎥',
    color: '#ACFFF9',
    gradient: 'from-secondary/20 to-secondary/5',
    requirement: 5,
    category: 'videos',
  },
  SELF_KNOWLEDGE: {
    type: 'SELF_KNOWLEDGE',
    title: 'Autoconhecimento',
    description: 'Completou sua primeira jornada de descoberta',
    emoji: '🧩',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
    requirement: 1,
    category: 'discovery',
  },
  REFLECTIVE_10: {
    type: 'REFLECTIVE_10',
    title: 'Reflexivo',
    description: 'Respondeu 10 reflexões diárias',
    emoji: '✍️',
    color: '#EFFFEA',
    gradient: 'from-[var(--surface-card)]/60 to-[var(--surface-card)]/20',
    requirement: 10,
    category: 'reflection',
  },
  SEVEN_DAYS_JOURNEY: {
    type: 'SEVEN_DAYS_JOURNEY',
    title: 'Jornada de 7 Dias',
    description: 'Manteve um streak de 7 dias consecutivos',
    emoji: '🔥',
    color: '#FF6B6B',
    gradient: 'from-red-200 to-orange-100',
    requirement: 7,
    category: 'streak',
  },
  THIRTY_DAYS_CARE: {
    type: 'THIRTY_DAYS_CARE',
    title: '30 Dias de Autocuidado',
    description: 'Manteve um streak incrível de 30 dias',
    emoji: '🌟',
    color: '#FFD93D',
    gradient: 'from-yellow-200 to-amber-100',
    requirement: 30,
    category: 'streak',
  },
};

/**
 * Get achievement info by type
 */
export function getAchievementInfo(type: AchievementType): AchievementInfo {
  return achievementInfo[type];
}

/**
 * Get all achievements info
 */
export function getAllAchievements(): AchievementInfo[] {
  return Object.values(achievementInfo);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(
  category: AchievementInfo['category']
): AchievementInfo[] {
  return getAllAchievements().filter((a) => a.category === category);
}

/**
 * Format achievement date
 */
export function formatAchievementDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(current: number, required: number): number {
  if (required === 0) return 100;
  return Math.min(100, Math.round((current / required) * 100));
}
