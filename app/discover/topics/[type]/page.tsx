'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ResonateButtons } from '@/components/discover/ResonateButtons';
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
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-gray-600">Carregando tópico...</p>
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
            onClick={() => router.push('/discover/topics')}
            className="text-primary font-medium"
          >
            Voltar para tópicos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push('/discover/topics')}
          className="tap-highlight-none"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-3xl">{topicInfo.emoji}</span>
          <h1 className="text-xl font-bold text-gray-800">{content.title}</h1>
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`bg-gradient-to-br ${topicInfo.gradient} mb-4`}>
          {/* Description */}
          <div className="prose prose-sm max-w-none">
            {content.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Examples */}
          {content.examples && content.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Exemplos práticos:
              </h3>
              <ul className="space-y-2">
                {content.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
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
        <Card className="mb-4">
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
        <Card className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suas reflexões pessoais (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui suas reflexões, dúvidas ou insights..."
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <button
          onClick={handleSave}
          disabled={saving}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all
            flex items-center justify-center gap-2
            ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Salvando...
            </>
          ) : saved ? (
            <>
              <Check className="h-5 w-5" />
              Salvo!
            </>
          ) : (
            'Salvar exploração'
          )}
        </button>
      </motion.div>

      {/* Exploration status */}
      {exploration && !saved && exploration.exploredAt && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-gray-500 mt-3"
        >
          Explorado pela primeira vez em{' '}
          {new Date(exploration.exploredAt).toLocaleDateString('pt-BR')}
        </motion.p>
      )}
    </div>
  );
}
