/**
 * Loading Skeleton Component
 * Skeleton screens para melhor perceived performance
 */

import { motion } from 'framer-motion';
import { skeletonPulse } from '@/lib/animations/variants';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rounded',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <motion.div
      className={`bg-gray-200 ${variantClasses[variant]} ${className}`}
      style={{ width: widthStyle, height: heightStyle }}
      variants={skeletonPulse}
      animate="animate"
    />
  );
}

/**
 * Skeleton Text - Para linhas de texto
 */
export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          width={index === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar - Para fotos de perfil
 */
export function SkeletonAvatar({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  return <Skeleton width={sizes[size]} height={sizes[size]} variant="circular" />;
}

/**
 * Skeleton Button
 */
export function SkeletonButton({
  width = 120,
  fullWidth = false,
}: {
  width?: number;
  fullWidth?: boolean;
}) {
  return (
    <Skeleton
      width={fullWidth ? '100%' : width}
      height={44}
      variant="rounded"
    />
  );
}

/**
 * Skeleton Card - Card genérico
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 bg-white rounded-lg border border-gray-100 ${className}`}>
      <div className="flex items-start gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-3">
          <Skeleton height={20} width="60%" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton List - Lista de items
 */
export function SkeletonList({
  items = 5,
  variant = 'card',
}: {
  items?: number;
  variant?: 'card' | 'text' | 'simple';
}) {
  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton width={40} height={40} variant="circular" />
            <div className="flex-1">
              <Skeleton height={16} width="70%" className="mb-2" />
              <Skeleton height={12} width="40%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton key={index} height={48} />
      ))}
    </div>
  );
}

/**
 * Skeleton Grid - Grid de cards
 */
export function SkeletonGrid({
  items = 4,
  columns = 2,
}: {
  items?: number;
  columns?: 1 | 2 | 3 | 4;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton height={120} variant="rounded" />
          <Skeleton height={16} width="80%" />
          <Skeleton height={12} width="60%" />
        </div>
      ))}
    </div>
  );
}
