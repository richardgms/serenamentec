# 📋 Plano de Reestruturação - Serenamente

## PRD: Implementação de Arquitetura Profissional

**Versão:** 1.0  
**Data:** 21 de Outubro de 2025  
**Tempo Estimado:** 10 semanas  
**Prioridade:** ALTA (Fundação do produto)

---

## 🎯 Objetivo

Transform

ar a arquitetura de componentes e fluxos do Serenamente para o nível de aplicações profissionais de saúde mental (Calm, Headspace), mantendo a funcionalidade existente mas elevando drasticamente a experiência do usuário.

---

## 📊 Escopo

### ✅ Incluído

**Páginas/Fluxos:**
1. Landing Page (nova)
2. Auth Screens (redesign completo)
3. Onboarding (reestruturação)
4. Home (personalização)
5. Breathing (flow completo)
6. Calm/Videos (curadoria)
7. Discover (reorganização)
8. Profile (gamificação)

**Componentes:**
- App Shell com Bottom Navigation
- Sistema de recomendação
- Gamificação (XP/Níveis/Streaks)
- Empty states contextuais
- Loading states específicos
- Success celebrations

**Infraestrutura:**
- Sistema de tabs
- Modal/Overlay manager
- Toast/Notification system
- Progressive question flow
- Session flow pattern

### ❌ Não Incluído

- Mudanças no backend/API
- Alterações no Prisma schema
- Novos módulos/funcionalidades
- Testes automatizados (fase separada)

---

## 🗂️ Estrutura de Arquivos Proposta

```
app/
├── (marketing)/
│   ├── page.tsx                    # Landing Page NOVA
│   ├── como-funciona/
│   └── layout.tsx                  # Marketing Layout
│
├── (auth)/
│   ├── entrar/
│   │   └── page.tsx                # Sign In REDESIGN
│   ├── cadastrar/
│   │   └── page.tsx                # Sign Up REDESIGN
│   └── layout.tsx                  # Auth Split Layout
│
├── (app)/
│   ├── inicio/
│   │   └── page.tsx                # Home personalizada
│   ├── respirar/
│   │   ├── page.tsx                # Breathing hub
│   │   └── sessao/
│   │       └── page.tsx            # Session flow
│   ├── acalmar/
│   │   ├── page.tsx                # Videos hub
│   │   └── [videoId]/
│   │       └── page.tsx            # Video player
│   ├── descobrir/
│   │   ├── page.tsx                # Discover tabs
│   │   ├── jornadas/
│   │   └── biblioteca/
│   ├── perfil/
│   │   ├── page.tsx                # Profile dashboard
│   │   ├── conquistas/
│   │   ├── historico/
│   │   └── configuracoes/
│   └── layout.tsx                  # App Shell
│
├── boas-vindas/
│   └── page.tsx                    # Onboarding flow
│
components/
├── layouts/
│   ├── LandingLayout.tsx
│   ├── AuthLayout.tsx
│   ├── AppShell.tsx
│   ├── BottomNav.tsx
│   └── TopBar.tsx
│
├── flows/
│   ├── OnboardingFlow.tsx
│   ├── SessionFlow.tsx
│   └── ProgressiveQuestion.tsx
│
├── sections/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   └── CTA.tsx
│
├── personalization/
│   ├── RecommendedSection.tsx
│   ├── ContinueSection.tsx
│   └── QuickActions.tsx
│
├── gamification/
│   ├── LevelCard.tsx
│   ├── XPBar.tsx
│   ├── StreakTracker.tsx
│   ├── AchievementBadge.tsx
│   └── CelebrationModal.tsx
│
├── feedback/
│   ├── EmptyState.tsx
│   ├── LoadingSkeleton.tsx
│   ├── SuccessToast.tsx
│   └── ErrorBoundary.tsx
│
└── curated/
    ├── FeaturedCarousel.tsx
    ├── PlaylistCard.tsx
    └── StaffPicks.tsx
```

