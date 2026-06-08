'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function useDarkMode() {
  const isDarkMode = useAppStore((s) => s.isDarkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
}
