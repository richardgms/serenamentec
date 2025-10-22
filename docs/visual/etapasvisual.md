# 🎨 Etapas de Implementação - Refatoração Visual Serenamente

## Guia de Prompts para Implementação do Sistema Calm Organic Design

---

## **CONTEXTO PARA CADA SESSÃO**

```markdown
Estou refatorando a identidade visual do Serenamente para implementar o sistema Calm Organic Design.

**Documentação:**
- Design Tokens: docs/visual/design-tokens.ts
- Identidade Visual: docs/visual/identidade-visual.md
- Plano Completo: docs/visual/planovisual.md

**Princípios:**
- Paleta turquesa orgânica (#7DD3C0)
- Tipografia: Plus Jakarta Sans
- Iconografia: Phosphor Icons (Duotone)
- Border-radius: 8-24px (orgânico)
- Animações: 150-200ms
- Modo escuro morno (não preto)

Estou na etapa: [NOME DA ETAPA]
```

---

## **FASE 1: FUNDAÇÃO** (Semana 1)

### **Prompt 1.1 - Design Tokens e CSS Global**
```markdown
Refatore o globals.css para usar os design tokens do arquivo docs/visual/design-tokens.ts.

Tarefas:
[ ] Criar CSS variables para cores (light/dark)
[ ] Adicionar CSS variables para espaçamento
[ ] Criar classes utility para tipografia
[ ] Adicionar keyframes de animação
[ ] Implementar suporte a prefers-reduced-motion
[ ] Criar padrão de pétalas para backgrounds
```

### **Prompt 1.2 - Tailwind Config**
```markdown
Atualize o tailwind.config.ts com os design tokens.

Tarefas:
[ ] Adicionar cores da paleta turquesa
[ ] Configurar fontFamily (Plus Jakarta Sans)
[ ] Adicionar borderRadius orgânicos
[ ] Configurar boxShadow com tint turquesa
[ ] Adicionar animation durations e easings
[ ] Configurar blur para glassmorphism
```

### **Prompt 1.3 - Plus Jakarta Sans**
```markdown
Instale e configure a fonte Plus Jakarta Sans usando next/font.

Tarefas:
[ ] Importar Plus Jakarta Sans via next/font/google
[ ] Configurar pesos: 300, 400, 500, 600, 700
[ ] Aplicar no layout.tsx
[ ] Adicionar Manrope como fallback
[ ] Criar variáveis CSS para font-family
```

### **Prompt 1.4 - Theme Provider (Modo Escuro)**
```markdown
Crie o sistema de tema claro/escuro.

Tarefas:
[ ] Criar ThemeContext em lib/design/theme.ts
[ ] Implementar detecção de preferência do sistema
[ ] Criar hook useTheme
[ ] Adicionar toggle de tema no Header
[ ] Persistir preferência no localStorage
[ ] Adicionar transição suave entre temas (300ms)
```

### **Prompt 1.5 - Phosphor Icons**
```markdown
Instale e configure Phosphor Icons.

Tarefas:
[ ] npm install phosphor-react
[ ] Criar wrapper OptimizedIcon.tsx (lazy loading)
[ ] Definir tamanhos padrão (16, 20, 24, 32, 48px)
[ ] Configurar variante Duotone com cores da paleta
[ ] Criar constants com ícones usados (tree-shaking)
```

---

## **FASE 2: COMPONENTES BASE** (Semana 2)

### **Prompt 2.1 - Button Component**
```markdown
Redesenhe o componente Button.tsx com 4 variantes.

Variantes:
1. Primary: gradiente turquesa, shadow com tint
2. Secondary: border turquesa, background transparente
3. Ghost: sem border, hover com background sutil
4. Danger: background #FF8B94

Estados:
- hover: translateY(-2px), shadow aumentada
- active: scale(0.98)
- disabled: opacity 0.5
- loading: spinner + texto "Carregando..."

Features:
[ ] Usar CVA (class-variance-authority)
[ ] Adicionar ripple effect
[ ] Suportar ícone (left/right)
[ ] Tamanhos: sm, md, lg
```

