'use client';

import { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Loader2 } from 'lucide-react';
import { useHaptic } from '@/lib/hooks/useHaptic';
import { buttonTapVariants } from '@/lib/animations/variants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  enableHaptic?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  enableHaptic = true,
  className = '',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  const { selection } = useHaptic();

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 tap-highlight-none focus-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-md',
    secondary:
      'bg-secondary text-gray-800 hover:bg-secondary/90 active:bg-secondary/80 shadow-sm hover:shadow-md',
    outline:
      'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
    ghost:
      'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

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
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
      whileTap={!isDisabled ? buttonTapVariants.tap : undefined}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      )}

      {/* Left icon */}
      {!loading && LeftIcon && (
        <LeftIcon className={iconSizes[size]} />
      )}

      {/* Content */}
      <span className={loading ? 'opacity-70' : ''}>
        {loading && loadingText ? loadingText : children}
      </span>

      {/* Right icon */}
      {!loading && RightIcon && (
        <RightIcon className={iconSizes[size]} />
      )}
    </motion.button>
  );
}
