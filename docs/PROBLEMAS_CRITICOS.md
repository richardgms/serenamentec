# ⚠️ Problemas Críticos - Documentação para IA

## Análise para Execução por Claude 4.5 Sonnet

**Data:** 21 de Outubro de 2025  
**Objetivo:** Identificar gaps que impedem execução autônoma por IA

---

## 🔴 PROBLEMAS CRÍTICOS

### 1. **etapas-estrutural.md INCOMPLETO** 
**Severidade:** CRÍTICA ❌

**Problema:**
- Só tem Fases 0, 1, 2 com código completo
- Fases 3-7 são apenas títulos/resumo
- IA não consegue implementar sem código de referência

**Impacto:**
- 70% da implementação estrutural não é executável

**Solução Necessária:**
- Completar Fases 3-7 com código detalhado igual Fases 1-2

---

### 2. **Falta Ordem de Execução Clara**
**Severidade:** ALTA ⚠️

**Problema:**
- Documentação diz "Visual OU Estrutura"
- Mas não deixa claro QUAL ARQUIVO ABRIR PRIMEIRO
- Não especifica dependências entre componentes

**Exemplo do problema:**
```
❓ Para criar Home personalizada:
  - Preciso do AppShell já criado? (estrutura)
  - Preciso do Card já estilizado? (visual)
  - Qual fazer primeiro?
```

**Solução Necessária:**
- Criar arquivo ORDEM_EXECUCAO.md com DAG de dependências

---

### 3. **Integração Visual ↔ Estrutura Vaga**
**Severidade:** ALTA ⚠️

**Problema:**
- etapas-estrutural.md cria componentes HTML
- etapasvisual-v2.md estiliza componentes
- Mas não diz claramente QUANDO aplicar estilo

**Exemplo:**
```tsx
// Estrutura cria:
<Button>Texto</Button>

// Visual estiliza:
className="bg-gradient-to-br from-primary..."

❓ Quando aplicar as classes? Na criação ou depois?
```

**Solução Necessária:**
- Cada prompt estrutural deve referenciar prompt visual correspondente
- Ex: "Depois de criar Button.tsx, aplicar estilos do Prompt Visual 2.1"

---

### 4. **Falta Código de Integração com Backend**
**Severidade:** MÉDIA ⚠️

**Problema:**
- Prompts mostram `await fetch('/api/...')`
- Mas não especificam se API JÁ EXISTE ou precisa criar
- Não lista rotas existentes vs novas

**Exemplo:**
```typescript
// Prompt diz:
await fetch('/api/user/onboarding', { ... })

❓ Esta rota existe? Preciso criar? Onde?
```

**Solução Necessária:**
- Listar todas as rotas API existentes
- Marcar quais precisam ser criadas

---

### 5. **Design Tokens Não Estão em globals.css**
**Severidade:** MÉDIA ⚠️

**Problema:**
- design-tokens.ts é TypeScript (valores)
- Mas CSS precisa de variáveis CSS
- etapasvisual-v2.md Prompt 1.1 cria CSS variables
- MAS etapas-estrutural.md não referencia isso

**Solução Necessária:**
- etapas-estrutural.md Fase 0 deve incluir "Executar Prompt Visual 1.1 primeiro"

---

### 6. **Imports Ambíguos**
**Severidade:** MÉDIA ⚠️

**Problema:**
```typescript
import { Button } from '@/components/ui/Button'
```

**Questões:**
- ❓ Este arquivo existe ou vou criar?
- ❓ Se existe, vou SUBSTITUIR ou EDITAR?
- ❓ Se substituir, o que acontece com código que usa o antigo?

**Solução Necessária:**
- Cada prompt deve dizer: "CRIAR NOVO" ou "SUBSTITUIR" ou "EDITAR"

---

### 7. **Falta Validação Entre Steps**
**Severidade:** MÉDIA ⚠️

**Problema:**
- Checklists ao final de cada fase
- Mas não diz COMO validar
- IA não sabe se implementou corretamente

**Exemplo:**
```
[ ] Bottom Nav com 4 itens

❓ Como validar? Rodar servidor? Que página abrir?
```

**Solução Necessária:**
- Cada checklist item deve ter comando de validação
- Ex: `[ ] Bottom Nav funciona → Abrir /inicio, clicar em cada item`

---

### 8. **Componentes Existentes Não Mapeados**
**Severidade:** MÉDIA ⚠️

**Problema:**
- Prompt 0.1 diz "auditar código existente"
- Mas não fornece lista do que JÁ EXISTE
- IA terá que descobrir isso sozinha (ineficiente)

