# Auditoria Estrutural - Serenamente

**Data:** 25 de Outubro de 2025
**Objetivo:** Identificar o que manter, refatorar e criar na reestruturação para nível profissional

---

## ✅ O QUE JÁ FUNCIONA BEM

### Componentes UI Reutilizáveis
**MANTER** - Base sólida de componentes bem estruturados:

- **Button.tsx** - Variantes completas (primary, secondary, outline, ghost, danger)
- **Avatar.tsx** - Com fallback e otimização
- **Badge.tsx** - Sistema de tags funcional
- **Input.tsx** - Campo de entrada consistente
- **Card.tsx** - Container genérico
- **Spinner.tsx** - Loading indicators
- **Toast.tsx** - Sistema de notificações com 4 tipos (success, error, warning, info)
- **OptimizedIcon.tsx** - Wrapper do Phosphor Icons performático
- **OptimizedImage.tsx** - Next/Image otimizado

**Por que funciona:**
- Variantes consistentes usando class-variance-authority
- Acessibilidade built-in (ARIA labels, roles)
- Mobile-first
- TypeScript strict

---

### Sistema de Estado Global
**MANTER** - Zustand stores bem organizados:

#### **userStore** (Preferências)
```typescript
- vibrationEnabled, soundEnabled, darkMode
- dailyReflectionTime, reminderEnabled
- lastMoodCheckIn tracking
- Persistência via middleware
```

#### **uiStore** (UI Global)
```typescript
- Toast management (showToast, hideToast)
- Modal management (openModal, closeModal)
- Loading state global
- Page title + breadcrumb
- Back button control
```

#### **achievementStore** (Notificações de Conquista)
```typescript
- Queue de achievements
- isShowing control
- addAchievement, removeAchievement
```

**Por que funciona:**
- Separação clara de responsabilidades
- SSR-safe com skipHydration
- APIs simples e intuitivas

---

### Custom Hooks
**MANTER** - Hooks bem abstraídos:

- **useUser()** - Autenticação + user data + refetch
- **useSWRData.ts** - 13 hooks SWR (useVideos, useJourneys, useMoodCheckIns, etc)
- **useHaptic()** - Feedback háptico mobile
- **useTheme()** - Tema light/dark com localStorage

**Por que funciona:**
- Reutilização de lógica
- Caching automático (SWR)
- Type-safe

---

### Sistema de Design Tokens
**MANTER** - Variáveis CSS bem definidas:

```css
--primary, --primary-dark, --secondary
--surface-main, --surface-card, --surface-elevated
--text-primary, --text-secondary, --text-tertiary
--module-breathe, --module-calm, --module-discover, --module-profile
```

**Theme system:**
- ThemeProvider React Context
- SSR-safe
- System preference detection
- localStorage persistence
- data-theme attribute

**Por que funciona:**
- Consistência visual
- Fácil manutenção
- Dark mode nativo

---

### Autenticação e Proteção de Rotas
**MANTER** - Clerk integrado corretamente:

- Middleware protege rotas autenticadas
- Webhook synca usuários no banco
- useUser() carrega dados do Prisma
- Redirect automático se não autenticado

**Por que funciona:**
- Segurança robusta
- User management simplificado
- Sync automático Clerk → Prisma

---

### Estados de Feedback
**MANTER PARCIALMENTE** - Base boa mas incompleto:

✅ **Toast System** - 4 tipos, animações, auto-dismiss
✅ **Spinner** - 3 tamanhos (sm, md, lg)
✅ **LoadingSkeleton** - Genérico + específicos (JourneyCardSkeleton, VideoCardSkeleton)
✅ **EmptyState** - Com presets empáticos (noVideos, noJourneys, etc)
✅ **ErrorDisplay** - 7 tipos de erro com mensagens específicas

**Por que funciona:**
- Feedback contextual
- Mensagens empáticas
- Acessibilidade (ARIA)

---

### Gamificação (Base)
**MANTER** - Sistema implementado:

- AchievementNotifier (polling 30s)
- AchievementToast (celebração)
- StreakWidget (visualização)
- 6 achievements definidos
- XP table implementation

