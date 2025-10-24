'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import StatCard from '@/components/profile/StatCard';
import { useUIStore } from '@/lib/store/uiStore';
import { useUser } from '@/lib/hooks/useUser';
import { logger } from '@/lib/utils/logger';
import { Wind, Heart, Trophy, Brain, Fire, User as UserIcon, CaretRight } from '@/lib/constants/icons';

interface ProfileStats {
  breathingSessions: number;
  favoriteVideos: number;
  journeysCompleted: number;
  reflectionsAnswered: number;
  achievementsUnlocked: number;
  currentStreak: number;
  longestStreak: number;
  crisisLogged: number;
}

interface MenuItem {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  accent: string;
}

const menuItems = [
  {
    title: 'Editar perfil',
    description: 'Atualize nome, idade e diagnóstico',
    icon: UserIcon,
    href: '/profile/edit',
    bgColor: 'var(--module-profile)',
  },
  {
    title: 'Registrar crise',
    description: 'Anote detalhes enquanto estão frescos',
    icon: Heart,
    href: '/profile/crisis-log',
    bgColor: 'rgba(255, 139, 148, 0.15)',
  },
  {
    title: 'Histórico de crises',
    description: 'Revise padrões e gatilhos',
    icon: Brain,
    href: '/profile/history',
    bgColor: 'var(--module-breathe)',
  },
  {
    title: 'Conquistas',
    description: 'Celebre seus avanços',
    icon: Trophy,
    href: '/profile/achievements',
    bgColor: 'rgba(245, 180, 97, 0.15)',
  },
  {
    title: 'Configurações',
    description: 'Preferências de som e vibração',
    icon: Fire,
    href: '/profile/settings',
    bgColor: 'var(--module-calm)',
  },
];

function getDiagnosisDetails(type: string | null | undefined) {
  switch (type) {
    case 'TEA':
      return {
        label: 'Diagnostico TEA',
        badgeClass: 'bg-indigo-100 text-indigo-700',
      };
    case 'TDAH':
      return {
        label: 'Diagnostico TDAH',
        badgeClass: 'bg-amber-100 text-amber-600',
      };
    case 'BOTH':
      return {
        label: 'TEA + TDAH',
        badgeClass: 'bg-gradient-to-r from-indigo-100 to-amber-100 text-indigo-700',
      };
    case 'EXPLORING':
      return {
        label: 'Explorando possibilidades',
        badgeClass: 'bg-gray-100 text-text-secondary',
      };
    default:
      return {
        label: 'Diagnostico em aberto',
        badgeClass: 'bg-gray-100 text-text-tertiary',
      };
  }
}

const statCardsConfig = (stats: ProfileStats) => [
  {
    icon: Wind,
    label: 'Sessões de respiração',
    value: stats.breathingSessions,
    accent: 'surface' as const,
  },
  {
    icon: Heart,
    label: 'Crises registradas',
    value: stats.crisisLogged,
    accent: 'primary' as const,
  },
  {
    icon: Trophy,
    label: 'Conquistas',
    value: stats.achievementsUnlocked,
    accent: 'secondary' as const,
  },
  {
    icon: Brain,
    label: 'Jornadas completas',
    value: stats.journeysCompleted,
    accent: 'surface' as const,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { setPageTitle, setShowBackButton } = useUIStore();
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Perfil');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoadingStats(true);
        const response = await fetch('/api/user/stats');
        if (!response.ok) {
          throw new Error('Falha ao carregar estatisticas');
        }
        const data = await response.json();
        setStats(data.stats);
        setStatsError(null);
      } catch (error) {
        logger.error('Failed to load profile stats', error, 'ProfilePage');
        setStatsError('Nao foi possivel carregar estatisticas agora');
      } finally {
        setIsLoadingStats(false);
      }
    }

    fetchStats();
  }, []);

  const diagnosisDetails = useMemo(
    () => getDiagnosisDetails(user?.diagnosisType ?? null),
    [user?.diagnosisType]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-main)]">
        <Spinner size="md" />
      </div>
    );
  }

  if (!user) {
    return null;
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
              { label: 'Perfil' },
            ]}
          />

          {/* Avatar e Info */}
          <Card className="flex flex-col items-center gap-4 text-center">
            <Avatar
              src={user.profilePicture || undefined}
              alt={`${user.firstName} ${user.lastName}`}
              fallback={`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
              size="xl"
            />

            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">{user.age} anos</p>
            </div>

            <Badge variant={diagnosisDetails.badgeClass as any}>
              {diagnosisDetails.label}
            </Badge>
          </Card>

          {/* Estatísticas */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary">
                Seus números
              </h3>
              {stats && (
                <p className="text-xs text-text-tertiary flex items-center gap-1">
                  <OptimizedIcon icon={Fire} size={14} className="text-warning" />
                  {stats.currentStreak} dias
                </p>
              )}
            </div>

            {isLoadingStats && (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, index) => (
                  <Card
                    key={index}
                    className="h-20 animate-pulse bg-surface-elevated"
                  />
                ))}
              </div>
            )}

            {!isLoadingStats && stats && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                {statCardsConfig(stats).map((item, index) => (
                  <StatCard
                    key={`${item.label}-${index}`}
                    icon={<OptimizedIcon icon={item.icon} size={20} weight="duotone" />}
                    label={item.label}
                    value={item.value}
                    accent={item.accent}
                  />
                ))}
              </motion.div>
            )}

            {statsError && (
              <Card className="border border-error/20 bg-error/10 text-sm text-error">
                {statsError}
              </Card>
            )}
          </section>

          {/* Menu de ações */}
          <section className="space-y-4">
            <h3 className="text-base font-semibold text-text-primary">
              Ações rápidas
            </h3>
            <div className="grid gap-3">
              {menuItems.map((item) => (
                <Card
                  key={item.href}
                  clickable
                  onClick={() => router.push(item.href)}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <OptimizedIcon icon={item.icon} size={20} weight="duotone" className="text-[var(--module-text)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {item.title}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <OptimizedIcon icon={CaretRight} size={20} weight="bold" className="text-text-tertiary" />
                </Card>
              ))}
            </div>
          </section>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
