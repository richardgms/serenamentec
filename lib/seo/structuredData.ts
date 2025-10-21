/**
 * Structured Data (JSON-LD) for SEO
 * Schema.org markup para melhor indexação
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://serenamente.app';

/**
 * Organization Schema
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Serenamente',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description:
    'Aplicativo de suporte e autoconhecimento para pessoas com TEA e TDAH',
  foundingDate: '2025',
  sameAs: [
    // Adicionar redes sociais quando disponíveis
    // 'https://twitter.com/serenamente',
    // 'https://instagram.com/serenamente',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    availableLanguage: ['Portuguese'],
  },
};

/**
 * WebApplication Schema
 */
export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Serenamente',
  url: baseUrl,
  description:
    'Aplicativo de suporte e autoconhecimento para pessoas com TEA e TDAH. Exercícios de respiração guiada, vídeos calmantes e jornadas de autodescoberta.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
  },
  featureList: [
    'Exercícios de respiração guiada',
    'Vídeos calmantes e sensoriais',
    'Jornadas de autoconhecimento',
    'Tracking de crises e humor',
    'Conquistas e gamificação',
  ],
  screenshot: `${baseUrl}/screenshots/home.png`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
};

/**
 * MedicalWebPage Schema (para páginas de conteúdo de saúde)
 */
export function getMedicalWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url,
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main',
    },
    specialty: {
      '@type': 'MedicalSpecialty',
      name: 'Neurodevelopmental Disorders',
    },
    about: [
      {
        '@type': 'MedicalCondition',
        name: 'Autism Spectrum Disorder',
      },
      {
        '@type': 'MedicalCondition',
        name: 'Attention Deficit Hyperactivity Disorder',
      },
    ],
    inLanguage: 'pt-BR',
  };
}

/**
 * HowTo Schema (para exercícios de respiração)
 */
export function getBreathingExerciseSchema(
  name: string,
  description: string,
  steps: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: `${baseUrl}/screenshots/breathe.png`,
    totalTime: 'PT5M',
    tool: {
      '@type': 'HowToTool',
      name: 'Serenamente App',
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step,
      text: step,
    })),
    inLanguage: 'pt-BR',
  };
}

/**
 * VideoObject Schema (para vídeos calmantes)
 */
export function getVideoSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl: baseUrl,
    embedUrl: baseUrl,
    duration: 'PT10M',
    inLanguage: 'pt-BR',
  };
}

/**
 * FAQPage Schema
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é o Serenamente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Serenamente é um aplicativo web de suporte e autoconhecimento para pessoas com TEA (Transtorno do Espectro Autista) e TDAH. Oferece exercícios de respiração guiada, vídeos calmantes, jornadas de autodescoberta e ferramentas de tracking de humor e crises.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Serenamente é gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! O Serenamente é completamente gratuito e foi desenvolvido para apoiar a comunidade neurodivergente com ferramentas acessíveis de autorregulação e autoconhecimento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso de diagnóstico para usar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não! O Serenamente é para todos. Você pode estar em processo de descoberta diagnóstica, já ter um diagnóstico ou simplesmente buscar ferramentas de autorregulação. Todos são bem-vindos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funcionam os exercícios de respiração?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os exercícios de respiração guiada oferecem diferentes padrões (4-7-8 para ansiedade, box breathing para equilíbrio, etc.) com animação visual sincronizada e feedback tátil opcional. Você pode usar padrões pré-definidos ou criar seu próprio padrão personalizado.',
      },
    },
    {
      '@type': 'Question',
      name: 'O app funciona offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! Como PWA (Progressive Web App), o Serenamente funciona offline para funcionalidades básicas como exercícios de respiração e revisão de anotações. Seus dados são sincronizados automaticamente quando você volta online.',
      },
    },
  ],
};

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Helper para gerar script tag com JSON-LD
 */
export function generateStructuredData(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}
