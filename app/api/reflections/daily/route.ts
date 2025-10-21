import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getDayOfYear, getStartOfDay, getEndOfDay } from '@/lib/utils/dateHelpers';
import { getRandomMessage } from '@/lib/encouragement/messages';

const saveReflectionSchema = z.object({
  question: z.string(),
  answer: z.string().optional(),
  skipped: z.boolean().default(false),
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

    // Get day of year to determine today's question
    const dayOfYear = getDayOfYear();

    // Get all questions from database
    const allQuestions = await prisma.dailyQuestion.findMany({
      where: { active: true },
      orderBy: { id: 'asc' },
    });

    if (allQuestions.length === 0) {
      return NextResponse.json(
        { error: 'No questions available' },
        { status: 404 }
      );
    }

    // Calculate which question to show today (rotate through all questions)
    const questionIndex = (dayOfYear - 1) % allQuestions.length;
    const todayQuestion = allQuestions[questionIndex];

    // Check if user already answered today
    const startOfToday = getStartOfDay();
    const endOfToday = getEndOfDay();

    const todayReflection = await prisma.dailyReflection.findFirst({
      where: {
        userId: user.id,
        question: todayQuestion.question,
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    // Get recent reflections (last 7 days)
    const recentReflections = await prisma.dailyReflection.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 7,
    });

    return NextResponse.json({
      todayQuestion: {
        id: todayQuestion.id,
        question: todayQuestion.question,
        category: todayQuestion.category,
      },
      answered: todayReflection !== null,
      todayReflection: todayReflection
        ? {
            answer: todayReflection.answer,
            skipped: todayReflection.skipped,
            createdAt: todayReflection.createdAt,
          }
        : null,
      recentReflections: recentReflections.map((r) => ({
        id: r.id,
        question: r.question,
        answer: r.answer,
        skipped: r.skipped,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching daily reflection:', error);
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
    const validation = saveReflectionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { question, answer, skipped } = validation.data;

    // Check if already answered today
    const startOfToday = getStartOfDay();
    const endOfToday = getEndOfDay();

    const existingReflection = await prisma.dailyReflection.findFirst({
      where: {
        userId: user.id,
        question,
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    if (existingReflection) {
      return NextResponse.json(
        { error: 'Already answered today' },
        { status: 400 }
      );
    }

    // Create reflection
    const reflection = await prisma.dailyReflection.create({
      data: {
        userId: user.id,
        question,
        answer: answer || null,
        skipped,
      },
    });

    // Check if user reached 10 reflections - unlock achievement
    if (!skipped) {
      const totalReflections = await prisma.dailyReflection.count({
        where: {
          userId: user.id,
          skipped: false,
        },
      });

      if (totalReflections === 10) {
        await prisma.achievement.upsert({
          where: {
            userId_type: {
              userId: user.id,
              type: 'REFLECTIVE_10',
            },
          },
          update: {},
          create: {
            userId: user.id,
            type: 'REFLECTIVE_10',
            acknowledged: false,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      reflection: {
        id: reflection.id,
        question: reflection.question,
        answer: reflection.answer,
        skipped: reflection.skipped,
        createdAt: reflection.createdAt,
      },
      message: !skipped ? getRandomMessage('reflectionSaved') : undefined,
    });
  } catch (error) {
    console.error('Error saving daily reflection:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
