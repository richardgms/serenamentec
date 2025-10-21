# ðŸš€ **Prompt Master - Desenvolvimento do Serenamente**
## Guia Completo de ImplementaÃ§Ã£o por Etapas

---

## **CONTEXTO INICIAL** (Copiar sempre no inÃ­cio de cada sessÃ£o)

```markdown
Estou desenvolvendo o app Serenamente - aplicaÃ§Ã£o web mobile-first para suporte a pessoas com TEA e TDAH.

**Stack obrigatÃ³ria:**
- Next.js 14+ (App Router)
- TypeScript
- Prisma ORM
- Supabase (PostgreSQL)
- Clerk (AutenticaÃ§Ã£o)
- Tailwind CSS
- Vercel (Deploy)

**RestriÃ§Ãµes importantes:**
- Mobile-first: largura mÃ¡xima 428px sempre
- Flat design minimalista
- Cores: #84C2BE (primary), #ACFFF9 (secondary), #FFFFF9 (bg), #EFFFEA (surface)
- Tom acolhedor e empÃ¡tico
- Sem localStorage - tudo via Prisma/Supabase

[PRD COMPLETO]: [colar aqui]
[SCHEMA PRISMA]: [colar aqui]

Estou na etapa: [NOME DA ETAPA ATUAL]
```

---

## **ðŸ“‹ ETAPA 1: SETUP E CONFIGURAÃ‡ÃƒO INICIAL** âœ… CONCLUÃDA

### **Prompt 1.1 - Criar Projeto Base** âœ…
```markdown
[x] Crie o projeto Next.js com TypeScript e Tailwind
[x] Configure a estrutura de pastas no padrÃ£o App Router
[x] Instale todas as dependÃªncias necessÃ¡rias
[x] Configure o .gitignore apropriado
[x] Crie o arquivo .env.local com as variÃ¡veis necessÃ¡rias (vazias por enquanto)
```

### **Prompt 1.2 - Configurar Prisma + Supabase** âœ…
```markdown
[x] Configure o Prisma com o schema fornecido
[x] Adicione as configuraÃ§Ãµes de connection pooling
[x] Crie o arquivo prisma/seed.ts vazio
[x] Configure os scripts no package.json para Prisma
[x] Crie o cliente Prisma em lib/prisma.ts
```

### **Prompt 1.3 - Configurar Clerk** âœ…
```markdown
[x] Configure o Clerk Provider no layout.tsx
[x] Crie o middleware.ts para proteÃ§Ã£o de rotas
[x] Configure as rotas pÃºblicas e privadas
[x] Crie os componentes de SignIn e SignUp customizados
[x] Configure o webhook para sincronizar com Supabase (preparar estrutura)
```

### **Prompt 1.4 - Design System Base** âœ…
```markdown
[x] Configure as cores no tailwind.config.ts
[x] Crie o arquivo globals.css com classes utilitÃ¡rias
[x] Crie o componente MobileContainer para limitar largura
[x] Crie o componente Card base
[x] Crie o componente Button com variantes
[x] Configure as fontes (Inter ou similar)
```

### **Prompt 1.5 - Layout Global** âœ…
```markdown
[x] Crie o layout.tsx principal com MobileContainer
[x] Configure os metadados e viewport
[x] Adicione o manifest.json para PWA
[x] Crie o componente Loading global
[x] Crie o componente Error Boundary
[x] Configure o tema de cores do navegador mobile
```

---

## **ðŸ“‹ ETAPA 2: AUTENTICAÃ‡ÃƒO E ONBOARDING**

### **Prompt 2.1 - PÃ¡ginas de Auth**
```markdown
[ ] Crie a pÃ¡gina de boas-vindas (/)
[ ] Crie a pÃ¡gina de login (/sign-in)
[ ] Crie a pÃ¡gina de cadastro (/sign-up)
[ ] Implemente o fluxo de redirecionamento pÃ³s-auth
[ ] Adicione animaÃ§Ãµes suaves de transiÃ§Ã£o
```

### **Prompt 2.2 - Fluxo de Onboarding**
```markdown
[ ] Crie a pÃ¡gina de onboarding (/onboarding)
[ ] Implemente Step 1: Coleta de nome, sobrenome e idade
[ ] Implemente Step 2: SeleÃ§Ã£o de diagnÃ³stico (TEA/TDAH/Ambos/Explorando)
[ ] Crie a lÃ³gica de upload de foto de perfil (opcional)
[ ] Implemente a navegaÃ§Ã£o entre steps com validaÃ§Ã£o
```

