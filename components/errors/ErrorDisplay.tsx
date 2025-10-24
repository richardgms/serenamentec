/**
 * Error Display Component
 * Componente genérico para exibir erros
 */

'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { colors } from '@/docs/visual/design-tokens'
import {
  ArrowClockwise,
  House,
  WarningCircle,
  WifiSlash
} from '@/lib/constants/icons'
import { emptyStateVariants, floatingAnimation } from '@/lib/animations/variants'
import type { ErrorType } from '@/lib/utils/errorHandler'

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
  const shouldReduceMotion = useReducedMotion()

  const accent = useMemo(() => {
    const base = {
      color: colors.system.error,
      background: 'rgba(255, 139, 148, 0.18)',
      icon: WarningCircle,
    }

    if (type === 'network') {
      return {
        color: colors.system.warning,
        background: 'rgba(245, 180, 97, 0.2)',
        icon: WifiSlash,
      }
    }

    if (type === 'validation') {
      return {
        color: colors.system.warning,
        background: 'rgba(245, 180, 97, 0.18)',
        icon: WarningCircle,
      }
    }

    if (type === 'authorization' || type === 'authentication') {
      return {
        color: colors.system.info,
        background: 'rgba(125, 211, 192, 0.22)',
        icon: WarningCircle,
      }
    }

    return base
  }, [type])

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      role="alert"
      aria-live="assertive"
      className={`
        flex flex-col items-center justify-center
        text-center px-6 py-12
        ${className}
      `}
    >
      {/* Icon */}
      <motion.div
        className="mb-6"
        {...(!shouldReduceMotion && {
          variants: floatingAnimation,
          animate: 'animate'
        })}
      >
        <span
          className="relative grid h-20 w-20 place-items-center rounded-2xl"
          style={{
            background: accent.background,
            boxShadow: `0 18px 48px ${accent.color}40`
          }}
        >
          <OptimizedIcon
            icon={accent.icon}
            size={40}
            weight="duotone"
            color={accent.color}
          />
        </span>
      </motion.div>

      {/* Title */}
      <h2 className="text-xl font-bold text-text-primary mb-3">{displayTitle}</h2>

      {/* Message */}
      <p className="text-text-secondary mb-6 max-w-md leading-relaxed">{message}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <OptimizedIcon icon={ArrowClockwise} size={18} weight="bold" />
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
            <OptimizedIcon icon={House} size={18} weight="regular" />
            Voltar ao Início
          </Button>
        )}
      </div>

      {/* Helper text */}
      {type === 'network' && (
        <p className="mt-6 max-w-sm text-xs leading-relaxed text-text-tertiary">
          💡 Verifique sua conexão de internet ou tente reativar o Wi-Fi para continuar.
        </p>
      )}
    </motion.div>
  );
}
