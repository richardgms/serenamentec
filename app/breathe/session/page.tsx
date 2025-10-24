'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { useUIStore } from '@/lib/store/uiStore';
import { useUserStore } from '@/lib/store/userStore';
import { Button } from '@/components/ui/Button';
import { BreathingCircle } from '@/components/breathe/BreathingCircle';
import {
  breathingPatterns,
  BreathingPhase,
  calculateTotalCycleDuration,
} from '@/lib/utils/breathingPatterns';
import { vibratePattern } from '@/lib/utils/vibration';
import { Spinner } from '@/components/Loading';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Pause, Play, ArrowLeft } from '@/lib/constants/icons';

type SessionState = 'config' | 'running' | 'paused' | 'completed';

export default function BreathingSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPageTitle, setShowBackButton } = useUIStore();
  const { preferences } = useUserStore();

  const [sessionState, setSessionState] = useState<SessionState>('config');
  const [cyclesTarget, setCyclesTarget] = useState(5);
  const [cyclesCompleted, setcyclesCompleted] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const [patternPhases, setPatternPhases] = useState({
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const patternType = searchParams.get('pattern') || 'ANXIETY_478';

  // Load pattern
  useEffect(() => {
    setPageTitle('Sessão de Respiração');
    setShowBackButton(false);

    const loadPattern = async () => {
      if (patternType === 'CUSTOM') {
        // Load custom pattern
        try {
          const res = await fetch('/api/breathing/custom');
          if (res.ok) {
            const data = await res.json();
            setPatternPhases({
              inhale: data.customBreathing.inhaleTime,
              hold: data.customBreathing.holdTime,
              exhale: data.customBreathing.exhaleTime,
              pause: data.customBreathing.pauseTime || 0,
            });
          }
        } catch (error) {
          console.error('Error loading custom pattern:', error);
        }
      } else {
        // Load preset pattern
        const pattern = Object.values(breathingPatterns).find(
          (p) => p.type === patternType
        );
        if (pattern) {
          setPatternPhases({
            ...pattern.phases,
            pause: pattern.phases.pause || 0,
          });
        }
      }
      setIsLoading(false);
    };

    loadPattern();
  }, [patternType, setPageTitle, setShowBackButton]);

  // Get phases array
  const phases: BreathingPhase[] = ['inhale', 'hold', 'exhale'];
  if (patternPhases.pause && patternPhases.pause > 0) {
    phases.push('pause');
  }

  // Start session
  const startSession = useCallback(() => {
    setSessionState('running');
    setSessionStartTime(new Date());
    setcyclesCompleted(0);
    setCurrentPhase('inhale');
    setTimeRemaining(patternPhases.inhale);
  }, [patternPhases.inhale]);

  // Run breathing cycle
  useEffect(() => {
    if (sessionState !== 'running') return;

    let phaseIndex = phases.indexOf(currentPhase);
    let remainingTime = timeRemaining;

    timerRef.current = setInterval(() => {
      remainingTime--;
      setTimeRemaining(remainingTime);

      if (remainingTime <= 0) {
        // Move to next phase
        phaseIndex = (phaseIndex + 1) % phases.length;
        const nextPhase = phases[phaseIndex];

        // Vibrate on transition
        if (preferences.vibrationEnabled) {
          vibratePattern('breathingTransition');
        }

        setCurrentPhase(nextPhase);
        setTimeRemaining(patternPhases[nextPhase] || 0);

        // If we completed a full cycle
        if (phaseIndex === 0) {
          const newCyclesCompleted = cyclesCompleted + 1;
          setcyclesCompleted(newCyclesCompleted);

          // Check if session is complete
          if (newCyclesCompleted >= cyclesTarget) {
            setSessionState('completed');
            if (preferences.vibrationEnabled) {
              vibratePattern('sessionComplete');
            }
          }
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    sessionState,
    currentPhase,
    timeRemaining,
    phases,
    cyclesCompleted,
    cyclesTarget,
    patternPhases,
    preferences.vibrationEnabled,
  ]);

  const handlePause = () => {
    setSessionState('paused');
  };

  const handleResume = () => {
    setSessionState('running');
  };

  const handleStop = async () => {
    // Save interrupted session
    if (sessionStartTime) {
      const duration = Math.floor(
        (new Date().getTime() - sessionStartTime.getTime()) / 1000
      );

      await fetch('/api/breathing/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patternType,
          cyclesTarget,
          cyclesCompleted,
          totalDuration: duration,
          completed: false,
        }),
      });
    }

    router.push('/breathe');
  };

  const handleComplete = async () => {
    // Save completed session
    if (sessionStartTime) {
      const duration = Math.floor(
        (new Date().getTime() - sessionStartTime.getTime()) / 1000
      );

      await fetch('/api/breathing/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patternType,
          cyclesTarget,
          cyclesCompleted,
          totalDuration: duration,
          completed: true,
        }),
      });
    }

    router.push('/breathe');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface-main)] flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-[428px] mx-auto px-4 w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {/* Config Screen */}
          {sessionState === 'config' && (
            <motion.div
              key="config"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-sm mx-auto py-12 flex-1 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Quantos ciclos você quer fazer?
              </h2>

              <div className="mb-8">
                <div className="text-6xl font-bold text-primary mb-4">
                  {cyclesTarget}
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={cyclesTarget}
                  onChange={(e) => setCyclesTarget(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-tertiary mt-2">
                  <span>3</span>
                  <span>10</span>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-8">
                Duração aproximada:{' '}
                <strong>
                  {Math.ceil(
                    (calculateTotalCycleDuration(patternPhases) * cyclesTarget) / 60
                  )}{' '}
                  minutos
                </strong>
              </p>

              <Button variant="primary" className="w-full" onClick={startSession}>
                Começar Sessão
              </Button>
            </motion.div>
          )}

          {/* Running/Paused Screen */}
          {(sessionState === 'running' || sessionState === 'paused') && (
            <motion.div
              key="session"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center py-8"
            >
              {/* Cycle Counter */}
              <div className="text-center mb-8">
                <p className="text-sm text-text-secondary">
                  Ciclo {cyclesCompleted + 1} de {cyclesTarget}
                </p>
                <div className="flex gap-1 justify-center mt-2">
                  {Array.from({ length: cyclesTarget }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full ${
                        i < cyclesCompleted
                          ? 'bg-primary'
                          : i === cyclesCompleted
                          ? 'bg-primary/50'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Breathing Circle */}
              {sessionState === 'running' && (
                <div className="flex-1 flex items-center justify-center py-8 px-4">
                  <BreathingCircle
                    phase={currentPhase}
                    timeRemaining={timeRemaining}
                    totalTime={patternPhases[currentPhase] || 0}
                  />
                </div>
              )}

              {sessionState === 'paused' && (
                <div className="text-center flex-1 flex flex-col items-center justify-center py-20">
                  <OptimizedIcon icon={Pause} size={64} weight="duotone" className="text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary">
                    Pausado
                  </h3>
                  <p className="text-sm text-text-secondary mt-2">
                    Clique em continuar quando estiver pronto
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3 mt-8 pb-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleStop}
                >
                  <OptimizedIcon icon={ArrowLeft} size={20} />
                  Sair
                </Button>

                {sessionState === 'paused' ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={handleResume}
                  >
                    <OptimizedIcon icon={Play} size={20} weight="fill" />
                    Continuar
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={handlePause}
                  >
                    <OptimizedIcon icon={Pause} size={20} weight="fill" />
                    Pausar
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Completed Screen */}
          {sessionState === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-sm mx-auto flex-1 flex flex-col justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <span className="text-8xl mb-6 block">✨</span>
              </motion.div>

              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Parabéns!
              </h2>

              <p className="text-text-secondary mb-8">
                Você completou {cyclesCompleted} ciclos de respiração
              </p>

              <div className="bg-[var(--surface-card)] rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {cyclesCompleted}
                    </p>
                    <p className="text-sm text-text-secondary">Ciclos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {Math.ceil(
                        (calculateTotalCycleDuration(patternPhases) *
                          cyclesCompleted) /
                          60
                      )}
                    </p>
                    <p className="text-sm text-text-secondary">Minutos</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full" onClick={handleComplete}>
                Finalizar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
