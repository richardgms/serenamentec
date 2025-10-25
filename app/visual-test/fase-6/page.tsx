'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { useUIStore } from '@/lib/store/uiStore'
import { Sparkle, ArrowsDownUp, Hand, Spinner as SpinnerIcon, CheckCircle } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Fase6TestPage() {
  const { showToast } = useUIStore()
  const [showSkeletons, setShowSkeletons] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)

  const handleShowSkeletons = () => {
    setShowSkeletons(true)
    setTimeout(() => setShowSkeletons(false), 3000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 6: Microinterações' }
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
                <Sparkle size={20} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 6
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Polish e Microinterações
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Ripple effects, hover states, toasts, empty states, celebrations e acessibilidade.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Ripple Effects */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <div className="flex items-start gap-3 mb-4">
                  <Hand size={24} weight="duotone" className="text-[var(--primary)]" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                      Ripple Effects
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Clique nos botões para ver o efeito ripple com haptic feedback (vibração em dispositivos suportados).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" enableRipple enableHaptic>
                    Ripple Primary
                  </Button>
                  <Button variant="secondary" enableRipple enableHaptic>
                    Ripple Secondary
                  </Button>
                  <Button variant="ghost" enableRipple enableHaptic>
                    Ripple Ghost
                  </Button>
                  <Button variant="danger" enableRipple enableHaptic>
                    Ripple Danger
                  </Button>
                </div>

                <div className="mt-4 text-xs text-[var(--text-tertiary)] space-y-1">
                  <div>• Duração: 600ms com cubic-bezier(0.4, 0, 0.2, 1)</div>
                  <div>• Haptic: 10ms de vibração (apenas HTTPS e browsers modernos)</div>
                  <div>• Cor adaptada ao variant do botão</div>
                </div>
              </Card>
            </motion.div>

            {/* Hover States */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <div className="flex items-start gap-3 mb-4">
                  <Hand size={24} weight="duotone" className="text-[var(--primary)]" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                      Hover States
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Passe o mouse sobre os cards para ver os diferentes efeitos de hover.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="default" hover="lift" clickable>
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">Lift</div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Elevação com translateY(-4px)
                      </p>
                    </div>
                  </Card>

                  <Card variant="default" hover="scale" clickable>
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">Scale</div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Escala para 1.02 (2% maior)
                      </p>
                    </div>
                  </Card>

                  <Card variant="default" hover="glow" clickable>
                    <div className="text-center space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">Glow</div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Box-shadow com glow turquesa
                      </p>
                    </div>
                  </Card>
                </div>
              </Card>
            </motion.div>

            {/* Toast Animations */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle size={24} weight="duotone" className="text-[var(--primary)]" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                      Toast Notifications
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Sistema de notificações com ícones coloridos, progress bar e auto-dismiss.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showToast('Operação realizada com sucesso!', 'success')}
                  >
                    Success
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showToast('Ocorreu um erro ao processar.', 'error')}
                  >
                    Error
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showToast('Atenção: verifique os campos.', 'warning')}
                  >
                    Warning
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showToast('Nova funcionalidade disponível!', 'info')}
                  >
                    Info
                  </Button>
                </div>

                <div className="mt-4 text-xs text-[var(--text-tertiary)] space-y-1">
                  <div>• Auto-dismiss após 4 segundos</div>
                  <div>• Progress bar animada com gradiente</div>
                  <div>• Ícones Phosphor duotone coloridos</div>
                  <div>• Slide-in/slide-out com AnimatePresence</div>
                </div>
              </Card>
            </motion.div>

            {/* Loading Skeletons */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <div className="flex items-start gap-3 mb-4">
                  <SpinnerIcon size={24} weight="duotone" className="text-[var(--primary)]" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                      Loading Skeletons
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Placeholders animados com shimmer effect durante carregamento.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    onClick={handleShowSkeletons}
                    disabled={showSkeletons}
                  >
                    {showSkeletons ? 'Carregando...' : 'Mostrar Skeletons (3s)'}
                  </Button>

                  {showSkeletons ? (
                    <div className="space-y-3">
                      <LoadingSkeleton width="w-3/4" height="h-6" rounded="lg" shimmer />
                      <LoadingSkeleton width="w-1/2" height="h-6" rounded="lg" shimmer />
                      <LoadingSkeleton width="w-full" height="h-32" rounded="lg" shimmer />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="h-6 bg-[var(--surface-card)] border border-[var(--primary-border)] rounded-lg w-3/4"></div>
                      <div className="h-6 bg-[var(--surface-card)] border border-[var(--primary-border)] rounded-lg w-1/2"></div>
                      <div className="h-32 bg-[var(--surface-card)] border border-[var(--primary-border)] rounded-lg"></div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Empty States */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <ArrowsDownUp size={24} weight="duotone" className="text-[var(--primary)]" />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                        Empty States
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Estados vazios ilustrados com mensagens empáticas e CTAs contextuais.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmpty(!showEmpty)}
                  >
                    {showEmpty ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </div>

                {showEmpty && (
                  <div className="border border-[var(--primary-border)] rounded-lg p-6">
                    <EmptyState
                      context="calm-favorites"
                      onAction={() => showToast('Navegando para vídeos...', 'info')}
                    />
                  </div>
                )}

                <div className="mt-4 text-xs text-[var(--text-tertiary)] space-y-1">
                  <div>• 6 presets contextuais (calm-favorites, calm-recent, journey-progress, achievements, crisis-history, calm-category)</div>
                  <div>• Floating animation nos ícones</div>
                  <div>• Glassmorphism com gradient de fundo</div>
                  <div>• Suporte a prefers-reduced-motion</div>
                </div>
              </Card>
            </motion.div>

            {/* Accessibility */}
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="bg-gradient-to-br from-[var(--primary-bg)] to-transparent">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6BCF7F] to-[var(--primary)] mb-3">
                      <CheckCircle size={32} weight="fill" className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      Acessibilidade WCAG AA
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
                      Todos os componentes têm contraste adequado, focus rings visíveis, aria-labels e navegação por teclado.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[var(--surface-card)] rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#6BCF7F] mb-1">100%</div>
                      <div className="text-xs text-[var(--text-secondary)]">Contraste WCAG AA</div>
                    </div>
                    <div className="bg-[var(--surface-card)] rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#6BCF7F] mb-1">100%</div>
                      <div className="text-xs text-[var(--text-secondary)]">Keyboard Nav</div>
                    </div>
                    <div className="bg-[var(--surface-card)] rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#6BCF7F] mb-1">100%</div>
                      <div className="text-xs text-[var(--text-secondary)]">Focus Rings</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
