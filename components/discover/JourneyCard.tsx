'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from './ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { ConfettiBurst } from '@/components/ui/CelebrationBurst'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Sparkle } from '@/lib/constants/icons'
import { useRouter } from 'next/navigation'
import {
  getJourneyInfo,
  getJourneyStatus,
  getStatusLabel,
  type JourneyType
} from '@/lib/utils/journeyHelpers'

interface JourneyCardProps {
  journeyType: JourneyType
  completedSteps: number[]
  onClick?: () => void
}

export function JourneyCard({
  journeyType,
  completedSteps,
  onClick
}: JourneyCardProps) {
  const router = useRouter()
  const info = getJourneyInfo(journeyType)
  const status = getJourneyStatus(completedSteps, info.totalSteps)
  const statusLabel = getStatusLabel(status)
  const isCompleted = status === 'completed'
  const progress = (completedSteps.length / info.totalSteps) * 100
  const [playCelebration, setPlayCelebration] = useState(false)

  useEffect(() => {
    if (!isCompleted) {
      setPlayCelebration(false)
      return
    }

    setPlayCelebration(true)
    const timer = setTimeout(() => setPlayCelebration(false), 1400)

    return () => clearTimeout(timer)
  }, [isCompleted])

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/discover/journeys/${journeyType}`)
    }
  }

  return (
    <Card
      clickable
      hover={isCompleted ? 'glow' : 'scale'}
      onClick={handleClick}
      className={clsx(
        'relative overflow-hidden space-y-4',
        isCompleted && 'border-primary/40 shadow-soft-xl'
      )}
    >
      {playCelebration && (
        <ConfettiBurst
          play={playCelebration}
          className="pointer-events-none"
          pieceCount={20}
          spread={130}
        />
      )}

      {/* Header */}
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.2, repeat: isCompleted ? Infinity : 0, repeatDelay: 1.8 }}
          className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-2xl"
        >
          {info.emoji}
        </motion.div>
        
        {isCompleted && (
          <Badge variant="success" size="sm" className="relative pl-8">
            <span className="absolute left-2 top-1/2 -translate-y-1/2">
              <OptimizedIcon icon={Sparkle} size={16} weight="duotone" className="text-primary" />
            </span>
            {statusLabel}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-text-primary text-lg mb-2">
          {info.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {info.description}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <ProgressBar value={progress} showLabel />
        <p className="text-xs text-text-tertiary">
          {completedSteps.length} de {info.totalSteps} passos completados
        </p>
      </div>

      {/* Action hint */}
      <div className="text-center pt-2">
        <p className="text-sm font-medium text-primary">
          {status === 'not_started' && 'Iniciar jornada →'}
          {status === 'in_progress' && 'Continuar jornada →'}
          {status === 'completed' && 'Revisar jornada ✓'}
        </p>
      </div>
    </Card>
  )
}
