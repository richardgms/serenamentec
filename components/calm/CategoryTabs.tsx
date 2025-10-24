'use client';

import { motion } from 'framer-motion';
import { videoCategoryLabels, videoCategoryEmojis } from '@/lib/utils/youtube';

export type VideoCategory =
  | 'FAVORITES'
  | 'VISUAL_CALMING'
  | 'NATURE_SOUNDS'
  | 'WHITE_NOISE'
  | 'ASMR'
  | 'RECENT';

interface CategoryTabsProps {
  activeCategory: VideoCategory;
  onCategoryChange: (category: VideoCategory) => void;
  favoritesCount?: number;
  recentCount?: number;
}

// Categories to show (exclude RECENT and FAVORITES from regular list)
const regularCategories: VideoCategory[] = [
  'VISUAL_CALMING',
  'NATURE_SOUNDS',
  'WHITE_NOISE',
  'ASMR',
];

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
  favoritesCount = 0,
  recentCount = 0,
}: CategoryTabsProps) {
  // Build full category list with dynamic counts
  const allCategories: VideoCategory[] = ['FAVORITES', ...regularCategories, 'RECENT'];

  const getCategoryLabel = (category: VideoCategory): string => {
    const baseLabel = videoCategoryLabels[category];

    if (category === 'FAVORITES' && favoritesCount > 0) {
      return `${baseLabel} (${favoritesCount})`;
    }

    if (category === 'RECENT' && recentCount > 0) {
      return `${baseLabel} (${recentCount})`;
    }

    return baseLabel;
  };

  return (
    <div className="mb-6">
      {/* Horizontal scrollable tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          const emoji = videoCategoryEmojis[category];
          const label = getCategoryLabel(category);

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex-shrink-0 px-4 py-2 rounded-full
                font-medium text-sm whitespace-nowrap
                transition-all tap-highlight-none
                ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-text-secondary hover:bg-gray-50 shadow-sm'
                }
              `}
            >
              <span className="mr-2">{emoji}</span>
              {label}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Add custom scrollbar hiding to globals.css if not already there
