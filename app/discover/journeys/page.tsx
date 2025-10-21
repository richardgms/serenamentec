'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { JourneyCard } from '@/components/discover/JourneyCard';
import { getAllJourneyTypes, type JourneyType } from '@/lib/utils/journeyHelpers';
import { ArrowLeft, Loader2 } from 'lucide-react';

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
        const journeysMap = new Map(
          data.journeys.map((j: JourneyProgress) => [j.journeyType, j])
        );

        const fullJourneys = allJourneyTypes.map((type) =>
          journeysMap.get(type) || {
            journeyType: type,
            currentStep: 1,
            completedSteps: [],
            completed: false,
          }
        );

        setJourneys(fullJourneys);
      } catch (err) {
        console.error('Error fetching journeys:', err);
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
      <div className="max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-gray-600">Carregando jornadas...</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Jornadas</h1>
          <p className="text-sm text-gray-600">Trilhas guiadas de autoconhecimento</p>
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/10 rounded-lg p-4 mb-6"
      >
        <p className="text-sm text-gray-700">
          Cada jornada te guia por tópicos específicos com perguntas reflexivas.
          Avance no seu ritmo e volte sempre que quiser.
        </p>
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
  );
}