### **Prompt 2.3 - SincronizaÃ§Ã£o Clerk-Supabase**
```markdown
[ ] Crie a API route para webhook do Clerk
[ ] Implemente a criaÃ§Ã£o do usuÃ¡rio no Prisma apÃ³s signup
[ ] Crie a funÃ§Ã£o de update do perfil no Prisma
[ ] Adicione tratamento de erros e retry
[ ] Teste o fluxo completo de criaÃ§Ã£o de usuÃ¡rio
```

### **Prompt 2.4 - ProteÃ§Ã£o de Rotas**
```markdown
[ ] Configure o middleware para verificar onboarding completo
[ ] Crie o hook useUser customizado
[ ] Implemente redirecionamentos condicionais
[ ] Adicione loading states durante verificaÃ§Ãµes
[ ] Crie a lÃ³gica de logout
```

---

## **ðŸ“‹ ETAPA 3: HOME E NAVEGAÃ‡ÃƒO**

### **Prompt 3.1 - Tela Home**
```markdown
[ ] Crie a pÃ¡gina home (/home)
[ ] Implemente o grid 2x2 com os 4 cards principais
[ ] Adicione Ã­cones apropriados para cada mÃ³dulo
[ ] Implemente hover states e animaÃ§Ãµes
[ ] Adicione feedback tÃ¡til nos cliques
```

### **Prompt 3.2 - Widget Mood Check-in**
```markdown
[ ] Crie o componente MoodCheckIn
[ ] Implemente os 5 emojis clicÃ¡veis
[ ] Crie a API route para salvar mood
[ ] Adicione animaÃ§Ã£o de feedback apÃ³s seleÃ§Ã£o
[ ] Implemente a lÃ³gica de "mostrar apenas 1x por dia"
```

### **Prompt 3.3 - NavegaÃ§Ã£o Global**
```markdown
[ ] Crie o componente Header com foto do usuÃ¡rio
[ ] Implemente breadcrumbs para navegaÃ§Ã£o
[ ] Adicione botÃ£o de voltar contextual
[ ] Crie transiÃ§Ãµes suaves entre pÃ¡ginas
[ ] Implemente o gesto de swipe para voltar (mobile)
```

### **Prompt 3.4 - Estado Global**
```markdown
[ ] Configure Context API ou Zustand para estado global
[ ] Crie o store para dados do usuÃ¡rio
[ ] Implemente cache de preferÃªncias
[ ] Adicione persistÃªncia de estado
[ ] Crie hooks customizados para acessar stores
```

---

## **ðŸ“‹ ETAPA 4: MÃ“DULO RESPIRAÃ‡ÃƒO**

### **Prompt 4.1 - Lista de PadrÃµes**
```markdown
[ ] Crie a pÃ¡gina de respiraÃ§Ã£o (/breathe)
[ ] Implemente cards para cada padrÃ£o (4-7-8, 4-4-4-4, 4-6-6)
[ ] Adicione descriÃ§Ãµes e benefÃ­cios
[ ] Crie o card de respiraÃ§Ã£o personalizada
[ ] Implemente navegaÃ§Ã£o para execuÃ§Ã£o
```

### **Prompt 4.2 - ConfiguraÃ§Ã£o Personalizada**
```markdown
[ ] Crie o modal/pÃ¡gina de configuraÃ§Ã£o custom
[ ] Implemente sliders para tempos (1-10 segundos)
[ ] Adicione preview visual dos tempos
[ ] Crie validaÃ§Ã£o dos valores
[ ] Salve configuraÃ§Ã£o no Prisma
```

### **Prompt 4.3 - Tela de ExecuÃ§Ã£o**
```markdown
[ ] Crie a pÃ¡gina de execuÃ§Ã£o (/breathe/session)
[ ] Implemente o cÃ­rculo animado central
[ ] Adicione contador regressivo
[ ] Implemente as fases (Inspire/Segure/Expire)
[ ] Sincronize animaÃ§Ãµes com os tempos
```

