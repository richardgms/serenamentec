/**
 * Pull to Refresh Component
 * Implementa pull-to-refresh nativo para mobile
 */

'use client';

import { ReactNode, useRef, useState, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { ArrowClockwise } from '@/lib/constants/icons';
import { useHaptic } from '@/lib/hooks/useHaptic';

export interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  maxPullDistance?: number;
  disabled?: boolean;
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  maxPullDistance = 120,
  disabled = false,
  className = '',
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { impact } = useHaptic();

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled || isRefreshing) return;

    const scrollTop = containerRef.current?.scrollTop || 0;

    // Só permite pull se estiver no topo da página
    if (scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setCanPull(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!canPull || disabled || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      // Aplica resistência para não puxar muito
      const resistance = 0.5;
      const distance = Math.min(diff * resistance, maxPullDistance);
      setPullDistance(distance);

      // Haptic feedback ao atingir threshold
      if (distance >= threshold && pullDistance < threshold) {
        impact('medium');
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!canPull || disabled || isRefreshing) return;

    setCanPull(false);

    // Se passou do threshold, executa refresh
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      impact('heavy');

      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      // Volta ao normal
      setPullDistance(0);
    }
  };

  const progress = Math.min((pullDistance / threshold) * 100, 100);
  const isReady = pullDistance >= threshold;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull Indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center"
            style={{
              height: Math.max(pullDistance, isRefreshing ? 60 : 0),
            }}
          >
            <div className="flex flex-col items-center gap-1">
              {/* Spinner/Icon */}
              <motion.div
                animate={{
                  rotate: isRefreshing ? 360 : progress * 3.6,
                }}
                transition={
                  isRefreshing
                    ? {
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                    : { duration: 0 }
                }
              >
                <OptimizedIcon
                  icon={ArrowClockwise}
                  size={24}
                  weight="bold"
                  color={
                    isReady || isRefreshing
                      ? 'var(--primary)'
                      : 'var(--text-tertiary)'
                  }
                />
              </motion.div>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: pullDistance > 20 ? 1 : 0 }}
                className="text-xs text-text-secondary"
              >
                {isRefreshing
                  ? 'Atualizando...'
                  : isReady
                  ? 'Solte para atualizar'
                  : 'Puxe para atualizar'}
              </motion.p>

              {/* Progress bar */}
              {!isRefreshing && pullDistance > 20 && (
                <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div
        animate={{
          y: isRefreshing ? 60 : pullDistance > 0 ? pullDistance : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: isRefreshing ? 200 : 300,
          damping: isRefreshing ? 20 : 30,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
