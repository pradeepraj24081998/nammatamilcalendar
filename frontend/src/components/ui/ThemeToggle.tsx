'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('ntc-theme');
    if (stored) {
      const darkActive = stored === 'dark';
      setIsDark(darkActive);
      document.documentElement.classList.toggle('dark', darkActive);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Default is Light as specified in requirements, but support system if explicitly preferred
      const initialDark = prefersDark ? true : false;
      setIsDark(initialDark);
      document.documentElement.classList.toggle('dark', initialDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('ntc-theme', nextDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextDark);
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="p-2 rounded-full border border-[#E9E1D8] dark:border-[#382F35] text-[#70263B] dark:text-[#DFBA73] hover:bg-[#FFF9F0] dark:hover:bg-[#201B1E] transition-colors"
      >
        <Sun className="w-5 h-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      title={isDark ? 'Light Theme' : 'Dark Theme'}
      className="p-2 rounded-full border border-[#E9E1D8] dark:border-[#382F35] text-[#70263B] dark:text-[#DFBA73] hover:bg-[#FFF9F0] dark:hover:bg-[#201B1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45D]"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
