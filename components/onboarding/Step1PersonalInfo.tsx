'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PersonalInfoFormData } from '@/lib/validations/onboarding';
import PhotoUpload from './PhotoUpload';

interface Step1Props {
  register: UseFormRegister<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
  photoValue?: string;
  onPhotoChange: (url: string) => void;
}

export default function Step1PersonalInfo({
  register,
  errors,
  photoValue,
  onPhotoChange,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-text-primary">
          Vamos nos conhecer! 😊
        </h2>
        <p className="text-text-secondary">
          Conte um pouco sobre você para personalizarmos sua experiência
        </p>
      </div>

      {/* Photo Upload */}
      <PhotoUpload value={photoValue} onChange={onPhotoChange} />

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="mb-2 block text-sm font-medium text-text-secondary"
        >
          Nome <span className="text-error">*</span>
        </label>
        <input
          {...register('firstName')}
          type="text"
          id="firstName"
          className={`w-full rounded-lg px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.firstName
              ? 'border-error focus:ring-error'
              : 'focus:ring-primary'
          }`}
          style={{
            border: errors.firstName ? '2px solid var(--error)' : '2px solid var(--border-light)',
            backgroundColor: 'var(--surface-card)',
            color: 'var(--text-primary)'
          }}
          placeholder="Seu nome"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-error">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium text-text-secondary"
        >
          Sobrenome <span className="text-error">*</span>
        </label>
        <input
          {...register('lastName')}
          type="text"
          id="lastName"
          className={`w-full rounded-lg px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.lastName
              ? 'border-error focus:ring-error'
              : 'focus:ring-primary'
          }`}
          style={{
            border: errors.lastName ? '2px solid var(--error)' : '2px solid var(--border-light)',
            backgroundColor: 'var(--surface-card)',
            color: 'var(--text-primary)'
          }}
          placeholder="Seu sobrenome"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-error">{errors.lastName.message}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="mb-2 block text-sm font-medium text-text-secondary"
        >
          Idade <span className="text-error">*</span>
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          id="age"
          min="13"
          max="120"
          className={`w-full rounded-lg px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.age
              ? 'border-error focus:ring-error'
              : 'focus:ring-primary'
          }`}
          style={{
            border: errors.age ? '2px solid var(--error)' : '2px solid var(--border-light)',
            backgroundColor: 'var(--surface-card)',
            color: 'var(--text-primary)'
          }}
          placeholder="Sua idade"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-error">{errors.age.message}</p>
        )}
      </div>
    </div>
  );
}
