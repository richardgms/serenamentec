# 📦 Inventário do Código Existente

## Mapeamento Completo do Serenamente (Estado Atual)

**Versão:** 1.0  
**Data:** 21 de Outubro de 2025  
**Objetivo:** Mapear TUDO que existe para evitar criar duplicado ou sobrescrever sem querer

---

## 🗂️ Estrutura de Diretórios

```
serenamentec/
├── app/              → Páginas Next.js
├── components/       → Componentes React
├── lib/              → Lógica/Utilidades
├── prisma/           → Schema do Banco
├── docs/             → Documentação
├── public/           → Assets estáticos
└── types/            → TypeScript types
```

---

## 📄 PÁGINAS (app/)

### ✅ Páginas que EXISTEM

| Rota | Arquivo | Status | Ação Refatoração |
|------|---------|--------|------------------|
| `/` | `app/page.tsx` | Landing page | ❌ **SUBSTITUIR** (Prompt Estrutura 1.1) |
| `/sign-in/[[...sign-in]]` | `app/sign-in/[[...sign-in]]/page.tsx` | Clerk Auth | ✅ **MANTER** + estilizar |
| `/sign-up/[[...sign-up]]` | `app/sign-up/[[...sign-up]]/page.tsx` | Clerk Auth | ✅ **MANTER** + estilizar |
| `/onboarding` | `app/onboarding/page.tsx` | Onboarding | ❌ **SUBSTITUIR** (Prompt Estrutura 2.2) |
| `/home` | `app/home/page.tsx` | Home autenticada | ✏️ **EDITAR** (Prompt Estrutura 3.1) |
| `/breathe` | `app/breathe/page.tsx` | Hub de respiração | ✏️ **EDITAR** (Semana 6) |
| `/breathe/custom` | `app/breathe/custom/page.tsx` | Configurar padrão | ✅ **MANTER** |
| `/breathe/session` | `app/breathe/session/page.tsx` | Sessão ativa | ❌ **SUBSTITUIR** (Prompt Estrutura 4.2) |
| `/calm` | `app/calm/page.tsx` | Hub de vídeos | ✏️ **EDITAR** (Semana 7) |
| `/calm/[videoId]` | `app/calm/[videoId]/page.tsx` | Player de vídeo | ✅ **MANTER** + polish |
| `/discover` | `app/discover/page.tsx` | Hub Conhecer-se | ✏️ **EDITAR** (Semana 7) |
| `/discover/journeys` | `app/discover/journeys/page.tsx` | Lista de jornadas | ✏️ **EDITAR** |
| `/discover/journeys/[id]` | `app/discover/journeys/[id]/page.tsx` | Jornada específica | ✅ **MANTER** |
| `/discover/topics` | `app/discover/topics/page.tsx` | Lista de tópicos | ✏️ **EDITAR** |
| `/discover/topics/[id]` | `app/discover/topics/[id]/page.tsx` | Tópico específico | ✅ **MANTER** |
| `/profile` | `app/profile/page.tsx` | Perfil principal | ✏️ **EDITAR** (Semana 9) |
| `/profile/achievements` | `app/profile/achievements/page.tsx` | Achievements | ✏️ **EDITAR** |
| `/profile/crisis-log` | `app/profile/crisis-log/page.tsx` | Log de crises | ✅ **MANTER** |
| `/profile/delete` | `app/profile/delete/page.tsx` | Deletar conta | ✅ **MANTER** |
| `/profile/edit` | `app/profile/edit/page.tsx` | Editar perfil | ✅ **MANTER** |
| `/profile/history` | `app/profile/history/page.tsx` | Histórico | ✅ **MANTER** |
| `/profile/settings` | `app/profile/settings/page.tsx` | Configurações | ✅ **MANTER** + theme toggle |

### ❌ Páginas que NÃO EXISTEM (Criar)

| Rota | Status | Criar em |
|------|--------|----------|
| `/` (nova landing) | Não existe | Semana 3 (Prompt Estrutura 1.1) |
| `/boas-vindas` | Não existe | Semana 4 (Prompt Estrutura 2.2) |
| `/inicio` | `/home` existe, renomear? | Semana 5 (decidir) |

---

## 🧩 COMPONENTES (components/)

### ✅ Componentes UI Base que EXISTEM

