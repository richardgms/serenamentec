'use client'

import { Card } from '@/components/ui/Card'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Check, Eye, ChatCircle, Calendar, Target, HandsClapping, MaskHappy, WarningCircle, Brain } from '@/lib/constants/icons'
import { getTopicInfo, getTopicIconName, type TopicType } from '@/lib/utils/topicHelpers'
import { useRouter } from 'next/navigation'

interface TopicCardProps {
  topicType: TopicType
  explored?: boolean
  onClick?: () => void
}

export function TopicCard({ topicType, explored = false, onClick }: TopicCardProps) {
  const router = useRouter()
  const info = getTopicInfo(topicType)

  // Get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    const iconMap = {
      Eye,
      ChatCircle,
      Calendar,
      Target,
      HandsClapping,
      MaskHappy,
      WarningCircle,
      Brain,
    }

    const icon = iconMap[iconName as keyof typeof iconMap]

    if (!icon) {
      console.error('TopicCard: Icon not found for name:', iconName)
      return Eye // fallback to Eye
    }

    return icon
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/discover/topics/${topicType}`)
    }
  }

  return (
    <Card
      clickable
      onClick={handleClick}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-primary/10">
          <OptimizedIcon icon={getIconComponent(info.iconName)} size={24} weight="duotone" />
        </div>

        {explored && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Check size={16} weight="bold" />
            <span>Ressoou</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-text-primary mb-1">
          {info.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {info.subtitle}
        </p>
      </div>
    </Card>
  )
}
