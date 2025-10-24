'use client'

import { useMemo } from 'react'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { colors } from '@/docs/visual/design-tokens'

interface ConfettiBurstProps {
  play?: boolean
  className?: string
  duration?: number
  pieceCount?: number
  spread?: number
  colors?: string[]
}

interface ConfettiPiece {
  x: number
  y: number
  rotate: number
  shape: 'circle' | 'square'
  width: number
  height: number
  delay: number
  color: string
}

const DEFAULT_COLORS = [
  colors.primary.main,
  colors.primary.dark,
  colors.accent.warm,
  colors.system.warning,
  colors.accent.aqua,
  '#AC9DFF' // Roxo especial - cor única para celebrações
]

/**
 * ConfettiBurst
 * Anima particulas de confete em formato radial
 */
export function ConfettiBurst({
  play = true,
  className,
  duration = 1.2,
  pieceCount = 18,
  spread = 120,
  colors = DEFAULT_COLORS
}: ConfettiBurstProps) {
  const shouldReduceMotion = useReducedMotion()

  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: pieceCount }, (_, index) => {
      const angle = (360 / pieceCount) * index + Math.random() * 25
      const distance = spread * (0.55 + Math.random() * 0.45)
      const radians = (angle * Math.PI) / 180

      const color = colors[index % colors.length]

      return {
        x: Math.cos(radians) * distance,
        y: Math.sin(radians) * distance * -1,
        rotate: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
        width: 6 + Math.random() * 4,
        height: 10 + Math.random() * 6,
        delay: Math.random() * 0.2,
        color
      }
    })
  }, [pieceCount, spread, colors])

  if (!play || shouldReduceMotion) {
    return null
  }

  return (
    <div className={clsx('pointer-events-none absolute inset-0', className)}>
      {pieces.map((piece, index) => (
        <motion.span
          key={`confetti-${index}`}
          initial={{ opacity: 0, scale: 0.6, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1, 0.8],
            x: piece.x,
            y: piece.y,
            rotate: piece.rotate,
            transition: {
              delay: piece.delay,
              duration,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          className="absolute"
          style={{
            background:
              piece.shape === 'circle'
                ? piece.color
                : `linear-gradient(135deg, ${piece.color} 0%, rgba(255,255,255,0.9) 100%)`,
            width: piece.width,
            height: piece.height,
            borderRadius: piece.shape === 'circle' ? '999px' : '6px',
            left: '50%',
            top: '50%',
            transformOrigin: 'center'
          }}
        />
      ))}
    </div>
  )
}
