'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/hooks/useUser';
import { useUIStore } from '@/lib/store/uiStore';
import { Header } from '@/components/navigation/Header';
import { MoodCheckIn } from '@/components/home/MoodCheckIn';
import { StreakWidget } from '@/components/gamification/StreakWidget';
import { Card } from '@/components/ui/Card';
import { Loader2, Wind, Video, Brain, User } from 'lucide-react';

const modules = [
  {
    id: 'breathe',
    title: 'Respirar',
    description: 'Exercícios de respiração guiada',
    icon: Wind,
    href: '/breathe',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    id: 'calm',
    title: 'Acalmar',
    description: 'Vídeos relaxantes e sons',
    icon: Video,
    href: '/calm',
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-primary',
  },
  {
    id: 'discover',
    title: 'Conhecer-se',
    description: 'Jornadas de autoconhecimento',
    icon: Brain,
    href: '/discover',
    gradient: 'from-surface/60 to-surface/20',
    iconColor: 'text-primary',
  },
  {
    id: 'profile',
    title: 'Perfil',
    description: 'Suas informações e histórico',
    icon: User,
    href: '/profile',
    gradient: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
  },
];

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

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { setPageTitle, setShowBackButton } = useUIStore();

  // Set page title and hide back button
  useEffect(() => {
    setPageTitle('');
    setShowBackButton(false);
  }, [setPageTitle, setShowBackButton]);

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!isLoading && user && !user.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Olá, {user.firstName}! 👋
          </h1>
          <p className="text-sm text-gray-600">
            Como podemos ajudar você hoje?
          </p>
        </motion.div>

        {/* Mood Check-in Widget */}
        <MoodCheckIn />

        {/* Streak Widget */}
        <StreakWidget />

        {/* Module Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div key={module.id} variants={itemVariants}>
                <Card
                  onClick={() => router.push(module.href)}
                  className={`
                    relative overflow-hidden border border-gray-100
                    bg-gradient-to-br ${module.gradient}
                    h-40 flex flex-col items-center justify-center
                    text-center p-4
                    cursor-pointer touch-feedback hover:scale-105
                    transition-all duration-300
                  `}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className={`h-12 w-12 mb-3 ${module.iconColor}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-tight">
                    {module.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Feito com 💚 para você
          </p>
        </motion.div>
      </div>
    </div>
  );
}
