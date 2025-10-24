'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { useUIStore } from '@/lib/store/uiStore';
import { logger } from '@/lib/utils/logger';
import { FavoriteButton } from '@/components/calm/FavoriteButton';
import { getYouTubeEmbedUrl } from '@/lib/utils/youtube';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { ArrowLeft } from '@/lib/constants/icons';

interface VideoData {
  id: string;
  videoId: string;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  isFavorite?: boolean;
}

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { setPageTitle, setShowBackButton } = useUIStore();

  const videoId = params.videoId as string;
  const [video, setVideo] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    setPageTitle('');
    setShowBackButton(true);

    // Register view in history
    const registerView = async () => {
      try {
        // First, try to get video info from the database
        const videosRes = await fetch(`/api/videos`);
        const videosData = await videosRes.json();
        const foundVideo = videosData.videos?.find((v: any) => v.videoId === videoId);

        if (foundVideo) {
          setVideo(foundVideo);
          setIsFavorite(foundVideo.isFavorite || false);

          // Register in history
          await fetch('/api/videos/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              videoId: foundVideo.videoId,
              videoTitle: foundVideo.title,
              videoUrl: foundVideo.url,
            }),
          });
        } else {
          // Video not found in database, might be from favorites/history
          // Try to get from favorites or history
          const favRes = await fetch('/api/videos/favorites');
          const favData = await favRes.json();
          const favVideo = favData.favorites?.find((f: any) => f.videoId === videoId);

          if (favVideo) {
            setVideo({
              id: favVideo.id,
              videoId: favVideo.videoId,
              title: favVideo.videoTitle,
              url: favVideo.videoUrl,
              category: favVideo.category,
              thumbnail: favVideo.thumbnail,
              isFavorite: true,
            });
            setIsFavorite(true);
          }
        }

        setIsLoading(false);
      } catch (error) {
        logger.error('Failed to load video details', error, 'VideoPlayerPage');
        setIsLoading(false);
      }
    };

    registerView();
  }, [videoId, setPageTitle, setShowBackButton]);

  const handleFavoriteToggle = (newIsFavorite: boolean) => {
    setIsFavorite(newIsFavorite);
  };

  const embedUrl = getYouTubeEmbedUrl(videoId, {
    autoplay: false,
    loop: isLooping,
    controls: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen">
        <Header />
        <PageTransition>
          <div className="max-w-[428px] mx-auto px-4 py-20 text-center">
            <p className="text-text-secondary mb-4">Vídeo não encontrado</p>
            <Button variant="ghost" onClick={() => router.back()}>
              Voltar
            </Button>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Acalmar', href: '/calm' },
              { label: video.title },
            ]}
          />

          {/* Video Player 16:9 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden p-0">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Video Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-text-primary mb-2">
                  {video.title}
                </h1>
                {video.description && (
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>

              {/* Favorite Button */}
              <FavoriteButton
                videoId={video.videoId}
                videoTitle={video.title}
                videoUrl={video.url}
                category={video.category || 'VISUAL_CALMING'}
                thumbnail={video.thumbnail}
                isFavorite={isFavorite}
                onToggle={handleFavoriteToggle}
              />
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="font-semibold text-text-primary mb-3">Controles</h3>

              {/* Loop Toggle */}
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg
                  transition-all duration-150
                  ${
                    isLooping
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-surface-elevated border-2 border-transparent'
                  }
                `}
              >
                <span
                  className={`font-medium ${
                    isLooping ? 'text-primary' : 'text-text-primary'
                  }`}
                >
                  Repetir vídeo
                </span>

                {/* Toggle Switch */}
                <div
                  className={`
                    w-12 h-6 rounded-full transition-all duration-150
                    ${isLooping ? 'bg-primary' : 'bg-border-subtle'}
                  `}
                >
                  <div
                    className={`
                      w-5 h-5 rounded-full bg-white mt-0.5 transition-all duration-150 shadow-soft-sm
                      ${isLooping ? 'ml-6' : 'ml-0.5'}
                    `}
                  />
                </div>
              </button>

              <p className="text-xs text-text-tertiary mt-3">
                {isLooping
                  ? 'O vídeo será reproduzido continuamente'
                  : 'Ative para repetir o vídeo automaticamente'}
              </p>
            </Card>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2"
            >
              <OptimizedIcon icon={ArrowLeft} size={16} />
              Voltar para lista de vídeos
            </Button>
          </motion.div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
