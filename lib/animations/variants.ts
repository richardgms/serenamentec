/**
 * Centralized animation variants for Framer Motion
 * Mantém consistência nas animações em todo o app
 */

import { Variants } from 'framer-motion';

// ============================================
// DURATIONS & EASING
// ============================================

export const DURATION = {
  micro: 0.15,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

export const EASING = {
  enter: [0.4, 0, 0.2, 1], // ease-out
  exit: [0.4, 0, 1, 1], // ease-in
  both: [0.4, 0, 0.2, 1], // ease-in-out
  spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const;

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

export const pageSlideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

export const pageFadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: DURATION.normal,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
    },
  },
};

// ============================================
// CONTAINER ANIMATIONS (Stagger Children)
// ============================================

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const containerFastVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const containerSlowVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// ITEM ANIMATIONS (Children)
// ============================================

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION.fast,
    },
  },
};

export const itemSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

export const itemScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
};

// ============================================
// MODAL / OVERLAY ANIMATIONS
// ============================================

export const modalBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
    },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

export const bottomSheetVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    y: '100%',
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

// ============================================
// TOAST / NOTIFICATION ANIMATIONS
// ============================================

export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.fast,
      ease: EASING.enter,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
};

// ============================================
// SKELETON / LOADING ANIMATIONS
// ============================================

export const skeletonPulse = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const shimmerAnimation = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ============================================
// BUTTON / INTERACTIVE ANIMATIONS
// ============================================

export const buttonTapVariants: Variants = {
  tap: {
    scale: 0.95,
    transition: {
      duration: DURATION.micro,
    },
  },
};

export const buttonHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATION.fast,
    },
  },
};

export const iconHoverVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      ...EASING.spring,
    },
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: DURATION.fast,
      ease: EASING.enter,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const cardEnterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
};

// ============================================
// COLLAPSE / EXPAND ANIMATIONS
// ============================================

export const collapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: DURATION.fast,
      ease: EASING.exit,
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
};

// ============================================
// PROGRESS ANIMATIONS
// ============================================

export const progressBarVariants: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: (progress: number) => ({
    scaleX: progress / 100,
    transition: {
      duration: DURATION.slow,
      ease: EASING.both,
    },
  }),
};

// ============================================
// EMPTY STATE ANIMATIONS
// ============================================

export const emptyStateVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.enter,
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// ATTENTION / PULSE ANIMATIONS
// ============================================

export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const attentionShake: Variants = {
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

// ============================================
// RIPPLE EFFECT
// ============================================

export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
