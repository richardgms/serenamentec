'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { useUIStore } from '@/lib/store/uiStore';
import { FavoriteButton } from '@/components/calm/FavoriteButton';
import { getYouTubeEmbedUrl } from '@/lib/utils/youtube';
import { Card } from '@/components/ui/Card';
import { Repeat, Loader2, ArrowLeft } from 'lucide-react';

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
        console.error('Error loading video:', error);
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mobile-container px-4 py-20 text-center">
          <p className="text-gray-600 mb-4">Vídeo não encontrado</p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:underline"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-video bg-black">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </Card>
        </motion.div>

        {/* Video Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800 mb-2">
                {video.title}
              </h1>
              {video.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
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
          className="mb-6"
        >
          <Card>
            <h3 className="font-semibold text-gray-800 mb-3">Controles</h3>

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg
                transition-all tap-highlight-none
                ${
                  isLooping
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-gray-50 border-2 border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Repeat
                  className={`h-5 w-5 ${
                    isLooping ? 'text-primary' : 'text-gray-600'
                  }`}
                />
                <span
                  className={`font-medium ${
                    isLooping ? 'text-primary' : 'text-gray-700'
                  }`}
                >
                  Repetir vídeo
                </span>
              </div>

              <div
                className={`
                  w-12 h-6 rounded-full transition-all
                  ${isLooping ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                <div
                  className={`
                    w-5 h-5 rounded-full bg-white mt-0.5 transition-all
                    ${isLooping ? 'ml-6' : 'ml-0.5'}
                  `}
                />
              </div>
            </button>

            <p className="text-xs text-gray-500 mt-3">
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
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista de vídeos
          </button>
        </motion.div>
      </div>
    </div>
  );
}
