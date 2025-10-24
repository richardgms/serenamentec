'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { useUIStore } from '@/lib/store/uiStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Play, FloppyDisk, CircleNotch } from '@/lib/constants/icons';
import { calculateTotalCycleDuration } from '@/lib/utils/breathingPatterns';

const PHASE_LABELS = {
  inhale: { label: 'Inspire', emoji: '🫁', color: 'blue' },
  hold: { label: 'Segure', emoji: '⏸️', color: 'yellow' },
  exhale: { label: 'Expire', emoji: '💨', color: 'green' },
  pause: { label: 'Pausa', emoji: '⏳', color: 'gray' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CustomBreathingPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [times, setTimes] = useState({
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 0,
  });

  const [previewPhase, setPreviewPhase] = useState<keyof typeof times>('inhale');

  useEffect(() => {
    setPageTitle('Respiração Personalizada');
    setShowBackButton(true);

    // Load existing custom pattern if available
    fetch('/api/breathing/custom')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.customBreathing) {
          setTimes({
            inhale: data.customBreathing.inhaleTime,
            hold: data.customBreathing.holdTime,
            exhale: data.customBreathing.exhaleTime,
            pause: data.customBreathing.pauseTime || 0,
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // Preview animation cycle
    const phases: Array<keyof typeof times> = ['inhale', 'hold', 'exhale'];
    if (times.pause > 0) phases.push('pause');

    let currentPhaseIndex = 0;
    const interval = setInterval(() => {
      setPreviewPhase(phases[currentPhaseIndex]);
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [setPageTitle, setShowBackButton, times.pause]);

  const handleTimeChange = (phase: keyof typeof times, value: number) => {
    setTimes((prev) => ({ ...prev, [phase]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch('/api/breathing/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(times),
      });

      if (!response.ok) {
        throw new Error('Failed to save custom pattern');
      }

      showToast('Padrão personalizado salvo!', 'success');

      // Wait a bit then navigate to session
      setTimeout(() => {
        router.push('/breathe/session?pattern=CUSTOM');
      }, 1000);
    } catch (error) {
      console.error('Error saving custom pattern:', error);
      showToast('Erro ao salvar padrão', 'error');
      setIsSaving(false);
    }
  };

  const handleStartDirect = () => {
    // Save and start immediately
    handleSave();
  };

  const cycleDuration = calculateTotalCycleDuration(times);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface-main)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-main)] pb-20">
      <Header />

      <main>
      <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Respiração', href: '/breathe' },
            { label: 'Personalizar' },
          ]}
        />

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Configure Seu Padrão
            </h1>
            <p className="text-sm text-text-secondary">
              Ajuste os tempos de cada fase da respiração
            </p>
          </motion.div>

          {/* Preview Circle */}
          <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex flex-col items-center justify-center py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewPhase}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <span className="text-6xl mb-4 block">
                    {PHASE_LABELS[previewPhase].emoji}
                  </span>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {PHASE_LABELS[previewPhase].label}
                  </h3>
                  <p className="text-3xl font-bold text-primary mt-2">
                    {times[previewPhase]}s
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 text-center">
                <p className="text-sm text-text-secondary">
                  Duração do ciclo: <strong>{cycleDuration}s</strong>
                </p>
              </div>
            </div>
          </Card>
          </motion.div>

          {/* Sliders */}
          <motion.div variants={itemVariants} className="space-y-6">
          {Object.entries(times).map(([phase, value]) => {
            const phaseKey = phase as keyof typeof times;
            const phaseInfo = PHASE_LABELS[phaseKey];

            // Skip pause if it's 0 and we're displaying it as optional
            if (phaseKey === 'pause' && value === 0) {
              return null;
            }

            return (
              <Card key={phase}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{phaseInfo.emoji}</span>
                    <h4 className="font-semibold text-text-primary">
                      {phaseInfo.label}
                    </h4>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {value}s
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={(e) =>
                    handleTimeChange(phaseKey, parseInt(e.target.value))
                  }
                  className={`
                    w-full h-2 rounded-full appearance-none cursor-pointer
                    bg-${phaseInfo.color}-100
                  `}
                  style={{
                    accentColor: `var(--${phaseInfo.color}-500)`,
                  }}
                />

                <div className="flex justify-between text-xs text-text-tertiary mt-1">
                  <span>1s</span>
                  <span>10s</span>
                </div>
              </Card>
            );
          })}

          {/* Add Pause Toggle */}
          {times.pause === 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleTimeChange('pause', 4)}
            >
              + Adicionar Pausa
            </Button>
          )}

          {times.pause > 0 && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => handleTimeChange('pause', 0)}
            >
              Remover Pausa
            </Button>
          )}
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--surface-main)] border-t border-[var(--border-subtle)] p-4">
          <div className="mobile-container flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <OptimizedIcon icon={CircleNotch} size={20} weight="bold" className="mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <OptimizedIcon icon={FloppyDisk} size={20} weight="duotone" className="mr-2" />
                  Salvar
                </>
              )}
            </Button>

            <Button
              variant="primary"
              className="flex-1"
              onClick={handleStartDirect}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <OptimizedIcon icon={CircleNotch} size={20} weight="bold" className="mr-2 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  <OptimizedIcon icon={Play} size={20} weight="duotone" className="mr-2" />
                  Começar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