| Componente | Arquivo | Status | Ação Refatoração |
|------------|---------|--------|------------------|
| `Button` | `components/ui/Button.tsx` | Básico | ❌ **SUBSTITUIR** (Visual Prompt 2.1) |
| `Card` | `components/ui/Card.tsx` | Básico | ❌ **SUBSTITUIR** (Visual Prompt 2.2) |
| `Spinner` | `components/ui/Spinner.tsx` | Básico | ✏️ **EDITAR** cores |
| `Toast` | `components/ui/Toast.tsx` | Básico | ✅ **MANTER** |
| `EmptyState` | `components/ui/EmptyState.tsx` | Básico | ❌ **SUBSTITUIR** (Visual Prompt 6.4) |
| `LoadingSkeleton` | `components/ui/LoadingSkeleton.tsx` | Básico | ❌ **SUBSTITUIR** (Visual Prompt 3.4) |
| `JourneyCardSkeleton` | `components/ui/JourneyCardSkeleton.tsx` | Específico | ❌ **SUBSTITUIR** (Visual Prompt 3.4) |
| `VideoCardSkeleton` | `components/ui/VideoCardSkeleton.tsx` | Específico | ❌ **SUBSTITUIR** (Visual Prompt 3.4) |
| `ProgressIndicator` | `components/ui/ProgressIndicator.tsx` | Básico | ✅ **MANTER** |
| `RippleButton` | `components/ui/RippleButton.tsx` | Existe? | ✅ **MANTER** ou criar |
| `PullToRefresh` | `components/ui/PullToRefresh.tsx` | Existe | ✅ **MANTER** |
| `OptimizedImage` | `components/ui/OptimizedImage.tsx` | Existe | ✅ **MANTER** |

**❌ Componentes UI que NÃO EXISTEM (Criar):**
- `Input` → Criar em Visual Prompt 2.3
- `Avatar` → Criar em Visual Prompt 2.4
- `Badge` → Criar em Visual Prompt 2.5

### ✅ Componentes de Navegação

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `Header` | `components/navigation/Header.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 3.1) |
| `Breadcrumb` | `components/navigation/Breadcrumb.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 3.2) |

**❌ Não Existem (Criar):**
- `BottomNav` → Criar em Estrutura Prompt 2.1

### ✅ Componentes Home

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `MoodCheckIn` | `components/home/MoodCheckIn.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.1) |

**❌ Não Existem (Criar):**
- `GreetingSection` → Criar em Semana 5
- `RecommendedSection` → Criar em Semana 5
- `ContinueSection` → Criar em Semana 5
- `QuickActionsGrid` → Criar em Semana 5

### ✅ Componentes Breathe

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `BreathingCircle` | `components/breathe/BreathingCircle.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.2) |
| `BreathingPatternCard` | `components/breathe/BreathingPatternCard.tsx` | Existe | ✏️ **EDITAR** estilo |

### ✅ Componentes Calm

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `VideoCard` | `components/calm/VideoCard.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.3) |
| `CategoryTabs` | `components/calm/CategoryTabs.tsx` | Existe | ✏️ **EDITAR** estilo |
| `FavoriteButton` | `components/calm/FavoriteButton.tsx` | Existe | ✅ **MANTER** |

### ✅ Componentes Discover

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `JourneyCard` | `components/discover/JourneyCard.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.4) |
| `TopicCard` | `components/discover/TopicCard.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.4) |
| `ProgressBar` | `components/discover/ProgressBar.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 2.5) |
| `DailyReflectionWidget` | `components/discover/DailyReflectionWidget.tsx` | Existe | ✏️ **EDITAR** |
| `ResonateButtons` | `components/discover/ResonateButtons.tsx` | Existe | ✅ **MANTER** |

