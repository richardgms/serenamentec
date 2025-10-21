# 🎨 Etapas de Implementação - Refatoração Visual Serenamente (v2)

## Guia de Prompts para Implementação do Sistema Calm Organic Design

**Versão:** 2.0 (Melhorada para execução por IA)  
**Data:** Outubro 2025

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

**IMPORTANTE:** Verificar antes de começar:
- lib/hooks/useHaptic.ts JÁ EXISTE (usar, não recriar)
- lib/store/achievementStore.ts JÁ EXISTE
- lib/store/uiStore.ts JÁ EXISTE
- components/ui/RippleButton.tsx JÁ EXISTE (verificar compatibilidade)

Estou na etapa: [NOME DA ETAPA]
```

---

## **FASE 0: SETUP E AUDITORIA** (1 hora)

### **Prompt 0.1 - Auditoria de Código Existente**
```markdown
ANTES de começar a refatoração, audite o que JÁ EXISTE:

Verificar e listar:
[ ] lib/hooks/useHaptic.ts - Se existe, ler e documentar API
[ ] lib/store/achievementStore.ts - Se existe, listar actions
[ ] lib/store/uiStore.ts - Se existe, listar state
[ ] lib/store/userStore.ts - Se existe, listar state
[ ] components/ui/RippleButton.tsx - Se existe, avaliar se é compatível
[ ] components/gamification/AchievementToast.tsx - Se existe, planejar refatoração (não recriação)

IMPORTANTE: Criar lista de "REUSAR" vs "REFATORAR" vs "CRIAR NOVO"
```

### **Prompt 0.2 - Instalação de Dependências**
```bash
# Instalar dependências necessárias
npm install phosphor-react@^2.1.7
npm install class-variance-authority@^0.7.0
npm install clsx@^2.1.0

# Verificar instalação
npm list phosphor-react class-variance-authority clsx
```

**Checklist de validação:**
- [ ] package.json atualizado com as 3 dependências
- [ ] npm install completou sem erros
- [ ] `npm list [package]` mostra versão instalada
- [ ] Servidor reiniciado: `npm run dev`

---

## **FASE 1: FUNDAÇÃO** (Semana 1)

### **Prompt 1.1 - Design Tokens e CSS Global**
```markdown
REFATORAR app/globals.css para usar design tokens de docs/visual/design-tokens.ts.

**IMPORTANTE:** Adicionar NO INÍCIO do arquivo (após imports Tailwind):

```css
/* ============================================================================
   DESIGN TOKENS - Sistema Calm Organic Design
   ============================================================================ */

:root {
  /* Cores Primárias */
  --primary: #7DD3C0;
  --primary-light: #A8E6D7;
  --primary-dark: #5FB8A8;
  
  /* Surfaces - Modo Claro */
  --surface-main: #F8FAFB;
  --surface-card: #FFFFFF;
  --surface-overlay: rgba(255, 255, 255, 0.95);
  --surface-glass: rgba(255, 255, 255, 0.7);
  
  /* Texto - Modo Claro */
  --text-primary: #2C3E50;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  
  /* Borders */
  --border-subtle: rgba(125, 211, 192, 0.1);
  --border-light: rgba(125, 211, 192, 0.2);
  --border-medium: rgba(125, 211, 192, 0.3);
  
  /* Estados */
  --success: #6BCF7F;
  --warning: #F5B461;
  --error: #FF8B94;
  --info: #7DD3C0;
  
  /* Animações */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --surface-main: #1A2332;
  --surface-card: #243447;
  --surface-overlay: rgba(26, 35, 50, 0.95);
  --surface-glass: rgba(36, 52, 71, 0.7);
  
  --text-primary: #E8F4F8;
  --text-secondary: #A8C5DA;
  --text-tertiary: #7A99B4;
  --text-inverse: #2C3E50;
  
  --border-subtle: rgba(125, 211, 192, 0.15);
  --border-light: rgba(125, 211, 192, 0.25);
  --border-medium: rgba(125, 211, 192, 0.35);
}

/* ============================================================================
   KEYFRAMES
   ============================================================================ */

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDownFade {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================================================
   CLASSES UTILITY
   ============================================================================ */

.glass-effect {
  background: var(--surface-glass);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-light);
}

.transition-smooth {
  transition: all var(--duration-normal) var(--easing-smooth);
}
```

**Checklist:**
[ ] CSS variables criadas para light e dark
[ ] Keyframes adicionados
[ ] Suporte a prefers-reduced-motion
[ ] Classes utility criadas
[ ] Sem erros ao rodar npm run dev
```

### **Prompt 1.2 - Tailwind Config**
```markdown
ATUALIZAR tailwind.config.ts para usar os design tokens.

SUBSTITUIR a seção `theme: { extend: {} }` por:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#7DD3C0',
        light: '#A8E6D7',
        dark: '#5FB8A8',
        50: '#E8F9F6',
        100: '#C4F0E8',
        200: '#A8E6D7',
        300: '#7DD3C0',
        400: '#5FB8A8',
        500: '#4AA393',
        600: '#3A8A7D',
        700: '#2D6E64',
        800: '#1F4D47',
        900: '#143530',
      },
      accent: {
        aqua: '#B8DFD8',
        warm: '#FFD6BA',
        calm: '#E8F4F8',
        sage: '#C8D5B9',
      },
      mood: {
        'very-bad': '#FF8B94',
        bad: '#FFB4A2',
        neutral: '#E0E0E0',
        good: '#B8DFD8',
        'very-good': '#7DD3C0',
      },
      success: '#6BCF7F',
      warning: '#F5B461',
      error: '#FF8B94',
    },
    fontFamily: {
      sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      sm: '8px',
      DEFAULT: '12px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
    },
    boxShadow: {
      'soft-sm': '0 1px 2px rgba(125, 211, 192, 0.05), 0 2px 4px rgba(44, 62, 80, 0.03)',
      'soft-md': '0 1px 2px rgba(125, 211, 192, 0.05), 0 4px 8px rgba(125, 211, 192, 0.08), 0 12px 24px rgba(44, 62, 80, 0.04)',
      'soft-lg': '0 2px 4px rgba(125, 211, 192, 0.08), 0 8px 16px rgba(125, 211, 192, 0.12), 0 16px 32px rgba(44, 62, 80, 0.06)',
      'soft-xl': '0 4px 8px rgba(125, 211, 192, 0.1), 0 16px 32px rgba(125, 211, 192, 0.15), 0 24px 48px rgba(44, 62, 80, 0.08)',
      'glow': '0 0 20px rgba(125, 211, 192, 0.4)',
    },
    blur: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '20px',
      '2xl': '40px',
    },
    animation: {
      'slide-up': 'slideUpFade 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      'slide-down': 'slideDownFade 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      'ripple': 'ripple 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      'breathe': 'breathe 4s ease-in-out infinite',
    },
  },
},
```

**Checklist:**
[ ] Arquivo salvo sem erros TypeScript
[ ] npm run dev rodando sem warnings
[ ] Testar classe: `className="bg-primary text-white rounded-lg shadow-soft-md"`
```

### **Prompt 1.3 - Plus Jakarta Sans**
```markdown
Instalar e configurar Plus Jakarta Sans usando next/font.

**PASSO 1:** EDITAR app/layout.tsx

ADICIONAR no início do arquivo (após outros imports):

```typescript
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})
```

**PASSO 2:** MODIFICAR o elemento `<html>`:

ANTES:
```tsx
<html lang="pt-BR">
```

DEPOIS:
```tsx
<html lang="pt-BR" className={jakarta.variable}>
```

**PASSO 3:** VERIFICAR em app/globals.css se já existe:

```css
body {
  font-family: var(--font-jakarta), sans-serif;
}
```

Se NÃO existir, adicionar.

**Checklist de validação:**
[ ] next/font importado
[ ] Variable CSS criada (--font-jakarta)
[ ] Aplicada no <html>
[ ] Testar no navegador: DevTools → Elements → Computed → font-family deve mostrar "Plus Jakarta Sans"
```

