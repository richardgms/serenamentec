# 🎨 Plano de Refatoração UX/UI - Serenamente

## PRD: Implementação do Sistema Calm Organic Design

---

## 📋 Sumário Executivo

### Objetivo
Refatorar completamente a interface do Serenamente, elevando o nível de profissionalismo e coesão visual através da implementação do sistema **Calm Organic Design**, tornando a experiência mais acolhedora, acessível e visualmente harmoniosa.

### Problema Atual
- Identidade visual inconsistente entre páginas
- Componentes parecem criados por designers diferentes
- Falta de sistema de design unificado
- Aparência "mediana" que não reflete o cuidado e profissionalismo esperado para um app de saúde mental
- Microinterações ausentes ou básicas

### Solução Proposta
Implementação completa do sistema Calm Organic Design com:
- Design tokens centralizados
- Componentes redesenhados com identidade única
- Microinterações sutis e acolhedoras
- Paleta de cores baseada na logo (turquesa orgânico)
- Tipografia profissional (Plus Jakarta Sans)
- Sistema de animações consistente

### Métricas de Sucesso
- [ ] 100% dos componentes usando design tokens
- [ ] Consistência visual entre todas as páginas (avaliação subjetiva)
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Tempo de carregamento < 2s (3G)
- [ ] Feedback positivo de usuários teste sobre "aparência profissional"

---

## 🎯 Escopo do Projeto

### ✅ O que ESTÁ incluído

#### 1. Sistema de Design
- [x] Criação de design tokens (`design-tokens.ts`)
- [ ] Refatoração de `globals.css` com novas variáveis
- [ ] Atualização de `tailwind.config.ts`
- [ ] Criação de utilities CSS customizadas

#### 2. Componentes Base (Redesign Completo)
- [ ] `Button.tsx` - 4 variantes (primary, secondary, ghost, danger)
- [ ] `Card.tsx` - 3 variantes (default, glass, elevated)
- [ ] `MobileContainer.tsx` - Com padrão de pétalas opcional
- [ ] `Input.tsx` - Com estados focus/error melhorados
- [ ] `Toast.tsx` - Novo design com animações
- [ ] `Modal.tsx` - Com glassmorphism
- [ ] `ProgressBar.tsx` - Estilo orgânico
- [ ] `Avatar.tsx` - Com border e shadow consistentes
- [ ] `Badge.tsx` - Para conquistas e notificações
- [ ] `Slider.tsx` - Para intensidade e configurações

#### 3. Componentes de Navegação
- [ ] `Header.tsx` - Redesign com toggle de tema
- [ ] `Breadcrumb.tsx` - Estilo mais clean
- [ ] `BottomNav.tsx` - Se necessário (avaliar)

#### 4. Componentes de Módulos (Redesign)
- [ ] `MoodCheckIn.tsx` - Emojis maiores, animações
- [ ] `BreathingCircle.tsx` - Gradientes e glow
- [ ] `VideoCard.tsx` - Glass effect no hover
- [ ] `JourneyCard.tsx` - Progress visual melhorado
- [ ] `TopicCard.tsx` - Iconografia duotone
- [ ] `AchievementToast.tsx` - Celebração mais impactante
- [ ] `StreakWidget.tsx` - Visualização de streak

#### 5. Páginas (Ajustes de Layout)
- [ ] `/home` - Grid 2x2 com cores únicas por card
- [ ] `/breathe` - Background com pétalas
- [ ] `/calm` - Cards de vídeo com glass
- [ ] `/discover` - Tipografia melhorada
- [ ] `/profile` - Stats cards redesenhados
- [ ] `/onboarding` - Ilustrações e espaçamento

#### 6. Animações e Microinterações
- [ ] Page transitions (framer-motion)
- [ ] Ripple effect em botões
- [ ] Loading skeletons redesenhados
- [ ] Pull-to-refresh
- [ ] Hover states consistentes
- [ ] Focus states acessíveis
- [ ] Haptic feedback (vibração)

#### 7. Tema Escuro
- [ ] Cores adaptadas (escuro morno, não preto)
- [ ] Sombras ajustadas
- [ ] Toggle de tema funcional
- [ ] Persistência de preferência

### ❌ O que NÃO está incluído