### ✅ Componentes Gamification

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `AchievementToast` | `components/gamification/AchievementToast.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 4.5) |
| `AchievementNotifier` | `components/gamification/AchievementNotifier.tsx` | Existe | ✏️ **EDITAR** |
| `StreakWidget` | `components/gamification/StreakWidget.tsx` | Existe | ✏️ **EDITAR** |

**❌ Não Existem (Criar):**
- `XPBar` → Criar em Semana 8
- `LevelBadge` → Criar em Semana 8
- `AchievementCard` → Criar em Semana 8

### ✅ Componentes Profile

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `StatCard` | `components/profile/StatCard.tsx` | Existe | ✏️ **EDITAR** estilo |
| `CrisisCard` | `components/profile/CrisisCard.tsx` | Existe | ✅ **MANTER** |
| `DeleteConfirmModal` | `components/profile/DeleteConfirmModal.tsx` | Existe | ✅ **MANTER** |
| `IntensitySlider` | `components/profile/IntensitySlider.tsx` | Existe | ✅ **MANTER** |
| `ToggleSwitch` | `components/profile/ToggleSwitch.tsx` | Existe | ✅ **MANTER** |

### ✅ Componentes Onboarding

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `Step1PersonalInfo` | `components/onboarding/Step1PersonalInfo.tsx` | Existe | ❌ **SUBSTITUIR** (OnboardingFlow) |
| `Step2Diagnosis` | `components/onboarding/Step2Diagnosis.tsx` | Existe | ❌ **SUBSTITUIR** (OnboardingFlow) |
| `PhotoUpload` | `components/onboarding/PhotoUpload.tsx` | Existe | ✅ **MANTER** |

**❌ Não Existe (Criar):**
- `OnboardingFlow` → Criar em Semana 4 (Estrutura Prompt 2.2)

### ✅ Componentes Transitions

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `PageTransition` | `components/transitions/PageTransition.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 3.3) |

### ✅ Componentes Errors

| Componente | Arquivo | Status | Ação |
|------------|---------|--------|------|
| `ErrorDisplay` | `components/errors/ErrorDisplay.tsx` | Existe | ✏️ **EDITAR** |
| `NetworkError` | `components/errors/NetworkError.tsx` | Existe | ❌ **SUBSTITUIR** (Visual Prompt 6.5) |
| `NotFound` | `components/errors/NotFound.tsx` | Existe | ✏️ **EDITAR** |

---

## 🛠️ LÓGICA E UTILITIES (lib/)

### ✅ Hooks que EXISTEM

| Hook | Arquivo | Status | Ação |
|------|---------|--------|------|
| `useUser` | `lib/hooks/useUser.ts` | Existe | ✅ **MANTER** |
| `useSWRData` | `lib/hooks/useSWRData.ts` | Existe | ✅ **MANTER** |
| `useHaptic` | `lib/hooks/useHaptic.ts` | Existe | ✅ **MANTER** |

**❌ Hooks que NÃO EXISTEM (Criar):**
- `useTheme` → Criar em Visual Prompt 1.4
- `useRipple` → Criar em Visual Prompt 6.1

### ✅ Stores (Zustand)

| Store | Arquivo | Status | Ação |
|-------|---------|--------|------|
| `userStore` | `lib/store/userStore.ts` | Existe | ✅ **MANTER** |
| `uiStore` | `lib/store/uiStore.ts` | Existe | ✏️ **EDITAR** (adicionar theme) |
| `achievementStore` | `lib/store/achievementStore.ts` | Existe | ✅ **MANTER** |

### ✅ Utils

| Util | Arquivo | Status | Ação |
|------|---------|--------|------|
| `breathingPatterns` | `lib/utils/breathingPatterns.ts` | Existe | ✅ **MANTER** |
| `dateHelpers` | `lib/utils/dateHelpers.ts` | Existe | ✅ **MANTER** |
| `errorHandler` | `lib/utils/errorHandler.ts` | Existe | ✅ **MANTER** |
| `haptic` | `lib/utils/haptic.ts` | Existe | ✅ **MANTER** |
| `vibration` | `lib/utils/vibration.ts` | Existe | ✅ **MANTER** |
| `youtube` | `lib/utils/youtube.ts` | Existe | ✅ **MANTER** |
| `imageOptimization` | `lib/utils/imageOptimization.ts` | Existe | ✅ **MANTER** |
| `journeyHelpers` | `lib/utils/journeyHelpers.ts` | Existe | ✅ **MANTER** |
| `topicHelpers` | `lib/utils/topicHelpers.ts` | Existe | ✅ **MANTER** |

**❌ Utils que NÃO EXISTEM (Criar):**
- `lib/gamification/xp.ts` → Criar em Semana 8
- `lib/gamification/levels.ts` → Criar em Semana 8
- `lib/gamification/achievements.ts` → Criar em Semana 8
- `lib/design/theme.ts` → Criar em Visual Prompt 1.4

### ✅ Achievements

| Arquivo | Status | Ação |
|---------|--------|------|
| `lib/achievements/achievementChecker.ts` | Existe | ✅ **MANTER** |
| `lib/achievements/achievementHelpers.ts` | Existe | ✅ **MANTER** |

