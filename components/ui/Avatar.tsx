'use client'

import { forwardRef, ImgHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const avatarVariants = cva(
  'rounded-full border-3 border-white dark:border-[var(--surface-card)] shadow-soft-sm object-cover',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>,
    VariantProps<typeof avatarVariants> {
  src?: string
  fallback?: string
  name?: string
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size, src, fallback, name, alt, ...props }, ref) => {
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '??'

    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt || name || 'Avatar'}
          className={clsx(avatarVariants({ size }), className)}
          {...props}
        />
      )
    }

    // Fallback com iniciais
    return (
      <div
        className={clsx(
          avatarVariants({ size }),
          'flex items-center justify-center bg-primary text-white font-semibold',
          className
        )}
      >
        {fallback || initials}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }




