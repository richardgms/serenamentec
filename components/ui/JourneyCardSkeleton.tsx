/**
 * Journey Card Skeleton
 * Skeleton específico para cards de jornada
 */

import { Skeleton } from './LoadingSkeleton';

export function JourneyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      {/* Icon area */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width={48} height={48} variant="rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton height={24} width="70%" />
          <Skeleton height={16} width="90%" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <Skeleton height={8} width="100%" variant="rounded" />
        <Skeleton height={14} width={80} />
      </div>

      {/* Action button */}
      <div className="mt-4">
        <Skeleton height={40} width="100%" variant="rounded" />
      </div>
    </div>
  );
}

/**
 * Journey Card Skeleton List
 */
export function JourneyCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <JourneyCardSkeleton key={index} />
      ))}
    </div>
  );
}