### ✅ Streaks

| Arquivo | Status | Ação |
|---------|--------|------|
| `lib/streaks/streakHelpers.ts` | Existe | ✅ **MANTER** |

---

## 🗄️ API ROUTES (app/api/)

### ✅ Rotas que EXISTEM

| Endpoint | Arquivo | Ação |
|----------|---------|------|
| `POST /api/achievements/acknowledge` | `app/api/achievements/acknowledge/route.ts` | ✅ **MANTER** |
| `GET /api/achievements` | `app/api/achievements/route.ts` | ✅ **MANTER** |
| `GET /api/breathing/custom` | `app/api/breathing/custom/route.ts` | ✅ **MANTER** |
| `POST /api/breathing/sessions` | `app/api/breathing/sessions/route.ts` | ✅ **MANTER** |
| `POST /api/crisis-log` | `app/api/crisis-log/route.ts` | ✅ **MANTER** |
| `DELETE /api/crisis-log/delete-all` | `app/api/crisis-log/delete-all/route.ts` | ✅ **MANTER** |
| `GET /api/journeys/content` | `app/api/journeys/content/route.ts` | ✅ **MANTER** |
| `POST /api/journeys/progress` | `app/api/journeys/progress/route.ts` | ✅ **MANTER** |
| `POST /api/mood/check-in` | `app/api/mood/check-in/route.ts` | ✅ **MANTER** |
| `POST /api/reflections/daily` | `app/api/reflections/daily/route.ts` | ✅ **MANTER** |
| `GET /api/streaks` | `app/api/streaks/route.ts` | ✅ **MANTER** |
| `GET /api/topics/content` | `app/api/topics/content/route.ts` | ✅ **MANTER** |
| `POST /api/topics/exploration` | `app/api/topics/exploration/route.ts` | ✅ **MANTER** |
| `DELETE /api/user/delete` | `app/api/user/delete/route.ts` | ✅ **MANTER** |
| `POST /api/user/onboarding` | `app/api/user/onboarding/route.ts` | ✅ **MANTER** |
| `GET/PATCH /api/user/preferences` | `app/api/user/preferences/route.ts` | ✅ **MANTER** |
| `GET/PATCH /api/user/profile` | `app/api/user/profile/route.ts` | ✅ **MANTER** |
| `GET /api/user/stats` | `app/api/user/stats/route.ts` | ✅ **MANTER** |
| `GET /api/user` | `app/api/user/route.ts` | ✅ **MANTER** |
| `GET /api/videos` | `app/api/videos/route.ts` | ✅ **MANTER** |
| `POST /api/videos/favorites` | `app/api/videos/favorites/route.ts` | ✅ **MANTER** |
| `POST /api/videos/history` | `app/api/videos/history/route.ts` | ✅ **MANTER** |
| `POST /api/webhooks/clerk` | `app/api/webhooks/clerk/route.ts` | ✅ **MANTER** |

**❌ Rotas que NÃO EXISTEM (Talvez criar):**
- `POST /api/gamification/xp` → Se necessário em Semana 8
- `POST /api/recommendations` → Se personalização em Semana 5

---

## 🎨 DESIGN SYSTEM (docs/visual/)

| Arquivo | Status | Ação |
|---------|--------|------|
| `design-tokens.ts` | ✅ Existe | ✅ **USAR** como referência |
| `identidade-visual.md` | ✅ Existe | ✅ **LER** antes de estilizar |
| `planovisual.md` | ✅ Existe | ✅ **SEGUIR** diretrizes |
| `etapasvisual-v2.md` | ✅ Existe | ✅ **EXECUTAR** passo a passo |

---

## 📊 BANCO DE DADOS (prisma/)

### ✅ Schema Existente

**Modelos principais:**
- `User`
- `MoodCheckIn`
- `BreathingSession`
- `DailyReflection`
- `JourneyProgress`
- `TopicExploration`
- `VideoHistory`
- `Achievement`
- `CrisisLogEntry`
- `UserGoal`

**❗ Ação:** NÃO MODIFICAR schema sem consultar antes.

---

## 🎯 AÇÕES POR TIPO DE COMPONENTE

### ❌ **SUBSTITUIR** (Criar novo, deletar antigo)

