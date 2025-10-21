import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DeleteConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
  confirmDisabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  children,
  confirmDisabled = false,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 px-4 pb-6 pt-12"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="mobile-container w-full rounded-3xl bg-white p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="delete-modal-title"
                  className="text-lg font-semibold text-red-600"
                >
                  {title}
                </h2>
                {description && (
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-smooth"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {children && <div className="space-y-3 text-sm text-gray-600">{children}</div>}

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                onClick={onClose}
              >
                {cancelLabel}
              </Button>
              <Button
                variant="primary"
                className="bg-red-500 hover:bg-red-600"
                disabled={confirmDisabled}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirmModal;
