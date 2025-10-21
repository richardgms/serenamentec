# 🗺️ Guia de Navegação - Documentação Serenamente

## Mapa Completo da Documentação

**Use este arquivo para encontrar rapidamente o que precisa.**

---

## 🎯 Quero Implementar...

### → **A Refatoração Completa** (Visual + Estrutura)
**Comece aqui:** `docs/REFATORACAO_COMPLETA.md`

**Tempo estimado:** 10 semanas  
**Ordem recomendada:** Estrutura → Visual

---

### → **Apenas a Parte Visual** (Cores, Tipografia, Componentes)
**Documentação:**
1. `docs/visual/identidade-visual.md` - Entender o sistema
2. `docs/visual/design-tokens.ts` - Tokens de referência
3. `docs/visual/planovisual.md` - Estratégia
4. `docs/visual/etapasvisual-v2.md` - **Implementar daqui** ⭐

**Tempo estimado:** 8 semanas  
**Fases:** 7 (Fundação → QA)

---

### → **Apenas a Parte Estrutural** (Fluxos, Layouts, UX)
**Documentação:**
1. `docs/estrutura/README.md` - Visão geral
2. `docs/estrutura/analise-estrutural.md` - Problemas atuais
3. `docs/estrutura/patterns-estruturais.md` - Padrões
4. `docs/estrutura/plano-estrutural.md` - Estratégia
5. `docs/estrutura/etapas-estrutural.md` - **Implementar daqui** ⭐

**Tempo estimado:** 10 semanas  
**Fases:** 7 (Setup → Profile)

---

## 📚 Preciso de...

### → **Referência de Cores/Tipografia**
`docs/visual/design-tokens.ts`

### → **Padrões de UX Profissionais**
`docs/estrutura/patterns-estruturais.md`

### → **Entender Problemas Atuais**
- Visual: `docs/visual/ANALISE_ETAPASVISUAL.md`
- Estrutura: `docs/estrutura/analise-estrutural.md`

### → **Exemplos de Código Completos**
- Visual: `docs/visual/etapasvisual-v2.md`
- Estrutura: `docs/estrutura/etapas-estrutural.md`

### → **Checklists de Validação**
- Final de cada fase nos arquivos `etapas-*.md`
- Checklist final em `docs/REFATORACAO_COMPLETA.md`

---

## 🔍 Estrutura dos Documentos

```
docs/
│
├── REFATORACAO_COMPLETA.md ← COMEÇAR AQUI (Visão geral)
├── NAVEGACAO.md ← Você está aqui
│
├── visual/ (Refatoração Visual)
│   ├── design-tokens.ts ← Referência de tokens
│   ├── identidade-visual.md ← Guia de estilo
│   ├── planovisual.md ← Estratégia
│   ├── etapasvisual.md (v1 - não usar)
│   ├── etapasvisual-v2.md ← USAR ESTE ⭐
│   └── ANALISE_ETAPASVISUAL.md ← Análise crítica
│
├── estrutura/ (Reestruturação)
│   ├── README.md ← Índice
│   ├── analise-estrutural.md ← Diagnóstico
│   ├── patterns-estruturais.md ← Padrões UX
│   ├── plano-estrutural.md ← Estratégia
│   └── etapas-estrutural.md ← USAR ESTE ⭐
│
└── plan/ (Planejamento Funcional - já existente)
    ├── prd.md
    ├── etapas.md
    ├── flowchart.md
    └── schemaprisma.md
```

---

## 🎨 Visual vs 🏗️ Estrutura

