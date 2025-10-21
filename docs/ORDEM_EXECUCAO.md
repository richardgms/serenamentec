# 🔄 Ordem de Execução - Refatoração Serenamente

## Guia Passo a Passo para IA

**Versão:** 2.0 (Corrigida)  
**Para:** Claude 4.5 Sonnet  
**Objetivo:** Ordem exata de implementação sem ambiguidade

---

## 🎯 Decisão Inicial

### Escolha UMA das opções:

#### OPÇÃO A: Visual + Estrutura Integrados (RECOMENDADO) ⭐
**Tempo:** 10 semanas  
**Vantagem:** Implementa e estiliza junto, sem retrabalho  
**Siga:** Este documento (ORDEM_EXECUCAO.md)

#### OPÇÃO B: Apenas Visual
**Tempo:** 8 semanas  
**Vantagem:** Foca só em aparência  
**Siga:** `docs/visual/etapasvisual-v2.md` (ordem sequencial)

#### OPÇÃO C: Apenas Estrutura
**Tempo:** 10 semanas  
**Vantagem:** Foca só em UX/fluxos  
**Problema:** Componentes ficam sem estilo  
**Não Recomendado:** Difícil estilizar depois

---

## 📋 OPÇÃO A: Ordem Integrada (Recomendado)

### Semana 0: Preparação

```
1. ✅ Ler documentação (1h)
   - docs/REFATORACAO_COMPLETA.md
   - docs/NAVEGACAO.md
   
2. ✅ Setup inicial
   [ESTRUTURA] Prompt 0.1 - Auditoria
   [ESTRUTURA] Prompt 0.2 - Feature Flags
   
3. ✅ Instalar dependências
   [VISUAL] Prompt 0.2 - Instalar phosphor-react, CVA, clsx
```

**Validação:**
- [ ] Feature flags configurados (.env.local)
- [ ] Dependências instaladas (package.json)
- [ ] npm run dev funciona

---

### Semana 1: Fundação Visual

**Objetivo:** Criar sistema de design antes de componentes

```
DIA 1-2: Design Tokens
├─ [VISUAL] Prompt 1.1 - globals.css com CSS variables
├─ [VISUAL] Prompt 1.2 - tailwind.config.ts
└─ Validar: Testar classe bg-primary funciona

DIA 3: Tipografia
├─ [VISUAL] Prompt 1.3 - Plus Jakarta Sans
└─ Validar: DevTools mostra fonte correta

DIA 4: Tema
├─ [VISUAL] Prompt 1.4 - ThemeProvider
└─ Validar: Toggle tema funciona

DIA 5: Ícones
├─ [VISUAL] Prompt 1.5 - Phosphor Icons
└─ Validar: Import ícone funciona
```

**Validação Semana 1:**
- [ ] CSS variables --primary existe
- [ ] Plus Jakarta Sans aparece no browser
- [ ] Tema claro/escuro alterna
- [ ] Ícones Phosphor renderizam

**❗ NÃO avançar sem validar**

---

### Semana 2: Componentes Base (Visual)

**Objetivo:** Criar componentes estilizados ANTES de usar

```
DIA 1: Button + Card
├─ [VISUAL] Prompt 2.1 - Button (4 variantes)
├─ [VISUAL] Prompt 2.2 - Card (3 variantes)
└─ Criar /test-components para testar

DIA 2: Input + Avatar
├─ [VISUAL] Prompt 2.3 - Input
├─ [VISUAL] Prompt 2.4 - Avatar
└─ Adicionar em /test-components

DIA 3: Badge + ProgressBar
├─ [VISUAL] Prompt 2.5 - Badge + ProgressBar
└─ Validar animações

DIA 4: Navegação Components
├─ [VISUAL] Prompt 3.1 - Header (estrutura base)
├─ [VISUAL] Prompt 3.2 - Breadcrumb
└─ NÃO aplicar em páginas ainda

DIA 5: States Components
├─ [VISUAL] Prompt 3.3 - PageTransition
├─ [VISUAL] Prompt 3.4 - Loading/Skeletons
└─ Validar animações
```

