import { ReactNode } from 'react'
import type { Icon } from 'phosphor-react'
import { ClipboardText, Clock, Heart, Sparkle } from '@/lib/constants/icons'
import { EmptyBox } from '@/components/ui/illustrations/EmptyBox'
import { EmptyJourney } from '@/components/ui/illustrations/EmptyJourney'

export type EmptyStateContext =
  | 'calm-favorites'
  | 'calm-recent'
  | 'calm-category'
  | 'journey-progress'
  | 'achievements'
  | 'crisis-history'

export type EmptyStateAccent = 'primary' | 'warm' | 'calm' | 'neutral'

export interface EmptyStatePreset {
  title: string
  description: string
  tip?: string
  accent?: EmptyStateAccent
  icon?: Icon
  illustration?: ReactNode
}

export const emptyStatePresets: Record<EmptyStateContext, EmptyStatePreset> = {
  'calm-favorites': {
    title: 'Nenhum favorito ainda',
    description:
      'Toque no coração de um vídeo para salvar seus favoritos e revisitá-los quando quiser.',
    tip: 'Dica: combine com a respiração compassada para um momento de calma completa.',
    accent: 'warm',
    icon: Heart
  },
  'calm-recent': {
    title: 'Você ainda não assistiu',
    description:
      'Quando assistir vídeos completos, eles aparecerão aqui para retomar de onde parou.',
    tip: 'Experimente uma jornada curta para desbloquear recomendações personalizadas.',
    accent: 'calm',
    icon: Clock
  },
  'calm-category': {
    title: 'Conteúdo chegando em breve',
    description:
      'Estamos preparando novas práticas para esta categoria. Enquanto isso, explore outras opções relaxantes.',
    accent: 'primary',
    illustration: <EmptyBox className="mx-auto" />
  },
  'journey-progress': {
    title: 'Comece uma jornada serena',
    description:
      'As jornadas guiadas ajudam você a construir novos hábitos emocionais com passos curtos e acolhedores.',
    tip: 'Escolha um tema que converse com o seu momento atual.',
    accent: 'calm',
    illustration: <EmptyJourney className="mx-auto" />
  },
  achievements: {
    title: 'Celebrações te esperam',
    description:
      'Complete práticas, registre conquistas e veja esta área florescer com reconhecimentos especiais.',
    tip: 'Siga as jornadas para desbloquear toques de confete e troféus brilhantes.',
    accent: 'primary',
    icon: Sparkle
  },
  'crisis-history': {
    title: 'Nenhum registro por aqui',
    description:
      'Registrar suas experiências ajuda a identificar gatilhos, pequenas vitórias e pedidos de apoio.',
    tip: 'Você pode registrar mesmo quando as coisas vão bem – celebrar também conta!',
    accent: 'neutral',
    icon: ClipboardText
  }
}
