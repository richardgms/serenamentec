/**
 * 🎨 SERENAMENTE - DESIGN TOKENS
 * Sistema Calm Organic Design
 * 
 * Baseado na identidade visual da mandala/flor de lótus
 * com cérebro estilizado - união entre mente e natureza
 */

// ============================================================================
// CORES - PALETA ORGÂNICA
// ============================================================================

export const colors = {
  // Primárias - Baseadas na Logo
  primary: {
    main: '#7DD3C0',        // Turquesa principal (mandala)
    light: '#A8E6D7',       // Variação clara
    dark: '#5FB8A8',        // Variação escura
    50: '#E8F9F6',          // Muito claro (backgrounds)
    100: '#C4F0E8',
    200: '#A8E6D7',
    300: '#7DD3C0',         // Base
    400: '#5FB8A8',
    500: '#4AA393',
    600: '#3A8A7D',
    700: '#2D6E64',
    800: '#1F4D47',
    900: '#143530',
  },

  // Secundárias - Complementares Orgânicas
  accent: {
    aqua: '#B8DFD8',        // Verde-água pastel
    warm: '#FFD6BA',        // Pêssego suave (acolhimento)
    calm: '#E8F4F8',        // Azul céu muito claro
    sage: '#C8D5B9',        // Verde sálvia (natureza)
  },

  // Estados Emocionais (Mood Tracking)
  mood: {
    veryBad: '#FF8B94',     // Rosa coral suave
    bad: '#FFB4A2',         // Salmão claro
    neutral: '#E0E0E0',     // Cinza neutro
    good: '#B8DFD8',        // Aqua (secundária)
    veryGood: '#7DD3C0',    // Primária
  },

  // Modo Claro
  light: {
    surface: {
      main: '#F8FAFB',      // Fundo principal
      card: '#FFFFFF',      // Cards elevados
      overlay: 'rgba(255, 255, 255, 0.95)', // Modais
      glass: 'rgba(255, 255, 255, 0.7)',    // Glassmorphism
    },
    text: {
      primary: '#2C3E50',   // Texto principal (azul escuro morno)
      secondary: '#64748B', // Texto secundário
      tertiary: '#94A3B8',  // Texto desabilitado
      inverse: '#FFFFFF',   // Texto em fundos escuros
    },
    border: {
      subtle: 'rgba(125, 211, 192, 0.1)',
      light: 'rgba(125, 211, 192, 0.2)',
      medium: 'rgba(125, 211, 192, 0.3)',
      strong: '#7DD3C0',
    },
  },

  // Modo Escuro Morno
  dark: {
    surface: {
      main: '#1A2332',      // Fundo principal (azul escuro morno)
      card: '#243447',      // Cards elevados
      elevated: '#2D4258',  // Elementos elevados
      overlay: 'rgba(26, 35, 50, 0.95)',
      glass: 'rgba(36, 52, 71, 0.7)',
    },
    text: {
      primary: '#E8F4F8',   // Texto principal
      secondary: '#A8C5DA', // Texto secundário
      tertiary: '#7A99B4',  // Texto desabilitado
      inverse: '#2C3E50',   // Texto em fundos claros
    },
    border: {
      subtle: 'rgba(125, 211, 192, 0.15)',
      light: 'rgba(125, 211, 192, 0.25)',
      medium: 'rgba(125, 211, 192, 0.35)',
      strong: '#7DD3C0',
    },
  },

  // Estados de Sistema
  system: {
    success: '#6BCF7F',
    warning: '#F5B461',
    error: '#FF8B94',
    info: '#7DD3C0',
  },
} as const;

// ============================================================================
// TIPOGRAFIA
// ============================================================================

export const typography = {
  // Família
  fontFamily: {
    base: "'Plus Jakarta Sans', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  // Tamanhos - Mobile-first (escala 1.25 - Major Third)
  fontSize: {
    xs: '0.75rem',      // 12px - labels pequenas
    sm: '0.875rem',     // 14px - body small
    base: '1rem',       // 16px - body padrão
    lg: '1.125rem',     // 18px - lead text
    xl: '1.25rem',      // 20px - h4
    '2xl': '1.563rem',  // 25px - h3
    '3xl': '1.953rem',  // 31px - h2
    '4xl': '2.441rem',  // 39px - h1
    '5xl': '3.052rem',  // 49px - display
  },

  // Pesos
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Altura de linha
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },

  // Espaçamento de letras
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
} as const;

// ============================================================================
// ESPAÇAMENTO - Sistema 4px Base
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// ============================================================================
// RAIOS DE BORDA - Orgânicos
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '8px',      // Botões pequenos, chips
  md: '12px',     // Botões, inputs
  lg: '16px',     // Cards
  xl: '24px',     // Modals, bottom sheets
  '2xl': '32px',  // Elementos hero
  '3xl': '40px',  // Containers especiais
  full: '9999px', // Pills, avatars
} as const;

// ============================================================================
// SOMBRAS - Multicamadas com tint turquesa
// ============================================================================

