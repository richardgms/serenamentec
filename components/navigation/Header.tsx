'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { useUIStore } from '@/lib/store/uiStore';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const { pageTitle, showBackButton } = useUIStore();

  const displayTitle = title || pageTitle;
  const displayBackButton = showBack || showBackButton;

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="mobile-container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back button or Logo */}
          <div className="flex items-center gap-3">
            {displayBackButton && (
              <button
                onClick={handleBack}
                className="tap-highlight-none touch-feedback rounded-lg p-2 hover:bg-gray-100 transition-smooth"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {displayTitle && (
              <h1 className="text-lg font-semibold text-gray-800">
                {displayTitle}
              </h1>
            )}
          </div>

          {/* Right: User avatar */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/10 border-2 border-primary">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-primary font-semibold text-sm">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