**Solução Necessária:**
- Criar INVENTARIO.md com todos componentes/páginas/rotas atuais

---

### 9. **Falta Arquivo de Constantes Compartilhadas**
**Severidade:** BAIXA ℹ️

**Problema:**
- XP values definidos em plano-estrutural.md
- Mas não há arquivo `lib/gamification/constants.ts`
- IA precisará copiar valores do .md (erro-prone)

**Solução Necessária:**
- Criar arquivo com todas constantes já definidas

---

### 10. **Glossário de Termos Falta Exemplos Visuais**
**Severidade:** BAIXA ℹ️

**Problema:**
- "Glassmorphism", "Neumorphism" explicados em texto
- Mas IA pode interpretar diferente sem referência visual

**Solução Necessária:**
- Adicionar links para exemplos ou CodePen

---

## 📊 Resumo de Severidade

| Nível | Quantidade | Itens |
|-------|------------|-------|
| **🔴 CRÍTICO** | 1 | #1 |
| **⚠️ ALTO** | 2 | #2, #3 |
| **⚠️ MÉDIO** | 5 | #4, #5, #6, #7, #8 |
| **ℹ️ BAIXO** | 2 | #9, #10 |

---

## ✅ Ações Corretivas Necessárias

### Prioridade P0 (Bloqueia Execução)
1. ✅ Completar etapas-estrutural.md Fases 3-7
2. ✅ Criar ORDEM_EXECUCAO.md
3. ✅ Adicionar referências cruzadas Visual ↔ Estrutura

### Prioridade P1 (Reduz Erros)
4. ✅ Criar INVENTARIO.md (componentes existentes)
5. ✅ Listar APIs existentes vs novas
6. ✅ Especificar "CRIAR" vs "SUBSTITUIR" vs "EDITAR"

### Prioridade P2 (Melhora Qualidade)
7. ✅ Adicionar comandos de validação em checklists
8. ✅ Criar arquivo de constantes compartilhadas
9. ⚠️ Adicionar exemplos visuais (opcional)

---

## 🎯 Plano de Correção

### Etapa 1: Completar etapas-estrutural.md
- Fases 3-7 com mesmo nível de detalhe que Fases 1-2
- Código completo para cada componente
- Checklists validáveis

### Etapa 2: Criar ORDEM_EXECUCAO.md
- DAG visual de dependências
- Ordem exata de prompts
- Referências cruzadas Visual ↔ Estrutura

### Etapa 3: Criar INVENTARIO.md
- Listar TUDO que existe hoje
- Marcar o que será mantido/refatorado/substituído

### Etapa 4: Refinar Prompts
- Adicionar "CRIAR NOVO" ou "SUBSTITUIR"
- Adicionar comandos de validação
- Referenciar design tokens onde necessário

---

## 📝 Template de Prompt Ideal

```markdown
### Prompt X.Y - Componente Z

**AÇÃO:** [CRIAR NOVO | SUBSTITUIR | EDITAR] arquivo `path/to/file.tsx`

**DEPENDÊNCIAS:**
- [ ] Prompt Visual A.B já executado (design tokens)
- [ ] Prompt Estrutural C.D já executado (layout base)

**CÓDIGO COMPLETO:**
```typescript
// Código aqui (100% completo, não "... resto")
```

**INTEGRAÇÃO:**
- Importar em: `app/page.tsx` linha 10
- Usar design tokens: `--primary` de globals.css
- API route: `/api/route` (JÁ EXISTE | CRIAR NOVA)

**VALIDAÇÃO:**
1. Rodar: `npm run dev`
2. Abrir: http://localhost:3000/rota
3. Verificar: [comportamento específico]
4. Checklist:
   - [ ] Componente renderiza
   - [ ] [comportamento 1] funciona
   - [ ] [comportamento 2] funciona

**PRÓXIMO PASSO:**
Executar Prompt X.Y+1 (Component W)
```

---

## 🚨 Conclusão

A documentação atual está **80% pronta** mas tem **gaps críticos** que impedem execução autônoma por IA.

**Necessário:**
- ✅ Completar etapas-estrutural.md (Fases 3-7)
- ✅ Criar ORDEM_EXECUCAO.md
- ✅ Criar INVENTARIO.md
- ✅ Adicionar referências cruzadas
- ✅ Refinar prompts com template ideal

**Tempo estimado de correção:** 4-6 horas

**Após correções:** Documentação será 95% executável por IA autonomamente.

---

**Próximo passo:** Implementar correções em ordem de prioridade.

