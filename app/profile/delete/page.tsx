'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/transitions/PageTransition';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { CircleNotch, ShieldWarning, WarningCircle } from '@/lib/constants/icons';
import { useUIStore } from '@/lib/store/uiStore';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DeleteAccountPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();

  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Excluir conta');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  const canDelete =
    acknowledged && confirmationText.trim().toUpperCase() === 'EXCLUIR';

  const handleDelete = async () => {
    if (!canDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acknowledge: true,
          confirmationText: 'EXCLUIR',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha ao excluir conta');
      }

      setIsDeleted(true);
      showToast(
        'Sentiremos sua falta. Esperamos que volte quando estiver pronto.',
        'success'
      );

      setTimeout(async () => {
        await signOut({ redirectUrl: '/' });
      }, 2000);
    } catch (deleteError: any) {
      console.error('Delete account error:', deleteError);
      setError(deleteError.message || 'Nao foi possivel excluir a conta');
      showToast('Nao foi possivel excluir agora', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-main)] pb-10">
      <Header />
      <main>
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Excluir conta' },
            ]}
          />

          {error && (
            <Card className="text-sm" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-bg)', color: 'var(--error)' }}>
              {error}
            </Card>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="space-y-4" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-bg)' }}>
            <div className="flex items-start gap-3">
              <div className="rounded-full p-3" style={{ backgroundColor: 'var(--error-bg)' }}>
                <OptimizedIcon icon={ShieldWarning} size={24} weight="duotone" style={{ color: 'var(--error)' }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--error)' }}>
                  Exclusao permanente
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--error)' }}>
                  Esta acao remove todos os seus dados: historico de crises,
                  conquistas, preferencias e progresso. Nao ha como recuperar
                  apos confirmar.
                </p>
              </div>
            </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
            <label className="flex items-start gap-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(event) => setAcknowledged(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                disabled={isDeleting || isDeleted}
              />
              <span>
                Entendo que todos os meus dados serao removidos permanentemente
                e nao poderao ser recuperados.
              </span>
            </label>

            <div className="space-y-2 text-sm text-text-secondary">
              <p>Digite <strong>EXCLUIR</strong> para confirmar:</p>
              <input
                type="text"
                value={confirmationText}
                onChange={(event) =>
                  setConfirmationText(event.target.value.toUpperCase())
                }
                placeholder="EXCLUIR"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={isDeleting || isDeleted}
              />
            </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-3 bg-[var(--surface-card)]">
            <div className="flex items-start gap-3 text-sm text-text-secondary">
              <OptimizedIcon icon={WarningCircle} size={16} weight="duotone" className="mt-[2px] text-orange-500" />
              <p>
                Se mudar de ideia depois, sera preciso criar um novo cadastro. Suas
                jornadas recomeçam do zero.
              </p>
            </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
            variant="primary"
            className="w-full"
            style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}
            onClick={handleDelete}
            disabled={!canDelete || isDeleting || isDeleted}
          >
            {isDeleting ? (
              <span className="flex items-center justify-center gap-2">
                <OptimizedIcon icon={CircleNotch} size={16} weight="bold" className="animate-spin" />
                Excluindo...
              </span>
            ) : (
              'Excluir permanentemente'
            )}
              </Button>
            </motion.div>

            {isDeleted && (
              <motion.div variants={itemVariants}>
                <Card className="border border-primary/40 bg-primary/10 text-center text-sm text-primary">
                  Sentiremos sua falta. Esperamos que volte quando estiver pronto.
                </Card>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Button
            variant="outline"
            className="w-full border-gray-200 text-text-secondary hover:bg-gray-100"
            onClick={() => router.back()}
            disabled={isDeleting}
          >
            Cancelar
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
