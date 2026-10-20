'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { getTodayISTString } from '@/lib/api';

interface DateSelectorProps {
  currentDateStr: string;
  locale: Locale;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ currentDateStr, locale }) => {
  const router = useRouter();
  const dict = getDictionary(locale);
  const isTa = locale === 'ta';

  const calculateDate = (baseStr: string, offset: number) => {
    const d = new Date(baseStr);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const prevDate = calculateDate(currentDateStr, -1);
  const nextDate = calculateDate(currentDateStr, 1);
  
  const todayDate = getTodayISTString();
  const yesterdayDate = calculateDate(todayDate, -1);
  const tomorrowDate = calculateDate(todayDate, 1);

  const isToday = currentDateStr === todayDate;
  const isYesterday = currentDateStr === yesterdayDate;
  const isTomorrow = currentDateStr === tomorrowDate;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      router.push(`/${locale}/calendar/${e.target.value}`);
    }
  };

  return (
    <nav
      aria-label="Date Navigation"
      className="bg-white border-2 border-[#EBDCCF] p-2.5 sm:p-3.5 rounded-2xl shadow-sm space-y-2.5 max-w-full overflow-hidden"
    >
      {/* 1. Quick Triad Row: Yesterday | Today | Tomorrow (Inspired by TamilDailyCalendar) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <button
          onClick={() => router.push(`/${locale}/calendar/${yesterdayDate}`)}
          type="button"
          className={`py-1.5 sm:py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center truncate ${
            isYesterday
              ? 'bg-[#8B1515] text-white shadow-xs'
              : 'bg-[#FFF9F0] text-[#700C0C] border border-[#EBDCCF] hover:bg-[#8B1515] hover:text-white'
          }`}
        >
          {isTa ? 'நேற்று' : 'Yesterday'}
        </button>

        <button
          onClick={() => router.push(`/${locale}`)}
          type="button"
          className={`py-1.5 sm:py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center truncate flex items-center justify-center space-x-1 ${
            isToday
              ? 'bg-[#8B1515] text-white shadow-md ring-2 ring-[#FFD700]'
              : 'bg-[#FFF9F0] text-[#700C0C] border border-[#EBDCCF] hover:bg-[#8B1515] hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#FFD700]" />
          <span>{isTa ? 'இன்று' : 'Today'}</span>
        </button>

        <button
          onClick={() => router.push(`/${locale}/calendar/${tomorrowDate}`)}
          type="button"
          className={`py-1.5 sm:py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center truncate ${
            isTomorrow
              ? 'bg-[#8B1515] text-white shadow-xs'
              : 'bg-[#FFF9F0] text-[#700C0C] border border-[#EBDCCF] hover:bg-[#8B1515] hover:text-white'
          }`}
        >
          {isTa ? 'நாளை' : 'Tomorrow'}
        </button>
      </div>

      {/* 2. Stepper & Custom Date Picker Row */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Previous Day Stepper */}
        <button
          onClick={() => router.push(`/${locale}/calendar/${prevDate}`)}
          type="button"
          className="flex items-center justify-center space-x-1 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FFF9F0] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all shadow-xs border border-[#EBDCCF] shrink-0 cursor-pointer"
          aria-label={`${dict.prevDay}: ${prevDate}`}
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          <span className="hidden xs:inline">{dict.prevDay}</span>
        </button>

        {/* Center: HTML5 Date Picker */}
        <div className="relative flex-1 max-w-[240px] flex items-center justify-center">
          <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B1515] absolute left-2.5 pointer-events-none" />
          <input
            type="date"
            value={currentDateStr}
            min="2026-01-01"
            max="2027-12-31"
            onChange={handleDateChange}
            aria-label={dict.selectDate}
            className="w-full pl-8 sm:pl-9 pr-2 py-1.5 sm:py-2 text-xs sm:text-sm font-extrabold rounded-xl border-2 border-[#EBDCCF] bg-[#FFFBF5] text-[#1F1517] focus:border-[#8B1515] focus:outline-none cursor-pointer shadow-xs text-center"
          />
        </div>

        {/* Next Day Stepper */}
        <button
          onClick={() => router.push(`/${locale}/calendar/${nextDate}`)}
          type="button"
          className="flex items-center justify-center space-x-1 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FFF9F0] text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all shadow-xs border border-[#EBDCCF] shrink-0 cursor-pointer"
          aria-label={`${dict.nextDay}: ${nextDate}`}
        >
          <span className="hidden xs:inline">{dict.nextDay}</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </nav>
  );
};
