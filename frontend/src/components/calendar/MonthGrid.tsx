'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles, Clock, AlertTriangle, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CalendarDay, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { AgalVilakkuIcon } from '../ui/CalendarIcons';

interface MonthGridProps {
  year: number;
  month: number;
  days: CalendarDay[];
  locale: Locale;
}

export const MonthGrid: React.FC<MonthGridProps> = ({ year, month, days, locale }) => {
  const router = useRouter();
  const dict = getDictionary(locale);
  const isTa = locale === 'ta';

  // Month navigation calculation
  const prevMonthDate = new Date(year, month - 2, 1);
  const nextMonthDate = new Date(year, month, 1);

  const prevYear = prevMonthDate.getFullYear();
  const prevMonth = prevMonthDate.getMonth() + 1;
  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = nextMonthDate.getMonth() + 1;

  // Determine starting weekday of month (0 = Monday, 6 = Sunday)
  const firstDayOfMonth = new Date(year, month - 1, 1);
  let startingWeekday = firstDayOfMonth.getDay() - 1;
  if (startingWeekday === -1) startingWeekday = 6;

  const todayStr = new Date().toISOString().split('T')[0];

  const dayMap = new Map<string, CalendarDay>();
  days.forEach((d) => dayMap.set(d.date, d));

  // Default selected date: today if in this month, else first day of month
  const defaultSelected = dayMap.has(todayStr) ? todayStr : `${year}-${String(month).padStart(2, '0')}-01`;
  const [selectedDateStr, setSelectedDateStr] = useState<string>(defaultSelected);

  const selectedDay = dayMap.get(selectedDateStr) || {
    id: 0,
    date: selectedDateStr,
    weekday: new Date(selectedDateStr).getDay() === 0 ? 6 : new Date(selectedDateStr).getDay() - 1,
    tamil_month: '',
    tamil_date: parseInt(selectedDateStr.split('-')[2], 10),
    tamil_year: '',
    is_muhurtham: false,
    status: 'S',
  } as CalendarDay;

  const selectedDateObj = new Date(selectedDateStr);
  const selectedDayNum = selectedDateObj.getDate();
  const selectedMonthName = dict.months[selectedDateObj.getMonth()];
  const selectedWeekdayName = dict.weekdays[selectedDateObj.getDay() === 0 ? 6 : selectedDateObj.getDay() - 1];

  const totalDaysInMonth = new Date(year, month, 0).getDate();
  const gridCells = [];

  for (let i = 0; i < startingWeekday; i++) {
    gridCells.push(null);
  }

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    gridCells.push({
      dateStr,
      dayNum: d,
      data: dayMap.get(dateStr),
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-[#EBDCCF] rounded-3xl p-4 sm:p-6 shadow-sm space-y-6">
        
        {/* Month Header Navigation (Crimson & Gold) */}
        <div className="bg-gradient-to-r from-[#8B1515] via-[#981414] to-[#780F0F] text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
          <button
            onClick={() => router.push(`/${locale}/calendar/month/${prevYear}/${prevMonth}`)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-white/15 hover:bg-[#FFD700] hover:text-[#780F0F] transition-all cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{dict.prevDay.replace('நாள்', 'மாதம்')}</span>
          </button>

          <div className="flex items-center space-x-2">
            <AgalVilakkuIcon className="w-5 h-5 text-[#FFD700]" />
            <h1 className="text-xl sm:text-3xl font-black text-white text-center">
              {dict.months[month - 1]} <span className="text-[#FFD700]">{year}</span>
            </h1>
          </div>

          <button
            onClick={() => router.push(`/${locale}/calendar/month/${nextYear}/${nextMonth}`)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-white/15 hover:bg-[#FFD700] hover:text-[#780F0F] transition-all cursor-pointer"
            aria-label="Next Month"
          >
            <span className="hidden sm:inline">{dict.nextDay.replace('நாள்', 'மாதம்')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday Labels Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-black uppercase tracking-wider py-2 bg-[#FFFDF8] rounded-xl border border-[#EBDCCF]">
          {dict.weekdays.map((w, idx) => (
            <div
              key={idx}
              className={idx === 6 ? 'text-[#C93B2B]' : 'text-[#8B1515]'}
            >
              {w.slice(0, 3)}
            </div>
          ))}
        </div>

        {/* Month Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {gridCells.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty-${idx}`} className="h-20 sm:h-28 bg-transparent" />;
            }

            const { dateStr, dayNum, data } = cell;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDateStr;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDateStr(dateStr)}
                type="button"
                className={`h-20 sm:h-28 p-1.5 sm:p-2 rounded-2xl border-2 transition-all flex flex-col justify-between text-left group cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#FFF8E7] border-[#8B1515] ring-3 ring-[#FFD700] shadow-lg scale-102 z-10'
                    : isToday
                    ? 'bg-rose-50 border-[#8B1515] ring-2 ring-[#8B1515]/30 shadow-xs'
                    : 'bg-[#FFFDF8] border-[#EBDCCF] hover:border-[#8B1515] hover:bg-[#FFFBF5] hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-black ${
                      isSelected
                        ? 'bg-[#8B1515] text-[#FFD700] shadow-sm'
                        : isToday
                        ? 'bg-[#8B1515] text-white shadow-xs'
                        : 'text-[#1F1517] group-hover:text-[#8B1515]'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {data?.tamil_date ? (
                    <span className="text-[10px] sm:text-xs font-extrabold text-[#C93B2B]">
                      {data.tamil_date}
                    </span>
                  ) : null}
                </div>

                {/* Day Indicators */}
                <div className="space-y-0.5 overflow-hidden w-full">
                  {data?.is_muhurtham && (
                    <span className="inline-flex items-center space-x-0.5 text-[9px] font-black text-[#78350F] bg-[#FEF3C7] px-1 py-0.5 rounded truncate w-full border border-amber-300">
                      <Sparkles className="w-2.5 h-2.5 shrink-0 text-amber-600" />
                      <span className="truncate">முகூர்த்தம்</span>
                    </span>
                  )}

                  {data?.festival_info && (
                    <span className="block text-[9px] font-bold text-white bg-[#C93B2B] px-1 py-0.5 rounded truncate shadow-xs">
                      {data.festival_info}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Section (Opens when clicking any date in calendar) */}
      <section
        aria-labelledby="selected-day-details-title"
        className="bg-white border-3 border-[#D4AF37] rounded-3xl p-5 sm:p-7 shadow-lg space-y-5 animate-in fade-in duration-200"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#EBDCCF] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B1515] to-[#C93B2B] text-white flex flex-col items-center justify-center shadow-md">
              <span className="text-xl font-black leading-none">{selectedDayNum}</span>
              <span className="text-[9px] uppercase font-bold text-[#FFD700] leading-none mt-0.5">{selectedMonthName.slice(0, 3)}</span>
            </div>
            <div>
              <h2 id="selected-day-details-title" className="text-lg sm:text-xl font-black text-[#8B1515] leading-tight">
                {selectedWeekdayName}, {selectedDayNum} {selectedMonthName} {year}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#78350F] mt-0.5">
                {selectedDay.tamil_month ? `${selectedDay.tamil_month} மாதம் ${selectedDay.tamil_date}-ம் நாள்` : ''} 
                {selectedDay.tamil_year ? ` • ${selectedDay.tamil_year} ஆண்டு` : ''}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedDay.is_muhurtham && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#700C0C] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-[#700C0C]" />
                <span>{dict.muhurthamDayBadge}</span>
              </span>
            )}
            {selectedDay.festival_info && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-[#C93B2B] text-white shadow-sm">
                <span>{selectedDay.festival_info}</span>
              </span>
            )}
            {selectedDay.day_auspicious && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border border-[#81C784]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>{selectedDay.day_auspicious}</span>
              </span>
            )}
          </div>
        </div>

        {/* Timings and Panchangam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Nalla Neram */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2.5">
            <div className="flex items-center space-x-2 text-[#15803D] font-bold text-sm border-b border-[#EBDCCF] pb-2">
              <Clock className="w-4 h-4 text-[#15803D]" />
              <span>{dict.nallaNeram}</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold text-[#1F1517]">
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.morning}:</span>
                <span className="font-extrabold text-[#15803D]">{selectedDay.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15'}</span>
              </div>
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.evening}:</span>
                <span className="font-extrabold text-[#15803D]">{selectedDay.auspicious_timings?.nalla_neram_evening || '04:45 - 05:45'}</span>
              </div>
              {selectedDay.auspicious_timings?.gowri_morning && (
                <div className="pt-1 border-t border-[#EBDCCF]/60">
                  <span className="text-[#5C5256] block text-[11px] font-medium">{dict.gowriNallaNeram}:</span>
                  <span className="font-bold text-[#8B1515]">{selectedDay.auspicious_timings.gowri_morning}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Inauspicious Timings */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2.5">
            <div className="flex items-center space-x-2 text-[#B91C1C] font-bold text-sm border-b border-[#EBDCCF] pb-2">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
              <span>{dict.inauspiciousTimings}</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold text-[#1F1517]">
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.rahuKalam}:</span>
                <span className="font-extrabold text-[#B91C1C]">{selectedDay.inauspicious_timings?.rahu_kalam || '10:30 - 12:00'}</span>
              </div>
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.yamagandam}:</span>
                <span className="font-extrabold text-[#B91C1C]">{selectedDay.inauspicious_timings?.yamagandam || '03:00 - 04:30'}</span>
              </div>
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.kuligai}:</span>
                <span className="font-bold text-[#1F1517]">{selectedDay.inauspicious_timings?.kuligai || '07:30 - 09:00'}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Panchangam */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2.5">
            <div className="flex items-center space-x-2 text-[#8B1515] font-bold text-sm border-b border-[#EBDCCF] pb-2">
              <Compass className="w-4 h-4 text-[#8B1515]" />
              <span>{dict.panchangam}</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold text-[#1F1517]">
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.tithi}:</span>
                <span className="font-extrabold text-[#8B1515]">{selectedDay.panchangam?.tithi || 'சதுர்த்தி'}</span>
              </div>
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.nakshatra}:</span>
                <span className="font-extrabold text-[#8B1515]">{selectedDay.panchangam?.nakshatra || 'அனுஷம்'}</span>
              </div>
              <div>
                <span className="text-[#5C5256] block text-[11px] font-medium">{dict.yogam}:</span>
                <span className="font-bold text-[#1F1517]">{selectedDay.panchangam?.yogam || 'சித்த யோகம்'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full Details Navigation CTA Button */}
        <div className="pt-2 text-center sm:text-right">
          <Link
            href={`/${locale}/calendar/${selectedDateStr}`}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-[#8B1515] to-[#C93B2B] text-white hover:brightness-110 shadow-md transition-all group"
          >
            <span>{isTa ? 'இன்றைய முழு காலண்டர் & ராசிபலன் காண்க' : 'View Full Day Details & Rasi Palan'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </section>
    </div>
  );
};
