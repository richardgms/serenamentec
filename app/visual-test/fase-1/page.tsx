'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'
import { PageTransition } from '@/components/transitions/PageTransition'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Check } from 'phosphor-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface ColorSwatchProps {
  name: string
  hex: string
  varName?: string
  textColor?: string
}

const ColorSwatch = ({ name, hex, varName, textColor = '#FFFFFF' }: ColorSwatchProps) => (
  <div className="space-y-2">
    <div
      className="h-20 rounded-lg flex items-center justify-center font-mono text-sm font-semibold shadow-soft"
      style={{ backgroundColor: hex, color: textColor }}
    >
      {hex}
    </div>
    <div>
      <div className="text-sm font-medium text-[var(--text-primary)]">{name}</div>
      {varName && (
        <div className="text-xs text-[var(--text-tertiary)] font-mono mt-0.5">
          var(--{varName})
        </div>
      )}
    </div>
  </div>
)

interface TypographyExampleProps {
  label: string
  size: string
  weight: string
  className: string
}

const TypographyExample = ({ label, size, weight, className }: TypographyExampleProps) => (
  <div className="flex items-baseline gap-4 py-3 border-b border-[var(--primary-border)] last:border-0">
    <div className="w-32 flex-shrink-0">
      <div className="text-sm font-medium text-[var(--text-primary)]">{label}</div>
      <div className="text-xs text-[var(--text-tertiary)] mt-0.5">
        {size} / {weight}
      </div>
    </div>
    <div className={className}>
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
)

