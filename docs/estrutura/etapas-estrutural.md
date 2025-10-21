# 🏗️ Etapas de Implementação - Reestruturação Serenamente

## Guia de Prompts para Implementação da Arquitetura Profissional

**Versão:** 1.0  
**Data:** 21 de Outubro de 2025  
**Baseado em:** analise-estrutural.md + patterns-estruturais.md + plano-estrutural.md

---

## **CONTEXTO PARA CADA SESSÃO**

```markdown
Estou reestruturando a arquitetura do Serenamente para nível profissional.

**Documentação:**
- Análise: docs/estrutura/analise-estrutural.md
- Patterns: docs/estrutura/patterns-estruturais.md
- Plano: docs/estrutura/plano-estrutural.md
- Design Tokens: docs/visual/design-tokens.ts (para styling)

**Objetivos:**
- Estrutura HTML semântica
- Fluxos de usuário otimizados
- Personalização baseada em contexto
- Gamificação integrada
- Empty/Loading/Success states profissionais

**Princípios:**
- Progressive disclosure
- Context-aware
- Frictionless flow
- Emotional design
- Mobile-first

**IMPORTANTE:** Manter funcionalidades existentes, apenas melhorar estrutura e UX.

Estou na etapa: [NOME DA ETAPA]
```

---

## **FASE 0: PREPARAÇÃO** (Semana 0)

### **Prompt 0.1 - Auditoria Estrutural**
```markdown
ANTES de começar a reestruturação, auditar estrutura atual:

Mapear:
[ ] Fluxos existentes (quais páginas → quais páginas)
[ ] Componentes reutilizáveis atuais
[ ] Padrões de navegação
[ ] Estados de loading/empty/error implementados
[ ] Sistema de feedback (toasts, celebrações, etc)

Criar documento: `AUDITORIA_ATUAL.md` listando:
- ✅ O que já funciona bem
- ⚠️ O que precisa refatoração
- ❌ O que está ausente

IMPORTANTE: Esta auditoria guiará decisões de "manter" vs "refatorar" vs "criar novo"
```

### **Prompt 0.2 - Feature Flags**
```markdown
Criar sistema de feature flags para migração gradual.

CRIAR arquivo `lib/features/flags.ts`:

```typescript
export const FEATURE_FLAGS = {
  USE_NEW_LANDING: process.env.NEXT_PUBLIC_NEW_LANDING === 'true',
  USE_NEW_AUTH: process.env.NEXT_PUBLIC_NEW_AUTH === 'true',
  USE_NEW_ONBOARDING: process.env.NEXT_PUBLIC_NEW_ONBOARDING === 'true',
  USE_NEW_HOME: process.env.NEXT_PUBLIC_NEW_HOME === 'true',
  USE_NEW_BREATHING: process.env.NEXT_PUBLIC_NEW_BREATHING === 'true',
  USE_NEW_PROFILE: process.env.NEXT_PUBLIC_NEW_PROFILE === 'true',
  USE_GAMIFICATION: process.env.NEXT_PUBLIC_GAMIFICATION === 'true',
  USE_RECOMMENDATIONS: process.env.NEXT_PUBLIC_RECOMMENDATIONS === 'true',
} as const

export function useFeatureFlag(flag: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[flag]
}
```

ADICIONAR em `.env.local`:
```
NEXT_PUBLIC_NEW_LANDING=false
NEXT_PUBLIC_NEW_AUTH=false
NEXT_PUBLIC_NEW_ONBOARDING=false
# ... todas como false inicialmente
```

**Uso:**
```tsx
import { useFeatureFlag } from '@/lib/features/flags'

export default function HomePage() {
  const useNewHome = useFeatureFlag('USE_NEW_HOME')
  
  if (useNewHome) {
    return <NewHomePage />
  }
  
  return <OldHomePage />
}
```

**Checklist:**
[ ] flags.ts criado
[ ] .env.local configurado
[ ] Hook useFeatureFlag testado
```

---

## **FASE 1: LANDING & AUTH** (Semana 1)

### **Prompt 1.1 - Landing Page**
```markdown
CRIAR nova Landing Page profissional em app/(marketing)/page.tsx

**ESTRUTURA:**

```tsx
// app/(marketing)/page.tsx
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FinalCTASection } from '@/components/landing/FinalCTASection'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface-main">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
```

**CRIAR components/landing/HeroSection.tsx:**

```typescript
'use client'

import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(125, 211, 192, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(184, 223, 216, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Sua mente merece cuidado
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Ferramentas baseadas em ciência para ansiedade, 
            sono e bem-estar emocional
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/cadastrar">
              <Button size="lg" className="w-full sm:w-auto">
                Começar gratuitamente
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                Ver como funciona
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar
                  key={i}
                  src={`/testimonials/user-${i}.jpg`}
                  fallback={`U${i}`}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-text-secondary">
              +10.000 pessoas já melhoraram sua saúde mental
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**CRIAR components/landing/FeaturesSection.tsx:**

```typescript
import { Card } from '@/components/ui/Card'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Wind, VideoCamera, Book, Trophy, Heart, Brain } from '@/lib/constants/icons'

const features = [
  {
    icon: Wind,
    title: 'Respiração Guiada',
    description: 'Técnicas comprovadas para reduzir ansiedade em minutos',
  },
  {
    icon: VideoCamera,
    title: 'Vídeos Relaxantes',
    description: 'Conteúdo curado para acalmar sua mente naturalmente',
  },
  {
    icon: Book,
    title: 'Jornadas de Autoconhecimento',
    description: 'Aprenda sobre sua mente passo a passo',
  },
  {
    icon: Trophy,
    title: 'Gamificação Saudável',
    description: 'Conquistas e progresso para manter motivação',
  },
  {
    icon: Heart,
    title: 'Acompanhamento Diário',
    description: 'Registre seu humor e veja padrões ao longo do tempo',
  },
  {
    icon: Brain,
    title: 'Baseado em Ciência',
    description: 'Todas ferramentas são validadas por pesquisas',
  },
]

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 bg-primary/5">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Recursos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ferramentas cientificamente comprovadas para cuidar da sua saúde mental
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-primary/10">
                  <OptimizedIcon
                    icon={feature.icon}
                    size={32}
                    weight="duotone"
                    className="text-primary"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Checklist:**
[ ] Landing page criada
[ ] Hero section com CTAs
[ ] Features grid 3 colunas
[ ] Social proof visível
[ ] Responsive (mobile → desktop)
[ ] Animações suaves
```

### **Prompt 1.2 - Auth Layout (Split)**
```markdown
CRIAR layout de autenticação profissional split 40/60.

**CRIAR app/(auth)/layout.tsx:**

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (40%) */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">Serenamente</h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Cuide da sua mente com carinho
            </h2>
            <p className="text-lg text-white/80">
              Ferramentas baseadas em ciência para ansiedade, 
              sono e bem-estar emocional
            </p>
          </div>

          {/* Testimonial */}
          <div className="space-y-2">
            <p className="text-lg italic">
              "Mudou completamente minha relação com ansiedade"
            </p>
            <p className="text-sm text-white/70">
              - Ana, 32 anos
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form (60%) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-main">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
```

**CRIAR app/(auth)/entrar/page.tsx:**

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-text-secondary">
          Entre para continuar sua jornada
        </p>
      </div>

      {/* Clerk Sign In Component (estilizado) */}
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary-dark',
            card: 'shadow-none',
            // Personalizar mais se necessário
          },
        }}
        routing="path"
        path="/entrar"
        signUpUrl="/cadastrar"
      />

      {/* Alternative: Social Logins */}
      {/* Se quiser customizar completamente:
      <div className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          icon={GoogleLogo}
        >
          Continuar com Google
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          icon={AppleLogo}
        >
          Continuar com Apple
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-light" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface-main text-text-tertiary">
            ou
          </span>
        </div>
      </div>

      <form className="space-y-4">
        <Input
          type="email"
          label="Email"
          placeholder="seu@email.com"
          required
        />
        <Input
          type="password"
          label="Senha"
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-end">
          <Link
            href="/esqueci-senha"
            className="text-sm text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" size="lg" fullWidth>
          Entrar
        </Button>
      </form>
      */}

      {/* Toggle to Sign Up */}
      <div className="text-center text-sm">
        <span className="text-text-secondary">
          Não tem uma conta?{' '}
        </span>
        <Link
          href="/cadastrar"
          className="font-semibold text-primary hover:underline"
        >
          Criar conta
        </Link>
      </div>
    </div>
  )
}
```

**Checklist:**
[ ] Layout split 40/60
[ ] Panel esquerdo com branding
[ ] Panel direito com form
[ ] Responsive (mobile: apenas form)
[ ] Clerk integrado
[ ] Toggle entre sign-in/sign-up
```

