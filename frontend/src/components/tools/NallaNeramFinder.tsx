'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, CalendarDay } from '@/lib/types';
import { Clock, AlertTriangle, Sparkles, Sun, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { AuspiciousSunIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import data2026Raw from '@/data/calendar/2026.json';
import data2027Raw from '@/data/calendar/2027.json';
import { getTodayISTString } from '@/lib/dateUtils';

interface NallaNeramFinderProps {
  locale: Locale;
}

const allDays: CalendarDay[] = [
  ...(data2026Raw as unknown as CalendarDay[]),
  ...(data2027Raw as unknown as CalendarDay[]),
];

const dayMapByDate = new Map<string, CalendarDay>(allDays.map((d) => [d.date, d]));

export const NallaNeramFinder: React.FC<NallaNeramFinderProps> = ({ locale }) => {
  const isTa = locale === 'ta';
  const todayStr = getTodayISTString();
  const defaultDate = dayMapByDate.has(todayStr) ? todayStr : (allDays[0]?.date || '2026-01-01');

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [dayData, setDayData] = useState<CalendarDay | null>(dayMapByDate.get(defaultDate) || allDays[0]);

  // Sync to live client-side today date on mount (prevents SSR date drift)
  useEffect(() => {
    const liveToday = getTodayISTString();
    if (dayMapByDate.has(liveToday)) {
      setSelectedDate(liveToday);
      const found = dayMapByDate.get(liveToday);
      if (found) {
        setDayData(found);
      }
    }
  }, []);

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    const found = dayMapByDate.get(dateStr);
    setDayData(found || null);
  };

  const handleResetToToday = () => {
    setSelectedDate(defaultDate);
    const found = dayMapByDate.get(defaultDate);
    setDayData(found || null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-[#EBDCCF] p-5 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs sm:text-sm font-black text-[#8B1515] uppercase tracking-wider">
              {isTa ? 'சுப நேரம் பார்க்க விரும்பும் தேதியைத் தேர்ந்தெடுக்கவும்:' : 'Select Date to View Timings (2026 – 2027):'}
            </label>
            <button
              type="button"
              onClick={handleResetToToday}
              className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold bg-[#FFF9F0] text-[#8B1515] border border-[#EBDCCF] hover:bg-[#8B1515] hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isTa ? 'இன்று' : 'Today'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="date"
              min="2026-01-01"
              max="2027-12-31"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-bold text-[#1F1517] focus:border-[#8B1515] focus:outline-none"
            />
            <span className="text-xs text-[#5C5256] font-semibold">
              {isTa ? `(இயல்புநிலை: இன்றைய தேதி ${defaultDate})` : `(Default: Today's Date ${defaultDate})`}
            </span>
          </div>
        </div>

        {dayData ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Day Title Ribbon */}
            <div className="p-4 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-base sm:text-lg font-black text-[#8B1515] block">
                  {dayData.date} • {dayData.tamil_month} {dayData.tamil_date} ({dayData.tamil_year})
                </span>
                <span className="text-xs text-[#5C5256] font-semibold">
                  {dayData.day_auspicious || dayData.festival_info || (isTa ? 'சுப தினம்' : 'Regular Day')}
                </span>
              </div>
              {dayData.is_muhurtham && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 self-start sm:self-center">
                  ★ {isTa ? 'சுப முகூர்த்த நாள்' : 'Muhurtham Day'}
                </span>
              )}
            </div>

            {/* Auspicious Timings Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nalla Neram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-2 border-[#86EFAC] space-y-2">
                <div className="flex items-center justify-between border-b border-emerald-300/60 pb-2">
                  <div className="flex items-center space-x-2 text-emerald-900 font-black text-sm">
                    <AuspiciousSunIcon className="w-5 h-5 text-emerald-700" />
                    <span>{isTa ? 'நல்ல நேரம்' : 'Nalla Neram'}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">சுபம்</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm font-bold text-emerald-950">
                  <div className="flex justify-between">
                    <span className="text-emerald-800">{isTa ? 'காலை:' : 'Morning:'}</span>
                    <span>{dayData.auspicious_timings?.nalla_neram_morning || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800">{isTa ? 'மாலை:' : 'Evening:'}</span>
                    <span>{dayData.auspicious_timings?.nalla_neram_evening || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Gowri Nalla Neram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-2 border-[#FCD34D] space-y-2">
                <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
                  <div className="flex items-center space-x-2 text-amber-900 font-black text-sm">
                    <AgalVilakkuIcon className="w-5 h-5 text-amber-700" />
                    <span>{isTa ? 'கௌரி நல்ல நேரம்' : 'Gowri Nalla Neram'}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">கௌரி</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm font-bold text-amber-950">
                  <div className="flex justify-between">
                    <span className="text-amber-800">{isTa ? 'காலை:' : 'Morning:'}</span>
                    <span>{dayData.auspicious_timings?.gowri_morning || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">{isTa ? 'மாலை:' : 'Evening:'}</span>
                    <span>{dayData.auspicious_timings?.gowri_evening || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inauspicious Timings Cards */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF5F5] border border-rose-200 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{isTa ? 'தவிர்க்க வேண்டிய அசுப நேரங்கள்' : 'Inauspicious Timings to Avoid'}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                  <span className="text-[11px] font-bold text-rose-700 block">{isTa ? 'இராகு காலம்' : 'Rahu Kalam'}</span>
                  <span className="text-xs sm:text-sm font-black text-rose-950 block mt-0.5">
                    {dayData.inauspicious_timings?.rahu_kalam || '-'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-700 block">{isTa ? 'எமகண்டம்' : 'Yamagandam'}</span>
                  <span className="text-xs sm:text-sm font-black text-amber-950 block mt-0.5">
                    {dayData.inauspicious_timings?.yamagandam || '-'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-purple-200">
                  <span className="text-[11px] font-bold text-purple-700 block">{isTa ? 'குளிகை' : 'Kuligai'}</span>
                  <span className="text-xs sm:text-sm font-black text-purple-950 block mt-0.5">
                    {dayData.inauspicious_timings?.kuligai || '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Link to Full Day Panchangam */}
            <div className="flex justify-end pt-2">
              <Link
                href={`/${locale}/calendar/${dayData.date}`}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-[#8B1515] text-white text-xs font-black hover:bg-[#700C0C] transition-all shadow-xs"
              >
                <span>{isTa ? 'இந்த நாளின் முழு பஞ்சாங்கம் பார்க்க' : 'View Complete Panchangam Card'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xs text-rose-600 font-bold">
            {isTa ? 'தேர்ந்தெடுக்கப்பட்ட தேதிக்கு தகவல் இல்லை.' : 'Date not found.'}
          </p>
        )}
      </div>
    </div>
  );
};
