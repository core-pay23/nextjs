'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Dynamic import to prevent SSR issues
const ClientProviders = dynamic(
  () => import('./ClientProviders').then(mod => ({ default: mod.ClientProviders })),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export function AppProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show loading spinner until mounted
    return <LoadingSpinner />;
  }

  return <ClientProviders>{children}</ClientProviders>;
}
