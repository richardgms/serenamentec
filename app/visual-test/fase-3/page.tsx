'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { Compass, House, Gear, User, Circle } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Fase3TestPage() {
  const [showSpinner, setShowSpinner] = useState(false)
  const [showPageTransition, setShowPageTransition] = useState(false)

  const handleShowSpinner = () => {
    setShowSpinner(true)
    setTimeout(() => setShowSpinner(false), 3000)
  }

  const handleShowPageTransition = () => {
    setShowPageTransition(true)
    setTimeout(() => setShowPageTransition(false), 1000)
  }

  return (
    <PageTransition key={showPageTransition ? 'transition' : 'static'}>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 3: Navegação' }
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
                <Compass size={20} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 3
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Navegação
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Header, Breadcrumb, PageTransition, Spinner e navegação por teclado.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Header Demo */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Header
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  O Header atual (topo da página) inclui toggle de tema dark/light mode.
                  Use o botão no canto superior direito para alternar entre modos.
                </p>

                <div className="bg-[var(--surface-glass)] backdrop-blur-sm rounded-lg p-6 border border-[var(--primary-border)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                        <House size={20} weight="fill" className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--text-primary)]">Serenamente</div>
                        <div className="text-xs text-[var(--text-tertiary)]">Calm Organic Design</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs text-[var(--text-tertiary)]">Toggle Theme →</div>
                      <Circle size={32} weight="duotone" className="text-[var(--primary)]" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Breadcrumb Demo */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Breadcrumb
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Navegação hierárquica com separadores visuais e aria-labels para acessibilidade.
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[var(--text-tertiary)] mb-2">Exemplo 1: 2 níveis</div>
                    <Breadcrumb
                      items={[
                        { label: 'Home', href: '/home' },
                        { label: 'Perfil' }
                      ]}
                    />
                  </div>

                  <div>
                    <div className="text-xs text-[var(--text-tertiary)] mb-2">Exemplo 2: 3 níveis</div>
                    <Breadcrumb
                      items={[
                        { label: 'Home', href: '/home' },
                        { label: 'Descobrir', href: '/discover' },
                        { label: 'Jornadas' }
                      ]}
                    />
                  </div>

                  <div>
                    <div className="text-xs text-[var(--text-tertiary)] mb-2">Exemplo 3: 4 níveis</div>
                    <Breadcrumb
                      items={[
                        { label: 'Home', href: '/home' },
                        { label: 'Perfil', href: '/profile' },
                        { label: 'Configurações', href: '/profile/settings' },
                        { label: 'Notificações' }
                      ]}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* PageTransition Demo */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  PageTransition
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Animação suave (slide-up + fade) de 200ms ao navegar entre páginas.
                </p>

                <div className="space-y-4">
                  <div className="bg-[var(--surface-glass)] backdrop-blur-sm rounded-lg p-6 border border-[var(--primary-border)] text-center">
                    <div className="text-sm text-[var(--text-secondary)] mb-4">
                      Clique no botão para simular transição de página
                    </div>
                    <Button variant="primary" onClick={handleShowPageTransition}>
                      Simular Transição
                    </Button>
                  </div>

                  <div className="text-xs text-[var(--text-tertiary)] space-y-1">
                    <div>• initial: opacity 0, translateY(12px)</div>
                    <div>• animate: opacity 1, translateY(0)</div>
                    <div>• transition: 200ms cubic-bezier(0.4, 0, 0.2, 1)</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Spinner Demo */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Spinner - Loading States
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Indicador de carregamento com animação suave e múltiplos tamanhos.
                </p>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Tamanhos
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center space-y-2">
                        <Spinner size="sm" />
                        <div className="text-xs text-[var(--text-tertiary)]">Small (16px)</div>
                      </div>
                      <div className="text-center space-y-2">
                        <Spinner size="md" />
                        <div className="text-xs text-[var(--text-tertiary)]">Medium (24px)</div>
                      </div>
                      <div className="text-center space-y-2">
                        <Spinner size="lg" />
                        <div className="text-xs text-[var(--text-tertiary)]">Large (32px)</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Demo Interativo
                    </div>
                    <div className="bg-[var(--surface-glass)] backdrop-blur-sm rounded-lg p-8 border border-[var(--primary-border)] text-center">
                      {showSpinner ? (
                        <div className="space-y-3">
                          <Spinner size="lg" />
                          <div className="text-sm text-[var(--text-secondary)]">Carregando...</div>
                        </div>
                      ) : (
                        <Button variant="primary" onClick={handleShowSpinner}>
                          Mostrar Spinner (3s)
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Keyboard Navigation */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Navegação por Teclado
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Todos os componentes são navegáveis via teclado com focus rings visíveis.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--surface-glass)] backdrop-blur-sm rounded-lg p-4 border border-[var(--primary-border)]">
                      <div className="text-sm font-medium text-[var(--text-primary)] mb-2">
                        Atalhos Principais
                      </div>
                      <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <div className="flex justify-between">
                          <span>Próximo elemento</span>
                          <kbd className="px-2 py-1 bg-[var(--surface-card)] rounded text-xs font-mono border border-[var(--primary-border)]">
                            Tab
                          </kbd>
                        </div>
                        <div className="flex justify-between">
                          <span>Elemento anterior</span>
                          <kbd className="px-2 py-1 bg-[var(--surface-card)] rounded text-xs font-mono border border-[var(--primary-border)]">
                            Shift + Tab
                          </kbd>
                        </div>
                        <div className="flex justify-between">
                          <span>Ativar controle</span>
                          <kbd className="px-2 py-1 bg-[var(--surface-card)] rounded text-xs font-mono border border-[var(--primary-border)]">
                            Enter / Space
                          </kbd>
                        </div>
                        <div className="flex justify-between">
                          <span>Fechar modal</span>
                          <kbd className="px-2 py-1 bg-[var(--surface-card)] rounded text-xs font-mono border border-[var(--primary-border)]">
                            Esc
                          </kbd>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[var(--surface-glass)] backdrop-blur-sm rounded-lg p-4 border border-[var(--primary-border)]">
                      <div className="text-sm font-medium text-[var(--text-primary)] mb-2">
                        Teste Aqui
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mb-3">
                        Use Tab para navegar entre esses botões
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="primary" size="sm">
                          <House size={16} weight="fill" />
                          Home
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Compass size={16} weight="fill" />
                          Discover
                        </Button>
                        <Button variant="ghost" size="sm">
                          <User size={16} weight="fill" />
                          Profile
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Gear size={16} weight="fill" />
                          Settings
                        </Button>
                      </div>
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
