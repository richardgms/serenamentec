import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get parameters from query
    const { searchParams } = new URL(req.url);
    const journeyType = searchParams.get('type');
    const step = searchParams.get('step');

    if (!journeyType) {
      return NextResponse.json(
        { error: 'Journey type is required' },
        { status: 400 }
      );
    }

    // If step is provided, get specific step
    if (step) {
      const stepNumber = parseInt(step, 10);
      if (isNaN(stepNumber) || stepNumber < 1) {
        return NextResponse.json(
          { error: 'Invalid step number' },
          { status: 400 }
        );
      }

      const content = await prisma.journeyContent.findUnique({
        where: {
          journeyType_step: {
            journeyType: journeyType as any,
            step: stepNumber,
          },
        },
        select: {
          journeyType: true,
          step: true,
          title: true,
          content: true,
          reflection: true,
        },
      });

      if (!content) {
        return NextResponse.json(
          { error: 'Journey step not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ content });
    }

    // Otherwise, get all steps for the journey
    const contents = await prisma.journeyContent.findMany({
      where: { journeyType: journeyType as any },
      orderBy: { step: 'asc' },
      select: {
        journeyType: true,
        step: true,
        title: true,
        content: true,
        reflection: true,
      },
    });

    if (contents.length === 0) {
      return NextResponse.json(
        { error: 'Journey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ contents });
  } catch (error) {
    console.error('Error fetching journey content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
