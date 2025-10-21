'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/transitions/PageTransition';
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

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <PageTransition>
        <div className="mobile-container px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="space-y-6">
              <IntensitySlider
                value={form.intensity}
                onChange={(value) => setForm((prev) => ({ ...prev, intensity: value }))}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Tipo de crise
                </h3>
                <div className="grid gap-2">
                  {CRISIS_TYPE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-smooth ${
                        form.crisisTypes.includes(option.value)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>{option.label}</span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.crisisTypes.includes(option.value)}
                        onChange={() => handleToggleType(option.value)}
                      />
                      <span
                        className={`h-5 w-5 rounded-full border-2 ${
                          form.crisisTypes.includes(option.value)
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Duracao aproximada
                </h3>
                <div className="grid gap-2">
                  {CRISIS_DURATION_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-smooth ${
                        form.duration === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>{option.label}</span>
                      <input
                        type="radio"
                        name="duration"
                        value={option.value}
                        className="hidden"
                        checked={form.duration === option.value}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, duration: option.value }))
                        }
                      />
                      <span
                        className={`h-5 w-5 rounded-full border-2 ${
                          form.duration === option.value
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  O que ajudou?
                </h3>
                <p className="text-xs text-gray-500">
                  Escolha todas as estrategias que trouxeram alivio
                </p>
                <div className="grid gap-2">
                  {WHAT_HELPED_OPTIONS.map((item) => (
                    <label
                      key={item}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-smooth ${
                        form.whatHelped.includes(item)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>{item}</span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.whatHelped.includes(item)}
                        onChange={() => handleToggleHelp(item)}
                      />
                      <span
                        className={`h-5 w-5 rounded-md border-2 ${
                          form.whatHelped.includes(item)
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="otherSupport">
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="location">
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="triggers">
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {triggerTokens.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {triggerTokens.map((trigger) => (
                      <span
                        key={trigger}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-700"
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-100"
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
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Registrando
                  </span>
                ) : (
                  'Registrar crise'
                )}
              </Button>
            </div>
          </form>
        </div>
      </PageTransition>
    </div>
  );
}
