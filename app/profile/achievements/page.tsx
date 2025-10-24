'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { PageTransition } from '@/components/transitions/PageTransition';
import { PullToRefresh } from '@/components/ui/PullToRefresh';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { EmptyState } from '@/components/ui/EmptyState';
import { useUIStore } from '@/lib/store/uiStore';
import { Sparkle, LockKey, CircleNotch } from '@/lib/constants/icons';
import { formatAchievementDate } from '@/lib/achievements/achievementHelpers';

interface UnlockedAchievement {
  id: string;
  type: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
  unlockedAt: Date;
  acknowledged: boolean;
}

interface LockedAchievement {
  type: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
  progress: number;
  required: number;
  percentage: number;
}

interface AchievementsData {
  unlocked: UnlockedAchievement[];
  locked: LockedAchievement[];
  stats: {
    total: number;
    unlocked: number;
    locked: number;
    percentage: number;
  };
}

export default function AchievementsPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();
  const [data, setData] = useState<AchievementsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Conquistas');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/achievements');

      if (!response.ok) {
        throw new Error('Erro ao carregar conquistas');
      }

      const achievementsData = await response.json();
      setData(achievementsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    await fetchAchievements();
    showToast('Conquistas atualizadas', 'success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-main)] pb-10">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <OptimizedIcon icon={CircleNotch} size={32} weight="bold" className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[var(--surface-main)] pb-10">
        <Header />
        <PageTransition>
          <div className="mobile-container px-4 py-6">
            <Card className="text-center">
              <p className="text-red-600">{error || 'Erro ao carregar conquistas'}</p>
            </Card>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-main)] pb-10">
      <Header />
      <main>
      <PageTransition>
        <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
          <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Conquistas' },
            ]}
          />

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <OptimizedIcon icon={Sparkle} size={20} weight="duotone" className="text-primary" />
                  <h2 className="font-semibold text-text-primary">Seu Progresso</h2>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {data.stats.unlocked}/{data.stats.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.stats.percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
              <p className="text-xs text-text-secondary mt-2">
                {data.stats.percentage}% das conquistas desbloqueadas
              </p>
            </Card>
          </motion.div>

          {/* Unlocked Achievements */}
          {data.unlocked.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3 px-1">
                Desbloqueadas ({data.unlocked.length})
              </h3>
              <div className="space-y-3">
                {data.unlocked.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`bg-gradient-to-br ${achievement.gradient} border-2`}
                      style={{ borderColor: achievement.color }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Emoji */}
                        <div className="text-4xl">{achievement.emoji}</div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-text-primary">
                              {achievement.title}
                            </h4>
                            <OptimizedIcon
                              icon={Sparkle}
                              size={16}
                              weight="fill"
                              className="flex-shrink-0"
                              style={{ color: achievement.color }}
                            />
                          </div>
                          <p className="text-sm text-text-secondary mb-2">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-text-secondary">
                            Desbloqueada em{' '}
                            {formatAchievementDate(new Date(achievement.unlockedAt))}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {data.locked.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3 px-1">
                Bloqueadas ({data.locked.length})
              </h3>
              <div className="space-y-3">
                {data.locked.map((achievement, index) => (
                  <motion.div
                    key={achievement.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (data.unlocked.length + index) * 0.1 }}
                  >
                    <Card className="bg-gray-50 border-2 border-gray-200">
                      <div className="flex items-start gap-3">
                        {/* Emoji with opacity */}
                        <div className="text-4xl opacity-40">{achievement.emoji}</div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-text-secondary">
                              {achievement.title}
                            </h4>
                            <OptimizedIcon icon={LockKey} size={16} weight="duotone" className="text-gray-400 flex-shrink-0" />
                          </div>
                          <p className="text-sm text-text-secondary mb-3">
                            {achievement.description}
                          </p>

                          {/* Progress */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                              <span>Progresso</span>
                              <span>
                                {achievement.progress} / {achievement.required}
                              </span>
                            </div>
                            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="absolute inset-y-0 left-0 bg-gray-400 rounded-full"
                                style={{ width: `${achievement.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {data.unlocked.length === 0 && data.locked.length === 0 && (
            <EmptyState
              context="achievements"
              actionLabel="Explorar jornadas"
              onAction={() => {
                showToast('Escolha uma jornada para desbloquear conquistas ✨', 'info')
                setTimeout(() => router.push('/discover/journeys'), 200)
              }}
              className="py-12"
            />
          )}
          </div>
        </PullToRefresh>
      </PageTransition>
      </main>
    </div>
  );
}