---

## 🎯 Priorização (MoSCoW)

### Must Have (P0) - Semanas 1-4

**Landing + Auth** (Semana 1)
- [ ] Landing Page com hero + features
- [ ] Auth Split Layout
- [ ] Sign In/Up redesign

**Core Flow** (Semana 2)
- [ ] App Shell + Bottom Nav
- [ ] Onboarding progressivo
- [ ] Home personalizada básica

**Breathing Flow** (Semana 3)
- [ ] Breathing hub
- [ ] Session flow (prep → active → complete)
- [ ] Celebration system

**Profile Base** (Semana 4)
- [ ] Profile dashboard
- [ ] Streak tracker
- [ ] Basic stats

### Should Have (P1) - Semanas 5-7

**Gamification** (Semana 5)
- [ ] XP/Level system
- [ ] Achievement system
- [ ] Progress visualization

**Discover** (Semana 6)
- [ ] Tab organization
- [ ] Recommendation engine
- [ ] Content curation

**Videos** (Semana 7)
- [ ] Video hub curated
- [ ] Playlists
- [ ] Continue watching

### Could Have (P2) - Semanas 8-10

**Polish** (Semana 8)
- [ ] Empty states all contexts
- [ ] Loading states specific
- [ ] Error recovery flows

**Advanced Personalization** (Semana 9)
- [ ] Progressive profiling
- [ ] Time-based recommendations
- [ ] Smart notifications

**Final Polish** (Semana 10)
- [ ] Micro-animations
- [ ] Accessibility audit
- [ ] Performance optimization

---

## 🔄 Estratégia de Migração

### Abordagem: Incremental Replacement

```
Fase 1: Criar novo em paralelo
├── Não tocar no código existente
├── Criar novos componentes em pastas separadas
└── Testar isoladamente

Fase 2: Feature flag
├── Adicionar flag: USE_NEW_STRUCTURE
├── Renderizar novo OU antigo baseado em flag
└── Validar com subset de usuários

Fase 3: Migração gradual
├── Semana 1: Landing + Auth
├── Semana 2: Onboarding + Home
├── Semana 3: Breathing
└── Semana 4+: Resto

Fase 4: Cleanup
├── Remover código antigo
├── Remover feature flags
└── Documentar mudanças
```

---

## 📐 Componentes Chave

### 1. AppShell

```tsx
<AppShell>
  <TopBar />
  <MainContent>
    <PageTransition>
      {children}
    </PageTransition>
  </MainContent>
  <BottomNavigation />
  <ToastManager />
  <ModalManager />
</AppShell>
```

**Responsabilidades:**
- Layout consistente
- Navigation state
- Toast/Modal rendering
- Page transitions

### 2. OnboardingFlow

```tsx
<OnboardingFlow
  steps={[
    'welcome',
    'name',
    'goal',
    'experience',
    'time',
    'notifications',
    'complete'
  ]}
  onComplete={handleComplete}
>
  {/* Cada step é um componente */}
</OnboardingFlow>
```

**Características:**
- Progressive (um step por vez)
- Validação por step
- Back navigation permitida
- Progress visível
- Persistence (localStorage)

### 3. SessionFlow

```tsx
<SessionFlow
  type="breathing"
  stages={['prep', 'active', 'complete']}
>
  <PrepStage />
  <ActiveStage />
  <CompleteStage />
</SessionFlow>
```

**Características:**
- Multi-stage
- Immersive mode
- State persistence
- Celebration on complete

### 4. RecommendationEngine

```tsx
<RecommendationEngine
  userId={user.id}
  context={{
    goal: user.goal,
    timeOfDay: 'evening',
    recentActivity: userActivity
  }}
>
  {(recommendations) => (
    <RecommendedSection content={recommendations} />
  )}
</RecommendationEngine>
```

