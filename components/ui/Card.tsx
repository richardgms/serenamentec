'use client'

import { HTMLAttributes, forwardRef, type KeyboardEvent } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const cardVariants = cva(
  'rounded-2xl overflow-hidden transition-all duration-200 ease-in-out focus-visible:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface-card)] border border-border-subtle shadow-soft-md',
        glass: 'glass-effect shadow-soft-lg',
        elevated: 'bg-[var(--surface-card)] shadow-soft-xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      clickable: {
        true: 'cursor-pointer hover:-translate-y-1 hover:shadow-soft-lg active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[rgba(125,211,192,0.6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-card)]',
        false: '',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-soft-lg',
        scale: 'hover:scale-[1.02]',
        glow: 'hover:shadow-[0_0_20px_rgba(125,211,192,0.3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      clickable: false,
      hover: 'none',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      clickable,
      hover,
      onClick,
      onKeyDown,
      tabIndex,
      role,
      ...props
    },
    ref
  ) => {
    const resolvedTabIndex = clickable ? tabIndex ?? 0 : tabIndex
    const resolvedRole = clickable ? role ?? 'button' : role

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)

      if (event.defaultPrevented) return

      if (
        clickable &&
        onClick &&
        (event.key === 'Enter' || event.key === ' ') &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault()
        onClick(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>)
      }
    }

    return (
      <div
        ref={ref}
        className={clsx(cardVariants({ variant, padding, clickable, hover }), className)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={resolvedTabIndex}
        role={resolvedRole}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card, cardVariants }
