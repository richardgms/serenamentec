# ✅ Checklist Fase 7: QA e Validação

**Preparado em:** 23 de Outubro de 2025
**Para:** Fase 7 - QA e Ajustes Finais

---

## 🎯 Objetivo
Validar todas as implementações da Fase 6 e garantir qualidade AAA antes do deploy.

---

## 📋 Testes de Acessibilidade

### 1. Lighthouse Audit
**Como rodar:**
```bash
# Chrome DevTools > Lighthouse > Accessibility
# Rodar em 5 páginas principais:
```

**Páginas para auditar:**
- [ ] `/home` - Meta: 95+
- [ ] `/breathe` - Meta: 95+
- [ ] `/calm` - Meta: 95+
- [ ] `/discover` - Meta: 95+
- [ ] `/profile` - Meta: 95+

**Métricas esperadas:**
- Accessibility Score: 95-100
- Best Practices: 90+
- Performance: 85+ (mobile), 90+ (desktop)
- SEO: 95+

---

### 2. Contraste de Cores (Manual)

**Ferramentas:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

**Pares a testar:**

#### Modo Claro
- [ ] #2C3E50 em #FFFFFF (text-primary) - Esperado: 12.63:1 ✅
- [ ] #64748B em #FFFFFF (text-secondary) - Esperado: 6.02:1 ✅
- [ ] #8391A2 em #FFFFFF (text-tertiary) - Esperado: 4.53:1 ✅
- [ ] #7DD3C0 em #FFFFFF (primary text) - Validar se >= 4.5:1
- [ ] #FF8B94 em #FFFFFF (error) - Validar se >= 4.5:1

#### Modo Escuro
- [ ] #F0F7FA em #243447 (text-primary) - Esperado: 11.2:1 ✅
- [ ] #B5D0E4 em #243447 (text-secondary) - Esperado: 6.8:1 ✅
- [ ] #8FA8BE em #243447 (text-tertiary) - Esperado: 4.6:1 ✅
- [ ] #7DD3C0 em #243447 (primary text) - Validar se >= 4.5:1
- [ ] Buttons em backgrounds escuros

---

### 3. Navegação por Teclado

**Fluxos críticos:**

#### Fluxo 1: Home → Breathe Session
- [ ] Tab até "Respirar" card
- [ ] Enter para navegar
- [ ] Tab pelos breathing patterns
- [ ] Enter para selecionar
- [ ] Tab até "Iniciar"
- [ ] Enter para iniciar sessão
- [ ] Escape para sair (se aplicável)

#### Fluxo 2: Profile → Crisis Log
- [ ] Tab até "Registrar Crise"
- [ ] Tab por todos os form fields
- [ ] Space para toggle checkboxes
- [ ] Arrow keys para slider de intensidade
- [ ] Tab até "Salvar"
- [ ] Enter para submeter

#### Fluxo 3: Discover → Journey
- [ ] Tab pelos journey cards
- [ ] Enter para abrir journey
- [ ] Tab pelos steps
- [ ] Enter para completar step
- [ ] Verificar confetti animation (se completo)

**Verificações gerais:**
- [ ] Ordem de tab é lógica (top-left → bottom-right)
- [ ] Focus rings visíveis em TODOS elementos focados
- [ ] Shift+Tab funciona (navegação reversa)
- [ ] Enter/Space ativam controles
- [ ] Escape fecha modals/toasts

---

### 4. Screen Reader (NVDA/VoiceOver)

