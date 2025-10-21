'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, FileDown, Trash2 } from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/transitions/PageTransition';
import ToggleSwitch from '@/components/profile/ToggleSwitch';
import DeleteConfirmModal from '@/components/profile/DeleteConfirmModal';
import { useUIStore } from '@/lib/store/uiStore';

interface PreferencesState {
  vibrationEnabled: boolean;
  soundEnabled: boolean;
}

const defaultPreferences: PreferencesState = {
  vibrationEnabled: true,
  soundEnabled: true,
};

export default function ProfileSettingsPage() {
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();
  const [preferences, setPreferences] = useState<PreferencesState>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isClearing, setIsClearing] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPageTitle('Configuracoes');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/user/preferences');
        if (!response.ok) {
          throw new Error('Falha ao carregar preferencias');
        }

        const data = await response.json();
        setPreferences({
          vibrationEnabled: data.preferences?.vibrationEnabled ?? true,
          soundEnabled: data.preferences?.soundEnabled ?? true,
        });
        setSaveError(null);
      } catch (error) {
        console.error('Preferences fetch error:', error);
        setSaveError('Nao foi possivel carregar suas preferencias agora');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreferences();
  }, []);

  const queueSave = (pendingPreferences: PreferencesState) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        const response = await fetch('/api/user/preferences', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pendingPreferences),
        });

        if (!response.ok) {
          throw new Error('Erro ao salvar preferencias');
        }

        setSaveError(null);
        showToast('Preferencias atualizadas', 'success');
      } catch (error) {
        console.error('Preferences save error:', error);
        setSaveError('Nao foi possivel salvar suas preferencias');
        showToast('Nao foi possivel salvar agora', 'error');
      } finally {
        setIsSaving(false);
      }
    }, 500);
  };

  const handleToggle = (key: keyof PreferencesState) => (value: boolean) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value };
      queueSave(updated);
      return updated;
    });
  };

  const handleClearHistory = async () => {
    try {
      setIsClearing(true);
      const response = await fetch('/api/crisis-log/delete-all', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao limpar historico');
      }

      showToast('Historico limpo com sucesso', 'success');
      setIsModalOpen(false);
      setConfirmChecked(false);
      setConfirmText('');
    } catch (error) {
      console.error('Clear history error:', error);
      showToast('Nao foi possivel limpar agora', 'error');
    } finally {
      setIsClearing(false);
    }
  };

  const handleExport = () => {
    showToast('Em breve voce podera exportar seus dados', 'info');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <PageTransition>
        <div className="mobile-container px-4 py-6 space-y-6">
          {saveError && (
            <Card className="border border-red-200 bg-red-50 text-sm text-red-600">
              {saveError}
            </Card>
          )}

          <Card className="space-y-4">
            <h2 className="text-base font-semibold text-gray-800">
              Preferencias rapidas
            </h2>
            <ToggleSwitch
              label="Vibracao"
              description="Ative para receber um leve retorno ao concluir exercicios de respiracao."
              checked={preferences.vibrationEnabled}
              onToggle={handleToggle('vibrationEnabled')}
            />
            <ToggleSwitch
              label="Sons"
              description="Ative para ouvir sons ambientes e feedbacks delicados."
              checked={preferences.soundEnabled}
              onToggle={handleToggle('soundEnabled')}
            />
            <p className="text-xs text-gray-400">
              Alteracoes sao salvas automaticamente
              {isSaving && ' · salvando...'}
            </p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-base font-semibold text-gray-800">
              Dados pessoais
            </h2>
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-600 hover:bg-gray-100"
              onClick={handleExport}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Exportar meus dados (em breve)
            </Button>
            <div className="rounded-2xl bg-surface px-4 py-3 text-xs text-gray-500">
              Em breve voce podera solicitar um arquivo com todos os seus dados
              para guardar ou compartilhar com profissionais de apoio.
            </div>
          </Card>

          <Card className="space-y-4 border border-red-200 bg-red-50">
            <h2 className="text-base font-semibold text-red-700">
              Historico de crises
            </h2>
            <p className="text-sm text-red-600">
              Esta acao remove todo o seu historico de crises. Use com cuidado.
            </p>
            <Button
              variant="primary"
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={() => setIsModalOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar historico de crises
            </Button>
          </Card>
        </div>
      </PageTransition>

      <DeleteConfirmModal
        open={isModalOpen}
        onClose={() => {
          if (!isClearing) {
            setIsModalOpen(false);
            setConfirmChecked(false);
            setConfirmText('');
          }
        }}
        onConfirm={handleClearHistory}
        confirmLabel={isClearing ? 'Limpando...' : 'Sim, remover tudo'}
        confirmDisabled={!confirmChecked || confirmText !== 'LIMPAR' || isClearing}
        title="Tem certeza?"
        description="Esta acao é definitiva e removera todo o historico de crises registrado."
      >
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmChecked}
            onChange={(event) => setConfirmChecked(event.target.checked)}
            className="mt-[2px] h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span>
            Eu entendo que esta acao nao pode ser desfeita e desejo continuar.
          </span>
        </label>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Digite <strong>LIMPAR</strong> para confirmar:</p>
          <input
            type="text"
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value.toUpperCase())}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="LIMPAR"
            disabled={isClearing}
          />
        </div>
      </DeleteConfirmModal>
    </div>
  );
}
