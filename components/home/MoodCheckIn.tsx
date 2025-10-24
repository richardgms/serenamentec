'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store/userStore';
import { useHaptic } from '@/lib/hooks/useHaptic';
import { colors } from '@/docs/visual/design-tokens';

type MoodType = 'HAPPY' | 'NEUTRAL' | 'ANXIOUS' | 'SAD' | 'ANGRY';

const moods = [
  { type: 'ANGRY' as MoodType, emoji: '😢', value: 1, label: 'Muito mal', color: colors.mood.veryBad },
  { type: 'SAD' as MoodType, emoji: '😕', value: 2, label: 'Mal', color: colors.mood.bad },
  { type: 'NEUTRAL' as MoodType, emoji: '😐', value: 3, label: 'Neutro', color: colors.mood.neutral },
  { type: 'ANXIOUS' as MoodType, emoji: '🙂', value: 4, label: 'Bom', color: colors.mood.good },
  { type: 'HAPPY' as MoodType, emoji: '😊', value: 5, label: 'Muito bom', color: colors.mood.veryGood },
];

export function MoodCheckIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { hasCheckedMoodToday, setLastMoodCheckIn } = useUserStore();
  const { impact } = useHaptic();

  // Don't show if user already checked mood today
  if (hasCheckedMoodToday()) {
    return null;
  }

  const handleMoodSelect = async (mood: MoodType) => {
    setIsSubmitting(true);
    setSelectedMood(mood);
    impact('medium');

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
          className="mb-6 rounded-2xl bg-[var(--surface-card)] p-6 card-shadow"
        >
          <h3 className="mb-6 text-center text-lg font-semibold text-text-primary">
            Como você está hoje?
          </h3>

          <div className="flex items-center justify-center gap-3">
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
                className="relative w-12 h-12 flex items-center justify-center text-[48px] leading-none rounded-full transition-all duration-150 tap-highlight-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: selectedMood === mood.type
                    ? `0 0 0 4px ${mood.color}40`
                    : 'none',
                }}
                aria-label={mood.label}
              >
                <motion.span
                  className="drop-shadow-sm"
                  style={{
                    filter: selectedMood === mood.type 
                      ? `drop-shadow(0 0 8px ${mood.color}40)` 
                      : 'none',
                  }}
                  animate={{
                    scale: selectedMood === mood.type ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {mood.emoji}
                </motion.span>
              </motion.button>
            ))}
          </div>

          {selectedMood && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-text-secondary text-center"
            >
              {moods.find((m) => m.type === selectedMood)?.label}
            </motion.p>
          )}
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