**Validação Semana 2:**
- [ ] /test-components renderiza todos componentes
- [ ] 4 variantes de Button funcionam
- [ ] 3 variantes de Card funcionam
- [ ] Input com error/helper funciona
- [ ] Animations 150-200ms

**❗ NÃO avançar sem validar**

---

### Semana 3: Landing + Auth (Estrutura → Visual)

**Objetivo:** Primeira página completa (estrutura + estilo)

```
DIA 1: Landing Structure
├─ [ESTRUTURA] Prompt 1.1 - Landing Page (HTML)
├─ USAR componentes criados: Button, Card
└─ Aplicar classes Tailwind dos design tokens

DIA 2: Landing Polish
├─ Aplicar animações (framer-motion)
├─ Testar responsividade 320px-428px
└─ Validar: Lighthouse > 90

DIA 3-4: Auth Screens
├─ [ESTRUTURA] Prompt 1.2 - Auth Layout
├─ USAR componentes: Button, Input, Card
├─ Aplicar glassmorphism no painel esquerdo
└─ Validar: Clerk integrado + estilizado

DIA 5: Review
├─ Testar Landing → Auth flow
├─ Corrigir bugs
└─ Deploy test (opcional)
```

**Validação Semana 3:**
- [ ] Landing page renderiza
- [ ] Hero section com CTAs
- [ ] Auth split 40/60
- [ ] Login/Signup funciona
- [ ] Design consistente

---

### Semana 4: App Shell + Onboarding

```
DIA 1: App Shell
├─ [ESTRUTURA] Prompt 2.1 - AppShell + BottomNav
├─ USAR componentes: Avatar, IconButton
├─ Aplicar glassmorphism em TopBar
└─ Validar: Bottom Nav em todas páginas

DIA 2-3: Onboarding Flow
├─ [ESTRUTURA] Prompt 2.2 - OnboardingFlow
├─ USAR componentes: Button, Input, Card, ProgressBar
├─ Aplicar animações de transição
└─ Validar: 7 steps funcionam

DIA 4: Integration
├─ Conectar Landing → Auth → Onboarding → Home
├─ Testar fluxo completo
└─ Corrigir navegação

DIA 5: Polish
├─ Adicionar celebrações (AchievementToast)
├─ Haptic feedback em seleções
└─ Validar UX completa
```

**Validação Semana 4:**
- [ ] Bottom Nav aparece em /inicio
- [ ] Onboarding 7 steps completos
- [ ] Fluxo Landing → Home funciona
- [ ] Mobile 320px OK

---

### Semana 5: Home Personalizada

```
DIA 1: Home Structure
├─ Criar app/inicio/page.tsx
├─ Layout: Greeting + MoodCheckIn + QuickActions
└─ USAR componentes: Card, Button

DIA 2: MoodCheckIn Redesign
├─ [VISUAL] Prompt 4.1 - MoodCheckIn
├─ Aplicar animações de glow
├─ Haptic feedback
└─ Validar: 5 emojis funcionam

DIA 3: Recommendation Section
├─ Lógica de recomendação (baseado em objetivo)
├─ RecommendedCard component
└─ Validar: Muda conforme usuário

DIA 4: Continue Section + Quick Actions
├─ Continue where you left off
├─ Grid 2x2 de quick actions
└─ Validar: Navegação funciona

DIA 5: Stats Widget
├─ StatsGrid component
├─ Integrar com dados reais
└─ Validar: Números corretos
```

**Validação Semana 5:**
- [ ] Home personalizada
- [ ] MoodCheckIn funciona
- [ ] Recomendações aparecem
- [ ] Quick actions navegam

---

### Semana 6: Breathing Flow Completo