---

## **FASE 2: APP SHELL & CORE** (Semana 2)

### **Prompt 2.1 - App Shell + Bottom Navigation**
```markdown
CRIAR App Shell profissional com Bottom Navigation.

**CRIAR components/layouts/AppShell.tsx:**

```typescript
'use client'

import { usePathname } from 'next/navigation'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { PageTransition } from '@/components/transitions/PageTransition'
import { ToastManager } from '@/components/feedback/ToastManager'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Páginas que não devem ter app shell
  const isAuthPage = pathname.startsWith('/entrar') || 
                     pathname.startsWith('/cadastrar')
  const isLandingPage = pathname === '/'
  const isFullscreenPage = pathname.includes('/sessao')

  if (isAuthPage || isLandingPage || isFullscreenPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-surface-main">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="pb-20 pt-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Toast Manager */}
      <ToastManager />
    </div>
  )
}
```

**CRIAR components/layouts/BottomNav.tsx:**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Wind, Compass, User } from '@/lib/constants/icons'
import { clsx } from 'clsx'

const navItems = [
  {
    href: '/inicio',
    icon: House,
    label: 'Início',
    activePattern: /^\/inicio/,
  },
  {
    href: '/respirar',
    icon: Wind,
    label: 'Respirar',
    activePattern: /^\/respirar/,
  },
  {
    href: '/descobrir',
    icon: Compass,
    label: 'Descobrir',
    activePattern: /^\/descobrir/,
  },
  {
    href: '/perfil',
    icon: User,
    label: 'Perfil',
    activePattern: /^\/perfil/,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-card border-t border-border-subtle">
      <div className="max-w-[428px] mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.activePattern.test(pathname)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center justify-center',
                  'flex-1 h-full space-y-1',
                  'transition-colors duration-150',
                  isActive
                    ? 'text-primary'
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                <Icon
                  size={24}
                  weight={isActive ? 'fill' : 'regular'}
                />
                <span className="text-xs font-medium">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
```

**CRIAR components/layouts/TopBar.tsx:**

```typescript
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { IconButton } from '@/components/ui/IconButton'
import { Sun, Moon, Bell, ArrowLeft } from '@/lib/constants/icons'
import { useTheme } from '@/lib/design/theme'
import { useUser } from '@/lib/hooks/useUser'

export function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { user } = useUser()

  // Determine se precisa de back button
  const needsBackButton = !['/inicio', '/respirar', '/descobrir', '/perfil'].includes(pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-main/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-[428px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center">
          {needsBackButton ? (
            <IconButton
              icon={ArrowLeft}
              onClick={() => router.back()}
              label="Voltar"
            />
          ) : (
            <Avatar
              src={user?.photoURL}
              name={user?.name}
              size="sm"
              onClick={() => router.push('/perfil')}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* Center - Page Title (opcional) */}
        <div className="flex-1 text-center">
          {/* Pode adicionar título da página aqui */}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <IconButton
            icon={Bell}
            label="Notificações"
            // badge={unreadCount}
          />
          <IconButton
            icon={resolvedTheme === 'dark' ? Sun : Moon}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            label="Alternar tema"
          />
        </div>
      </div>
    </header>
  )
}
```

**APLICAR AppShell em app/(app)/layout.tsx:**

```typescript
import { AppShell } from '@/components/layouts/AppShell'

export default function AppLayout({
  children,
}: {
  children: React.Node
}) {
  return <AppShell>{children}</AppShell>
}
```

**Checklist:**
[ ] AppShell criado
[ ] Bottom Nav com 4 itens
[ ] TopBar com avatar + theme toggle
[ ] Navegação funcional
[ ] Active states corretos
[ ] Responsive
```

### **Prompt 2.2 - Onboarding Flow Completo**
```markdown
REFATORAR onboarding para fluxo progressivo e engajador.

**CRIAR components/flows/OnboardingFlow.tsx:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/discover/ProgressBar'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

type Step =
  | 'welcome'
  | 'name'
  | 'goal'
  | 'experience'
  | 'time'
  | 'notifications'
  | 'complete'

const TOTAL_STEPS = 5 // Excluindo welcome e complete

interface OnboardingData {
  name: string
  goal: 'anxiety' | 'sleep' | 'mood' | 'mindfulness' | null
  experience: 'never' | 'little' | 'regular' | null
  preferredTime: ('morning' | 'afternoon' | 'evening')[]
  notifications: boolean
}

