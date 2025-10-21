import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'surface' | 'primary';
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-smooth tap-highlight-none';
  const variants = {
    default: 'bg-white card-shadow',
    surface: 'bg-surface card-shadow',
    primary: 'bg-primary text-white card-shadow',
  };

  const interactiveStyles = onClick ? 'cursor-pointer touch-feedback hover:scale-[1.02]' : '';

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
