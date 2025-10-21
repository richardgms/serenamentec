'use client';

import { motion } from 'framer-motion';
import { BreathingPhase, getPhaseLabel, getPhaseColor } from '@/lib/utils/breathingPatterns';

interface BreathingCircleProps {
  phase: BreathingPhase;
  timeRemaining: number;
  totalTime: number;
}

export function BreathingCircle({
  phase,
  timeRemaining,
  totalTime,
}: BreathingCircleProps) {
  // Calculate scale based on phase
  const getScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.5; // Expand
      case 'hold':
        return 1.5; // Stay expanded
      case 'exhale':
        return 0.5; // Contract
      case 'pause':
        return 0.5; // Stay contracted
      default:
        return 1;
    }
  };

  // Get background gradient based on phase
  const getGradient = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold':
        return 'from-yellow-400 to-yellow-600';
      case 'exhale':
        return 'from-green-400 to-green-600';
      case 'pause':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-primary to-primary/80';
    }
  };

  const scale = getScale();
  const gradient = getGradient();
  const phaseLabel = getPhaseLabel(phase);
  const phaseColorClass = getPhaseColor(phase);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      {/* Phase Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className={`text-4xl font-bold ${phaseColorClass} mb-2`}>
          {phaseLabel}
        </h2>
        <p className="text-gray-600">
          Respire com o círculo
        </p>
      </motion.div>

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <motion.div
          className={`absolute rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-xl`}
          animate={{
            scale: [scale * 0.8, scale * 1.2, scale * 0.8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: totalTime,
            ease: 'easeInOut',
          }}
          style={{
            width: '300px',
            height: '300px',
          }}
        />

        {/* Main circle */}
        <motion.div
          className={`relative rounded-full bg-gradient-to-br ${gradient} shadow-2xl flex items-center justify-center`}
          animate={{
            scale: scale,
          }}
          transition={{
            duration: totalTime,
            ease: 'easeInOut',
          }}
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          {/* Countdown */}
          <motion.span
            key={timeRemaining}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-white"
          >
            {timeRemaining}
          </motion.span>
        </motion.div>
      </div>

      {/* Instruction Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        <p className="text-lg text-gray-700">
          {phase === 'inhale' && 'Inspire lentamente pelo nariz'}
          {phase === 'hold' && 'Segure o ar nos pulmões'}
          {phase === 'exhale' && 'Expire suavemente pela boca'}
          {phase === 'pause' && 'Pause e relaxe'}
        </p>
      </motion.div>
    </div>
  );
}
