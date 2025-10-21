'use client';

/**
 * Vibration API helper
 * Provides safe vibration support for mobile devices
 */

export const isVibrationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
};

export const vibrate = (pattern: number | number[]): boolean => {
  if (!isVibrationSupported()) {
    return false;
  }

  try {
    return navigator.vibrate(pattern);
  } catch (error) {
    console.error('Vibration failed:', error);
    return false;
  }
};

export const stopVibration = (): boolean => {
  if (!isVibrationSupported()) {
    return false;
  }

  return navigator.vibrate(0);
};

// Predefined vibration patterns
export const vibrationPatterns = {
  // Single short pulse
  tap: 50,

  // Medium pulse
  click: 100,

  // Longer pulse
  press: 200,

  // Double tap
  doubleTap: [50, 100, 50],

  // Success pattern
  success: [100, 50, 100],

  // Error pattern
  error: [200, 100, 200, 100, 200],

  // Breathing phase transition (gentle)
  breathingTransition: 150,

  // Session complete (celebratory)
  sessionComplete: [100, 50, 100, 50, 100, 50, 200],
};

export type VibrationPattern = keyof typeof vibrationPatterns;

export const vibratePattern = (patternName: VibrationPattern): boolean => {
  const pattern = vibrationPatterns[patternName];
  return vibrate(pattern);
};
