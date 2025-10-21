'use client';

/**
 * Achievement Store
 * Manages achievement notifications queue
 */

import { create } from 'zustand';

export interface AchievementNotification {
  id: string;
  type: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  unlockedAt: Date;
}

interface AchievementStore {
  // State
  achievements: AchievementNotification[];
  isShowing: boolean;

  // Actions
  addAchievement: (achievement: AchievementNotification) => void;
  removeAchievement: (id: string) => void;
  clearAll: () => void;
  setShowing: (isShowing: boolean) => void;
}

export const useAchievementStore = create<AchievementStore>((set) => ({
  // Initial state
  achievements: [],
  isShowing: false,

  // Actions
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),

  removeAchievement: (id) =>
    set((state) => ({
      achievements: state.achievements.filter((a) => a.id !== id),
    })),

  clearAll: () =>
    set({
      achievements: [],
      isShowing: false,
    }),

  setShowing: (isShowing) => set({ isShowing }),
}));
