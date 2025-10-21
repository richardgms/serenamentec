'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TopicCard } from '@/components/discover/TopicCard';
import { getAllTopics, type TopicType } from '@/lib/utils/topicHelpers';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface TopicExploration {
  topicType: TopicType;
  resonates?: 'YES' | 'NO' | 'MAYBE' | null;
  notes?: string | null;
  bookmarked?: boolean;
  exploredAt?: Date;
  updatedAt?: Date;
}

export default function TopicsPage() {
  const router = useRouter();
  const [explorations, setExplorations] = useState<TopicExploration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const allTopics = getAllTopics();

  useEffect(() => {
    async function fetchExplorations() {
      try {
        setLoading(true);
        const response = await fetch('/api/topics/exploration');

        if (!response.ok) {
          throw new Error('Erro ao carregar explorações');
        }

        const data = await response.json();
        setExplorations(data.explorations || []);
      } catch (err) {
        console.error('Error fetching explorations:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchExplorations();
  }, []);

  const isTopicExplored = (topicType: TopicType): boolean => {
    return explorations.some((e) => e.topicType === topicType);
  };

  const handleTopicClick = (topicType: TopicType) => {
    router.push(`/discover/topics/${topicType}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-gray-600">Carregando tópicos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary font-medium"
          >
            Tentar novamente
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
          onClick={() => router.push('/discover')}
          className="tap-highlight-none"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Explorar Tópicos</h1>
          <p className="text-sm text-gray-600">
            Descubra mais sobre neurodivergência
          </p>
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/10 rounded-lg p-4 mb-6"
      >
        <p className="text-sm text-gray-700">
          Explore tópicos específicos do seu interesse. Marque o que ressoa com você e
          adicione suas reflexões pessoais.
        </p>
      </motion.div>

      {/* Topics Grid - 2 columns x 4 rows */}
      <div className="grid grid-cols-2 gap-3">
        {allTopics.map((topic, index) => (
          <motion.div
            key={topic.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TopicCard
              topicType={topic.type}
              explored={isTopicExplored(topic.type)}
              onClick={() => handleTopicClick(topic.type)}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-600">
          {explorations.length > 0 ? (
            <>
              Você explorou{' '}
              <span className="font-semibold text-primary">
                {explorations.length}
              </span>{' '}
              de <span className="font-semibold">{allTopics.length}</span> tópicos
            </>
          ) : (
            'Comece explorando um tópico que chame sua atenção'
          )}
        </p>
      </motion.div>
    </div>
  );
}
