'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { Loader2, Upload } from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/transitions/PageTransition';
import { useUIStore } from '@/lib/store/uiStore';
import { useUser } from '@/lib/hooks/useUser';
import { DIAGNOSIS_OPTIONS } from '@/lib/constants/profile';

interface ProfileFormState {
  firstName: string;
  lastName: string;
  age: string;
  diagnosisType: string;
  profilePicture: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { setPageTitle, setShowBackButton, showToast } = useUIStore();
  const { user, refetch } = useUser();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();

  const [form, setForm] = useState<ProfileFormState>({
    firstName: '',
    lastName: '',
    age: '',
    diagnosisType: '',
    profilePicture: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Editar perfil');
    setShowBackButton(true);
  }, [setPageTitle, setShowBackButton]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do perfil');
        }
        const data = await response.json();
        const profile = data.user;
        setForm({
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          age: profile.age ? String(profile.age) : '',
          diagnosisType: profile.diagnosisType ?? '',
          profilePicture: profile.profilePicture ?? '',
        });
        setError(null);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Nao foi possivel carregar seus dados agora.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    if (!clerkUser || !isClerkLoaded) {
      showToast('Espere carregar a conta antes de trocar a foto', 'info');
      return;
    }

    const file = event.target.files[0];

    try {
      setIsUploadingPhoto(true);
      const updatedUser = await clerkUser.setProfileImage({ file });
      const imageUrl = updatedUser?.imageUrl ?? '';

      setForm((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));
      showToast('Foto atualizada com sucesso', 'success');
    } catch (uploadError) {
      console.error('Upload photo error:', uploadError);
      showToast('Nao foi possivel atualizar a foto agora', 'error');
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = '';
    }
  };

  const handleRemovePhoto = () => {
    setForm((prev) => ({
      ...prev,
      profilePicture: '',
    }));
    showToast('Foto removida localmente. Salve para confirmar.', 'info');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName || !form.lastName || !form.age) {
      showToast('Preencha nome, sobrenome e idade', 'info');
      return;
    }

    const ageNumber = Number(form.age);
    if (Number.isNaN(ageNumber) || ageNumber < 13) {
      showToast('Informe uma idade valida', 'info');
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          age: ageNumber,
          diagnosisType: form.diagnosisType || null,
          profilePicture: form.profilePicture || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar perfil');
      }

      showToast('Perfil atualizado com sucesso', 'success');
      await refetch();
      router.push('/profile');
    } catch (saveError) {
      console.error('Save profile error:', saveError);
      showToast('Nao foi possivel salvar as alteracoes', 'error');
    } finally {
      setIsSaving(false);
    }
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
        <div className="mobile-container px-4 py-6">
          {error && (
            <Card className="mb-4 border border-red-200 bg-red-50 text-sm text-red-600">
              {error}
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="space-y-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/40 bg-primary/10">
                  {form.profilePicture ? (
                    <img
                      src={form.profilePicture}
                      alt="Foto do perfil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-primary">
                      {form.firstName.charAt(0) || 'S'}
                      {form.lastName.charAt(0) || 'U'}
                    </div>
                  )}
                </div>

                <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                  <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-smooth">
                    <Upload className="h-4 w-4" />
                    <span>{isUploadingPhoto ? 'Enviando...' : 'Trocar foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={isUploadingPhoto}
                    />
                  </label>
                  {form.profilePicture && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-smooth"
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700" htmlFor="firstName">
                  Primeiro nome
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Como gostaria de ser chamado"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700" htmlFor="lastName">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Sobrenome"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700" htmlFor="age">
                  Idade
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min={13}
                  max={120}
                  value={form.age}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Sua idade"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700" htmlFor="diagnosisType">
                  Diagnostico
                </label>
                <select
                  id="diagnosisType"
                  name="diagnosisType"
                  value={form.diagnosisType}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Escolher...</option>
                  {DIAGNOSIS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                fullWidth
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Salvando
                  </span>
                ) : (
                  'Salvar alteracoes'
                )}
              </Button>
            </div>
          </form>
        </div>
      </PageTransition>
    </div>
  );
}