**Instalar:**
- Windows: [NVDA](https://www.nvaccess.org/download/) (grátis)
- Mac: VoiceOver (built-in, Cmd+F5)

**Testar narração:**

#### Página Home
- [ ] Header é anunciado corretamente
- [ ] Cards de módulos têm labels claros
- [ ] "Navegação: 4 cards" é anunciado

#### Toast Notifications
- [ ] Toast success é anunciado: "Status: Perfil atualizado!"
- [ ] Toast error é anunciado: "Alerta: Falha ao salvar"
- [ ] Botão fechar tem label "Fechar toast"

#### Forms (Crisis Log)
- [ ] Labels são lidos antes dos inputs
- [ ] Errors são anunciados: "Erro: Campo obrigatório"
- [ ] Slider anuncia valor: "Intensidade: 3 de 5, Moderada"
- [ ] Checkboxes anunciam estado: "Ansiedade, marcado"

#### Breadcrumbs
- [ ] Navegação breadcrumb é anunciada
- [ ] Página atual tem "atual" no anúncio

#### Loading States
- [ ] Spinner anuncia: "Status: Carregando"
- [ ] Skeletons não são anunciados (decorativos)

---

## 🎭 Testes de Microinterações

### 1. Ripple Effects

**Páginas:**
- [ ] Buttons em `/home`, `/breathe`, `/calm`
- [ ] Cards clicáveis em `/discover/journeys`
- [ ] Toggle switches em `/profile/settings`

**Verificar:**
- [ ] Ripple aparece no ponto de clique
- [ ] Cor está correta para cada variant
- [ ] Animação dura ~600ms
- [ ] Múltiplos ripples funcionam simultaneamente
- [ ] Haptic vibra (mobile, HTTPS only)

---

### 2. Pull-to-Refresh

**Páginas:**
- [ ] `/profile/history`
- [ ] `/profile/crisis-log`
- [ ] `/profile/achievements`

**Testar:**
1. Scroll para o topo
2. Puxar para baixo 80px+
3. Soltar

**Verificar:**
- [ ] Indicador visual aparece
- [ ] Spinner animado durante refresh
- [ ] Haptic feedback ao ativar
- [ ] Dados são atualizados
- [ ] Toast de sucesso aparece
- [ ] Smooth scroll após refresh

---

### 3. Hover States

**Componentes:**
- [ ] VideoCard em `/calm`
- [ ] JourneyCard em `/discover/journeys`
- [ ] Cards gerais (TopicCard, etc)

**Verificar VideoCard:**
- [ ] Hover: glass effect com blur
- [ ] Play button escala para 1.1
- [ ] Card escala para 1.02
- [ ] Transição suave (200ms)

**Verificar JourneyCard:**
- [ ] In Progress: hover scale
- [ ] Completed: hover glow
- [ ] Emoji pulse quando completed
- [ ] Border primary quando completed

---

### 4. Loading Skeletons

**Páginas:**
- [ ] `/calm` (loading videos)
- [ ] `/discover/journeys` (loading journeys)
- [ ] `/profile/achievements` (loading conquistas)

**Verificar:**
- [ ] Shimmer animation smooth (2s loop)
- [ ] Skeletons têm formato correto (card shape)
- [ ] Transição para conteúdo real é suave
- [ ] Shimmer não causa lag/jank

---

### 5. Toast Animations

**Testar cada tipo:**
```typescript
showToast('Teste success', 'success')
showToast('Teste error', 'error')
showToast('Teste warning', 'warning')
showToast('Teste info', 'info')
```

**Verificar:**
- [ ] Ícone correto por tipo (CheckCircle, XCircle, etc)
- [ ] Cor de acento lateral correta
- [ ] Progress bar anima de 0→100% em 4s
- [ ] Slide-in suave (top, -32px → 0)
- [ ] Slide-out ao fechar
- [ ] Auto-dismiss após 4s
- [ ] Botão X fecha manualmente

---

### 6. Empty States

**Páginas:**
- [ ] `/calm` sem favoritos
- [ ] `/profile/history` sem crises
- [ ] `/profile/achievements` sem conquistas

**Verificar:**
- [ ] Ícone tem floating animation
- [ ] Título e descrição apropriados
- [ ] CTA visível e funcional
- [ ] Tip box com 💡 aparece
- [ ] Accent color correta
- [ ] Animação de entrada (fade+slide)

---

### 7. Success Celebrations

**Testar:**
1. Complete uma journey (mock data)
2. Desbloqueie uma conquista (mock)

**Verificar JourneyCard:**
- [ ] Confetti burst ao completar
- [ ] 18+ peças coloridas
- [ ] Distribuição radial 360°
- [ ] Duração ~1.2s
- [ ] Badge "Completo" com sparkle

**Verificar AchievementToast:**
- [ ] Toast aparece no topo
- [ ] Emoji pulsa (scale animation)
- [ ] Confetti burst background
- [ ] Sparkle icon no badge
- [ ] Som toca (se enabled)
- [ ] Auto-dismiss após 5s

---

## 📱 Testes Cross-Device

### Desktop
- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac only)
- [ ] Edge (Windows)

