/**
 * Empty State Component
 * Componente reutilizável para estados vazios
 */

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { emptyStateVariants, floatingAnimation } from '@/lib/animations/variants';

export interface EmptyStateProps {
  icon?: LucideIcon;
  illustration?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  tip?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  illustration,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  tip,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className={`
        flex flex-col items-center justify-center
        text-center px-6 py-12
        ${className}
      `}
    >
      {/* Icon or Illustration */}
      {illustration ? (
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="mb-6"
        >
          {illustration}
        </motion.div>
      ) : Icon ? (
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
            <Icon className="relative h-16 w-16 text-primary/60" />
          </div>
        </motion.div>
      ) : null}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          {actionLabel && onAction && (
            <Button onClick={onAction} variant="primary" fullWidth>
              {actionLabel}
            </Button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <Button onClick={onSecondaryAction} variant="outline" fullWidth>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}

      {/* Tip */}
      {tip && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 mt-6"
        >
          💡 {tip}
        </motion.p>
      )}
    </motion.div>
  );
}
