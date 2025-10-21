'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { useUIStore } from '@/lib/store/uiStore';
import { Card } from '@/components/ui/Card';
import { BreathingPatternCard } from '@/components/breathe/BreathingPatternCard';
import { breathingPatterns } from '@/lib/utils/breathingPatterns';
import { Settings2, Sparkles } from 'lucide-react';

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

export default function BreathePage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton } = useUIStore();
  const [hasCustomPattern, setHasCustomPattern] = useState(false);

  useEffect(() => {
    setPageTitle('Respirar');
    setShowBackButton(true);

    // Check if user has custom breathing pattern
    fetch('/api/breathing/custom')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.customBreathing) {
          setHasCustomPattern(true);
        }
      })
      .catch(() => {
        // Ignore error
      });
  }, [setPageTitle, setShowBackButton]);

  const handlePatternSelect = (patternType: string) => {
    router.push(`/breathe/session?pattern=${patternType}`);
  };

  const handleCustomClick = () => {
    if (hasCustomPattern) {
      router.push('/breathe/session?pattern=CUSTOM');
    } else {
      router.push('/breathe/custom');
    }
  };

  const patterns = Object.values(breathingPatterns);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Escolha um Padrão de Respiração
          </h1>
          <p className="text-sm text-gray-600">
            Cada padrão tem um benefício específico para ajudar você
          </p>
        </motion.div>

        {/* Patterns Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {patterns.map((pattern) => (
            <motion.div key={pattern.id} variants={itemVariants}>
              <BreathingPatternCard
                pattern={pattern}
                onClick={() => handlePatternSelect(pattern.type)}
              />
            </motion.div>
          ))}

          {/* Custom Breathing Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                onClick={handleCustomClick}
                className={`
                  relative overflow-hidden
                  bg-gradient-to-br from-gray-700 to-gray-900
                  text-white
                  cursor-pointer
                  min-h-[180px]
                  flex flex-col justify-between
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-4xl mb-2 block">✨</span>
                    <h3 className="text-xl font-bold mb-1">Personalizar</h3>
                    <p className="text-sm text-white/90 font-medium">
                      Crie seu próprio padrão
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Settings2 className="h-5 w-5 text-white/80" />
                  </motion.div>
                </div>

                {/* Status */}
                <div className="mt-4">
                  {hasCustomPattern ? (
                    <div className="inline-flex items-center gap-2 bg-green-500/30 backdrop-blur-sm rounded-full px-4 py-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Padrão configurado
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Settings2 className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Configure agora
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-white/90 mt-3 leading-relaxed">
                  {hasCustomPattern
                    ? 'Use seu padrão personalizado configurado'
                    : 'Defina seus próprios tempos de inspiração, pausa e expiração'}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            💡 Dica: Encontre um lugar tranquilo e pratique regularmente
          </p>
        </motion.div>
      </div>
    </div>
  );
}
