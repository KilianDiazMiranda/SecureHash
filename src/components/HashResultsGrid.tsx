// HashResultsGrid.tsx — lógica principal del archivo

"use client";

import React from 'react';
import { HashResults, isAlgorithmInsecure } from '@/lib/hashing';
import { Copy, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HashResultsGridProps {
  results: HashResults;
}

// Bloque principal: define o encapsula esta parte de la aplicación.
export function HashResultsGrid({ results }: HashResultsGridProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Firma Copiada",
      description: `Firma ${label.toUpperCase().replace('_', '-')} copiada al portapapeles.`,
    });
  };

  const hashEntries = Object.entries(results) as [keyof HashResults, string][];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hashEntries.map(([algo, hash]) => {
        const isInsecure = isAlgorithmInsecure(algo);
        const displayName = algo.toUpperCase().replace('_', '-');
        
        return (
          <div key={algo} className="group relative flex flex-col p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {displayName}
                </span>
                {isInsecure ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Este algoritmo está criptográficamente roto o es propenso a colisiones.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <ShieldCheck className="w-4 h-4 text-accent" />
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(hash, algo)}
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="font-code text-xs break-all bg-secondary/30 p-2.5 rounded-lg border border-transparent group-hover:border-primary/10 select-all leading-relaxed">
              {hash}
            </div>
          </div>
        );
      })}
    </div>
  );
}
