// SecureHashApp.tsx — lógica principal del archivo
"use client";

import React, { useState, useCallback } from 'react';
import { Dropzone } from './Dropzone';
import { HashResultsGrid } from './HashResultsGrid';
import { IntegrityVerifier } from './IntegrityVerifier';
import { calculateHashes, HashResults } from '@/lib/hashing';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { FileText, X } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { formatFileSize } from '@/lib/utils';

// Bloque principal: define o encapsula esta parte de la aplicación.
export function SecureHashApp() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<HashResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResults(null);

    try {
      const hashes = await calculateHashes(selectedFile, (p) => setProgress(p));
      setResults(hashes);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al procesar el archivo. Asegúrate de que sea un archivo local válido.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = () => {
    setFile(null);
    setResults(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file && <Dropzone onFileSelect={handleFileSelect} disabled={isProcessing} />}

      {file && (
        <Card className="overflow-hidden border-2 border-primary/10">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-secondary rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="truncate">
                  <h3 className="font-semibold truncate text-foreground">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={reset} 
                className="hover:bg-destructive/10 hover:text-destructive shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-primary animate-pulse">Calculando firmas...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error en el Cálculo</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && !isProcessing && (
        <div className="flex flex-col gap-6">
          <IntegrityVerifier results={results} />
          <HashResultsGrid results={results} />
        </div>
      )}
    </div>
  );
}
