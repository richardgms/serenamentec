import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Cores de texto dinâmicas (mudam com o tema)
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
        },
        // Removidas as cores fixas background e surface
        // Usar CSS variables: var(--surface-main) e var(--surface-card)
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
      keyframes: {
        slideUpFade: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDownFade: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'slide-up': 'slideUpFade 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDownFade 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'ripple': 'ripple 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      scale: {
        '98': '0.98',
      },
      maxWidth: {
        mobile: '428px',
      },
    },
  },
  plugins: [],
};

export default config;
