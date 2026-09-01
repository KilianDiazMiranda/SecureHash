// Footer.tsx — lógica principal del archivo
"use client";

import Image from 'next/image';
import { Github } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Bloque principal: define o encapsula esta parte de la aplicación.
export function Footer() {
  const { theme } = useTheme();

  const logoSrc =
    theme === 'dark'
      ? '/k_logo_alt.png'
      : '/k_logo.png';

  return (
    <footer className="mt-16 pb-8 border-t border-border pt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-bold text-foreground font-headline">
            SecureHash
          </p>

          <p className="text-xs text-muted-foreground max-w-xs">
            Kit de herramientas criptográficas de código abierto. <br />
            Licenciado bajo{' '}
            <a
              href="https://choosealicense.com/es/licenses/mit/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary font-semibold"
            >
              MIT License
            </a>
          </p>
        </div>

        <div className="flex items-center gap-4">

          <a
            href="https://github.com/KilianDiazMiranda/securehash"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center"
            title="Repositorio GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://www.kiliandiazmiranda.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-secondary rounded-full hover:bg-primary transition-all flex items-center justify-center overflow-hidden border border-transparent hover:border-primary/20"
            title="Sitio Web Personal"
          >
            <div className="relative w-full h-full p-1.5 flex items-center justify-center">
              <Image
                src={logoSrc}
                alt="Logo Kilian Diaz Miranda"
                width={240}
                height={240}
                className="object-contain"
              />
            </div>
          </a>

        </div>
      </div>
    </footer>
  );
}