'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Heart, Sparkle } from '@/lib/constants/icons';

export default function WelcomePage() {
  return (
    <main className="mobile-container flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <OptimizedIcon icon={Heart} size={64} weight="fill" className="text-primary" />
            <OptimizedIcon icon={Sparkle} size={24} weight="duotone" className="absolute -top-2 -right-2 text-secondary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-4xl font-bold text-primary"
        >
          Serenamente
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-lg text-text-secondary"
        >
          Seu espaço de acolhimento e autoconhecimento
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <Link
            href="/sign-in"
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-smooth tap-highlight-none touch-feedback hover:bg-primary/90"
          >
            Entrar
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary transition-smooth tap-highlight-none touch-feedback hover:bg-primary/5"
          >
            Criar Conta
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-text-tertiary"
        >
          Feito com 💚 para pessoas neurodivergentes
        </motion.p>
      </motion.div>
    </main>
  );
}
