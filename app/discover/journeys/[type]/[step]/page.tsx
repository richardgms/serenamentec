'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, CaretLeft, CaretRight, Sparkle } from '@/lib/constants/icons';
import { Card } from '@/components/ui/Card';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Spinner } from '@/components/ui/Spinner';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import {
  getJourneyInfo,
  formatStepNumber,
  type JourneyType,
} from '@/lib/utils/journeyHelpers';

interface JourneyContent {
  journeyType: JourneyType;
  step: number;
  title: string;
  content: string;
  reflection?: string | null;
}

interface JourneyProgress {
  journeyType: JourneyType;
  currentStep: number;
  completedSteps: number[];
  stepNotes: Record<string, string>;
  completed: boolean;
}

export default function JourneyStepPage() {
  const params = useParams();
  const router = useRouter();
  const journeyType = params.type as JourneyType;
  const currentStep = parseInt(params.step as string, 10);

  const [content, setContent] = useState<JourneyContent | null>(null);
  const [progress, setProgress] = useState<JourneyProgress | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const journeyInfo = getJourneyInfo(journeyType);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch step content
        const contentResponse = await fetch(
          `/api/journeys/content?type=${journeyType}&step=${currentStep}`
        );
        if (!contentResponse.ok) {
          throw new Error('Erro ao carregar conteúdo da etapa');
        }
        const contentData = await contentResponse.json();
        setContent(contentData.content);

        // Fetch user progress
        const progressResponse = await fetch(
          `/api/journeys/progress?journeyType=${journeyType}`
        );
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          if (progressData.progress) {
            setProgress(progressData.progress);
            setIsStepCompleted(
              progressData.progress.completedSteps.includes(currentStep)
            );
            // Load saved notes for this step
            const savedNotes = progressData.progress.stepNotes?.[currentStep.toString()];
            if (savedNotes) {
              setNotes(savedNotes);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching journey data:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [journeyType, currentStep]);

  const handleSaveAndMarkComplete = async () => {
    try {
      setSaving(true);

      const response = await fetch('/api/journeys/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          journeyType,
          step: currentStep,
          notes: notes.trim() || undefined,
          markCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar progresso');
      }

      const data = await response.json();
      setProgress(data.progress);
      setIsStepCompleted(true);

      // Check if journey is now completed
      if (data.progress.completed && !progress?.completed) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      }
    } catch (err) {
      console.error('Error saving progress:', err);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setSaving(true);

      const response = await fetch('/api/journeys/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          journeyType,
          step: currentStep,
          notes: notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar notas');
      }

      const data = await response.json();
      setProgress(data.progress);
    } catch (err) {
      console.error('Error saving notes:', err);
      alert('Erro ao salvar notas. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/discover/journeys/${journeyType}/${currentStep - 1}`);
    }
  };

  const handleNext = () => {
    if (currentStep < journeyInfo.totalSteps) {
      router.push(`/discover/journeys/${journeyType}/${currentStep + 1}`);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Carregando etapa...
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !content) {
    return (
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p style={{ color: 'var(--error)' }} className="mb-4 font-medium">
              {error || 'Conteúdo não encontrado'}
            </p>
            <button
              onClick={() => router.push('/discover/journeys')}
              style={{ color: 'var(--primary)' }}
              className="font-medium hover:opacity-80 transition-opacity"
            >
              Voltar para jornadas
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

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

  return (
    <main>
    <PageTransition>
      <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Descobrir', href: '/discover' },
            { label: 'Jornadas', href: '/discover/journeys' },
            { label: journeyInfo.title, href: '#' },
          ]}
        />

        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3"
        >
          <button
            onClick={() => router.push('/discover/journeys')}
            className="tap-highlight-none"
            aria-label="Voltar"
          >
            <OptimizedIcon icon={ArrowLeft} size={24} color="var(--text-primary)" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{journeyInfo.emoji}</span>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {journeyInfo.title}
              </h1>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {formatStepNumber(currentStep, journeyInfo.totalSteps)}
            </p>
          </div>
          {isStepCompleted && (
            <div
              className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success)'
              }}
            >
              <OptimizedIcon icon={Check} size={12} />
              Concluída
            </div>
          )}
        </motion.div>

        {/* Journey Completed Banner */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  color: 'white'
                }}
              >
                <div className="flex items-center gap-3">
                  <OptimizedIcon icon={Sparkle} size={24} color="white" />
                  <div>
                    <h3 className="font-bold">Parabéns!</h3>
                    <p className="text-sm">Você completou toda a jornada!</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className={`bg-gradient-to-br ${journeyInfo.gradient}`}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {content.title}
            </h2>

            {/* Content paragraphs */}
            <div className="prose prose-sm max-w-none">
              {content.content.split('\n\n').map((section, idx) => {
                // Check if section has bold headers (starts with **)
                if (section.includes('**')) {
                  const parts = section.split('\n');
                  return (
                    <div key={idx} className="mb-4">
                      {parts.map((line, lineIdx) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          // Bold header
                          return (
                            <h4 key={lineIdx} className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                              {line.replace(/\*\*/g, '')}
                            </h4>
                          );
                        } else if (line.startsWith('•')) {
                          // Bullet point
                          return (
                            <p key={lineIdx} className="ml-4 mb-1" style={{ color: 'var(--text-secondary)' }}>
                              {line}
                            </p>
                          );
                        } else if (line.trim()) {
                          // Regular line
                          return (
                            <p key={lineIdx} className="mb-2" style={{ color: 'var(--text-secondary)' }}>
                              {line}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                } else {
                  // Regular paragraph
                  return (
                    <p key={idx} className="mb-3 last:mb-0" style={{ color: 'var(--text-secondary)' }}>
                      {section}
                    </p>
                  );
                }
              })}
            </div>

            {/* Reflection Question */}
            {content.reflection && (
              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderLeft: '4px solid var(--primary)'
                }}
              >
                <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  💭 Reflita:
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {content.reflection}
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Notes */}
        <Card>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Suas anotações desta etapa (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui suas reflexões sobre esta etapa..."
            className="w-full min-h-[100px] p-3 rounded-lg resize-none transition-all"
            style={{
              border: '2px solid var(--border-light)',
              backgroundColor: 'var(--surface-card)',
              color: 'var(--text-primary)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            disabled={saving}
          />
          {notes.trim() && !isStepCompleted && (
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-2 text-sm hover:underline disabled:opacity-50"
              style={{ color: 'var(--primary)' }}
            >
              {saving ? 'Salvando...' : 'Salvar notas'}
            </button>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Mark as Complete Button */}
          {!isStepCompleted && (
            <button
              onClick={handleSaveAndMarkComplete}
              disabled={saving}
              className="w-full py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {saving ? (
                <>
                  <Spinner size="sm" className="border-white" />
                  Salvando...
                </>
              ) : (
                <>
                  <OptimizedIcon icon={Check} size={20} color="white" />
                  Marcar como concluída
                </>
              )}
            </button>
          )}

          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 transition-all"
              style={{
                backgroundColor: 'var(--surface-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)'
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--surface-main)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-card)'}
            >
              <OptimizedIcon icon={CaretLeft} size={16} color="var(--text-primary)" />
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === journeyInfo.totalSteps}
              className="py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 transition-all"
              style={{
                backgroundColor: 'var(--surface-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)'
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--surface-main)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-card)'}
            >
              Próxima
              <OptimizedIcon icon={CaretRight} size={16} color="var(--text-primary)" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {progress?.completedSteps.length || 0} de {journeyInfo.totalSteps} etapas concluídas
          </p>
        </div>
      </div>
    </PageTransition>
    </main>
  );
}
