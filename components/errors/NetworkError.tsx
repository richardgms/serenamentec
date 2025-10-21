/**
 * Network Error Component
 * Erro específico para problemas de conexão
 */

'use client';

import { motion } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { emptyStateVariants } from '@/lib/animations/variants';

export interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function NetworkError({ onRetry, message }: NetworkErrorProps) {
  const defaultMessage =
    'Parece que você está sem conexão. Verifique sua internet e tente novamente.';

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-6 py-12"
    >
      {/* Animated WiFi Icon */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl" />
          <WifiOff className="relative h-20 w-20 text-gray-400" />
        </div>
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Sem Conexão</h2>

      {/* Message */}
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
        {message || defaultMessage}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar Novamente
        </Button>
      )}

      {/* Tips */}
      <div className="mt-8 text-left bg-gray-50 rounded-lg p-4 max-w-sm">
        <p className="text-xs font-semibold text-gray-700 mb-2">
          💡 Dicas para resolver:
        </p>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>Verifique se o Wi-Fi ou dados móveis estão ligados</li>
          <li>Tente desligar e ligar o modo avião</li>
          <li>Aproxime-se do roteador Wi-Fi</li>
        </ul>
      </div>
    </motion.div>
  );
}
