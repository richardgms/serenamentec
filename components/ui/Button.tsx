'use client'

import { forwardRef, ButtonHTMLAttributes, MouseEvent, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-98',
        secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:scale-98',
        outline: 'border-2 border-primary text-primary bg-white dark:bg-[var(--surface-card)] hover:bg-primary hover:text-white active:scale-98',
        ghost: 'text-text-secondary hover:bg-primary/5 active:scale-98',
        danger: 'bg-error text-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-98',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  fullWidth?: boolean
  enableRipple?: boolean
  enableHaptic?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    isLoading,
    fullWidth,
    children,
    disabled,
    enableRipple = true,
    enableHaptic = true,
    onClick,
    ...props
  }, ref) => {
    const createRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      
      // Limit concurrent ripples for performance
      const existingRipples = button.querySelectorAll('.button-ripple')
      if (existingRipples.length >= 3) {
        existingRipples[0].remove()
      }
      
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2.5
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Create ripple element
      const ripple = document.createElement('span')
      ripple.className = 'button-ripple'
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
        pointer-events: none;
      `
      
      button.appendChild(ripple)
      
      // Start animation on next frame for smooth performance
      requestAnimationFrame(() => {
        ripple.style.animation = 'ripple 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
      })

      // Remove after animation
      setTimeout(() => {
        ripple.remove()
      }, 550)
    }, [])

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      // Haptic feedback
      if (enableHaptic && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10) // 10ms vibration
      }

      // Ripple effect
      if (enableRipple && !disabled && !isLoading) {
        createRipple(event)
      }

      // Call original onClick
      onClick?.(event)
    }, [enableHaptic, enableRipple, disabled, isLoading, createRipple, onClick])

    return (
      <button
        className={clsx(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          'relative overflow-hidden',
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {/* Button content */}
        <span className="relative z-10">
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="force-animation animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Carregando...
            </span>
          ) : (
            children
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