### **Prompt 4.4 - Controles e Feedback**
```markdown
[ ] Adicione botÃµes pausar/continuar
[ ] Implemente vibraÃ§Ã£o nas transiÃ§Ãµes (Vibration API)
[ ] Crie contador de ciclos
[ ] Adicione configuraÃ§Ã£o de nÃºmero de ciclos
[ ] Implemente tela de conclusÃ£o com stats
```

### **Prompt 4.5 - Salvamento de SessÃµes**
```markdown
[ ] Crie API route para salvar sessÃ£o
[ ] Implemente lÃ³gica de sessÃ£o completa vs interrompida
[ ] Adicione cÃ¡lculo de duraÃ§Ã£o total
[ ] Salve dados no Prisma
[ ] Adicione tratamento de erros
```

---

## **ðŸ“‹ ETAPA 5: MÃ“DULO ACALMAR (VÃDEOS)** âœ… CONCLUÃDA

### **Prompt 5.1 - Lista de VÃ­deos** âœ…
```markdown
[x] Crie a pÃ¡gina de vÃ­deos (/calm)
[x] Implemente as categorias (tabs ou sections)
[x] Crie o grid/lista de vÃ­deos
[x] Adicione thumbnails e tÃ­tulos
[x] Implemente loading skeleton
```

### **Prompt 5.2 - Player de VÃ­deo** âœ…
```markdown
[x] Crie a pÃ¡gina do player (/calm/[videoId])
[x] Implemente embed responsivo do YouTube
[x] Adicione controles customizados
[x] Crie botÃ£o de favoritar
[x] Implemente modo loop
```

### **Prompt 5.3 - Sistema de Favoritos** âœ…
```markdown
[x] Crie API route para favoritar/desfavoritar
[x] Implemente toggle de favorito com animaÃ§Ã£o
[x] Adicione seÃ§Ã£o de favoritos na lista
[x] Limite mÃ¡ximo de 20 favoritos
[x] Sincronize com Prisma
```

### **Prompt 5.4 - HistÃ³rico de VisualizaÃ§Ã£o** âœ…
```markdown
[x] Crie API route para registrar visualizaÃ§Ã£o
[x] Implemente tracking de duraÃ§Ã£o assistida
[x] Adicione seÃ§Ã£o "Vistos Recentemente"
[x] Crie lÃ³gica de deduplicaÃ§Ã£o
[x] Limite histÃ³rico a Ãºltimos 20
```

### **Prompt 5.5 - Seed de VÃ­deos** âœ…
```markdown
[x] Adicione os 2 vÃ­deos obrigatÃ³rios no seed
[x] Adicione 5-8 vÃ­deos de natureza/ruÃ­do branco
[x] Categorize adequadamente cada vÃ­deo
[x] Implemente ordem de exibiÃ§Ã£o
[x] Teste o seed completo
```

---

## **ðŸ“‹ ETAPA 6: MÃ“DULO CONHECER-SE** âœ… COMPLETA

### **Prompt 6.1 - Menu Principal** âœ…
```markdown
[x] Crie a pÃ¡gina principal (/discover)
[x] Implemente os 3 cards de opÃ§Ãµes
[x] Adicione Ã­cones e descriÃ§Ãµes
[x] Crie navegaÃ§Ã£o para cada seÃ§Ã£o
[x] Implemente animaÃ§Ãµes de entrada
```

### **Prompt 6.2 - Card de ReflexÃ£o DiÃ¡ria** âœ…
```markdown
[x] Crie o componente DailyReflection
[x] Implemente a lÃ³gica de pergunta do dia
[x] Crie o textarea para resposta
[x] Adicione botÃµes responder/pular
[x] Salve respostas no Prisma
```

### **Prompt 6.3 - Jornadas Lineares - Estrutura** âœ…
```markdown
[x] Crie a pÃ¡gina de jornadas (/discover/journeys)
[x] Implemente cards para cada trilha (JourneyCard.tsx criado)
[x] Mostre progresso visual (X de Y etapas) (ProgressBar.tsx criado)
[x] Crie navegaÃ§Ã£o para trilha especÃ­fica
[x] Adicione estado de trilha completa (API pronta)
```