**Por que funciona:**
- Motivação integrada
- Celebrações visuais
- Tracking automático

---

### API REST Estruturada
**MANTER** - 23 endpoints bem organizados:

- `/api/user/*` - User CRUD
- `/api/breathing/*` - Sessões
- `/api/mood/*` - Check-ins
- `/api/videos/*` - Catálogo + favoritos
- `/api/journeys/*` - Progresso
- `/api/topics/*` - Respostas
- `/api/crisis-log/*` - Registro
- `/api/achievements/*` - Conquistas
- `/api/streaks/*` - Streaks

**Por que funciona:**
- RESTful conventions
- Separação clara de recursos
- Error handling consistente

---

### Banco de Dados (Prisma)
**MANTER** - Schema bem normalizado:

- User com relacionamentos 1:N
- Enums type-safe (DiagnosisType, MoodType, etc)
- Unique constraints corretos
- Cascade deletes

**Por que funciona:**
- Type safety
- Migrations automáticas
- Relacionamentos claros

---

## ⚠️ O QUE PRECISA REFATORAÇÃO

### 1. Landing Page (app/page.tsx)
**PROBLEMA:**
- Muito genérica e simples
- Não vende o produto
- Sem features section
- Sem testimonials
- Sem "how it works"
- Não destaca valor único

**DEVE SER REFATORADO EM:**
- Hero section profissional
- Features showcase
- Social proof
- Clear CTA
- Value proposition

**Referência:** `docs/estrutura/etapas-estrutural.md` - Fase 1

---

### 2. Telas de Auth (sign-in/sign-up)
**PROBLEMA:**
- Usa modais padrão do Clerk
- Sem branding customizado
- Sem contextualização emocional
- Layout não alinhado com design system

**DEVE SER REFATORADO EM:**
- Auth Split Layout (esquerda: branding, direita: form)
- Mensagens empáticas específicas para neurodivergentes
- Ilustrações customizadas
- Aligned com design tokens

**Referência:** `docs/estrutura/patterns-estruturais.md` - Auth Pattern

---

### 3. Onboarding (app/onboarding/page.tsx)
**PROBLEMA ATUAL:**
- Apenas 2 steps (muito básico)
- Não cria conexão emocional
- Não explica benefícios
- Não coleta preferências importantes (goal, experience level, notification time)

**DEVE SER EXPANDIDO PARA:**
```
7 steps progressivos:
1. Welcome (boas-vindas empáticas)
2. Name (personalização)
3. Goal (anxiety/sleep/mood/mindfulness)
4. Experience (beginner/intermediate/advanced)
5. Time preference (quando quer praticar)
6. Notifications (permissão + timing)
7. Complete (celebração + quick start)
```

**Referência:** `docs/estrutura/patterns-estruturais.md` - Onboarding Flow

---

### 4. Home Dashboard (app/home/page.tsx)
**PROBLEMA:**
- Grid estático 2x2 (não personalizado)
- Sem "Continue where you left off"
- Sem recomendações baseadas em contexto
- Sem quick actions
- Não muda baseado em hora do dia
- Sem greeting personalizado

**DEVE ADICIONAR:**
- Greeting contextual ("Bom dia, [Nome]")
- Continue Section (última sessão não completada)
- Recommended Section (baseado em goal + time + recent activity)
- Quick Actions (iniciar sessão rápida)
- Time-based suggestions

**Referência:** `docs/estrutura/patterns-estruturais.md` - Context-Aware Pattern

---

### 5. Breathing Flow (app/breathe/*)
**PROBLEMA:**
- Hub → Session diretamente (sem preparação)
- Sessão sem celebration ao completar
- Não há prep stage ("Prepare-se para 5 minutos de calma")
- Não há complete stage ("Parabéns! +10 XP")

**DEVE SER REESTRUTURADO EM:**
```
3-stage flow:
1. Prep Stage
   - "Prepare-se"
   - Escolher ambiente (som ambiente?)
   - Botão "Iniciar"

2. Active Stage
   - Breathing circle
   - Timer
   - Pause/Stop

3. Complete Stage
   - "Parabéns!"
   - XP gained
   - Mood check-in rápido
   - Reflexão opcional
   - CTA: "Explorar jornadas"
```

