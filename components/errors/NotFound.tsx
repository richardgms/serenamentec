/**
 * Not Found Component
 * Componente para erro 404
 */

'use client';

import { motion } from 'framer-motion';
import { Search, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { emptyStateVariants, floatingAnimation } from '@/lib/animations/variants';

export interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function NotFound({
  title = 'Página Não Encontrada',
  message = 'Não conseguimos encontrar o que você está procurando. Ela pode ter sido movida ou não existe mais.',
  showHomeButton = true,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-[60vh]"
    >
      {/* Floating 404 */}
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        className="mb-6"
      >
        <div className="relative">
          <div className="text-8xl font-bold text-gray-200">404</div>
          <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-gray-400" />
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>

      {/* Message */}
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{message}</p>

      {/* Actions */}
      {showHomeButton && (
        <div className="flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            Voltar
          </Button>
          <Button
            onClick={() => router.push('/home')}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Ir para Início
          </Button>
        </div>
      )}

      {/* Illustration text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          🧭 Parece que você se perdeu por aqui
        </p>
      </div>
    </motion.div>
  );
}
