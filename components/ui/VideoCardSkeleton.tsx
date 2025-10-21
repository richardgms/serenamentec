/**
 * Video Card Skeleton
 * Skeleton específico para cards de vídeo
 */

import { Skeleton } from './LoadingSkeleton';

export function VideoCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
      {/* Thumbnail Skeleton */}
      <Skeleton height={180} variant="rectangular" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton height={20} width="80%" />

        {/* Description */}
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="60%" />

        {/* Footer with duration and favorite */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton height={12} width={60} />
          <Skeleton height={24} width={24} variant="circular" />
        </div>
      </div>
    </div>
  );
}

/**
 * Video Card Skeleton List
 */
export function VideoCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}
