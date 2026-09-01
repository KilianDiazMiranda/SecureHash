// utils.ts — lógica principal del archivo
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Bloque principal: define o encapsula esta parte de la aplicación.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Bloque principal: define o encapsula esta parte de la aplicación.
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
