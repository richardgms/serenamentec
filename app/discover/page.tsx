'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { useUIStore } from '@/lib/store/uiStore';
import { DailyReflectionWidget } from '@/components/discover/DailyReflectionWidget';
import { Card } from '@/components/ui/Card';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Compass, Brain } from '@/lib/constants/icons';

const modules = [
  {
    id: 'journeys',
    title: 'Jornadas',
    description: 'Trilhas guiadas de autoconhecimento',
    icon: Compass,
    href: '/discover/journeys',
    emoji: '🗺️',
    bgVar: 'var(--module-breathe)',
  },
  {
    id: 'topics',
    title: 'Explorar Tópicos',
    description: 'Características da neurodivergência',
    icon: Brain,
    href: '/discover/topics',
    emoji: '🧩',
    bgVar: 'var(--module-calm)',
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

export default function DiscoverPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton } = useUIStore();

  useEffect(() => {
    setPageTitle('Conhecer-se');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

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
              { label: 'Conhecer-se' },
            ]}
          />

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Jornada de Autoconhecimento 💭
            </h1>
            <p className="text-sm text-text-secondary">
              Explore suas características e descubra mais sobre você
            </p>
          </motion.div>

          {/* Daily Reflection Widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyReflectionWidget />
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-1"
          >
            <h2 className="text-lg font-semibold text-text-primary">
              Escolha como explorar
            </h2>
            <p className="text-sm text-text-secondary">
              Trilhas guiadas ou exploração livre
            </p>
          </motion.div>

          {/* Module Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {modules.map((module) => (
              <motion.div key={module.id} variants={itemVariants}>
                <Card
                  clickable
                  onClick={() => router.push(module.href)}
                  className="flex items-center gap-4"
                  style={{ backgroundColor: module.bgVar }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-soft-sm">
                    <OptimizedIcon 
                      icon={module.icon} 
                      size={32} 
                      weight="duotone"
                      className="text-primary" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{module.emoji}</span>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {module.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass" className="text-center">
              <p className="text-sm text-text-primary leading-relaxed">
                💚 Lembre-se: não há respostas certas ou erradas. Este é um espaço
                seguro para você explorar e conhecer mais sobre si mesmo.
              </p>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
