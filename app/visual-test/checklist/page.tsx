'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/discover/ProgressBar'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { useUIStore } from '@/lib/store/uiStore'
import { ClipboardText, CheckCircle, Circle, Download, ArrowCounterClockwise } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface CheckItem {
  id: string
  label: string
  description?: string
}

interface CheckSection {
  title: string
  items: CheckItem[]
}

export default function ChecklistPage() {
  const { showToast } = useUIStore()
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const sections: CheckSection[] = [
    {
      title: 'Acessibilidade',
      items: [
        { id: 'a1', label: 'Lighthouse Accessibility >= 95 em 5 páginas principais', description: 'Home, Breathe, Calm, Discover, Profile' },
        { id: 'a2', label: 'Zero erros de contraste WCAG AA', description: 'Ratio mínimo 4.5:1 para texto normal' },
        { id: 'a3', label: '100% dos fluxos navegáveis por teclado', description: 'Tab, Shift+Tab, Enter, Space, Esc' },
        { id: 'a4', label: 'Screen reader anuncia todas as interações críticas', description: 'Testar com NVDA ou VoiceOver' },
        { id: 'a5', label: 'Focus rings visíveis em todos os elementos interativos', description: 'Ring-2 com ring-primary' },
        { id: 'a6', label: 'Aria-labels em componentes dinâmicos', description: 'Toast, Spinner, Breadcrumb, IntensitySlider' }
      ]
    },
    {
      title: 'Microinterações',
      items: [
        { id: 'm1', label: 'Ripple effects funcionam em 95%+ dos devices', description: 'Clique em botões primários e secundários' },
        { id: 'm2', label: 'Haptic feedback vibra em mobile (HTTPS)', description: 'Testar em iPhone e Android' },
        { id: 'm3', label: 'Pull-to-refresh funciona em iOS e Android', description: 'Testar em /profile/history, /crisis-log, /achievements' },
        { id: 'm4', label: 'Hover states funcionais em desktop', description: 'VideoCard, JourneyCard, Card base' },
        { id: 'm5', label: 'Shimmer animation não causa performance issues', description: 'Monitorar FPS durante loading skeletons' },
        { id: 'm6', label: 'Toast system 100% funcional', description: 'Testar 4 tipos: success, error, warning, info' },
        { id: 'm7', label: 'Empty states aparecem corretamente', description: 'Testar 5 contextos diferentes' },
        { id: 'm8', label: 'Celebrations animam sem lag', description: 'Confetti e sparkles em conquistas' }
      ]
    },
    {
      title: 'Cross-Device',
      items: [
        { id: 'd1', label: 'Chrome/Edge 90+ (Windows/Mac)', description: 'Testar navegação e animações' },
        { id: 'd2', label: 'Firefox 88+ (Windows/Mac)', description: 'Verificar compatibilidade CSS' },
        { id: 'd3', label: 'Safari 14+ (Mac)', description: 'Testar backdrop-filter e glassmorphism' },
        { id: 'd4', label: 'Safari iOS 14+ (iPhone)', description: 'Testar touch interactions' },
        { id: 'd5', label: 'Chrome Android 90+', description: 'Testar haptic e pull-to-refresh' },
        { id: 'd6', label: 'Resoluções: 320px, 375px, 390px, 428px', description: 'Testar responsive em diferentes tamanhos' }
      ]
    },
    {
      title: 'Performance',
      items: [
        { id: 'p1', label: 'LCP (Largest Contentful Paint) < 2.5s', description: 'Core Web Vital' },
        { id: 'p2', label: 'FID (First Input Delay) < 100ms', description: 'Core Web Vital' },
        { id: 'p3', label: 'CLS (Cumulative Layout Shift) < 0.1', description: 'Core Web Vital' },
        { id: 'p4', label: 'FPS >= 55 durante animações complexas', description: 'Confetti, shimmer, page transitions' },
        { id: 'p5', label: 'Bundle size < 300KB (gzipped)', description: 'Verificar com npm run build' },
        { id: 'p6', label: 'Framer Motion tree-shaking OK', description: 'Importar apenas componentes usados' }
      ]
    },
    {
      title: 'Regressão',
      items: [
        { id: 'r1', label: 'Login/Logout funcionam', description: 'Testar fluxo completo com Clerk' },
        { id: 'r2', label: 'Navegação entre páginas', description: 'Todas as 17 páginas acessíveis' },
        { id: 'r3', label: 'Formulários submitam corretamente', description: 'Crisis log, edit profile, settings' },
        { id: 'r4', label: 'Dark mode toggle funciona', description: 'Alternar e verificar todas as cores' },
        { id: 'r5', label: 'Dados persistem (localStorage)', description: 'Refresh da página mantém estado' },
        { id: 'r6', label: 'API calls funcionam', description: 'Verificar network tab no DevTools' }
      ]
    }
  ]

  const handleToggle = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleReset = () => {
    setCheckedItems(new Set())
    showToast('Checklist resetado', 'info')
  }

  const handleExport = () => {
    const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0)
    const checkedCount = checkedItems.size
    const percentage = Math.round((checkedCount / totalItems) * 100)

    let markdown = `# Relatório de QA - Serenamente\n\n`
    markdown += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n`
    markdown += `**Progresso:** ${checkedCount}/${totalItems} (${percentage}%)\n\n`

    sections.forEach(section => {
      markdown += `## ${section.title}\n\n`
      section.items.forEach(item => {
        const checked = checkedItems.has(item.id) ? 'x' : ' '
        markdown += `- [${checked}] ${item.label}\n`
        if (item.description) {
          markdown += `  > ${item.description}\n`
        }
      })
      markdown += '\n'
    })

    // Copy to clipboard
    navigator.clipboard.writeText(markdown)
    showToast('Relatório copiado para clipboard!', 'success')
  }

  const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0)
  const checkedCount = checkedItems.size
  const percentage = Math.round((checkedCount / totalItems) * 100)

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Checklist de QA' }
            ]}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6BCF7F] to-[var(--primary)] flex items-center justify-center">
                <ClipboardText size={20} weight="duotone" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 7
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Checklist de QA Completo
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Acessibilidade, performance, cross-device e validação final do sistema Calm Organic Design.
            </p>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" className="bg-gradient-to-br from-[var(--primary-bg)] to-transparent">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-1">
                      Progresso Total
                    </div>
                    <div className="text-3xl font-bold text-[var(--text-primary)]">
                      {checkedCount} / {totalItems}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-[var(--primary)]">
                      {percentage}%
                    </div>
                  </div>
                </div>

                <ProgressBar value={percentage} />

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleExport}
                  >
                    <Download size={16} weight="bold" />
                    Exportar Relatório
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                  >
                    <ArrowCounterClockwise size={16} weight="bold" />
                    Resetar
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Checklist Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {sections.map((section) => {
              const sectionChecked = section.items.filter(item => checkedItems.has(item.id)).length
              const sectionTotal = section.items.length
              const sectionPercentage = Math.round((sectionChecked / sectionTotal) * 100)

              return (
                <motion.div key={section.title} variants={itemVariants}>
                  <Card variant="default">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                        {section.title}
                      </h2>
                      <div className="text-sm text-[var(--text-secondary)]">
                        {sectionChecked}/{sectionTotal} ({sectionPercentage}%)
                      </div>
                    </div>

                    <div className="space-y-3">
                      {section.items.map((item) => {
                        const isChecked = checkedItems.has(item.id)

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggle(item.id)}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-glass)] cursor-pointer transition-colors group"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isChecked ? (
                                <CheckCircle
                                  size={20}
                                  weight="fill"
                                  className="text-[#6BCF7F]"
                                />
                              ) : (
                                <Circle
                                  size={20}
                                  weight="regular"
                                  className="text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors"
                                />
                              )}
                            </div>

                            <div className="flex-1">
                              <div
                                className={`text-sm font-medium ${
                                  isChecked
                                    ? 'text-[var(--text-tertiary)] line-through'
                                    : 'text-[var(--text-primary)]'
                                }`}
                              >
                                {item.label}
                              </div>
                              {item.description && (
                                <div className="text-xs text-[var(--text-secondary)] mt-1">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
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
                  Baseado em CHECKLIST_FASE_7_QA.md
                </div>
                <p className="text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Este checklist cobre todos os aspectos críticos de qualidade: acessibilidade WCAG AA,
                  microinterações, compatibilidade cross-device, performance e testes de regressão.
                </p>
                <div className="text-xs text-[var(--text-tertiary)]">
                  docs/visual/CHECKLIST_FASE_7_QA.md
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