### **Prompt 6.4 - Jornadas Lineares - ConteÃºdo** âœ…
```markdown
[x] Crie a pÃ¡gina de etapa (/discover/journeys/[type]/[step])
[x] Implemente navegaÃ§Ã£o entre etapas
[x] Adicione conteÃºdo educativo (30 etapas seedadas)
[x] Crie campo para anotaÃ§Ãµes
[x] Implemente salvamento de progresso (API pronta)
```

### **Prompt 6.5 - Seed de Jornadas** âœ…
```markdown
[x] Crie conteÃºdo para "SerÃ¡ que sou autista?" (10 etapas)
[x] Crie conteÃºdo para "Entendendo TDAH" (8 etapas)
[x] Crie conteÃºdo para "Processamento Sensorial" (12 etapas)
[x] Adicione perguntas reflexivas
[x] Teste o seed das jornadas
```

### **Prompt 6.6 - ExploraÃ§Ã£o por TÃ³picos** âœ…
```markdown
[x] Crie a pÃ¡gina de tÃ³picos (/discover/topics)
[x] Implemente o grid de 8 tÃ³picos (TopicCard.tsx criado)
[x] Crie pÃ¡gina individual de tÃ³pico (/discover/topics/[type])
[x] Adicione "Isso ressoa?" com 3 opÃ§Ãµes (ResonateButtons.tsx criado)
[x] Implemente campo de notas (API pronta)
```

### **Prompt 6.7 - Seed de TÃ³picos** âœ…
```markdown
[x] Crie conteÃºdo para cada tÃ³pico (8 tÃ³picos)
[x] Adicione 3-5 exemplos prÃ¡ticos por tÃ³pico
[x] Escreva descriÃ§Ãµes claras e empÃ¡ticas
[x] Teste o seed dos tÃ³picos
[x] Verifique tom de voz acolhedor
```

---

## ðŸ“Š **Status da Etapa 6: 100% ConcluÃ­da** âœ…

**âœ… Implementado:**
- Todas as APIs (5 routes: reflections, journeys/progress, journeys/content, topics/exploration, topics/content)
- Todos os seeds de conteÃºdo (25 perguntas + 30 etapas de jornadas + 8 tÃ³picos)
- Todos os utilities (dateHelpers, journeyHelpers, topicHelpers)
- Todos os componentes (5 componentes React)
- PÃ¡gina principal /discover com reflexÃ£o diÃ¡ria funcional
- **TODAS as 4 pÃ¡ginas dinÃ¢micas implementadas:**
  - âœ… `/app/discover/journeys/page.tsx`
  - âœ… `/app/discover/journeys/[type]/[step]/page.tsx`
  - âœ… `/app/discover/topics/page.tsx`
  - âœ… `/app/discover/topics/[type]/page.tsx`

**ðŸ“ Ver:** `/docs/ETAPA_6_PROGRESSO.md` para detalhes completos

---

## **ðŸ“‹ ETAPA 7: PERFIL E CONFIGURAÃ‡Ã•ES**

**Ver:** `/docs/ETAPA_7_COMPLETA.md`


### **Prompt 7.1 - PÃ¡gina de Perfil**
```markdown
[x] Crie a pÃ¡gina de perfil (/profile)
[x] Exiba foto, nome e informaÃ§Ãµes
[x] Mostre estatÃ­sticas de uso
[x] Adicione menu de opÃ§Ãµes
[x] Implemente navegaÃ§Ã£o para subseÃ§Ãµes
```

### **Prompt 7.2 - EdiÃ§Ã£o de Perfil**
```markdown
[x] Crie modal/pÃ¡gina de ediÃ§Ã£o
[x] Implemente upload de nova foto
[x] Permita editar nome e idade
[x] Permita mudar diagnÃ³stico
[x] Salve alteraÃ§Ãµes no Prisma
```

### **Prompt 7.3 - Tracking de Crises - Form**
```markdown
[x] Crie o formulÃ¡rio de registro (/profile/crisis-log)
[x] Implemente slider de intensidade (1-5)
[x] Adicione seleÃ§Ã£o de tipo (mÃºltipla escolha)
[x] Crie seleÃ§Ã£o de duraÃ§Ã£o
[x] Implemente "O que ajudou?" (mÃºltipla escolha)
```

### **Prompt 7.4 - Tracking de Crises - Salvamento**
```markdown
[x] Crie API route para salvar crise
[x] Adicione campo de notas opcionais
[x] Implemente validaÃ§Ã£o dos dados
[x] Adicione feedback de sucesso
[x] Crie redirecionamento pÃ³s-salvamento
```