### **Prompt 1.4 - Theme Provider (Modo Escuro)**
```markdown
Criar sistema de tema claro/escuro.

**PASSO 1:** CRIAR arquivo `lib/design/theme.tsx`:

```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: ResolvedTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    // Ler preferência salva
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    // Resolver tema baseado em system preference
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setResolvedTheme(isDark ? 'dark' : 'light')
      } else {
        setResolvedTheme(theme as ResolvedTheme)
      }
    }

    updateResolvedTheme()

    // Listener para mudanças no sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateResolvedTheme)

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme)
  }, [theme])

  useEffect(() => {
    // Aplicar tema no HTML
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    
    // Salvar preferência
    if (theme !== 'system') {
      localStorage.setItem('theme', theme)
    }
  }, [resolvedTheme, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

**PASSO 2:** EDITAR app/layout.tsx

ADICIONAR import:
```typescript
import { ThemeProvider } from '@/lib/design/theme'
```

ENVOLVER {children} com ThemeProvider:
```tsx
<body>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>
```

**PASSO 3:** Testar no console do navegador:
```javascript
// Deve mostrar "light" ou "dark"
document.documentElement.getAttribute('data-theme')
```

**Checklist:**
[ ] Arquivo theme.tsx criado
[ ] ThemeProvider adicionado ao layout
[ ] Tema detecta preferência do sistema
[ ] localStorage persiste escolha
[ ] Transição suave entre temas (verificar visualmente)
```

### **Prompt 1.5 - Phosphor Icons**
```markdown
Instalar e configurar Phosphor Icons.

**PASSO 1:** Instalar dependência:
```bash
npm install phosphor-react@^2.1.7
```

**PASSO 2:** CRIAR wrapper `components/ui/OptimizedIcon.tsx`:

```typescript
'use client'

import { Icon, IconWeight } from 'phosphor-react'
import { ComponentType } from 'react'

interface OptimizedIconProps {
  icon: ComponentType<{ size?: number; weight?: IconWeight; color?: string }>
  size?: 16 | 20 | 24 | 32 | 48 | 64
  weight?: IconWeight
  color?: string
  className?: string
}

export function OptimizedIcon({ 
  icon: IconComponent, 
  size = 24, 
  weight = 'duotone',
  color = 'currentColor',
  className 
}: OptimizedIconProps) {
  return (
    <IconComponent 
      size={size} 
      weight={weight} 
      color={color}
      className={className}
    />
  )
}
```

**PASSO 3:** CRIAR constants `lib/constants/icons.ts`:

```typescript
// Importar apenas ícones usados (tree-shaking)
export { 
  House,
  Wind,
  VideoCamera,
  Compass,
  User,
  Brain,
  Heart,
  Trophy,
  Smiley,
  SmileyMeh,
  SmileySad,
  Play,
  Pause,
  ArrowLeft,
  Sun,
  Moon,
  ChevronRight,
  Check,
} from 'phosphor-react'
```

**Checklist:**
[ ] phosphor-react instalado
[ ] OptimizedIcon.tsx criado
[ ] icons.ts com exports selecionados
[ ] Testar importação: `import { House } from '@/lib/constants/icons'`
```

**✅ VALIDAÇÃO FASE 1**
```markdown
Antes de prosseguir para Fase 2:

1. Verificar tema escuro:
   - [ ] Abrir http://localhost:3000
   - [ ] Abrir DevTools Console
   - [ ] Executar: `document.documentElement.setAttribute('data-theme', 'dark')`
   - [ ] Background deve mudar para #1A2332

2. Verificar Plus Jakarta Sans:
   - [ ] DevTools → Elements → <body> → Computed
   - [ ] font-family deve mostrar "Plus Jakarta Sans"

3. Verificar Tailwind:
   - [ ] Criar componente teste com className="bg-primary rounded-lg shadow-soft-md"
   - [ ] Deve ter background turquesa, border-radius 16px, shadow visível

4. Sem erros:
   - [ ] Console do navegador sem erros
   - [ ] Terminal npm run dev sem warnings
```

---

## **FASE 2: COMPONENTES BASE** (Semana 2)

### **Prompt 2.1 - Button Component**
```markdown
SUBSTITUIR completamente `components/ui/Button.tsx`.

**ESTRUTURA DO ARQUIVO:**

```typescript
'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-98',
        secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:scale-98',
        ghost: 'text-secondary hover:bg-primary/5 active:scale-98',
        danger: 'bg-error text-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-98',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            Carregando...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

**PASSO 2:** Criar página de teste `app/test-components/page.tsx`:

```tsx
import { Button } from '@/components/ui/Button'

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Teste de Botões</h1>
      
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      
      <div>
        <Button isLoading>Loading</Button>
      </div>
    </div>
  )
}
```

**Checklist:**
[ ] Button.tsx substituído
[ ] 4 variantes renderizam corretamente
[ ] 3 tamanhos funcionam
[ ] Loading state funciona
[ ] Hover effects visíveis
[ ] Sem erros TypeScript
[ ] Testar em http://localhost:3000/test-components
```

### **Prompt 2.2 - Card Component**
```markdown
REFATORAR components/ui/Card.tsx com 3 variantes.

```typescript
'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const cardVariants = cva(
  'rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-surface-card border border-border-subtle shadow-soft-md',
        glass: 'glass-effect shadow-soft-lg',
        elevated: 'bg-white dark:bg-surface-card shadow-soft-xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      clickable: {
        true: 'cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-soft-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      clickable: false,
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(cardVariants({ variant, padding, clickable }), className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card, cardVariants }
```

**Adicionar ao teste:**
```tsx
// Em app/test-components/page.tsx
import { Card } from '@/components/ui/Card'

// Adicionar:
<div className="space-y-4">
  <Card variant="default">
    <h3 className="font-semibold">Default Card</h3>
    <p>Conteúdo</p>
  </Card>
  
  <Card variant="glass">
    <h3 className="font-semibold">Glass Card</h3>
    <p>Efeito glassmorphism</p>
  </Card>
  
  <Card variant="elevated" clickable>
    <h3 className="font-semibold">Elevated Clickable</h3>
    <p>Hover para ver efeito</p>
  </Card>
</div>
```

**Checklist:**
[ ] 3 variantes funcionam
[ ] Clickable hover funciona
[ ] Glass effect visível
[ ] Responsivo a padding
[ ] Sem erros
```

### **Prompt 2.3 - Input Component**
```markdown
CRIAR/REFATORAR components/ui/Input.tsx.

```typescript
'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={clsx(
            'w-full h-11 px-4 rounded-xl border-2 transition-all duration-150',
            'bg-white dark:bg-surface-card',
            'text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            error 
              ? 'border-error focus:border-error focus:ring-error/50' 
              : 'border-border-light',
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

**Teste:**
```tsx
// Adicionar em app/test-components/page.tsx
<div className="space-y-4">
  <Input label="Nome" placeholder="Digite seu nome" />
  <Input label="Email" type="email" error="Email inválido" />
  <Input label="Senha" type="password" helperText="Mínimo 8 caracteres" />
</div>
```

**Checklist:**
[ ] Input renderiza
[ ] Focus state (borda turquesa + glow)
[ ] Error state (borda vermelha)
[ ] Helper text visível
[ ] Acessível (label associado)
```

### **Prompt 2.4 - Avatar Component**
```markdown
CRIAR components/ui/Avatar.tsx.

