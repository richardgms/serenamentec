'use client';

import { motion } from 'framer-motion';
import { Spinner } from './ui/Spinner';

export interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({
  fullScreen = true,
  text = 'Carregando...',
  variant = 'primary',
  size = 'lg',
}: LoadingProps) {
  const containerClasses = fullScreen
    ? 'flex min-h-screen items-center justify-center bg-background'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <Spinner size={size} variant={variant} />

        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-600 animate-pulse"
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

// Loading overlay component
export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 shadow-xl"
      >
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" variant="primary" />
          {text && (
            <p className="text-sm text-gray-600">{text}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
