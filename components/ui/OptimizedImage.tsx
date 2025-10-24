/**
 * Optimized Image Component
 * Wrapper para next/image com otimizações automáticas
 */

'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { getBlurDataURL, getSizesString } from '@/lib/utils/imageOptimization';

export interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /**
   * Uso da imagem (define sizes automáticos)
   */
  usage?: 'avatar' | 'thumbnail' | 'full';
  /**
   * Mostrar skeleton durante loading
   */
  showSkeleton?: boolean;
  /**
   * Callback quando imagem carrega
   */
  onLoadComplete?: () => void;
}

export function OptimizedImage({
  usage = 'full',
  showSkeleton = true,
  onLoadComplete,
  alt,
  className = '',
  sizes: customSizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Usa sizes customizado ou gera baseado no usage
  const sizes = customSizes || getSizesString(usage);

  // Blur placeholder automático
  const blurDataURL = getBlurDataURL();

  if (hasError) {
    return (
      <div
        className={`
          flex items-center justify-center
          bg-gray-100 text-gray-400
          ${className}
        `}
      >
        <span className="text-xs">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        {...props}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        quality={85}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
      />

      {/* Skeleton durante loading */}
      {showSkeleton && isLoading && (
        <div
          className="
            absolute inset-0
            bg-gray-200 animate-pulse
            rounded-lg
          "
        />
      )}
    </div>
  );
}

/**
 * Avatar otimizado com tamanhos fixos
 */
export function OptimizedAvatar({
  src,
  alt,
  size = 'medium',
  className = '',
}: {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}) {
  const sizeMap = {
    small: 40,
    medium: 80,
    large: 120,
  };

  const dimension = sizeMap[size];

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      usage="avatar"
      className={`rounded-full ${className}`}
      priority={size === 'large'} // Large avatars são priority
    />
  );
}

/**
 * Thumbnail otimizado para listas
 */
export function OptimizedThumbnail({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  className?: string;
  priority?: boolean;
}) {
  const aspectRatioMap = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  };

  return (
    <div className={`relative ${aspectRatioMap[aspectRatio]} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        usage="thumbnail"
        className="object-cover rounded-lg"
        priority={priority}
      />
    </div>
  );
}

/**
 * Background Image otimizada
 */
export function OptimizedBackground({
  src,
  alt = 'Background',
  overlay = false,
  overlayOpacity = 0.3,
  className = '',
  children,
}: {
  src: string;
  alt?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        usage="full"
        className="object-cover"
        priority
      />

      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
