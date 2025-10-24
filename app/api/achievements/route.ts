import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  getAllAchievements,
  getAchievementInfo,
  type AchievementType,
} from '@/lib/achievements/achievementHelpers';
// Nota: evitamos importar getAchievementProgress para reduzir múltiplas idas ao DB

export async function GET() {
  try {
    // Check authentication
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all unlocked achievements
    const unlockedAchievements = await prisma.achievement.findMany({
      where: { userId: user.id },
      orderBy: { unlockedAt: 'desc' },
    });

    const unlockedTypes = new Set(
      unlockedAchievements.map((a) => a.type as AchievementType)
    );

    // Get all achievement types
    const allAchievements = getAllAchievements();

    // Build unlocked list with metadata
    const unlocked = await Promise.all(
      unlockedAchievements.map(async (achievement) => {
        const info = getAchievementInfo(achievement.type as AchievementType);
        return {
          id: achievement.id,
          type: achievement.type,
          title: info.title,
          description: info.description,
          emoji: info.emoji,
          color: info.color,
          gradient: info.gradient,
          unlockedAt: achievement.unlockedAt,
          acknowledged: achievement.acknowledged,
        };
      })
    );

    // Aggregate progress in a single round of queries to avoid connection spikes
    const [
      sessionsCountResult,
      distinctVideosResult,
      completedJourneysResult,
      reflectionsCountResult,
      streakResult,
    ] = await Promise.all([
      prisma.breathingSession
        .count({ where: { userId: user.id, completed: true } })
        .catch(() => 0),
      prisma.videoHistory
        .findMany({ where: { userId: user.id }, distinct: ['videoId'], select: { videoId: true } })
        .catch(() => [] as { videoId: string }[]),
      prisma.journeyProgress
        .count({ where: { userId: user.id, completed: true } })
        .catch(() => 0),
      prisma.dailyReflection
        .count({ where: { userId: user.id, skipped: false } })
        .catch(() => 0),
      prisma.userStreak
        .findUnique({ where: { userId: user.id }, select: { currentStreak: true } })
        .catch(() => null as { currentStreak: number } | null),
    ]);

    const progressMap: Record<AchievementType, { current: number; required: number }> = {
      FIRST_BREATHING: {
        current: Math.min(sessionsCountResult || 0, 1),
        required: 1,
      },
      EXPLORER_5_VIDEOS: {
        current: distinctVideosResult.length,
        required: 5,
      },
      SELF_KNOWLEDGE: {
        current: Math.min(completedJourneysResult || 0, 1),
        required: 1,
      },
      REFLECTIVE_10: {
        current: Math.min(reflectionsCountResult || 0, 10),
        required: 10,
      },
      SEVEN_DAYS_JOURNEY: {
        current: Math.min(streakResult?.currentStreak || 0, 7),
        required: 7,
      },
      THIRTY_DAYS_CARE: {
        current: Math.min(streakResult?.currentStreak || 0, 30),
        required: 30,
      },
    };

    // Build locked list with pre-computed progress
    const locked = allAchievements
      .filter((info) => !unlockedTypes.has(info.type))
      .map((info) => {
        const progress = progressMap[info.type];
        const required = progress.required || 1;
        const percentage = Math.round((progress.current / required) * 100);
        return {
          type: info.type,
          title: info.title,
          description: info.description,
          emoji: info.emoji,
          color: info.color,
          gradient: info.gradient,
          progress: progress.current,
          required,
          percentage,
        };
      });

    // Calculate stats
    const totalAchievements = allAchievements.length;
    const unlockedCount = unlocked.length;
    const percentage = Math.round((unlockedCount / totalAchievements) * 100);

    return NextResponse.json({
      unlocked,
      locked,
      stats: {
        total: totalAchievements,
        unlocked: unlockedCount,
        locked: locked.length,
        percentage,
      },
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
