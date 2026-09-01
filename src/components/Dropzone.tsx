// Dropzone.tsx — lógica principal del archivo
"use client";

import React, { useState, useCallback } from 'react';
import { Upload, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

// Bloque principal: define o encapsula esta parte de la aplicación.
export function Dropzone({ onFileSelect, disabled }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect, disabled]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[280px] flex flex-col items-center justify-center p-8 gap-4",
        isDragging
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-muted-foreground/20 hover:border-primary/50 hover:bg-secondary/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input
        type="file"
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        disabled={disabled}
      />

      <div
        className={cn(
          "p-5 rounded-full transition-transform duration-300 pointer-events-none",
          isDragging
            ? "bg-primary text-white scale-110"
            : "bg-secondary text-primary group-hover:scale-110"
        )}
      >
        {isDragging ? (
          <FileCode className="w-10 h-10 pointer-events-none" />
        ) : (
          <Upload className="w-10 h-10 pointer-events-none" />
        )}
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold font-headline text-foreground">
          {isDragging ? 'Suelta para Escanear' : 'Arrastra un archivo para procesar'}
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Tus datos nunca salen de este navegador. Soporte de archivos grandes mediante procesamiento por bloques.
        </p>
      </div>

      <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
        <span>SHA-256</span>
        <span>•</span>
        <span>SHA3-512</span>
        <span>•</span>
        <span>BLAKE3</span>
        <span>•</span>
        <span>BLAKE2b</span>
      </div>
    </div>
  );
}