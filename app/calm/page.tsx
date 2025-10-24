'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { useUIStore } from '@/lib/store/uiStore';
import { logger } from '@/lib/utils/logger';
import { CategoryTabs, VideoCategory } from '@/components/calm/CategoryTabs';
import { VideoCard } from '@/components/calm/VideoCard';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { EmptyState } from '@/components/ui/EmptyState';
import { VideoCamera } from '@/lib/constants/icons';

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
        logger.error('Failed to load videos', error, 'CalmPage');
        setIsLoading(false);
      });
  }, [activeCategory]);

  const handleVideoClick = (videoId: string) => {
    router.push(`/calm/${videoId}`);
  };

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
              { label: 'Acalmar' },
            ]}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <OptimizedIcon icon={VideoCamera} size={32} weight="duotone" className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Vídeos Relaxantes
            </h1>
            <p className="text-sm text-text-secondary">
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
              <Spinner size="md" />
            </div>
          ) : videos.length === 0 ? (
            <EmptyState
              context={
                activeCategory === 'FAVORITES'
                  ? 'calm-favorites'
                  : activeCategory === 'RECENT'
                  ? 'calm-recent'
                  : 'calm-category'
              }
              actionLabel={
                activeCategory === 'FAVORITES'
                  ? 'Explorar vídeos'
                  : activeCategory === 'RECENT'
                  ? 'Descobrir práticas'
                  : activeCategory === 'VISUAL_CALMING'
                  ? undefined
                  : 'Ver outras categorias'
              }
              onAction={
                activeCategory === 'VISUAL_CALMING'
                  ? undefined
                  : () => setActiveCategory('VISUAL_CALMING')
              }
              className="py-16"
            />
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
              className="text-center"
            >
              <p className="text-xs text-text-tertiary">
                💡 Dica: Use fones de ouvido para uma experiência mais imersiva
              </p>
            </motion.div>
          )}
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