```
DIA 1: Breathing Hub
├─ Lista de padrões
├─ USAR componentes: Card, Badge
├─ Stats bar no topo
└─ Validar: Navegação para sessão

DIA 2-3: Session Flow
├─ [ESTRUTURA] Prompt 4.2 - SessionFlow (3 stages)
├─ Stage 1: Preparação (checklist)
├─ Stage 2: BreathingCircle
├─ Stage 3: Completion
└─ Aplicar animações

DIA 3: BreathingCircle Redesign
├─ [VISUAL] Prompt 4.2 - BreathingCircle
├─ Gradiente radial animado
├─ Glow sincronizado
├─ Haptic nas transições
└─ Validar: Animação fluida

DIA 4: Celebration
├─ Completion screen com confetti
├─ Stats da sessão
├─ MoodAfter check
└─ Validar: Celebração impacta

DIA 5: Integration
├─ Salvar sessão no BD
├─ Atualizar stats
├─ XP gain (preparar para gamificação)
└─ Validar: Dados persistem
```

**Validação Semana 6:**
- [ ] Breathing hub com padrões
- [ ] Sessão: prep → active → complete
- [ ] Animação sincronizada
- [ ] Celebration ao finalizar

---

### Semana 7: Vídeos + Discover

```
DIA 1-2: Videos Hub
├─ [ESTRUTURA] Curated sections
├─ [VISUAL] Prompt 4.3 - VideoCard
├─ Glass hover effect
├─ Favorite button
└─ Validar: Grid responsivo

DIA 3-4: Discover Tabs
├─ Tab system (For You, Jornadas, Biblioteca)
├─ [VISUAL] Prompt 4.4 - JourneyCard + TopicCard
├─ Progress bars
└─ Validar: Navegação entre tabs

DIA 5: Daily Reflection
├─ Widget na Home ou Discover
├─ Salvar reflexão
└─ Validar: Persiste dados
```

**Validação Semana 7:**
- [ ] Videos com curadoria
- [ ] Hover glass effect
- [ ] Discover com 3 tabs
- [ ] Cards com progress

---

### Semana 8: Gamificação

```
DIA 1: XP System
├─ lib/gamification/xp.ts
├─ Calcular XP por ação
├─ XPBar component
└─ Validar: XP aumenta

DIA 2: Level System
├─ lib/gamification/levels.ts
├─ LevelCard component
├─ Cálculo de level up
└─ Validar: Level up funciona

DIA 3: Achievements
├─ lib/gamification/achievements.ts
├─ Achievement unlock logic
├─ [VISUAL] Prompt 4.5 - AchievementToast
└─ Validar: Toast aparece

DIA 4: Streak Tracker
├─ StreakTracker component
├─ Calendar view
├─ Motivational messages
└─ Validar: Streak conta dias

DIA 5: Integration
├─ Adicionar XP em todas ações
├─ Adicionar achievements checks
├─ Profile mostra level + streak
└─ Validar: Tudo conectado
```

**Validação Semana 8:**
- [ ] XP aumenta ao fazer ações
- [ ] Level up celebrado
- [ ] Achievements desbloqueiam
- [ ] Streak visível

---

### Semana 9: Profile + Polish

```
DIA 1-2: Profile Dashboard
├─ [ESTRUTURA] Profile Header com Level
├─ Weekly summary
├─ Activity chart
├─ Achievement showcase
└─ Validar: Dados corretos

DIA 3: Polish Visual
├─ [VISUAL] Prompt 6.1 - Ripple effects
├─ [VISUAL] Prompt 6.2 - Haptic em ações
├─ [VISUAL] Prompt 6.3 - Pull to refresh
└─ Validar: Microinterações

DIA 4: Empty States
├─ [VISUAL] Prompt 6.4 - Empty States
├─ 10+ contextos diferentes
├─ Mensagens empáticas
└─ Validar: Aparecem quando necessário

DIA 5: Error States
├─ [VISUAL] Prompt 6.5 - Error States
├─ Network error, 404, etc
├─ Recovery actions
└─ Validar: Erros tratados
```

