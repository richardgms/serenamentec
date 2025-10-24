'use client';

import { create } from 'zustand';

interface UIStore {
  // Current page title
  pageTitle: string;
  setPageTitle: (title: string) => void;

  // Navigation breadcrumb
  breadcrumb: string[];
  setBreadcrumb: (breadcrumb: string[]) => void;
  addBreadcrumb: (item: string) => void;
  removeBreadcrumb: () => void;

  // Modal states
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // Toast notifications
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning' | null;
  showToast: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  hideToast: () => void;

  // Loading states
  isLoading: boolean;
  loadingMessage: string | null;
  setLoading: (isLoading: boolean, message?: string) => void;

  // Show/hide back button
  showBackButton: boolean;
  setShowBackButton: (show: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  pageTitle: '',
  breadcrumb: [],
  isModalOpen: false,
  modalContent: null,
  toastMessage: null,
  toastType: null,
  isLoading: false,
  loadingMessage: null,
  showBackButton: false,

  // Actions
  setPageTitle: (title) => set({ pageTitle: title }),

  setBreadcrumb: (breadcrumb) => set({ breadcrumb }),

  addBreadcrumb: (item) =>
    set((state) => ({ breadcrumb: [...state.breadcrumb, item] })),

  removeBreadcrumb: () =>
    set((state) => ({
      breadcrumb: state.breadcrumb.slice(0, -1),
    })),

  openModal: (content) =>
    set({ isModalOpen: true, modalContent: content }),

  closeModal: () =>
    set({ isModalOpen: false, modalContent: null }),

  showToast: (message, type) =>
    set({ toastMessage: message, toastType: type }),

  hideToast: () =>
    set({ toastMessage: null, toastType: null }),

  setLoading: (isLoading, message) =>
    set({ isLoading, loadingMessage: message || null }),

  setShowBackButton: (show) => set({ showBackButton: show }),
}));