**Referência:** `docs/estrutura/patterns-estruturais.md` - Session Flow

---

### 6. Calm/Videos (app/calm/*)
**PROBLEMA:**
- Sem curadoria destacada
- Sem "Staff Picks"
- Sem playlists
- Sem "Continue watching"
- CategoryTabs básicas

**DEVE ADICIONAR:**
- Featured carousel (destaques em carrossel)
- Staff Picks section
- Playlists temáticas
- Continue watching (baseado em histórico)
- Better organization

**Referência:** `docs/estrutura/patterns-estruturais.md` - Curated Content

---

### 7. Discover (app/discover/*)
**PROBLEMA:**
- Apenas lista de jornadas e tópicos
- Sem organização em tabs
- Sem "For You" section
- Confuso (muita opção de uma vez)

**DEVE REORGANIZAR EM:**
```
Tab structure:
1. Para Você (recommendations)
2. Jornadas (journeys)
3. Tópicos (topics)
4. Biblioteca (saved content)
```

**Referência:** `docs/estrutura/plano-estrutural.md` - Discover Reorganization

---

### 8. Profile (app/profile/*)
**PROBLEMA:**
- Dashboard básico com stats
- Gamificação pouco visível (apenas página de achievements)
- Sem dashboard de progresso
- Sem insights construtivos
- XP/Level não exibidos prominently

**DEVE MELHORAR:**
- XP Bar visível no topo
- Level badge com progresso
- Streak destacado
- Insights cards ("Você está 20% mais consistente este mês")
- Achievements gallery melhor
- Progress charts (mood over time, sessions per week)

**Referência:** `docs/estrutura/patterns-estruturais.md` - Gamification

---

### 9. Header/Navigation (components/navigation/Header.tsx)
**PROBLEMA:**
- Header simples (avatar + theme toggle)
- Sem App Shell consistente
- Sem Bottom Navigation (padrão mobile)
- Back button não consistente

**DEVE SER REESTRUTURADO EM:**
```
AppShell:
- TopBar (avatar, notifications, settings)
- MainContent (children)
- BottomNavigation (Home, Respirar, Acalmar, Descobrir, Perfil)
- ToastManager
- ModalManager
```

**Referência:** `docs/estrutura/patterns-estruturais.md` - App Shell

---

### 10. Empty States (components/ui/EmptyState.tsx)
**FUNCIONA, MAS FALTA:**
- Mais presets contextuais (atualmente 5, precisa ~10)
- Illustrations SVG customizadas (atualmente genéricas)
- Tone mais empático

**ADICIONAR PRESETS:**
- firstTimeBreathing
- noReflections
- noStreak
- firstJourney
- welcomeHome

---

### 11. Loading States
**FUNCIONA, MAS FALTA:**
- Skeletons específicos para cada context:
  - HomePageSkeleton
  - BreathingHubSkeleton
  - ProfileDashboardSkeleton
- Melhor UX em transitions

---

### 12. Celebrations
**EXISTE PARCIALMENTE:**
- AchievementToast implementado
- CelebrationBurst component existe

**FALTA:**
- Celebration após completar sessão
- Celebration após completar jornada
- Celebration após streak milestone
- Level up celebration

---

## ❌ O QUE ESTÁ AUSENTE

### 1. Landing Page Profissional
**AUSENTE COMPLETAMENTE:**
- Hero section com value proposition
- Features showcase (4-6 features)
- How it works (3 steps)
- Testimonials/Social proof
- Final CTA section
- Footer com links

**CRIAR:** `app/(marketing)/page.tsx` + components

---

### 2. Auth Split Layout
**AUSENTE:**
- Layout com branding à esquerda
- Custom sign-in/sign-up forms
- Mensagens específicas para neurodivergentes

**CRIAR:** `app/(auth)/layout.tsx` + entrar/cadastrar pages

---

### 3. App Shell com Bottom Navigation
**AUSENTE:**
- Bottom Navigation mobile (padrão apps profissionais)
- App Shell wrapper consistente
- Tab bar com ícones