**Validação Semana 9:**
- [ ] Profile dashboard completo
- [ ] Ripple em botões
- [ ] Empty states contextuais
- [ ] Error recovery claro

---

### Semana 10: QA Final

```
DIA 1: Audit de Contraste
├─ [VISUAL] Prompt 7.1
├─ WebAIM Contrast Checker
├─ Corrigir cores se necessário
└─ Validar: Contraste >= 4.5:1

DIA 2: Audit de Acessibilidade
├─ [VISUAL] Prompt 7.2
├─ Lighthouse Accessibility
├─ ARIA labels
├─ Keyboard navigation
└─ Validar: Score >= 95

DIA 3: Performance Audit
├─ [VISUAL] Prompt 7.3
├─ Bundle analyzer
├─ Lazy loading
├─ Code splitting
└─ Validar: Performance >= 90

DIA 4: Cross-Device Testing
├─ [VISUAL] Prompt 7.4
├─ iPhone SE (320px)
├─ iPhone 12 (390px)
├─ iPhone 14 Pro Max (428px)
└─ Validar: Responsivo

DIA 5: Final Polish
├─ [VISUAL] Prompt 7.5
├─ Checklist completo
├─ Corrigir últimos bugs
├─ Preparar deploy
└─ 🎉 COMPLETO!
```

**Validação Semana 10:**
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 95
- [ ] Contraste WCAG AA
- [ ] Responsivo 320px-428px
- [ ] Sem console errors
- [ ] Build produção OK

---

## 🎯 Resumo da Ordem

### Prioridade de Execução

```
1. Visual Foundation (Semanas 1-2)
   ↓
2. Landing + Auth (Semana 3)
   ↓
3. App Shell (Semana 4)
   ↓
4. Home (Semana 5)
   ↓
5. Core Features (Semanas 6-7)
   ↓
6. Gamification (Semana 8)
   ↓
7. Polish + QA (Semanas 9-10)
```

### Regra de Ouro

**NUNCA crie estrutura HTML sem ter componentes visuais prontos.**

**Exemplo ERRADO:**
```tsx
// ❌ Criar página sem Button pronto
<button>Clique</button> // Sem estilo
```

**Exemplo CORRETO:**
```tsx
// ✅ Criar Button visual primeiro, depois usar
import { Button } from '@/components/ui/Button' // Já estilizado
<Button>Clique</Button>
```

---

## 📋 Checklist de Cada Dia

### Antes de Começar
- [ ] Ler prompt do dia
- [ ] Verificar dependências (prompts anteriores)
- [ ] Confirmar componentes necessários existem

### Durante Implementação
- [ ] Copiar código COMPLETO (não resumir)
- [ ] Aplicar design tokens (não hardcode)
- [ ] Testar em tempo real (npm run dev)

### Após Implementar
- [ ] Validar checklist do prompt
- [ ] Testar manualmente
- [ ] Sem erros no console
- [ ] Commit (opcional)

---

## 🚨 Avisos Importantes

### ❌ NÃO FAZER
- Pular semanas
- Criar componente sem estilo
- Hardcodear cores (#FFF)
- Ignorar checklists
- Implementar sem validar

### ✅ FAZER
- Seguir ordem exata
- Validar cada etapa
- Usar design tokens
- Testar responsividade
- Ler documentação referenciada

---

## 📞 Em Caso de Dúvida

### Se não sei qual arquivo editar:
→ Consultar `docs/INVENTARIO.md`

### Se não sei como estilizar:
→ Consultar `docs/visual/design-tokens.ts`

### Se não sei o padrão UX:
→ Consultar `docs/estrutura/patterns-estruturais.md`

### Se encontro erro:
→ Consultar Troubleshooting em `etapasvisual-v2.md`

---

**Esta é a ordem DEFINITIVA de execução. Não há ambiguidade.**

**Versão:** 2.0  
**Status:** Pronto para execução por IA ✅

