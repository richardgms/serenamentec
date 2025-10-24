'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Spinner } from '@/components/Loading';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { Upload } from '@/lib/constants/icons';
import { useUIStore } from '@/lib/store/uiStore';
import { logger } from '@/lib/utils/logger';
import { useUser } from '@/lib/hooks/useUser';
import { DIAGNOSIS_OPTIONS } from '@/lib/constants/profile';

interface ProfileFormState {
  firstName: string;
  lastName: string;
  age: string;
  diagnosisType: string;
  profilePicture: string;
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
        logger.error('Failed to fetch profile data', err, 'ProfileEditPage');
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
      await clerkUser.setProfileImage({ file });
      // Reload user to get updated imageUrl
      await clerkUser.reload();
      const imageUrl = clerkUser.imageUrl ?? '';

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
      logger.error('Failed to save profile changes', saveError, 'ProfileEditPage');
      showToast('Nao foi possivel salvar as alteracoes', 'error');
    } finally {
      setIsSaving(false);
    }
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
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/home' },
              { label: 'Perfil', href: '/profile' },
              { label: 'Editar perfil' },
            ]}
          />

          {error && (
            <Card className="mb-4 text-sm" style={{
              borderColor: 'var(--error)',
              backgroundColor: 'var(--error-bg)',
              color: 'var(--error)'
            }}>
              {error}
            </Card>
          )}

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
                <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full" style={{
                  border: '4px solid var(--primary-border)',
                  backgroundColor: 'var(--primary-bg)'
                }}>
                  {form.profilePicture ? (
                    <img
                      src={form.profilePicture}
                      alt="Foto do perfil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold" style={{ color: 'var(--primary)' }}>
                      {form.firstName.charAt(0) || 'S'}
                      {form.lastName.charAt(0) || 'U'}
                    </div>
                  )}
                </div>

                <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                  <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:opacity-80" style={{
                    backgroundColor: 'var(--primary-bg)',
                    color: 'var(--primary)'
                  }}
                  >
                    <OptimizedIcon icon={Upload} size={16} weight="regular" />
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
                      className="rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-tertiary)',
                        backgroundColor: 'var(--surface-card)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-main)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-card)'}
                    >
                      Remover
                    </button>
                  )}
                </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="space-y-4">
                <div>
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="firstName">
                  Primeiro nome
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--primary-shadow)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Como gostaria de ser chamado"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="lastName">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--primary-shadow)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Sobrenome"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="age">
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
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--primary-shadow)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Sua idade"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} htmlFor="diagnosisType">
                  Diagnostico
                </label>
                <select
                  id="diagnosisType"
                  name="diagnosisType"
                  value={form.diagnosisType}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    border: '2px solid var(--border-light)',
                    backgroundColor: 'var(--surface-card)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--primary-shadow)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
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
                fullWidth
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? 'Salvando...' : 'Salvar alteracoes'}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </PageTransition>
      </main>
    </div>
  );
}
