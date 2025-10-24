'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/hooks/useUser';
import { useUIStore } from '@/lib/store/uiStore';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { MoodCheckIn } from '@/components/home/MoodCheckIn';
import { Wind, VideoCamera, Compass, User } from '@/lib/constants/icons';

const modules = [
  {
    id: 'breathe',
    title: 'Respirar',
    description: 'Exercícios de respiração',
    icon: Wind,
    href: '/breathe',
    bgVar: 'var(--module-breathe)',
  },
  {
    id: 'calm',
    title: 'Acalmar',
    description: 'Vídeos relaxantes',
    icon: VideoCamera,
    href: '/calm',
    bgVar: 'var(--module-calm)',
  },
  {
    id: 'discover',
    title: 'Conhecer-se',
    description: 'Jornadas e tópicos',
    icon: Compass,
    href: '/discover',
    bgVar: 'var(--module-discover)',
  },
  {
    id: 'profile',
    title: 'Perfil',
    description: 'Suas informações',
    icon: User,
    href: '/profile',
    bgVar: 'var(--module-profile)',
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-main)]">
        <Spinner size="md" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main>
        <PageTransition>
          <div className="mx-auto max-w-[428px] space-y-6 px-4 py-6">
          {/* Mood Check-in Widget */}
          <MoodCheckIn />

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Olá, {user.firstName}! 👋
            </h1>
            <p className="text-sm text-text-secondary">
              Como podemos ajudar você hoje?
            </p>
          </motion.div>

          {/* Module Cards Grid 2x2 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4"
          >
            {modules.map((module) => (
              <motion.div 
                key={module.id} 
                variants={itemVariants}
              >
                <Card
                  clickable
                  onClick={() => router.push(module.href)}
                  className="aspect-square flex flex-col items-center justify-center text-center p-6 gap-3 transition-all duration-150"
                  style={{ backgroundColor: module.bgVar }}
                >
                  {/* Icon Phosphor Duotone 48px */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <OptimizedIcon 
                      icon={module.icon} 
                      size={48} 
                      weight="duotone"
                      className="transition-transform text-[var(--module-text)]"
                    />
                  </motion.div>

                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-[var(--module-text)]">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-tight text-[var(--module-text)] opacity-70">
                      {module.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-4"
          >
            <p className="text-sm text-text-tertiary">
              Feito com 💚 para você
            </p>
          </motion.div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
