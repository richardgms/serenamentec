'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Fire, Trophy, CircleNotch } from '@/lib/constants/icons';
import { useUIStore } from '@/lib/store/uiStore';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date;
  restDayUsed: boolean;
  streakText: string;
  emoji: string;
  color: string;
}

export function StreakWidget() {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const { showToast } = useUIStore();

  // Fetch streak data on mount
  useEffect(() => {
    fetchStreakData();
  }, []);

  const fetchStreakData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/streaks');

      if (!response.ok) {
        throw new Error('Failed to fetch streak data');
      }

      const data = await response.json();
      setStreakData({
        ...data,
        lastCheckIn: new Date(data.lastCheckIn),
      });
    } catch (error) {
      console.error('Error fetching streak:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (checkingIn || !streakData) return;

    try {
      setCheckingIn(true);
      const response = await fetch('/api/streaks', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to check in');
      }

      const data = await response.json();

      // Update local state
      setStreakData({
        currentStreak: data.currentStreak,
        longestStreak: data.longestStreak,
        lastCheckIn: new Date(),
        restDayUsed: data.usedRestDay,
        streakText: `${data.currentStreak} ${data.currentStreak === 1 ? 'dia' : 'dias'}`,
        emoji: data.emoji,
        color: data.color,
      });

      // Show toast with message
      showToast(data.message, 'success');
    } catch (error) {
      console.error('Error checking in:', error);
      showToast('Erro ao fazer check-in', 'error');
    } finally {
      setCheckingIn(false);
    }
  };

  // Check if can check in (>24h since last check-in)
  const canCheckIn = () => {
    if (!streakData) return false;
    const hoursSinceLastCheckIn =
      (new Date().getTime() - streakData.lastCheckIn.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastCheckIn >= 24;
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <div className="flex items-center justify-center py-4">
          <OptimizedIcon icon={CircleNotch} size={20} weight="bold" className="animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (!streakData) return null;

  const shouldCheckIn = canCheckIn();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-4"
      >
        <Card
          className="relative overflow-hidden border-2"
          style={{
            borderColor: streakData.color,
            background: `linear-gradient(135deg, ${streakData.color}15 0%, ${streakData.color}05 100%)`,
          }}
        >
          <div className="flex items-center justify-between">
            {/* Left side - Streak info */}
            <div className="flex items-center gap-3 flex-1">
              {/* Animated emoji */}
              <motion.div
                animate={{
                  scale: shouldCheckIn ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: shouldCheckIn ? Infinity : 0,
                  repeatDelay: 1,
                }}
                className="text-4xl"
              >
                {streakData.emoji}
              </motion.div>

              {/* Streak text */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <OptimizedIcon icon={Fire} size={16} weight="duotone" style={{ color: streakData.color }} />
                  <p className="text-sm font-medium text-text-secondary">Sequência Atual</p>
                </div>
                <motion.p
                  key={streakData.currentStreak}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-text-primary"
                >
                  {streakData.streakText}
                </motion.p>

                {/* Longest streak */}
                {streakData.longestStreak > streakData.currentStreak && (
                  <div className="flex items-center gap-1 mt-1">
                    <OptimizedIcon icon={Trophy} size={12} weight="bold" className="text-yellow-500" />
                    <p className="text-xs text-text-secondary">
                      Recorde: {streakData.longestStreak} {streakData.longestStreak === 1 ? 'dia' : 'dias'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Check-in button */}
            <div>
              {shouldCheckIn ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckIn}
                  disabled={checkingIn}
                  className="px-4 py-2 rounded-lg font-semibold text-white transition-all tap-highlight-none"
                  style={{
                    backgroundColor: streakData.color,
                    opacity: checkingIn ? 0.7 : 1,
                  }}
                >
                  {checkingIn ? (
                    <OptimizedIcon icon={CircleNotch} size={20} weight="bold" className="animate-spin" />
                  ) : (
                    'Check-in'
                  )}
                </motion.button>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-center">
                  <p className="text-xs font-semibold text-text-tertiary">
                    ✓ Feito hoje!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rest day indicator */}
          {streakData.restDayUsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 pt-3 border-t border-gray-200"
            >
              <p className="text-xs text-text-secondary flex items-center gap-1">
                <span>💙</span>
                Você usou seu dia de descanso. Continue amanhã!
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
