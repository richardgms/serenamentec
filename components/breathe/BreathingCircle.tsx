'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHaptic } from '@/lib/hooks/useHaptic'
import { BreathingPhase } from '@/lib/utils/breathingPatterns'
import { colors } from '@/docs/visual/design-tokens'

interface BreathingCircleProps {
  phase: BreathingPhase
  timeRemaining: number
  totalTime: number
}

const phaseColors = {
  inhale: colors.primary.main,
  hold: colors.accent.aqua,
  exhale: colors.primary.light,
  pause: colors.accent.calm,
}

const phaseLabels = {
  inhale: 'Inspire',
  hold: 'Segure',
  exhale: 'Expire',
  pause: 'Descanse',
}

export function BreathingCircle({ phase, timeRemaining, totalTime }: BreathingCircleProps) {
  const { impact } = useHaptic()
  const [prevPhase, setPrevPhase] = useState(phase)

  useEffect(() => {
    if (prevPhase !== phase) {
      impact('light')
      setPrevPhase(phase)
    }
  }, [phase, prevPhase, impact])

  // Calculate scale based on phase
  const scale = 
    phase === 'inhale' ? 1.15 : 
    phase === 'exhale' ? 0.85 : 
    1.0 // hold and pause stay at normal size

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-accent-aqua blur-3xl" />
      </div>

      {/* Breathing Circle */}
      <motion.div
        className="relative z-10 w-64 h-64 rounded-full flex items-center justify-center force-animation"
        style={{
          background: `radial-gradient(circle, ${phaseColors[phase]}40, ${phaseColors[phase]}10)`,
        }}
        animate={{
          scale: scale,
          boxShadow: `0 0 40px ${phaseColors[phase]}60`,
        }}
        transition={{
          duration: totalTime,
          ease: 'easeInOut',
        }}
      >
        <div className="text-center">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-text-primary mb-3"
          >
            {phaseLabels[phase]}
          </motion.p>
          <motion.p
            key={`${phase}-time`}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold text-text-primary"
          >
            {timeRemaining}
          </motion.p>
        </div>
      </motion.div>

      {/* Instruction Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center px-4"
      >
        <p className="text-base text-text-secondary">
          {phase === 'inhale' && 'Inspire lentamente pelo nariz'}
          {phase === 'hold' && 'Segure o ar nos pulmões'}
          {phase === 'exhale' && 'Expire suavemente pela boca'}
          {phase === 'pause' && 'Pause e relaxe'}
        </p>
      </motion.div>
    </div>
  )
}
