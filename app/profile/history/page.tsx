'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/transitions/PageTransition';
import { PullToRefresh } from '@/components/ui/PullToRefresh';
import { Spinner } from '@/components/ui/Spinner';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { EmptyState } from '@/components/ui/EmptyState';
import { Activity, ChartBar, Clock, Target } from '@/lib/constants/icons';
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

  const handleRefresh = async () => {
    await loadHistory(true);
    showToast('Histórico atualizado', 'success');
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
    <div className="min-h-screen bg-[var(--surface-main)] pb-10">
      <Header />
      <main>
      <PageTransition>
        <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
          <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Histórico de crises' },
            ]}
          />

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-text-primary">
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
                        : 'border-gray-200 bg-white text-text-secondary'
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
                  icon={<OptimizedIcon icon={ChartBar} size={20} weight="duotone" />}
                  label="Total no periodo"
                  value={stats.total}
                  accent="primary"
                />
                <StatCard
                  icon={<OptimizedIcon icon={Activity} size={20} weight="duotone" />}
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
                  icon={<OptimizedIcon icon={Target} size={20} weight="duotone" />}
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
                  icon={<OptimizedIcon icon={Clock} size={20} weight="duotone" />}
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
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h2 className="text-base font-semibold text-text-primary">
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
              <EmptyState
                context="crisis-history"
                actionLabel="Registrar agora"
                onAction={() => {
                  showToast('Vamos registrar juntos.', 'info')
                  setTimeout(() => router.push('/profile/crisis-log'), 200)
                }}
                className="py-12"
              />
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
                className="w-full border-gray-200 text-text-secondary hover:bg-gray-100"
                onClick={() => loadHistory(false)}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
              </Button>
            )}
          </motion.section>
          </div>
        </PullToRefresh>
      </PageTransition>
      </main>
    </div>
  );
}
