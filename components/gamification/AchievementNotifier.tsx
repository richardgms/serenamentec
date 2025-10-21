'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useAchievementStore } from '@/lib/store/achievementStore';
import { AchievementToast } from './AchievementToast';

const POLLING_INTERVAL = 30000; // 30 seconds

interface UnacknowledgedAchievement {
  id: string;
  type: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  unlockedAt: string;
}

/**
 * AchievementNotifier Component
 * Polls for new achievements and displays toast notifications
 */
export function AchievementNotifier() {
  const { user, isLoading } = useUser();
  const {
    achievements,
    isShowing,
    addAchievement,
    removeAchievement,
    setShowing,
  } = useAchievementStore();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);

  /**
   * Fetch unacknowledged achievements
   */
  const fetchUnacknowledgedAchievements = useCallback(async () => {
    // Don't poll if already polling or user not loaded
    if (isPollingRef.current || isLoading || !user) return;

    try {
      isPollingRef.current = true;

      const response = await fetch('/api/achievements');

      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }

      const data = await response.json();

      // Filter unacknowledged achievements
      const unacknowledged: UnacknowledgedAchievement[] = data.unlocked.filter(
        (a: UnacknowledgedAchievement) =>
          data.unlocked.find((u: any) => u.id === a.id && !u.acknowledged)
      );

      // Add new achievements to queue
      unacknowledged.forEach((achievement) => {
        // Check if already in queue
        const alreadyInQueue = achievements.some((a) => a.id === achievement.id);

        if (!alreadyInQueue) {
          addAchievement({
            id: achievement.id,
            type: achievement.type,
            title: achievement.title,
            description: achievement.description,
            emoji: achievement.emoji,
            color: achievement.color,
            unlockedAt: new Date(achievement.unlockedAt),
          });
        }
      });
    } catch (error) {
      console.error('Error fetching unacknowledged achievements:', error);
    } finally {
      isPollingRef.current = false;
    }
  }, [user, isLoading, achievements, addAchievement]);

  /**
   * Acknowledge achievement
   */
  const acknowledgeAchievement = async (achievementId: string) => {
    try {
      const response = await fetch('/api/achievements/acknowledge', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ achievementId }),
      });

      if (!response.ok) {
        throw new Error('Failed to acknowledge achievement');
      }

      // Remove from queue
      removeAchievement(achievementId);
    } catch (error) {
      console.error('Error acknowledging achievement:', error);
    }
  };

  /**
   * Handle toast close
   */
  const handleToastClose = (achievementId: string) => {
    // Acknowledge the achievement
    acknowledgeAchievement(achievementId);

    // Mark as not showing so next can appear
    setShowing(false);
  };

  /**
   * Setup polling
   */
  useEffect(() => {
    // Initial fetch
    fetchUnacknowledgedAchievements();

    // Setup polling interval
    pollingIntervalRef.current = setInterval(() => {
      fetchUnacknowledgedAchievements();
    }, POLLING_INTERVAL);

    // Cleanup
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchUnacknowledgedAchievements]);

  /**
   * Show next achievement in queue
   */
  useEffect(() => {
    // If not currently showing and there are achievements in queue
    if (!isShowing && achievements.length > 0) {
      setShowing(true);
    }
  }, [isShowing, achievements, setShowing]);

  // Don't render anything if user not loaded
  if (isLoading || !user) return null;

  // Render current achievement toast
  const currentAchievement = achievements[0];

  if (!currentAchievement || !isShowing) return null;

  return (
    <AchievementToast
      achievement={currentAchievement}
      onClose={() => handleToastClose(currentAchievement.id)}
      soundEnabled={true}
    />
  );
}
