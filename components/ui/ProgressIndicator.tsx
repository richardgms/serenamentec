/**
 * Progress Indicator Component
 * Barras de progresso e indicadores
 */

import { motion } from 'framer-motion';
import { progressBarVariants } from '@/lib/animations/variants';

export interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  progress,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progresso</span>
          <span className="text-sm font-semibold text-gray-800">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        {animated ? (
          <motion.div
            className={`h-full ${colorClasses[variant]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ) : (
          <div
            className={`h-full ${colorClasses[variant]} rounded-full transition-all duration-300`}
            style={{ width: `${clampedProgress}%` }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Circular Progress
 */
export function CircularProgress({
  progress,
  size = 64,
  strokeWidth = 6,
  variant = 'primary',
  showLabel = true,
  className = '',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'secondary' | 'success';
  showLabel?: boolean;
  className?: string;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedProgress / 100) * circumference;

  const colors = {
    primary: '#84C2BE',
    secondary: '#ACFFF9',
    success: '#90EE90',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {showLabel && (
        <span className="absolute text-sm font-semibold text-gray-800">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
}

/**
 * Step Progress - Para onboarding e wizards
 */
export function StepProgress({
  currentStep,
  totalSteps,
  className = '',
}: {
  currentStep: number;
  totalSteps: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center flex-1">
            {/* Step circle */}
            <motion.div
              className={`
                flex items-center justify-center
                h-8 w-8 rounded-full border-2
                transition-colors duration-300
                ${
                  isCompleted || isCurrent
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }
              `}
              initial={{ scale: 0.8 }}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-semibold">{stepNumber}</span>
            </motion.div>

            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-200">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Indeterminate Progress - Loading sem progresso conhecido
 */
export function IndeterminateProgress({
  variant = 'primary',
  className = '',
}: {
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  return (
    <div className={`w-full h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-full w-1/3 ${colorClasses[variant]} rounded-full`}
        animate={{
          x: ['-100%', '400%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
