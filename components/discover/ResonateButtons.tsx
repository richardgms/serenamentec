'use client';

import { motion } from 'framer-motion';
import {
  getResonateLabel,
  getResonateColor,
  getResonateEmoji,
  type ResonateAnswer,
} from '@/lib/utils/topicHelpers';

interface ResonateButtonsProps {
  selected?: ResonateAnswer;
  onSelect: (answer: ResonateAnswer) => void;
  disabled?: boolean;
}

const options: ResonateAnswer[] = ['YES', 'MAYBE', 'NO'];

export function ResonateButtons({
  selected,
  onSelect,
  disabled = false,
}: ResonateButtonsProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Isso ressoa com você?
      </p>

      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          const label = getResonateLabel(option);
          const emoji = getResonateEmoji(option);

          return (
            <motion.button
              key={option}
              onClick={() => onSelect(option)}
              disabled={disabled}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              className={`
                py-3 px-2 rounded-lg font-medium text-sm
                transition-all tap-highlight-none
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isSelected
                    ? getResonateColor(option)
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{emoji}</span>
                <span className="leading-tight">{label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
