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
import { JourneyCard } from '@/components/discover/JourneyCard';
import { getAllJourneyTypes, type JourneyType } from '@/lib/utils/journeyHelpers';

interface JourneyProgress {
  journeyType: JourneyType;
  currentStep: number;
  completedSteps: number[];
  completed: boolean;
}

export default function JourneysPage() {
  const router = useRouter();
  const [journeys, setJourneys] = useState<JourneyProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJourneys() {
      try {
        setLoading(true);
        const response = await fetch('/api/journeys/progress');

        if (!response.ok) {
          throw new Error('Erro ao carregar jornadas');
        }

        const data = await response.json();

        // Ensure we have all 3 journeys, even if not started yet
        const allJourneyTypes = getAllJourneyTypes();
        const journeysMap = new Map<JourneyType, JourneyProgress>(
          data.journeys.map((j: JourneyProgress) => [j.journeyType, j])
        );

        const fullJourneys = allJourneyTypes.map((type): JourneyProgress => {
          const existing = journeysMap.get(type);
          if (existing) return existing;
          return {
            journeyType: type,
            currentStep: 1,
            completedSteps: [],
            completed: false,
          };
        });

        setJourneys(fullJourneys);
      } catch (err) {
        logger.error('Failed to fetch journeys', err, 'JourneysPage');
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchJourneys();
  }, []);

  const handleJourneyClick = (journey: JourneyProgress) => {
    const step = journey.completedSteps.length > 0 ? journey.currentStep : 1;
    router.push(`/discover/journeys/${journey.journeyType}/${step}`);
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
              { label: 'Jornadas' },
            ]}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Jornadas 🗺️
            </h1>
            <p className="text-sm text-text-secondary">
              Trilhas guiadas de autoconhecimento
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="glass" className="text-center">
              <p className="text-sm text-text-primary leading-relaxed">
                Cada jornada te guia por tópicos específicos com perguntas reflexivas.
                Avance no seu ritmo e volte sempre que quiser.
              </p>
            </Card>
          </motion.div>

          {/* Journey Cards */}
          <div className="space-y-4">
            {journeys.map((journey, index) => (
              <motion.div
                key={journey.journeyType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <JourneyCard
                  journeyType={journey.journeyType}
                  completedSteps={journey.completedSteps}
                  onClick={() => handleJourneyClick(journey)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
