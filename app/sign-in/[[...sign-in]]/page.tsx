'use client';

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function SignInPage() {
  return (
    <div className="mobile-container flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 transition-all',
              card: 'shadow-lg',
              footerActionLink: 'text-primary hover:text-primary/80',
            },
          }}
          fallbackRedirectUrl="/home"
        />
      </motion.div>
    </div>
  );
}