```typescript
'use client'

import { forwardRef, ImgHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const avatarVariants = cva(
  'rounded-full border-3 border-white dark:border-surface-card shadow-soft-sm object-cover',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>,
    VariantProps<typeof avatarVariants> {
  src?: string
  fallback?: string
  name?: string
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size, src, fallback, name, alt, ...props }, ref) => {
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '??'

    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt || name || 'Avatar'}
          className={clsx(avatarVariants({ size }), className)}
          {...props}
        />
      )
    }

    // Fallback com iniciais
    return (
      <div
        className={clsx(
          avatarVariants({ size }),
          'flex items-center justify-center bg-primary text-white font-semibold',
          className
        )}
      >
        {fallback || initials}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }
```

**Teste:**
```tsx
<div className="flex gap-4 items-center">
  <Avatar src="/foto.jpg" name="João Silva" size="xs" />
  <Avatar name="Maria Santos" size="sm" />
  <Avatar name="Pedro Costa" size="md" />
  <Avatar name="Ana Lima" size="lg" />
  <Avatar fallback="?" size="xl" />
</div>
```

**Checklist:**
[ ] Tamanhos xs a xl funcionam
[ ] Fallback com iniciais
[ ] Border branco visível
[ ] Shadow sutil
```

### **Prompt 2.5 - Badge e ProgressBar**
```markdown
CRIAR components/ui/Badge.tsx e REFATORAR components/discover/ProgressBar.tsx.

**BADGE:**
```typescript
'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
```

**PROGRESS BAR:**
```typescript
'use client'

import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full rounded-full bg-primary/10 overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light shadow-glow transition-all duration-400 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <p className="mt-1 text-xs text-text-secondary text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  )
}
```

**Teste:**
```tsx
<div className="space-y-4">
  <div>
    <Badge>Novo</Badge>
    <Badge variant="success">Completo</Badge>
    <Badge variant="warning">Atenção</Badge>
    <Badge variant="error">Urgente</Badge>
  </div>
  
  <div className="space-y-2">
    <ProgressBar value={30} showLabel />
    <ProgressBar value={60} size="lg" />
    <ProgressBar value={100} />
  </div>
</div>
```

**Checklist:**
[ ] Badge com 4 variantes
[ ] ProgressBar com gradiente
[ ] Glow sutil visível
[ ] Animação suave (400ms)
[ ] Label opcional funciona
```

**✅ VALIDAÇÃO FASE 2**
```markdown
Testar todos os componentes base:

1. Criar página de demonstração completa:
   - [ ] /test-components renderiza sem erros
   - [ ] Button: 4 variantes + 3 tamanhos + loading
   - [ ] Card: 3 variantes + clickable
   - [ ] Input: label + error + helper
   - [ ] Avatar: 5 tamanhos + fallback
   - [ ] Badge: 4 variantes
   - [ ] ProgressBar: animação suave

2. Testes visuais:
   - [ ] Hover states funcionam
   - [ ] Focus states visíveis
   - [ ] Modo escuro funciona (alternar tema)
   - [ ] Responsivo (testar em 320px, 375px, 428px)

3. Console limpo:
   - [ ] Sem erros TypeScript
   - [ ] Sem warnings
   - [ ] Lighthouse Accessibility >= 90
```

---

## **FASE 3: NAVEGAÇÃO** (Semana 3)

### **Prompt 3.1 - Header Redesign**
```markdown
REFATORAR components/navigation/Header.tsx.

```typescript
'use client'

import { useTheme } from '@/lib/design/theme'
import { Avatar } from '@/components/ui/Avatar'
import { useUser } from '@/lib/hooks/useUser'
import { Sun, Moon } from '@/lib/constants/icons'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { user } = useUser()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-sticky bg-surface-main/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-[428px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Avatar */}
        <button
          onClick={() => router.push('/profile')}
          className="transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <Avatar
            src={user?.photoURL || undefined}
            name={user?.name}
            size="sm"
          />
        </button>

        {/* Logo (opcional - descomentar se quiser) */}
        {/* <h1 className="text-lg font-bold text-primary">Serenamente</h1> */}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-150"
          aria-label="Alternar tema"
        >
          <motion.div
            animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {resolvedTheme === 'dark' ? (
              <Moon size={24} weight="duotone" className="text-primary" />
            ) : (
              <Sun size={24} weight="duotone" className="text-primary" />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  )
}
```

**IMPORTANTE:** Verificar se framer-motion está instalado:
```bash
npm install framer-motion@^11.0.0
```

**Checklist:**
[ ] Header sticky funciona
[ ] Avatar clicável leva ao /profile
[ ] Toggle tema com animação de rotação
[ ] Glassmorphism (blur) visível
[ ] Border sutil aparece
```

### **Prompt 3.2 - Breadcrumb**
```markdown
REFATORAR components/navigation/Breadcrumb.tsx.

```typescript
'use client'

import Link from 'next/link'
import { ChevronRight } from '@/lib/constants/icons'
import { clsx } from 'clsx'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={clsx('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors duration-150 truncate max-w-[120px]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  'truncate max-w-[150px]',
                  isLast ? 'text-text-primary font-semibold' : 'text-text-secondary'
                )}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight size={16} className="text-text-tertiary flex-shrink-0" />
            )}
          </div>
        )
      })}
    </nav>
  )
}
```

**Teste:**
```tsx
// Em qualquer página
<Breadcrumb
  items={[
    { label: 'Home', href: '/home' },
    { label: 'Descobrir', href: '/discover' },
    { label: 'Jornadas' },
  ]}
/>
```

**Checklist:**
[ ] Separador ChevronRight
[ ] Último item em negrito
[ ] Hover states funcionam
[ ] Truncate em textos longos
```

### **Prompt 3.3 - Page Transition**
```markdown
CRIAR components/transitions/PageTransition.tsx usando framer-motion.

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**APLICAR em todas as páginas principais:**

Exemplo - app/home/page.tsx:
```tsx
import { PageTransition } from '@/components/transitions/PageTransition'

export default function HomePage() {
  return (
    <PageTransition>
      <div className="p-4">
        {/* Conteúdo da página */}
      </div>
    </PageTransition>
  )
}
```

**Checklist:**
[ ] Animação de entrada (fade + slide up)
[ ] Duração 200ms
[ ] Aplicado em: /home, /breathe, /calm, /discover, /profile
```

### **Prompt 3.4 - Loading States**
```markdown
REFATORAR components/Loading.tsx e criar skeletons.

**SPINNER:**
```typescript
'use client'

import { clsx } from 'clsx'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  )
}
```

**LOADING SKELETON:**
```typescript
'use client'

import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface LoadingSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function LoadingSkeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  className,
  ...props
}: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-primary/10',
        width,
        height,
        roundedClasses[rounded],
        className
      )}
      {...props}
    />
  )
}
```

**REFATORAR JourneyCardSkeleton.tsx e VideoCardSkeleton.tsx:**

```typescript
// components/ui/JourneyCardSkeleton.tsx
import { LoadingSkeleton } from '@/components/Loading'
import { Card } from '@/components/ui/Card'

export function JourneyCardSkeleton() {
  return (
    <Card>
      <div className="space-y-3">
        <LoadingSkeleton width="w-12" height="h-12" rounded="lg" />
        <LoadingSkeleton height="h-6" width="w-3/4" />
        <LoadingSkeleton height="h-4" width="w-full" />
        <LoadingSkeleton height="h-4" width="w-5/6" />
        <LoadingSkeleton height="h-2" width="w-full" rounded="full" />
      </div>
    </Card>
  )
}
```

```typescript
// components/ui/VideoCardSkeleton.tsx
import { LoadingSkeleton } from '@/components/Loading'
import { Card } from '@/components/ui/Card'

export function VideoCardSkeleton() {
  return (
    <Card padding="none">
      <LoadingSkeleton height="h-48" rounded="lg" />
      <div className="p-4 space-y-2">
        <LoadingSkeleton height="h-5" width="w-3/4" />
        <LoadingSkeleton height="h-4" width="w-1/2" />
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] Spinner com 3 tamanhos
[ ] LoadingSkeleton reutilizável
[ ] JourneyCardSkeleton match com card real
[ ] VideoCardSkeleton match com card real
[ ] Animação pulse suave (1.5s)
```