export function OnboardingFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [data, setData] = useState<OnboardingData>({
    name: '',
    goal: null,
    experience: null,
    preferredTime: [],
    notifications: false,
  })

  const handleNext = () => {
    const steps: Step[] = [
      'welcome',
      'name',
      'goal',
      'experience',
      'time',
      'notifications',
      'complete',
    ]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: Step[] = [
      'welcome',
      'name',
      'goal',
      'experience',
      'time',
      'notifications',
      'complete',
    ]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleComplete = async () => {
    // Salvar dados do onboarding
    await fetch('/api/user/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    // Redirecionar para home
    router.push('/inicio')
  }

  const getStepNumber = (): number => {
    const numberedSteps = ['name', 'goal', 'experience', 'time', 'notifications']
    return numberedSteps.indexOf(currentStep) + 1
  }

  return (
    <div className="min-h-screen bg-surface-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="text-6xl">👋</div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-4">
                  Olá! Que bom te ver aqui
                </h1>
                <p className="text-lg text-text-secondary max-w-sm mx-auto">
                  Vamos conhecer você melhor para criar uma 
                  experiência personalizada. Leva só 2 minutos.
                </p>
              </div>

              <Card className="p-4 flex items-center justify-center gap-4">
                <span className="text-2xl">⏱️</span>
                <div className="text-left">
                  <p className="font-semibold text-text-primary">~2 minutos</p>
                  <p className="text-sm text-text-secondary">5 perguntas</p>
                </div>
              </Card>

              <Button size="lg" fullWidth onClick={handleNext}>
                Vamos lá!
              </Button>
            </motion.div>
          )}

          {/* Numbered Steps */}
          {['name', 'goal', 'experience', 'time', 'notifications'].includes(currentStep) && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={handleBack}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    ← Voltar
                  </button>
                  <span className="text-text-tertiary">
                    {getStepNumber()}/{TOTAL_STEPS}
                  </span>
                </div>
                <ProgressBar value={(getStepNumber() / TOTAL_STEPS) * 100} />
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {renderStepContent(currentStep, data, setData)}
              </div>

              {/* Continue Button */}
              <Button
                size="lg"
                fullWidth
                onClick={handleNext}
                disabled={!isStepValid(currentStep, data)}
              >
                Continuar
              </Button>
            </motion.div>
          )}

          {/* Complete Screen */}
          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="text-6xl">🎉</div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-4">
                  Tudo pronto, {data.name}!
                </h1>
                <p className="text-lg text-text-secondary">
                  Preparamos um plano personalizado focado em{' '}
                  {getGoalLabel(data.goal)}. Vamos começar?
                </p>
              </div>

              <Card className="p-6 text-left space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">💨</div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      Comece com respiração
                    </h3>
                    <p className="text-sm text-text-secondary">
                      5 minutos de exercício guiado
                    </p>
                  </div>
                </div>
              </Card>

              <Button size="lg" fullWidth onClick={handleComplete}>
                Ir para o app
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function renderStepContent(
  step: Step,
  data: OnboardingData,
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>
) {
  switch (step) {
    case 'name':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">
            Como podemos te chamar?
          </h2>
          <Input
            placeholder="Seu primeiro nome"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            autoFocus
          />
          <p className="text-sm text-text-secondary">
            Usaremos isso para personalizar sua experiência
          </p>
        </div>
      )

    case 'goal':
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">
            O que te trouxe aqui?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'anxiety', emoji: '😰', label: 'Controlar ansiedade' },
              { value: 'mood', emoji: '😔', label: 'Melhorar humor' },
              { value: 'sleep', emoji: '😴', label: 'Dormir melhor' },
              { value: 'mindfulness', emoji: '🧘', label: 'Praticar mindfulness' },
            ].map((option) => (
              <Card
                key={option.value}
                clickable
                className={clsx(
                  'p-6 text-center cursor-pointer',
                  data.goal === option.value && 'ring-2 ring-primary bg-primary/5'
                )}
                onClick={() => setData({ ...data, goal: option.value as any })}
              >
                <div className="text-4xl mb-2">{option.emoji}</div>
                <p className="text-sm font-medium">{option.label}</p>
              </Card>
            ))}
          </div>
        </div>
      )

    // ... implementar outros steps

    default:
      return null
  }
}

function isStepValid(step: Step, data: OnboardingData): boolean {
  switch (step) {
    case 'name':
      return data.name.length > 0
    case 'goal':
      return data.goal !== null
    // ... outros steps
    default:
      return true
  }
}

function getGoalLabel(goal: OnboardingData['goal']): string {
  const labels = {
    anxiety: 'controlar ansiedade',
    mood: 'melhorar humor',
    sleep: 'dormir melhor',
    mindfulness: 'praticar mindfulness',
  }
  return goal ? labels[goal] : 'autocuidado'
}
```

**USAR em app/boas-vindas/page.tsx:**

```typescript
import { OnboardingFlow } from '@/components/flows/OnboardingFlow'

export default function WelcomePage() {
  return <OnboardingFlow />
}
```

**Checklist:**
[ ] Onboarding flow criado
[ ] Welcome screen
[ ] 5 perguntas progressivas
[ ] Progress bar
[ ] Back navigation
[ ] Completion screen personalizada
[ ] Dados salvos no backend
[ ] Redirect para /inicio
```

---

## **FASE 3: HOME PERSONALIZADA** (Semana 5)

### **Prompt 3.1 - Greeting Dinâmico**

```markdown
Criar greeting section com saudação personalizada baseada em:
- Hora do dia
- Nome do usuário
- Objetivo do onboarding
- Streak atual

**CRIAR NOVO:** components/home/GreetingSection.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useUser } from '@/lib/hooks/useUser'
import { motion } from 'framer-motion'

export function GreetingSection() {
  const { user } = useUser()
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const getMotivationalMessage = () => {
    const goal = user?.goal
    const messages = {
      anxiety: 'Vamos respirar juntos hoje?',
      mood: 'Que tal um momento de calma?',
      sleep: 'Prepare-se para uma noite tranquila',
      mindfulness: 'Vamos praticar presença?',
    }
    return goal ? messages[goal] : 'Como você está se sentindo?'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {getGreeting()}, {user?.name?.split(' ')[0] || 'amigo'}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {getMotivationalMessage()}
      </p>
    </motion.div>
  )
}
```

**USAR em app/home/page.tsx:**
Substituir heading estático por `<GreetingSection />`

**Checklist:**
[ ] Greeting muda com hora do dia
[ ] Nome do usuário aparece
[ ] Mensagem baseada em objetivo
[ ] Animação suave
```

---

### **Prompt 3.2 - Recommended Section**

```markdown
Criar seção de recomendações personalizadas baseadas em:
- Objetivo do usuário
- Histórico de uso
- Hora do dia
- Padrões de ansiedade (se relevante)

**CRIAR NOVO:** components/home/RecommendedSection.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useUser } from '@/lib/hooks/useUser'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { Wind, Video, Brain } from 'lucide-react'

interface Recommendation {
  id: string
  title: string
  description: string
  icon: any
  href: string
  reason: string
}

