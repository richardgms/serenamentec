import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { Card } from '@/components/ui/Card'

export function JourneyCardSkeleton() {
  return (
    <Card>
      <div className="space-y-3">
        <LoadingSkeleton width="w-12" height="h-12" rounded="lg" />
        <LoadingSkeleton height="h-6" width="w-3/4" />
        <LoadingSkeleton height="h-4" width="w-full" />
        <LoadingSkeleton height="h-4" width="w-5/6" />
        <LoadingSkeleton height="h-2" width="w-full" rounded="full" />
      </div>
    </Card>
  )
}
