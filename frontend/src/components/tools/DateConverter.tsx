'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, CalendarDay } from '@/lib/types';
import { ArrowLeftRight, Calendar, Sparkles, Clock, CheckCircle2, Search, ArrowRight, RotateCcw } from 'lucide-react';
import data2026Raw from '@/data/calendar/2026.json';
import data2027Raw from '@/data/calendar/2027.json';
import { getTodayISTString } from '@/lib/dateUtils';

interface DateConverterProps {
  locale: Locale;
}

const allDays: CalendarDay[] = [
  ...(data2026Raw as unknown as CalendarDay[]),
  ...(data2027Raw as unknown as CalendarDay[]),
];

const dayMapByDate = new Map<string, CalendarDay>(allDays.map((d) => [d.date, d]));

const TAMIL_MONTHS = [
  'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி',
  'ஐப்பசி', 'கார்த்திகை', 'மார்கழி', 'தை', 'மாசி', 'பங்குனி'
];

export const DateConverter: React.FC<DateConverterProps> = ({ locale }) => {
  const isTa = locale === 'ta';

  // Compute current date (IST) or fallback to first available date in dataset
  const todayStr = getTodayISTString();
  const defaultEngDate = dayMapByDate.has(todayStr) ? todayStr : (allDays[0]?.date || '2026-01-01');
  const defaultDay = dayMapByDate.get(defaultEngDate) || allDays[0] || null;

  // Mode: 'engToTamil' or 'tamilToEng'
  const [mode, setMode] = useState<'engToTamil' | 'tamilToEng'>('engToTamil');

  // English to Tamil state - defaults to CURRENT DATE
  const [selectedEngDate, setSelectedEngDate] = useState(defaultEngDate);
  const [engResult, setEngResult] = useState<CalendarDay | null>(defaultDay);

  // Tamil to English state - defaults to current day's Tamil month and date
  const [selectedTamilYear, setSelectedTamilYear] = useState(defaultDay ? defaultDay.date.slice(0, 4) : '2026');
  const [selectedTamilMonth, setSelectedTamilMonth] = useState(defaultDay ? defaultDay.tamil_month : 'சித்திரை');
  const [selectedTamilDateNum, setSelectedTamilDateNum] = useState(defaultDay ? defaultDay.tamil_date : 1);
  const [tamilResult, setTamilResult] = useState<CalendarDay | null>(defaultDay);

  // Sync to live client-side today date on mount (prevents SSR date drift)
  useEffect(() => {
    const liveToday = getTodayISTString();
    if (dayMapByDate.has(liveToday)) {
      setSelectedEngDate(liveToday);
      const found = dayMapByDate.get(liveToday);
      if (found) {
        setEngResult(found);
        setSelectedTamilYear(found.date.slice(0, 4));
        setSelectedTamilMonth(found.tamil_month);
        setSelectedTamilDateNum(found.tamil_date);
        setTamilResult(found);
      }
    }
  }, []);

  const handleEngDateChange = (val: string) => {
    setSelectedEngDate(val);
    const found = dayMapByDate.get(val);
    setEngResult(found || null);
  };

  const handleResetToToday = () => {
    setSelectedEngDate(defaultEngDate);
    const found = dayMapByDate.get(defaultEngDate);
    setEngResult(found || null);
    if (found) {
      setSelectedTamilYear(found.date.slice(0, 4));
      setSelectedTamilMonth(found.tamil_month);
      setSelectedTamilDateNum(found.tamil_date);
      setTamilResult(found);
    }
  };

  const handleTamilLookup = () => {
    const found = allDays.find(
      (d) =>
        d.date.startsWith(selectedTamilYear) &&
        d.tamil_month === selectedTamilMonth &&
        d.tamil_date === Number(selectedTamilDateNum)
    );
    setTamilResult(found || null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex p-1.5 rounded-2xl bg-[#FFF9F0] border-2 border-[#EBDCCF] max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setMode('engToTamil')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            mode === 'engToTamil'
              ? 'bg-[#8B1515] text-white shadow-md'
              : 'text-[#8B1515] hover:bg-white/60'
          }`}
        >
          <span>{isTa ? 'ஆங்கிலம் ➔ தமிழ்' : 'English ➔ Tamil'}</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('tamilToEng')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            mode === 'tamilToEng'
              ? 'bg-[#8B1515] text-white shadow-md'
              : 'text-[#8B1515] hover:bg-white/60'
          }`}
        >
          <span>{isTa ? 'தமிழ் ➔ ஆங்கிலம்' : 'Tamil ➔ English'}</span>
        </button>
      </div>

      {/* Mode 1: English Date -> Tamil Date */}
      {mode === 'engToTamil' && (
        <div className="bg-white border-2 border-[#EBDCCF] p-5 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-black text-[#8B1515] uppercase tracking-wider">
                {isTa ? 'ஆங்கில தேதியைத் தேர்ந்தெடுக்கவும்:' : 'Select Gregorian English Date (2026 – 2027):'}
              </label>

              {/* Jump to Today Button */}
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
                value={selectedEngDate}
                onChange={(e) => handleEngDateChange(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-bold text-[#1F1517] focus:border-[#8B1515] focus:outline-none"
              />
              <span className="text-xs text-[#5C5256] font-semibold">
                {isTa ? `(இயல்புநிலை: இன்றைய தேதி ${defaultEngDate})` : `(Default: Today's Date ${defaultEngDate})`}
              </span>
            </div>
          </div>

          {engResult ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/50 pb-3">
                <span className="text-xs font-bold text-[#5C5256] uppercase">
                  {isTa ? 'கணிப்பு முடிவு (இன்றைய தமிழ் தேதி)' : 'Conversion Result'}
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#8B1515] text-white">
                  {selectedEngDate}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-[#5C5256] font-semibold block">{isTa ? 'தமிழ் தேதி:' : 'Tamil Date:'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#8B1515] block">
                    {engResult.tamil_month} {engResult.tamil_date}
                  </span>
                  <span className="text-xs font-bold text-[#5C5256] block">
                    {engResult.tamil_year} {isTa ? 'ஆண்டு' : 'Year'}
                  </span>
                </div>

                <div className="space-y-1 text-xs sm:text-sm font-semibold text-[#1F1517]">
                  <p><strong>{isTa ? 'திதி:' : 'Tithi:'}</strong> {engResult.panchangam?.tithi || '-'}</p>
                  <p><strong>{isTa ? 'நட்சத்திரம்:' : 'Nakshatra:'}</strong> {engResult.panchangam?.nakshatra || '-'}</p>
                  <p><strong>{isTa ? 'நல்ல நேரம்:' : 'Nalla Neram:'}</strong> {engResult.auspicious_timings?.nalla_neram_morning}</p>
                  {engResult.festival_info && (
                    <p className="text-[#8B1515] font-black">★ {engResult.festival_info}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/${locale}/calendar/${engResult.date}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8B1515] text-white text-xs font-black hover:bg-[#700C0C] transition-all"
                >
                  <span>{isTa ? 'முழு பஞ்சாங்கம் பார்க்க' : 'View Full Panchangam'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-600 font-bold">
              {isTa ? 'தேர்ந்தெடுக்கப்பட்ட தேதிக்கு தகவல் இல்லை (2026-2027 மட்டும்).' : 'Date out of supported range (2026–2027 only).'}
            </p>
          )}
        </div>
      )}

      {/* Mode 2: Tamil Date -> English Date */}
      {mode === 'tamilToEng' && (
        <div className="bg-white border-2 border-[#EBDCCF] p-5 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Year */}
            <div>
              <label className="block text-xs font-black text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'ஆண்டு:' : 'Year:'}
              </label>
              <select
                value={selectedTamilYear}
                onChange={(e) => setSelectedTamilYear(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-bold text-[#1F1517]"
              >
                <option value="2026">2026 (பராபவ)</option>
                <option value="2027">2027 (பிலவ)</option>
              </select>
            </div>

            {/* Tamil Month */}
            <div>
              <label className="block text-xs font-black text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'தமிழ் மாதம்:' : 'Tamil Month:'}
              </label>
              <select
                value={selectedTamilMonth}
                onChange={(e) => setSelectedTamilMonth(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-bold text-[#1F1517]"
              >
                {TAMIL_MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Tamil Date Num */}
            <div>
              <label className="block text-xs font-black text-[#8B1515] uppercase tracking-wider mb-1.5">
                {isTa ? 'தமிழ் தேதி (1 – 32):' : 'Tamil Date (1 – 32):'}
              </label>
              <input
                type="number"
                min={1}
                max={32}
                value={selectedTamilDateNum}
                onChange={(e) => setSelectedTamilDateNum(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-[#EBDCCF] bg-[#FFFDF8] text-sm font-bold text-[#1F1517]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleTamilLookup}
              className="px-6 py-2.5 rounded-xl bg-[#8B1515] hover:bg-[#700C0C] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{isTa ? 'ஆங்கில தேதியைக் கண்டறி' : 'Find English Date'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetToToday}
              className="px-4 py-2.5 rounded-xl bg-[#FFF9F0] border border-[#EBDCCF] text-[#8B1515] font-bold text-xs hover:bg-[#8B1515] hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isTa ? 'இன்றைய தேதிக்கு மாற்று' : 'Reset to Today'}</span>
            </button>
          </div>

          {tamilResult ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/50 pb-3">
                <span className="text-xs font-bold text-[#5C5256] uppercase">
                  {isTa ? 'ஆங்கில தேதி முடிவு' : 'Corresponding English Date'}
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#8B1515] text-white">
                  {tamilResult.tamil_month} {tamilResult.tamil_date}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-[#5C5256] font-semibold block">{isTa ? 'ஆங்கில கிரிகோரியன் தேதி:' : 'Gregorian Date:'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#8B1515] block">
                    {tamilResult.date}
                  </span>
                  <span className="text-xs font-bold text-[#5C5256] block">
                    {tamilResult.tamil_year} {isTa ? 'ஆண்டு' : 'Year'}
                  </span>
                </div>

                <div className="space-y-1 text-xs sm:text-sm font-semibold text-[#1F1517]">
                  <p><strong>{isTa ? 'திதி:' : 'Tithi:'}</strong> {tamilResult.panchangam?.tithi || '-'}</p>
                  <p><strong>{isTa ? 'நட்சத்திரம்:' : 'Nakshatra:'}</strong> {tamilResult.panchangam?.nakshatra || '-'}</p>
                  <p><strong>{isTa ? 'நல்ல நேரம்:' : 'Nalla Neram:'}</strong> {tamilResult.auspicious_timings?.nalla_neram_morning}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/${locale}/calendar/${tamilResult.date}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8B1515] text-white text-xs font-black hover:bg-[#700C0C] transition-all"
                >
                  <span>{isTa ? 'முழு விவரம் பார்க்க' : 'View Full Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-600 font-bold">
              {isTa ? 'குறிப்பிட்ட தமிழ் தேதிக்கு தகவல் கிடைக்கவில்லை.' : 'No calendar day matches this Tamil date in selected year.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
