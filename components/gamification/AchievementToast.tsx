'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import type { AchievementNotification } from '@/lib/store/achievementStore';

interface AchievementToastProps {
  achievement: AchievementNotification;
  onClose: () => void;
  soundEnabled?: boolean;
}

export function AchievementToast({
  achievement,
  onClose,
  soundEnabled = true,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Play sound if enabled
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/achievement.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignore if sound can't play
        });
      } catch {
        // Ignore sound errors
      }
    }

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [soundEnabled]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation
  };

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
            damping: 25,
          }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          <div
            className="relative overflow-hidden rounded-lg shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${achievement.color}20 0%, ${achievement.color}10 100%)`,
              border: `2px solid ${achievement.color}`,
            }}
          >
            {/* Sparkle animation background */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="h-6 w-6" style={{ color: achievement.color }} />
              </motion.div>
            </div>

            <div className="relative p-4">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 hover:bg-black/5 rounded-full transition-colors tap-highlight-none"
                aria-label="Fechar"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>

              <div className="flex items-start gap-3">
                {/* Emoji */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="text-4xl"
                >
                  {achievement.emoji}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4" style={{ color: achievement.color }} />
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Conquista Desbloqueada!
                    </p>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-700">{achievement.description}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
