'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store/userStore';
import { Smile, Meh, Frown, Angry, Annoyed } from 'lucide-react';

type MoodType = 'HAPPY' | 'NEUTRAL' | 'ANXIOUS' | 'SAD' | 'ANGRY';

const moods = [
  {
    type: 'HAPPY' as MoodType,
    Icon: Smile,
    emoji: '😊',
    label: 'Feliz',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    hoverBg: 'hover:bg-green-100',
  },
  {
    type: 'NEUTRAL' as MoodType,
    Icon: Meh,
    emoji: '😐',
    label: 'Neutro',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    hoverBg: 'hover:bg-gray-100',
  },
  {
    type: 'ANXIOUS' as MoodType,
    Icon: Annoyed,
    emoji: '😰',
    label: 'Ansioso',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    hoverBg: 'hover:bg-yellow-100',
  },
  {
    type: 'SAD' as MoodType,
    Icon: Frown,
    emoji: '😔',
    label: 'Triste',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-100',
  },
  {
    type: 'ANGRY' as MoodType,
    Icon: Angry,
    emoji: '😤',
    label: 'Irritado',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    hoverBg: 'hover:bg-red-100',
  },
];

export function MoodCheckIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { hasCheckedMoodToday, setLastMoodCheckIn } = useUserStore();

  // Don't show if user already checked mood today
  if (hasCheckedMoodToday()) {
    return null;
  }

  const handleMoodSelect = async (mood: MoodType) => {
    setIsSubmitting(true);
    setSelectedMood(mood);

    try {
      // Save mood to API
      const response = await fetch('/api/mood/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to save mood');
      }

      // Update local store
      setLastMoodCheckIn(new Date().toISOString());

      // Show feedback animation
      setShowFeedback(true);

      // Hide widget after 2 seconds
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving mood:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showFeedback ? (
        <motion.div
          key="mood-selector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="mb-6 rounded-2xl bg-surface p-6 card-shadow"
        >
          <h3 className="mb-4 text-center text-base font-semibold text-gray-800">
            Como você está se sentindo hoje?
          </h3>

          <div className="flex items-center justify-between gap-2">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood.type)}
                disabled={isSubmitting}
                className={`
                  flex flex-col items-center gap-2 rounded-xl p-3
                  ${mood.bgColor} ${mood.hoverBg}
                  transition-smooth tap-highlight-none
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex-1 min-w-0
                `}
                aria-label={mood.label}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className={`text-xs font-medium ${mood.color}`}>
                  {mood.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="mood-feedback"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="mb-6 rounded-2xl bg-primary p-6 card-shadow text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-5xl mb-3 block">
              {moods.find((m) => m.type === selectedMood)?.emoji}
            </span>
          </motion.div>
          <p className="text-white font-semibold text-lg">
            Obrigado por compartilhar!
          </p>
          <p className="text-white/90 text-sm mt-1">
            Estamos aqui para você 💚
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