### **Prompt 2.2 - Card Component**
```markdown
Redesenhe o componente Card.tsx com 3 variantes.

Variantes:
1. Default: elevation suave, border sutil
2. Glass: glassmorphism, backdrop-filter
3. Elevated: shadow XL

Features:
[ ] Border-radius 16px
[ ] Padding padrão 24px (customizável)
[ ] Hover state opcional (se clickable)
[ ] Suportar modo claro/escuro
[ ] Shadow com tint turquesa
```

### **Prompt 2.3 - Input Component**
```markdown
Crie/redesenhe componente Input.tsx.

Features:
[ ] Height 44px (touch-friendly)
[ ] Border-radius 12px
[ ] Focus state com glow turquesa
[ ] Error state com cor e mensagem
[ ] Label flutuante (opcional)
[ ] Ícone left/right (opcional)
[ ] Suportar textarea
[ ] Caracteres restantes (opcional)
```

### **Prompt 2.4 - Avatar Component**
```markdown
Crie componente Avatar.tsx.

Features:
[ ] Tamanhos: xs(24), sm(32), md(40), lg(64), xl(96)
[ ] Border 3px branco
[ ] Shadow suave
[ ] Fallback com iniciais
[ ] Indicador de status (opcional)
[ ] Border-radius full (círculo)
```

### **Prompt 2.5 - Badge e ProgressBar**
```markdown
Crie Badge.tsx e redesenhe ProgressBar.tsx.

Badge:
[ ] Variantes: default, success, warning, error
[ ] Tamanhos: sm, md
[ ] Border-radius full (pill)

ProgressBar:
[ ] Height 8px
[ ] Background rgba(125,211,192,0.15)
[ ] Fill com gradiente turquesa
[ ] Glow sutil (box-shadow)
[ ] Animação suave (400ms)
[ ] Mostrar porcentagem (opcional)
```

---

## **FASE 3: NAVEGAÇÃO** (Semana 3)

### **Prompt 3.1 - Header Redesign**
```markdown
Redesenhe o Header.tsx.

Layout:
- Avatar (esquerda)
- Logo/Título (centro, opcional)
- Toggle tema (direita)

Features:
[ ] Background com blur (glassmorphism)
[ ] Sticky no topo
[ ] Shadow apenas quando scrolled
[ ] Avatar clicável (ir para /profile)
[ ] Toggle tema com animação de rotação
[ ] Height 64px
```

### **Prompt 3.2 - Breadcrumb**
```markdown
Atualize Breadcrumb.tsx com novo estilo.

Features:
[ ] Separador com ChevronRight icon
[ ] Último item em bold
[ ] Links em cor secundária
[ ] Hover states
[ ] Truncate em textos longos
[ ] Tamanho text-sm
```

### **Prompt 3.3 - Page Transition**
```markdown
Crie PageTransition.tsx com framer-motion.

Animação:
[ ] Initial: { opacity: 0, y: 12 }
[ ] Animate: { opacity: 1, y: 0 }
[ ] Exit: { opacity: 0, y: -12 }
[ ] Duration: 200ms
[ ] Easing: cubic-bezier(0.4, 0, 0.2, 1)
[ ] Aplicar em todas as páginas
```

### **Prompt 3.4 - Loading States**
```markdown
Redesenhe Loading.tsx e crie skeletons.

Componentes:
1. Spinner (primary color, 24px)
2. LoadingSkeleton (pulse animation)
3. JourneyCardSkeleton
4. VideoCardSkeleton

Features:
[ ] Usar animate-pulse do Tailwind
[ ] Background primary/10
[ ] Border-radius matching
[ ] Duração 1.5s
```

---

## **FASE 4: MÓDULOS ESPECÍFICOS** (Semana 4-5)

### **Prompt 4.1 - MoodCheckIn Redesign**
```markdown
Redesenhe MoodCheckIn.tsx.

Visual:
[ ] 5 emojis em linha (48px cada)
[ ] Gap de 12px entre eles
[ ] Hover: scale(1.1)
[ ] Selected: scale(1.2) + glow da cor correspondente
[ ] Animação de confirmação (confetti sutil)
[ ] Texto "Como você está hoje?" acima

Cores dos glows:
- Muito mal: #FF8B94
- Mal: #FFB4A2
- Neutro: #E0E0E0
- Bom: #B8DFD8
- Muito bom: #7DD3C0
```

