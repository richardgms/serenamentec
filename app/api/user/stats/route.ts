import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const [
      breathingSessions,
      favoriteVideos,
      completedJourneys,
      reflectionsAnswered,
      achievementsUnlocked,
      streak,
      crisisLogged,
    ] = await Promise.all([
      prisma.breathingSession.count({
        where: { userId: user.id, completed: true },
      }),
      prisma.videoFavorite.count({
        where: { userId: user.id },
      }),
      prisma.journeyProgress.count({
        where: { userId: user.id, completed: true },
      }),
      prisma.dailyReflection.count({
        where: {
          userId: user.id,
          skipped: false,
          answer: { not: null },
        },
      }),
      prisma.achievement.count({
        where: { userId: user.id },
      }),
      prisma.userStreak.findUnique({
        where: { userId: user.id },
        select: { currentStreak: true, longestStreak: true },
      }),
      prisma.crisisLog.count({
        where: { userId: user.id },
      }),
    ]);

    return NextResponse.json({
      stats: {
        breathingSessions,
        favoriteVideos,
        journeysCompleted: completedJourneys,
        reflectionsAnswered,
        achievementsUnlocked,
        currentStreak: streak?.currentStreak ?? 0,
        longestStreak: streak?.longestStreak ?? 0,
        crisisLogged,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar estatisticas' },
      { status: 500 }
    );
  }
}
