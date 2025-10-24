'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { PageTransition } from '@/components/transitions/PageTransition';
import { useUIStore } from '@/lib/store/uiStore';
import { Card } from '@/components/ui/Card';
import { BreathingPatternCard } from '@/components/breathe/BreathingPatternCard';
import { breathingPatterns } from '@/lib/utils/breathingPatterns';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Wind, Sparkle } from '@/lib/constants/icons';

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
    <div className="min-h-screen">
      <Header />

      <main>
        <PageTransition>
          <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6 breathe-pattern-bg">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Respirar' },
            ]}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <OptimizedIcon icon={Wind} size={32} weight="duotone" className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Exercícios de Respiração
            </h1>
            <p className="text-sm text-text-secondary">
              Escolha um padrão para começar
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
              <Card
                clickable
                onClick={handleCustomClick}
                className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white min-h-[160px] flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <OptimizedIcon 
                      icon={Sparkle} 
                      size={32} 
                      weight="duotone" 
                      className="mb-2 text-white" 
                    />
                    <h3 className="text-xl font-bold mb-1">Personalizar</h3>
                    <p className="text-sm text-white/90 font-medium">
                      Crie seu próprio padrão
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4">
                  {hasCustomPattern ? (
                    <div className="inline-flex items-center gap-2 bg-success/30 backdrop-blur-sm rounded-full px-4 py-2">
                      <OptimizedIcon icon={Sparkle} size={16} className="text-white" />
                      <span className="text-sm font-medium">
                        Padrão configurado
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <OptimizedIcon icon={Wind} size={16} className="text-white" />
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

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-xs text-text-tertiary">
              💡 Dica: Encontre um lugar tranquilo e pratique regularmente
            </p>
          </motion.div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
