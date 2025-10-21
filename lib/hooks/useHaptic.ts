/**
 * Hook para Haptic Feedback
 * Integra feedback tátil com preferências do usuário
 */

'use client';

import { useCallback, useState, useEffect } from 'react';
import {
  vibrate,
  vibratePattern,
  hapticSuccess,
  hapticError,
  hapticWarning,
  hapticSelection,
  hapticImpact,
  cancelVibration,
  isVibrationSupported,
  type HapticIntensity,
  type HapticPattern,
} from '@/lib/utils/haptic';

// Store de preferências (será integrado com zustand ou context)
// Por enquanto, usamos localStorage
const HAPTIC_ENABLED_KEY = 'serenamente_haptic_enabled';

/**
 * Hook para usar haptic feedback respeitando preferências do usuário
 */
export function useHaptic() {
  // Estados inicializados no cliente para evitar SSR issues
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(true);

  // Inicializa valores no cliente
  useEffect(() => {
    setSupported(isVibrationSupported());

    const stored = localStorage.getItem(HAPTIC_ENABLED_KEY);
    setEnabled(stored === null || stored === 'true');
  }, []);

  // Verifica se haptic está habilitado nas preferências
  const isEnabled = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem(HAPTIC_ENABLED_KEY);
    // Habilitado por padrão
    return stored === null || stored === 'true';
  }, []);

  const triggerVibration = useCallback(
    (intensity: HapticIntensity = 'light') => {
      if (!isEnabled()) return;
      vibrate(intensity);
    },
    [isEnabled]
  );

  const triggerPattern = useCallback(
    (pattern: HapticPattern) => {
      if (!isEnabled()) return;
      vibratePattern(pattern);
    },
    [isEnabled]
  );

  const success = useCallback(() => {
    if (!isEnabled()) return;
    hapticSuccess();
  }, [isEnabled]);

  const error = useCallback(() => {
    if (!isEnabled()) return;
    hapticError();
  }, [isEnabled]);

  const warning = useCallback(() => {
    if (!isEnabled()) return;
    hapticWarning();
  }, [isEnabled]);

  const selection = useCallback(() => {
    if (!isEnabled()) return;
    hapticSelection();
  }, [isEnabled]);

  const impact = useCallback(
    (intensity: HapticIntensity = 'medium') => {
      if (!isEnabled()) return;
      hapticImpact(intensity);
    },
    [isEnabled]
  );

  const cancel = useCallback(() => {
    cancelVibration();
  }, []);

  return {
    vibrate: triggerVibration,
    vibratePattern: triggerPattern,
    success,
    error,
    warning,
    selection,
    impact,
    cancel,
    isSupported: supported, // Agora usa estado ao invés de chamar função
    isEnabled: enabled, // Agora usa estado ao invés de chamar função
  };
}

/**
 * Hook para usar haptic em eventos de botão
 */
export function useButtonHaptic() {
  const haptic = useHaptic();

  const onPress = useCallback(() => {
    haptic.selection();
  }, [haptic]);

  const onSuccess = useCallback(() => {
    haptic.success();
  }, [haptic]);

  const onError = useCallback(() => {
    haptic.error();
  }, [haptic]);

  return {
    onPress,
    onSuccess,
    onError,
  };
}