**CRIAR:**
- `components/layouts/AppShell.tsx`
- `components/layouts/BottomNav.tsx`
- Aplicar em `app/(app)/layout.tsx`

---

### 4. Sistema de Recomendação
**AUSENTE:**
- Recommendation engine (algoritmo de sugestões)
- Context-aware suggestions
- Time-based recommendations
- User affinity scoring

**CRIAR:**
- `lib/recommendations/engine.ts`
- `components/personalization/RecommendedSection.tsx`
- `components/personalization/ContinueSection.tsx`

---

### 5. Onboarding Progressivo (7 steps)
**PARCIALMENTE AUSENTE:**
- Apenas 2 steps implementados
- Falta goal selection
- Falta experience level
- Falta time preference
- Falta notification setup
- Falta celebration final

**EXPANDIR:**
- `components/onboarding/OnboardingFlow.tsx` (wrapper)
- 7 step components
- Progress indicator
- Back navigation

---

### 6. Session Flow Pattern (Prep → Active → Complete)
**PARCIALMENTE AUSENTE:**
- Active stage existe
- Falta Prep stage
- Falta Complete stage com celebration

**CRIAR:**
- `components/flows/SessionFlow.tsx`
- `components/flows/PrepStage.tsx`
- `components/flows/CompleteStage.tsx`

---

### 7. Progressive Question Flow
**AUSENTE:**
- Pattern para mostrar perguntas uma a uma
- Usado em onboarding e reflexões

**CRIAR:**
- `components/flows/ProgressiveQuestion.tsx`

---

### 8. Curated Content Components
**AUSENTE:**
- FeaturedCarousel (carrossel de destaques)
- PlaylistCard (playlists temáticas)
- StaffPicks (escolhas da equipe)

**CRIAR:**
- `components/curated/FeaturedCarousel.tsx`
- `components/curated/PlaylistCard.tsx`
- `components/curated/StaffPicks.tsx`

---

### 9. Gamification Visível
**PARCIALMENTE AUSENTE:**
- XPBar não exibida prominently
- LevelCard não existe
- Celebrations não integradas nos flows

**CRIAR:**
- `components/gamification/LevelCard.tsx` (exibir nível + progresso)
- `components/gamification/XPBar.tsx` (barra de XP)
- `components/gamification/CelebrationModal.tsx` (level up, milestones)

---

### 10. Personalization Components
**AUSENTE:**
- RecommendedSection (seção "Para você")
- ContinueSection ("Continue de onde parou")
- QuickActions (ações rápidas contextuais)

**CRIAR:**
- `components/personalization/RecommendedSection.tsx`
- `components/personalization/ContinueSection.tsx`
- `components/personalization/QuickActions.tsx`

---

### 11. Landing Components
**AUSENTE:**
- HeroSection
- FeaturesSection
- HowItWorksSection
- TestimonialsSection
- CTASection
- Footer

**CRIAR:**
- `components/landing/HeroSection.tsx`
- `components/landing/FeaturesSection.tsx`
- `components/landing/HowItWorksSection.tsx`
- `components/landing/TestimonialsSection.tsx`
- `components/landing/FinalCTASection.tsx`
- `components/landing/Footer.tsx`

---

### 12. Layout Components
**AUSENTE:**
- LandingLayout (para marketing pages)
- AuthLayout (split layout para auth)
- AppShell (wrapper com bottom nav)
- BottomNav (navegação mobile)
- TopBar (header app)

**CRIAR:**
- `components/layouts/LandingLayout.tsx`
- `components/layouts/AuthLayout.tsx`
- `components/layouts/AppShell.tsx`
- `components/layouts/BottomNav.tsx`
- `components/layouts/TopBar.tsx`

---

### 13. Advanced Empty States
**PARCIALMENTE AUSENTE:**
- EmptyState existe mas falta presets:
  - firstTimeHome
  - firstTimeBreathing
  - noRecommendations
  - noHistory
  - firstDayStreak

---

