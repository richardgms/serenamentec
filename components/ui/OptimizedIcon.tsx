'use client'

import { Icon, IconWeight } from 'phosphor-react'
import { ComponentType } from 'react'

interface OptimizedIconProps {
  icon: Icon
  size?: number
  weight?: IconWeight
  color?: string
  className?: string
  style?: React.CSSProperties
}

export function OptimizedIcon({
  icon: IconComponent,
  size = 24,
  weight = 'duotone',
  color = 'currentColor',
  className,
  style
}: OptimizedIconProps) {
  // Proteção contra ícones indefinidos
  if (!IconComponent) {
    console.error('OptimizedIcon: Icon component is undefined')
    // Retorna um span vazio em vez de null para evitar hydration errors
    return <span style={{ width: size, height: size, display: 'inline-block' }} />
  }

  try {
    return (
      <IconComponent
        size={size}
        weight={weight}
        color={color}
        className={className}
        style={style}
      />
    )
  } catch (error) {
    console.error('OptimizedIcon: Error rendering icon:', error)
    // Retorna um span vazio em caso de erro
    return <span style={{ width: size, height: size, display: 'inline-block' }} />
  }
}
