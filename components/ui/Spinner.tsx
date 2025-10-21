/**
 * Spinner Component
 * Múltiplas variantes de loading spinner
 */

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { spinnerVariants } from '@/lib/animations/variants';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  gray: 'text-gray-400',
};

export function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
  label,
}: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={`${sizeClasses[size]} ${colorClasses[variant]} ${className}`}
      >
        <Loader2 className="h-full w-full" />
      </motion.div>
      {label && (
        <p className="text-sm text-gray-600 animate-pulse">{label}</p>
      )}
    </div>
  );
}

/**
 * Dots Spinner - Animação de pontos
 */
export function DotsSpinner({
  variant = 'primary',
  size = 'md',
}: {
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dotSizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };

  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    white: 'bg-white',
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`rounded-full ${dotSizes[size]} ${colors[variant]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Pulse Spinner - Animação de pulso
 */
export function PulseSpinner({
  variant = 'primary',
  size = 'md',
}: {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const colors = {
    primary: 'border-primary',
    secondary: 'border-secondary',
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <motion.div
        className={`absolute inset-0 rounded-full border-4 ${colors[variant]} opacity-75`}
        animate={{
          scale: [1, 1.5],
          opacity: [0.75, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full border-4 ${colors[variant]}`}
        animate={{
          scale: [1, 1.3],
          opacity: [1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.5,
        }}
      />
    </div>
  );
}

/**
 * Bar Spinner - Animação de barras
 */
export function BarSpinner({
  variant = 'primary',
}: {
  variant?: 'primary' | 'secondary';
}) {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };

  return (
    <div className="flex items-end gap-1 h-8">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`w-1.5 rounded-full ${colors[variant]}`}
          animate={{
            height: ['20%', '100%', '20%'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
