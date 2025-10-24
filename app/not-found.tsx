/**
 * Global Not Found Page (404)
 */

import { NotFound as NotFoundComponent } from '@/components/errors/NotFound';

export default function NotFound() {
  return (
    <main className="mobile-container min-h-screen flex items-center justify-center bg-[var(--surface-main)]">
      <NotFoundComponent />
    </main>
  );
}
