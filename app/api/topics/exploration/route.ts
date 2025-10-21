import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const saveExplorationSchema = z.object({
  topicType: z.enum([
    'SENSORY_SENSITIVITY',
    'SOCIAL_COMMUNICATION',
    'ROUTINES_RITUALS',
    'HYPERFOCUS',
    'STIMMING',
    'MASKING',
    'SENSORY_OVERLOAD',
    'EXECUTIVE_FUNCTION',
  ]),
  resonates: z.enum(['YES', 'NO', 'MAYBE']).optional(),
  notes: z.string().optional(),
  bookmarked: z.boolean().optional(),
});

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

    // Check if specific topic requested
    const { searchParams } = new URL(req.url);
    const topicType = searchParams.get('type');

    if (topicType) {
      // Get specific topic exploration
      const exploration = await prisma.topicExploration.findUnique({
        where: {
          userId_topicType: {
            userId: user.id,
            topicType: topicType as any,
          },
        },
      });

      return NextResponse.json({
        exploration: exploration || null,
      });
    }

    // Get all topic explorations
    const explorations = await prisma.topicExploration.findMany({
      where: { userId: user.id },
      orderBy: { exploredAt: 'desc' },
    });

    return NextResponse.json({
      explorations: explorations.map((e) => ({
        topicType: e.topicType,
        resonates: e.resonates,
        notes: e.notes,
        bookmarked: e.bookmarked,
        exploredAt: e.exploredAt,
        updatedAt: e.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching topic exploration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const validation = saveExplorationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { topicType, resonates, notes, bookmarked } = validation.data;

    // Upsert exploration
    const exploration = await prisma.topicExploration.upsert({
      where: {
        userId_topicType: {
          userId: user.id,
          topicType,
        },
      },
      update: {
        resonates: resonates || undefined,
        notes: notes !== undefined ? notes : undefined,
        bookmarked: bookmarked !== undefined ? bookmarked : undefined,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        topicType,
        resonates: resonates || null,
        notes: notes || null,
        bookmarked: bookmarked || false,
      },
    });

    return NextResponse.json({
      success: true,
      exploration: {
        topicType: exploration.topicType,
        resonates: exploration.resonates,
        notes: exploration.notes,
        bookmarked: exploration.bookmarked,
        exploredAt: exploration.exploredAt,
        updatedAt: exploration.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error saving topic exploration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
