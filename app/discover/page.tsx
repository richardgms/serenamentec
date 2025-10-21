'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { useUIStore } from '@/lib/store/uiStore';
import { DailyReflectionWidget } from '@/components/discover/DailyReflectionWidget';
import { Card } from '@/components/ui/Card';
import { Route, Grid3x3, MessageCircle } from 'lucide-react';

const modules = [
  {
    id: 'journeys',
    title: 'Jornadas',
    description: 'Trilhas guiadas de autoconhecimento',
    icon: Route,
    href: '/discover/journeys',
    emoji: '🗺️',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    id: 'topics',
    title: 'Explorar Tópicos',
    description: 'Explore características da neurodivergência',
    icon: Grid3x3,
    href: '/discover/topics',
    emoji: '🧩',
    gradient: 'from-secondary/20 to-secondary/5',
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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Jornada de Autoconhecimento 💭
          </h1>
          <p className="text-sm text-gray-600">
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
          className="mb-4"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Escolha como explorar
          </h2>
          <p className="text-sm text-gray-600 mt-1">
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
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div key={module.id} variants={itemVariants}>
                <Card
                  onClick={() => router.push(module.href)}
                  className={`
                    relative overflow-hidden
                    bg-gradient-to-br ${module.gradient}
                    cursor-pointer hover:scale-[1.02]
                    transition-all duration-300
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 p-4 bg-white/50 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{module.emoji}</span>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {module.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-surface rounded-lg"
        >
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            💚 Lembre-se: não há respostas certas ou erradas. Este é um espaço
            seguro para você explorar e conhecer mais sobre si mesmo.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
