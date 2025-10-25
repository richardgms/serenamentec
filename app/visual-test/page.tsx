'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Palette,
  Compass,
  Package,
  Layout,
  Sparkle,
  ClipboardText,
  CheckCircle,
  Clock,
  ArrowRight
} from 'phosphor-react'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface PhaseCardProps {
  phase: number
  title: string
  description: string
  icon: React.ElementType
  status: 'completed' | 'in_progress' | 'pending'
  href: string
  bgGradient: string
}

const PhaseCard = ({ phase, title, description, icon: Icon, status, href, bgGradient }: PhaseCardProps) => {
  const statusConfig = {
    completed: { label: 'Completo', color: 'text-[#6BCF7F]', icon: CheckCircle },
    in_progress: { label: 'Em Progresso', color: 'text-[#F5B461]', icon: Clock },
    pending: { label: 'Pendente', color: 'text-[var(--text-tertiary)]', icon: Clock }
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <Link href={href}>
      <Card
        variant="glass"
        hover="lift"
        clickable
        className="group h-full relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{ background: bgGradient }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                <Icon size={24} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase {phase}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-0.5">
                  {title}
                </h3>
              </div>
            </div>

            <div className={`flex items-center gap-1.5 ${statusConfig[status].color}`}>
              <StatusIcon size={16} weight="fill" />
              <span className="text-xs font-medium">{statusConfig[status].label}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[var(--primary)] font-medium text-sm group-hover:gap-3 transition-all">
            <span>Visualizar testes</span>
            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default function VisualTestHub() {
  const phases = [
    {
      phase: 1,
      title: 'Fundação',
      description: 'Design tokens, paleta de cores, tipografia, sombras e sistema de espaçamento.',
      icon: Palette,
      status: 'completed' as const,
      href: '/visual-test/fase-1',
      bgGradient: 'linear-gradient(135deg, #7DD3C0 0%, #5FB8A8 100%)'
    },
    {
      phase: 2,
      title: 'Componentes Base',
      description: 'Button, Card, Input, Avatar, Badge, ProgressBar e componentes fundamentais.',
      icon: Package,
      status: 'completed' as const,
      href: '/visual-test/fase-2',
      bgGradient: 'linear-gradient(135deg, #A8E6D7 0%, #7DD3C0 100%)'
    },
    {
      phase: 3,
      title: 'Navegação',
      description: 'Header, Breadcrumb, PageTransition, Spinner e navegação por teclado.',
      icon: Compass,
      status: 'completed' as const,
      href: '/visual-test/fase-3',
      bgGradient: 'linear-gradient(135deg, #E8F4F8 0%, #B8DFD8 100%)'
    },
    {
      phase: 4,
      title: 'Módulos Específicos',
      description: 'MoodCheckIn, BreathingCircle, VideoCard, JourneyCard e componentes de features.',
      icon: Package,
      status: 'completed' as const,
      href: '/visual-test/fase-4',
      bgGradient: 'linear-gradient(135deg, #FFD6BA 0%, #FFB4A2 100%)'
    },
    {
      phase: 5,
      title: 'Páginas',
      description: 'Todas as 17 páginas do app com design system aplicado e navegação padronizada.',
      icon: Layout,
      status: 'completed' as const,
      href: '/visual-test/fase-5',
      bgGradient: 'linear-gradient(135deg, #B8DFD8 0%, #A8E6D7 100%)'
    },
    {
      phase: 6,
      title: 'Microinterações',
      description: 'Ripple effects, hover states, toasts, empty states, celebrations e acessibilidade.',
      icon: Sparkle,
      status: 'completed' as const,
      href: '/visual-test/fase-6',
      bgGradient: 'linear-gradient(135deg, #A8E6D7 0%, #5FB8A8 100%)'
    }
  ]

  const stats = [
    { label: 'Componentes', value: '25+', color: '#7DD3C0' },
    { label: 'Páginas', value: '17', color: '#B8DFD8' },
    { label: 'Tokens', value: '100+', color: '#FFD6BA' },
    { label: 'Completo', value: '100%', color: '#6BCF7F' }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-4 py-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-bg)] border border-[var(--primary-border)]">
              <Palette size={20} weight="duotone" className="text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--primary)]">
                Sistema Calm Organic Design
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Central de Testes Visual
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore e teste todos os componentes, páginas e microinterações do sistema de design do Serenamente.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card variant="glass" className="text-center">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Phase Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {phases.map((phase) => (
              <motion.div key={phase.phase} variants={itemVariants}>
                <PhaseCard {...phase} />
              </motion.div>
            ))}
          </motion.div>

          {/* QA Checklist CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/visual-test/checklist">
              <Card
                variant="glass"
                hover="scale"
                clickable
                className="group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #6BCF7F 0%, #7DD3C0 100%)' }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6BCF7F] to-[#7DD3C0] flex items-center justify-center">
                      <ClipboardText size={28} weight="duotone" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                        Checklist de QA Completo
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Acessibilidade, performance, cross-device e validação final
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={24}
                    weight="bold"
                    className="text-[var(--primary)] group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Documentation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8 pb-12"
          >
            <Card variant="default" className="bg-[var(--surface-card)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Documentação de Referência
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Design Tokens', path: 'docs/visual/design-tokens.ts' },
                  { name: 'Identidade Visual', path: 'docs/visual/identidade-visual.md' },
                  { name: 'Plano Visual', path: 'docs/visual/planovisual.md' },
                  { name: 'Status Geral', path: 'docs/visual/STATUS.md' }
                ].map((doc) => (
                  <div
                    key={doc.path}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-main)] border border-[var(--primary-border)] hover:border-[var(--primary)] transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                    <div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {doc.name}
                      </div>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono">
                        {doc.path}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
