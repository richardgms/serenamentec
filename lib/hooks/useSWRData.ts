/**
 * SWR Custom Hooks
 * Hooks para data fetching com cache e revalidation automática
 */

'use client';

import useSWR, { SWRConfiguration } from 'swr';
import { mutate } from 'swr';

/**
 * Fetcher padrão para SWR
 */
const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return res.json();
};

/**
 * Configuração padrão do SWR
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Desabilita refresh automático
  dedupingInterval: 2000, // Deduplica requests dentro de 2s
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  keepPreviousData: true,
};

/**
 * Hook para buscar dados do usuário
 */
export function useUserProfile(userId?: string) {
  const { data, error, isLoading, mutate: revalidate } = useSWR(
    userId ? `/api/user/${userId}` : null,
    fetcher,
    {
      ...defaultConfig,
      revalidateOnMount: true,
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    revalidate,
  };
}

/**
 * Hook para buscar vídeos
 */
export function useVideos(category?: string) {
  const endpoint = category ? `/api/videos?category=${category}` : '/api/videos';

  const { data, error, isLoading, mutate: revalidate } = useSWR(
    endpoint,
    fetcher,
    defaultConfig
  );

  return {
    videos: data || [],
    isLoading,
    isError: error,
    revalidate,
  };
}

/**
 * Hook para buscar favoritos do usuário
 */
export function useVideoFavorites(userId?: string) {
  const { data, error, isLoading, mutate: revalidate } = useSWR(
    userId ? `/api/user/${userId}/favorites` : null,
    fetcher,
    defaultConfig
  );

  return {
    favorites: data || [],
    isLoading,
    isError: error,
    revalidate,
    /**
     * Optimistic update para favoritos
     */
    toggleFavorite: async (videoId: string) => {
      if (!data) return;

      // Atualiza UI imediatamente
      const isFavorited = data.some((fav: any) => fav.videoId === videoId);

      const optimisticData = isFavorited
        ? data.filter((fav: any) => fav.videoId !== videoId)
        : [...data, { videoId, createdAt: new Date() }];

      await revalidate(optimisticData, false);

      try {
        // Faz a requisição real
        await fetch(`/api/user/${userId}/favorites`, {
          method: isFavorited ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId }),
        });

        // Revalida com dados reais
        revalidate();
      } catch (error) {
        // Reverte em caso de erro
        revalidate(data, false);
        throw error;
      }
    },
  };
}

/**
 * Hook para buscar jornadas do usuário
 */
export function useJourneys(userId?: string) {
  const { data, error, isLoading, mutate: revalidate } = useSWR(
    userId ? `/api/user/${userId}/journeys` : null,
    fetcher,
    defaultConfig
  );

  return {
    journeys: data || [],
    isLoading,
    isError: error,
    revalidate,
  };
}

/**
 * Hook para buscar progresso de uma jornada específica
 */
export function useJourneyProgress(userId?: string, journeyType?: string) {
  const { data, error, isLoading, mutate: revalidate } = useSWR(
    userId && journeyType
      ? `/api/user/${userId}/journeys/${journeyType}`
      : null,
    fetcher,
    defaultConfig
  );

  return {
    progress: data,
    isLoading,
    isError: error,
    revalidate,
    /**
     * Optimistic update para progresso
     */
    updateProgress: async (step: number) => {
      if (!data) return;

      // Atualiza UI imediatamente
      const optimisticData = {
        ...data,
        currentStep: step,
        completedSteps: [...data.completedSteps, step],
      };

      await revalidate(optimisticData, false);

      try {
        // Faz a requisição real
        await fetch(`/api/user/${userId}/journeys/${journeyType}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step }),
        });

        revalidate();
      } catch (error) {
        revalidate(data, false);
        throw error;
      }
    },
  };
}

/**
 * Hook para buscar mood check-ins
 */
export function useMoodCheckIns(userId?: string, period?: 'week' | 'month') {
  const endpoint = userId
    ? `/api/user/${userId}/moods${period ? `?period=${period}` : ''}`
    : null;

  const { data, error, isLoading, mutate: revalidate } = useSWR(
    endpoint,
    fetcher,
    defaultConfig
  );

  return {
    moods: data || [],
    isLoading,
    isError: error,
    revalidate,
    /**
     * Optimistic update para mood
     */
    addMood: async (mood: string) => {
      const optimisticMood = {
        id: `temp-${Date.now()}`,
        mood,
        createdAt: new Date(),
      };

      const optimisticData = [...(data || []), optimisticMood];
      await revalidate(optimisticData, false);

      try {
        await fetch(`/api/user/${userId}/moods`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood }),
        });

        revalidate();
      } catch (error) {
        revalidate(data, false);
        throw error;
      }
    },
  };
}

/**
 * Hook para buscar conquistas
 */
export function useAchievements(userId?: string) {
  const { data, error, isLoading } = useSWR(
    userId ? `/api/user/${userId}/achievements` : null,
    fetcher,
    defaultConfig
  );

  return {
    achievements: data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Hook para buscar streak
 */
export function useStreak(userId?: string) {
  const { data, error, isLoading, mutate: revalidate } = useSWR(
    userId ? `/api/user/${userId}/streak` : null,
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 60000, // Revalida a cada 1 minuto
    }
  );

  return {
    streak: data,
    isLoading,
    isError: error,
    revalidate,
  };
}

/**
 * Hook para buscar histórico de crises
 */
export function useCrisisLogs(userId?: string, limit?: number) {
  const endpoint = userId
    ? `/api/user/${userId}/crisis${limit ? `?limit=${limit}` : ''}`
    : null;

  const { data, error, isLoading, mutate: revalidate } = useSWR(
    endpoint,
    fetcher,
    defaultConfig
  );

  return {
    logs: data || [],
    isLoading,
    isError: error,
    revalidate,
  };
}

/**
 * Hook para buscar sessões de respiração
 */
export function useBreathingSessions(userId?: string, limit?: number) {
  const endpoint = userId
    ? `/api/user/${userId}/breathing${limit ? `?limit=${limit}` : ''}`
    : null;

  const { data, error, isLoading } = useSWR(endpoint, fetcher, defaultConfig);

  return {
    sessions: data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Função helper para revalidar múltiplas keys de uma vez
 */
export function revalidateMultiple(keys: string[]) {
  keys.forEach((key) => mutate(key));
}

/**
 * Função helper para limpar cache
 */
export function clearCache() {
  mutate(() => true, undefined, { revalidate: false });
}