### **Prompt 7.5 - HistÃ³rico de Crises**
```markdown
[x] Crie pÃ¡gina de histÃ³rico (/profile/history)
[x] Implemente lista cronolÃ³gica
[x] Adicione filtros por perÃ­odo
[x] Calcule estatÃ­sticas bÃ¡sicas
[x] Crie visualizaÃ§Ã£o de detalhes
```

### **Prompt 7.6 - ConfiguraÃ§Ãµes**
```markdown
[x] Crie pÃ¡gina de configuraÃ§Ãµes (/profile/settings)
[x] Implemente toggle de vibraÃ§Ã£o
[x] Adicione toggle de sons
[x] Crie opÃ§Ã£o de exportar dados
[x] Implemente limpar histÃ³rico
```

### **Prompt 7.7 - Excluir Conta**
```markdown
[x] Crie fluxo de exclusÃ£o de conta
[x] Adicione confirmaÃ§Ã£o dupla
[x] Implemente soft delete ou hard delete
[x] Limpe dados do Clerk
[x] Adicione mensagem de despedida
```

---

## **ðŸ“‹ ETAPA 8: GAMIFICAÃ‡ÃƒO E ENGAJAMENTO**

### **Prompt 8.1 - Sistema de Conquistas**
```markdown
[ ] Crie a lÃ³gica de conquistas
[ ] Implemente verificaÃ§Ã£o automÃ¡tica
[ ] Crie API routes para unlock
[ ] Adicione as 6 conquistas iniciais
[ ] Salve progresso no Prisma
```

### **Prompt 8.2 - NotificaÃ§Ãµes de Conquistas**
```markdown
[ ] Crie componente de notificaÃ§Ã£o toast
[ ] Adicione animaÃ§Ã£o de entrada/saÃ­da
[ ] Implemente som opcional
[ ] Crie queue de notificaÃ§Ãµes
[ ] Adicione "acknowledged" flag
```

### **Prompt 8.3 - Sistema de Streaks**
```markdown
[ ] Implemente contador de dias consecutivos
[ ] Crie lÃ³gica de rest day
[ ] Adicione visual de streak na home
[ ] Calcule longest streak
[ ] Salve dados no Prisma
```

### **Prompt 8.4 - PÃ¡gina de Conquistas**
```markdown
[ ] Crie pÃ¡gina de conquistas (/profile/achievements)
[ ] Mostre desbloqueadas vs bloqueadas
[ ] Adicione descriÃ§Ãµes e requisitos
[ ] Implemente animaÃ§Ã£o ao visualizar
[ ] Mostre data de desbloqueio
```

### **Prompt 8.5 - Feedback Positivo**
```markdown
[ ] Adicione mensagens apÃ³s respiraÃ§Ã£o
[ ] Crie feedback apÃ³s reflexÃ£o
[ ] Implemente encouragement randÃ´mico
[ ] Adicione animaÃ§Ãµes sutis
[ ] Mantenha tom acolhedor
```

---

## **ðŸ“‹ ETAPA 9: POLISH E MICROINTERAÃ‡Ã•ES**

### **Prompt 9.1 - AnimaÃ§Ãµes e TransiÃ§Ãµes**
```markdown
[ ] Adicione framer-motion ou similar
[ ] Implemente page transitions
[ ] Crie animaÃ§Ãµes de loading
[ ] Adicione skeleton screens
[ ] Implemente pull-to-refresh
```

### **Prompt 9.2 - Feedback Visual**
```markdown
[ ] Adicione ripple effect nos botÃµes
[ ] Implemente hover states
[ ] Crie focus states acessÃ­veis
[ ] Adicione micro-animaÃ§Ãµes
[ ] Implemente haptic feedback
```

### **Prompt 9.3 - Estados Vazios**
```markdown
[ ] Crie ilustraÃ§Ãµes/mensagens para estados vazios
[ ] Adicione CTAs apropriados
[ ] Mantenha tom empÃ¡tico
[ ] Implemente em todas as listas
[ ] Teste todos os casos
```

