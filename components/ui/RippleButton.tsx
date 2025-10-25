/**
 * Ripple Button Component
 * Botão com efeito ripple (Material Design) e haptic feedback
 * Otimizado com CSS puro para máxima performance
 */

'use client';

import { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react';
import { useHaptic } from '@/lib/hooks/useHaptic';

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  enableHaptic?: boolean;
  rippleColor?: string;
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
  const { selection } = useHaptic();

  const baseStyles =
    'relative overflow-hidden rounded-lg font-semibold transition-all duration-200 tap-highlight-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2',
    secondary: 'bg-secondary text-text-primary hover:bg-secondary/90 active:bg-secondary/80 focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2',
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

    const button = e.currentTarget;
    
    // Limit concurrent ripples to 3 for performance
    const existingRipples = button.querySelectorAll('.ripple-effect');
    if (existingRipples.length >= 3) {
      existingRipples[0].remove();
    }
    
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate ripple size to cover entire button
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${rippleColor || defaultRippleColors[variant]};
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0) translateZ(0);
      opacity: 0.7;
      will-change: transform, opacity;
      animation: ripple 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;
    
    // Add to button
    button.appendChild(ripple);

    // Remove after animation
    const timeout = setTimeout(() => {
      ripple.remove();
    }, 650);
    
    // Store timeout so it can be cleared if needed
    ripple.setAttribute('data-timeout', String(timeout));

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
    </button>
  );
}
