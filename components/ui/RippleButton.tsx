/**
 * Ripple Button Component
 * Botão com efeito ripple (Material Design) e haptic feedback
 */

'use client';

import { ReactNode, ButtonHTMLAttributes, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rippleVariants } from '@/lib/animations/variants';
import { useHaptic } from '@/lib/hooks/useHaptic';

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  enableHaptic?: boolean;
  rippleColor?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  enableHaptic = true,
  rippleColor,
  className = '',
  disabled = false,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { selection } = useHaptic();

  const baseStyles =
    'relative overflow-hidden rounded-lg font-semibold transition-all duration-200 tap-highlight-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2',
    secondary: 'bg-secondary text-gray-800 hover:bg-secondary/90 active:bg-secondary/80 focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/20 focus:ring-2 focus:ring-primary/30',
    ghost: 'text-primary hover:bg-primary/10 active:bg-primary/20 focus:ring-2 focus:ring-primary/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  };

  const defaultRippleColors = {
    primary: 'rgba(255, 255, 255, 0.4)',
    secondary: 'rgba(0, 0, 0, 0.1)',
    outline: 'rgba(132, 194, 190, 0.2)',
    ghost: 'rgba(132, 194, 190, 0.2)',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Haptic feedback
    if (enableHaptic) {
      selection();
    }

    // Call onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              backgroundColor: rippleColor || defaultRippleColors[variant],
            }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