### **Prompt 4.2 - BreathingCircle Redesign**
```markdown
Redesenhe BreathingCircle.tsx.

Visual:
[ ] Círculo central com gradiente radial
[ ] Padrão de pétalas no fundo (muito sutil)
[ ] Texto da fase (Inspire/Segure/Expire)
[ ] Contador de ciclos abaixo
[ ] Glow animado sincronizado

Animação:
[ ] Scale de 0.8 a 1.2
[ ] Duração baseada nos tempos do padrão
[ ] Easing suave
[ ] Vibração háptica nas transições
[ ] Mudança de cor por fase (sutil)
```

### **Prompt 4.3 - VideoCard Redesign**
```markdown
Redesenhe VideoCard.tsx.

Layout:
- Thumbnail 16:9
- Overlay com play button (hover)
- Título + duração
- Botão favoritar (coração)

Hover:
[ ] Glass effect (blur + tint)
[ ] Play button scale(1.1)
[ ] Shadow aumentada

Features:
[ ] Lazy loading de imagem
[ ] Skeleton durante loading
[ ] Badge "Favorito" (se aplicável)
```

### **Prompt 4.4 - JourneyCard e TopicCard**
```markdown
Redesenhe JourneyCard.tsx e TopicCard.tsx.

JourneyCard:
[ ] Ícone duotone (48px) no topo
[ ] Título + descrição
[ ] ProgressBar estilizada
[ ] "X de Y etapas" abaixo
[ ] Badge "Completo" se 100%

TopicCard:
[ ] Ícone duotone (32px)
[ ] Título + preview do conteúdo (2 linhas)
[ ] Indicador "Ressoou" (se aplicável)
[ ] Border sutil
[ ] Hover: elevation aumentada
```

### **Prompt 4.5 - AchievementToast**
```markdown
Redesenhe AchievementToast.tsx (celebração).

Visual:
[ ] Glass card com glow dourado
[ ] Ícone de troféu (duotone)
[ ] Título da conquista
[ ] Animação de entrada (slide from top)
[ ] Confetti sutil (opcional)
[ ] Auto-dismiss após 4s

Animação:
[ ] slideDownFade (entrada)
[ ] scale pulse (atenção)
[ ] slideUpFade (saída)
```

---

## **FASE 5: PÁGINAS** (Semana 6)

### **Prompt 5.1 - /home Redesign**
```markdown
Redesenhe a página /home.

Layout:
[ ] MoodCheckIn no topo (se não feito hoje)
[ ] Grid 2x2 com 4 cards principais
[ ] Cada card com cor de fundo única
[ ] Ícones duotone (48px)
[ ] Hover states

Cores dos cards:
- Respirar: #E8F4F8 (azul céu)
- Acalmar: #FFD6BA (pêssego)
- Conhecer-se: #B8DFD8 (aqua)
- Perfil: #A8E6D7 (turquesa clara)
```

### **Prompt 5.2 - /breathe e /breathe/session**
```markdown
Redesenhe as páginas de respiração.

/breathe:
[ ] Background com padrão de pétalas
[ ] Cards dos padrões (4-7-8, 4-4-4-4, 4-6-6)
[ ] Card de respiração personalizada
[ ] Descrições mais acolhedoras
[ ] Ícones de pulmão (duotone)

/breathe/session:
[ ] BreathingCircle centralizado
[ ] Controles pause/play (bottom)
[ ] Contador de ciclos
[ ] Botão sair (top left)
[ ] Fullscreen opcional
```

### **Prompt 5.3 - /calm e /calm/[videoId]**
```markdown
Redesenhe as páginas de vídeos.

/calm:
[ ] Tabs de categorias (redesenhadas)
[ ] Grid de VideoCard
[ ] Seção "Favoritos" (se houver)
[ ] Seção "Vistos Recentemente"
[ ] Loading skeletons

/calm/[videoId]:
[ ] Player responsivo 16:9
[ ] Título + botão favoritar
[ ] Descrição
[ ] Vídeos relacionados (bottom)
[ ] Botão voltar (top left)
```