- Mudanças de funcionalidade (apenas visual)
- Novos módulos ou features
- Alterações no schema do Prisma
- Mudanças nas API routes (exceto se necessário para tema)
- Refatoração de lógica de negócio
- Testes automatizados (será feita em etapa separada)

---

## 🎨 Princípios de Design

### 1. Organicidade
**Definição:** Uso de formas arredondadas, curvas suaves e elementos inspirados na natureza.

**Aplicação:**
- Border-radius entre 8-24px (nunca 4px ou cantos retos)
- Sombras suaves e multicamadas
- Gradientes sutis em vez de cores chapadas
- Padrão de pétalas em backgrounds

### 2. Hierarquia Visual Clara
**Definição:** O usuário sempre sabe onde olhar primeiro.

**Aplicação:**
- Tipografia com escala 1.25 (Major Third)
- 3 níveis de elevação (base, hover, modal)
- Contraste de peso (300, 400, 600, 700)
- Espaçamento generoso (16-32px entre seções)

### 3. Feedback Imediato
**Definição:** Toda ação do usuário tem resposta visual/tátil.

**Aplicação:**
- Animações de 150-200ms em hover
- Ripple effect em cliques
- Vibração háptica em ações importantes
- Loading states informativos

### 4. Acessibilidade por Design
**Definição:** Inclusão desde a concepção, não como adaptação.

**Aplicação:**
- Contraste mínimo 4.5:1 (WCAG AA)
- Focus states sempre visíveis
- Tamanhos de toque >= 44px
- Suporte a prefers-reduced-motion
- Suporte a prefers-color-scheme

### 5. Performance Perceptível
**Definição:** Mesmo que algo demore, o usuário não se sente esperando.

**Aplicação:**
- Skeleton screens em vez de spinners
- Optimistic updates
- Lazy loading com placeholders
- Animações durante carregamento

---

## 🏗️ Arquitetura de Implementação

### Estrutura de Arquivos (Proposta)

```
lib/
  design/
    tokens.ts           ← Design tokens (já criado)
    theme.ts            ← Context de tema (light/dark)
    animations.ts       ← Variantes de framer-motion
    
components/
  ui/
    Button/
      Button.tsx
      Button.variants.ts
      Button.stories.tsx (futuro)
    Card/
      Card.tsx
      Card.variants.ts
    ...
    
  layout/
    MobileContainer.tsx
    Header.tsx
    PageTransition.tsx
    
  modules/
    breathe/
    calm/
    discover/
    profile/
    
styles/
  globals.css           ← Refatorar com tokens
  animations.css        ← Keyframes CSS puras
  utilities.css         ← Classes helper
```

### Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Tailwind CSS** | 3.4+ | Utility-first styling |
| **Framer Motion** | 11+ | Animações complexas |
| **CSS Variables** | Nativo | Design tokens dinâmicos |
| **next/font** | Nativo | Plus Jakarta Sans otimizado |
| **Phosphor Icons** | 2+ | Iconografia consistente |
| **clsx/cva** | Latest | Class variance authority |

---

## 🎨 Sistema de Cores Detalhado

### Paleta Expandida

Ver `design-tokens.ts` para valores completos.

#### Modo Claro
```css
--surface-main: #F8FAFB
--surface-card: #FFFFFF
--text-primary: #2C3E50
--text-secondary: #64748B
--primary: #7DD3C0
--primary-light: #A8E6D7
--primary-dark: #5FB8A8
```

#### Modo Escuro (Morno)
```css
--surface-main: #1A2332
--surface-card: #243447
--text-primary: #E8F4F8
--text-secondary: #A8C5DA
--primary: #7DD3C0 (mesmo)
--primary-light: #A8E6D7 (mesmo)
```

### Mapeamento de Uso

| Elemento | Cor (Light) | Cor (Dark) |
|----------|-------------|------------|
| Background principal | `#F8FAFB` | `#1A2332` |
| Cards | `#FFFFFF` | `#243447` |
| Botão primário | Gradient `#7DD3C0 → #5FB8A8` | Mesmo |
| Texto principal | `#2C3E50` | `#E8F4F8` |
| Borders sutis | `rgba(125,211,192,0.1)` | `rgba(125,211,192,0.15)` |

---

## 📐 Sistema de Espaçamento

