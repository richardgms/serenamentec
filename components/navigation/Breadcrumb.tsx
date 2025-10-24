'use client'

import Link from 'next/link'
import { clsx } from 'clsx'
import { OptimizedIcon } from '@/components/ui/OptimizedIcon'
import { CaretRight } from '@/lib/constants/icons'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav className={clsx('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors duration-150 truncate max-w-[120px]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  'truncate max-w-[150px]',
                  isLast ? 'text-text-primary font-semibold' : 'text-text-secondary'
                )}
                {...(isLast && { 'aria-current': 'page' })}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <OptimizedIcon
                icon={CaretRight}
                size={16}
                className="text-text-tertiary flex-shrink-0"
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
