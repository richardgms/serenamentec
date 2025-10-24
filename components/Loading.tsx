'use client'

import { Spinner } from '@/components/ui/Spinner'

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-main)]">
      <Spinner size="lg" />
    </div>
  )
}

// Re-export components for convenience
export { Spinner } from '@/components/ui/Spinner'
export { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
export { JourneyCardSkeleton } from '@/components/ui/JourneyCardSkeleton'
export { VideoCardSkeleton } from '@/components/ui/VideoCardSkeleton'
