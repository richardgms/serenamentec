'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/ui/Spinner';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { DownloadSimple, Trash } from '@/lib/constants/icons';
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-main)]">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-main)] pb-10">
      <Header />
      <main>
      <PageTransition>
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Configurações' },
            ]}
          />

          {saveError && (
            <Card className="text-sm" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-bg)', color: 'var(--error)' }}>
              {saveError}
            </Card>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
            <h2 className="text-base font-semibold text-text-primary">
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
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
            <h2 className="text-base font-semibold text-text-primary">
              Dados pessoais
            </h2>
            <Button
              variant="outline"
              className="w-full border-gray-200 text-text-secondary hover:bg-gray-100"
              onClick={handleExport}
            >
              <OptimizedIcon icon={DownloadSimple} size={16} weight="regular" className="mr-2" />
              Exportar meus dados (em breve)
            </Button>
            <div className="rounded-2xl bg-[var(--surface-card)] px-4 py-3 text-xs text-text-tertiary">
              Em breve voce podera solicitar um arquivo com todos os seus dados
              para guardar ou compartilhar com profissionais de apoio.
            </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-4" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-bg)' }}>
            <h2 className="text-base font-semibold" style={{ color: 'var(--error)' }}>
              Historico de crises
            </h2>
            <p className="text-sm" style={{ color: 'var(--error)' }}>
              Esta acao remove todo o seu historico de crises. Use com cuidado.
            </p>
            <Button
              variant="primary"
              className="w-full"
              style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}
              onClick={() => setIsModalOpen(true)}
            >
              <OptimizedIcon icon={Trash} size={16} weight="regular" className="mr-2" />
              Limpar historico de crises
            </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
      </main>

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
        <label className="flex items-start gap-2 text-sm text-text-secondary">
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
        <div className="space-y-2 text-sm text-text-secondary">
          <p>Digite <strong>LIMPAR</strong> para confirmar:</p>
          <input
            type="text"
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value.toUpperCase())}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="LIMPAR"
            disabled={isClearing}
          />
        </div>
      </DeleteConfirmModal>
    </div>
  );
}
