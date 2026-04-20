'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Loader from '@/components/Loader';
import AppShell from '@/components/AppShell';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-white">
      <AnimatePresence>
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 
        We render AppShell immediately but it might be hidden behind the loader.
        This allows assets to start loading.
      */}
      <AppShell />
    </main>
  );
}
