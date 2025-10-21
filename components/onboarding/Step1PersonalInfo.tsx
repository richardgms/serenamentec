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
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Vamos nos conhecer! 😊
        </h2>
        <p className="text-gray-600">
          Conte um pouco sobre você para personalizarmos sua experiência
        </p>
      </div>

      {/* Photo Upload */}
      <PhotoUpload value={photoValue} onChange={onPhotoChange} />

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          {...register('firstName')}
          type="text"
          id="firstName"
          className={`w-full rounded-lg border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.firstName
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary'
          }`}
          placeholder="Seu nome"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Sobrenome <span className="text-red-500">*</span>
        </label>
        <input
          {...register('lastName')}
          type="text"
          id="lastName"
          className={`w-full rounded-lg border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.lastName
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary'
          }`}
          placeholder="Seu sobrenome"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Idade <span className="text-red-500">*</span>
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          id="age"
          min="13"
          max="120"
          className={`w-full rounded-lg border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 ${
            errors.age
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary'
          }`}
          placeholder="Sua idade"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
        )}
      </div>
    </div>
  );
}
