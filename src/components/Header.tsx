// Header.tsx — lógica principal del archivo

"use client";

import { Moon, Sun,  } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

// Bloque principal: define o encapsula esta parte de la aplicación.
export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
		<Image
  src="/icono.png"
  alt="SecureHash logo"
  width={320}
  height={320}
  className="w-12 h-12 object-contain"
/>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            SecureHash
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            Motor de Hashing Local Seguro
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full hover:bg-secondary"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-slate-700" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400" />
        )}
      </Button>
    </header>
  );
}
