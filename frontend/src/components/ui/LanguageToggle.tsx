'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Locale } from '@/lib/types';

interface LanguageToggleProps {
  currentLocale: Locale;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLocale }) => {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    const segments = pathname.split('/');
    if (segments[1] === 'ta' || segments[1] === 'en') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-0.5 bg-black/30 border border-white/20 rounded-full p-0.5 text-[11px] sm:text-xs font-bold text-white shrink-0">
      <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 mr-0.5 text-[#FFD700] shrink-0 hidden xs:inline" aria-hidden="true" />
      <button
        onClick={() => switchLocale('ta')}
        className={`px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
          currentLocale === 'ta'
            ? 'bg-[#FFD700] text-[#700C0C] font-black shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-label="தமிழ்"
      >
        தமிழ்
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
          currentLocale === 'en'
            ? 'bg-[#FFD700] text-[#700C0C] font-black shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
