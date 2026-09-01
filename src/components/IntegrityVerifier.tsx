// IntegrityVerifier.tsx — lógica principal del archivo

"use client";

import React, { useState, useMemo } from 'react';
import { HashResults, isAlgorithmInsecure } from '@/lib/hashing';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrityVerifierProps {
  results: HashResults;
}

// Bloque principal: define o encapsula esta parte de la aplicación.
export function IntegrityVerifier({ results }: IntegrityVerifierProps) {
  const [userInput, setUserInput] = useState('');

  const match = useMemo(() => {
    if (!userInput.trim()) return null;
    
    const cleanInput = userInput.trim().toLowerCase();
    const foundEntry = Object.entries(results).find(([_, hash]) => hash === cleanInput);
    
    if (foundEntry) {
      return {
        algo: foundEntry[0] as keyof HashResults,
        isValid: true
      };
    }
    
    return { isValid: false };
  }, [userInput, results]);

  const isInsecureMatch = match?.isValid && isAlgorithmInsecure(match.algo);

  return (
    <Card className="border-2 border-dashed border-muted-foreground/20 bg-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Verificador de Integridad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verify-hash" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
            Pega la firma de destino para comparar
          </Label>
          <div className="relative">
            <Input
              id="verify-hash"
              placeholder="ej. 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="font-code text-sm pr-10"
            />
            {match?.isValid && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            )}
            {match && !match.isValid && userInput && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
            )}
          </div>
        </div>

        {match?.isValid && (
          <div className={cn(
            "p-4 rounded-xl border flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300",
            isInsecureMatch 
              ? "bg-destructive/10 border-destructive/20 text-destructive" 
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          )}>
            {isInsecureMatch ? (
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="font-bold text-sm">
                {isInsecureMatch ? '¡Coincidencia Encontrada (Riesgo de Seguridad!)' : '¡Integridad Verificada!'}
              </p>
              <p className="text-xs opacity-90 leading-relaxed">
                {isInsecureMatch 
                  ? `La entrada coincide con la firma ${match.algo.toUpperCase()} generada. Advertencia: Este algoritmo es inseguro y no debe usarse para verificaciones críticas.`
                  : `La firma proporcionada es una coincidencia EXACTA para la firma ${match.algo.toUpperCase()} de este archivo.`}
              </p>
            </div>
          </div>
        )}

        {match && !match.isValid && userInput && (
          <div className="p-4 rounded-xl border bg-destructive/10 border-destructive/20 text-destructive flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <XCircle className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Discrepancia en la Firma</p>
              <p className="text-xs opacity-90">
                La firma proporcionada no coincide con ninguna de las firmas calculadas. El archivo puede haber sido modificado o estar corrupto.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
