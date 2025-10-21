/**
 * Topic utility functions
 * Helpers for working with neurodivergence topics
 */

export type TopicType =
  | 'SENSORY_SENSITIVITY'
  | 'SOCIAL_COMMUNICATION'
  | 'ROUTINES_RITUALS'
  | 'HYPERFOCUS'
  | 'STIMMING'
  | 'MASKING'
  | 'SENSORY_OVERLOAD'
  | 'EXECUTIVE_FUNCTION';

export type ResonateAnswer = 'YES' | 'NO' | 'MAYBE';

export interface TopicInfo {
  type: TopicType;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
}

/**
 * Topic metadata
 */
export const topicInfo: Record<TopicType, TopicInfo> = {
  SENSORY_SENSITIVITY: {
    type: 'SENSORY_SENSITIVITY',
    title: 'Sensibilidade Sensorial',
    subtitle: 'Como você percebe o mundo ao seu redor',
    emoji: '👁️',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
  },
  SOCIAL_COMMUNICATION: {
    type: 'SOCIAL_COMMUNICATION',
    title: 'Comunicação Social',
    subtitle: 'Interações e conexões com outras pessoas',
    emoji: '💬',
    color: '#ACFFF9',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  ROUTINES_RITUALS: {
    type: 'ROUTINES_RITUALS',
    title: 'Rotinas e Rituais',
    subtitle: 'Padrões e previsibilidade no dia a dia',
    emoji: '📅',
    color: '#EFFFEA',
    gradient: 'from-surface/60 to-surface/20',
  },
  HYPERFOCUS: {
    type: 'HYPERFOCUS',
    title: 'Hiperfoco',
    subtitle: 'Atenção intensa em atividades de interesse',
    emoji: '🎯',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
  },
  STIMMING: {
    type: 'STIMMING',
    title: 'Stimming',
    subtitle: 'Movimentos e comportamentos de autorregulação',
    emoji: '🤲',
    color: '#ACFFF9',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  MASKING: {
    type: 'MASKING',
    title: 'Masking',
    subtitle: 'Camuflagem de características neurodivergentes',
    emoji: '🎭',
    color: '#EFFFEA',
    gradient: 'from-surface/60 to-surface/20',
  },
  SENSORY_OVERLOAD: {
    type: 'SENSORY_OVERLOAD',
    title: 'Sobrecarga Sensorial',
    subtitle: 'Quando os estímulos são demais',
    emoji: '⚠️',
    color: '#84C2BE',
    gradient: 'from-primary/20 to-primary/5',
  },
  EXECUTIVE_FUNCTION: {
    type: 'EXECUTIVE_FUNCTION',
    title: 'Função Executiva',
    subtitle: 'Planejamento, organização e tomada de decisões',
    emoji: '🧠',
    color: '#ACFFF9',
    gradient: 'from-secondary/20 to-secondary/5',
  },
};

/**
 * Get topic info by type
 */
export function getTopicInfo(type: TopicType): TopicInfo {
  return topicInfo[type];
}

/**
 * Get all topics
 */
export function getAllTopics(): TopicInfo[] {
  return Object.values(topicInfo);
}

/**
 * Resonate answer labels in Portuguese
 */
export const resonateLabels: Record<ResonateAnswer, string> = {
  YES: 'Sim, muito',
  NO: 'Não muito',
  MAYBE: 'Talvez',
};

/**
 * Get resonate label
 */
export function getResonateLabel(answer: ResonateAnswer): string {
  return resonateLabels[answer];
}

/**
 * Resonate answer colors
 */
export const resonateColors: Record<ResonateAnswer, string> = {
  YES: 'bg-primary text-white',
  NO: 'bg-gray-200 text-gray-700',
  MAYBE: 'bg-secondary/30 text-gray-800',
};

/**
 * Get resonate color
 */
export function getResonateColor(answer: ResonateAnswer): string {
  return resonateColors[answer];
}

/**
 * Resonate answer emojis
 */
export const resonateEmojis: Record<ResonateAnswer, string> = {
  YES: '✅',
  NO: '❌',
  MAYBE: '🤔',
};

/**
 * Get resonate emoji
 */
export function getResonateEmoji(answer: ResonateAnswer): string {
  return resonateEmojis[answer];
}

/**
 * Check if topic was explored
 */
export function isTopicExplored(resonates?: ResonateAnswer, notes?: string): boolean {
  return resonates !== undefined || (notes !== undefined && notes.length > 0);
}
