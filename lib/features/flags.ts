/**
 * Sistema de Feature Flags para Migração Incremental
 *
 * Permite ativar/desativar novas features durante a reestruturação
 * sem afetar o código em produção.
 *
 * @usage
 * ```tsx
 * import { useFeatureFlag } from '@/lib/features/flags'
 *
 * export default function HomePage() {
 *   const useNewHome = useFeatureFlag('USE_NEW_HOME')
 *
 *   if (useNewHome) {
 *     return <NewHomePage />
 *   }
 *
 *   return <OldHomePage />
 * }
 * ```
 */

export const FEATURE_FLAGS = {
  // FASE 1: Landing & Auth
  USE_NEW_LANDING: process.env.NEXT_PUBLIC_NEW_LANDING === 'true',
  USE_NEW_AUTH: process.env.NEXT_PUBLIC_NEW_AUTH === 'true',

  // FASE 2: App Shell & Core
  USE_APP_SHELL: process.env.NEXT_PUBLIC_APP_SHELL === 'true',
  USE_BOTTOM_NAV: process.env.NEXT_PUBLIC_BOTTOM_NAV === 'true',
  USE_NEW_ONBOARDING: process.env.NEXT_PUBLIC_NEW_ONBOARDING === 'true',

  // FASE 3: Home Personalizada
  USE_NEW_HOME: process.env.NEXT_PUBLIC_NEW_HOME === 'true',
  USE_RECOMMENDATIONS: process.env.NEXT_PUBLIC_RECOMMENDATIONS === 'true',

  // FASE 4: Breathing Flow
  USE_NEW_BREATHING: process.env.NEXT_PUBLIC_NEW_BREATHING === 'true',
  USE_SESSION_FLOW: process.env.NEXT_PUBLIC_SESSION_FLOW === 'true',

  // FASE 5: Gamificação
  USE_GAMIFICATION: process.env.NEXT_PUBLIC_GAMIFICATION === 'true',
  USE_XP_BAR: process.env.NEXT_PUBLIC_XP_BAR === 'true',
  USE_LEVEL_SYSTEM: process.env.NEXT_PUBLIC_LEVEL_SYSTEM === 'true',

  // FASE 6: Discover
  USE_NEW_DISCOVER: process.env.NEXT_PUBLIC_NEW_DISCOVER === 'true',
  USE_DISCOVER_TABS: process.env.NEXT_PUBLIC_DISCOVER_TABS === 'true',

  // FASE 7: Profile
  USE_NEW_PROFILE: process.env.NEXT_PUBLIC_NEW_PROFILE === 'true',
  USE_PROFILE_INSIGHTS: process.env.NEXT_PUBLIC_PROFILE_INSIGHTS === 'true',

  // FASE 8: Videos/Calm
  USE_NEW_CALM: process.env.NEXT_PUBLIC_NEW_CALM === 'true',
  USE_CURATED_CONTENT: process.env.NEXT_PUBLIC_CURATED_CONTENT === 'true',
} as const

export type FeatureFlag = keyof typeof FEATURE_FLAGS

/**
 * Hook para verificar se uma feature flag está ativa
 *
 * @param flag - Nome da feature flag
 * @returns boolean - true se ativa, false se não
 *
 * @example
 * ```tsx
 * const useNewHome = useFeatureFlag('USE_NEW_HOME')
 * ```
 */
export function useFeatureFlag(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag]
}

/**
 * Função para verificar se uma feature flag está ativa (non-hook)
 * Útil para uso fora de componentes React
 *
 * @param flag - Nome da feature flag
 * @returns boolean - true se ativa, false se não
 *
 * @example
 * ```ts
 * if (isFeatureEnabled('USE_NEW_HOME')) {
 *   // ...
 * }
 * ```
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag]
}

/**
 * Lista todas as flags ativas
 * Útil para debugging e admin dashboards
 *
 * @returns Array de flags ativas
 */
export function getActiveFlags(): FeatureFlag[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlag[]).filter(
    (flag) => FEATURE_FLAGS[flag]
  )
}

/**
 * Verifica se TODAS as flags de uma fase estão ativas
 * Útil para validar se uma fase completa foi ativada
 *
 * @example
 * ```ts
 * const phase1Ready = areAllFlagsActive([
 *   'USE_NEW_LANDING',
 *   'USE_NEW_AUTH'
 * ])
 * ```
 */
export function areAllFlagsActive(flags: FeatureFlag[]): boolean {
  return flags.every((flag) => FEATURE_FLAGS[flag])
}

/**
 * Verifica se ALGUMA flag de uma lista está ativa
 *
 * @example
 * ```ts
 * const hasAnyGamification = isAnyFlagActive([
 *   'USE_GAMIFICATION',
 *   'USE_XP_BAR',
 *   'USE_LEVEL_SYSTEM'
 * ])
 * ```
 */
export function isAnyFlagActive(flags: FeatureFlag[]): boolean {
  return flags.some((flag) => FEATURE_FLAGS[flag])
}
