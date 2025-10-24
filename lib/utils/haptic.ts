'use client';

/**
 * Haptic Feedback Utilities
 * Fornece feedback tátil em dispositivos compatíveis
 */

export type HapticIntensity = 'light' | 'medium' | 'heavy';
export type HapticPattern = 'success' | 'warning' | 'error' | 'selection';

// Padrões de vibração (em milissegundos)
const VIBRATION_PATTERNS: Record<HapticIntensity | HapticPattern, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 10],
  warning: [20, 100, 20],
  error: [30, 100, 30, 100, 30],
  selection: 10,
};

/**
 * Verifica se o dispositivo suporta vibração
 */
export function isVibrationSupported(): boolean {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
}

/**
 * Executa vibração simples
 * @param intensity - Intensidade da vibração
 */
export function vibrate(intensity: HapticIntensity = 'light'): void {
  if (!isVibrationSupported()) return;

  try {
    const pattern = VIBRATION_PATTERNS[intensity];
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}

/**
 * Executa padrão de vibração
 * @param pattern - Padrão de vibração
 */
export function vibratePattern(pattern: HapticPattern): void {
  if (!isVibrationSupported()) return;

  try {
    const vibrationPattern = VIBRATION_PATTERNS[pattern];
    navigator.vibrate(vibrationPattern);
  } catch (error) {
    console.warn('Haptic feedback pattern failed:', error);
  }
}

/**
 * Executa vibração customizada
 * @param pattern - Array de números ou número único
 */
export function vibrateCustom(pattern: number | number[]): void {
  if (!isVibrationSupported()) return;

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Custom haptic feedback failed:', error);
  }
}

/**
 * Para toda vibração em andamento
 */
export function cancelVibration(): void {
  if (!isVibrationSupported()) return;

  try {
    navigator.vibrate(0);
  } catch (error) {
    console.warn('Cancel vibration failed:', error);
  }
}

/**
 * Feedback tátil para ações de sucesso
 */
export function hapticSuccess(): void {
  vibratePattern('success');
}

/**
 * Feedback tátil para ações de erro
 */
export function hapticError(): void {
  vibratePattern('error');
}

/**
 * Feedback tátil para avisos
 */
export function hapticWarning(): void {
  vibratePattern('warning');
}

/**
 * Feedback tátil para seleção/tap
 */
export function hapticSelection(): void {
  vibrate('light');
}

/**
 * Feedback tátil para navegação
 */
export function hapticImpact(intensity: HapticIntensity = 'medium'): void {
  vibrate(intensity);
}
