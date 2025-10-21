'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from './ProgressBar';
import {
  getJourneyInfo,
  getJourneyStatus,
  getStatusLabel,
  getStatusColor,
  type JourneyType,
} from '@/lib/utils/journeyHelpers';

interface JourneyCardProps {
  journeyType: JourneyType;
  completedSteps: number[];
  onClick: () => void;
}

export function JourneyCard({
  journeyType,
  completedSteps,
  onClick,
}: JourneyCardProps) {
  const info = getJourneyInfo(journeyType);
  const status = getJourneyStatus(completedSteps, info.totalSteps);
  const statusLabel = getStatusLabel(status);
  const statusColor = getStatusColor(status);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        onClick={onClick}
        className={`
          cursor-pointer hover:shadow-lg transition-shadow
          bg-gradient-to-br ${info.gradient}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{info.emoji}</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {info.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{info.description}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`
              px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
              ${statusColor}
            `}
          >
            {statusLabel}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <ProgressBar
            current={completedSteps.length}
            total={info.totalSteps}
            size="md"
          />
        </div>

        {/* Continue/Start button hint */}
        <div className="mt-4 text-center">
          <p className="text-sm text-primary font-medium">
            {status === 'not_started' && 'Iniciar jornada →'}
            {status === 'in_progress' && 'Continuar jornada →'}
            {status === 'completed' && 'Revisar jornada ✓'}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
