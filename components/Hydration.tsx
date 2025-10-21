'use client';

import { useEffect, useState } from 'react';

/**
 * Hydration Component
 * Rehydrates Zustand stores on the client side to prevent SSR hydration issues
 */
export function Hydration() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marca que está no cliente
    setIsClient(true);

    // Importação dinâmica para evitar SSR issues
    import('@/lib/store/userStore').then(({ useUserStore }) => {
      // Rehydrate userStore from localStorage
      useUserStore.persist.rehydrate();
    });
  }, []);

  // Não renderiza nada durante SSR
  if (!isClient) return null;

  return null;
}