**✅ VALIDAÇÃO FASE 3**
```markdown
1. Navegação completa:
   - [ ] Header sticky com blur
   - [ ] Avatar leva ao perfil
   - [ ] Toggle tema funciona
   - [ ] Breadcrumb em páginas internas

2. Transições:
   - [ ] PageTransition em todas páginas
   - [ ] Animação suave 200ms
   - [ ] Sem "pulo" no layout

3. Loading:
   - [ ] Spinner renderiza
   - [ ] Skeletons match componentes reais
   - [ ] Pulse animation visível
```

---

## **🚨 TROUBLESHOOTING**

### Erro: "Module not found: phosphor-react"
```bash
npm install phosphor-react@^2.1.7
rm -rf .next
npm run dev
```

### Erro: "cva is not a function"
```bash
npm install class-variance-authority clsx
```

### CSS não atualiza
```bash
# Limpar cache
rm -rf .next
# Reiniciar
npm run dev
# Hard refresh (Ctrl+Shift+R)
```

### Tema não persiste
- Verificar ThemeProvider no layout.tsx
- Verificar localStorage: DevTools → Application → Local Storage
- Verificar console para erros

### Fonte não aplica
- Verificar variable CSS: `--font-jakarta` existe
- Verificar className no <html>
- Hard refresh (limpar cache de fontes)

### Framer Motion não anima
```bash
# Reinstalar
npm uninstall framer-motion
npm install framer-motion@^11.0.0
rm -rf .next
npm run dev
```

---

## **FASE 4: MÓDULOS ESPECÍFICOS** (Semana 4-5)

### **Prompt 4.1 - MoodCheckIn Redesign**
```markdown
REFATORAR components/home/MoodCheckIn.tsx.

```typescript
'use client'

import { useState } from 'react'
import { useHaptic } from '@/lib/hooks/useHaptic'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

const moods = [
  { emoji: '😢', value: 1, label: 'Muito mal', color: '#FF8B94' },
  { emoji: '😕', value: 2, label: 'Mal', color: '#FFB4A2' },
  { emoji: '😐', value: 3, label: 'Neutro', color: '#E0E0E0' },
  { emoji: '🙂', value: 4, label: 'Bom', color: '#B8DFD8' },
  { emoji: '😊', value: 5, label: 'Muito bom', color: '#7DD3C0' },
]

interface MoodCheckInProps {
  onMoodSelect?: (value: number) => void
}

export function MoodCheckIn({ onMoodSelect }: MoodCheckInProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const { triggerHaptic } = useHaptic()

  const handleSelect = (value: number) => {
    setSelected(value)
    triggerHaptic('medium')
    onMoodSelect?.(value)
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        Como você está hoje?
      </h2>

      <div className="flex justify-center gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            onClick={() => handleSelect(mood.value)}
            className={clsx(
              'w-12 h-12 flex items-center justify-center text-3xl rounded-full',
              'transition-all duration-150',
              selected === mood.value && 'ring-4 ring-offset-2'
            )}
            style={{
              ringColor: selected === mood.value ? mood.color : 'transparent',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: selected === mood.value ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
            aria-label={mood.label}
          >
            <span
              className="drop-shadow-sm"
              style={{
                filter: selected === mood.value 
                  ? `drop-shadow(0 0 8px ${mood.color}40)` 
                  : 'none',
              }}
            >
              {mood.emoji}
            </span>
          </motion.button>
        ))}
      </div>

      {selected && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-text-secondary"
        >
          {moods.find((m) => m.value === selected)?.label}
        </motion.p>
      )}
    </div>
  )
}
```

**IMPORTANTE:** Usa hook existente `useHaptic` de lib/hooks/useHaptic.ts

**Checklist:**
[ ] 5 emojis renderizam (48px cada)
[ ] Hover: scale(1.1)
[ ] Selected: scale(1.2) + glow da cor
[ ] Vibração háptica funciona
[ ] Animação de confirmação
```

### **Prompt 4.2 - BreathingCircle Redesign**
```markdown
REFATORAR components/breathe/BreathingCircle.tsx.

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHaptic } from '@/lib/hooks/useHaptic'

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest'

interface BreathingCircleProps {
  pattern: {
    inhale: number
    hold: number
    exhale: number
    rest?: number
  }
  onCycleComplete?: () => void
}

const phaseColors = {
  inhale: '#7DD3C0',
  hold: '#B8DFD8',
  exhale: '#A8E6D7',
  rest: '#E8F4F8',
}

const phaseLabels = {
  inhale: 'Inspire',
  hold: 'Segure',
  exhale: 'Expire',
  rest: 'Descanse',
}

export function BreathingCircle({ pattern, onCycleComplete }: BreathingCircleProps) {
  const [phase, setPhase] = useState<Phase>('inhale')
  const [cycles, setCycles] = useState(0)
  const { triggerHaptic } = useHaptic()

  useEffect(() => {
    const phases: Phase[] = ['inhale', 'hold', 'exhale']
    if (pattern.rest) phases.push('rest')

    let currentPhaseIndex = 0
    let timer: NodeJS.Timeout

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
      const newPhase = phases[currentPhaseIndex]
      
      setPhase(newPhase)
      triggerHaptic('light')

      if (currentPhaseIndex === 0) {
        setCycles((prev) => prev + 1)
        onCycleComplete?.()
      }

      const duration = pattern[newPhase] || pattern.inhale
      timer = setTimeout(nextPhase, duration * 1000)
    }

    timer = setTimeout(nextPhase, pattern.inhale * 1000)

    return () => clearTimeout(timer)
  }, [pattern, onCycleComplete, triggerHaptic])

  const currentDuration = pattern[phase] || pattern.inhale

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-accent-aqua blur-3xl" />
      </div>

      {/* Breathing Circle */}
      <motion.div
        className="relative z-10 w-64 h-64 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${phaseColors[phase]}40, ${phaseColors[phase]}10)`,
        }}
        animate={{
          scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1,
          boxShadow: `0 0 40px ${phaseColors[phase]}60`,
        }}
        transition={{
          duration: currentDuration,
          ease: 'easeInOut',
        }}
      >
        <div className="text-center">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold text-text-primary mb-2"
          >
            {phaseLabels[phase]}
          </motion.p>
          <p className="text-sm text-text-secondary">
            {currentDuration}s
          </p>
        </div>
      </motion.div>

      {/* Cycle Counter */}
      <p className="mt-8 text-sm text-text-secondary">
        Ciclo {cycles}
      </p>
    </div>
  )
}
```

**Checklist:**
[ ] Círculo com gradiente radial
[ ] Scale de 0.8 a 1.2
[ ] Glow animado sincronizado
[ ] Vibração háptica nas transições
[ ] Contador de ciclos funciona
[ ] Mudança de cor por fase
```

### **Prompt 4.3 - VideoCard Redesign**
```markdown
REFATORAR components/calm/VideoCard.tsx.

```typescript
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { FavoriteButton } from '@/components/calm/FavoriteButton'
import { Play } from '@/lib/constants/icons'
import { Badge } from '@/components/ui/Badge'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  duration: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  isFavorite,
  onToggleFavorite,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <Card
      padding="none"
      clickable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/calm/${id}`)}
      className="overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <OptimizedImage
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay on Hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Play size={48} weight="fill" className="text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Favorite Button */}
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.()
          }}
        >
          <FavoriteButton isFavorite={isFavorite} />
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2">
          <Badge size="sm" className="bg-black/70 text-white">
            {duration}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary line-clamp-2">
          {title}
        </h3>
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] Thumbnail 16:9
[ ] Hover: glass effect + play button
[ ] Play button scale(1.1)
[ ] Botão favoritar funcional
[ ] Badge de duração visível
[ ] Lazy loading de imagem
```

