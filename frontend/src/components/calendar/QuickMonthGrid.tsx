'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface QuickMonthGridProps {
  initialYear: number;
  locale: Locale;
}

export const QuickMonthGrid: React.FC<QuickMonthGridProps> = ({ initialYear, locale }) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear >= 2027 ? 2027 : 2026);
  const dict = getDictionary(locale);
  const isTa = locale === 'ta';

  return (
    <section
      aria-labelledby="quick-monthly-heading"
      className="bg-white border-2 border-[#EBDCCF] p-3.5 sm:p-6 md:p-7 rounded-3xl shadow-sm space-y-4 sm:space-y-5 max-w-full overflow-hidden"
    >
      {/* Header with Year Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-[#EBDCCF] pb-3.5 sm:pb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1515] shrink-0" />
          <h2 id="quick-monthly-heading" className="text-base sm:text-xl font-black text-[#8B1515]">
            {isTa ? `${selectedYear} மாதாந்திர காலண்டர் தாள்கள்` : `${selectedYear} Monthly Calendar Sheets`}
          </h2>
        </div>

        {/* 2026 & 2027 Pill Buttons */}
        <div className="flex items-center self-start sm:self-auto space-x-1.5 bg-[#FFF8E7] p-1 rounded-2xl border border-[#EBDCCF]">
          <button
            onClick={() => setSelectedYear(2026)}
            type="button"
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedYear === 2026
                ? 'bg-[#8B1515] text-white shadow-md'
                : 'text-[#8B1515] hover:bg-white/60'
            }`}
          >
            2026
          </button>
          <button
            onClick={() => setSelectedYear(2027)}
            type="button"
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedYear === 2027
                ? 'bg-[#8B1515] text-white shadow-md'
                : 'text-[#8B1515] hover:bg-white/60'
            }`}
          >
            2027
          </button>
        </div>
      </div>

      {/* 12 Months Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
        {dict.months.map((mName, idx) => {
          const monthNum = idx + 1;
          return (
            <Link
              key={`${selectedYear}-${monthNum}`}
              href={`/${locale}/calendar/month/${selectedYear}/${monthNum}`}
              className="p-3.5 rounded-2xl text-center bg-[#FFFDF8] border-2 border-[#EBDCCF] hover:border-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all group flex flex-col justify-between shadow-xs hover:shadow-md hover:scale-102"
            >
              <div>
                <span className="text-xs sm:text-sm font-black text-[#8B1515] group-hover:text-white block truncate">
                  {mName}
                </span>
                <span className="text-[11px] text-[#8C6200] group-hover:text-white/80 font-bold block mt-0.5">
                  {selectedYear}
                </span>
              </div>
              <div className="mt-2 pt-1 border-t border-[#EBDCCF]/60 group-hover:border-white/30 flex items-center justify-center space-x-1 text-[10px] text-[#8B1515] group-hover:text-white font-extrabold">
                <span>{isTa ? 'பார்க்க' : 'View'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Link to Full Year Overview */}
      <div className="pt-2 flex justify-end">
        <Link
          href={`/${locale}/calendar/year/${selectedYear}`}
          className="text-xs font-bold text-[#8B1515] hover:text-[#C93B2B] hover:underline flex items-center space-x-1"
        >
          <span>{isTa ? `${selectedYear} முழு வருட காலண்டர் சுருக்கம் காண்க` : `View full ${selectedYear} yearly summary`}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