### 14. Skeletons Específicos
**PARCIALMENTE AUSENTE:**
- LoadingSkeleton genérico existe
- Falta skeletons contextuais:
  - HomePageSkeleton
  - BreathingHubSkeleton
  - ProfileDashboardSkeleton
  - RecommendedSectionSkeleton

---

### 15. Feature Flags System
**AUSENTE COMPLETAMENTE:**
- Sistema para rollout incremental
- Não há flags para ligar/desligar features

**CRIAR:**
- `lib/features/flags.ts`
- `.env.local` com flags

---

### 16. Modal Manager
**PARCIALMENTE AUSENTE:**
- uiStore tem openModal/closeModal
- Mas não há ModalManager component renderizando

**CRIAR:**
- `components/ui/ModalManager.tsx` (renderiza modals do store)

---

### 17. Toast Manager
**PARCIALMENTE AUSENTE:**
- Toast component existe
- uiStore gerencia toast
- Mas não há ToastManager centralizando

**MELHORAR:**
- `components/ui/ToastManager.tsx` (renderiza toasts do store)

---

### 18. Progressive Profiling
**AUSENTE:**
- Coletar preferências gradualmente ao longo do uso
- Não perguntar tudo no onboarding

**FUTURO:** P2

---

### 19. Smart Notifications
**AUSENTE:**
- Notificações baseadas em contexto
- "Você não pratica há 3 dias"
- "Hora de refletir"

**FUTURO:** P2

---

### 20. Insights Dashboard
**AUSENTE:**
- Insights construtivos no profile
- "Você está 20% mais consistente"
- Charts de mood over time
- Sessions per week graph

**CRIAR:** Fase 7 (Profile Dashboard)

---

## 📊 RESUMO QUANTITATIVO

### Componentes
- ✅ **MANTER:** 54 componentes base bem estruturados
- ⚠️ **REFATORAR:** 12 páginas/componentes existentes
- ❌ **CRIAR:** ~40 novos componentes

### Páginas
- ✅ **MANTER:** 30 rotas funcionais
- ⚠️ **REFATORAR:** 8 fluxos principais
- ❌ **CRIAR:** 1 Landing + 2 Auth + layouts

### Sistemas
- ✅ **MANTER:** Auth, Theme, Estado Global, API, Banco
- ⚠️ **REFATORAR:** Navegação, Gamificação visível, Personalização
- ❌ **CRIAR:** Feature Flags, Recommendation Engine, Session Flows

---

## 🎯 PRIORIDADES PARA REESTRUTURAÇÃO

### MUST HAVE (P0)
1. ❌ Feature Flags System
2. ❌ Landing Page profissional
3. ⚠️ Auth Split Layout
4. ❌ App Shell + Bottom Nav
5. ⚠️ Onboarding 7 steps
6. ⚠️ Home personalizada
7. ⚠️ Breathing Session Flow (3 stages)

### SHOULD HAVE (P1)
8. ⚠️ Gamificação visível (XPBar, LevelCard)
9. ❌ Recommendation Engine
10. ⚠️ Discover reorganization (tabs)
11. ⚠️ Videos curated (staff picks, playlists)
12. ⚠️ Profile dashboard (insights, charts)

### COULD HAVE (P2)
13. ❌ Advanced empty states
14. ❌ Context-specific skeletons
15. ❌ Celebration system completo
16. ❌ Progressive profiling
17. ❌ Smart notifications

---

## ✅ DECISÕES DE MIGRAÇÃO

### MANTER SEM MUDANÇAS
- Todos componentes UI base (Button, Input, Card, etc)
- Stores Zustand (userStore, uiStore, achievementStore)
- Hooks SWR (useVideos, useJourneys, etc)
- API endpoints
- Prisma schema
- Theme system
- Autenticação Clerk

### REFATORAR (MELHORAR ESTRUTURA)
- Landing page → Criar nova profissional
- Auth screens → Custom com branding
- Onboarding → Expandir para 7 steps
- Home → Adicionar personalização
- Breathing → 3-stage flow
- Videos → Curadoria
- Discover → Tab organization
- Profile → Gamificação visível
- Navigation → App Shell + Bottom Nav

