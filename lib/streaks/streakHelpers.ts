/**
 * Streak Helper Functions
 * Logic for managing user activity streaks
 */

/**
 * Calculate hours between two dates
 */
export function hoursBetween(date1: Date, date2: Date): number {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  return diffMs / (1000 * 60 * 60);
}

/**
 * Check if should reset streak
 * @param lastCheckIn Last check-in date
 * @param allowRestDay If true, allows up to 48h (1 rest day)
 * @returns true if streak should reset
 */
export function shouldResetStreak(
  lastCheckIn: Date,
  allowRestDay: boolean = false
): boolean {
  const now = new Date();
  const hours = hoursBetween(lastCheckIn, now);

  // If less than 24 hours, no reset needed
  if (hours < 24) {
    return false;
  }

  // If between 24-48h and rest day allowed, don't reset
  if (allowRestDay && hours < 48) {
    return false;
  }

  // If more than 48h or rest day not allowed and >24h, reset
  return hours >= (allowRestDay ? 48 : 24);
}

/**
 * Check if can increment streak
 * @param lastCheckIn Last check-in date
 * @returns true if at least 24h passed (new day)
 */
export function canIncrementStreak(lastCheckIn: Date): boolean {
  const now = new Date();
  const hours = hoursBetween(lastCheckIn, now);
  return hours >= 24;
}

/**
 * Calculate new streak value
 * @param currentStreak Current streak count
 * @param lastCheckIn Last check-in date
 * @param restDayUsed Whether rest day was already used
 * @returns { newStreak, usedRestDay }
 */
export function calculateStreak(
  currentStreak: number,
  lastCheckIn: Date,
  restDayUsed: boolean
): { newStreak: number; usedRestDay: boolean } {
  const now = new Date();
  const hours = hoursBetween(lastCheckIn, now);

  // Less than 24h: no change
  if (hours < 24) {
    return {
      newStreak: currentStreak,
      usedRestDay: restDayUsed,
    };
  }

  // 24-48h: can use rest day if not used
  if (hours < 48 && !restDayUsed) {
    return {
      newStreak: currentStreak + 1,
      usedRestDay: true, // Mark rest day as used
    };
  }

  // 24-48h but rest day already used: increment normally
  if (hours < 48 && restDayUsed) {
    return {
      newStreak: currentStreak + 1,
      usedRestDay: false, // Reset rest day for next cycle
    };
  }

  // More than 48h: reset streak
  return {
    newStreak: 1,
    usedRestDay: false,
  };
}

/**
 * Format streak text
 */
export function formatStreakText(streak: number): string {
  if (streak === 0) return 'Comece sua jornada!';
  if (streak === 1) return '1 dia';
  return `${streak} dias`;
}

/**
 * Get streak emoji based on count
 */
export function getStreakEmoji(streak: number): string {
  if (streak === 0) return '💫';
  if (streak < 7) return '🔥';
  if (streak < 30) return '🔥🔥';
  return '🔥🔥🔥';
}

/**
 * Get streak color based on count
 */
export function getStreakColor(streak: number): string {
  if (streak === 0) return '#9CA3AF'; // gray
  if (streak < 7) return '#F97316'; // orange
  if (streak < 30) return '#EF4444'; // red
  return '#DC2626'; // deep red
}
