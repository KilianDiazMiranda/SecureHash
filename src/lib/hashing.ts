// hashing.ts — lógica principal del archivo

import * as hashWasm from 'hash-wasm';

export interface HashResults {
  sha256: string;
  sha512: string;
  sha3_256: string;
  sha3_512: string;
  blake2b: string;
  blake3: string;
}

export type ProgressCallback = (percent: number) => void;

const CHUNK_SIZE = 10 * 1024 * 1024;

// Bloque principal: define o encapsula esta parte de la aplicación.
export async function calculateHashes(file: File, onProgress?: ProgressCallback): Promise<HashResults> {
  const hashers = await Promise.all([
    hashWasm.createSHA256(),
    hashWasm.createSHA512(),
    hashWasm.createSHA3(256),
    hashWasm.createSHA3(512),
    hashWasm.createBLAKE2b(),
    hashWasm.createBLAKE3(),
  ]);

  const [sha256, sha512, sha3_256, sha3_512, blake2b, blake3] = hashers;

  hashers.forEach(h => h.init());

  let offset = 0;
  const totalSize = file.size;

  while (offset < totalSize) {
    const chunk = file.slice(offset, offset + CHUNK_SIZE);
    const buffer = await chunk.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    
    hashers.forEach(h => h.update(uint8Array));
    
    offset += CHUNK_SIZE;
    if (onProgress) {
      onProgress(Math.min(100, Math.round((offset / totalSize) * 100)));
    }
  }

  return {
    sha256: sha256.digest(),
    sha512: sha512.digest(),
    sha3_256: sha3_256.digest(),
    sha3_512: sha3_512.digest(),
    blake2b: blake2b.digest(),
    blake3: blake3.digest(),
  };
}

// Bloque principal: define o encapsula esta parte de la aplicación.
export function isAlgorithmInsecure(algo: keyof HashResults): boolean {
  return false;
}
