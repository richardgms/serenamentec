/**
 * Encouragement Messages
 * Positive feedback messages for different actions
 */

export type MessageCategory =
  | 'breathingComplete'
  | 'reflectionSaved'
  | 'journeyStepComplete'
  | 'crisisSaved'
  | 'videoWatched'
  | 'achievementUnlocked'
  | 'streakMilestone';

const messages: Record<MessageCategory, string[]> = {
  breathingComplete: [
    'Sua respiração trouxe calma 🌊',
    'Você está cuidando de si 💙',
    'Cada respiração é um ato de autocuidado ✨',
    'Momento de paz conquistado 🕊️',
    'Você merece essa pausa 🌿',
  ],

  reflectionSaved: [
    'Sua reflexão é valiosa ✨',
    'Autoconhecimento é uma jornada linda 🌱',
    'Obrigado por se dedicar a refletir 💚',
    'Cada reflexão te aproxima de você mesmo 🦋',
    'Sua jornada de autoconhecimento é inspiradora 🌟',
  ],

  journeyStepComplete: [
    'Mais um passo! Continue assim 🌟',
    'Você está indo muito bem! 💫',
    'Cada etapa te fortalece 🌱',
    'Orgulhe-se do seu progresso 💚',
    'Você está fazendo um trabalho incrível ✨',
  ],

  crisisSaved: [
    'Você foi corajoso ao registrar 💚',
    'Cada crise superada te fortalece 🌿',
    'Você não está sozinho nessa jornada 🤝',
    'Registrar é um ato de cuidado consigo 💙',
    'Você está aprendendo com cada experiência ✨',
  ],

  videoWatched: [
    'Espero que tenha trazido paz 🌊',
    'Momentos de calma são importantes 💙',
    'Você merece esse relaxamento ✨',
    'Continue cuidando de si 🌿',
  ],

  achievementUnlocked: [
    'Parabéns pela conquista! 🎉',
    'Você está fazendo progresso incrível! ✨',
    'Cada conquista importa 🌟',
    'Continue assim! 💫',
  ],

  streakMilestone: [
    'Sua dedicação é inspiradora! 🔥',
    'Você está mantendo o ritmo! 💪',
    'Cada dia conta na sua jornada 🌟',
    'Que orgulho do seu compromisso! ✨',
  ],
};

/**
 * Get a random encouragement message
 */
export function getRandomMessage(category: MessageCategory): string {
  const categoryMessages = messages[category];
  if (!categoryMessages || categoryMessages.length === 0) {
    return 'Você está indo bem! 💚';
  }

  const randomIndex = Math.floor(Math.random() * categoryMessages.length);
  return categoryMessages[randomIndex];
}

/**
 * Get multiple random messages (non-repeating)
 */
export function getRandomMessages(
  category: MessageCategory,
  count: number
): string[] {
  const categoryMessages = [...messages[category]];
  const result: string[] = [];

  for (let i = 0; i < Math.min(count, categoryMessages.length); i++) {
    const randomIndex = Math.floor(Math.random() * categoryMessages.length);
    result.push(categoryMessages[randomIndex]);
    categoryMessages.splice(randomIndex, 1); // Remove to avoid repeats
  }

  return result;
}
