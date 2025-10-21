import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getRandomMessage } from '@/lib/encouragement/messages';

const breathingSessionSchema = z.object({
  patternType: z.enum(['ANXIETY_478', 'BALANCE_4444', 'SLEEP_466', 'CUSTOM']),
  cyclesTarget: z.number().min(1).max(20),
  cyclesCompleted: z.number().min(0),
  totalDuration: z.number().min(0), // in seconds
  completed: z.boolean(),
});

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
    const validation = breathingSessionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid session data', details: validation.error },
        { status: 400 }
      );
    }

    const { patternType, cyclesTarget, cyclesCompleted, totalDuration, completed } =
      validation.data;

    // Save breathing session
    const session = await prisma.breathingSession.create({
      data: {
        userId: user.id,
        patternType,
        cyclesTarget,
        cyclesCompleted,
        totalDuration,
        completed,
        interruptedAt: completed ? null : new Date(),
      },
    });

    // Check if this is the first breathing session - unlock achievement
    if (completed) {
      const sessionCount = await prisma.breathingSession.count({
        where: {
          userId: user.id,
          completed: true,
        },
      });

      if (sessionCount === 1) {
        // First breathing session! Unlock achievement
        await prisma.achievement.upsert({
          where: {
            userId_type: {
              userId: user.id,
              type: 'FIRST_BREATHING',
            },
          },
          update: {},
          create: {
            userId: user.id,
            type: 'FIRST_BREATHING',
            acknowledged: false,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      session,
      message: completed ? getRandomMessage('breathingComplete') : undefined,
    });
  } catch (error) {
    console.error('Error saving breathing session:', error);
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

    // Get query params
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '30');
    const completedOnly = searchParams.get('completed') === 'true';

    // Get breathing sessions
    const sessions = await prisma.breathingSession.findMany({
      where: {
        userId: user.id,
        ...(completedOnly && { completed: true }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    // Calculate statistics
    const stats = await prisma.breathingSession.aggregate({
      where: {
        userId: user.id,
        completed: true,
      },
      _count: {
        id: true,
      },
      _sum: {
        totalDuration: true,
        cyclesCompleted: true,
      },
    });

    return NextResponse.json({
      sessions,
      stats: {
        totalSessions: stats._count.id,
        totalDuration: stats._sum.totalDuration || 0,
        totalCycles: stats._sum.cyclesCompleted || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching breathing sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
