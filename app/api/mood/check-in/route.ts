import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const moodSchema = z.object({
  mood: z.enum(['HAPPY', 'NEUTRAL', 'ANXIOUS', 'SAD', 'ANGRY']),
  notes: z.string().optional(),
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
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = moodSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid mood data', details: validation.error },
        { status: 400 }
      );
    }

    const { mood, notes } = validation.data;

    // Check if user already checked mood today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckIn = await prisma.moodCheckIn.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: today,
        },
      },
    });

    if (existingCheckIn) {
      return NextResponse.json(
        { error: 'Mood already checked today' },
        { status: 400 }
      );
    }

    // Save mood check-in
    const moodCheckIn = await prisma.moodCheckIn.create({
      data: {
        userId: user.id,
        mood,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      moodCheckIn,
    });
  } catch (error) {
    console.error('Error saving mood check-in:', error);
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
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get mood check-ins for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const moodCheckIns = await prisma.moodCheckIn.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      moodCheckIns,
    });
  } catch (error) {
    console.error('Error fetching mood check-ins:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
