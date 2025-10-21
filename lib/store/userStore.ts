'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
  dailyReflectionTime?: string;
  reminderEnabled: boolean;
}

interface UserStore {
  // User preferences (cached)
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;

  // Last mood check-in timestamp
  lastMoodCheckIn: string | null;
  setLastMoodCheckIn: (timestamp: string) => void;

  // Helper: check if user already checked mood today
  hasCheckedMoodToday: () => boolean;

  // Reset store
  reset: () => void;
}

const defaultPreferences: UserPreferences = {
  vibrationEnabled: true,
  soundEnabled: true,
  darkMode: false,
  reminderEnabled: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      preferences: defaultPreferences,
      lastMoodCheckIn: null,

      // Actions
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      setLastMoodCheckIn: (timestamp) =>
        set({ lastMoodCheckIn: timestamp }),

      hasCheckedMoodToday: () => {
        const lastCheckIn = get().lastMoodCheckIn;
        if (!lastCheckIn) return false;

        const lastDate = new Date(lastCheckIn);
        const today = new Date();

        return (
          lastDate.getDate() === today.getDate() &&
          lastDate.getMonth() === today.getMonth() &&
          lastDate.getFullYear() === today.getFullYear()
        );
      },

      reset: () =>
        set({
          preferences: defaultPreferences,
          lastMoodCheckIn: null,
        }),
    }),
    {
      name: 'user-storage', // localStorage key
      skipHydration: true, // Prevent SSR hydration issues
      partialize: (state) => ({
        preferences: state.preferences,
        lastMoodCheckIn: state.lastMoodCheckIn,
      }),
    }
  )
);
