import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const addFavoriteSchema = z.object({
  videoId: z.string(),
  videoTitle: z.string(),
  videoUrl: z.string(),
  category: z.string(),
  thumbnail: z.string().optional(),
});

const removeFavoriteSchema = z.object({
  videoId: z.string(),
});

const MAX_FAVORITES = 20;

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
    const validation = addFavoriteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { videoId, videoTitle, videoUrl, category, thumbnail } = validation.data;

    // Check if already favorited
    const existing = await prisma.videoFavorite.findUnique({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Video already in favorites' },
        { status: 400 }
      );
    }

    // Check favorites limit
    const favoritesCount = await prisma.videoFavorite.count({
      where: { userId: user.id },
    });

    if (favoritesCount >= MAX_FAVORITES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FAVORITES} favorites limit reached` },
        { status: 400 }
      );
    }

    // Add to favorites
    const favorite = await prisma.videoFavorite.create({
      data: {
        userId: user.id,
        videoId,
        videoTitle,
        videoUrl,
        category: category as any,
        thumbnail,
      },
    });

    return NextResponse.json({
      success: true,
      favorite,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
    const validation = removeFavoriteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validation.error },
        { status: 400 }
      );
    }

    const { videoId } = validation.data;

    // Remove from favorites
    await prisma.videoFavorite.delete({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
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

    // Get favorites
    const favorites = await prisma.videoFavorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      favorites,
      count: favorites.length,
      maxFavorites: MAX_FAVORITES,
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
