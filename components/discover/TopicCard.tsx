'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Check } from 'lucide-react';
import { getTopicInfo, type TopicType } from '@/lib/utils/topicHelpers';

interface TopicCardProps {
  topicType: TopicType;
  explored?: boolean;
  onClick: () => void;
}

export function TopicCard({ topicType, explored = false, onClick }: TopicCardProps) {
  const info = getTopicInfo(topicType);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        onClick={onClick}
        className={`
          relative cursor-pointer hover:shadow-lg transition-shadow
          bg-gradient-to-br ${info.gradient}
          h-32 flex flex-col items-center justify-center text-center p-3
        `}
      >
        {/* Explored Badge */}
        {explored && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}

        {/* Emoji */}
        <span className="text-3xl mb-2">{info.emoji}</span>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {info.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {info.subtitle}
        </p>
      </Card>
    </motion.div>
  );
}
