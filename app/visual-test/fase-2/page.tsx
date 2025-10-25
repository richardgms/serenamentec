'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/discover/ProgressBar'
import { IntensitySlider } from '@/components/profile/IntensitySlider'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Package, Heart, Warning, Trash, User } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Fase2TestPage() {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [progress, setProgress] = useState(65)
  const [intensity, setIntensity] = useState(3)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value.length > 0) {
      setInputError('')
    }
  }

  const handleInputBlur = () => {
    if (inputValue.length === 0) {
      setInputError('Este campo é obrigatório')
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 2: Componentes Base' }
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
                  Fase 2
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Componentes Base
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Button, Card, Input, Avatar, Badge, ProgressBar e componentes fundamentais do design system.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Buttons */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Button - 4 Variantes
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Com ripple effect, haptic feedback e estados hover/active/disabled.
                </p>

                {/* Primary */}
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Primary
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" size="sm">
                        <Heart size={16} weight="fill" />
                        Small
                      </Button>
                      <Button variant="primary" size="md">
                        <Heart size={20} weight="fill" />
                        Medium
                      </Button>
                      <Button variant="primary" size="lg">
                        <Heart size={24} weight="fill" />
                        Large
                      </Button>
                      <Button variant="primary" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>

                  {/* Secondary */}
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Secondary (Outline)
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="secondary" size="sm">
                        Small
                      </Button>
                      <Button variant="secondary" size="md">
                        Medium
                      </Button>
                      <Button variant="secondary" size="lg">
                        Large
                      </Button>
                      <Button variant="secondary" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>

                  {/* Ghost */}
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Ghost
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="ghost" size="sm">
                        Pular
                      </Button>
                      <Button variant="ghost" size="md">
                        Cancelar
                      </Button>
                      <Button variant="ghost" size="lg">
                        Voltar
                      </Button>
                      <Button variant="ghost" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>

                  {/* Danger */}
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Danger
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="danger" size="sm">
                        <Trash size={16} weight="fill" />
                        Excluir
                      </Button>
                      <Button variant="danger" size="md">
                        <Trash size={20} weight="fill" />
                        Excluir Conta
                      </Button>
                      <Button variant="danger" size="lg">
                        <Warning size={24} weight="fill" />
                        Ação Irreversível
                      </Button>
                      <Button variant="danger" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Cards */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Card - 3 Variantes
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Default (soft elevation), Glass (glassmorphism) e Elevated (shadow pronunciada).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="default" hover="lift">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        Default
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Soft elevation com sombras multicamadas e tint turquesa.
                      </p>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono">
                        variant=&quot;default&quot;
                      </div>
                    </div>
                  </Card>

                  <Card variant="glass" hover="scale">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        Glass
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Glassmorphism com backdrop-blur e transparência.
                      </p>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono">
                        variant=&quot;glass&quot;
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated" hover="glow">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        Elevated
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        XL elevation para elementos importantes.
                      </p>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono">
                        variant=&quot;elevated&quot;
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </motion.div>

            {/* Inputs */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Input - Estados
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Normal, focus, error e disabled com transições suaves.
                </p>

                <div className="space-y-4 max-w-md">
                  <Input
                    label="Nome completo"
                    placeholder="Digite seu nome"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    error={inputError}
                  />

                  <Input
                    label="Email (disabled)"
                    placeholder="email@example.com"
                    value="user@serenamente.com"
                    disabled
                  />

                  <Input
                    label="Senha (error state)"
                    type="password"
                    placeholder="••••••••"
                    error="A senha deve ter no mínimo 8 caracteres"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Avatar */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Avatar - 5 Tamanhos
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Com border e shadow consistentes. Suporta imagens e fallback de iniciais.
                </p>

                <div className="flex flex-wrap items-end gap-6">
                  <div className="text-center space-y-2">
                    <Avatar
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      size="xs"
                      fallback="XS"
                    />
                    <div className="text-xs text-[var(--text-tertiary)]">24px</div>
                  </div>

                  <div className="text-center space-y-2">
                    <Avatar
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      size="sm"
                      fallback="SM"
                    />
                    <div className="text-xs text-[var(--text-tertiary)]">32px</div>
                  </div>

                  <div className="text-center space-y-2">
                    <Avatar
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      size="md"
                      fallback="MD"
                    />
                    <div className="text-xs text-[var(--text-tertiary)]">40px</div>
                  </div>

                  <div className="text-center space-y-2">
                    <Avatar
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      size="lg"
                      fallback="LG"
                    />
                    <div className="text-xs text-[var(--text-tertiary)]">64px</div>
                  </div>

                  <div className="text-center space-y-2">
                    <Avatar
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      size="xl"
                      fallback="XL"
                    />
                    <div className="text-xs text-[var(--text-tertiary)]">96px</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Badge - Cores e Variantes
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Para conquistas, notificações e status indicators.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default (Primary)</Badge>
                  <Badge variant="success">Completo (Success)</Badge>
                  <Badge variant="warning">Em progresso (Warning)</Badge>
                  <Badge variant="error">Erro (Error)</Badge>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                    Com ícones
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="success">
                      <Heart size={14} weight="fill" />
                      Favorito
                    </Badge>
                    <Badge variant="default">
                      <User size={14} weight="fill" />
                      Perfil
                    </Badge>
                    <Badge variant="warning">
                      <Warning size={14} weight="fill" />
                      Atenção
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ProgressBar */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  ProgressBar - Orgânico
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Com gradiente suave, glow e animação fluida.
                </p>

                <div className="space-y-6 max-w-2xl">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--text-primary)]">Progresso atual</span>
                      <span className="text-[var(--text-secondary)]">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} />
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        -10%
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        +10%
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-[var(--text-primary)] mb-2">
                      Diferentes valores
                    </div>
                    <div className="space-y-3">
                      <ProgressBar value={25} showLabel />
                      <ProgressBar value={50} showLabel />
                      <ProgressBar value={75} showLabel />
                      <ProgressBar value={100} showLabel />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* IntensitySlider */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  IntensitySlider - Range Input
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Slider customizado para intensidade de crises (1-5) com cores graduais.
                </p>

                <div className="max-w-md">
                  <IntensitySlider
                    value={intensity}
                    onChange={setIntensity}
                  />
                  <div className="mt-4 text-center">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Intensidade atual:{' '}
                      <span className="font-semibold text-[var(--text-primary)]">
                        {intensity} de 5
                      </span>
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Interactive Demo */}
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="bg-gradient-to-br from-[var(--primary-bg)] to-transparent">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
                    <Package size={32} weight="duotone" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      Componentes Prontos para Uso
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
                      Todos os componentes base estão documentados, acessíveis e otimizados para performance.
                      Use-os como blocos de construção para criar experiências consistentes.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="primary">
                      Testar Ripple Effect
                    </Button>
                    <Button variant="secondary">
                      Ver Documentação
                    </Button>
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
