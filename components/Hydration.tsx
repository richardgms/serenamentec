'use client';

import { useEffect, useState } from 'react';

/**
 * Hydration Component
 * Rehydrates Zustand stores on the client side to prevent SSR hydration issues
 * Includes robust error handling and data validation
 */
export function Hydration() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marca que está no cliente
    setIsClient(true);

    // Função para validar e limpar localStorage se necessário
    const validateAndCleanStorage = () => {
      try {
        const storedData = localStorage.getItem('user-storage');

        if (!storedData) {
          console.log('[Hydration] No stored data found');
          return true; // Sem dados é válido
        }

        // Tenta parsear os dados
        const parsed = JSON.parse(storedData);

        // Valida estrutura básica
        if (parsed && typeof parsed === 'object') {
          console.log('[Hydration] Storage data validated successfully');
          return true;
        }

        // Dados inválidos - limpar
        console.warn('[Hydration] Invalid storage data detected, cleaning...');
        localStorage.removeItem('user-storage');
        return false;

      } catch (error) {
        // Erro ao parsear - dados corrompidos
        console.error('[Hydration] Corrupted storage data detected:', error);
        console.log('[Hydration] Cleaning corrupted data...');

        try {
          localStorage.removeItem('user-storage');
        } catch (cleanError) {
          console.error('[Hydration] Failed to clean storage:', cleanError);
        }

        return false;
      }
    };

    // Importação dinâmica com tratamento robusto de erros
    import('@/lib/store/userStore')
      .then(({ useUserStore }) => {
        try {
          // Valida dados antes de rehidratar
          const isValid = validateAndCleanStorage();

          if (!isValid) {
            console.log('[Hydration] Skipping rehydration due to invalid data');
            return;
          }

          // Rehydrate userStore from localStorage
          console.log('[Hydration] Starting rehydration...');
          useUserStore.persist.rehydrate();
          console.log('[Hydration] Rehydration completed successfully');

        } catch (rehydrateError) {
          console.error('[Hydration] Error during rehydration:', rehydrateError);

          // Em caso de erro, limpa o storage e tenta novamente
          try {
            localStorage.removeItem('user-storage');
            console.log('[Hydration] Storage cleaned after rehydration error');
          } catch (cleanError) {
            console.error('[Hydration] Failed to clean storage after error:', cleanError);
          }
        }
      })
      .catch((importError) => {
        console.error('[Hydration] Failed to import userStore:', importError);
        // Falha silenciosa - não quebra a aplicação
      });
  }, []);

  // Não renderiza nada durante SSR
  if (!isClient) return null;

  return null;
}