### **Prompt 5.4 - /discover (todas as subpáginas)**
```markdown
Redesenhe /discover e subpáginas.

/discover:
[ ] DailyReflectionWidget (glass card)
[ ] 3 cards de opções (Jornadas, Tópicos, Reflexões)
[ ] Ilustrações ou ícones grandes

/discover/journeys:
[ ] Lista de JourneyCard redesenhados
[ ] Filtro por status (Iniciadas, Completas, Todas)

/discover/journeys/[type]:
[ ] Navegação entre etapas (prev/next)
[ ] Conteúdo com tipografia melhorada
[ ] Campo de anotações
[ ] Botão "Marcar como completa"

/discover/topics:
[ ] Grid de TopicCard
[ ] 8 tópicos

/discover/topics/[type]:
[ ] Conteúdo formatado
[ ] ResonateButtons redesenhados
[ ] Campo de notas
```

### **Prompt 5.5 - /profile (todas as subpáginas)**
```markdown
Redesenhe /profile e subpáginas.

/profile:
[ ] Avatar grande (96px)
[ ] Nome + diagnóstico
[ ] StatCards (3 cards com números)
[ ] Menu de opções (lista)

/profile/edit:
[ ] PhotoUpload redesenhado
[ ] Inputs estilizados
[ ] Botões primary/secondary

/profile/crisis-log:
[ ] IntensitySlider redesenhado
[ ] Checkboxes estilizados
[ ] Textarea para notas

/profile/history:
[ ] Lista de CrisisCard
[ ] Filtros de data
[ ] Estatísticas visuais

/profile/achievements:
[ ] Grid de conquistas
[ ] Locked vs unlocked states
[ ] Animação ao visualizar

/profile/settings:
[ ] ToggleSwitch redesenhado
[ ] Seções separadas
[ ] Botão "Excluir Conta" (danger)
```

### **Prompt 5.6 - /onboarding**
```markdown
Redesenhe /onboarding.

Visual:
[ ] Ilustrações maiores (ou ícones grandes)
[ ] Tipografia hierárquica
[ ] Progress indicator (dots)
[ ] Inputs espaçados
[ ] Botões fixos no bottom

Steps:
1. Boas-vindas + nome/idade
2. Diagnóstico (chips selecionáveis)
3. Foto de perfil (opcional)

Animações:
[ ] Transição entre steps (slide)
[ ] Progress dots animados
```

---

## **FASE 6: POLISH** (Semana 7)

### **Prompt 6.1 - Ripple Effect Global**
```markdown
Implemente ripple effect em todos os botões e cards clicáveis.

Tarefas:
[ ] Criar hook useRipple
[ ] Adicionar ao Button.tsx
[ ] Adicionar aos cards clicáveis
[ ] Configurar tamanho e cor
[ ] Duração 600ms
```

### **Prompt 6.2 - Haptic Feedback**
```markdown
Adicione vibração háptica em ações importantes.

Ações:
[ ] Seleção de mood
[ ] Conclusão de respiração
[ ] Unlock de conquista
[ ] Favoritar vídeo
[ ] Completar etapa de jornada
[ ] Salvar perfil

Padrões:
- Light: 10ms
- Medium: 20ms
- Heavy: 30ms
```

### **Prompt 6.3 - Pull to Refresh**
```markdown
Implemente pull-to-refresh nas listas.

Páginas:
[ ] /calm (lista de vídeos)
[ ] /discover/journeys
[ ] /profile/history

Visual:
[ ] Spinner turquesa
[ ] Texto "Puxe para atualizar"
[ ] Animação suave
```

### **Prompt 6.4 - Empty States**
```markdown
Crie componentes EmptyState para cada contexto.

Contextos:
1. Sem vídeos favoritos
2. Sem histórico de crises
3. Sem conquistas desbloqueadas
4. Sem reflexões

Visual:
[ ] Ícone ilustrativo (64px)
[ ] Mensagem empática
[ ] CTA (se aplicável)
[ ] Padding generoso
```

### **Prompt 6.5 - Error States**
```markdown
Redesenhe componentes de erro.

Componentes:
1. ErrorDisplay (erro geral)
2. NetworkError (sem conexão)
3. NotFound (404)

Features:
[ ] Ilustração ou ícone
[ ] Mensagem clara
[ ] Botão "Tentar novamente"
[ ] Botão "Voltar"
```

