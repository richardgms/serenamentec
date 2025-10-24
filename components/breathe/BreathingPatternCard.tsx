'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { BreathingPattern } from '@/lib/utils/breathingPatterns';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { ArrowRight } from 'phosphor-react';

interface BreathingPatternCardProps {
  pattern: BreathingPattern;
  onClick: () => void;
}

export function BreathingPatternCard({ pattern, onClick }: BreathingPatternCardProps) {
  const { inhale, hold, exhale, pause } = pattern.phases;
  const timing = pause
    ? `${inhale}-${hold}-${exhale}-${pause}`
    : `${inhale}-${hold}-${exhale}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        clickable
        onClick={onClick}
        padding="md"
        className={`
          relative overflow-hidden
          !bg-gradient-to-br ${pattern.gradient}
          text-white
          min-h-[180px]
          flex flex-col justify-between
          !border-0
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-4xl mb-2 block">{pattern.emoji}</span>
            <h3 className="text-xl font-bold mb-1">{pattern.name}</h3>
            <p className="text-sm text-white/90 font-medium">
              {pattern.description}
            </p>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <OptimizedIcon icon={ArrowRight} size={20} className="text-white/80" />
          </motion.div>
        </div>

        {/* Timing */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl font-bold">{timing}</span>
            <span className="text-xs text-white/80">segundos</span>
          </div>
        </div>

        {/* Benefit */}
        <p className="text-sm text-white/90 mt-3 leading-relaxed">
          {pattern.benefit}
        </p>
      </Card>
    </motion.div>
  );
}
