/**
 * Empty State Component
 * Componente reutilizável (com presets) para estados vazios empáticos
 */

'use client'

import { ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'framer-motion'
import { colors } from '@/docs/visual/design-tokens'
import { Button } from '@/components/ui/Button'
import {
  emptyStatePresets,
  EmptyStateAccent,
  EmptyStateContext,
  EmptyStatePreset
} from '@/components/ui/emptyStatePresets'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import {
  emptyStateVariants,
  floatingAnimation
} from '@/lib/animations/variants'
import type { Icon } from 'phosphor-react'

interface EmptyStateProps {
  context?: EmptyStateContext
  accent?: EmptyStateAccent
  icon?: Icon
  illustration?: ReactNode
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
  tip?: string
  className?: string
}

interface AccentTokens {
  background: string
  iconBackground: string
  iconShadow: string
  iconColor: string
  border: string
  tag: string
}

const ACCENT_TOKENS: Record<EmptyStateAccent, AccentTokens> = {
  primary: {
    background:
      'linear-gradient(180deg, rgba(125,211,192,0.14) 0%, rgba(125,211,192,0.05) 100%)',
    iconBackground: 'rgba(125, 211, 192, 0.18)',
    iconShadow: '0 18px 48px rgba(95, 184, 168, 0.35)',
    iconColor: 'var(--primary-dark)',
    border: 'rgba(125, 211, 192, 0.35)',
    tag: 'rgba(125, 211, 192, 0.22)'
  },
  warm: {
    background:
      'linear-gradient(180deg, rgba(255,214,186,0.25) 0%, rgba(255,180,162,0.08) 100%)',
    iconBackground: 'rgba(255, 214, 186, 0.28)',
    iconShadow: '0 18px 48px rgba(255, 180, 162, 0.35)',
    iconColor: colors.accent.warm,
    border: 'rgba(255, 180, 162, 0.4)',
    tag: 'rgba(255, 214, 186, 0.32)'
  },
  calm: {
    background:
      'linear-gradient(180deg, rgba(232,244,248,0.3) 0%, rgba(184,223,216,0.12) 100%)',
    iconBackground: 'rgba(184, 223, 216, 0.28)',
    iconShadow: '0 18px 48px rgba(184, 223, 216, 0.35)',
    iconColor: colors.accent.calm,
    border: 'rgba(184, 223, 216, 0.4)',
    tag: 'rgba(184, 223, 216, 0.32)'
  },
  neutral: {
    background:
      'linear-gradient(180deg, rgba(148,163,184,0.18) 0%, rgba(148,163,184,0.05) 100%)',
    iconBackground: 'rgba(148, 163, 184, 0.18)',
    iconShadow: '0 18px 48px rgba(148, 163, 184, 0.28)',
    iconColor: colors.light.text.secondary,
    border: 'rgba(148, 163, 184, 0.35)',
    tag: 'rgba(148, 163, 184, 0.25)'
  }
}

function resolvePreset(context?: EmptyStateContext): EmptyStatePreset | null {
  if (!context) return null
  return emptyStatePresets[context] ?? null
}

export function EmptyState({
  context,
  accent,
  icon,
  illustration,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  tip,
  className = ''
}: EmptyStateProps) {
  const shouldReduceMotion = useReducedMotion()
  const preset = useMemo(() => resolvePreset(context), [context])

  const resolvedAccent: EmptyStateAccent =
    accent ?? preset?.accent ?? 'primary'
  const accentTokens = ACCENT_TOKENS[resolvedAccent]

  const IconComponent = icon ?? (preset?.icon as Icon | undefined)

  const illustrationNode = illustration ?? preset?.illustration ?? null
  const resolvedTitle = title ?? preset?.title
  const resolvedDescription = description ?? preset?.description
  const resolvedTip = tip ?? preset?.tip

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        'relative isolate flex flex-col items-center justify-center rounded-3xl border px-6 py-12 text-center shadow-soft-xl backdrop-blur-xl',
        className
      )}
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: accentTokens.border
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-90"
        style={{
          background: accentTokens.background
        }}
      />

      <AnimatePresence>
        {illustrationNode ? (
          <motion.div
            key="illustration"
            className="mb-6"
            {...(!shouldReduceMotion && {
              variants: floatingAnimation,
              animate: 'animate'
            })}
          >
            {illustrationNode}
          </motion.div>
        ) : IconComponent ? (
          <motion.div
            key="icon"
            className="mb-6"
            {...(!shouldReduceMotion && {
              variants: floatingAnimation,
              animate: 'animate'
            })}
          >
            <span
              className="relative grid h-20 w-20 place-items-center rounded-2xl"
              style={{
                background: accentTokens.iconBackground,
                boxShadow: accentTokens.iconShadow
              }}
            >
              <OptimizedIcon
                icon={IconComponent}
                size={40}
                weight="duotone"
                color={accentTokens.iconColor}
              />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {resolvedTitle && (
        <h3 className="mb-3 text-xl font-bold text-text-primary">
          {resolvedTitle}
        </h3>
      )}

      {resolvedDescription && (
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-secondary">
          {resolvedDescription}
        </p>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex w-full max-w-xs flex-col gap-3 sm:flex-row">
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              fullWidth
              className="shadow-soft-md"
            >
              {actionLabel}
            </Button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <Button
              onClick={onSecondaryAction}
              variant="outline"
              fullWidth
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}

      {resolvedTip && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-text-secondary"
          style={{
            background: accentTokens.tag
          }}
        >
          <span aria-hidden>💡</span>
          {resolvedTip}
        </motion.span>
      )}
    </motion.div>
  )
}