export function RecommendedSection() {
  const { user } = useUser()
  const router = useRouter()

  const getRecommendations = (): Recommendation[] => {
    const hour = new Date().getHours()
    const goal = user?.goal

    // Recomendações baseadas em contexto
    if (hour >= 6 && hour < 12 && goal === 'anxiety') {
      return [{
        id: 'morning-breath',
        title: 'Respiração Matinal',
        description: 'Comece o dia com calma',
        icon: Wind,
        href: '/breathe/session?pattern=BOX',
        reason: 'Ideal para começar o dia com menos ansiedade'
      }]
    }

    if (hour >= 21 && goal === 'sleep') {
      return [{
        id: 'sleep-video',
        title: 'Vídeo para Dormir',
        description: 'Relaxe antes de dormir',
        icon: Video,
        href: '/calm',
        reason: 'Prepare seu corpo para uma noite tranquila'
      }]
    }

    // Recomendação padrão baseada em objetivo
    const defaults = {
      anxiety: {
        id: 'breathe',
        title: 'Exercício de Respiração',
        description: '5 minutos para se acalmar',
        icon: Wind,
        href: '/breathe',
        reason: 'Ajuda a controlar ansiedade'
      },
      mindfulness: {
        id: 'journey',
        title: 'Jornada de Autoconhecimento',
        description: 'Continue sua exploração',
        icon: Brain,
        href: '/discover/journeys',
        reason: 'Aprofunde seu autoconhecimento'
      }
    }

    return [defaults[goal] || defaults.anxiety]
  }

  const recommendations = getRecommendations()

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Recomendado para você
      </h2>
      
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const Icon = rec.icon
          return (
            <Card
              key={rec.id}
              onClick={() => router.push(rec.href)}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {rec.description}
                  </p>
                  <p className="text-xs text-primary mt-2">
                    💡 {rec.reason}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
```

**Checklist:**
[ ] Recomendações mudam com hora do dia
[ ] Recomendações baseadas em objetivo
[ ] Razão da recomendação explicada
[ ] Navegação funciona
```

---

### **Prompt 3.3 - Continue Section**

```markdown
Criar seção "Continue de onde parou" mostrando:
- Última jornada em progresso
- Última sessão de respiração
- Últimos vídeos assistidos

**CRIAR NOVO:** components/home/ContinueSection.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/discover/ProgressBar'
import { useRouter } from 'next/navigation'
import { Route, Clock } from 'lucide-react'

interface ContinueItem {
  type: 'journey' | 'breathing' | 'video'
  id: string
  title: string
  progress?: number
  lastAccessed: Date
}

export function ContinueSection() {
  const [items, setItems] = useState<ContinueItem[]>([])
  const router = useRouter()

  useEffect(() => {
    // Buscar itens em progresso
    Promise.all([
      fetch('/api/journeys/progress').then(r => r.ok ? r.json() : null),
      fetch('/api/videos/history?limit=1').then(r => r.ok ? r.json() : null),
    ]).then(([journeys, videos]) => {
      const continueItems: ContinueItem[] = []

      // Adicionar jornada em progresso
      if (journeys?.inProgress?.length > 0) {
        const journey = journeys.inProgress[0]
        continueItems.push({
          type: 'journey',
          id: journey.id,
          title: journey.title,
          progress: journey.progress,
          lastAccessed: new Date(journey.lastAccessed)
        })
      }

      // Adicionar último vídeo
      if (videos?.length > 0) {
        const video = videos[0]
        continueItems.push({
          type: 'video',
          id: video.id,
          title: video.title,
          lastAccessed: new Date(video.watchedAt)
        })
      }

      setItems(continueItems.sort((a, b) => 
        b.lastAccessed.getTime() - a.lastAccessed.getTime()
      ).slice(0, 2))
    })
  }, [])

  if (items.length === 0) return null

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Continue de onde parou
      </h2>
      
      <div className="space-y-3">
        {items.map((item) => (
          <Card
            key={item.id}
            onClick={() => {
              if (item.type === 'journey') router.push(`/discover/journeys/${item.id}`)
              if (item.type === 'video') router.push(`/calm/${item.id}`)
            }}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                {item.type === 'journey' && <Route className="w-5 h-5 text-secondary" />}
                {item.type === 'video' && <Clock className="w-5 h-5 text-secondary" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                {item.progress !== undefined && (
                  <div className="mt-2">
                    <ProgressBar progress={item.progress} />
                    <p className="text-xs text-gray-500 mt-1">
                      {item.progress}% completo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

**Checklist:**
[ ] Mostra jornadas em progresso
[ ] Mostra vídeos recentes
[ ] Progress bar funciona
[ ] Ordenado por último acesso
[ ] Navegação funciona
```

---

### **Prompt 3.4 - Quick Actions Grid**

```markdown
Criar grid 2x2 de ações rápidas:
- Respirar agora
- Vídeo curto
- Reflexão diária
- Perfil

**CRIAR NOVO:** components/home/QuickActionsGrid.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Wind, Video, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  {
    id: 'breathe',
    title: 'Respirar',
    icon: Wind,
    href: '/breathe',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    id: 'calm',
    title: 'Acalmar',
    icon: Video,
    href: '/calm',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    id: 'reflect',
    title: 'Refletir',
    icon: MessageCircle,
    href: '/discover',
    gradient: 'from-surface/60 to-surface/20',
  },
  {
    id: 'profile',
    title: 'Perfil',
    icon: User,
    href: '/profile',
    gradient: 'from-primary/10 to-primary/5',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
}

export function QuickActionsGrid() {
  const router = useRouter()

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Ações rápidas
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <motion.div key={action.id} variants={itemVariants}>
              <Card
                onClick={() => router.push(action.href)}
                className={`
                  p-4 cursor-pointer
                  bg-gradient-to-br ${action.gradient}
                  hover:scale-105 transition-transform
                  flex flex-col items-center justify-center
                  min-h-[100px]
                `}
              >
                <Icon className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {action.title}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
```

**Checklist:**
[ ] Grid 2x2 responsivo
[ ] Ícones renderizam
[ ] Navegação funciona
[ ] Hover scale funciona
[ ] Animação stagger funciona
```

---

### **Prompt 3.5 - Stats Widget**

```markdown
Criar widget de estatísticas mostrando:
- Streak atual
- Sessões esta semana
- XP total (preparação para gamificação)

**CRIAR NOVO:** components/home/StatsWidget.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Flame, Activity, Zap } from 'lucide-react'

interface Stats {
  streak: number
  sessionsThisWeek: number
  totalXP: number
}

export function StatsWidget() {
  const [stats, setStats] = useState<Stats>({
    streak: 0,
    sessionsThisWeek: 0,
    totalXP: 0
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/streaks').then(r => r.ok ? r.json() : null),
      fetch('/api/user/stats').then(r => r.ok ? r.json() : null),
    ]).then(([streakData, statsData]) => {
      setStats({
        streak: streakData?.currentStreak || 0,
        sessionsThisWeek: statsData?.sessionsThisWeek || 0,
        totalXP: statsData?.totalXP || 0
      })
    })
  }, [])

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Seu progresso
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.streak}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            dias
          </p>
        </div>

        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-1">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.sessionsThisWeek}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            sessões
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.totalXP}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            XP
          </p>
        </div>
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] Streak exibido
[ ] Sessões da semana corretas
[ ] XP exibido (mesmo que 0)
[ ] Layout grid 3 colunas
[ ] Ícones coloridos
```

---

### **Integração Final - app/home/page.tsx**

```markdown
**EDITAR** app/home/page.tsx para incluir todos componentes:

```typescript
import { GreetingSection } from '@/components/home/GreetingSection'
import { RecommendedSection } from '@/components/home/RecommendedSection'
import { ContinueSection } from '@/components/home/ContinueSection'
import { QuickActionsGrid } from '@/components/home/QuickActionsGrid'
import { StatsWidget } from '@/components/home/StatsWidget'
import { MoodCheckIn } from '@/components/home/MoodCheckIn'

export default function HomePage() {
  // ... código existente

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mobile-container px-4 py-6">
        <GreetingSection />
        <MoodCheckIn />
        <StatsWidget />
        <RecommendedSection />
        <ContinueSection />
        <QuickActionsGrid />
      </div>
    </div>
  )
}
```

**Checklist Fase 3:**
[ ] Todas 5 seções criadas
[ ] Home personalizada funciona
[ ] Recomendações contextuais
[ ] Continue where left off
[ ] Stats atualizados
[ ] Layout responsivo
```

---

## **FASE 4: BREATHING FLOW COMPLETO** (Semana 6)

### **Prompt 4.1 - Breathing Hub Melhorado**

```markdown
Melhorar /breathe page com:
- Stats bar no topo
- Padrões organizados por categoria
- Últimas sessões

**EDITAR:** app/breathe/page.tsx

Adicionar no topo (antes dos padrões):

```typescript
// Adicionar imports
import { StreakWidget } from '@/components/gamification/StreakWidget'

// Adicionar stats section
<div className="mb-6">
  <Card className="p-4">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
      Suas estatísticas de respiração
    </h3>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-primary">
          {stats.totalSessions || 0}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          sessões
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-primary">
          {stats.totalMinutes || 0}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          minutos
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-primary">
          {stats.streak || 0}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          dias seguidos
        </p>
      </div>
    </div>
  </Card>
</div>
```

**Checklist:**
[ ] Stats exibidas
[ ] Padrões listados
[ ] Navegação para sessão funciona
```

---

### **Prompt 4.2 - Session Flow (3 Stages)**

```markdown
Criar flow completo da sessão de respiração:
STAGE 1: Preparação (checklist + música?)
STAGE 2: Respiração ativa (já existe BreathingCircle)
STAGE 3: Conclusão (feedback + celebration)