### docs/visual/ - O QUE você vê
- Cores (#7DD3C0, gradientes, sombras)
- Tipografia (Plus Jakarta Sans, tamanhos)
- Componentes estilizados (Button, Card, Input)
- Animações (150-200ms, ripple, glow)
- Modo escuro (cores adaptadas)
- Microinterações (hover, focus, haptic)

### docs/estrutura/ - COMO você usa
- Fluxos (Landing → Auth → Onboarding → Home)
- Layouts (App Shell, Bottom Nav, Split Auth)
- Personalização (Recommendations, Context-aware)
- Gamificação (XP, Levels, Achievements, Streaks)
- Feedback (Empty/Loading/Success states)
- Navegação (Progressive disclosure, Quick actions)

---

## 📊 Por Objetivo

### Quero criar uma Landing Page profissional
1. `docs/estrutura/analise-estrutural.md` (seção "Landing Page")
2. `docs/estrutura/patterns-estruturais.md` (seção "Landing Page Layout")
3. `docs/estrutura/etapas-estrutural.md` (Prompt 1.1)

### Quero redesenhar o Onboarding
1. `docs/estrutura/analise-estrutural.md` (seção "Onboarding")
2. `docs/estrutura/patterns-estruturais.md` (seção "Progressive Onboarding")
3. `docs/estrutura/etapas-estrutural.md` (Prompt 2.2)

### Quero implementar Bottom Navigation
1. `docs/estrutura/patterns-estruturais.md` (seção "App Shell")
2. `docs/estrutura/etapas-estrutural.md` (Prompt 2.1)

### Quero estilizar os Botões
1. `docs/visual/identidade-visual.md` (seção "Botões")
2. `docs/visual/etapasvisual-v2.md` (Prompt 2.1)

### Quero criar Sistema de Gamificação
1. `docs/estrutura/plano-estrutural.md` (seção "Gamificação")
2. `docs/estrutura/patterns-estruturais.md` (seção "Gamificação")
3. `docs/estrutura/etapas-estrutural.md` (FASE 5)

### Quero personalizar a Home
1. `docs/estrutura/analise-estrutural.md` (seção "Home")
2. `docs/estrutura/patterns-estruturais.md` (seção "Recommendation Engine")
3. `docs/estrutura/etapas-estrutural.md` (FASE 3)

---

## ⚡ Quick Start por Persona

### Sou Designer
**Foco:** Visual  
**Documentos principais:**
1. `docs/visual/identidade-visual.md` (Guia completo)
2. `docs/visual/design-tokens.ts` (Tokens)

**Validação:** Prototipar componentes no Figma antes de implementar

---

### Sou Desenvolvedor Frontend
**Foco:** Implementação  
**Documentos principais:**
1. `docs/REFATORACAO_COMPLETA.md` (Visão geral)
2. `docs/visual/etapasvisual-v2.md` (Visual)
3. `docs/estrutura/etapas-estrutural.md` (Estrutura)

**Ordem:** Estrutura → Visual → Polish

---

### Sou UX Designer
**Foco:** Estrutura e Fluxos  
**Documentos principais:**
1. `docs/estrutura/analise-estrutural.md` (Problemas)
2. `docs/estrutura/patterns-estruturais.md` (Soluções)
3. `docs/estrutura/plano-estrutural.md` (Estratégia)

**Validação:** Prototipar fluxos antes de implementar

---

### Sou Product Manager
**Foco:** Planejamento e Métricas  
**Documentos principais:**
1. `docs/REFATORACAO_COMPLETA.md` (Overview)
2. `docs/visual/planovisual.md` (Plano Visual)
3. `docs/estrutura/plano-estrutural.md` (Plano Estrutural)

**Métricas:** Tabelas de sucesso em `REFATORACAO_COMPLETA.md`

---

### Sou QA/Tester
**Foco:** Validação  
**Documentos principais:**
1. Checklists ao final de cada fase em `etapas-*.md`
2. `docs/REFATORACAO_COMPLETA.md` (Checklist final)

**Ferramentas:** Lighthouse, WebAIM Contrast Checker, Screen Readers

---

## 🎯 Por Fase de Implementação

### Estou na Semana 1
**Estrutura:** Landing + Auth  
**Documentos:** `docs/estrutura/etapas-estrutural.md` (FASE 1)

**Visual:** Design Tokens + Tailwind  
**Documentos:** `docs/visual/etapasvisual-v2.md` (FASE 1)

---

### Estou na Semana 2
**Estrutura:** App Shell + Onboarding  
**Documentos:** `docs/estrutura/etapas-estrutural.md` (FASE 2)

**Visual:** Componentes Base  
**Documentos:** `docs/visual/etapasvisual-v2.md` (FASE 2)

---

### Estou na Semana 3-4
**Estrutura:** Home + Breathing Flow  
**Documentos:** `docs/estrutura/etapas-estrutural.md` (FASE 3-4)

**Visual:** Navegação + Módulos  
**Documentos:** `docs/visual/etapasvisual-v2.md` (FASE 3-4)

---

### Estou na Semana 5-7
**Estrutura:** Gamificação + Discover  
**Documentos:** `docs/estrutura/etapas-estrutural.md` (FASE 5-6)

**Visual:** Módulos Específicos + Páginas  
**Documentos:** `docs/visual/etapasvisual-v2.md` (FASE 4-5)

---

### Estou na Semana 8-10
**Ambos:** Polish + QA  
**Documentos:**
- `docs/visual/etapasvisual-v2.md` (FASE 6-7)
- `docs/estrutura/etapas-estrutural.md` (FASE 7)
- `docs/REFATORACAO_COMPLETA.md` (Checklist final)

---

## 📖 Glossário

### Termos Visuais
- **Design Tokens:** Variáveis de design (cores, espaçamentos, etc)
- **Glassmorphism:** Efeito de vidro fosco (blur + transparência)
- **Neumorphism:** Efeito 3D sutil com sombras
- **Ripple:** Efeito de ondulação ao clicar

### Termos Estruturais
- **Progressive Disclosure:** Revelar informação gradualmente
- **Context-Aware:** Adaptar ao contexto do usuário
- **Empty State:** Tela quando não há conteúdo
- **Session Flow:** Fluxo de uma sessão (prep → active → complete)

### Termos de Gamificação
- **XP:** Experience Points (pontos de experiência)
- **Streak:** Sequência de dias consecutivos
- **Achievement:** Conquista desbloqueável
- **Milestone:** Marco importante (ex: 100 sessões)

---

## ❓ FAQ

### Q: Por onde começar?
**A:** `docs/REFATORACAO_COMPLETA.md` → Escolher Visual ou Estrutura → Seguir `etapas-*.md`

### Q: Posso fazer só a parte visual?
**A:** Sim. Seguir apenas `docs/visual/etapasvisual-v2.md`

### Q: Posso fazer só a parte estrutural?
**A:** Sim. Seguir apenas `docs/estrutura/etapas-estrutural.md`

### Q: Qual ordem é melhor?
**A:** Estrutura → Visual (mais fácil estilizar estrutura boa)

### Q: Quanto tempo leva?
**A:** Visual: 8 semanas, Estrutura: 10 semanas, Ambos: 10 semanas (paralelo)

### Q: Preciso seguir tudo?
**A:** Não. Use MoSCoW (Must/Should/Could Have) nos planos.

### Q: Onde estão os exemplos de código?
**A:** Nos arquivos `etapas-*.md` (cada prompt tem código completo)

### Q: E se tiver dúvida?
**A:** Consultar seção "Referências" em cada documento

---

## 🚀 Começar Agora

1. **Ler:** `docs/REFATORACAO_COMPLETA.md` (15 min)
2. **Decidir:** Visual, Estrutura ou Ambos
3. **Ler plano:** `planovisual.md` e/ou `plano-estrutural.md` (30 min)
4. **Implementar:** Seguir `etapas-*.md` fase por fase
5. **Validar:** Checklist ao final de cada fase

---

**Boa refatoração! 🎨🏗️**