### CRIAR NOVO
- Feature Flags
- App Shell layout
- Bottom Navigation
- Recommendation Engine
- Session Flow pattern
- Curated content components
- Personalization components
- Landing page components
- Advanced skeletons
- Celebration system

---

## 📁 ESTRUTURA DE ARQUIVOS PROPOSTA (COMPLEMENTAR)

```diff
components/
+ ├── layouts/
+ │   ├── LandingLayout.tsx
+ │   ├── AuthLayout.tsx
+ │   ├── AppShell.tsx
+ │   ├── BottomNav.tsx
+ │   └── TopBar.tsx
+ ├── landing/
+ │   ├── HeroSection.tsx
+ │   ├── FeaturesSection.tsx
+ │   ├── HowItWorksSection.tsx
+ │   ├── TestimonialsSection.tsx
+ │   ├── FinalCTASection.tsx
+ │   └── Footer.tsx
+ ├── flows/
+ │   ├── OnboardingFlow.tsx
+ │   ├── SessionFlow.tsx
+ │   ├── PrepStage.tsx
+ │   ├── CompleteStage.tsx
+ │   └── ProgressiveQuestion.tsx
+ ├── personalization/
+ │   ├── RecommendedSection.tsx
+ │   ├── ContinueSection.tsx
+ │   └── QuickActions.tsx
+ ├── curated/
+ │   ├── FeaturedCarousel.tsx
+ │   ├── PlaylistCard.tsx
+ │   └── StaffPicks.tsx
  ├── gamification/
    ├── AchievementNotifier.tsx
    ├── AchievementToast.tsx
    ├── StreakWidget.tsx
+   ├── LevelCard.tsx
+   ├── XPBar.tsx
+   └── CelebrationModal.tsx
  ├── ui/
+   ├── ModalManager.tsx
+   ├── ToastManager.tsx
+   ├── HomePageSkeleton.tsx
+   ├── BreathingHubSkeleton.tsx
+   └── ProfileDashboardSkeleton.tsx

lib/
+ ├── features/
+ │   └── flags.ts
+ ├── recommendations/
+ │   ├── engine.ts
+ │   └── algorithms.ts

app/
+ ├── (marketing)/
+ │   ├── page.tsx              # Nova Landing
+ │   └── layout.tsx
+ ├── (auth)/
+ │   ├── entrar/
+ │   │   └── page.tsx          # Sign In customizado
+ │   ├── cadastrar/
+ │   │   └── page.tsx          # Sign Up customizado
+ │   └── layout.tsx            # Auth Split Layout
  ├── (app)/
+   │   └── layout.tsx          # AppShell wrapper
    ├── home/
-   │   └── page.tsx            # Atual (estático)
+   │   └── page.tsx            # Novo (personalizado)
    ├── breathe/
    │   ├── page.tsx
+   │   ├── prep/
+   │   │   └── page.tsx        # Prep stage
    │   └── session/
-   │       └── page.tsx        # Apenas active
+   │       └── page.tsx        # 3-stage flow
    ├── discover/
-   │   └── page.tsx            # Lista simples
+   │   └── page.tsx            # Tab structure
    └── profile/
-       └── page.tsx            # Stats básicas
+       └── page.tsx            # Dashboard completo
```

---

## 🚦 PRÓXIMOS PASSOS

### 1. IMEDIATO (Hoje)
- ✅ Criar sistema de Feature Flags
- ✅ Configurar `.env.local`

### 2. FASE 1 (Semana 1)
- Criar Landing Page profissional
- Criar Auth Split Layout
- Redesign Sign In/Sign Up

### 3. FASE 2 (Semana 2)
- Criar App Shell + Bottom Nav
- Expandir Onboarding para 7 steps
- Personalizar Home

### 4. FASE 3-7 (Semanas 3-9)
- Seguir `docs/estrutura/etapas-estrutural.md`

---

**Esta auditoria servirá como referência para todas as decisões de implementação da reestruturação.**

**Versão:** 1.0
**Status:** ✅ Completa
**Próximo passo:** Implementar Feature Flags (Fase 0.2)