**CRIAR NOVO:** components/breathe/SessionFlow.tsx

**CÓDIGO COMPLETO:**

```typescript
'use client'

import { useState } from 'react'
import { BreathingCircle } from './BreathingCircle'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Check, Music, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Stage = 'prep' | 'active' | 'complete'

interface SessionFlowProps {
  pattern: string
  duration: number
}

export function SessionFlow({ pattern, duration }: SessionFlowProps) {
  const [stage, setStage] = useState<Stage>('prep')
  const [checklist, setChecklist] = useState({
    comfortable: false,
    quiet: false,
    ready: false,
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [moodAfter, setMoodAfter] = useState<number | null>(null)
  const router = useRouter()

  // STAGE 1: Preparação
  if (stage === 'prep') {
    const allChecked = Object.values(checklist).every(Boolean)

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Prepare-se para respirar
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Vamos criar o ambiente perfeito para sua prática
        </p>

        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3">Checklist de preparação</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.comfortable}
                onChange={(e) => setChecklist(prev => ({
                  ...prev,
                  comfortable: e.target.checked
                }))}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="text-sm">Estou em uma posição confortável</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.quiet}
                onChange={(e) => setChecklist(prev => ({
                  ...prev,
                  quiet: e.target.checked
                }))}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="text-sm">Estou em um lugar tranquilo</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.ready}
                onChange={(e) => setChecklist(prev => ({
                  ...prev,
                  ready: e.target.checked
                }))}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="text-sm">Estou pronto para começar</span>
            </label>
          </div>
        </Card>

        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Som ambiente</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </Card>

        <Button
          onClick={() => setStage('active')}
          disabled={!allChecked}
          className="w-full"
        >
          Começar sessão
        </Button>
      </motion.div>
    )
  }

  // STAGE 2: Ativa (usar BreathingCircle existente)
  if (stage === 'active') {
    return (
      <BreathingCircle
        pattern={pattern}
        duration={duration}
        soundEnabled={soundEnabled}
        onComplete={() => setStage('complete')}
      />
    )
  }

  // STAGE 3: Conclusão
  if (stage === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Parabéns!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Você completou {duration} minutos de respiração consciente
        </p>

        <Card className="p-4 mb-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <p className="text-sm font-medium mb-3">Como você está se sentindo?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((mood) => (
              <button
                key={mood}
                onClick={() => setMoodAfter(mood)}
                className={`
                  text-2xl p-2 rounded-lg transition-all
                  ${moodAfter === mood 
                    ? 'bg-primary/20 scale-125' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                {['😟', '😕', '😐', '🙂', '😊'][mood - 1]}
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={async () => {
              // Salvar sessão
              await fetch('/api/breathing/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  pattern,
                  duration,
                  moodAfter,
                  completedAt: new Date().toISOString()
                })
              })
              router.push('/home')
            }}
            className="w-full"
          >
            Concluir
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => router.push('/breathe')}
            className="w-full"
          >
            Fazer outra sessão
          </Button>
        </div>
      </motion.div>
    )
  }

  return null
}
```

**USAR em app/breathe/session/page.tsx:**
Substituir lógica atual por `<SessionFlow pattern={pattern} duration={duration} />`

**Checklist:**
[ ] Stage 1: Preparação com checklist
[ ] Stage 2: Respiração ativa
[ ] Stage 3: Feedback + celebração
[ ] Mood after capturado
[ ] Sessão salva no BD
[ ] Navegação pós-sessão
```

---

### **Prompt 4.3 - Celebration System**

```markdown
Adicionar celebrações para marcos:
- Primeira sessão
- 5ª sessão
- 10ª sessão
- Streak de 7 dias

Já existe AchievementToast, usar ele.

**CRIAR NOVO:** lib/celebrations/breathingCelebrations.ts

```typescript
export const breathingMilestones = [
  {
    id: 'first-session',
    threshold: 1,
    title: 'Primeira Respiração',
    description: 'Você completou sua primeira sessão!',
    icon: '🌱',
    xp: 50
  },
  {
    id: 'five-sessions',
    threshold: 5,
    title: 'Respirador Dedicado',
    description: '5 sessões completas!',
    icon: '🌿',
    xp: 100
  },
  {
    id: 'ten-sessions',
    threshold: 10,
    title: 'Mestre da Respiração',
    description: '10 sessões! Você está no caminho certo',
    icon: '🌳',
    xp: 200
  },
  {
    id: 'week-streak',
    threshold: 7,
    title: 'Semana Completa',
    description: '7 dias seguidos respirando!',
    icon: '🔥',
    xp: 300
  }
]

export function checkBreathingMilestones(
  totalSessions: number,
  streak: number
): typeof breathingMilestones[0] | null {
  // Verificar milestone de sessões
  const sessionMilestone = breathingMilestones
    .filter(m => m.id !== 'week-streak')
    .find(m => m.threshold === totalSessions)

  if (sessionMilestone) return sessionMilestone

  // Verificar milestone de streak
  if (streak === 7) {
    return breathingMilestones.find(m => m.id === 'week-streak')!
  }

  return null
}
```

**INTEGRAR em SessionFlow** (stage complete):

```typescript
// Após salvar sessão
const milestone = checkBreathingMilestones(
  stats.totalSessions + 1,
  stats.streak
)

if (milestone) {
  // Mostrar AchievementToast
  showAchievement(milestone)
}
```

**Checklist:**
[ ] Milestones definidos
[ ] Check após cada sessão
[ ] AchievementToast aparece
[ ] XP concedido
```

---

## **FASE 5: GAMIFICAÇÃO INTEGRADA** (Semana 8)

### **Prompt 5.1 - XP System**

```markdown
Criar sistema de XP que concede pontos por ações:
- Breathing session: 20 XP
- Mood check-in: 10 XP
- Complete journey step: 30 XP
- Watch calm video: 15 XP
- Daily reflection: 25 XP

**CRIAR NOVO:** lib/gamification/xp.ts

**CÓDIGO COMPLETO:**

```typescript
export const XP_VALUES = {
  BREATHING_SESSION: 20,
  MOOD_CHECKIN: 10,
  JOURNEY_STEP: 30,
  CALM_VIDEO: 15,
  DAILY_REFLECTION: 25,
  STREAK_BONUS: 5, // Por cada dia de streak
} as const

export type XPAction = keyof typeof XP_VALUES

export function calculateXP(
  action: XPAction,
  multiplier: number = 1
): number {
  return XP_VALUES[action] * multiplier
}

export function calculateStreakBonus(streak: number): number {
  return streak * XP_VALUES.STREAK_BONUS
}

export async function awardXP(
  userId: string,
  action: XPAction,
  multiplier: number = 1
): Promise<{ newXP: number; totalXP: number }> {
  const xpGained = calculateXP(action, multiplier)
  
  const response = await fetch('/api/gamification/xp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, xpGained })
  })

  return response.json()
}
```

**CRIAR API:** app/api/gamification/xp/route.ts

```typescript
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { action, xpGained } = await req.json()

  // Atualizar XP do usuário
  const user = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      totalXP: { increment: xpGained },
      // Salvar log de XP ganho (opcional)
      xpHistory: {
        create: {
          action,
          amount: xpGained,
          earnedAt: new Date()
        }
      }
    }
  })

  return NextResponse.json({
    newXP: xpGained,
    totalXP: user.totalXP
  })
}
```

**INTEGRAR em componentes existentes:**

```typescript
// Em MoodCheckIn após submit:
await awardXP(user.id, 'MOOD_CHECKIN')

