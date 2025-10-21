'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function ProgressBar({
  current,
  total,
  showText = true,
  size = 'md',
  color = 'bg-primary',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className={`w-full ${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Text */}
      {showText && (
        <div className={`flex justify-between items-center mt-1 ${textSizes[size]}`}>
          <span className="text-gray-600">
            {current} de {total} etapas
          </span>
          <span className="font-semibold text-gray-700">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
