/**
 * Network Error Component
 * Erro específico para problemas de conexão
 */

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { ArrowClockwise, WifiSlash } from '@/lib/constants/icons'
import { emptyStateVariants, floatingAnimation } from '@/lib/animations/variants'

export interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function NetworkError({ onRetry, message }: NetworkErrorProps) {
  const defaultMessage =
    'Parece que você está sem conexão. Verifique sua internet e tente novamente.'
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-6 py-12"
      role="alert"
      aria-live="assertive"
    >
      {/* Animated WiFi Icon */}
      <motion.div
        className="mb-6"
        {...(!shouldReduceMotion && {
          variants: floatingAnimation,
          animate: 'animate'
        })}
      >
        <span className="relative grid h-24 w-24 place-items-center rounded-[28px] bg-[rgba(245,180,97,0.2)] shadow-soft-xl">
          <OptimizedIcon
            icon={WifiSlash}
            size={48}
            weight="duotone"
            color="#F5B461"
          />
        </span>
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-text-primary mb-3">Sem Conexão</h2>

      {/* Message */}
      <p className="text-text-secondary mb-8 max-w-sm leading-relaxed">
        {message || defaultMessage}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="flex items-center gap-2"
        >
          <OptimizedIcon icon={ArrowClockwise} size={18} weight="bold" />
          Tentar Novamente
        </Button>
      )}

      {/* Tips */}
      <div className="mt-8 max-w-sm rounded-2xl border border-[rgba(245,180,97,0.25)] bg-[rgba(245,180,97,0.12)] p-4 text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
          💡 Como recuperar a conexão
        </p>
        <ul className="space-y-1 text-xs text-text-secondary">
          <li>Verifique se o Wi-Fi ou os dados móveis estão ativados.</li>
          <li>Experimente desligar e ligar o modo avião.</li>
          <li>Aproxime-se do roteador ou tente reconectar à rede.</li>
        </ul>
      </div>
    </motion.div>
  )
}