// Em SessionFlow após completar:
await awardXP(user.id, 'BREATHING_SESSION')

// Em VideoCard após assistir:
await awardXP(user.id, 'CALM_VIDEO')
```

**Checklist:**
[ ] XP_VALUES definidos
[ ] calculateXP funciona
[ ] API /api/gamification/xp criada
[ ] XP salvo no BD
[ ] Integrado em 3+ ações
```

---

### **Prompt 5.2 - Level System**

```markdown
Criar sistema de níveis (1-20) com thresholds exponenciais:
- Nível 1: 0 XP
- Nível 2: 100 XP
- Nível 3: 250 XP
- Nível 4: 500 XP
- ...
- Nível 20: 50,000 XP

**CRIAR NOVO:** lib/gamification/levels.ts

**CÓDIGO COMPLETO:**

```typescript
export const LEVEL_THRESHOLDS = [
  0,      // Nível 1
  100,    // Nível 2
  250,    // Nível 3
  500,    // Nível 4
  1000,   // Nível 5
  2000,   // Nível 6
  3500,   // Nível 7
  5500,   // Nível 8
  8000,   // Nível 9
  11000,  // Nível 10
  15000,  // Nível 11
  20000,  // Nível 12
  26000,  // Nível 13
  33000,  // Nível 14
  41000,  // Nível 15
  50000,  // Nível 16
  60000,  // Nível 17
  72000,  // Nível 18
  85000,  // Nível 19
  100000, // Nível 20
]

export function calculateLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

export function getXPForNextLevel(totalXP: number): {
  currentLevel: number
  nextLevel: number
  xpCurrent: number
  xpNeeded: number
  progress: number
} {
  const currentLevel = calculateLevel(totalXP)
  const nextLevel = Math.min(currentLevel + 1, 20)
  
  const xpCurrentLevelThreshold = LEVEL_THRESHOLDS[currentLevel - 1]
  const xpNextLevelThreshold = LEVEL_THRESHOLDS[nextLevel - 1]
  
  const xpCurrent = totalXP - xpCurrentLevelThreshold
  const xpNeeded = xpNextLevelThreshold - xpCurrentLevelThreshold
  const progress = (xpCurrent / xpNeeded) * 100

  return {
    currentLevel,
    nextLevel,
    xpCurrent,
    xpNeeded,
    progress: Math.min(progress, 100)
  }
}

export function getLevelTitle(level: number): string {
  const titles = {
    1: 'Iniciante',
    2: 'Explorador',
    3: 'Aprendiz',
    4: 'Praticante',
    5: 'Dedicado',
    6: 'Experiente',
    7: 'Habilidoso',
    8: 'Avançado',
    9: 'Veterano',
    10: 'Expert',
    11: 'Mestre',
    12: 'Grande Mestre',
    13: 'Sábio',
    14: 'Iluminado',
    15: 'Transcendente',
    16: 'Lendário',
    17: 'Mítico',
    18: 'Divino',
    19: 'Celestial',
    20: 'Imortal',
  }
  return titles[level as keyof typeof titles] || 'Iniciante'
}
```

**CRIAR COMPONENTE:** components/gamification/LevelBadge.tsx

```typescript
'use client'

import { useUser } from '@/lib/hooks/useUser'
import { calculateLevel, getLevelTitle } from '@/lib/gamification/levels'

export function LevelBadge() {
  const { user } = useUser()
  const level = calculateLevel(user?.totalXP || 0)
  const title = getLevelTitle(level)

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-full">
      <span className="text-xs font-bold text-white">
        Nível {level}
      </span>
      <span className="text-xs text-white/80">
        {title}
      </span>
    </div>
  )
}
```

**CRIAR COMPONENTE:** components/gamification/XPBar.tsx

```typescript
'use client'

import { useUser } from '@/lib/hooks/useUser'
import { getXPForNextLevel } from '@/lib/gamification/levels'
import { ProgressBar } from '@/components/discover/ProgressBar'

export function XPBar() {
  const { user } = useUser()
  const xpInfo = getXPForNextLevel(user?.totalXP || 0)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 dark:text-gray-400">
          {xpInfo.xpCurrent} / {xpInfo.xpNeeded} XP
        </span>
        <span className="text-primary font-medium">
          Nível {xpInfo.nextLevel}
        </span>
      </div>
      <ProgressBar progress={xpInfo.progress} />
    </div>
  )
}
```

**Checklist:**
[ ] Níveis 1-20 definidos
[ ] calculateLevel funciona
[ ] Títulos por nível
[ ] LevelBadge renderiza
[ ] XPBar com progresso
[ ] Mostra XP até próximo nível
```

---

### **Prompt 5.3 - Achievements System**

```markdown
Criar 30+ achievements desbloqueáveis.

**CRIAR NOVO:** lib/gamification/achievements.ts

**CÓDIGO COMPLETO:**

```typescript
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'breathing' | 'calm' | 'discover' | 'social' | 'milestone'
  condition: {
    type: 'count' | 'streak' | 'level' | 'special'
    target: number
    metric: string
  }
  xpReward: number
}