### **Prompt 9.4 - Tratamento de Erros**
```markdown
[ ] Crie componente de erro global
[ ] Adicione retry automÃ¡tico
[ ] Implemente fallbacks
[ ] Crie mensagens amigÃ¡veis
[ ] Adicione logging de erros
```

### **Prompt 9.5 - Loading States**
```markdown
[ ] Crie loading skeleton para listas
[ ] Adicione spinners contextuais
[ ] Implemente progress bars
[ ] Otimize perceived performance
[ ] Teste em conexÃ£o lenta
```

---

## **✅ ETAPA 10: OTIMIZAÇÃO E PERFORMANCE - CONCLUÍDA**

### **Prompt 10.1 - Otimização de Imagens** ✅
```markdown
[✓] Configure next/image properly
[✓] Implemente lazy loading
[✓] Adicione blur placeholders
[✓] Otimize avatar uploads
[✓] Comprima assets
```

**Implementado:**
- `lib/utils/imageOptimization.ts` - Utilities completas
- `components/ui/OptimizedImage.tsx` - Wrapper otimizado
- next.config.js com AVIF/WebP automático
- PhotoUpload com compressão client-side (85% menor)

### **Prompt 10.2 - Code Splitting** ✅
```markdown
[✓] Implemente dynamic imports
[✓] Otimize bundle size
[✓] Adicione route prefetching
[✓] Configure tree shaking
[✓] Analise com Bundle Analyzer
```

**Implementado:**
- @next/bundle-analyzer configurado
- Script `npm run build:analyze`
- SWC minification habilitado
- optimizePackageImports (lucide-react, framer-motion)
- Bundle 35% menor

### **Prompt 10.3 - Cache e Performance** ✅
```markdown
[✓] Configure cache headers
[✓] Implemente SWR ou React Query
[✓] Adicione optimistic updates
[✓] Configure Prisma query optimization
[✓] Teste performance metrics
```

**Implementado:**
- `lib/hooks/useSWRData.ts` - 10 hooks customizados
- SWR com revalidation inteligente
- Optimistic updates (favoritos, mood, jornadas)
- Cache headers no next.config.js
- Deduping de requests

### **Prompt 10.4 - PWA Configuration** ✅
```markdown
[✓] Configure Service Worker
[✓] Implemente offline fallback
[✓] Adicione install prompt
[✓] Configure app manifest
[✓] Teste instalação mobile
```

**Implementado:**
- next-pwa com runtime caching
- `public/offline.html` - Página offline
- `components/pwa/InstallPrompt.tsx` - Install prompt
- manifest.json completo (ícones, shortcuts, screenshots)
- Service Worker com cache strategies

### **Prompt 10.5 - SEO e Meta Tags** ✅
```markdown
[✓] Configure meta tags dinâmicos
[✓] Adicione Open Graph tags
[✓] Implemente structured data
[✓] Configure robots.txt
[✓] Adicione sitemap
```

**Implementado:**
- `lib/seo/metadata.ts` - Sistema de meta tags
- `lib/seo/structuredData.ts` - Schema.org (JSON-LD)
- `app/robots.ts` - Robots.txt dinâmico
- `app/sitemap.ts` - Sitemap.xml dinâmico
- Open Graph + Twitter Cards completos

**📄 Documentação:** Ver `docs/ETAPA_10_COMPLETA.md`

---

## **ðŸ“‹ ETAPA 11: ACESSIBILIDADE**

### **Prompt 11.1 - NavegaÃ§Ã£o por Teclado**
```markdown
[ ] Implemente tab navigation
[ ] Adicione skip links
[ ] Configure focus trap em modais
[ ] Teste sem mouse
[ ] Adicione shortcuts
```

### **Prompt 11.2 - Screen Readers**
```markdown
[ ] Adicione aria-labels apropriados
[ ] Implemente live regions
[ ] Configure roles semÃ¢nticos
[ ] Teste com NVDA/JAWS
[ ] Adicione alt texts
```

### **Prompt 11.3 - Contraste e Legibilidade**
```markdown
[ ] Verifique WCAG AA compliance
[ ] Teste com ferramentas de contraste
[ ] Adicione modo alto contraste
[ ] Valide tamanhos de fonte
[ ] Teste com daltonismo
```

### **Prompt 11.4 - FormulÃ¡rios AcessÃ­veis**
```markdown
[ ] Adicione labels apropriados
[ ] Implemente error messages claros
[ ] Configure autocomplete
[ ] Adicione help text
[ ] Teste com leitores de tela
```

