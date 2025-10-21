'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store/uiStore';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, toastType, hideToast } = useUIStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  if (!toastMessage || !toastType) return null;

  const Icon = icons[toastType];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] mobile-container px-4"
      >
        <div
          className={`
            ${colors[toastType]} text-white
            rounded-lg shadow-lg px-4 py-3
            flex items-center gap-3
            max-w-md
          `}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <p className="flex-1 text-sm font-medium">{toastMessage}</p>
          <button
            onClick={hideToast}
            className="tap-highlight-none p-1 hover:bg-white/20 rounded transition-smooth"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
