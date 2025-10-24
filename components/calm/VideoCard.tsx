'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Play } from '@/lib/constants/icons'
import { getYouTubeThumbnail, formatVideoDuration } from '@/lib/utils/youtube'

export interface VideoCardProps {
  videoId: string
  title: string
  description?: string
  thumbnail?: string
  duration?: number // in seconds
  onClick?: () => void
}

export function VideoCard({
  videoId,
  title,
  description,
  thumbnail,
  duration,
  onClick,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const thumbnailUrl = thumbnail || getYouTubeThumbnail(videoId, 'hq')

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/calm/${videoId}`)
    }
  }

  return (
    <Card
      padding="none"
      clickable
      hover="scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay on Hover - Enhanced Glass Effect */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-primary/30 backdrop-blur-md flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-white/90 rounded-full p-4 shadow-soft-lg"
          >
            <OptimizedIcon
              icon={Play}
              size={32}
              className="text-primary"
              weight="fill"
            />
          </motion.div>
        </motion.div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2">
            <Badge size="sm" className="bg-black/70 text-white border-0">
              {formatVideoDuration(duration)}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary line-clamp-2 mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Card>
  )
}
