'use client';

/**
 * Image Optimization Utilities
 * Helpers para otimização de imagens e blur placeholders
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Gera um blur data URL para placeholder
 * Base64 de uma imagem 10x10 com a cor primária do app
 */
export function getBlurDataURL(color: string = '#84C2BE'): string {
  // SVG blur placeholder
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="${color}" />
      <filter id="blur">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <rect width="10" height="10" filter="url(#blur)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Gera shimmer effect para loading de imagens
 */
export function getShimmerDataURL(width: number, height: number): string {
  const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f0f0f0" />
          <stop offset="50%" stop-color="#e0e0e0" />
          <stop offset="100%" stop-color="#f0f0f0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)">
        <animate
          attributeName="x"
          from="-${width}"
          to="${width}"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  `;

  const base64 = Buffer.from(shimmer).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Calcula aspect ratio de uma imagem
 */
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Redimensiona imagem mantendo aspect ratio
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): ImageDimensions {
  const aspectRatio = getAspectRatio(originalWidth, originalHeight);

  if (maxHeight) {
    const widthByHeight = maxHeight * aspectRatio;
    if (widthByHeight <= maxWidth) {
      return { width: widthByHeight, height: maxHeight };
    }
  }

  return {
    width: maxWidth,
    height: maxWidth / aspectRatio,
  };
}

/**
 * Comprime arquivo de imagem client-side
 * Retorna Promise com File comprimido
 */
export async function compressImage(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Cria canvas para redimensionar
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calcula novas dimensões
        const { width, height } = calculateDimensions(
          img.width,
          img.height,
          maxWidth
        );

        canvas.width = width;
        canvas.height = height;

        // Desenha imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Converte para blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // Cria novo File do blob
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Valida se arquivo é imagem válida
 */
export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Formata tamanho de arquivo para exibição
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Configurações recomendadas de sizes para next/image
 */
export const IMAGE_SIZES = {
  avatar: {
    small: 40,
    medium: 80,
    large: 120,
  },
  thumbnail: {
    small: 150,
    medium: 300,
    large: 600,
  },
  full: {
    mobile: 428, // max width do app
    tablet: 768,
    desktop: 1200,
  },
} as const;

/**
 * Gera string sizes para next/image baseado no uso
 */
export function getSizesString(usage: 'avatar' | 'thumbnail' | 'full'): string {
  switch (usage) {
    case 'avatar':
      return '(max-width: 428px) 80px, 120px';
    case 'thumbnail':
      return '(max-width: 428px) 150px, 300px';
    case 'full':
      return '(max-width: 428px) 428px, 768px';
    default:
      return '100vw';
  }
}
