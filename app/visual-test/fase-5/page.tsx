'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Layout, CheckCircle, ArrowRight } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface PageItemProps {
  name: string
  path: string
  module: string
  checks: {
    breadcrumb: boolean
    pageTransition: boolean
    cssVariables: boolean
    optimizedIcon: boolean
    framerMotion: boolean
  }
}

const PageItem = ({ name, path, module, checks }: PageItemProps) => {
  const allChecked = Object.values(checks).every(v => v)
  const checkCount = Object.values(checks).filter(v => v).length

  return (
    <Link href={path}>
      <Card variant="glass" hover="lift" clickable className="group">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {name}
              </div>
              {allChecked && (
                <CheckCircle size={18} weight="fill" className="text-[#6BCF7F]" />
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="default" className="text-xs">{module}</Badge>
              <span className="text-xs text-[var(--text-tertiary)] font-mono">{path}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(checks).map(([key, value]) => (
                <span
                  key={key}
                  className={`text-xs px-2 py-0.5 rounded ${
                    value
                      ? 'bg-[#6BCF7F]/10 text-[#6BCF7F]'
                      : 'bg-[var(--surface-main)] text-[var(--text-tertiary)]'
                  }`}
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--primary)]">{checkCount}/5</div>
              <div className="text-xs text-[var(--text-tertiary)]">checks</div>
            </div>
            <ArrowRight
              size={20}
              weight="bold"
              className="text-[var(--primary)] group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default function Fase5TestPage() {
  const pages: PageItemProps[] = [
    {
      name: 'Home',
      path: '/home',
      module: 'Core',
      checks: {
        breadcrumb: false, // Home não tem breadcrumb
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Respiração - Lista',
      path: '/breathe',
      module: 'Breathe',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Respiração - Sessão',
      path: '/breathe/session',
      module: 'Breathe',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Respiração - Customizar',
      path: '/breathe/custom',
      module: 'Breathe',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Vídeos Calmos',
      path: '/calm',
      module: 'Calm',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Player de Vídeo',
      path: '/calm/video-1',
      module: 'Calm',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Descobrir - Hub',
      path: '/discover',
      module: 'Discover',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Tópicos',
      path: '/discover/topics',
      module: 'Discover',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Jornadas',
      path: '/discover/journeys',
      module: 'Discover',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Perfil',
      path: '/profile',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Editar Perfil',
      path: '/profile/edit',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Configurações',
      path: '/profile/settings',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Registrar Crise',
      path: '/profile/crisis-log',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Histórico de Crises',
      path: '/profile/history',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Conquistas',
      path: '/profile/achievements',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Excluir Conta',
      path: '/profile/delete',
      module: 'Profile',
      checks: {
        breadcrumb: true,
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    },
    {
      name: 'Onboarding',
      path: '/onboarding',
      module: 'Core',
      checks: {
        breadcrumb: false, // Design customizado
        pageTransition: true,
        cssVariables: true,
        optimizedIcon: true,
        framerMotion: true
      }
    }
  ]

  const moduleGroups = pages.reduce((acc, page) => {
    if (!acc[page.module]) acc[page.module] = []
    acc[page.module].push(page)
    return acc
  }, {} as Record<string, PageItemProps[]>)

  const totalPages = pages.length
  const allChecksCount = pages.reduce((sum, page) =>
    sum + Object.values(page.checks).filter(v => v).length, 0
  )
  const maxPossibleChecks = totalPages * 5
  const percentComplete = Math.round((allChecksCount / maxPossibleChecks) * 100)

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 5: Páginas' }
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
                <Layout size={20} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 5
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Páginas Completas
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Todas as {totalPages} páginas do app com design system aplicado, navegação padronizada e animações consistentes.
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
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">{totalPages}</div>
                <div className="text-sm text-[var(--text-secondary)]">Total de Páginas</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6BCF7F] mb-1">{percentComplete}%</div>
                <div className="text-sm text-[var(--text-secondary)]">Completo</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">{Object.keys(moduleGroups).length}</div>
                <div className="text-sm text-[var(--text-secondary)]">Módulos</div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6BCF7F] mb-1">{allChecksCount}/{maxPossibleChecks}</div>
                <div className="text-sm text-[var(--text-secondary)]">Checks Passed</div>
              </div>
            </Card>
          </motion.div>

          {/* Pages by Module */}
          {Object.entries(moduleGroups).map(([module, modulePages]) => (
            <motion.div
              key={module}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                {module}
                <span className="text-sm text-[var(--text-tertiary)] font-normal ml-2">
                  ({modulePages.length} página{modulePages.length > 1 ? 's' : ''})
                </span>
              </h2>

              <div className="space-y-3">
                {modulePages.map((page) => (
                  <motion.div key={page.path} variants={itemVariants}>
                    <PageItem {...page} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="default">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Legenda dos Checks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
                <div>
                  <strong className="text-[var(--text-primary)]">breadcrumb:</strong>
                  <span className="text-[var(--text-secondary)] ml-1">Navegação hierárquica</span>
                </div>
                <div>
                  <strong className="text-[var(--text-primary)]">pageTransition:</strong>
                  <span className="text-[var(--text-secondary)] ml-1">Animação de entrada</span>
                </div>
                <div>
                  <strong className="text-[var(--text-primary)]">cssVariables:</strong>
                  <span className="text-[var(--text-secondary)] ml-1">Tokens do design system</span>
                </div>
                <div>
                  <strong className="text-[var(--text-primary)]">optimizedIcon:</strong>
                  <span className="text-[var(--text-secondary)] ml-1">Phosphor Icons</span>
                </div>
                <div>
                  <strong className="text-[var(--text-primary)]">framerMotion:</strong>
                  <span className="text-[var(--text-secondary)] ml-1">Animações suaves</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
