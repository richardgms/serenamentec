'use client'

import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full rounded-full bg-primary/10 overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light shadow-glow transition-all duration-[400ms] ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <p className="mt-1 text-xs text-text-secondary text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  )
}
