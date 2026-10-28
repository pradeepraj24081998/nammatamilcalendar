'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, CalendarDays, Heart, Sparkles, Download, Clock } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getISTCurrentYearAndMonth } from '@/lib/dateUtils';
import { usePWA } from '@/components/pwa/PWAContext';

interface BottomNavProps {
  locale: Locale;
}

export const BottomNav: React.FC<BottomNavProps> = ({ locale }) => {
  const pathname = usePathname();
  const { isInstalled, setShowInstallModal } = usePWA();
  const isTa = locale === 'ta';

  const istDate = getISTCurrentYearAndMonth();
  const is2027 = pathname.includes('/2027');
  const activeYear = is2027 ? 2027 : istDate.year;
  const currentMonth = istDate.month;

  const navItems = [
    {
      id: 'today',
      href: `/${locale}`,
      label: isTa ? 'இன்று' : 'Today',
      icon: Calendar,
      isActive: pathname === `/${locale}` || pathname === `/${locale}/`,
    },
    {
      id: 'month',
      href: `/${locale}/calendar/month/${activeYear}/${currentMonth}`,
      label: isTa ? 'மாதம்' : 'Month',
      icon: CalendarDays,
      isActive: pathname.includes('/calendar/month') || pathname === `/${locale}/calendar`,
    },
    {
      id: 'muhurtham',
      href: `/${locale}/muhurtham-dates?year=${activeYear}`,
      label: isTa ? 'முகூர்த்தம்' : 'Muhurtham',
      icon: Heart,
      isActive: pathname.includes('/muhurtham-dates'),
    },
    {
      id: 'festivals',
      href: `/${locale}/festivals?year=${activeYear}`,
      label: isTa ? 'பண்டிகை' : 'Festivals',
      icon: Sparkles,
      isActive: pathname.includes('/festivals'),
    },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label={isTa ? 'கீழ் வழிசெலுத்தல்' : 'Bottom Navigation'}
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1E1113]/95 backdrop-blur-md border-t border-[#EBDCCF] dark:border-[#3D2529] shadow-[0_-4px_25px_rgba(139,21,21,0.08)] transition-all"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.35rem)',
      }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center px-1 pt-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                item.isActive
                  ? 'text-[#8B1515] dark:text-[#FFD700] font-black'
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#8B1515] dark:hover:text-[#FFD700]'
              }`}
            >
              <div
                className={`relative flex items-center justify-center p-1 rounded-xl transition-all ${
                  item.isActive
                    ? 'bg-[#8B1515]/10 dark:bg-[#FFD700]/15 scale-110'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 5th Item: If not installed -> 'நிறுவு' (Install). If already installed -> 'வருடம்' (Yearly Calendar) */}
        {!isInstalled ? (
          <button
            onClick={() => setShowInstallModal(true)}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all text-[#8B1515] dark:text-[#FFD700] relative cursor-pointer group"
            aria-label={isTa ? 'ஆப் நிறுவுதல்' : 'Install App'}
          >
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-tr from-[#FFD700] via-[#FFA000] to-[#E67E22] text-[#700C0C] shadow-xs group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5 shrink-0 stroke-[2.5] animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-black leading-tight tracking-tight mt-0.5 text-[#700C0C] dark:text-[#FFD700] truncate max-w-full">
              {isTa ? 'நிறுவு' : 'Install'}
            </span>
          </button>
        ) : (
          <Link
            href={`/${locale}/calendar/year/${activeYear}`}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
              pathname.includes('/calendar/year')
                ? 'text-[#8B1515] dark:text-[#FFD700] font-black'
                : 'text-gray-500 dark:text-gray-400 hover:text-[#8B1515] dark:hover:text-[#FFD700]'
            }`}
          >
            <div
              className={`relative flex items-center justify-center p-1 rounded-xl transition-all ${
                pathname.includes('/calendar/year')
                  ? 'bg-[#8B1515]/10 dark:bg-[#FFD700]/15 scale-110'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Clock className="w-5 h-5 shrink-0" />
              {pathname.includes('/calendar/year') && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] leading-tight tracking-tight mt-0.5 truncate max-w-full">
              {isTa ? 'வருடம்' : 'Year'}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};
