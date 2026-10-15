'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Heart } from 'lucide-react';
import { YearCalendarResponse, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon } from '../ui/CalendarIcons';

interface YearGridProps {
  yearData: YearCalendarResponse;
  locale: Locale;
}

export const YearGrid: React.FC<YearGridProps> = ({ yearData, locale }) => {
  const router = useRouter();
  const dict = getDictionary(locale);
  const { year, total_days, muhurtham_count, festivals_count, months } = yearData;

  return (
    <div className="space-y-8">
      
      {/* Year Hero Header & Stats */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#FFD700] font-black flex items-center space-x-1.5">
            <AgalVilakkuIcon className="w-4 h-4 inline-block" />
            <span>{dict.yearlyCalendar}</span>
          </span>
          <div className="flex items-center space-x-4 mt-1">
            <button
              onClick={() => router.push(`/${locale}/calendar/year/${year - 1}`)}
              className="p-2 rounded-full bg-white/15 hover:bg-[#FFD700] hover:text-[#700C0C] transition-colors cursor-pointer"
              aria-label="Previous Year"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
              {year}
            </h1>
            <button
              onClick={() => router.push(`/${locale}/calendar/year/${year + 1}`)}
              className="p-2 rounded-full bg-white/15 hover:bg-[#FFD700] hover:text-[#700C0C] transition-colors cursor-pointer"
              aria-label="Next Year"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-black/30 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/15 text-center min-w-[100px]">
            <span className="text-xs text-[#FFF9F0]/85 block font-semibold">
              {locale === 'ta' ? 'நாட்கள்' : 'Days'}
            </span>
            <span className="text-2xl font-black text-[#FFD700]">{total_days}</span>
          </div>
          <div className="bg-black/30 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/15 text-center min-w-[100px]">
            <span className="text-xs text-[#FFF9F0]/85 block font-semibold">
              {locale === 'ta' ? 'சுப முகூர்த்தம்' : 'Muhurtham'}
            </span>
            <span className="text-2xl font-black text-[#FFD700]">{muhurtham_count}</span>
          </div>
          <div className="bg-black/30 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/15 text-center min-w-[100px]">
            <span className="text-xs text-[#FFF9F0]/85 block font-semibold">
              {locale === 'ta' ? 'பண்டிகைகள்' : 'Festivals'}
            </span>
            <span className="text-2xl font-black text-[#FFD700]">{festivals_count}</span>
          </div>
        </div>
      </div>

      {/* 12 Months Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {months.map((m) => {
          const monthName = dict.months[m.month - 1];
          return (
            <Link
              key={m.month}
              href={`/${locale}/calendar/month/${year}/${m.month}`}
              className="bg-white dark:bg-[#1D1418] border-2 border-[#EBDCCF] dark:border-[#38242A] p-5 rounded-3xl hover:border-[#8B1515] hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#EBDCCF] dark:border-[#38242A] pb-3">
                  <h2 className="text-xl font-black text-[#8B1515] dark:text-[#FFD700] group-hover:text-[#C93B2B] transition-colors">
                    {monthName}
                  </h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFFDF8] dark:bg-[#150E11] text-[#8B1515] dark:text-[#FFD700] border border-[#EBDCCF] dark:border-[#38242A]">
                    {m.days_count} {locale === 'ta' ? 'நாட்கள்' : 'Days'}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                    <span className="flex items-center space-x-1.5 font-bold text-amber-800 dark:text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{dict.muhurthamDayBadge}</span>
                    </span>
                    <span className="font-black text-sm text-amber-900 dark:text-amber-200">{m.muhurtham_count}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                    <span className="flex items-center space-x-1.5 font-bold text-rose-800 dark:text-rose-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{dict.festivals}</span>
                    </span>
                    <span className="font-black text-sm text-rose-900 dark:text-rose-200">{m.festivals_count}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EBDCCF]/60 dark:border-[#38242A]/60 flex items-center justify-between text-xs font-black text-[#8B1515] dark:text-[#FFD700]">
                <span>{locale === 'ta' ? 'மாதாந்திர காலண்டர் திறக்க' : 'Open Month Sheet'}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
