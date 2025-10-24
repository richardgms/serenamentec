'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ResonateButtons } from '@/components/discover/ResonateButtons';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Check } from '@/lib/constants/icons';
import { getTopicInfo, type TopicType, type ResonateAnswer } from '@/lib/utils/topicHelpers';

interface TopicContent {
  topicType: TopicType;
  title: string;
  description: string;
  examples: string[];
}

interface TopicExploration {
  topicType: TopicType;
  resonates?: ResonateAnswer | null;
  notes?: string | null;
  bookmarked?: boolean;
  exploredAt?: Date | string | null;
}

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicType = params.type as TopicType;

  const [content, setContent] = useState<TopicContent | null>(null);
  const [exploration, setExploration] = useState<TopicExploration | null>(null);
  const [resonateAnswer, setResonateAnswer] = useState<ResonateAnswer | undefined>();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topicInfo = getTopicInfo(topicType);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch topic content from database
        const contentResponse = await fetch(`/api/topics/content?type=${topicType}`);
        if (!contentResponse.ok) {
          throw new Error('Erro ao carregar conteúdo do tópico');
        }
        const contentData = await contentResponse.json();
        setContent(contentData.content);

        // Fetch user's exploration if exists
        const explorationResponse = await fetch(`/api/topics/exploration?type=${topicType}`);
        if (explorationResponse.ok) {
          const explorationData = await explorationResponse.json();
          if (explorationData.exploration) {
            setExploration(explorationData.exploration);
            setResonateAnswer(explorationData.exploration.resonates || undefined);
            setNotes(explorationData.exploration.notes || '');
          }
        }
      } catch (err) {
        console.error('Error fetching topic data:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [topicType]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const response = await fetch('/api/topics/exploration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicType,
          resonates: resonateAnswer,
          notes: notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar exploração');
      }

      const data = await response.json();
      setExploration(data.exploration);
      setSaved(true);

      // Clear saved indicator after 2 seconds
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error saving exploration:', err);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen">
        <Header />
        <PageTransition>
          <div className="max-w-[428px] mx-auto px-4 py-20 text-center">
            <p className="mb-4" style={{ color: 'var(--error)' }}>{error || 'Conteúdo não encontrado'}</p>
            <Button onClick={() => router.push('/discover/topics')}>
              Voltar para tópicos
            </Button>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Conhecer-se', href: '/discover' },
              { label: 'Tópicos', href: '/discover/topics' },
              { label: content.title },
            ]}
          />

          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">{topicInfo.emoji}</span>
            <h1 className="text-xl font-bold text-text-primary">{content.title}</h1>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`bg-gradient-to-br ${topicInfo.gradient}`}>
              {/* Description */}
              <div className="prose prose-sm max-w-none">
                {content.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-text-primary mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Examples */}
              {content.examples && content.examples.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-text-primary mb-3">
                    Exemplos práticos:
                  </h3>
                  <ul className="space-y-2">
                    {content.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-text-primary flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="flex-1">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Resonate Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <ResonateButtons
                selected={resonateAnswer}
                onSelect={setResonateAnswer}
                disabled={saving}
              />
            </Card>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Suas reflexões pessoais (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anote aqui suas reflexões, dúvidas ou insights..."
                className="w-full min-h-[120px] p-3 border border-border-subtle rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-card text-text-primary"
                disabled={saving}
              />
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleSave}
              disabled={saving}
              variant={saved ? "primary" : "primary"}
              fullWidth
              isLoading={saving}
              className={saved ? "bg-success hover:bg-success" : ""}
            >
              {saved ? (
                <>
                  <OptimizedIcon icon={Check} size={20} />
                  Salvo!
                </>
              ) : (
                'Salvar exploração'
              )}
            </Button>
          </motion.div>

          {/* Exploration status */}
          {exploration && !saved && exploration.exploredAt && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-text-tertiary"
            >
              Explorado pela primeira vez em{' '}
              {new Date(exploration.exploredAt).toLocaleDateString('pt-BR')}
            </motion.p>
          )}
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