export default function Fase1TestPage() {
  const primaryColors = [
    { name: 'Primary', hex: '#7DD3C0', varName: 'primary' },
    { name: 'Primary Light', hex: '#A8E6D7', varName: 'primary-light' },
    { name: 'Primary Dark', hex: '#5FB8A8', varName: 'primary-dark' }
  ]

  const secondaryColors = [
    { name: 'Aqua Pastel', hex: '#B8DFD8', varName: 'accent-aqua' },
    { name: 'Pêssego Suave', hex: '#FFD6BA', varName: 'accent-warm' },
    { name: 'Azul Céu', hex: '#E8F4F8', varName: 'accent-calm' },
    { name: 'Verde Sálvia', hex: '#C8D5B9', varName: 'accent-sage' }
  ]

  const moodColors = [
    { name: 'Muito Mal', hex: '#FF8B94', textColor: '#2C3E50' },
    { name: 'Mal', hex: '#FFB4A2', textColor: '#2C3E50' },
    { name: 'Neutro', hex: '#E0E0E0', textColor: '#2C3E50' },
    { name: 'Bom', hex: '#B8DFD8', textColor: '#2C3E50' },
    { name: 'Muito Bom', hex: '#7DD3C0', textColor: '#FFFFFF' }
  ]

  const systemColors = [
    { name: 'Success', hex: '#6BCF7F', varName: 'success' },
    { name: 'Warning', hex: '#F5B461', varName: 'warning', textColor: '#2C3E50' },
    { name: 'Error', hex: '#FF8B94', varName: 'error' },
    { name: 'Info', hex: '#7DD3C0', varName: 'info' }
  ]

  const surfaceColors = {
    light: [
      { name: 'Surface Main', hex: '#F8FAFB', varName: 'surface-main', textColor: '#2C3E50' },
      { name: 'Surface Card', hex: '#FFFFFF', varName: 'surface-card', textColor: '#2C3E50' }
    ],
    dark: [
      { name: 'Surface Main (Dark)', hex: '#1A2332', varName: 'surface-main (dark)' },
      { name: 'Surface Card (Dark)', hex: '#243447', varName: 'surface-card (dark)' }
    ]
  }

  const textColors = {
    light: [
      { name: 'Primary', hex: '#2C3E50', varName: 'text-primary', textColor: '#FFFFFF' },
      { name: 'Secondary', hex: '#64748B', varName: 'text-secondary', textColor: '#FFFFFF' },
      { name: 'Tertiary', hex: '#8391A2', varName: 'text-tertiary', textColor: '#FFFFFF' }
    ],
    dark: [
      { name: 'Primary (Dark)', hex: '#F0F7FA', varName: 'text-primary (dark)', textColor: '#1A2332' },
      { name: 'Secondary (Dark)', hex: '#B5D0E4', varName: 'text-secondary (dark)', textColor: '#1A2332' },
      { name: 'Tertiary (Dark)', hex: '#8FA8BE', varName: 'text-tertiary (dark)', textColor: '#1A2332' }
    ]
  }

  const spacingScale = [
    { size: '0', value: '0px', name: 'none' },
    { size: '1', value: '4px', name: 'micro' },
    { size: '2', value: '8px', name: 'tight' },
    { size: '3', value: '12px', name: 'small' },
    { size: '4', value: '16px', name: 'normal' },
    { size: '6', value: '24px', name: 'loose' },
    { size: '8', value: '32px', name: 'xloose' },
    { size: '12', value: '48px', name: 'page' }
  ]

  const borderRadiusScale = [
    { name: 'sm', value: '8px', desc: 'Chips, badges' },
    { name: 'md', value: '12px', desc: 'Botões, inputs' },
    { name: 'lg', value: '16px', desc: 'Cards' },
    { name: 'xl', value: '24px', desc: 'Modals' },
    { name: 'full', value: '9999px', desc: 'Pills, avatars' }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--surface-main)]">
        <Header />

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Visual Test', href: '/visual-test' },
              { label: 'Fase 1: Fundação' }
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
                <Check size={20} weight="bold" className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  Fase 1
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                  Fundação do Design System
                </h1>
              </div>
            </div>
            <p className="text-[var(--text-secondary)]">
              Design tokens, paleta de cores, tipografia, sombras e sistema de espaçamento do Calm Organic Design.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Paleta Primária */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Cores Primárias
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Baseadas na logo da mandala/flor de lótus - turquesa orgânico que equilibra calma e renovação.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {primaryColors.map((color) => (
                    <ColorSwatch key={color.hex} {...color} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Cores Secundárias */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Cores Secundárias
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Paleta complementar que traz acolhimento, serenidade e conexão com a natureza.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {secondaryColors.map((color) => (
                    <ColorSwatch key={color.hex} {...color} textColor="#2C3E50" />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Escala de Mood */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Escala de Mood (Check-in Emocional)
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Cores suaves que representam estados emocionais sem estigmatizar ou alarmar.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {moodColors.map((color) => (
                    <ColorSwatch key={color.hex} {...color} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Cores de Sistema */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Cores de Sistema
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Estados de feedback: sucesso, aviso, erro e informação.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {systemColors.map((color) => (
                    <ColorSwatch key={color.hex} {...color} textColor={color.textColor} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Surfaces & Text */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Surfaces & Texto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Light Mode */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                      Modo Claro
                    </h3>
                    <div className="space-y-4">
                      {surfaceColors.light.map((color) => (
                        <ColorSwatch key={color.hex} {...color} />
                      ))}
                      {textColors.light.map((color) => (
                        <ColorSwatch key={color.hex} {...color} />
                      ))}
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                      Modo Escuro Morno
                    </h3>
                    <div className="space-y-4">
                      {surfaceColors.dark.map((color) => (
                        <ColorSwatch key={color.hex} {...color} />
                      ))}
                      {textColors.dark.map((color) => (
                        <ColorSwatch key={color.hex} {...color} />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tipografia */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Tipografia: Plus Jakarta Sans
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Geometria suave com terminações arredondadas. Escala 1.25 (Major Third) para hierarquia clara.
                </p>
                <div className="space-y-2">
                  <TypographyExample
                    label="Display"
                    size="39px"
                    weight="700"
                    className="text-4xl font-bold text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Heading 1"
                    size="31px"
                    weight="700"
                    className="text-3xl font-bold text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Heading 2"
                    size="25px"
                    weight="600"
                    className="text-2xl font-semibold text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Heading 3"
                    size="20px"
                    weight="600"
                    className="text-xl font-semibold text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Body"
                    size="16px"
                    weight="400"
                    className="text-base text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Small"
                    size="14px"
                    weight="400"
                    className="text-sm text-[var(--text-primary)]"
                  />
                  <TypographyExample
                    label="Caption"
                    size="12px"
                    weight="400"
                    className="text-xs text-[var(--text-primary)]"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Espaçamento */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Sistema de Espaçamento (4px base)
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Escala consistente para margins, paddings e gaps.
                </p>
                <div className="space-y-3">
                  {spacingScale.map((space) => (
                    <div key={space.size} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium text-[var(--text-primary)]">
                        {space.size}
                      </div>
                      <div
                        className="h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded"
                        style={{ width: space.value }}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-[var(--text-secondary)]">
                          {space.value} <span className="text-[var(--text-tertiary)]">• {space.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Border Radius */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Border Radius (Orgânico)
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Cantos arredondados que transmitem suavidade e acolhimento.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {borderRadiusScale.map((radius) => (
                    <div key={radius.name} className="space-y-3">
                      <div
                        className="h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]"
                        style={{ borderRadius: radius.value }}
                      />
                      <div>
                        <div className="text-sm font-medium text-[var(--text-primary)]">
                          {radius.name}
                        </div>
                        <div className="text-xs text-[var(--text-tertiary)]">
                          {radius.value}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">
                          {radius.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Shadow Examples */}
            <motion.div variants={itemVariants}>
              <Card variant="default">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Sombras (Multicamadas com tint turquesa)
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Elevação sutil que cria profundidade sem sobrecarregar visualmente.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['sm', 'md', 'lg', 'xl'].map((size) => (
                    <div key={size} className="space-y-3">
                      <div className={`h-24 bg-[var(--surface-card)] rounded-lg shadow-soft-${size} flex items-center justify-center`}>
                        <span className="text-sm font-medium text-[var(--text-tertiary)]">
                          {size}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] text-center">
                        shadow-soft-{size}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
