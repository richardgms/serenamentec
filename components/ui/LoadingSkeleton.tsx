'use client'

import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface LoadingSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  shimmer?: boolean
}

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function LoadingSkeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  shimmer = true,
  className,
  ...props
}: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-[var(--surface-card)]',
        width,
        height,
        roundedClasses[rounded],
        className
      )}
      {...props}
    >
      {shimmer && (
        <div
          className="absolute inset-0 shimmer-animation"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(125, 211, 192, 0.2), transparent)',
            backgroundSize: '200% 100%',
          }}
        />
      )}
    </div>
  )
}