### Escala 4px Base

```
0:  0px
1:  4px   (micro gaps)
2:  8px   (tight spacing)
3:  12px  (small gaps)
4:  16px  (padrão entre elementos)
5:  20px
6:  24px  (entre seções)
8:  32px  (entre blocos)
10: 40px
12: 48px  (page padding)
16: 64px  (large gaps)
```

### Aplicação por Contexto

| Contexto | Espaçamento |
|----------|-------------|
| Entre ícone e texto | `8px` |
| Padding de botão | `12px 24px` |
| Gap de grid 2x2 | `16px` |
| Padding de card | `24px` |
| Entre seções | `32px` |
| Page padding (mobile) | `16px` |

---

## ✍️ Tipografia

### Hierarquia Completa

```typescript
const typography = {
  display: {
    size: '2.441rem',  // 39px
    weight: 700,
    lineHeight: 1.2,
  },
  h1: {
    size: '1.953rem',  // 31px
    weight: 700,
    lineHeight: 1.2,
  },
  h2: {
    size: '1.563rem',  // 25px
    weight: 600,
    lineHeight: 1.3,
  },
  h3: {
    size: '1.25rem',   // 20px
    weight: 600,
    lineHeight: 1.4,
  },
  body: {
    size: '1rem',      // 16px
    weight: 400,
    lineHeight: 1.5,
  },
  small: {
    size: '0.875rem',  // 14px
    weight: 400,
    lineHeight: 1.5,
  },
  caption: {
    size: '0.75rem',   // 12px
    weight: 400,
    lineHeight: 1.4,
  },
}
```

### Classes Tailwind Customizadas

```css
.text-display { @apply text-4xl font-bold leading-tight; }
.text-h1 { @apply text-3xl font-bold leading-tight; }
.text-h2 { @apply text-2xl font-semibold leading-snug; }
.text-h3 { @apply text-xl font-semibold leading-normal; }
.text-body { @apply text-base font-normal leading-normal; }
.text-small { @apply text-sm font-normal leading-normal; }
.text-caption { @apply text-xs font-normal leading-snug; }
```

---

## 🎭 Componentes - Especificações Detalhadas

### Button (4 Variantes)

#### Primary
```tsx
<Button variant="primary">
  Continuar
</Button>

// Visual:
background: linear-gradient(135deg, #7DD3C0, #5FB8A8)
color: white
padding: 12px 24px
border-radius: 12px
font-weight: 600
box-shadow: soft elevation + inset highlight

// States:
hover: translateY(-2px), shadow aumentada
active: scale(0.98)
disabled: opacity 0.5, cursor not-allowed
```

#### Secondary
```tsx
<Button variant="secondary">
  Cancelar
</Button>

// Visual:
background: transparent
border: 2px solid #7DD3C0
color: #7DD3C0
padding: 10px 24px

// States:
hover: background rgba(125,211,192,0.1)
```

#### Ghost
```tsx
<Button variant="ghost">
  Pular
</Button>

// Visual:
background: transparent
color: #64748B
padding: 12px 16px

// States:
hover: background rgba(125,211,192,0.05)
```

#### Danger
```tsx
<Button variant="danger">
  Excluir Conta
</Button>

// Visual:
background: #FF8B94
color: white
(resto igual ao primary)
```

### Card (3 Variantes)

#### Default (Soft Elevation)
```tsx
<Card variant="default">
  Conteúdo
</Card>

// Visual:
background: white (light) / #243447 (dark)
border-radius: 16px
padding: 24px
border: 1px solid rgba(125,211,192,0.1)
box-shadow: multicamadas com tint turquesa

// States:
hover: translateY(-2px), shadow aumentada (se clickable)
```

#### Glass
```tsx
<Card variant="glass">
  Conteúdo especial
</Card>

// Visual:
background: rgba(255,255,255,0.7) (light)
backdrop-filter: blur(20px) saturate(180%)
border: 1px solid rgba(125,211,192,0.2)
box-shadow: inset highlight + external glow
```

#### Elevated
```tsx
<Card variant="elevated">
  Destaque
</Card>

// Visual:
background: white
border-radius: 16px
padding: 24px
box-shadow: XL elevation (mais pronunciada)
```

---

