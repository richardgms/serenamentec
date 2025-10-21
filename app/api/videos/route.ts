import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

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
    const category = searchParams.get('category');

    // If category is FAVORITES, return user's favorites
    if (category === 'FAVORITES') {
      const favorites = await prisma.videoFavorite.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        videos: favorites.map((fav) => ({
          id: fav.id,
          videoId: fav.videoId,
          title: fav.videoTitle,
          url: fav.videoUrl,
          category: fav.category,
          thumbnail: fav.thumbnail,
          isFavorite: true,
        })),
      });
    }

    // If category is RECENT, return user's history
    if (category === 'RECENT') {
      const history = await prisma.videoHistory.findMany({
        where: { userId: user.id },
        orderBy: { watchedAt: 'desc' },
        take: 20,
        distinct: ['videoId'],
      });

      return NextResponse.json({
        videos: history.map((item) => ({
          id: item.id,
          videoId: item.videoId,
          title: item.videoTitle,
          url: item.videoUrl,
          thumbnail: null,
          watchedAt: item.watchedAt,
        })),
      });
    }

    // Otherwise, return videos from the Video table filtered by category
    const whereClause = category
      ? { category: category as any, active: true }
      : { active: true };

    const videos = await prisma.video.findMany({
      where: whereClause,
      orderBy: { order: 'asc' },
    });

    // Check which videos are favorited by the user
    const favoriteVideoIds = await prisma.videoFavorite.findMany({
      where: {
        userId: user.id,
        videoId: { in: videos.map((v) => v.videoId) },
      },
      select: { videoId: true },
    });

    const favoriteIdsSet = new Set(favoriteVideoIds.map((f) => f.videoId));

    return NextResponse.json({
      videos: videos.map((video) => ({
        id: video.id,
        videoId: video.videoId,
        title: video.title,
        url: video.url,
        category: video.category,
        description: video.description,
        thumbnail: video.thumbnail,
        duration: video.duration,
        isFavorite: favoriteIdsSet.has(video.videoId),
      })),
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