### **Prompt 4.4 - JourneyCard e TopicCard**
```markdown
REFATORAR components/discover/JourneyCard.tsx e TopicCard.tsx.

**JOURNEY CARD:**
```typescript
'use client'

import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/discover/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Brain } from '@/lib/constants/icons'
import { useRouter } from 'next/navigation'
import type { ComponentType } from 'react'
import type { IconWeight } from 'phosphor-react'

interface JourneyCardProps {
  type: string
  title: string
  description: string
  icon: ComponentType<{ size?: number; weight?: IconWeight; color?: string }>
  progress: number
  totalSteps: number
  completedSteps: number
}

export function JourneyCard({
  type,
  title,
  description,
  icon,
  progress,
  totalSteps,
  completedSteps,
}: JourneyCardProps) {
  const router = useRouter()
  const isCompleted = progress === 100

  return (
    <Card
      clickable
      onClick={() => router.push(`/discover/journeys/${type}`)}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <OptimizedIcon icon={icon} size={32} weight="duotone" />
        </div>
        
        {isCompleted && (
          <Badge variant="success" size="sm">
            Completo
          </Badge>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <ProgressBar value={progress} showLabel />
        <p className="text-xs text-text-secondary">
          {completedSteps} de {totalSteps} etapas
        </p>
      </div>
    </Card>
  )
}
```

**TOPIC CARD:**
```typescript
'use client'

import { Card } from '@/components/ui/Card'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Check } from '@/lib/constants/icons'
import { useRouter } from 'next/navigation'
import type { ComponentType } from 'react'
import type { IconWeight } from 'phosphor-react'

interface TopicCardProps {
  type: string
  title: string
  preview: string
  icon: ComponentType<{ size?: number; weight?: IconWeight; color?: string }>
  hasResonated?: boolean
}

export function TopicCard({
  type,
  title,
  preview,
  icon,
  hasResonated,
}: TopicCardProps) {
  const router = useRouter()

  return (
    <Card
      clickable
      onClick={() => router.push(`/discover/topics/${type}`)}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-primary/10">
          <OptimizedIcon icon={icon} size={24} weight="duotone" />
        </div>

        {hasResonated && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Check size={16} weight="bold" />
            <span>Ressoou</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {preview}
        </p>
      </div>
    </Card>
  )
}
```

**Checklist:**
[ ] JourneyCard: ícone 32px duotone
[ ] ProgressBar estilizada
[ ] Badge "Completo" se 100%
[ ] TopicCard: ícone 24px
[ ] Indicador "Ressoou"
[ ] Hover elevation funciona
```

### **Prompt 4.5 - AchievementToast**
```markdown
REFATORAR components/gamification/AchievementToast.tsx (JÁ EXISTE).

```typescript
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from '@/lib/constants/icons'
import { Card } from '@/components/ui/Card'
import { useHaptic } from '@/lib/hooks/useHaptic'

interface AchievementToastProps {
  title: string
  description?: string
  isVisible: boolean
  onDismiss: () => void
}

export function AchievementToast({
  title,
  description,
  isVisible,
  onDismiss,
}: AchievementToastProps) {
  const { triggerHaptic } = useHaptic()

  useEffect(() => {
    if (isVisible) {
      triggerHaptic('heavy')
      const timer = setTimeout(onDismiss, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onDismiss, triggerHaptic])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-toast w-[calc(100%-32px)] max-w-sm"
        >
          <Card
            variant="glass"
            className="border-2 border-warning shadow-soft-xl"
            style={{
              boxShadow: '0 0 30px rgba(245, 180, 97, 0.4)',
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.3, 0.6, 1],
                }}
                className="flex-shrink-0"
              >
                <div className="p-3 rounded-xl bg-warning/20">
                  <Trophy size={32} weight="duotone" className="text-warning" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-text-primary mb-1">
                  {title}
                </h3>
                {description && (
                  <p className="text-sm text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**IMPORTANTE:** Este componente JÁ EXISTE, estamos apenas REFATORANDO com novo design.

**Checklist:**
[ ] Glass card com glow dourado
[ ] Ícone de troféu duotone
[ ] Animação de entrada (slide from top)
[ ] Animação de atenção (scale + rotate)
[ ] Auto-dismiss após 4s
[ ] Vibração háptica heavy
```

**✅ VALIDAÇÃO FASE 4**
```markdown
1. Módulos funcionais:
   - [ ] MoodCheckIn: seleção + vibração
   - [ ] BreathingCircle: animação sincronizada
   - [ ] VideoCard: hover glass + play
   - [ ] JourneyCard: progress bar
   - [ ] TopicCard: indicador "Ressoou"
   - [ ] AchievementToast: celebração

2. Interações:
   - [ ] Haptic feedback em ações
   - [ ] Hover states responsivos
   - [ ] Animações suaves (framer-motion)

3. Visual:
   - [ ] Cores da paleta
   - [ ] Ícones Phosphor duotone
   - [ ] Modo escuro funcional
```

---

## **FASE 5: PÁGINAS** (Semana 6)

### **Prompt 5.1 - /home Redesign**
```markdown
REFATORAR app/home/page.tsx.

```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { MoodCheckIn } from '@/components/home/MoodCheckIn'
import { Card } from '@/components/ui/Card'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { Wind, VideoCamera, Compass, User } from '@/lib/constants/icons'
import Link from 'next/link'

const modules = [
  {
    href: '/breathe',
    title: 'Respirar',
    icon: Wind,
    bgColor: 'bg-[#E8F4F8]',
  },
  {
    href: '/calm',
    title: 'Acalmar',
    icon: VideoCamera,
    bgColor: 'bg-[#FFD6BA]',
  },
  {
    href: '/discover',
    title: 'Conhecer-se',
    icon: Compass,
    bgColor: 'bg-[#B8DFD8]',
  },
  {
    href: '/profile',
    title: 'Perfil',
    icon: User,
    bgColor: 'bg-[#A8E6D7]',
  },
]

export default function HomePage() {
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto p-4 space-y-6">
        {/* Mood Check-in */}
        <Card>
          <MoodCheckIn />
        </Card>

        {/* Modules Grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card
                clickable
                className={`aspect-square flex flex-col items-center justify-center text-center space-y-3 ${module.bgColor}`}
              >
                <OptimizedIcon icon={module.icon} size={48} weight="duotone" />
                <h3 className="text-lg font-semibold text-text-primary">
                  {module.title}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
```

**Checklist:**
[ ] MoodCheckIn no topo
[ ] Grid 2x2 com cores específicas
[ ] Ícones 48px duotone
[ ] Hover states funcionam
[ ] PageTransition aplicada
```

### **Prompt 5.2 - /breathe e /breathe/session**
```markdown
REFATORAR app/breathe/page.tsx e app/breathe/session/page.tsx.

**PÁGINA PRINCIPAL (/breathe):**
```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { BreathingPatternCard } from '@/components/breathe/BreathingPatternCard'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { breathingPatterns } from '@/lib/utils/breathingPatterns'

export default function BreathePage() {
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto p-4 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Respirar' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Exercícios de Respiração
          </h1>
          <p className="text-text-secondary">
            Escolha um padrão para começar
          </p>
        </div>

        {/* Background com pétalas */}
        <div
          className="grid gap-4"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(125, 211, 192, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(184, 223, 216, 0.05) 0%, transparent 50%)
            `,
          }}
        >
          {breathingPatterns.map((pattern) => (
            <BreathingPatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
```

**PÁGINA DE SESSÃO (/breathe/session):**
```typescript
'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BreathingCircle } from '@/components/breathe/BreathingCircle'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from '@/lib/constants/icons'
import { breathingPatterns } from '@/lib/utils/breathingPatterns'

function SessionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const patternId = searchParams.get('pattern') || '478'

  const pattern = breathingPatterns.find((p) => p.id === patternId)

  if (!pattern) {
    return <div>Padrão não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-surface-main flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft size={20} />
          Sair
        </Button>
      </div>

      {/* Breathing Circle */}
      <div className="flex-1 flex items-center justify-center">
        <BreathingCircle pattern={pattern} />
      </div>
    </div>
  )
}

export default function BreathingSessionPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SessionContent />
    </Suspense>
  )
}
```

**Checklist:**
[ ] Lista de padrões com cards
[ ] Background com pétalas sutil
[ ] BreathingCircle centralizado
[ ] Botão sair (top left)
[ ] Fullscreen opcional funciona
```

### **Prompt 5.3 - /calm e /calm/[videoId]**
```markdown
REFATORAR app/calm/page.tsx e app/calm/[videoId]/page.tsx.

**PÁGINA PRINCIPAL (/calm):**
```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { CategoryTabs } from '@/components/calm/CategoryTabs'
import { VideoCard } from '@/components/calm/VideoCard'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Card } from '@/components/ui/Card'

// Dados viriam da API
const videos = [
  /* ... */
]

export default function CalmPage() {
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto p-4 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Acalmar' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Vídeos Relaxantes
          </h1>
          <p className="text-text-secondary">
            Escolha um vídeo para acalmar sua mente
          </p>
        </div>

        {/* Tabs */}
        <CategoryTabs />

        {/* Grid de Vídeos */}
        <div className="grid gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
```

**PÁGINA DO VÍDEO (/calm/[videoId]):**
```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { Button } from '@/components/ui/Button'
import { FavoriteButton } from '@/components/calm/FavoriteButton'
import { ArrowLeft } from '@/lib/constants/icons'
import Link from 'next/link'

export default function VideoPage({ params }: { params: { videoId: string } }) {
  // Buscar vídeo da API
  
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <Link href="/calm">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={20} />
              Voltar
            </Button>
          </Link>
          <FavoriteButton isFavorite={false} />
        </div>

        {/* Player 16:9 */}
        <div className="aspect-video bg-gray-100">
          {/* YouTube Player aqui */}
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Título do Vídeo
          </h1>
          <p className="text-text-secondary">
            Descrição do vídeo...
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
```

**Checklist:**
[ ] CategoryTabs redesenhadas
[ ] Grid de VideoCard
[ ] Player responsivo 16:9
[ ] Botão favoritar
[ ] Vídeos relacionados (bottom)
```

### **Prompt 5.4 - /discover (todas subpáginas)**
```markdown
REFATORAR app/discover/page.tsx e subpáginas.

Esta é uma refatoração mais simples focada em:
[ ] Aplicar PageTransition
[ ] Usar componentes redesenhados (JourneyCard, TopicCard)
[ ] Melhorar tipografia
[ ] Adicionar Breadcrumb
[ ] DailyReflectionWidget com glass card

**Exemplo - /discover/journeys/page.tsx:**
```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { JourneyCard } from '@/components/discover/JourneyCard'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { journeys } from '@/lib/utils/journeyHelpers'

export default function JourneysPage() {
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto p-4 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Descobrir', href: '/discover' },
            { label: 'Jornadas' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Jornadas de Autoconhecimento
          </h1>
          <p className="text-text-secondary">
            Explore temas importantes para sua saúde mental
          </p>
        </div>

        <div className="grid gap-4">
          {journeys.map((journey) => (
            <JourneyCard key={journey.type} {...journey} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
```

**Checklist:**
[ ] PageTransition em todas subpáginas
[ ] Breadcrumb correto
[ ] Componentes redesenhados
[ ] Tipografia hierárquica
[ ] ResonateButtons redesenhados
```

### **Prompt 5.5 - /profile (todas subpáginas)**
```markdown
REFATORAR app/profile/page.tsx e subpáginas.

**PERFIL PRINCIPAL:**
```typescript
import { PageTransition } from '@/components/transitions/PageTransition'
import { Avatar } from '@/components/ui/Avatar'
import { StatCard } from '@/components/profile/StatCard'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { ChevronRight } from '@/lib/constants/icons'

export default function ProfilePage() {
  return (
    <PageTransition>
      <div className="max-w-[428px] mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="text-center space-y-4">
          <Avatar src="/user.jpg" name="João Silva" size="xl" />
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              João Silva
            </h1>
            <p className="text-sm text-text-secondary">
              Transtorno de Ansiedade
            </p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Dias" value="45" />
          <StatCard label="Respirações" value="120" />
          <StatCard label="Conquistas" value="8" />
        </div>

        {/* Menu */}
        <Card padding="none" className="divide-y divide-border-subtle">
          <Link href="/profile/edit" className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors">
            <span className="text-text-primary">Editar Perfil</span>
            <ChevronRight size={20} className="text-text-tertiary" />
          </Link>
          {/* Mais itens... */}
        </Card>
      </div>
    </PageTransition>
  )
}
```

**Checklist:**
[ ] Avatar 96px
[ ] StatCards com números grandes
[ ] Menu de opções em lista
[ ] IntensitySlider redesenhado (crisis-log)
[ ] ToggleSwitch redesenhado (settings)
[ ] DeleteConfirmModal com design atualizado
```

### **Prompt 5.6 - /onboarding**
```markdown
REFATORAR app/onboarding/page.tsx.

Focando em:
[ ] Ilustrações/ícones maiores
[ ] Tipografia hierárquica clara
[ ] Progress indicator (dots)
[ ] Inputs espaçados
[ ] Botões fixos no bottom
[ ] Animação de transição entre steps (slide)
[ ] PhotoUpload redesenhado

**Checklist:**
[ ] Progress dots animados
[ ] Transição slide entre steps
[ ] Inputs com novo design
[ ] Botões primary/secondary
[ ] Chips selecionáveis (diagnóstico)
```

**✅ VALIDAÇÃO FASE 5**
```markdown
Testar navegação completa:

1. Todas páginas:
   - [ ] /home - Grid 2x2
   - [ ] /breathe - Cards de padrões
   - [ ] /breathe/session - Círculo animado
   - [ ] /calm - Grid de vídeos
   - [ ] /calm/[id] - Player
   - [ ] /discover - Todas subpáginas
   - [ ] /profile - Todas subpáginas
   - [ ] /onboarding - 3 steps

2. Visual consistente:
   - [ ] Mesma paleta em todas páginas
   - [ ] Tipografia hierárquica
   - [ ] Espaçamento uniforme
   - [ ] Modo escuro funciona

3. Navegação:
   - [ ] PageTransition suave
   - [ ] Breadcrumb correto
   - [ ] Botões voltar funcionam
```

---

## **FASE 6: POLISH** (Semana 7)

### **Prompt 6.1 - Ripple Effect Global**
```markdown
Implementar ripple effect reutilizável.

VERIFICAR se components/ui/RippleButton.tsx JÁ EXISTE.

Se EXISTE, refatorar para usar novo design.
Se NÃO EXISTE, criar:

```typescript
'use client'

import { useState, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  x: number
  y: number
  id: number
}

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const addRipple = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: Date.now(),
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }

  const RippleContainer = () => (
    <span className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            initial={{
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
              opacity: 0.6,
            }}
            animate={{
              width: 100,
              height: 100,
              x: ripple.x - 50,
              y: ripple.y - 50,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </span>
  )

  return { addRipple, RippleContainer }
}
```

**Aplicar em Button.tsx:**
```typescript
// Adicionar no Button component
const { addRipple, RippleContainer } = useRipple()

// No return:
<button onClick={(e) => { addRipple(e); onClick?.(e) }}>
  <RippleContainer />
  {children}
</button>
```

**Checklist:**
[ ] Hook useRipple criado
[ ] Aplicado em Button
[ ] Aplicado em cards clicáveis
[ ] Duração 600ms
[ ] Cor e tamanho corretos
```

### **Prompt 6.2 - Haptic Feedback**
```markdown
IMPORTANTE: lib/hooks/useHaptic.ts JÁ EXISTE.

Apenas USAR o hook existente nas ações:

```typescript
import { useHaptic } from '@/lib/hooks/useHaptic'

// No componente:
const { triggerHaptic } = useHaptic()

// Usar em ações:
triggerHaptic('light')   // 10ms
triggerHaptic('medium')  // 20ms
triggerHaptic('heavy')   // 30ms
```

**Adicionar vibração em:**
[ ] MoodCheckIn - seleção de mood (medium)
[ ] BreathingCircle - transições de fase (light)
[ ] AchievementToast - unlock (heavy)
[ ] FavoriteButton - toggle (light)
[ ] JourneyCard - completar etapa (medium)
[ ] Profile - salvar (light)
```

### **Prompt 6.3 - Pull to Refresh**
```markdown
REFATORAR components/ui/PullToRefresh.tsx (se existir) ou CRIAR.

```typescript
'use client'

import { useState, useRef, ReactNode } from 'react'
import { Spinner } from '@/components/Loading'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY.current

    if (distance > 0 && distance < 120) {
      setPullDistance(distance)
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance > 80) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }

    setPullDistance(0)
    startY.current = 0
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center transition-all duration-200"
        style={{
          transform: `translateY(${pullDistance - 40}px)`,
          opacity: pullDistance / 80,
        }}
      >
        {isRefreshing ? (
          <Spinner size="sm" />
        ) : (
          <p className="text-xs text-text-secondary">
            {pullDistance > 80 ? 'Solte para atualizar' : 'Puxe para atualizar'}
          </p>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? 'transform 0.2s' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
```

**Aplicar em:**
[ ] /calm - lista de vídeos
[ ] /discover/journeys
[ ] /profile/history

**Checklist:**
[ ] Indicador de pull visível
[ ] Spinner durante refresh
[ ] Animação suave
```

### **Prompt 6.4 - Empty States**
```markdown
REFATORAR components/ui/EmptyState.tsx.

```typescript
'use client'

import { Button } from '@/components/ui/Button'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import type { ComponentType } from 'react'
import type { IconWeight } from 'phosphor-react'

interface EmptyStateProps {
  icon: ComponentType<{ size?: number; weight?: IconWeight; color?: string }>
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="p-6 rounded-full bg-primary/10 mb-6">
        <OptimizedIcon icon={icon} size={64} weight="duotone" className="text-primary" />
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>

      <p className="text-sm text-text-secondary mb-6 max-w-sm">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
```

**Criar estados específicos:**
```typescript
// Sem vídeos favoritos
<EmptyState
  icon={Heart}
  title="Nenhum favorito ainda"
  description="Favorite vídeos para encontrá-los facilmente aqui"
/>

// Sem histórico de crises
<EmptyState
  icon={ClipboardText}
  title="Nenhum registro"
  description="Quando você registrar momentos de crise, eles aparecerão aqui"
  actionLabel="Registrar agora"
  onAction={() => router.push('/profile/crisis-log')}
/>
```

**Checklist:**
[ ] Ícone 64px ilustrativo
[ ] Mensagem empática
[ ] CTA opcional
[ ] Padding generoso
```

### **Prompt 6.5 - Error States**
```markdown
REFATORAR components/errors/*.

Redesenhar:
1. ErrorDisplay (erro geral)
2. NetworkError (sem conexão)
3. NotFound (404)

**Exemplo - NetworkError.tsx:**
```typescript
import { Button } from '@/components/ui/Button'
import { WifiSlash } from '@/lib/constants/icons'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'

interface NetworkErrorProps {
  onRetry?: () => void
}

export function NetworkError({ onRetry }: NetworkErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="p-6 rounded-full bg-error/10 mb-6">
        <OptimizedIcon icon={WifiSlash} size={64} weight="duotone" className="text-error" />
      </div>

      <h2 className="text-xl font-bold text-text-primary mb-2">
        Sem Conexão
      </h2>

      <p className="text-sm text-text-secondary mb-6 max-w-sm">
        Verifique sua conexão com a internet e tente novamente
      </p>

      {onRetry && (
        <Button onClick={onRetry}>
          Tentar Novamente
        </Button>
      )}
    </div>
  )
}
```

**Checklist:**
[ ] Ícones ilustrativos
[ ] Mensagens claras
[ ] Botão "Tentar novamente"
[ ] Botão "Voltar" onde aplicável
```

**✅ VALIDAÇÃO FASE 6**
```markdown
1. Microinterações:
   - [ ] Ripple em botões e cards
   - [ ] Haptic em ações importantes
   - [ ] Pull-to-refresh em listas

2. Estados especiais:
   - [ ] Empty states com ícones
   - [ ] Error states informativos
   - [ ] Loading skeletons consistentes

3. Polish visual:
   - [ ] Todas animações < 300ms
   - [ ] Feedback visual em 100% das ações
   - [ ] Sem "dead clicks" (cliques sem resposta)
```

---

## **FASE 7: QA E AJUSTES** (Semana 8)

### **Prompt 7.1 - Audit de Contraste**
```markdown
Verificar e corrigir problemas de contraste usando WebAIM Contrast Checker.

**Processo:**
1. Abrir https://webaim.org/resources/contrastchecker/
2. Testar combinações:

**Modo Claro:**
- Texto primário (#2C3E50) em background principal (#F8FAFB) - Deve ser >= 4.5:1
- Texto secundário (#64748B) em background card (#FFFFFF) - Deve ser >= 4.5:1
- Botão primário (branco) em gradiente (#7DD3C0) - Deve ser >= 3:1

**Modo Escuro:**
- Texto primário (#E8F4F8) em background principal (#1A2332) - Deve ser >= 4.5:1
- Texto secundário (#A8C5DA) em background card (#243447) - Deve ser >= 4.5:1

**Ajustes se necessário:**
```typescript
// Se contraste insuficiente, ajustar cores:
// Exemplo: texto secundário pode precisar ser mais escuro
colors: {
  light: {
    text: {
      secondary: '#576B85', // Era #64748B, escurecido para melhor contraste
    }
  }
}
```

**Checklist:**
[ ] Texto normal >= 4.5:1
[ ] Texto grande >= 3:1
[ ] Ícones >= 3:1
[ ] Borders visíveis (mínimo 3:1)
[ ] Testar em modo claro E escuro
```

### **Prompt 7.2 - Audit de Acessibilidade**
```markdown
Executar Lighthouse e corrigir issues.

**Passo 1: Executar Lighthouse**
1. Abrir DevTools (F12)
2. Tab "Lighthouse"
3. Selecionar "Accessibility"
4. Rodar audit

**Passo 2: Corrigir issues comuns**

```typescript
// ARIA labels em ícones sem texto
<button aria-label="Fechar modal">
  <X size={24} />
</button>

// Alt text em imagens
<img src="..." alt="Descrição detalhada" />

// Landmarks semânticos
<main>
  <nav aria-label="Navegação principal">...</nav>
  <article>...</article>
</main>

// Heading hierarchy
<h1>Página Principal</h1>
<h2>Seção</h2>
<h3>Subseção</h3>
// Nunca pular níveis (h1 → h3)
```

**Checklist:**
[ ] ARIA labels em ícones-only buttons
[ ] Alt text em todas imagens
[ ] Focus visible em elementos interativos
[ ] Navegação por teclado funcional (Tab, Enter, Esc)
[ ] Landmarks (<main>, <nav>, <aside>)
[ ] Heading hierarchy correta
[ ] Color contrast >= 4.5:1
[ ] Score Lighthouse >= 95
```

### **Prompt 7.3 - Performance Audit**
```markdown
Otimizar performance.

**Bundle Analysis:**
```bash
npm install -D @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... config existente
})
```

```bash
ANALYZE=true npm run build
```

**Otimizações:**

1. **Lazy load de imagens**
```typescript
// Já implementado no OptimizedImage.tsx
<OptimizedImage
  src="..."
  alt="..."
  loading="lazy"
/>
```

2. **Code splitting de framer-motion**
```typescript
// Importar dinamicamente onde não é crítico
import dynamic from 'next/dynamic'

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)
```

3. **Tree-shaking de ícones**
```typescript
// JÁ IMPLEMENTADO em lib/constants/icons.ts
// Importar apenas ícones usados
export { House, Wind, User } from 'phosphor-react'
```

4. **Preload de fontes**
```typescript
// app/layout.tsx
<link
  rel="preload"
  href="/fonts/PlusJakartaSans-Regular.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**Checklist:**
[ ] Lazy load de imagens
[ ] Code splitting de motion components
[ ] Tree-shaking de ícones
[ ] Bundle < 200KB (gzipped)
[ ] Lighthouse Performance >= 90
[ ] FCP < 1.5s
[ ] CLS < 0.1
```

### **Prompt 7.4 - Cross-Device Testing**
```markdown
Testar em diferentes dispositivos e tamanhos.

**DevTools Responsive Mode:**
1. Abrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Testar em:

**Devices:**
[ ] iPhone SE (320px width)
[ ] iPhone 12/13 (390px width)
[ ] iPhone 14 Pro Max (428px width)
[ ] iPad Mini (768px - deve limitar em 428px)

**Verificar em cada device:**
[ ] Layout não quebra
[ ] Textos legíveis (mínimo 14px)
[ ] Botões clicáveis (>= 44x44px)
[ ] Scrolling suave
[ ] Animações fluidas (60fps)
[ ] Modais centralizados
[ ] Inputs com zoom desabilitado

**Fix comum - Prevenir zoom em inputs:**
```css
/* globals.css */
input, textarea, select {
  font-size: 16px; /* Previne zoom no iOS */
}
```

**Checklist:**
[ ] Testado em 4+ viewports
[ ] Sem overflow horizontal
[ ] Touch targets >= 44px
[ ] Fontes >= 14px
[ ] Scrolling sem jank
```

### **Prompt 7.5 - Final Polish**
```markdown
Revisão final completa antes de produção.

**Checklist Visual:**
[ ] Todas cores vêm da paleta (sem #XXX hardcoded)
[ ] Espaçamentos múltiplos de 4px
[ ] Border-radius consistente (8-24px)
[ ] Sombras com tint turquesa
[ ] Animações 150-200ms
[ ] Tipografia usa Plus Jakarta Sans
[ ] Ícones são Phosphor duotone

**Checklist Funcional:**
[ ] Modo escuro 100% funcional
[ ] Theme toggle persiste
[ ] Sem console errors
[ ] Sem warnings React/Next
[ ] Navegação funciona (back/forward)
[ ] Deep links funcionam

**Checklist de Qualidade:**
[ ] Lighthouse Performance >= 90
[ ] Lighthouse Accessibility >= 95
[ ] Lighthouse Best Practices >= 90
[ ] Lighthouse SEO >= 90
[ ] Sem erros TypeScript
[ ] Build produção sem warnings

**Teste de Usuário:**
[ ] Fluxo completo funciona (onboarding → uso → perfil)
[ ] Microinterações perceptíveis
[ ] Loading states informativos
[ ] Error states claros
[ ] Empty states acolhedores
```

**✅ VALIDAÇÃO FINAL**
```markdown
Executar checklist completo:

1. Lighthouse scores:
   - [ ] Performance >= 90
   - [ ] Accessibility >= 95
   - [ ] Best Practices >= 90
   - [ ] SEO >= 90

2. Visual:
   - [ ] Consistência 100%
   - [ ] Modo escuro perfeito
   - [ ] Animações suaves

3. Funcional:
   - [ ] Todas features funcionam
   - [ ] Sem bugs conhecidos
   - [ ] Performance excelente

4. Build:
   - [ ] `npm run build` sem erros
   - [ ] `npm run start` funciona
   - [ ] Deploy test bem-sucedido
```

---

## **CHECKLIST DE VALIDAÇÃO FINAL COMPLETO**

### Fundação
- [ ] Design tokens implementados (globals.css)
- [ ] Tailwind config atualizado
- [ ] Plus Jakarta Sans instalado e aplicado
- [ ] Phosphor Icons instalado
- [ ] Theme provider funcional (light/dark/system)
- [ ] Transição de tema suave (300ms)

### Componentes Base
- [ ] Button (4 variantes: primary, secondary, ghost, danger)
- [ ] Card (3 variantes: default, glass, elevated)
- [ ] Input (label, error, helper)
- [ ] Avatar (5 tamanhos + fallback)
- [ ] Badge (4 variantes)
- [ ] ProgressBar (gradiente + glow)

### Navegação
- [ ] Header redesenhado (sticky + blur)
- [ ] Avatar clicável → /profile
- [ ] Toggle tema funcional + rotação
- [ ] Breadcrumb atualizado
- [ ] PageTransition implementada (200ms)
- [ ] Loading states (Spinner + Skeletons)

### Módulos
- [ ] MoodCheckIn (5 emojis + glow + haptic)
- [ ] BreathingCircle (animação + glow + vibração)
- [ ] VideoCard (glass hover + play button)
- [ ] JourneyCard (progress + badge)
- [ ] TopicCard (ícone + indicador)
- [ ] AchievementToast (celebração + auto-dismiss)

### Páginas
- [ ] /home (grid 2x2 + cores específicas)
- [ ] /breathe (cards + pétalas background)
- [ ] /breathe/session (círculo centralizado)
- [ ] /calm (grid vídeos + tabs)
- [ ] /calm/[id] (player + favoritar)
- [ ] /discover (todas subpáginas)
- [ ] /discover/journeys (lista + filtros)
- [ ] /discover/topics (grid 8 tópicos)
- [ ] /profile (avatar + stats + menu)
- [ ] /profile/* (todas subpáginas)
- [ ] /onboarding (3 steps + animação)

### Polish
- [ ] Ripple effects (botões + cards)
- [ ] Haptic feedback (6+ ações)
- [ ] Pull-to-refresh (3+ listas)
- [ ] Empty states (4+ contextos)
- [ ] Error states (network, 404, geral)

### Qualidade
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 95
- [ ] Lighthouse Best Practices >= 90
- [ ] Contraste WCAG AA (4.5:1)
- [ ] Modo claro 100% funcional
- [ ] Modo escuro 100% funcional
- [ ] Sem console errors
- [ ] Sem warnings TypeScript
- [ ] Bundle < 200KB gzipped
- [ ] Testado em iPhone SE, 12, 14 Pro Max
- [ ] Build produção sem erros

---

## **🎓 RECURSOS E REFERÊNCIAS**

### Documentação do Projeto
- `docs/visual/design-tokens.ts` - Tokens completos
- `docs/visual/identidade-visual.md` - Guia de estilo
- `docs/visual/planovisual.md` - Plano estratégico

### Ferramentas
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar contraste
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit completo
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Análise de bundle

### Bibliotecas
- [Phosphor Icons](https://phosphoricons.com/) - Buscar ícones
- [Framer Motion](https://www.framer.com/motion/) - Docs de animação
- [CVA](https://cva.style/docs) - Class Variance Authority
- [Tailwind CSS](https://tailwindcss.com/docs) - Documentação

---

**Esta versão v2 corrige os problemas de especificidade e integração com código existente. Use esta em vez da v1.**

**Versão:** 2.0 COMPLETA  
**Data:** 21 de Outubro de 2025  
**Total de Prompts:** 40+ (distribuídos em 7 fases + setup)  
**Estimativa de Tempo:** 8 semanas de implementação