**Componentes:**
- `Button`, `Card` → Visual Prompts 2.1, 2.2
- `Header`, `Breadcrumb` → Visual Prompts 3.1, 3.2
- `MoodCheckIn` → Visual Prompt 4.1
- `BreathingCircle` → Visual Prompt 4.2
- `VideoCard` → Visual Prompt 4.3
- `JourneyCard`, `TopicCard` → Visual Prompt 4.4
- `AchievementToast` → Visual Prompt 4.5
- `EmptyState`, `NetworkError` → Visual Prompts 6.4, 6.5
- `Loading Skeletons` → Visual Prompt 3.4
- `PageTransition` → Visual Prompt 3.3

**Páginas:**
- `/` (Landing) → Estrutura Prompt 1.1
- `/onboarding` → Estrutura Prompt 2.2
- `/breathe/session` → Estrutura Prompt 4.2

### ✏️ **EDITAR** (Modificar existente)

**Componentes:**
- `BreathingPatternCard` → Aplicar novos estilos
- `CategoryTabs` → Aplicar novos estilos
- `StatCard` → Aplicar novos estilos
- `ErrorDisplay`, `NotFound` → Melhorar UX

**Páginas:**
- `/home` → Adicionar seções personalizadas
- `/breathe` → Melhorar hub
- `/calm` → Melhorar curadoria
- `/discover` → Reorganizar tabs
- `/profile` → Dashboard profissional

### ✅ **MANTER** (Não mexer)

**Componentes:**
- `Toast`, `ProgressIndicator`, `OptimizedImage`, `PullToRefresh`
- `FavoriteButton`, `ResonateButtons`
- `CrisisCard`, `DeleteConfirmModal`, `IntensitySlider`, `ToggleSwitch`
- `PhotoUpload`
- Todos components em `errors/` (manter estrutura)

**Páginas:**
- Todas páginas de `/profile/*` (exceto main)
- `/breathe/custom`
- `/calm/[videoId]`
- `/discover/journeys/[id]`, `/discover/topics/[id]`
- Auth pages (Clerk)

**API Routes:**
- Todas (não mexer)

**Libs:**
- Todos hooks, stores, utils (não mexer, exceto uiStore)

---

## 🚨 REGRAS DE OURO

### Antes de CRIAR novo componente:

1. ✅ Verificar se existe neste inventário
2. ✅ Se existe, decidir: SUBSTITUIR ou EDITAR?
3. ✅ Se SUBSTITUIR, backup do antigo (ou git)

### Antes de EDITAR componente:

1. ✅ Verificar onde é usado (search in files)
2. ✅ Testar após edição em TODAS as páginas que usam

### Antes de DELETAR componente:

1. ❌ NÃO DELETAR sem verificar dependências
2. ✅ Search in files pelo import
3. ✅ Se usado, SUBSTITUIR antes

---

## 🔍 Como Usar Este Inventário

### Exemplo 1: Criar Button

```markdown
1. Consultar inventário: Button.tsx EXISTE
2. Status: ❌ SUBSTITUIR
3. Ação: Criar novo em Visual Prompt 2.1
4. Verificar usos: Search "from '@/components/ui/Button'"
5. Garantir compatibilidade (props iguais ou migração)
```

### Exemplo 2: Editar Home Page

```markdown
1. Consultar inventário: app/home/page.tsx EXISTE
2. Status: ✏️ EDITAR
3. Ação: Adicionar seções em Semana 5
4. Não substituir, apenas adicionar componentes novos
```

### Exemplo 3: Criar XP System

```markdown
1. Consultar inventário: lib/gamification/xp.ts NÃO EXISTE
2. Status: ❌ CRIAR NOVO
3. Ação: Criar em Semana 8
4. Sem conflitos
```

---

## 📝 Resumo Estatístico

| Categoria | Total | Substituir | Editar | Manter | Criar Novo |
|-----------|-------|------------|--------|--------|------------|
| Páginas | 21 | 3 | 8 | 10 | 2 |
| Componentes UI | 15 | 7 | 2 | 6 | 3 |
| Componentes Específicos | 20+ | 10 | 8 | 7 | 5 |
| API Routes | 25 | 0 | 0 | 25 | 0-2 |
| Libs/Utils | 15+ | 0 | 1 | 14 | 4 |

---

**Este inventário é a FONTE DA VERDADE do que existe no projeto.**

**Sempre consultar antes de criar/editar/deletar.**

**Versão:** 1.0 ✅

