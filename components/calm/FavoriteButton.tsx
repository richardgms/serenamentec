'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Heart, CircleNotch } from '@/lib/constants/icons';
import { useUIStore } from '@/lib/store/uiStore';

interface FavoriteButtonProps {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  category: string;
  thumbnail?: string;
  isFavorite: boolean;
  onToggle: (isFavorite: boolean) => void;
}

export function FavoriteButton({
  videoId,
  videoTitle,
  videoUrl,
  category,
  thumbnail,
  isFavorite: initialIsFavorite,
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useUIStore();

  const handleToggleFavorite = async () => {
    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch('/api/videos/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId }),
        });

        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }

        setIsFavorite(false);
        showToast('Removido dos favoritos', 'success');
        onToggle(false);
      } else {
        // Add to favorites
        const response = await fetch('/api/videos/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoId,
            videoTitle,
            videoUrl,
            category,
            thumbnail,
          }),
        });

        if (!response.ok) {
          const error = await response.json();

          if (response.status === 400 && error.error?.includes('limit')) {
            showToast('Você atingiu o limite de 20 favoritos', 'error');
            setIsLoading(false);
            return;
          }

          throw new Error('Failed to add favorite');
        }

        setIsFavorite(true);
        showToast('Adicionado aos favoritos', 'success');
        onToggle(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('Erro ao favoritar vídeo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        p-3 rounded-full transition-all tap-highlight-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          isFavorite
            ? 'bg-red-100 text-red-500'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }
      `}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isLoading ? (
        <OptimizedIcon icon={CircleNotch} size={24} weight="bold" className="animate-spin" />
      ) : (
        <motion.div
          animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <OptimizedIcon
            icon={Heart}
            size={24}
            weight={isFavorite ? 'fill' : 'regular'}
          />
        </motion.div>
      )}
    </motion.button>
  );
}