## ⚡ Sistema de Animações

### Categorias de Animação

#### 1. Page Transitions (200ms)
```tsx
// Usando framer-motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

#### 2. Hover States (150ms)
```css
.card-hoverable {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hoverable:hover {
  transform: translateY(-2px);
}
```

#### 3. Ripple Effect (600ms)
```tsx
// Componente RippleButton.tsx
<button onClick={handleClick}>
  {showRipple && (
    <span 
      className="ripple"
      style={{ left: x, top: y }}
    />
  )}
  {children}
</button>

// CSS
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

#### 4. Loading Skeletons
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-primary/10 rounded-full w-3/4 mb-2" />
  <div className="h-4 bg-primary/10 rounded-full w-1/2" />
</div>
```

### Suporte a Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🌓 Modo Escuro

### Implementação

#### 1. Context de Tema
```tsx
// lib/design/theme.ts
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  
  // Lógica de detecção e persistência
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

#### 2. CSS Variables Dinâmicas
```css
:root {
  --surface-main: #F8FAFB;
  --text-primary: #2C3E50;
  /* ... */
}

[data-theme="dark"] {
  --surface-main: #1A2332;
  --text-primary: #E8F4F8;
  /* ... */
}
```

#### 3. Toggle de Tema
```tsx
<button
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  className="theme-toggle"
>
  <motion.div
    animate={{ rotate: theme === 'dark' ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
  </motion.div>
</button>
```

---

## 📱 Responsividade

### Breakpoints (Mobile-first)

```typescript
const breakpoints = {
  xs: '320px',   // iPhone SE
  sm: '375px',   // iPhone padrão
  md: '428px',   // iPhone Pro Max (LIMITE DO APP)
  lg: '768px',   // Não usado (apenas fallback)
}
```

### Container Principal

```css
.mobile-container {
  max-width: 428px;
  margin: 0 auto;
  padding: 0 16px;
}
```

### Grid Responsivo (Home 2x2)

```tsx
<div className="grid grid-cols-2 gap-4">
  {modules.map(module => (
    <Card key={module.id} className="aspect-square">
      {/* Conteúdo */}
    </Card>
  ))}
</div>
```

---

## 🎯 Priorização de Implementação

### Fase 1: Fundação (Semana 1)
**Objetivo:** Estabelecer base técnica

- [ ] Refatorar `globals.css` com design tokens
- [ ] Atualizar `tailwind.config.ts`
- [ ] Criar `ThemeProvider` e toggle
- [ ] Instalar Plus Jakarta Sans
- [ ] Instalar Phosphor Icons
- [ ] Criar utilities de animação

**Entregável:** Sistema de design funcional

### Fase 2: Componentes Base (Semana 2)
**Objetivo:** Redesenhar componentes fundamentais

- [ ] Button (4 variantes)
- [ ] Card (3 variantes)
- [ ] Input
- [ ] Avatar
- [ ] Badge
- [ ] ProgressBar

**Entregável:** Biblioteca de componentes base

### Fase 3: Componentes de Navegação (Semana 3)
**Objetivo:** Navegação consistente

- [ ] Header redesenhado
- [ ] Breadcrumb
- [ ] PageTransition
- [ ] Loading states

**Entregável:** Navegação fluida

### Fase 4: Módulos Específicos (Semana 4-5)
**Objetivo:** Refatorar componentes de features

- [ ] MoodCheckIn
- [ ] BreathingCircle
- [ ] VideoCard
- [ ] JourneyCard
- [ ] TopicCard
- [ ] AchievementToast

**Entregável:** Módulos com identidade visual

### Fase 5: Páginas e Layouts (Semana 6)
**Objetivo:** Aplicar design em páginas completas

- [ ] /home
- [ ] /breathe + /breathe/session
- [ ] /calm + /calm/[videoId]
- [ ] /discover (todas as subpáginas)
- [ ] /profile (todas as subpáginas)
- [ ] /onboarding

**Entregável:** Experiência completa

### Fase 6: Polish e Microinterações (Semana 7)
**Objetivo:** Detalhes que fazem a diferença

- [ ] Ripple effects
- [ ] Hover states
- [ ] Loading skeletons
- [ ] Pull-to-refresh
- [ ] Haptic feedback
- [ ] Animações de conquistas

**Entregável:** Experiência polida

### Fase 7: QA e Ajustes (Semana 8)
**Objetivo:** Garantir qualidade

- [ ] Testes em diferentes devices
- [ ] Ajustes de contraste
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Feedback de usuários teste

**Entregável:** App pronto para produção

---

## 📊 Métricas de Qualidade

### Performance
- **Lighthouse Performance:** >= 90
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle size:** < 200KB (gzipped)

### Acessibilidade
- **Lighthouse Accessibility:** >= 95
- **WCAG Level:** AA (mínimo)
- **Contraste de texto:** >= 4.5:1
- **Tamanhos de toque:** >= 44x44px
- **Navegação por teclado:** 100% funcional

### UX
- **Consistência visual:** 100% (checklist)
- **Tempo de carregamento percebido:** < 1s (com skeletons)
- **Feedback de ações:** 100% (todas têm resposta visual)
- **Taxa de erro de UI:** < 1% (cliques acidentais)

---

## 🚧 Riscos e Mitigações

### Risco 1: Breaking Changes em Componentes Existentes
**Impacto:** Alto  
**Probabilidade:** Alta  
**Mitigação:**
- Criar novos componentes com sufixo `V2` durante transição
- Migrar página por página
- Manter componentes antigos até validação completa

### Risco 2: Performance Degradada por Animações
**Impacto:** Médio  
**Probabilidade:** Média  
**Mitigação:**
- Usar `will-change` apenas quando necessário
- Animar apenas `transform` e `opacity`
- Implementar `prefers-reduced-motion`
- Monitorar FPS em devices reais

### Risco 3: Inconsistências no Modo Escuro
**Impacto:** Médio  
**Probabilidade:** Média  
**Mitigação:**
- Testar TODAS as páginas em ambos os modos
- Usar CSS variables em vez de classes condicionais
- Criar checklist de validação

### Risco 4: Aumento do Bundle Size
**Impacto:** Alto  
**Probabilidade:** Baixa  
**Mitigação:**
- Tree-shaking de ícones (importar apenas usados)
- Code-splitting de framer-motion
- Lazy loading de componentes pesados
- Monitorar com Bundle Analyzer

---

## ✅ Critérios de Aceitação

### Por Componente
- [ ] Usa design tokens (sem valores hardcoded)
- [ ] Funciona em modo claro e escuro
- [ ] Tem hover/focus states
- [ ] É acessível (ARIA, keyboard nav)
- [ ] Tem animações suaves
- [ ] É responsivo (320px-428px)
- [ ] Tem documentação básica

### Por Página
- [ ] Segue layout mobile-first (max 428px)
- [ ] Usa componentes redesenhados
- [ ] Tem loading states
- [ ] Tem error states
- [ ] Tem empty states
- [ ] Respeita espaçamento do sistema
- [ ] Tem transição de entrada

### Global
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 95
- [ ] Sem erros no console
- [ ] Funciona offline (PWA)
- [ ] Tema persiste entre sessões
- [ ] Animações podem ser desabilitadas

---

## 📚 Documentação

### Documentos Criados
1. ✅ `design-tokens.ts` - Sistema de tokens
2. ✅ `identidade-visual.md` - Guia de estilo
3. ✅ `planovisual.md` - Este documento
4. [ ] `etapasvisual.md` - Prompts de implementação

### Documentos Futuros
- [ ] `COMPONENTS.md` - Guia de uso de cada componente
- [ ] `ANIMATIONS.md` - Biblioteca de animações
- [ ] `ACCESSIBILITY.md` - Checklist de acessibilidade
- [ ] `CHANGELOG_VISUAL.md` - Log de mudanças visuais

---

## 🎓 Referências

### Design Systems Inspiradores
- [Material Design 3](https://m3.material.io/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Calm Design System](https://www.calm.com/)
- [Headspace Design](https://www.headspace.com/)

### Ferramentas
- [Figma](https://figma.com/) - Prototipagem (opcional)
- [Coolors](https://coolors.co/) - Paleta de cores
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Recursos
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Phosphor Icons](https://phosphoricons.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Versão:** 1.0  
**Data:** Outubro 2025  
**Autor:** Equipe Serenamente  
**Status:** Aprovado para implementação

