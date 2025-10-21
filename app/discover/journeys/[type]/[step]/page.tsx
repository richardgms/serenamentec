'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Check, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
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
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-gray-600">Carregando etapa...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Conteúdo não encontrado'}</p>
          <button
            onClick={() => router.push('/discover/journeys')}
            className="text-primary font-medium"
          >
            Voltar para jornadas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.push('/discover/journeys')}
            className="tap-highlight-none"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{journeyInfo.emoji}</span>
              <h1 className="text-lg font-bold text-gray-800">
                {journeyInfo.title}
              </h1>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {formatStepNumber(currentStep, journeyInfo.totalSteps)}
            </p>
          </div>
          {isStepCompleted && (
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Check className="h-3 w-3" />
              Concluída
            </div>
          )}
        </div>

        {/* Journey Completed Banner */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <Card className="bg-gradient-to-r from-primary to-secondary text-white">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
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
          <Card className={`bg-gradient-to-br ${journeyInfo.gradient} mb-4`}>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
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
                            <h4 key={lineIdx} className="font-semibold text-gray-800 mb-2">
                              {line.replace(/\*\*/g, '')}
                            </h4>
                          );
                        } else if (line.startsWith('•')) {
                          // Bullet point
                          return (
                            <p key={lineIdx} className="text-gray-700 ml-4 mb-1">
                              {line}
                            </p>
                          );
                        } else if (line.trim()) {
                          // Regular line
                          return (
                            <p key={lineIdx} className="text-gray-700 mb-2">
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
                    <p key={idx} className="text-gray-700 mb-3 last:mb-0">
                      {section}
                    </p>
                  );
                }
              })}
            </div>

            {/* Reflection Question */}
            {content.reflection && (
              <div className="mt-6 p-4 bg-white/50 rounded-lg border-l-4 border-primary">
                <p className="font-medium text-gray-800 mb-1">
                  💭 Reflita:
                </p>
                <p className="text-sm text-gray-700">{content.reflection}</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Notes */}
        <Card className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suas anotações desta etapa (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui suas reflexões sobre esta etapa..."
            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={saving}
          />
          {notes.trim() && !isStepCompleted && (
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-2 text-sm text-primary hover:underline disabled:opacity-50"
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
              className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
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
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === journeyInfo.totalSteps}
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {progress?.completedSteps.length || 0} de {journeyInfo.totalSteps} etapas
            concluídas
          </p>
        </div>
    </div>
  );
}
