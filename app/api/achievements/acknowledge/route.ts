import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const acknowledgeSchema = z.object({
  achievementId: z.string(),
});

export async function PUT(req: NextRequest) {
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

    // Parse and validate request body
    const body = await req.json();
    const validation = acknowledgeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { achievementId } = validation.data;

    // Update achievement to acknowledged
    const achievement = await prisma.achievement.updateMany({
      where: {
        id: achievementId,
        userId: user.id, // Ensure user owns this achievement
      },
      data: {
        acknowledged: true,
      },
    });

    if (achievement.count === 0) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Conquista marcada como vista',
    });
  } catch (error) {
    console.error('Error acknowledging achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