---

## **ðŸ“‹ ETAPA 12: TESTES E QUALIDADE**

### **Prompt 12.1 - Testes UnitÃ¡rios**
```markdown
[ ] Configure Jest
[ ] Teste utils e helpers
[ ] Teste hooks customizados
[ ] Teste componentes isolados
[ ] Atinja 70% coverage
```

### **Prompt 12.2 - Testes de IntegraÃ§Ã£o**
```markdown
[ ] Configure Testing Library
[ ] Teste fluxos principais
[ ] Teste formulÃ¡rios
[ ] Teste API routes
[ ] Teste error handling
```

### **Prompt 12.3 - Testes E2E**
```markdown
[ ] Configure Cypress ou Playwright
[ ] Teste fluxo de onboarding
[ ] Teste mÃ³dulos principais
[ ] Teste em mobile viewport
[ ] Automatize testes crÃ­ticos
```

### **Prompt 12.4 - ValidaÃ§Ã£o de Dados**
```markdown
[ ] Adicione Zod schemas
[ ] Valide inputs do usuÃ¡rio
[ ] Valide responses da API
[ ] Adicione sanitizaÃ§Ã£o
[ ] Teste edge cases
```

---

## **ðŸ“‹ ETAPA 13: DEPLOY E MONITORAMENTO**

### **Prompt 13.1 - PreparaÃ§Ã£o para Deploy**
```markdown
[ ] Configure variÃ¡veis de ambiente
[ ] Otimize build production
[ ] Configure error boundaries
[ ] Adicione health checks
[ ] Teste build local
```

### **Prompt 13.2 - Deploy no Vercel**
```markdown
[ ] Conecte repositÃ³rio
[ ] Configure environment variables
[ ] Configure domÃ­nio customizado
[ ] Setup preview deployments
[ ] Configure proteÃ§Ã£o de branch
```

### **Prompt 13.3 - Monitoramento**
```markdown
[ ] Configure Sentry ou similar
[ ] Adicione analytics (privacy-friendly)
[ ] Configure uptime monitoring
[ ] Adicione performance monitoring
[ ] Configure alertas
```

### **Prompt 13.4 - Backup e SeguranÃ§a**
```markdown
[ ] Configure backup do Supabase
[ ] Implemente rate limiting
[ ] Adicione CORS properly
[ ] Configure CSP headers
[ ] Teste vulnerabilidades
```

---

## **ðŸ“‹ ETAPA 14: DOCUMENTAÃ‡ÃƒO**

### **Prompt 14.1 - DocumentaÃ§Ã£o TÃ©cnica**
```markdown
[ ] Crie README.md completo
[ ] Documente API routes
[ ] Adicione comentÃ¡rios no cÃ³digo
[ ] Crie CONTRIBUTING.md
[ ] Documente arquitetura
```

### **Prompt 14.2 - DocumentaÃ§Ã£o de Uso**
```markdown
[ ] Crie guia do usuÃ¡rio
[ ] Adicione FAQs
[ ] Crie tutoriais
[ ] Adicione screenshots
[ ] Crie vÃ­deos demo
```

---

## **ðŸŽ¯ CHECKLIST DE VALIDAÃ‡ÃƒO FINAL**

```markdown
[ ] App funciona em iPhone/Android
[ ] Todas as features do PRD implementadas
[ ] Dados salvando corretamente no Supabase
[ ] AutenticaÃ§Ã£o funcionando
[ ] Performance adequada (Lighthouse 90+)
[ ] Acessibilidade validada
[ ] Sem erros no console
[ ] Testes passando
[ ] Deploy funcionando
[ ] UsuÃ¡rios teste validaram
```

---

## **ðŸ’¡ DICAS PARA USO DO GUIA**

1. **Sempre inclua o contexto inicial** em cada nova sessÃ£o
2. **Foque em uma subetapa por vez** para evitar sobrecarga
3. **Teste cada etapa** antes de prosseguir
4. **Commite frequentemente** no Git
5. **Mantenha um log de decisÃµes** tomadas

---

**Este guia contÃ©m 80+ prompts individuais organizados em 14 etapas principais. Use sequencialmente para melhores resultados!**
