# Sistema de Feature Flags

Sistema de migração incremental para ativar/desativar features durante a reestruturação do Serenamente.

## Objetivo

Permitir o desenvolvimento e teste de novas features em paralelo com o código existente, sem quebrar a aplicação em produção.

## Como Funciona

As feature flags são variáveis de ambiente que controlam se uma feature está ativa ou não.

### Configuração

Todas as flags estão definidas em `.env.local`:

```bash
# FASE 1: Landing & Auth
NEXT_PUBLIC_NEW_LANDING=false
NEXT_PUBLIC_NEW_AUTH=false

# FASE 2: App Shell & Core
NEXT_PUBLIC_APP_SHELL=false
# ... etc
```

**Importante:** Todas começam como `false`. Ative apenas quando a feature estiver implementada e testada.

## Uso

### Em Componentes React (Hook)

```tsx
'use client'

import { useFeatureFlag } from '@/lib/features/flags'

export default function HomePage() {
  const useNewHome = useFeatureFlag('USE_NEW_HOME')

  if (useNewHome) {
    return <NewHomePage />
  }

  return <OldHomePage />
}
```

### Fora de Componentes (Função)

```ts
import { isFeatureEnabled } from '@/lib/features/flags'

if (isFeatureEnabled('USE_NEW_LANDING')) {
  // Lógica para landing nova
}
```

### Verificar Múltiplas Flags

```ts
import { areAllFlagsActive, isAnyFlagActive } from '@/lib/features/flags'

// Verificar se TODAS as flags de uma fase estão ativas
const phase1Complete = areAllFlagsActive([
  'USE_NEW_LANDING',
  'USE_NEW_AUTH'
])

// Verificar se ALGUMA flag está ativa
const hasGamification = isAnyFlagActive([
  'USE_GAMIFICATION',
  'USE_XP_BAR',
  'USE_LEVEL_SYSTEM'
])
```

### Listar Flags Ativas (Debug)

```ts
import { getActiveFlags } from '@/lib/features/flags'

console.log('Flags ativas:', getActiveFlags())
// Output: ['USE_NEW_HOME', 'USE_APP_SHELL']
```

## Exemplo Prático: Migração de Página

### 1. Criar Nova Versão

```tsx
// app/home/page-new.tsx
export default function NewHomePage() {
  return (
    <div>
      <h1>Nova Home Personalizada</h1>
      {/* Novo código aqui */}
    </div>
  )
}
```

### 2. Manter Versão Antiga

```tsx
// app/home/page-old.tsx
export default function OldHomePage() {
  return (
    <div>
      <h1>Home Original</h1>
      {/* Código antigo */}
    </div>
  )
}
```

### 3. Criar Switch no Page Principal

```tsx
// app/home/page.tsx
'use client'

import { useFeatureFlag } from '@/lib/features/flags'
import OldHomePage from './page-old'
import NewHomePage from './page-new'

export default function HomePage() {
  const useNewHome = useFeatureFlag('USE_NEW_HOME')

  return useNewHome ? <NewHomePage /> : <OldHomePage />
}
```

### 4. Ativar Feature

```bash
# .env.local
NEXT_PUBLIC_NEW_HOME=true  # Mudar de false para true
```

### 5. Testar

```bash
# Reiniciar o dev server para carregar nova env
npm run dev
```

### 6. Validar e Cleanup

Após validar que a nova versão funciona:

1. Remover código antigo (page-old.tsx)
2. Renomear page-new.tsx para page.tsx
3. Remover flag do código
4. (Opcional) Remover flag do .env.local se não for mais necessária

## Workflow de Migração

```
┌─────────────────────────────────────────────┐
│ 1. Criar nova feature em paralelo          │
│    - Novo arquivo/componente                │
│    - Não tocar no código antigo             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 2. Adicionar switch com feature flag       │
│    - useFeatureFlag('USE_NEW_X')            │
│    - if (flag) { new } else { old }         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 3. Testar com flag=false (old code)        │
│    - Garantir que nada quebrou              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 4. Ativar flag=true                         │
│    - Testar nova feature                    │
│    - Validar todos os casos                 │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 5. Validar em produção (subset users)      │
│    - Deploy com flag=true para alguns       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 6. Rollout completo                         │
│    - flag=true para todos                   │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 7. Cleanup                                  │
│    - Remover código antigo                  │
│    - Remover flag do código                 │
│    - Atualizar documentação                 │
└─────────────────────────────────────────────┘
```

## Flags por Fase

### Fase 1: Landing & Auth (Semana 1)
- `USE_NEW_LANDING` - Nova landing page profissional
- `USE_NEW_AUTH` - Auth screens com branding

### Fase 2: App Shell & Core (Semana 2)
- `USE_APP_SHELL` - App shell com bottom nav
- `USE_BOTTOM_NAV` - Bottom navigation mobile
- `USE_NEW_ONBOARDING` - Onboarding 7 steps

### Fase 3: Home Personalizada (Semana 5)
- `USE_NEW_HOME` - Home com personalização
- `USE_RECOMMENDATIONS` - Sistema de recomendações

### Fase 4: Breathing Flow (Semana 6)
- `USE_NEW_BREATHING` - Breathing hub refatorado
- `USE_SESSION_FLOW` - Session flow 3 stages

### Fase 5: Gamificação (Semana 8)
- `USE_GAMIFICATION` - Sistema de gamificação visível
- `USE_XP_BAR` - Barra de XP
- `USE_LEVEL_SYSTEM` - Sistema de níveis

### Fase 6: Discover (Semana 7)
- `USE_NEW_DISCOVER` - Discover reorganizado
- `USE_DISCOVER_TABS` - Tab structure

### Fase 7: Profile (Semana 9)
- `USE_NEW_PROFILE` - Profile dashboard completo
- `USE_PROFILE_INSIGHTS` - Insights e charts

### Fase 8: Videos/Calm (Semana 7)
- `USE_NEW_CALM` - Videos com curadoria
- `USE_CURATED_CONTENT` - Playlists e staff picks

## Boas Práticas

### ✅ FAZER

- Criar nova feature em arquivo separado
- Testar com flag=false antes de ativar
- Documentar mudanças
- Fazer cleanup após validação
- Usar nomes descritivos para flags

### ❌ NÃO FAZER

- Modificar código antigo diretamente
- Ativar flag sem testar
- Deixar código antigo permanentemente (cleanup!)
- Criar flags genéricas (USE_NEW_FEATURE)
- Misturar lógica antiga e nova no mesmo arquivo

## Troubleshooting

### Flag não está funcionando

1. Verificar se o servidor foi reiniciado após mudar .env.local
2. Verificar se o nome da flag está correto (case-sensitive)
3. Verificar se o valor é exatamente 'true' (string)

### Next.js não reconhece a variável

Variáveis de ambiente do Next.js precisam:
- Começar com `NEXT_PUBLIC_` para serem acessíveis no client
- Servidor reiniciado após mudanças em .env.local
- Build rebuild em produção

### Como reverter uma feature

```bash
# .env.local
NEXT_PUBLIC_NEW_HOME=false  # Voltar para false
```

Reinicie o servidor e a versão antiga voltará a funcionar.

## Recursos

- **Arquivo principal:** `lib/features/flags.ts`
- **Configuração:** `.env.local`
- **Documentação:** `docs/estrutura/etapas-estrutural.md`
- **Auditoria:** `AUDITORIA_ATUAL.md`

## Suporte

Para questões sobre feature flags, consultar:
1. Este README
2. `docs/estrutura/README.md`
3. `AUDITORIA_ATUAL.md` (decisões de migração)
