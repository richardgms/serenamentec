import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  calculateStreak,
  formatStreakText,
  getStreakEmoji,
  getStreakColor,
} from '@/lib/streaks/streakHelpers';
import { getRandomMessage } from '@/lib/encouragement/messages';

/**
 * GET /api/streaks
 * Get current user streak data
 */
export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get or create user streak
    let userStreak = await prisma.userStreak.findUnique({
      where: { userId: user.id },
    });

    // If no streak record exists, create one with initial check-in
    if (!userStreak) {
      userStreak = await prisma.userStreak.create({
        data: {
          userId: user.id,
          currentStreak: 1,
          longestStreak: 1,
          lastCheckIn: new Date(),
          restDayUsed: false,
        },
      });
    }

    // Format response
    return NextResponse.json({
      currentStreak: userStreak.currentStreak,
      longestStreak: userStreak.longestStreak,
      lastCheckIn: userStreak.lastCheckIn,
      restDayUsed: userStreak.restDayUsed,
      streakText: formatStreakText(userStreak.currentStreak),
      emoji: getStreakEmoji(userStreak.currentStreak),
      color: getStreakColor(userStreak.currentStreak),
    });
  } catch (error) {
    console.error('Error fetching streak:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/streaks
 * Check in for the day - increment streak or reset
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get or create user streak
    let userStreak = await prisma.userStreak.findUnique({
      where: { userId: user.id },
    });

    // If no streak exists, create initial one
    if (!userStreak) {
      userStreak = await prisma.userStreak.create({
        data: {
          userId: user.id,
          currentStreak: 1,
          longestStreak: 1,
          lastCheckIn: new Date(),
          restDayUsed: false,
        },
      });

      return NextResponse.json({
        success: true,
        currentStreak: 1,
        longestStreak: 1,
        message: getRandomMessage('streakMilestone'),
        emoji: getStreakEmoji(1),
        color: getStreakColor(1),
        isNewStreak: true,
      });
    }

    // Calculate new streak based on last check-in
    const { newStreak, usedRestDay } = calculateStreak(
      userStreak.currentStreak,
      userStreak.lastCheckIn,
      userStreak.restDayUsed
    );

    // Calculate new longest streak
    const newLongestStreak = Math.max(newStreak, userStreak.longestStreak);

    // Check if streak increased (milestone reached)
    const streakIncreased = newStreak > userStreak.currentStreak;
    const isReset = newStreak === 1 && userStreak.currentStreak > 1;

    // Update user streak
    const updatedStreak = await prisma.userStreak.update({
      where: { userId: user.id },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastCheckIn: new Date(),
        restDayUsed: usedRestDay,
      },
    });

    // Check for 7-day streak achievement
    if (newStreak >= 7) {
      await prisma.achievement.upsert({
        where: {
          userId_type: {
            userId: user.id,
            type: 'SEVEN_DAYS_JOURNEY',
          },
        },
        update: {},
        create: {
          userId: user.id,
          type: 'SEVEN_DAYS_JOURNEY',
          acknowledged: false,
        },
      });
    }

    // Check for 30-day streak achievement
    if (newStreak >= 30) {
      await prisma.achievement.upsert({
        where: {
          userId_type: {
            userId: user.id,
            type: 'THIRTY_DAYS_CARE',
          },
        },
        update: {},
        create: {
          userId: user.id,
          type: 'THIRTY_DAYS_CARE',
          acknowledged: false,
        },
      });
    }

    // Select appropriate message
    let message: string;
    if (isReset) {
      message = 'Tudo bem recomeçar. Você está aqui e isso importa 💚';
    } else if (streakIncreased) {
      message = getRandomMessage('streakMilestone');
    } else {
      message = 'Você já fez check-in hoje! Continue assim 🌟';
    }

    return NextResponse.json({
      success: true,
      currentStreak: updatedStreak.currentStreak,
      longestStreak: updatedStreak.longestStreak,
      message,
      emoji: getStreakEmoji(updatedStreak.currentStreak),
      color: getStreakColor(updatedStreak.currentStreak),
      streakIncreased,
      isReset,
      usedRestDay,
    });
  } catch (error) {
    console.error('Error checking in:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
