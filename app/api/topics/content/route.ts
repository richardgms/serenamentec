import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get topic type from query params
    const { searchParams } = new URL(req.url);
    const topicType = searchParams.get('type');

    if (!topicType) {
      return NextResponse.json(
        { error: 'Topic type is required' },
        { status: 400 }
      );
    }

    // Fetch topic content
    const content = await prisma.topicContent.findUnique({
      where: { topicType: topicType as any },
      select: {
        topicType: true,
        title: true,
        description: true,
        examples: true,
      },
    });

    if (!content) {
      return NextResponse.json(
        { error: 'Topic content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      content,
    });
  } catch (error) {
    console.error('Error fetching topic content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
