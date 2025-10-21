'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { getYouTubeThumbnail, formatVideoDuration } from '@/lib/utils/youtube';
import { Play, Clock } from 'lucide-react';

export interface VideoCardProps {
  videoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: number; // in seconds
  onClick: () => void;
}

export function VideoCard({
  videoId,
  title,
  description,
  thumbnail,
  duration,
  onClick,
}: VideoCardProps) {
  const thumbnailUrl = thumbnail || getYouTubeThumbnail(videoId, 'hq');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        onClick={onClick}
        className="overflow-hidden p-0 cursor-pointer hover:shadow-lg transition-shadow"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-200 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="h-6 w-6 text-primary fill-primary" />
            </div>
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatVideoDuration(duration)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
