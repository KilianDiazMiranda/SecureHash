// page.tsx — lógica principal del archivo

import { SecureHashApp } from '@/components/SecureHashApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Header />
      <main className="flex-1 flex flex-col gap-8">
        <SecureHashApp />
      </main>
      <Footer />
    </div>
  );
}