**Lógica:**
```typescript
function getRecommendations(user, context) {
  // 1. Filter by goal
  let pool = content.filter(c => 
    c.tags.includes(user.goal)
  )
  
  // 2. Adjust by time
  if (context.timeOfDay === 'evening') {
    pool = prioritize(pool, ['sleep', 'calm'])
  }
  
  // 3. Remove already seen
  pool = pool.filter(c => 
    !user.completedContent.includes(c.id)
  )
  
  // 4. Rank by affinity
  return rankByAffinity(pool, user.preferences)
}
```

---

## 🎮 Sistema de Gamificação

### XP Tabela

| Ação | XP |
|------|-----|
| Check-in diário | 5 |
| Sessão de respiração (5min) | 10 |
| Completar etapa de jornada | 25 |
| Completar jornada inteira | 100 |
| Ler tópico | 5 |
| Reflexão diária | 10 |
| Manter streak 7 dias | 50 |
| Manter streak 30 dias | 200 |

### Níveis

```typescript
const levels = [
  { level: 1, name: 'Iniciante', xpRequired: 0 },
  { level: 2, name: 'Aprendiz', xpRequired: 100 },
  { level: 3, name: 'Praticante', xpRequired: 250 },
  { level: 4, name: 'Dedicado', xpRequired: 500 },
  { level: 5, name: 'Explorador', xpRequired: 1000 },
  { level: 6, name: 'Mestre', xpRequired: 2000 },
  // ... até nível 20
]
```

### Achievements

```typescript
const achievements = [
  {
    id: 'first-breath',
    title: 'Primeira respiração',
    description: 'Complete sua primeira sessão',
    rarity: 'common',
    xp: 10
  },
  {
    id: 'streak-7',
    title: 'Sequência de 7 dias',
    description: 'Pratique por 7 dias seguidos',
    rarity: 'rare',
    xp: 50
  },
  {
    id: 'breathe-master',
    title: 'Mestre da respiração',
    description: 'Complete 100 sessões',
    rarity: 'epic',
    xp: 200
  }
  // ... 30+ achievements
]
```

---

## 📱 Personalização

### Contexts de Recomendação

```typescript
type RecommendationContext = {
  // User profile
  goal: 'anxiety' | 'sleep' | 'mood' | 'mindfulness'
  experience: 'beginner' | 'intermediate' | 'advanced'
  
  // Temporal
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  dayOfWeek: number
  
  // Behavioral
  recentActivity: Activity[]
  preferences: {
    sessionLength: 'short' | 'medium' | 'long'
    ambientSound: boolean
    notifications: boolean
  }
  
  // State
  lastMood: number
  streakDays: number
  hasCompletedToday: boolean
}
```

### Algoritmo Simples

```typescript
function recommend(context: RecommendationContext): Content[] {
  let content = allContent
  
  // 1. Filter by goal (weight: 40%)
  content = content.filter(c => 
    c.tags.includes(context.goal)
  )
  
  // 2. Adjust by time (weight: 30%)
  if (context.timeOfDay === 'evening') {
    content = content.map(c => ({
      ...c,
      score: c.tags.includes('sleep') ? c.score + 30 : c.score
    }))
  }
  
  // 3. Recent activity (weight: 20%)
  const recentTopics = context.recentActivity
    .map(a => a.topic)
  
  content = content.map(c => ({
    ...c,
    score: recentTopics.includes(c.topic) 
      ? c.score + 20 
      : c.score
  }))
  
  // 4. Remove completed (weight: 10%)
  content = content.filter(c => !c.isCompleted)
  
  // Sort and return top 5
  return content
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}
```

---

## 🎨 Empty States Catalog

### 1. Primeira vez (Educational)
```tsx
<EmptyState variant="first-time">
  <Illustration />
  <Heading>Bem-vindo a {moduleName}</Heading>
  <Description>{whatIsThis}</Description>
  <Benefits />
  <CTA>Começar</CTA>
</EmptyState>
```