export const ACHIEVEMENTS: Achievement[] = [
  // Breathing
  {
    id: 'first-breath',
    title: 'Primeira Respiração',
    description: 'Complete sua primeira sessão de respiração',
    icon: '🌱',
    category: 'breathing',
    condition: { type: 'count', target: 1, metric: 'breathingSessions' },
    xpReward: 50
  },
  {
    id: 'breath-master',
    title: 'Mestre da Respiração',
    description: 'Complete 50 sessões de respiração',
    icon: '🧘',
    category: 'breathing',
    condition: { type: 'count', target: 50, metric: 'breathingSessions' },
    xpReward: 500
  },
  {
    id: 'marathon-breather',
    title: 'Maratonista da Calma',
    description: 'Respire por 100 minutos no total',
    icon: '⏱️',
    category: 'breathing',
    condition: { type: 'count', target: 100, metric: 'breathingMinutes' },
    xpReward: 300
  },

  // Calm
  {
    id: 'first-calm',
    title: 'Momento de Calma',
    description: 'Assista seu primeiro vídeo relaxante',
    icon: '🎬',
    category: 'calm',
    condition: { type: 'count', target: 1, metric: 'videosWatched' },
    xpReward: 50
  },
  {
    id: 'calm-enthusiast',
    title: 'Entusiasta da Calma',
    description: 'Assista 25 vídeos',
    icon: '📺',
    category: 'calm',
    condition: { type: 'count', target: 25, metric: 'videosWatched' },
    xpReward: 250
  },

  // Discover
  {
    id: 'first-journey',
    title: 'Primeira Jornada',
    description: 'Inicie uma jornada de autoconhecimento',
    icon: '🗺️',
    category: 'discover',
    condition: { type: 'count', target: 1, metric: 'journeysStarted' },
    xpReward: 50
  },
  {
    id: 'journey-complete',
    title: 'Explorador Completo',
    description: 'Complete sua primeira jornada',
    icon: '🏆',
    category: 'discover',
    condition: { type: 'count', target: 1, metric: 'journeysCompleted' },
    xpReward: 200
  },
  {
    id: 'all-journeys',
    title: 'Conhecimento Pleno',
    description: 'Complete todas as jornadas disponíveis',
    icon: '🌟',
    category: 'discover',
    condition: { type: 'special', target: 1, metric: 'allJourneysCompleted' },
    xpReward: 1000
  },

  // Streaks
  {
    id: 'week-streak',
    title: 'Semana Dedicada',
    description: 'Mantenha um streak de 7 dias',
    icon: '🔥',
    category: 'milestone',
    condition: { type: 'streak', target: 7, metric: 'dailyStreak' },
    xpReward: 300
  },
  {
    id: 'month-streak',
    title: 'Mês de Consistência',
    description: 'Mantenha um streak de 30 dias',
    icon: '💪',
    category: 'milestone',
    condition: { type: 'streak', target: 30, metric: 'dailyStreak' },
    xpReward: 1000
  },
  {
    id: 'hundred-days',
    title: 'Centenário',
    description: 'Mantenha um streak de 100 dias',
    icon: '👑',
    category: 'milestone',
    condition: { type: 'streak', target: 100, metric: 'dailyStreak' },
    xpReward: 5000
  },

  // Levels
  {
    id: 'level-5',
    title: 'Cinco Estrelas',
    description: 'Alcance o nível 5',
    icon: '⭐',
    category: 'milestone',
    condition: { type: 'level', target: 5, metric: 'userLevel' },
    xpReward: 200
  },
  {
    id: 'level-10',
    title: 'Expert Certificado',
    description: 'Alcance o nível 10',
    icon: '🎖️',
    category: 'milestone',
    condition: { type: 'level', target: 10, metric: 'userLevel' },
    xpReward: 500
  },
  {
    id: 'level-20',
    title: 'Imortal',
    description: 'Alcance o nível máximo (20)',
    icon: '👑',
    category: 'milestone',
    condition: { type: 'level', target: 20, metric: 'userLevel' },
    xpReward: 2000
  },

  // Social/Engagement
  {
    id: 'mood-tracker',
    title: 'Rastreador de Humor',
    description: 'Registre seu humor 30 vezes',
    icon: '😊',
    category: 'social',
    condition: { type: 'count', target: 30, metric: 'moodCheckIns' },
    xpReward: 300
  },
  {
    id: 'reflective-soul',
    title: 'Alma Reflexiva',
    description: 'Complete 20 reflexões diárias',
    icon: '📝',
    category: 'social',
    condition: { type: 'count', target: 20, metric: 'dailyReflections' },
    xpReward: 400
  },

  // Especiais
  {
    id: 'early-bird',
    title: 'Madrugador',
    description: 'Complete uma sessão antes das 7h',
    icon: '🌅',
    category: 'milestone',
    condition: { type: 'special', target: 1, metric: 'earlyMorningSession' },
    xpReward: 100
  },
  {
    id: 'night-owl',
    title: 'Coruja Noturna',
    description: 'Complete uma sessão depois das 23h',
    icon: '🌙',
    category: 'milestone',
    condition: { type: 'special', target: 1, metric: 'lateNightSession' },
    xpReward: 100
  },
]

export function checkAchievement(
  achievement: Achievement,
  userStats: Record<string, number>
): boolean {
  const { condition } = achievement
  const value = userStats[condition.metric] || 0

  switch (condition.type) {
    case 'count':
      return value >= condition.target
    case 'streak':
      return value >= condition.target
    case 'level':
      return value >= condition.target
    case 'special':
      return value >= condition.target
    default:
      return false
  }
}
```

**Checklist:**
[ ] 30+ achievements definidos
[ ] Categorias: breathing, calm, discover, social, milestone
[ ] checkAchievement funciona
[ ] XP rewards definidos
```

---

### **Prompt 5.4 - Streak Tracker Enhanced**

```markdown
Melhorar StreakWidget existente com:
- Calendar view (últimos 7 dias)
- Motivational messages
- Streak milestones

**EDITAR:** components/gamification/StreakWidget.tsx

Adicionar calendar view:

```typescript
// Adicionar função para últimos 7 dias
function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date)
  }
  return days
}

// Adicionar no componente
const last7Days = getLast7Days()

// Adicionar calendar UI
<div className="grid grid-cols-7 gap-1 mt-3">
  {last7Days.map((date, i) => {
    const isActive = i < streak // Simplificado
    return (
      <div
        key={i}
        className={`
          aspect-square rounded-lg flex items-center justify-center text-xs
          ${isActive 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
          }
        `}
      >
        {date.getDate()}
      </div>
    )
  })}
</div>

// Adicionar motivational message
<p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-2">
  {streak === 0 && "Comece sua sequência hoje!"}
  {streak > 0 && streak < 7 && `Continue! Faltam ${7 - streak} dias para uma semana`}
  {streak >= 7 && "Incrível! Você está no caminho certo 🔥"}
</p>
```

**Checklist:**
[ ] Calendar últimos 7 dias
[ ] Dias ativos destacados
[ ] Mensagem motivacional
[ ] Milestone visual (7 dias)
```

---

## **FASE 6: DISCOVER REORGANIZATION** (Semana 7)

### **Prompt 6.1 - Tab System (For You, Jornadas, Biblioteca)**

