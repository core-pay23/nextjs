'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamic import to prevent SSR issues
const ClientProviders = dynamic(
  () => import('./ClientProviders').then(mod => ({ default: mod.ClientProviders })),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

export function AppProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return <ClientProviders>{children}</ClientProviders>;
}
