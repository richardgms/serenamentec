'use client'

import { useEffect, useMemo } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'framer-motion'
import { useUIStore } from '@/lib/store/uiStore'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { colors } from '@/docs/visual/design-tokens'
import {
  CheckCircle,
  Info,
  WarningCircle,
  X,
  XCircle
} from '@/lib/constants/icons'

const TOAST_DURATION = 4000

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle,
    accentColor: colors.system.success,
    accentBackground: 'rgba(107, 207, 127, 0.16)',
    borderColor: 'rgba(107, 207, 127, 0.4)',
    shadow: '0 20px 45px rgba(107, 207, 127, 0.25)',
    progressFrom: 'rgba(107, 207, 127, 0.9)',
    progressTo: 'rgba(107, 207, 127, 0.35)'
  },
  error: {
    icon: XCircle,
    accentColor: colors.system.error,
    accentBackground: 'rgba(255, 139, 148, 0.18)',
    borderColor: 'rgba(255, 139, 148, 0.45)',
    shadow: '0 20px 45px rgba(255, 139, 148, 0.28)',
    progressFrom: 'rgba(255, 139, 148, 0.95)',
    progressTo: 'rgba(255, 139, 148, 0.4)'
  },
  warning: {
    icon: WarningCircle,
    accentColor: colors.system.warning,
    accentBackground: 'rgba(245, 180, 97, 0.18)',
    borderColor: 'rgba(245, 180, 97, 0.45)',
    shadow: '0 20px 45px rgba(245, 180, 97, 0.28)',
    progressFrom: 'rgba(245, 180, 97, 0.95)',
    progressTo: 'rgba(245, 180, 97, 0.4)'
  },
  info: {
    icon: Info,
    accentColor: colors.system.info,
    accentBackground: 'rgba(125, 211, 192, 0.16)',
    borderColor: 'rgba(125, 211, 192, 0.45)',
    shadow: '0 20px 45px rgba(125, 211, 192, 0.25)',
    progressFrom: 'rgba(125, 211, 192, 0.95)',
    progressTo: 'rgba(95, 184, 168, 0.4)'
  }
} as const

type ToastVisualVariant = keyof typeof TOAST_CONFIG

export function Toast() {
  const { toastMessage, toastType, hideToast } = useUIStore()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast()
      }, TOAST_DURATION)

      return () => clearTimeout(timer)
    }
  }, [toastMessage, hideToast])

  const variant = useMemo<ToastVisualVariant | null>(() => {
    if (!toastType) return null
    return (Object.keys(TOAST_CONFIG) as ToastVisualVariant[]).includes(
      toastType as ToastVisualVariant
    )
      ? (toastType as ToastVisualVariant)
      : 'info'
  }, [toastType])

  if (!toastMessage || !variant) {
    return null
  }

  const config = TOAST_CONFIG[variant]
  const toastKey = `${variant}-${toastMessage}`

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={toastKey}
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : -32,
          scale: shouldReduceMotion ? 1 : 0.96
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : -28,
          scale: shouldReduceMotion ? 1 : 0.96
        }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="pointer-events-none fixed left-1/2 top-6 z-[120] w-full max-w-md -translate-x-1/2 px-4 sm:top-8"
        role="status"
        aria-live="assertive"
      >
        <div
          className="pointer-events-auto relative overflow-hidden rounded-2xl border bg-[var(--surface-card)] px-5 py-4 text-[var(--text-primary)] shadow-soft-xl backdrop-blur-xl"
          style={{
            borderColor: config.borderColor,
            boxShadow: config.shadow
          }}
        >
          <span
            className="absolute inset-y-0 left-0 w-1.5"
            style={{
              background: `linear-gradient(180deg, ${config.accentColor} 0%, rgba(255,255,255,0) 100%)`
            }}
            aria-hidden
          />

          <div className="flex items-start gap-3">
            <span
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{ backgroundColor: config.accentBackground }}
            >
              <OptimizedIcon
                icon={config.icon}
                size={28}
                weight="duotone"
                color={config.accentColor}
              />
            </span>

            <p className="flex-1 text-sm font-medium leading-relaxed">
              {toastMessage}
            </p>

            <button
              onClick={hideToast}
              className="tap-highlight-none rounded-full p-2 transition-all duration-200 ease-in-out hover:bg-[rgba(148,163,184,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(125,211,192,0.6)]"
              aria-label="Fechar toast"
            >
              <OptimizedIcon icon={X} size={18} weight="bold" />
            </button>
          </div>

          {!shouldReduceMotion ? (
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(148,163,184,0.15)]">
              <motion.div
                key={`${toastKey}-progress`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{
                  duration: TOAST_DURATION / 1000,
                  ease: 'linear'
                }}
                className="h-full w-full origin-[0%] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${config.progressFrom} 0%, ${config.progressTo} 100%)`
                }}
              />
            </div>
          ) : (
            <div
              className="mt-4 h-1.5 w-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${config.progressFrom} 0%, ${config.progressTo} 100%)`
              }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
