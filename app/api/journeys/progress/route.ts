import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { journeyInfo } from '@/lib/utils/journeyHelpers';
import { getRandomMessage } from '@/lib/encouragement/messages';

const updateProgressSchema = z.object({
  journeyType: z.enum(['AM_I_AUTISTIC', 'UNDERSTANDING_ADHD', 'SENSORY_PROCESSING']),
  step: z.number().int().min(1),
  notes: z.string().optional(),
  markCompleted: z.boolean().optional(),
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

    // Check if specific journey type requested
    const { searchParams } = new URL(req.url);
    const journeyType = searchParams.get('type');

    if (journeyType) {
      // Get specific journey progress
      const progress = await prisma.journeyProgress.findUnique({
        where: {
          userId_journeyType: {
            userId: user.id,
            journeyType: journeyType as any,
          },
        },
      });

      if (!progress) {
        // Return empty progress
        return NextResponse.json({
          progress: {
            journeyType,
            currentStep: 1,
            completedSteps: [],
            stepNotes: {},
            completed: false,
            startedAt: null,
            completedAt: null,
          },
        });
      }

      return NextResponse.json({
        progress: {
          journeyType: progress.journeyType,
          currentStep: progress.currentStep,
          completedSteps: progress.completedSteps,
          stepNotes: progress.stepNotes || {},
          completed: progress.completed,
          startedAt: progress.startedAt,
          completedAt: progress.completedAt,
          lastAccessAt: progress.lastAccessAt,
        },
      });
    }

    // Get all journeys progress
    const allProgress = await prisma.journeyProgress.findMany({
      where: { userId: user.id },
    });

    // Build complete progress object for all journeys
    const journeysProgress = Object.keys(journeyInfo).map((type) => {
      const existing = allProgress.find((p) => p.journeyType === type);
      const info = journeyInfo[type as keyof typeof journeyInfo];

      if (!existing) {
        return {
          journeyType: type,
          totalSteps: info.totalSteps,
          currentStep: 1,
          completedSteps: [],
          stepNotes: {},
          completed: false,
          startedAt: null,
        };
      }

      return {
        journeyType: existing.journeyType,
        totalSteps: info.totalSteps,
        currentStep: existing.currentStep,
        completedSteps: existing.completedSteps,
        stepNotes: existing.stepNotes || {},
        completed: existing.completed,
        startedAt: existing.startedAt,
        completedAt: existing.completedAt,
      };
    });

    return NextResponse.json({
      journeys: journeysProgress,
    });
  } catch (error) {
    console.error('Error fetching journey progress:', error);
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
    const validation = updateProgressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { journeyType, step, notes, markCompleted } = validation.data;

    // Get journey info
    const info = journeyInfo[journeyType];
    if (!info) {
      return NextResponse.json(
        { error: 'Invalid journey type' },
        { status: 400 }
      );
    }

    // Validate step number
    if (step > info.totalSteps) {
      return NextResponse.json(
        { error: `Step must be between 1 and ${info.totalSteps}` },
        { status: 400 }
      );
    }

    // Get existing progress
    let progress = await prisma.journeyProgress.findUnique({
      where: {
        userId_journeyType: {
          userId: user.id,
          journeyType,
        },
      },
    });

    // Create or update progress
    if (!progress) {
      // Create new progress
      progress = await prisma.journeyProgress.create({
        data: {
          userId: user.id,
          journeyType,
          currentStep: step,
          totalSteps: info.totalSteps,
          completedSteps: markCompleted ? [step] : [],
          stepNotes: notes ? { [step]: notes } : {},
          completed: false,
          lastAccessAt: new Date(),
        },
      });
    } else {
      // Update existing progress
      const updatedCompletedSteps = markCompleted
        ? Array.from(new Set([...progress.completedSteps, step]))
        : progress.completedSteps;

      const updatedNotes = notes
        ? { ...(progress.stepNotes as object || {}), [step]: notes }
        : progress.stepNotes;

      // Check if journey is now completed
      const isCompleted = updatedCompletedSteps.length === info.totalSteps;

      progress = await prisma.journeyProgress.update({
        where: {
          userId_journeyType: {
            userId: user.id,
            journeyType,
          },
        },
        data: {
          currentStep: step,
          completedSteps: updatedCompletedSteps,
          stepNotes: updatedNotes,
          completed: isCompleted,
          completedAt: isCompleted && !progress.completed ? new Date() : progress.completedAt,
          lastAccessAt: new Date(),
        },
      });

      // Unlock achievement if journey just completed
      if (isCompleted && !progress.completed) {
        await prisma.achievement.upsert({
          where: {
            userId_type: {
              userId: user.id,
              type: 'SELF_KNOWLEDGE',
            },
          },
          update: {},
          create: {
            userId: user.id,
            type: 'SELF_KNOWLEDGE',
            acknowledged: false,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      progress: {
        journeyType: progress.journeyType,
        currentStep: progress.currentStep,
        completedSteps: progress.completedSteps,
        stepNotes: progress.stepNotes || {},
        completed: progress.completed,
        startedAt: progress.startedAt,
        completedAt: progress.completedAt,
      },
      message: markCompleted ? getRandomMessage('journeyStepComplete') : undefined,
    });
  } catch (error) {
    console.error('Error updating journey progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
