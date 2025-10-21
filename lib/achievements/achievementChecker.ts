/**
 * Achievement Checker Functions
 * Logic to check and unlock achievements
 */

import prisma from '@/lib/prisma';
import type { AchievementType } from './achievementHelpers';

/**
 * Unlock achievement if not already unlocked
 * @returns true if newly unlocked, false if already had it
 */
export async function unlockAchievement(
  userId: string,
  type: AchievementType
): Promise<boolean> {
  try {
    // Check if already unlocked
    const existing = await prisma.achievement.findUnique({
      where: {
        userId_type: {
          userId,
          type,
        },
      },
    });

    if (existing) {
      return false; // Already unlocked
    }

    // Create new achievement
    await prisma.achievement.create({
      data: {
        userId,
        type,
        acknowledged: false, // Will trigger notification
      },
    });

    return true; // Newly unlocked!
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return false;
  }
}

/**
 * Check FIRST_BREATHING achievement
 * Called after completing first breathing session
 */
export async function checkFirstBreathing(userId: string): Promise<boolean> {
  try {
    const sessionsCount = await prisma.breathingSession.count({
      where: {
        userId,
        completed: true,
      },
    });

    if (sessionsCount === 1) {
      // First completed session!
      return await unlockAchievement(userId, 'FIRST_BREATHING');
    }

    return false;
  } catch (error) {
    console.error('Error checking first breathing:', error);
    return false;
  }
}

/**
 * Check EXPLORER_5_VIDEOS achievement
 * Called after watching videos
 */
export async function checkExplorer5Videos(userId: string): Promise<boolean> {
  try {
    // Count distinct videos watched
    const distinctVideos = await prisma.videoHistory.findMany({
      where: { userId },
      distinct: ['videoId'],
      select: { videoId: true },
    });

    if (distinctVideos.length >= 5) {
      return await unlockAchievement(userId, 'EXPLORER_5_VIDEOS');
    }

    return false;
  } catch (error) {
    console.error('Error checking explorer achievement:', error);
    return false;
  }
}

/**
 * Check REFLECTIVE_10 achievement
 * Called after answering daily reflections
 * NOTE: This is already implemented in /api/reflections/daily
 */
export async function checkReflective10(userId: string): Promise<boolean> {
  try {
    const reflectionsCount = await prisma.dailyReflection.count({
      where: {
        userId,
        skipped: false, // Only count answered, not skipped
      },
    });

    if (reflectionsCount >= 10) {
      return await unlockAchievement(userId, 'REFLECTIVE_10');
    }

    return false;
  } catch (error) {
    console.error('Error checking reflective achievement:', error);
    return false;
  }
}

/**
 * Check SEVEN_DAYS_JOURNEY achievement
 * Called when streak is updated
 */
export async function checkSevenDaysJourney(userId: string): Promise<boolean> {
  try {
    const streak = await prisma.userStreak.findUnique({
      where: { userId },
      select: { currentStreak: true },
    });

    if (streak && streak.currentStreak >= 7) {
      return await unlockAchievement(userId, 'SEVEN_DAYS_JOURNEY');
    }

    return false;
  } catch (error) {
    console.error('Error checking seven days achievement:', error);
    return false;
  }
}

/**
 * Check THIRTY_DAYS_CARE achievement
 * Called when streak is updated
 */
export async function checkThirtyDaysCare(userId: string): Promise<boolean> {
  try {
    const streak = await prisma.userStreak.findUnique({
      where: { userId },
      select: { currentStreak: true },
    });

    if (streak && streak.currentStreak >= 30) {
      return await unlockAchievement(userId, 'THIRTY_DAYS_CARE');
    }

    return false;
  } catch (error) {
    console.error('Error checking thirty days achievement:', error);
    return false;
  }
}

/**
 * Get user's achievement progress for a specific type
 */
export async function getAchievementProgress(
  userId: string,
  type: AchievementType
): Promise<{ current: number; required: number }> {
  try {
    switch (type) {
      case 'FIRST_BREATHING': {
        const count = await prisma.breathingSession.count({
          where: { userId, completed: true },
        });
        return { current: Math.min(count, 1), required: 1 };
      }

      case 'EXPLORER_5_VIDEOS': {
        const distinct = await prisma.videoHistory.findMany({
          where: { userId },
          distinct: ['videoId'],
          select: { videoId: true },
        });
        return { current: distinct.length, required: 5 };
      }

      case 'SELF_KNOWLEDGE': {
        const completedJourneys = await prisma.journeyProgress.count({
          where: { userId, completed: true },
        });
        return { current: Math.min(completedJourneys, 1), required: 1 };
      }

      case 'REFLECTIVE_10': {
        const count = await prisma.dailyReflection.count({
          where: { userId, skipped: false },
        });
        return { current: Math.min(count, 10), required: 10 };
      }

      case 'SEVEN_DAYS_JOURNEY': {
        const streak = await prisma.userStreak.findUnique({
          where: { userId },
          select: { currentStreak: true },
        });
        return {
          current: Math.min(streak?.currentStreak || 0, 7),
          required: 7,
        };
      }

      case 'THIRTY_DAYS_CARE': {
        const streak = await prisma.userStreak.findUnique({
          where: { userId },
          select: { currentStreak: true },
        });
        return {
          current: Math.min(streak?.currentStreak || 0, 30),
          required: 30,
        };
      }

      default:
        return { current: 0, required: 1 };
    }
  } catch (error) {
    console.error('Error getting achievement progress:', error);
    return { current: 0, required: 1 };
  }
}
