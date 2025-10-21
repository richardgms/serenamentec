import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  getAllAchievements,
  getAchievementInfo,
  type AchievementType,
} from '@/lib/achievements/achievementHelpers';
import { getAchievementProgress } from '@/lib/achievements/achievementChecker';

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

    // Build locked list with progress
    const locked = await Promise.all(
      allAchievements
        .filter((info) => !unlockedTypes.has(info.type))
        .map(async (info) => {
          const progress = await getAchievementProgress(user.id, info.type);
          return {
            type: info.type,
            title: info.title,
            description: info.description,
            emoji: info.emoji,
            color: info.color,
            gradient: info.gradient,
            progress: progress.current,
            required: progress.required,
            percentage: Math.round((progress.current / progress.required) * 100),
          };
        })
    );

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
