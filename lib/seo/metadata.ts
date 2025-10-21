/**
 * SEO Metadata Utilities
 * Helpers para gerar meta tags dinâmicas e Open Graph
 */

import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://serenamente.app';
const siteName = 'Serenamente';
const defaultImage = `${baseUrl}/og-image.png`;

/**
 * Gera metadata completo para uma página
 */
export function generateMetadata(page: PageMetadata): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultImage,
    noIndex = false,
    canonical,
  } = page;

  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    ...(canonical && { alternates: { canonical } }),
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || baseUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@serenamente',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteName,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

/**
 * Meta tags para a Home
 */
export const homeMetadata: PageMetadata = {
  title: 'Serenamente',
  description:
    'Aplicativo de suporte e autoconhecimento para pessoas com TEA e TDAH. Exercícios de respiração guiada, vídeos calmantes e jornadas de autodescoberta.',
  keywords: [
    'autismo',
    'TDAH',
    'TEA',
    'neurodivergente',
    'respiração guiada',
    'ansiedade',
    'autoconhecimento',
    'mindfulness',
    'regulação emocional',
  ],
  canonical: baseUrl,
};

/**
 * Meta tags para Respiração
 */
export const breatheMetadata: PageMetadata = {
  title: 'Respiração Guiada',
  description:
    'Pratique exercícios de respiração guiada para reduzir ansiedade e encontrar equilíbrio. Técnicas 4-7-8, box breathing e padrões personalizados.',
  keywords: [
    'respiração guiada',
    'ansiedade',
    'técnicas de respiração',
    'box breathing',
    '4-7-8',
    'relaxamento',
  ],
  canonical: `${baseUrl}/breathe`,
};

/**
 * Meta tags para Acalmar
 */
export const calmMetadata: PageMetadata = {
  title: 'Vídeos Calmantes',
  description:
    'Assista vídeos sensoriais calmantes, sons da natureza, ruído branco e ASMR para relaxamento e regulação sensorial.',
  keywords: [
    'vídeos calmantes',
    'ASMR',
    'ruído branco',
    'sons da natureza',
    'relaxamento',
    'regulação sensorial',
  ],
  canonical: `${baseUrl}/calm`,
};

/**
 * Meta tags para Conhecer-se
 */
export const discoverMetadata: PageMetadata = {
  title: 'Autoconhecimento',
  description:
    'Explore jornadas de autodescoberta sobre TEA, TDAH e processamento sensorial. Reflexões diárias e tópicos de exploração.',
  keywords: [
    'autoconhecimento',
    'autismo',
    'TDAH',
    'processamento sensorial',
    'jornadas de descoberta',
  ],
  canonical: `${baseUrl}/discover`,
};

/**
 * Meta tags para Perfil
 */
export const profileMetadata: PageMetadata = {
  title: 'Meu Perfil',
  description: 'Visualize suas estatísticas, conquistas e histórico de uso do Serenamente.',
  canonical: `${baseUrl}/profile`,
  noIndex: true, // Páginas de perfil não devem ser indexadas
};

/**
 * Meta tags para Onboarding
 */
export const onboardingMetadata: PageMetadata = {
  title: 'Bem-vindo',
  description: 'Configure seu perfil no Serenamente e comece sua jornada de autoconhecimento.',
  canonical: `${baseUrl}/onboarding`,
  noIndex: true,
};