```markdown
Reorganizar /discover com 3 tabs:
1. Para Você (recomendações)
2. Jornadas (lista completa)
3. Biblioteca (explorados/salvos)

**EDITAR:** app/discover/page.tsx

**CÓDIGO COMPLETO (substituir):**

```typescript
'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation/Header'
import { useUIStore } from '@/lib/store/uiStore'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const tabs = [
  { id: 'for-you', label: 'Para Você' },
  { id: 'journeys', label: 'Jornadas' },
  { id: 'library', label: 'Biblioteca' },
]

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState('for-you')
  const { setPageTitle, setShowBackButton } = useUIStore()

  useEffect(() => {
    setPageTitle('Conhecer-se')
    setShowBackButton(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mobile-container px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 py-2 px-4 rounded-lg text-sm font-medium
                transition-all relative
                ${activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'for-you' && <ForYouTab />}
            {activeTab === 'journeys' && <JourneysTab />}
            {activeTab === 'library' && <LibraryTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Componentes de cada tab (criar separadamente)
function ForYouTab() {
  return <div>Para Você content</div>
}

function JourneysTab() {
  return <div>Jornadas content</div>
}

function LibraryTab() {
  return <div>Biblioteca content</div>
}
```

**Checklist:**
[ ] 3 tabs renderizam
[ ] Animação de tab ativa (layoutId)
[ ] Conteúdo muda com tab
[ ] Mobile-friendly
```

---

### **Prompt 6.2 - For You Tab (Recomendações)**

```markdown
Implementar tab "Para Você" com recomendações personalizadas.

**CRIAR:** components/discover/ForYouTab.tsx

```typescript
'use client'

import { useUser } from '@/lib/hooks/useUser'
import { JourneyCard } from './JourneyCard'
import { DailyReflectionWidget } from './DailyReflectionWidget'

export function ForYouTab() {
  const { user } = useUser()

  // Lógica de recomendação baseada em objetivo
  const recommendedJourneys = getRecommendedJourneys(user?.goal)

  return (
    <div className="space-y-6">
      <DailyReflectionWidget />

      <div>
        <h2 className="text-lg font-semibold mb-3">
          Recomendado para você
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Baseado no seu objetivo: <strong>{getGoalLabel(user?.goal)}</strong>
        </p>

        <div className="space-y-3">
          {recommendedJourneys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
      </div>
    </div>
  )
}

function getRecommendedJourneys(goal: string | undefined) {
  // Implementar lógica real
  return []
}

function getGoalLabel(goal: string | undefined): string {
  const labels = {
    anxiety: 'Controlar ansiedade',
    mood: 'Melhorar humor',
    sleep: 'Dormir melhor',
    mindfulness: 'Praticar mindfulness',
  }
  return goal ? labels[goal as keyof typeof labels] : 'Autocuidado'
}
```

**Checklist:**
[ ] Daily reflection widget
[ ] Recomendações baseadas em objetivo
[ ] JourneyCards renderizam
```

---

### **Prompt 6.3 - Library Tab**

```markdown
Implementar tab "Biblioteca" com conteúdo explorado/salvo.

**CRIAR:** components/discover/LibraryTab.tsx

```typescript
'use client'

import { useEffect, useState } from 'react'
import { JourneyCard } from './JourneyCard'
import { TopicCard } from './TopicCard'
import { EmptyState } from '@/components/ui/EmptyState'

export function LibraryTab() {
  const [exploredJourneys, setExploredJourneys] = useState([])
  const [exploredTopics, setExploredTopics] = useState([])

  useEffect(() => {
    // Buscar conteúdo explorado
    Promise.all([
      fetch('/api/journeys/progress').then(r => r.json()),
      fetch('/api/topics/exploration').then(r => r.json()),
    ]).then(([journeys, topics]) => {
      setExploredJourneys(journeys.started || [])
      setExploredTopics(topics.explored || [])
    })
  }, [])

  const hasContent = exploredJourneys.length > 0 || exploredTopics.length > 0

  if (!hasContent) {
    return (
      <EmptyState
        icon="📚"
        title="Sua biblioteca está vazia"
        description="Comece a explorar jornadas e tópicos para vê-los aqui"
      />
    )
  }

  return (
    <div className="space-y-6">
      {exploredJourneys.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Jornadas em Progresso
          </h3>
          <div className="space-y-3">
            {exploredJourneys.map((journey: any) => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
          </div>
        </div>
      )}

      {exploredTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Tópicos Explorados
          </h3>
          <div className="space-y-3">
            {exploredTopics.map((topic: any) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

**Checklist:**
[ ] Mostra jornadas em progresso
[ ] Mostra tópicos explorados
[ ] Empty state quando vazio
[ ] Separa por seções
```

---

## **FASE 7: PROFILE DASHBOARD** (Semana 9)

### **Prompt 7.1 - Profile Header com Level**

```markdown
Redesenhar header do perfil com:
- Avatar + nome
- Level badge
- XP bar

**EDITAR:** app/profile/page.tsx

Substituir header por:

```typescript
import { LevelBadge } from '@/components/gamification/LevelBadge'
import { XPBar } from '@/components/gamification/XPBar'
import { Avatar } from '@/components/ui/Avatar'

// No componente
<div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg mb-6">
  <div className="flex items-center gap-4 mb-4">
    <Avatar src={user?.imageUrl} size="lg" />
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {user?.name}
      </h1>
      <LevelBadge />
    </div>
  </div>
  <XPBar />
</div>
```

**Checklist:**
[ ] Avatar + nome
[ ] Level badge aparece
[ ] XP bar com progresso
[ ] Gradiente de fundo
```

---

### **Prompt 7.2 - Weekly Summary**

```markdown
Adicionar resumo da semana com:
- Sessões completadas
- Minutos praticados
- XP ganho

**CRIAR:** components/profile/WeeklySummary.tsx

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Activity, Clock, Zap } from 'lucide-react'

export function WeeklySummary() {
  const [summary, setSummary] = useState({
    sessions: 0,
    minutes: 0,
    xpGained: 0
  })

  useEffect(() => {
    fetch('/api/user/stats?period=week')
      .then(r => r.json())
      .then(data => setSummary(data))
  }, [])

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Esta Semana</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {summary.sessions}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            sessões
          </p>
        </div>

        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {summary.minutes}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            minutos
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {summary.xpGained}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            XP ganho
          </p>
        </div>
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] Stats da semana exibidas
[ ] Grid 3 colunas
[ ] Ícones coloridos
[ ] Dados corretos do backend
```

---

### **Prompt 7.3 - Activity Chart (Simplificado)**

```markdown
Criar gráfico simples de atividade (barras verticais).

**CRIAR:** components/profile/ActivityChart.tsx

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'

export function ActivityChart() {
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    fetch('/api/user/stats?period=week&detailed=true')
      .then(r => r.json())
      .then(data => setWeeklyData(data.dailyMinutes || [0, 0, 0, 0, 0, 0, 0]))
  }, [])

  const maxValue = Math.max(...weeklyData, 1)
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Atividade Semanal</h3>

      <div className="flex items-end justify-between gap-2 h-40">
        {weeklyData.map((value, i) => {
          const height = (value / maxValue) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-32">
                <div
                  className="w-full bg-primary rounded-t transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {days[i]}
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] Barras verticais por dia
[ ] Altura proporcional a minutos
[ ] Labels dos dias
[ ] Responsivo
```

---

### **Prompt 7.4 - Achievement Showcase**

```markdown
Mostrar achievements desbloqueados (últimos 6).

**CRIAR:** components/profile/AchievementShowcase.tsx

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { ACHIEVEMENTS } from '@/lib/gamification/achievements'
import { useRouter } from 'next/navigation'

export function AchievementShowcase() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/achievements')
      .then(r => r.json())
      .then(data => setUnlockedAchievements(data.unlocked || []))
  }, [])

  const showcaseAchievements = ACHIEVEMENTS
    .filter(a => unlockedAchievements.includes(a.id))
    .slice(0, 6)

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Conquistas</h3>
        <button
          onClick={() => router.push('/profile/achievements')}
          className="text-sm text-primary hover:underline"
        >
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {showcaseAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="text-3xl mb-1">{achievement.icon}</span>
            <p className="text-xs text-center font-medium text-gray-900 dark:text-gray-100">
              {achievement.title}
            </p>
          </div>
        ))}
      </div>

      {showcaseAchievements.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
          Nenhuma conquista desbloqueada ainda
        </p>
      )}
    </Card>
  )
}
```

**Checklist:**
[ ] Mostra últimas 6 conquistas
[ ] Grid 3 colunas
[ ] Link para ver todas
[ ] Empty state quando vazio
```

---

## **CHECKLIST FINAL**

### Estrutura
- [ ] Landing page profissional
- [ ] Auth split layout (mantido Clerk)
- [ ] App shell com bottom nav
- [ ] Onboarding progressivo (7 steps)
- [ ] Home personalizada (5 seções)
- [ ] Session flows completos (3 stages)

### Personalização
- [ ] Recommendation engine (baseado em objetivo)
- [ ] Context-aware content (hora do dia)
- [ ] Time-based suggestions
- [ ] Progressive profiling (onboarding)

### Gamificação
- [ ] XP system (6 ações)
- [ ] Levels 1-20 (thresholds exponenciais)
- [ ] 30+ achievements
- [ ] Streak tracker (calendar view)
- [ ] Celebrations (toasts + milestones)

### Feedback
- [ ] Empty states (10+ contextos)
- [ ] Loading skeletons específicos
- [ ] Success toasts (achievements)
- [ ] Error recovery (NetworkError)

### Qualidade
- [ ] Mobile-first (320px-428px)
- [ ] Accessible (ARIA, keyboard)
- [ ] Semantic HTML
- [ ] Performance > 90 (Lighthouse)

---

**Versão:** 2.0 COMPLETA  
**Total de Prompts:** 25 (7 fases completas)  
**Estimativa:** 10 semanas  
**Status:** ✅ 100% Executável por IA

