'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/transitions/PageTransition';
import { PullToRefresh } from '@/components/ui/PullToRefresh';
import { Spinner } from '@/components/ui/Spinner';
import IntensitySlider from '@/components/profile/IntensitySlider';
import { useUIStore } from '@/lib/store/uiStore';
import {
  CRISIS_DURATION_OPTIONS,
  CRISIS_TYPE_OPTIONS,
  WHAT_HELPED_OPTIONS,
} from '@/lib/constants/profile';

interface CrisisFormState {
  intensity: number;
  crisisTypes: string[];
  duration: string;
  whatHelped: string[];
  otherSupport: string;
  additionalNotes: string;
  triggers: string;
  location: string;
}

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

export default function CrisisLogPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();

  const [form, setForm] = useState<CrisisFormState>({
    intensity: 3,
    crisisTypes: [],
    duration: CRISIS_DURATION_OPTIONS[0].value,
    whatHelped: [],
    otherSupport: '',
    additionalNotes: '',
    triggers: '',
    location: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPageTitle('Registrar crise');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  const triggerTokens = useMemo(
    () =>
      form.triggers
        .split(',')
        .map((token) => token.trim())
        .filter((token) => token.length > 0),
    [form.triggers]
  );

  const handleToggleType = (value: string) => {
    setForm((prev) => {
      const alreadySelected = prev.crisisTypes.includes(value);
      const crisisTypes = alreadySelected
        ? prev.crisisTypes.filter((type) => type !== value)
        : [...prev.crisisTypes, value];
      return { ...prev, crisisTypes };
    });
  };

  const handleToggleHelp = (value: string) => {
    setForm((prev) => {
      const alreadySelected = prev.whatHelped.includes(value);
      const whatHelped = alreadySelected
        ? prev.whatHelped.filter((option) => option !== value)
        : [...prev.whatHelped, value];
      return { ...prev, whatHelped };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.crisisTypes.length === 0) {
      showToast('Selecione pelo menos um tipo de crise', 'info');
      return;
    }

    if (form.whatHelped.length === 0 && !form.otherSupport.trim()) {
      showToast('Informe o que ajudou durante a crise', 'info');
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch('/api/crisis-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intensity: form.intensity,
          crisisTypes: form.crisisTypes,
          duration: form.duration,
          whatHelped: form.whatHelped,
          otherSupport: form.otherSupport.trim() || undefined,
          additionalNotes: form.additionalNotes.trim() || undefined,
          location: form.location.trim() || undefined,
          triggers: triggerTokens,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar crise');
      }

      showToast('Crise registrada com carinho', 'success');
      router.push('/profile/history');
    } catch (error) {
      console.error('Crisis log error:', error);
      showToast('Nao foi possivel salvar agora', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = async () => {
    setForm({
      intensity: 3,
      crisisTypes: [],
      duration: CRISIS_DURATION_OPTIONS[0].value,
      whatHelped: [],
      otherSupport: '',
      additionalNotes: '',
      triggers: '',
      location: '',
    });
    showToast('Formulário resetado', 'success');
  };

  return (
    <div className="min-h-screen bg-[var(--surface-main)] pb-10">
      <Header />
      <main>
      <PageTransition>
        <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
          <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Registro de Crises', href: '#' },
            ]}
          />

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="space-y-6">
              <IntensitySlider
                value={form.intensity}
                onChange={(value) => setForm((prev) => ({ ...prev, intensity: value }))}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Tipo de crise
                </h3>
                <div className="grid gap-2">
                  {CRISIS_TYPE_OPTIONS.map((option) => {
                    const isSelected = form.crisisTypes.includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all cursor-pointer"
                        style={{
                          border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                          backgroundColor: isSelected ? 'rgba(125, 211, 192, 0.1)' : 'var(--surface-card)',
                          color: isSelected ? 'var(--primary)' : 'var(--text-primary)'
                        }}
                      >
                        <span>{option.label}</span>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleToggleType(option.value)}
                        />
                        <span
                          className="h-5 w-5 rounded-full transition-all"
                          style={{
                            border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-medium)',
                            backgroundColor: isSelected ? 'var(--primary)' : 'transparent'
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Duracao aproximada
                </h3>
                <div className="grid gap-2">
                  {CRISIS_DURATION_OPTIONS.map((option) => {
                    const isSelected = form.duration === option.value;
                    return (
                      <label
                        key={option.value}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all cursor-pointer"
                        style={{
                          border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                          backgroundColor: isSelected ? 'rgba(125, 211, 192, 0.1)' : 'var(--surface-card)',
                          color: isSelected ? 'var(--primary)' : 'var(--text-primary)'
                        }}
                      >
                        <span>{option.label}</span>
                        <input
                          type="radio"
                          name="duration"
                          value={option.value}
                          className="hidden"
                          checked={isSelected}
                          onChange={() =>
                            setForm((prev) => ({ ...prev, duration: option.value }))
                          }
                        />
                        <span
                          className="h-5 w-5 rounded-full transition-all"
                          style={{
                            border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-medium)',
                            backgroundColor: isSelected ? 'var(--primary)' : 'transparent'
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  O que ajudou?
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Escolha todas as estrategias que trouxeram alivio
                </p>
                <div className="grid gap-2">
                  {WHAT_HELPED_OPTIONS.map((item) => {
                    const isSelected = form.whatHelped.includes(item);
                    return (
                      <label
                        key={item}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all cursor-pointer"
                        style={{
                          border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                          backgroundColor: isSelected ? 'rgba(125, 211, 192, 0.1)' : 'var(--surface-card)',
                          color: isSelected ? 'var(--primary)' : 'var(--text-primary)'
                        }}
                      >
                        <span>{item}</span>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleToggleHelp(item)}
                        />
                        <span
                          className="h-5 w-5 rounded-md transition-all"
                          style={{
                            border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-medium)',
                            backgroundColor: isSelected ? 'var(--primary)' : 'transparent'
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="otherSupport">
                  Outro apoio que funcionou
                </label>
                <input
                  id="otherSupport"
                  type="text"
                  value={form.otherSupport}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, otherSupport: event.target.value }))
                  }
                  placeholder="Compartilhe outras estrategias"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(125, 211, 192, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="location">
                  Onde voce estava?
                </label>
                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, location: event.target.value }))
                  }
                  placeholder="Casa, trabalho, transporte..."
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(125, 211, 192, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="triggers">
                  Gatilhos observados
                </label>
                <input
                  id="triggers"
                  type="text"
                  value={form.triggers}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, triggers: event.target.value }))
                  }
                  placeholder="Separe por virgulas. Ex.: barulho alto, muita luz"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(125, 211, 192, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {triggerTokens.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {triggerTokens.map((trigger) => (
                      <span
                        key={trigger}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(125, 211, 192, 0.1)',
                          color: 'var(--primary)'
                        }}
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                  htmlFor="additionalNotes"
                >
                  Notas adicionais
                </label>
                <textarea
                  id="additionalNotes"
                  value={form.additionalNotes}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      additionalNotes: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Descreva o que sentiu, o que funcionou, o que evitar no futuro..."
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(125, 211, 192, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSaving}
              >
                {isSaving ? 'Registrando...' : 'Registrar crise'}
              </Button>
            </motion.div>
          </motion.form>
          </div>
        </PullToRefresh>
      </PageTransition>
      </main>
    </div>
  );
}
