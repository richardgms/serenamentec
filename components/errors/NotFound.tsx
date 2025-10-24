/**
 * Not Found Component
 * Componente para erro 404
 */

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { House, MagnifyingGlass } from '@/lib/constants/icons'
import { emptyStateVariants, floatingAnimation } from '@/lib/animations/variants'

export interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function NotFound({
  title = 'Página Não Encontrada',
  message = 'Não conseguimos encontrar o que você está procurando. Ela pode ter sido movida ou não existe mais.',
  showHomeButton = true,
}: NotFoundProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-[60vh]"
      role="alert"
      aria-live="polite"
    >
      {/* Floating 404 */}
      <motion.div
        {...(!shouldReduceMotion && {
          variants: floatingAnimation,
          animate: 'animate'
        })}
        className="mb-6"
      >
        <div className="relative grid place-items-center">
          <span className="text-7xl font-bold tracking-wider text-text-tertiary/20">
            404
          </span>
          <span className="absolute rounded-full bg-primary/10 p-4 shadow-soft-lg">
            <OptimizedIcon
              icon={MagnifyingGlass}
              size={32}
              weight="duotone"
              className="text-primary"
            />
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-3">{title}</h1>

      {/* Message */}
      <p className="text-text-secondary mb-8 max-w-md leading-relaxed">{message}</p>

      {/* Actions */}
      {showHomeButton && (
        <div className="flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            Voltar
          </Button>
          <Button
            onClick={() => router.push('/home')}
            variant="primary"
            className="flex items-center gap-2"
          >
            <OptimizedIcon icon={House} size={18} weight="bold" />
            Ir para Início
          </Button>
        </div>
      )}

      {/* Illustration text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-text-tertiary">
          🧭 Parece que você se perdeu por aqui
        </p>
      </div>
    </motion.div>
  );
}
