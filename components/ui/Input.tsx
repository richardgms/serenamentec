'use client'

import { forwardRef, InputHTMLAttributes, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const inputVariants = cva(
  'w-full rounded-xl border-2 transition-all duration-150 bg-[var(--surface-card)] text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary',
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg',
      },
      error: {
        true: 'border-error focus-visible:border-error focus-visible:ring-error',
        false: 'border-border-light',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error'> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, size, id: providedId, ...props }, ref) => {
    const generatedId = useId()
    const id = providedId || generatedId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          className={clsx(inputVariants({ size, error: !!error }), className)}
          {...props}
        />
        
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }




