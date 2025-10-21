'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  HeartPulse,
  ListTodo,
  LogOut,
  NotebookPen,
  ShieldHalf,
  Sparkles,
  TrendingUp,
  User,
  Wind,
} from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import PageTransition from '@/components/transitions/PageTransition';
import StatCard from '@/components/profile/StatCard';
import { useUIStore } from '@/lib/store/uiStore';
import { useUser } from '@/lib/hooks/useUser';

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

const menuItems: MenuItem[] = [
  {
    title: 'Editar perfil',
    description: 'Atualize nome, idade e diagnostico',
    icon: NotebookPen,
    href: '/profile/edit',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Registrar crise',
    description: 'Anote detalhes enquanto estao frescos',
    icon: HeartPulse,
    href: '/profile/crisis-log',
    accent: 'bg-red-50 text-red-500',
  },
  {
    title: 'Historico de crises',
    description: 'Revise padroes e gatilhos',
    icon: ListTodo,
    href: '/profile/history',
    accent: 'bg-secondary/50 text-gray-700',
  },
  {
    title: 'Conquistas',
    description: 'Celebre seus avancos',
    icon: Sparkles,
    href: '/profile/achievements',
    accent: 'bg-yellow-100 text-yellow-600',
  },
  {
    title: 'Configuracoes',
    description: 'Preferencias de som e vibracao',
    icon: ShieldHalf,
    href: '/profile/settings',
    accent: 'bg-surface text-primary',
  },
  {
    title: 'Excluir conta',
    description: 'Remova seus dados com seguranca',
    icon: LogOut,
    href: '/profile/delete',
    accent: 'bg-red-100 text-red-600',
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
        badgeClass: 'bg-gray-100 text-gray-600',
      };
    default:
      return {
        label: 'Diagnostico em aberto',
        badgeClass: 'bg-gray-100 text-gray-500',
      };
  }
}

const statCardsConfig = (stats: ProfileStats) => [
  {
    icon: <Wind className="h-5 w-5" />,
    label: 'Sessoes de respiracao',
    value: stats.breathingSessions,
    accent: 'surface' as const,
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    label: 'Crises registradas',
    value: stats.crisisLogged,
    accent: 'primary' as const,
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    label: 'Conquistas',
    value: stats.achievementsUnlocked,
    accent: 'secondary' as const,
  },
  {
    icon: <ListTodo className="h-5 w-5" />,
    label: 'Jornadas completas',
    value: stats.journeysCompleted,
    accent: 'surface' as const,
  },
  {
    icon: <NotebookPen className="h-5 w-5" />,
    label: 'Reflexoes respondidas',
    value: stats.reflectionsAnswered,
    accent: 'surface' as const,
  },
  {
    icon: <User className="h-5 w-5" />,
    label: 'Favoritos',
    value: stats.favoriteVideos,
    accent: 'secondary' as const,
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
        console.error('Stats error:', error);
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <PageTransition>
        <div className="mobile-container space-y-6 px-4 py-6">
          <Card className="flex flex-col items-center gap-4 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/40 bg-primary/10">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-primary">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{user.age} anos</p>
            </div>

            <span
              className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${diagnosisDetails.badgeClass}`}
            >
              {diagnosisDetails.label}
            </span>
          </Card>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Seus numeros
              </h3>
              {stats && (
                <p className="text-xs text-gray-400">
                  {stats.currentStreak} dias seguidos · recorde de{' '}
                  {stats.longestStreak} dias
                </p>
              )}
            </div>

            {isLoadingStats && (
              <div className="grid gap-3">
                {[...Array(3)].map((_, index) => (
                  <Card
                    key={index}
                    className="h-20 animate-pulse bg-gray-100/80"
                  />
                ))}
              </div>
            )}

            {!isLoadingStats && stats && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-3"
              >
                {statCardsConfig(stats).map((item, index) => (
                  <StatCard
                    key={`${item.label}-${index}`}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    accent={item.accent}
                  />
                ))}
              </motion.div>
            )}

            {statsError && (
              <Card className="border border-red-200 bg-red-50 text-sm text-red-600">
                {statsError}
              </Card>
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800">
              Acoes rapidas
            </h3>
            <div className="grid gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="flex items-center justify-between gap-4 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </PageTransition>
    </div>
  );
}
