'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'framer-motion'
import type { AchievementNotification } from '@/lib/store/achievementStore'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { ConfettiBurst } from '@/components/ui/CelebrationBurst'
import { Sparkle, X } from '@/lib/constants/icons'

interface AchievementToastProps {
  achievement: AchievementNotification;
  onClose: () => void;
  soundEnabled?: boolean;
}

export function AchievementToast({
  achievement,
  onClose,
  soundEnabled = true
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [playCelebration, setPlayCelebration] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 260)
  }, [onClose])

  useEffect(() => {
    // Play sound if enabled
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/achievement.mp3')
        audio.volume = 0.3
        audio.play().catch(() => {
          // Ignore if sound can't play
        })
      } catch {
        // Ignore sound errors
      }
    }

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [soundEnabled, achievement.id, handleClose])

  useEffect(() => {
    setIsVisible(true)

    if (shouldReduceMotion) {
      return
    }

    setPlayCelebration(true)
    const timer = setTimeout(() => setPlayCelebration(false), 1400)

    return () => clearTimeout(timer)
  }, [achievement.id, shouldReduceMotion])

  const accentColor = achievement.color || '#7DD3C0'
  const gradientBackground = `linear-gradient(135deg, ${accentColor}1A 0%, ${accentColor}0F 100%)`
  const unlockedTime = achievement.unlockedAt
    ? achievement.unlockedAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'agora mesmo'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 28
          }}
          className="fixed top-6 left-1/2 z-[140] w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div
            className="relative overflow-hidden rounded-3xl border bg-[var(--surface-card)]/96 px-5 py-5 shadow-soft-xxl backdrop-blur-xl"
            style={{
              background: gradientBackground,
              borderColor: `${accentColor}44`
            }}
          >
            <ConfettiBurst play={playCelebration} className="-z-10" />

            <span
              aria-hidden
              className="absolute -top-16 right-10 h-32 w-32 rounded-full opacity-40 blur-3xl"
              style={{
                background: `${accentColor}33`
              }}
            />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1.5 transition-all duration-200 ease-in-out hover:bg-[rgba(148,163,184,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(125,211,192,0.6)]"
              aria-label="Fechar conquista"
            >
              <OptimizedIcon icon={X} size={16} weight="bold" />
            </button>

            <div className="relative flex items-start gap-4">
              {/* Emoji */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: 'easeInOut'
                }}
                className="grid h-16 w-16 place-items-center rounded-2xl text-4xl shadow-soft-lg"
                style={{
                  background: `${accentColor}26`
                }}
              >
                {achievement.emoji}
              </motion.div>

              <div className="flex-1">
                <span className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
                  <OptimizedIcon
                    icon={Sparkle}
                    size={16}
                    weight="duotone"
                    color={accentColor}
                  />
                  Conquista desbloqueada!
                </span>

                <h3 className="mb-1 text-lg font-semibold text-text-primary">
                  {achievement.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {achievement.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-tertiary">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1"
                    style={{
                      background: `${accentColor}22`,
                      color: accentColor
                    }}
                  >
                    Celebrado às {unlockedTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
