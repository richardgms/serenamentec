'use client'

import { forwardRef, ButtonHTMLAttributes, MouseEvent, useState, useCallback } from 'react'
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

interface Ripple {
  x: number
  y: number
  size: number
  id: number
}

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
    const [ripples, setRipples] = useState<Ripple[]>([])

    const createRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple: Ripple = {
        x,
        y,
        size,
        id: Date.now(),
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
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

        {/* Ripple effects */}
        {enableRipple && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