### 2. Sem conteúdo (Friendly)
```tsx
<EmptyState variant="no-content">
  <Icon>{emoji}</Icon>
  <Heading>Nada aqui ainda</Heading>
  <Description>{encouragement}</Description>
  <CTA>{action}</CTA>
</EmptyState>
```

### 3. Erro (Helpful)
```tsx
<EmptyState variant="error">
  <Icon>⚠️</Icon>
  <Heading>{errorTitle}</Heading>
  <Description>{whatHappened}</Description>
  <Suggestions />
  <Actions>
    <Button>Tentar novamente</Button>
    <Button variant="ghost">Voltar</Button>
  </Actions>
</EmptyState>
```

---

## 🎯 Métricas de Sucesso

### Antes (Baseline)
- Time to First Value: ~3 min
- Session Completion Rate: ~45%
- 7-Day Retention: ~20%
- Daily Active: ~15%

### Depois (Meta)
- Time to First Value: < 1 min (↓67%)
- Session Completion Rate: > 70% (↑55%)
- 7-Day Retention: > 40% (↑100%)
- Daily Active: > 30% (↑100%)

### KPIs Técnicos
- Lighthouse Performance: > 90
- Time to Interactive: < 2s
- First Contentful Paint: < 1s
- Accessibility Score: > 95

---

## ⚠️ Riscos e Mitigações

### Risco 1: Escopo Creep
**Probabilidade:** Alta  
**Impacto:** Alto  
**Mitigação:**
- Seguir MoSCoW estritamente
- Feature flag para rollback
- Revisões semanais de escopo

### Risco 2: Breaking Changes
**Probabilidade:** Média  
**Impacto:** Alto  
**Mitigação:**
- Criar em paralelo (não substituir)
- Testes extensivos antes de swap
- Rollback plan claro

### Risco 3: Degradação de Performance
**Probabilidade:** Média  
**Impacto:** Médio  
**Mitigação:**
- Bundle analyzer em cada PR
- Lazy loading agressivo
- Code splitting estratégico

---

## 📅 Timeline

```
Semana 1: Landing + Auth
├── Dia 1-2: Landing page
├── Dia 3-4: Auth layout
└── Dia 5: Testing

Semana 2: Core Flow
├── Dia 1-2: App Shell
├── Dia 3: Onboarding
└── Dia 4-5: Home personalizada

Semana 3: Breathing
├── Dia 1-2: Hub
├── Dia 3-4: Session flow
└── Dia 5: Celebration

Semana 4: Profile Base
├── Dia 1-2: Dashboard
├── Dia 3: Streak
└── Dia 4-5: Stats

Semanas 5-10: P1 e P2
```

---

## ✅ Critérios de Aceitação

### Por Componente
- [ ] Usa patterns definidos
- [ ] Mobile-first (320px+)
- [ ] Accessible (keyboard + screen reader)
- [ ] Loading state definido
- [ ] Empty state definido
- [ ] Error state definido
- [ ] TypeScript strict mode
- [ ] Documented (comentários + exemplo)

### Por Página
- [ ] Personalização implementada
- [ ] Transição suave
- [ ] Navegação clear
- [ ] CTA óbvio
- [ ] Hierarchy clara
- [ ] Responsive
- [ ] Lighthouse > 90

### Global
- [ ] Toda navegação bottom nav
- [ ] Toda ação tem feedback
- [ ] Todo loading tem skeleton
- [ ] Todo empty tem CTA
- [ ] Gamification visible
- [ ] Recomendação funcional

---

## 📚 Documentação Criada

1. ✅ `analise-estrutural.md` - Auditoria
2. ✅ `patterns-estruturais.md` - Padrões
3. ✅ `plano-estrutural.md` - Este documento
4. 🔄 `etapas-estrutural.md` - Implementação

---

**Este plano deve ser aprovado antes de iniciar implementação.**

**Versão:** 1.0  
**Status:** Aguardando aprovação  
**Próximo passo:** Criar etapas-estrutural.md

