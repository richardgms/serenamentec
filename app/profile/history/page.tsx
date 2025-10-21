'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Activity, BarChart3, Clock, Target } from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/transitions/PageTransition';
import StatCard from '@/components/profile/StatCard';
import CrisisCard from '@/components/profile/CrisisCard';
import { useUIStore } from '@/lib/store/uiStore';
import {
  CRISIS_PERIOD_OPTIONS,
  CRISIS_TYPE_OPTIONS,
} from '@/lib/constants/profile';
import type { CrisisDuration, CrisisType } from '@prisma/client';

interface CrisisLogItem {
  id: string;
  intensity: number;
  crisisTypes: CrisisType[];
  duration: CrisisDuration;
  whatHelped: string[];
  additionalNotes?: string | null;
  triggers?: string[] | null;
  location?: string | null;
  createdAt: string;
}

interface CrisisStats {
  total: number;
  averageIntensity: number;
  averageIntensityLabel: string | null;
  mostCommonType: CrisisType | null;
  averageDuration: CrisisDuration | null;
  averageDurationLabel: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function CrisisHistoryPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();

  const [period, setPeriod] = useState<string>('30days');
  const [logs, setLogs] = useState<CrisisLogItem[]>([]);
  const [stats, setStats] = useState<CrisisStats | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Historico de crises');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  useEffect(() => {
    loadHistory(true).catch((err) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const loadHistory = async (reset = false) => {
    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const nextPage = reset ? 1 : (pagination?.page ?? 1) + 1;
      const response = await fetch(
        `/api/crisis-log?period=${period}&page=${nextPage}&limit=10`
      );

      if (!response.ok) {
        throw new Error('Falha ao carregar historico');
      }

      const data = await response.json();

      setLogs((prev) => (reset ? data.crises : [...prev, ...data.crises]));
      setStats(data.stats);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      console.error('History fetch error:', err);
      setError('Nao foi possivel carregar o historico agora');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const typeLabelMap = useMemo(
    () =>
      new Map<string, string>(
        CRISIS_TYPE_OPTIONS.map((option) => [option.value, option.label])
      ),
    []
  );

  const hasLogs = logs.length > 0;
  const canLoadMore = pagination?.hasMore ?? false;

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <PageTransition>
        <div className="mobile-container px-4 py-6 space-y-6">
          <section className="space-y-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-800">
                Filtrar periodo
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {CRISIS_PERIOD_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPeriod(option.value)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-smooth ${
                      period === option.value
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading && (
              <div className="grid gap-3">
                <Card className="h-20 animate-pulse bg-gray-100/80" />
                <Card className="h-20 animate-pulse bg-gray-100/80" />
              </div>
            )}

            {!isLoading && stats && (
              <div className="grid gap-3">
                <StatCard
                  icon={<BarChart3 className="h-5 w-5" />}
                  label="Total no periodo"
                  value={stats.total}
                  accent="primary"
                />
                <StatCard
                  icon={<Activity className="h-5 w-5" />}
                  label="Intensidade media"
                  value={
                    stats.total > 0
                      ? `${stats.averageIntensity.toFixed(1)} ${
                          stats.averageIntensityLabel
                            ? `(${stats.averageIntensityLabel})`
                            : ''
                        }`
                      : '--'
                  }
                  accent="surface"
                />
                <StatCard
                  icon={<Target className="h-5 w-5" />}
                  label="Tipo mais comum"
                  value={
                    stats.mostCommonType
                      ? typeLabelMap.get(stats.mostCommonType) ??
                        stats.mostCommonType
                      : '--'
                  }
                  accent="surface"
                />
                <StatCard
                  icon={<Clock className="h-5 w-5" />}
                  label="Duracao media"
                  value={stats.averageDurationLabel ?? '--'}
                  accent="surface"
                />
              </div>
            )}

            {error && (
              <Card className="border border-red-200 bg-red-50 text-sm text-red-600">
                {error}
              </Card>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-800">
              Registro cronologico
            </h2>

            {isLoading && (
              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="h-32 animate-pulse bg-gray-100/80" />
                ))}
              </div>
            )}

            {!isLoading && !hasLogs && (
              <Card className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Nenhuma crise registrada neste periodo
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Registre cada experiencia para acompanhar gatilhos e vitorias
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    showToast('Vamos registrar juntos.', 'info');
                    setTimeout(() => router.push('/profile/crisis-log'), 200);
                  }}
                >
                  Registrar agora
                </Button>
              </Card>
            )}

            {hasLogs && (
              <div className="space-y-3">
                {logs.map((crisis) => (
                  <CrisisCard key={crisis.id} crisis={crisis} />
                ))}
              </div>
            )}

            {hasLogs && canLoadMore && (
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-100"
                onClick={() => loadHistory(false)}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Carregando...
                  </span>
                ) : (
                  'Carregar mais'
                )}
              </Button>
            )}
          </section>
        </div>
      </PageTransition>
    </div>
  );
}
