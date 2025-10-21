'use client';

import { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';
import Image from 'next/image';
import { compressImage, isValidImage, formatFileSize } from '@/lib/utils/imageOptimization';

interface PhotoUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isLoading, setIsLoading] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!isValidImage(file)) {
      alert('Por favor, selecione uma imagem válida (JPG, PNG ou WebP)');
      return;
    }

    // Validate file size (max 10MB antes da compressão)
    if (file.size > 10 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 10MB');
      return;
    }

    setIsLoading(true);

    try {
      const originalSize = file.size;

      // Comprimir imagem para 400x400 max
      const compressedFile = await compressImage(file, 400, 0.85);

      const compressedSize = compressedFile.size;
      const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      setCompressionInfo(
        `Otimizada: ${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)} (${savings}% menor)`
      );

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
        setIsLoading(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao processar a imagem');
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={handleClick}
        className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full bg-surface transition-smooth hover:opacity-80"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}

        {/* Overlay with camera icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-smooth hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {preview ? 'Clique para alterar' : 'Adicionar foto (opcional)'}
        </p>
        {compressionInfo && (
          <p className="text-xs text-green-600 mt-1">{compressionInfo}</p>
        )}
      </div>
    </div>
  );
}
