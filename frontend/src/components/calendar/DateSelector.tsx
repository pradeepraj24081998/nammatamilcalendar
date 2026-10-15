'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface DateSelectorProps {
  currentDateStr: string;
  locale: Locale;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ currentDateStr, locale }) => {
  const router = useRouter();
  const dict = getDictionary(locale);

  const calculateDate = (offset: number) => {
    const d = new Date(currentDateStr);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const prevDate = calculateDate(-1);
  const nextDate = calculateDate(1);
  const todayDate = new Date().toISOString().split('T')[0];
  const isToday = currentDateStr === todayDate;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      router.push(`/${locale}/calendar/${e.target.value}`);
    }
  };

  return (
    <nav
      aria-label="Date Navigation"
      className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 bg-white border-2 border-[#EBDCCF] p-2.5 sm:p-3 rounded-2xl shadow-sm"
    >
      {/* Previous Day Button */}
      <button
        onClick={() => router.push(`/${locale}/calendar/${prevDate}`)}
        className="flex items-center space-x-1 sm:space-x-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FFF9F0] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all shadow-xs border border-[#EBDCCF] focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
        aria-label={`${dict.prevDay}: ${prevDate}`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{dict.prevDay}</span>
      </button>

      {/* Center: HTML5 Date Picker & Quick Today Button */}
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center">
          <CalendarIcon className="w-4 h-4 text-[#8B1515] absolute left-3 pointer-events-none" />
          <input
            type="date"
            value={currentDateStr}
            min="2024-01-01"
            max="2027-12-31"
            onChange={handleDateChange}
            aria-label={dict.selectDate}
            className="pl-9 pr-3 py-2 text-xs sm:text-sm font-extrabold rounded-xl border-2 border-[#EBDCCF] bg-[#FFFBF5] text-[#1F1517] focus:border-[#8B1515] focus:outline-none cursor-pointer shadow-xs"
          />
        </div>

        {!isToday && (
          <button
            onClick={() => router.push(`/${locale}`)}
            className="flex items-center space-x-1 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#8B1515] to-[#C93B2B] text-white hover:brightness-110 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>{dict.today}</span>
          </button>
        )}
      </div>

      {/* Next Day Button */}
      <button
        onClick={() => router.push(`/${locale}/calendar/${nextDate}`)}
        className="flex items-center space-x-1 sm:space-x-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FFF9F0] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all shadow-xs border border-[#EBDCCF] focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
        aria-label={`${dict.nextDay}: ${nextDate}`}
      >
        <span>{dict.nextDay}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
