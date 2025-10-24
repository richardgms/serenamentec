'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { logger } from '@/lib/utils/logger';
import { TopicCard } from '@/components/discover/TopicCard';
import { getAllTopics, type TopicType } from '@/lib/utils/topicHelpers';

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
        logger.error('Failed to fetch topic explorations', err, 'TopicsPage');
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
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <PageTransition>
          <div className="max-w-[428px] mx-auto px-4 py-20 text-center">
            <p className="text-error mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
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
              { label: 'Tópicos' },
            ]}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Explorar Tópicos 🧩
            </h1>
            <p className="text-sm text-text-secondary">
              Descubra mais sobre neurodivergência
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="glass" className="text-center">
              <p className="text-sm text-text-primary leading-relaxed">
                Explore tópicos específicos do seu interesse. Marque o que ressoa com você e
                adicione suas reflexões pessoais.
              </p>
            </Card>
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
            className="text-center"
          >
            <p className="text-sm text-text-secondary">
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
      </PageTransition>
      </main>
    </div>
  );
}
