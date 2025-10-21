'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-6">
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
            <Heart className="h-16 w-16 text-primary fill-primary" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-secondary" />
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
          className="mb-8 text-lg text-gray-600"
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
          className="mt-8 text-sm text-gray-500"
        >
          Feito com 💚 para pessoas neurodivergentes
        </motion.p>
      </motion.div>
    </div>
  );
}