---

## **FASE 7: QA E AJUSTES** (Semana 8)

### **Prompt 7.1 - Audit de Contraste**
```markdown
Verifique e corrija problemas de contraste.

Tarefas:
[ ] Usar WebAIM Contrast Checker
[ ] Verificar texto em todos os backgrounds
[ ] Ajustar cores se necessário
[ ] Garantir mínimo 4.5:1 (texto normal)
[ ] Garantir mínimo 3:1 (texto grande)
[ ] Testar em modo claro e escuro
```

### **Prompt 7.2 - Audit de Acessibilidade**
```markdown
Execute Lighthouse e corrija issues.

Checklist:
[ ] ARIA labels em ícones
[ ] Alt text em imagens
[ ] Focus visible em todos os elementos
[ ] Navegação por teclado funcional
[ ] Landmarks semânticos (<main>, <nav>, etc)
[ ] Heading hierarchy correta
[ ] Color contrast >= 4.5:1
```

### **Prompt 7.3 - Performance Audit**
```markdown
Otimize performance.

Tarefas:
[ ] Lazy load de imagens
[ ] Code splitting de framer-motion
[ ] Tree-shaking de ícones
[ ] Otimizar bundle (Analyzer)
[ ] Adicionar preload de fonts
[ ] Minimizar layout shifts (CLS)
[ ] Lighthouse Performance >= 90
```

### **Prompt 7.4 - Cross-Device Testing**
```markdown
Teste em diferentes dispositivos.

Devices:
[ ] iPhone SE (320px)
[ ] iPhone 12/13 (390px)
[ ] iPhone Pro Max (428px)
[ ] iPad Mini (768px - fallback)

Verificar:
[ ] Layout não quebra
[ ] Textos legíveis
[ ] Botões clicáveis (>= 44px)
[ ] Scrolling suave
[ ] Animações fluidas
```

### **Prompt 7.5 - Final Polish**
```markdown
Revisão final e ajustes.

Checklist:
[ ] Todas as cores vêm da paleta
[ ] Todos os espaçamentos são múltiplos de 4px
[ ] Border-radius consistente (8-24px)
[ ] Sombras com tint turquesa
[ ] Animações com duração 150-200ms
[ ] Tipografia usa Plus Jakarta Sans
[ ] Ícones são do Phosphor
[ ] Modo escuro funcional em todas as páginas
[ ] Theme toggle persiste
[ ] Sem console errors
[ ] Sem warnings de acessibilidade
```

---

## **CHECKLIST DE VALIDAÇÃO FINAL**

### Fundação
- [ ] Design tokens implementados
- [ ] CSS global refatorado
- [ ] Tailwind config atualizado
- [ ] Plus Jakarta Sans instalado
- [ ] Phosphor Icons instalado
- [ ] Theme provider funcional

### Componentes Base
- [ ] Button (4 variantes)
- [ ] Card (3 variantes)
- [ ] Input
- [ ] Avatar
- [ ] Badge
- [ ] ProgressBar

### Navegação
- [ ] Header redesenhado
- [ ] Breadcrumb atualizado
- [ ] PageTransition implementada
- [ ] Loading states

### Módulos
- [ ] MoodCheckIn
- [ ] BreathingCircle
- [ ] VideoCard
- [ ] JourneyCard
- [ ] TopicCard
- [ ] AchievementToast

### Páginas
- [ ] /home
- [ ] /breathe + /breathe/session
- [ ] /calm + /calm/[videoId]
- [ ] /discover (todas)
- [ ] /profile (todas)
- [ ] /onboarding

### Polish
- [ ] Ripple effects
- [ ] Haptic feedback
- [ ] Pull-to-refresh
- [ ] Empty states
- [ ] Error states

### Qualidade
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 95
- [ ] Contraste WCAG AA
- [ ] Modo claro/escuro 100% funcional
- [ ] Sem console errors
- [ ] Testado em 3+ devices

---

**Use este guia sequencialmente, uma etapa por vez, testando após cada implementação!**


