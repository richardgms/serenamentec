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

/**
 * ThemeProvider Component
 * Gerencia tema claro/escuro com suporte a SSR
 * Inclui proteções robustas contra erros de SSR
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Detecta se está no cliente (previne SSR issues)
  const [isClient, setIsClient] = useState(false)
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  // Marca que está no cliente
  useEffect(() => {
    setIsClient(true)
    console.log('[ThemeProvider] Client-side initialized')
  }, [])

  // Ler preferência salva do localStorage (só no cliente)
  useEffect(() => {
    if (!isClient) return

    try {
      const saved = localStorage.getItem('theme') as Theme | null
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
        setTheme(saved)
        console.log('[ThemeProvider] Loaded saved theme:', saved)
      } else {
        console.log('[ThemeProvider] No saved theme found, using system')
      }
    } catch (error) {
      console.error('[ThemeProvider] Error reading theme from localStorage:', error)
    }
  }, [isClient])

  // Resolver tema baseado em system preference (só no cliente)
  useEffect(() => {
    if (!isClient) return

    const updateResolvedTheme = () => {
      try {
        if (theme === 'system') {
          // Verifica se window.matchMedia está disponível
          if (typeof window !== 'undefined' && window.matchMedia) {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setResolvedTheme(isDark ? 'dark' : 'light')
            console.log('[ThemeProvider] System theme detected:', isDark ? 'dark' : 'light')
          } else {
            setResolvedTheme('light')
            console.log('[ThemeProvider] matchMedia not available, defaulting to light')
          }
        } else {
          setResolvedTheme(theme as ResolvedTheme)
          console.log('[ThemeProvider] Using explicit theme:', theme)
        }
      } catch (error) {
        console.error('[ThemeProvider] Error resolving theme:', error)
        setResolvedTheme('light')
      }
    }

    updateResolvedTheme()

    // Listener para mudanças no sistema
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', updateResolvedTheme)

        return () => {
          try {
            mediaQuery.removeEventListener('change', updateResolvedTheme)
          } catch (error) {
            console.error('[ThemeProvider] Error removing listener:', error)
          }
        }
      }
    } catch (error) {
      console.error('[ThemeProvider] Error setting up media query listener:', error)
    }
  }, [theme, isClient])

  // Aplicar tema no HTML e salvar preferência (só no cliente)
  useEffect(() => {
    if (!isClient) return

    try {
      // Aplicar tema no HTML
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', resolvedTheme)
        console.log('[ThemeProvider] Applied theme to document:', resolvedTheme)
      }

      // Salvar preferência
      if (theme !== 'system') {
        localStorage.setItem('theme', theme)
        console.log('[ThemeProvider] Saved theme to localStorage:', theme)
      } else {
        // Remove preferência se for system
        localStorage.removeItem('theme')
        console.log('[ThemeProvider] Removed saved theme (using system)')
      }
    } catch (error) {
      console.error('[ThemeProvider] Error applying/saving theme:', error)
    }
  }, [resolvedTheme, theme, isClient])

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
