'use client'

import { useTheme } from '@/lib/design/theme'
import { Avatar } from '@/components/ui/Avatar'
import { useUser } from '@/lib/hooks/useUser'
import { Sun, Moon } from '@/lib/constants/icons'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
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
    <header className="sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-[428px] mx-auto flex h-16 items-center justify-between border-b border-border-subtle bg-[var(--surface-main)]/80 backdrop-blur-md px-4">
        {/* Avatar */}
        <button
          onClick={() => router.push('/profile')}
          className="transition-transform duration-150 hover:scale-105 active:scale-95"
          aria-label="Ir para perfil"
        >
          <Avatar
            src={user?.profilePicture || undefined}
            name={user?.firstName || 'Usuário'}
            size="sm"
          />
        </button>

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
              <OptimizedIcon icon={Moon} size={24} className="text-primary" />
            ) : (
              <OptimizedIcon icon={Sun} size={24} className="text-primary" />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  )
}
