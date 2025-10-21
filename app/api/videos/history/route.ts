import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getRandomMessage } from '@/lib/encouragement/messages';

const addHistorySchema = z.object({
  videoId: z.string(),
  videoTitle: z.string(),
  videoUrl: z.string(),
  watchDuration: z.number().optional(),
  completed: z.boolean().optional(),
});

const MAX_HISTORY = 20;

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

    // Parse and validate request body
    const body = await req.json();
    const validation = addHistorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { videoId, videoTitle, videoUrl, watchDuration, completed } =
      validation.data;

    // Check if video is already in history (deduplication)
    const existing = await prisma.videoHistory.findFirst({
      where: {
        userId: user.id,
        videoId,
      },
      orderBy: {
        watchedAt: 'desc',
      },
    });

    // If watched recently (within last hour), update instead of creating new
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    if (existing && existing.watchedAt > oneHourAgo) {
      const updated = await prisma.videoHistory.update({
        where: { id: existing.id },
        data: {
          watchedAt: new Date(),
          watchDuration: watchDuration || existing.watchDuration,
          completed: completed ?? existing.completed,
        },
      });

      return NextResponse.json({
        success: true,
        history: updated,
        updated: true,
        message: getRandomMessage('videoWatched'),
      });
    }

    // Create new history entry
    const history = await prisma.videoHistory.create({
      data: {
        userId: user.id,
        videoId,
        videoTitle,
        videoUrl,
        watchDuration,
        completed: completed ?? false,
      },
    });

    // Keep only latest MAX_HISTORY entries
    const historyCount = await prisma.videoHistory.count({
      where: { userId: user.id },
    });

    if (historyCount > MAX_HISTORY) {
      // Get oldest entries to delete
      const oldestEntries = await prisma.videoHistory.findMany({
        where: { userId: user.id },
        orderBy: { watchedAt: 'asc' },
        take: historyCount - MAX_HISTORY,
        select: { id: true },
      });

      // Delete old entries
      await prisma.videoHistory.deleteMany({
        where: {
          id: { in: oldestEntries.map((e) => e.id) },
        },
      });
    }

    // Check if this is 5th video watched - unlock achievement
    const totalVideosWatched = await prisma.videoHistory.count({
      where: {
        userId: user.id,
      },
    });

    if (totalVideosWatched === 5) {
      await prisma.achievement.upsert({
        where: {
          userId_type: {
            userId: user.id,
            type: 'EXPLORER_5_VIDEOS',
          },
        },
        update: {},
        create: {
          userId: user.id,
          type: 'EXPLORER_5_VIDEOS',
          acknowledged: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      history,
      message: getRandomMessage('videoWatched'),
    });
  } catch (error) {
    console.error('Error adding to history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    // Get history
    const history = await prisma.videoHistory.findMany({
      where: { userId: user.id },
      orderBy: { watchedAt: 'desc' },
      take: MAX_HISTORY,
    });

    return NextResponse.json({
      history,
      count: history.length,
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