export const shadows = {
  // Modo Claro
  light: {
    none: 'none',
    sm: `
      0 1px 2px rgba(125, 211, 192, 0.05),
      0 2px 4px rgba(44, 62, 80, 0.03)
    `,
    md: `
      0 1px 2px rgba(125, 211, 192, 0.05),
      0 4px 8px rgba(125, 211, 192, 0.08),
      0 12px 24px rgba(44, 62, 80, 0.04)
    `,
    lg: `
      0 2px 4px rgba(125, 211, 192, 0.08),
      0 8px 16px rgba(125, 211, 192, 0.12),
      0 16px 32px rgba(44, 62, 80, 0.06)
    `,
    xl: `
      0 4px 8px rgba(125, 211, 192, 0.1),
      0 16px 32px rgba(125, 211, 192, 0.15),
      0 24px 48px rgba(44, 62, 80, 0.08)
    `,
    // Sombra interna para neumorphism
    inner: `
      inset 0 2px 4px rgba(125, 211, 192, 0.1),
      inset 0 -2px 4px rgba(255, 255, 255, 0.5)
    `,
  },

  // Modo Escuro
  dark: {
    none: 'none',
    sm: `
      0 1px 2px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(125, 211, 192, 0.05)
    `,
    md: `
      0 2px 4px rgba(0, 0, 0, 0.25),
      0 8px 16px rgba(0, 0, 0, 0.15),
      0 4px 8px rgba(125, 211, 192, 0.08)
    `,
    lg: `
      0 4px 8px rgba(0, 0, 0, 0.3),
      0 16px 32px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(125, 211, 192, 0.1)
    `,
    xl: `
      0 8px 16px rgba(0, 0, 0, 0.35),
      0 24px 48px rgba(0, 0, 0, 0.25),
      0 12px 24px rgba(125, 211, 192, 0.12)
    `,
    inner: `
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 -2px 4px rgba(125, 211, 192, 0.1)
    `,
  },

  // Sombras especiais
  glow: {
    primary: '0 0 20px rgba(125, 211, 192, 0.4)',
    success: '0 0 20px rgba(107, 207, 127, 0.4)',
    warm: '0 0 20px rgba(255, 214, 186, 0.4)',
  },
} as const;

// ============================================================================
// ANIMAÇÕES - Motion Design
// ============================================================================

export const animation = {
  // Durações
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '600ms',
  },

  // Curvas de animação orgânicas
  easing: {
    // Saída suave (padrão)
    outSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Exponencial (movimento dramático)
    outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // Spring (bounce sutil)
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    // Entrada suave
    inSmooth: 'cubic-bezier(0.4, 0, 1, 1)',
    // Entrada e saída
    inOutSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframes pré-definidos
  keyframes: {
    slideUpFade: {
      from: { opacity: 0, transform: 'translateY(12px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    slideDownFade: {
      from: { opacity: 0, transform: 'translateY(-12px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    breathe: {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
    },
    ripple: {
      '0%': { transform: 'scale(0)', opacity: 0.6 },
      '100%': { transform: 'scale(2)', opacity: 0 },
    },
  },
} as const;

// ============================================================================
// ICONOGRAFIA
// ============================================================================

export const iconography = {
  // Tamanhos
  size: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
  },

  // Espessura de traço (para ícones outline)
  strokeWidth: {
    thin: 1,
    regular: 1.5,
    bold: 2,
  },
} as const;

// ============================================================================
// ELEVAÇÃO - Níveis Z-index
// ============================================================================

export const elevation = {
  base: 0,
  card: 1,
  cardHover: 2,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  toast: 40,
  tooltip: 50,
} as const;

// ============================================================================
// BREAKPOINTS - Mobile-first
// ============================================================================

export const breakpoints = {
  xs: '320px',    // iPhone SE
  sm: '375px',    // iPhone padrão
  md: '428px',    // iPhone Pro Max (limite do app)
  lg: '768px',    // Tablet (não usado, mas definido)
  xl: '1024px',   // Desktop (não usado)
} as const;

// ============================================================================
// BLUR - Para Glassmorphism
// ============================================================================

export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '20px',
  '2xl': '40px',
} as const;

// ============================================================================
// PADRÕES DECORATIVOS
// ============================================================================

export const patterns = {
  // Padrão sutil de pétalas para backgrounds
  petalPattern: `
    radial-gradient(circle at 20% 80%, rgba(125, 211, 192, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(184, 223, 216, 0.05) 0%, transparent 50%)
  `,
  
  // Gradientes suaves
  gradients: {
    primary: 'linear-gradient(135deg, #7DD3C0 0%, #5FB8A8 100%)',
    warm: 'linear-gradient(135deg, #FFD6BA 0%, #FFB4A2 100%)',
    calm: 'linear-gradient(135deg, #E8F4F8 0%, #B8DFD8 100%)',
    radialPrimary: 'radial-gradient(circle, #A8E6D7 0%, #7DD3C0 100%)',
  },
} as const;

// ============================================================================
// COMPONENTES - Valores específicos
// ============================================================================

export const components = {
  // Botões
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '8px 16px',
      md: '12px 24px',
      lg: '16px 32px',
    },
  },

  // Inputs
  input: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    padding: '12px 16px',
  },

  // Cards
  card: {
    padding: {
      sm: '16px',
      md: '24px',
      lg: '32px',
    },
  },

  // Avatar
  avatar: {
    size: {
      xs: '24px',
      sm: '32px',
      md: '40px',
      lg: '64px',
      xl: '96px',
    },
  },

  // Progress bars
  progress: {
    height: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  },

  // Container principal
  container: {
    maxWidth: '428px',
    padding: '16px',
  },
} as const;

// ============================================================================
// EXPORT COMPLETO
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  iconography,
  elevation,
  breakpoints,
  blur,
  patterns,
  components,
} as const;

export default designTokens;

// ============================================================================
// TIPOS TYPESCRIPT
// ============================================================================

export type DesignTokens = typeof designTokens;
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof borderRadius;


