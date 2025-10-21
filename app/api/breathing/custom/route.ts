import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const customBreathingSchema = z.object({
  inhale: z.number().min(1).max(10),
  hold: z.number().min(1).max(10),
  exhale: z.number().min(1).max(10),
  pause: z.number().min(0).max(10),
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
    const validation = customBreathingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid breathing pattern data', details: validation.error },
        { status: 400 }
      );
    }

    const { inhale, hold, exhale, pause } = validation.data;

    // Upsert custom breathing pattern
    const customBreathing = await prisma.customBreathing.upsert({
      where: { userId: user.id },
      update: {
        inhaleTime: inhale,
        holdTime: hold,
        exhaleTime: exhale,
        pauseTime: pause > 0 ? pause : null,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        inhaleTime: inhale,
        holdTime: hold,
        exhaleTime: exhale,
        pauseTime: pause > 0 ? pause : null,
      },
    });

    return NextResponse.json({
      success: true,
      customBreathing,
    });
  } catch (error) {
    console.error('Error saving custom breathing pattern:', error);
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
      include: {
        customBreathing: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.customBreathing) {
      return NextResponse.json(
        { error: 'No custom pattern found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      customBreathing: user.customBreathing,
    });
  } catch (error) {
    console.error('Error fetching custom breathing pattern:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