### Mobile
- [ ] Safari iOS 14+ (iPhone)
- [ ] Chrome Android 90+
- [ ] Samsung Internet

### Tablets
- [ ] iPad (Safari)
- [ ] Android Tablet (Chrome)

**Resoluções a testar:**
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 390px (iPhone 14)
- [ ] 428px (iPhone 14 Pro Max)
- [ ] 768px (iPad Mini)
- [ ] 1024px (iPad Pro)
- [ ] 1920px (Desktop HD)

---

## ⚡ Testes de Performance

### 1. FPS durante animações

**Ferramentas:**
- Chrome DevTools > Performance
- Record + interagir + parar

**Testar:**
- [ ] Ripple effects (meta: 60 FPS)
- [ ] Shimmer animation (meta: 60 FPS)
- [ ] Confetti burst (meta: 55+ FPS)
- [ ] Toast slide-in/out (meta: 60 FPS)
- [ ] Page transitions (meta: 60 FPS)

**Flags de alerta:**
- FPS < 50: Otimizar animação
- Long tasks > 50ms: Investigar JS bloqueante
- Layout shifts: Adicionar skeleton dimensions

---

### 2. Bundle Size

```bash
npm run build
npm run analyze # (se configurado)
```

**Verificar:**
- [ ] Total bundle < 300KB (gzipped)
- [ ] First Load JS < 200KB
- [ ] Code splitting funcional
- [ ] Framer Motion tree-shaking OK

---

### 3. Lighthouse Performance

**Métricas Core Web Vitals:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FCP (First Contentful Paint) < 1.8s
- [ ] TTI (Time to Interactive) < 3.8s

---

## 🧪 Testes de Regressão

### Verificar que nada quebrou:

- [ ] Login/Logout funcionam
- [ ] Navegação entre páginas
- [ ] Formulários submitam corretamente
- [ ] Dark mode toggle funciona
- [ ] Dados persistem (localStorage)
- [ ] API calls funcionam
- [ ] Imagens/thumbnails carregam
- [ ] Vídeos do YouTube embedam

---

## 🐛 Bugs Conhecidos a Verificar

### Prioridade Alta
- [ ] PullToRefresh conflita com scroll? (testar em iOS)
- [ ] Ripple ultrapassa borda do botão? (verificar overflow)
- [ ] Toast sobrepõe Header? (verificar z-index)
- [ ] Confetti causa lag em mobile? (testar em low-end device)

### Prioridade Média
- [ ] Focus ring invisível em alguns backgrounds?
- [ ] Shimmer não funciona em Safari 13-?
- [ ] Haptic não vibra em Firefox Android?
- [ ] Empty state layout quebra em 320px?

---

## 📝 Relatório de QA

**Criar após testes:**

```markdown
# Relatório QA - Fase 6

## Resumo
- Data: [DATA]
- Tester: [NOME]
- Duração: [HORAS]

## Scores
- Lighthouse Accessibility: [SCORE]/100
- Lighthouse Performance: [SCORE]/100
- Keyboard Nav: [PASS/FAIL]
- Screen Reader: [PASS/FAIL]
- Cross-device: [PASS/FAIL]

## Bugs Encontrados
1. [DESCRIÇÃO] - Prioridade: [ALTA/MÉDIA/BAIXA]
2. ...

## Recomendações
1. [AÇÃO SUGERIDA]
2. ...

## Conclusão
[READY FOR PRODUCTION / NEEDS FIXES]
```

---

## ✅ Critérios de Aceitação

**Para marcar Fase 6 como 100% pronta:**

- [ ] Lighthouse Accessibility >= 95 em 5 páginas
- [ ] Zero erros de contraste WCAG AA
- [ ] 100% dos fluxos navegáveis por teclado
- [ ] Screen reader anuncia todas as interações críticas
- [ ] Ripple/Haptic funcionam em 95%+ dos devices
- [ ] PullToRefresh funciona em iOS e Android
- [ ] Hover states funcionais em desktop
- [ ] Shimmer não causa performance issues
- [ ] Toast system 100% funcional
- [ ] Empty states aparecem corretamente
- [ ] Celebrations animam sem lag
- [ ] Cross-device: 3 desktops + 3 mobiles testados
- [ ] Performance: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Zero regressões em features existentes

---

**Próximo:** Após aprovar este checklist, iniciar Fase 7 com correções identificadas + polish final.
