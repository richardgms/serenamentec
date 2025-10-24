/**
 * Global Error Page
 * Captura erros não tratados em todo o app
 */

'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/errors/ErrorDisplay';
import { handleError, logError } from '@/lib/utils/errorHandler';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error
    const appError = handleError(error);
    logError(appError, 'Global Error Page');
  }, [error]);

  const appError = handleError(error);

  return (
    <main className="mobile-container min-h-screen flex items-center justify-center bg-[var(--surface-main)]">
      <ErrorDisplay
        type={appError.type}
        message={appError.message}
        onRetry={reset}
        onGoHome={() => (window.location.href = '/home')}
        showHomeButton={!appError.retry}
      />
    </main>
  );
}
