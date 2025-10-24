'use client';

/**
 * PWA Install Prompt Component
 * Prompt para instalar o app como PWA
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { X, DownloadSimple } from '@/lib/constants/icons';
import { Button } from '@/components/ui/Button';
import { useHaptic } from '@/lib/hooks/useHaptic';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { success, selection } = useHaptic();

  useEffect(() => {
    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Verifica se já foi recusado antes
    const wasDeclined = localStorage.getItem('pwa-install-declined');
    if (wasDeclined) {
      const declinedDate = new Date(wasDeclined);
      const daysSinceDecline = Math.floor(
        (Date.now() - declinedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Só mostra novamente após 7 dias
      if (daysSinceDecline < 7) {
        return;
      }
    }

    // Listener para o evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Aguarda 3 segundos antes de mostrar o prompt
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    selection();

    try {
      // Mostra o prompt nativo
      await deferredPrompt.prompt();

      // Aguarda escolha do usuário
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        success();
        console.log('PWA instalado com sucesso');
      } else {
        console.log('Instalação recusada');
        localStorage.setItem('pwa-install-declined', new Date().toISOString());
      }

      // Limpa o prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    }
  };

  const handleDismiss = () => {
    selection();
    setShowPrompt(false);
    localStorage.setItem('pwa-install-declined', new Date().toISOString());
  };

  // Não mostra nada se já estiver instalado
  if (isInstalled || !showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-bottom"
        >
          <div className="mx-auto max-w-mobile">
            <div className="relative rounded-2xl bg-white p-5 shadow-2xl border-2 border-primary/20">
              {/* Botão fechar */}
              <button
                onClick={handleDismiss}
                className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fechar"
              >
                <OptimizedIcon icon={X} size={20} weight="bold" className="text-text-tertiary" />
              </button>

              {/* Conteúdo */}
              <div className="flex items-start gap-4">
                {/* Ícone */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <OptimizedIcon icon={DownloadSimple} size={24} weight="bold" className="text-white" />
                </div>

                {/* Texto */}
                <div className="flex-1 pr-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    Instalar Serenamente
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Acesse mais rápido e use offline. Instale nosso app na sua
                    tela inicial!
                  </p>

                  {/* Benefícios */}
                  <ul className="text-xs text-text-tertiary space-y-1 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Funciona offline
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Acesso mais rápido
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Notificações personalizadas
                    </li>
                  </ul>

                  {/* Botões */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleInstall}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      Instalar Agora
                    </Button>
                    <Button
                      onClick={handleDismiss}
                      variant="ghost"
                      size="sm"
                      className="px-4"
                    >
                      Agora não
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook para detectar se app está instalado
 */
export function useIsPWAInstalled() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      // Verifica display mode standalone
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }

      // Verifica navigator standalone (iOS)
      if ((navigator as any).standalone) {
        return true;
      }

      // Verifica se foi adicionado à home screen
      if (document.referrer.includes('android-app://')) {
        return true;
      }

      return false;
    };

    setIsInstalled(checkInstalled());
  }, []);

  return isInstalled;
}

/**
 * Hook para obter informações de instalação do PWA
 */
export function usePWAInfo() {
  const isInstalled = useIsPWAInstalled();
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = () => setCanInstall(true);
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  return {
    isInstalled,
    canInstall,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  };
}
