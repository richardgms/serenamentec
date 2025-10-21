/**
 * YouTube utility functions
 * Helpers for working with YouTube videos
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  // Handle direct video ID (already extracted)
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Get YouTube video thumbnail URL
 * Quality options: default, mqdefault, hqdefault, sddefault, maxresdefault
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'mq' | 'hq' | 'sd' | 'maxres' = 'hq'
): string {
  const qualityMap = {
    default: 'default',
    mq: 'mqdefault',
    hq: 'hqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Get YouTube video embed URL
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options?: {
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    mute?: boolean;
  }
): string {
  const params = new URLSearchParams();

  if (options?.autoplay) params.set('autoplay', '1');
  if (options?.loop) {
    params.set('loop', '1');
    params.set('playlist', videoId); // Required for loop to work
  }
  if (options?.controls === false) params.set('controls', '0');
  if (options?.mute) params.set('mute', '1');

  // Always enable JavaScript API for better control
  params.set('enablejsapi', '1');

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Get YouTube watch URL
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Format video duration from seconds to readable string
 */
export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Video category labels in Portuguese
 */
export const videoCategoryLabels: Record<string, string> = {
  FAVORITES: 'Favoritos',
  VISUAL_CALMING: 'Visuais Calmantes',
  NATURE_SOUNDS: 'Sons da Natureza',
  WHITE_NOISE: 'Ruído Branco',
  ASMR: 'ASMR',
  RECENT: 'Vistos Recentemente',
};

/**
 * Video category emojis
 */
export const videoCategoryEmojis: Record<string, string> = {
  FAVORITES: '⭐',
  VISUAL_CALMING: '🎨',
  NATURE_SOUNDS: '🌿',
  WHITE_NOISE: '🔇',
  ASMR: '🎧',
  RECENT: '🕒',
};
