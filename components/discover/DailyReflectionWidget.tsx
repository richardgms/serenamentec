'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { ChatCircle, Check, X, CircleNotch, CaretDown, CaretUp } from '@/lib/constants/icons';
import { useUIStore } from '@/lib/store/uiStore';

interface DailyReflectionData {
  todayQuestion: {
    id: string;
    question: string;
    category: string;
  };
  answered: boolean;
  todayReflection: {
    answer: string | null;
    skipped: boolean;
    createdAt: string;
  } | null;
}

export function DailyReflectionWidget() {
  const [data, setData] = useState<DailyReflectionData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useUIStore();

  // Load today's question
  useEffect(() => {
    loadReflection();
  }, []);

  const loadReflection = async () => {
    try {
      const response = await fetch('/api/reflections/daily');
      if (!response.ok) throw new Error('Failed to load reflection');

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading reflection:', error);
      setIsLoading(false);
    }
  };

  const handleSave = async (skipped: boolean = false) => {
    if (!data) return;

    if (!skipped && answer.trim().length < 10) {
      showToast('Escreva pelo menos 10 caracteres', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/reflections/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: data.todayQuestion.question,
          answer: skipped ? null : answer,
          skipped,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      showToast(
        skipped ? 'Reflexão pulada' : 'Reflexão salva com sucesso! 💚',
        'success'
      );

      // Reload to update answered status
      await loadReflection();
      setIsExpanded(false);
      setAnswer('');
    } catch (error: any) {
      console.error('Error saving reflection:', error);
      showToast(error.message || 'Erro ao salvar reflexão', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <div className="flex items-center justify-center py-8">
          <OptimizedIcon icon={CircleNotch} size={24} weight="bold" className="animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (!data) return null;

  const { todayQuestion, answered, todayReflection } = data;

  return (
    <Card className="mb-6">
      {/* Header */}
      <div
        onClick={() => !answered && setIsExpanded(!isExpanded)}
        className={`flex items-start gap-3 ${!answered && 'cursor-pointer'}`}
      >
        <div className={`flex-shrink-0 p-2 rounded-full ${
          answered ? 'bg-green-100' : 'bg-primary/10'
        }`}>
          {answered ? (
            <OptimizedIcon icon={Check} size={20} weight="bold" className="text-green-600" />
          ) : (
            <OptimizedIcon icon={ChatCircle} size={20} weight="duotone" className="text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary mb-1">
            {answered ? 'Reflexão de hoje ✨' : 'Reflexão do dia'}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {todayQuestion.question}
          </p>

          {answered && todayReflection && !todayReflection.skipped && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-[var(--surface-card)] rounded-lg"
            >
              <p className="text-sm text-text-secondary italic">
                &ldquo;{todayReflection.answer}&rdquo;
              </p>
            </motion.div>
          )}

          {answered && todayReflection?.skipped && (
            <p className="text-xs text-text-tertiary mt-2">
              Você pulou esta reflexão hoje
            </p>
          )}
        </div>

        {!answered && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <OptimizedIcon icon={CaretDown} size={20} weight="bold" className="text-gray-400" />
          </motion.div>
        )}
      </div>

      {/* Expanded Form */}
      <AnimatePresence>
        {isExpanded && !answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            {/* Textarea */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Escreva suas reflexões aqui..."
              className="w-full px-4 py-3 bg-[var(--surface-card)] rounded-lg border-2 border-transparent focus:border-primary focus:outline-none resize-none transition-colors text-sm"
              rows={5}
              maxLength={1000}
              disabled={isSaving}
            />

            {/* Character count */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-text-tertiary">
                {answer.length}/1000 caracteres
              </span>
              {answer.length < 10 && answer.length > 0 && (
                <span className="text-xs text-orange-600">
                  Mínimo 10 caracteres
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving || answer.trim().length < 10}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <OptimizedIcon icon={CircleNotch} size={16} weight="bold" className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <OptimizedIcon icon={Check} size={16} weight="bold" />
                    Salvar
                  </>
                )}
              </button>

              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-100 text-text-secondary rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <OptimizedIcon icon={X} size={16} weight="bold" />
                Pular
              </button>
            </div>

            <p className="text-xs text-text-tertiary mt-3 text-center">
              Suas reflexões são privadas e apenas você pode vê-las
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
