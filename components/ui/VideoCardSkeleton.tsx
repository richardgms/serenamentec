import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { Card } from '@/components/ui/Card'

export function VideoCardSkeleton() {
  return (
    <Card padding="none">
      <LoadingSkeleton height="h-48" rounded="lg" />
      <div className="p-4 space-y-2">
        <LoadingSkeleton height="h-5" width="w-3/4" />
        <LoadingSkeleton height="h-4" width="w-1/2" />
      </div>
    </Card>
  )
}
