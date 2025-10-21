/**
 * Error Display Component
 * Componente genérico para exibir erros
 */

'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { emptyStateVariants } from '@/lib/animations/variants';
import type { ErrorType } from '@/lib/utils/errorHandler';

export interface ErrorDisplayProps {
  type?: ErrorType;
  title?: string;
  message: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
  className?: string;
}

export function ErrorDisplay({
  type = 'unknown',
  title,
  message,
  onRetry,
  onGoHome,
  showHomeButton = false,
  className = '',
}: ErrorDisplayProps) {
  const defaultTitles: Record<ErrorType, string> = {
    network: 'Sem Conexão',
    validation: 'Dados Inválidos',
    authentication: 'Sessão Expirada',
    authorization: 'Acesso Negado',
    notFound: 'Não Encontrado',
    server: 'Erro no Servidor',
    unknown: 'Ops! Algo deu errado',
  };

  const displayTitle = title || defaultTitles[type];

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
      {/* Icon */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50" />
          <AlertCircle className="relative h-16 w-16 text-red-400" />
        </div>
      </motion.div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">{displayTitle}</h2>

      {/* Message */}
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">{message}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        )}

        {showHomeButton && onGoHome && (
          <Button
            onClick={onGoHome}
            variant="outline"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Voltar ao Início
          </Button>
        )}
      </div>

      {/* Helper text */}
      {type === 'network' && (
        <p className="text-xs text-gray-400 mt-6">
          💡 Verifique se você está conectado à internet
        </p>
      )}
    </motion.div>
  );
}
