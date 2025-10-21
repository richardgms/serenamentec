'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { useUIStore } from '@/lib/store/uiStore';
import { CategoryTabs, VideoCategory } from '@/components/calm/CategoryTabs';
import { VideoCard } from '@/components/calm/VideoCard';
import { Loader2 } from 'lucide-react';

interface Video {
  id: string;
  videoId: string;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  category?: string;
  isFavorite?: boolean;
  watchedAt?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CalmPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton } = useUIStore();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('VISUAL_CALMING');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [recentCount, setRecentCount] = useState(0);

  useEffect(() => {
    setPageTitle('Acalmar');
    setShowBackButton(true);

    // Load counts for badges
    fetch('/api/videos/favorites')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setFavoritesCount(data.count || 0);
        }
      })
      .catch(() => {});

    fetch('/api/videos/history')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setRecentCount(data.count || 0);
        }
      })
      .catch(() => {});
  }, [setPageTitle, setShowBackButton]);

  // Load videos when category changes
  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/videos?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading videos:', error);
        setIsLoading(false);
      });
  }, [activeCategory]);

  const handleVideoClick = (videoId: string) => {
    router.push(`/calm/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Vídeos Relaxantes
          </h1>
          <p className="text-sm text-gray-600">
            Escolha um vídeo para se acalmar e relaxar
          </p>
        </motion.div>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          favoritesCount={favoritesCount}
          recentCount={recentCount}
        />

        {/* Videos Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : videos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 mb-2">
              {activeCategory === 'FAVORITES'
                ? '❤️ Nenhum vídeo favoritado ainda'
                : activeCategory === 'RECENT'
                ? '🕒 Nenhum vídeo assistido ainda'
                : '😔 Nenhum vídeo disponível nesta categoria'}
            </p>
            <p className="text-sm text-gray-400">
              {activeCategory === 'FAVORITES'
                ? 'Favorite vídeos clicando no coração'
                : activeCategory === 'RECENT'
                ? 'Assista um vídeo para ele aparecer aqui'
                : 'Em breve teremos mais vídeos'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {videos.map((video) => (
              <motion.div key={video.id || video.videoId} variants={itemVariants}>
                <VideoCard
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  onClick={() => handleVideoClick(video.videoId)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer Info */}
        {!isLoading && videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-500">
              💡 Dica: Use fones de ouvido para uma experiência mais imersiva
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
