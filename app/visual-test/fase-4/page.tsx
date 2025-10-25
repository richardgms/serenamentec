'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Package, ArrowRight } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface ModuleCardProps {
  name: string
  description: string
  href: string
  bgColor: string
  status: 'implemented' | 'testing' | 'documented'
}

const ModuleCard = ({ name, description, href, bgColor, status }: ModuleCardProps) => {
  const statusLabel = {
    implemented: 'Implementado',
    testing: 'Em Testes',
    documented: 'Documentado'
  }

  return (
    <Link href={href}>
      <Card variant="glass" hover="lift" clickable className="group h-full">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: bgColor }}
            >
              <Package size={20} weight="duotone" className="text-white" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-bg)] text-[var(--primary)] font-medium">
              {statusLabel[status]}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              {name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[var(--primary)] font-medium text-sm group-hover:gap-3 transition-all pt-2">
            <span>Ver demo</span>
            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default function Fase4TestPage() {
  const modules = [
    {
      name: 'MoodCheckIn',
      description: 'Check-in emocional com 5 níveis de mood e emojis interativos com animações suaves.',
      href: '/home',
      bgColor: 'linear-gradient(135deg, #7DD3C0 0%, #5FB8A8 100%)',
      status: 'implemented' as const
    },
    {
      name: 'BreathingCircle',
      description: 'Círculo animado para exercícios de respiração com timing customizável.',
      href: '/breathe/session',
      bgColor: 'linear-gradient(135deg, #E8F4F8 0%, #B8DFD8 100%)',
      status: 'implemented' as const
    },
    {
      name: 'VideoCard',
      description: 'Card de vídeo com thumbnail, duração, glass effect no hover e botão de favoritar.',
      href: '/calm',
      bgColor: 'linear-gradient(135deg, #FFD6BA 0%, #FFB4A2 100%)',
      status: 'implemented' as const
    },
    {
      name: 'JourneyCard',
      description: 'Card de jornada com progresso, estados (in_progress/completed) e celebrações.',
      href: '/discover/journeys',
      bgColor: 'linear-gradient(135deg, #B8DFD8 0%, #A8E6D7 100%)',
      status: 'implemented' as const
    },
    {
      name: 'TopicCard',
      description: 'Card de tópico educacional com ícone duotone e contador de progresso.',
      href: '/discover/topics',
      bgColor: 'linear-gradient(135deg, #A8E6D7 0%, #7DD3C0 100%)',
      status: 'implemented' as const
    },
    {
      name: 'AchievementToast',
      description: 'Toast de conquista com confetti, sparkles e som opcional de celebração.',
      href: '/profile/achievements',
      bgColor: 'linear-gradient(135deg, #6BCF7F 0%, #7DD3C0 100%)',
      status: 'documented' as const
    }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 4: Módulos Específicos' }
            ]}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                <Package size={20} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 4
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Módulos Específicos
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Componentes de features: MoodCheckIn, BreathingCircle, VideoCard, JourneyCard e outros módulos especializados.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">6</div>
                <div className="text-sm text-[var(--text-secondary)]">Módulos</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6BCF7F] mb-1">5</div>
                <div className="text-sm text-[var(--text-secondary)]">Implementados</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F5B461] mb-1">1</div>
                <div className="text-sm text-[var(--text-secondary)]">Documentado</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">100%</div>
                <div className="text-sm text-[var(--text-secondary)]">Cobertura</div>
              </div>
            </Card>
          </motion.div>

          {/* Modules Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {modules.map((module) => (
              <motion.div key={module.name} variants={itemVariants}>
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass" className="bg-gradient-to-br from-[var(--primary-bg)] to-transparent">
              <div className="text-center space-y-3">
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                  Clique nos cards para ver os componentes em ação
                </div>
                <p className="text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Cada módulo foi redesenhado com o sistema Calm Organic Design, incluindo
                  animações suaves, estados de hover e microinterações acolhedoras.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
