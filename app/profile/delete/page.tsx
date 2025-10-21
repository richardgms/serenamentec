'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Loader2, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/transitions/PageTransition';
import { useUIStore } from '@/lib/store/uiStore';

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
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <PageTransition>
        <div className="mobile-container px-4 py-6 space-y-6">
          {error && (
            <Card className="border border-red-200 bg-red-50 text-sm text-red-600">
              {error}
            </Card>
          )}

          <Card className="space-y-4 border border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-red-100 p-3">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-700">
                  Exclusao permanente
                </h2>
                <p className="mt-2 text-sm text-red-600 leading-relaxed">
                  Esta acao remove todos os seus dados: historico de crises,
                  conquistas, preferencias e progresso. Nao ha como recuperar
                  apos confirmar.
                </p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <label className="flex items-start gap-3 text-sm text-gray-700">
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

            <div className="space-y-2 text-sm text-gray-700">
              <p>Digite <strong>EXCLUIR</strong> para confirmar:</p>
              <input
                type="text"
                value={confirmationText}
                onChange={(event) =>
                  setConfirmationText(event.target.value.toUpperCase())
                }
                placeholder="EXCLUIR"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={isDeleting || isDeleted}
              />
            </div>
          </Card>

          <Card className="space-y-3 bg-surface">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <AlertTriangle className="mt-[2px] h-4 w-4 text-orange-500" />
              <p>
                Se mudar de ideia depois, sera preciso criar um novo cadastro. Suas
                jornadas recomeçam do zero.
              </p>
            </div>
          </Card>

          <Button
            variant="primary"
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={!canDelete || isDeleting || isDeleted}
          >
            {isDeleting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Excluindo...
              </span>
            ) : (
              'Excluir permanentemente'
            )}
          </Button>

          {isDeleted && (
            <Card className="border border-primary/40 bg-primary/10 text-center text-sm text-primary">
              Sentiremos sua falta. Esperamos que volte quando estiver pronto.
            </Card>
          )}

          <Button
            variant="outline"
            className="w-full border-gray-200 text-gray-600 hover:bg-gray-100"
            onClick={() => router.back()}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
        </div>
      </PageTransition>
    </div>
  );
}
