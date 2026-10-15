import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDay, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import {
  AgalVilakkuIcon,
  TempleBellIcon,
  MoonPhaseIcon,
  AuspiciousSunIcon,
  RasiIcon,
} from '../ui/CalendarIcons';
import {
  Sparkles,
  Clock,
  AlertTriangle,
  Compass,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunrise,
  CheckCircle2,
} from 'lucide-react';

interface DailyCalendarCardProps {
  day: CalendarDay;
  locale: Locale;
}

export const DailyCalendarCard: React.FC<DailyCalendarCardProps> = ({ day, locale }) => {
  const dict = getDictionary(locale);

  // Parse Gregorian date
  const dateObj = new Date(day.date);
  const dayNumber = dateObj.getDate();
  const monthName = dict.months[dateObj.getMonth()];
  const yearNumber = dateObj.getFullYear();
  const weekdayName = dict.weekdays[day.weekday];

  // Helper for yesterday and tomorrow strings
  const calcDate = (offset: number) => {
    const d = new Date(day.date);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const prevDate = calcDate(-1);
  const nextDate = calcDate(1);
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = day.date === todayStr;

  return (
    <div className="space-y-6">
      {/* Authentic Tamil Daily Calendar Sheet (தினசரி நாட்காட்டி அட்டை) */}
      <article className="calendar-sheet">
        
        {/* Ornate Top Header with Traditional Artwork */}
        <div className="relative bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-4 sm:p-6 text-center overflow-hidden border-b-4 border-[#FFD700]">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
            <Image
              src="/images/calendar_banner.jpg"
              alt="Decorative Temple Artwork"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-center space-x-2 text-[#FFD700] text-xs sm:text-sm font-bold tracking-widest uppercase">
              <AgalVilakkuIcon className="w-5 h-5 inline-block" />
              <span>நம்ம தமிழ் காலண்டர் • {yearNumber}</span>
              <AgalVilakkuIcon className="w-5 h-5 inline-block" />
            </div>

            {/* Gregorian Month & Weekday */}
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              {weekdayName} • <span className="text-[#FFD700]">{monthName} {yearNumber}</span>
            </h1>

            {/* Tamil Month and Tamil Date */}
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#FFD700]/40 mt-1 shadow-sm">
              <span className="text-xs sm:text-sm font-extrabold text-[#FFE082]">
                {day.tamil_month} மாதம் <span className="text-white text-base sm:text-lg">{day.tamil_date}</span>-ம் நாள்
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-[#FFF9F0] font-medium">
                {day.tamil_year} {locale === 'ta' ? 'ஆண்டு' : 'Year'}
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Pad Body (White/Creamy Background with Giant Numeric Date) */}
        <div className="p-5 sm:p-8 bg-[#FFFDF8] space-y-6">
          
          {/* Giant Numeric Date Display */}
          <div className="text-center pt-4 pb-2 relative">
            <div className="inline-block relative">
              <span className="text-7xl sm:text-9xl font-black tracking-tight text-[#8B1515] drop-shadow-xs font-serif leading-none block">
                {dayNumber}
              </span>
              <span className="block text-xs uppercase tracking-widest font-bold text-[#8C6200] mt-2">
                {locale === 'ta' ? 'ஆங்கில தேதி' : 'Gregorian Date'}
              </span>
            </div>

            {/* Special Badges (Muhurtham, Festival, Kari Naal, Observances) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {day.is_muhurtham && (
                <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#700C0C] shadow-md border border-[#FFE082] animate-bounce">
                  <Sparkles className="w-4 h-4 fill-[#700C0C]" />
                  <span>{dict.muhurthamDayBadge}</span>
                </span>
              )}

              {day.festival_info && (
                <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#C93B2B] to-[#981414] text-white shadow-md">
                  <TempleBellIcon className="w-4 h-4 text-[#FFD700]" />
                  <span>{day.festival_info}</span>
                </span>
              )}

              {day.festival_addon && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3E0] dark:bg-[#2C1F1A] text-[#D35400] dark:text-[#FFAB91] border border-[#FFB74D]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{day.festival_addon}</span>
                </span>
              )}

              {day.day_auspicious && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] dark:bg-[#182B1B] text-[#1B5E20] dark:text-[#A5D6A7] border border-[#81C784]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{day.day_auspicious}</span>
                </span>
              )}
            </div>
          </div>

          {/* 3. Auspicious & Inauspicious Timings Colorful Cards */}
          <section aria-labelledby="timings-heading" className="space-y-4">
            <h2 id="timings-heading" className="text-lg font-bold text-[#8B1515] dark:text-[#FFD700] flex items-center space-x-2 border-b-2 border-[#EBDCCF] dark:border-[#38242A] pb-2">
              <Clock className="w-5 h-5 text-[#C93B2B]" />
              <span>{locale === 'ta' ? 'இன்றைய நல்ல நேரம் & அசுப நேரங்கள்' : 'Auspicious & Inauspicious Timings'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Nalla Neram (Emerald Green) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#112415] dark:to-[#17301C] border-2 border-[#86EFAC] dark:border-[#22C55E]/40 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#86EFAC]/50 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <AuspiciousSunIcon className="w-5 h-5" />
                    <span className="font-extrabold text-sm text-[#14532D] dark:text-[#86EFAC] uppercase tracking-wide">
                      {dict.nallaNeram}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16A34A] text-white">சுபம்</span>
                </div>
                <div className="space-y-1 text-sm font-bold text-[#14532D] dark:text-[#DCFCE7]">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#166534] dark:text-[#86EFAC] font-semibold">{dict.morning}:</span>
                    <span>{day.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#166534] dark:text-[#86EFAC] font-semibold">{dict.evening}:</span>
                    <span>{day.auspicious_timings?.nalla_neram_evening || '02:00 - 03:00'}</span>
                  </div>
                </div>
              </div>

              {/* Gowri Nalla Neram (Royal Golden Amber) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] dark:from-[#292010] dark:to-[#332612] border-2 border-[#FCD34D] dark:border-[#D4AF37]/40 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#FCD34D]/50 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <AgalVilakkuIcon className="w-5 h-5" />
                    <span className="font-extrabold text-sm text-[#78350F] dark:text-[#FDE68A] uppercase tracking-wide">
                      {dict.gowriNallaNeram}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D97706] text-white">கௌரி</span>
                </div>
                <div className="space-y-1 text-sm font-bold text-[#78350F] dark:text-[#FEF3C7]">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#92400E] dark:text-[#FCD34D] font-semibold">{dict.morning}:</span>
                    <span>{day.auspicious_timings?.gowri_morning || '12:15 - 01:15'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#92400E] dark:text-[#FCD34D] font-semibold">{dict.evening}:</span>
                    <span>{day.auspicious_timings?.gowri_evening || '06:30 - 07:30'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inauspicious Timings (Rahu Kalam, Yamagandam, Kuligai) - Vibrant 3-Column Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF5F5] via-[#FFF8F0] to-[#FAF5FF] dark:from-[#241315] dark:via-[#261A13] dark:to-[#1F1429] border border-[#EBDCCF] dark:border-[#38242A] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C93B2B] dark:text-[#FF8A80] flex items-center space-x-1.5 mb-3">
                <AlertTriangle className="w-4 h-4 text-[#C93B2B]" />
                <span>{dict.inauspiciousTimings}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Rahu Kalam */}
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-rose-200 dark:border-rose-900/50">
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 block">{dict.rahuKalam}</span>
                  <span className="text-sm font-black text-rose-900 dark:text-rose-200 mt-0.5 block">
                    {day.inauspicious_timings?.rahu_kalam || '10:30 AM - 12:00 PM'}
                  </span>
                </div>

                {/* Yamagandam */}
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-amber-200 dark:border-amber-900/50">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">{dict.yamagandam}</span>
                  <span className="text-sm font-black text-amber-900 dark:text-amber-200 mt-0.5 block">
                    {day.inauspicious_timings?.yamagandam || '03:00 PM - 04:30 PM'}
                  </span>
                </div>

                {/* Kuligai */}
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-purple-200 dark:border-purple-900/50">
                  <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 block">{dict.kuligai}</span>
                  <span className="text-sm font-black text-purple-900 dark:text-purple-200 mt-0.5 block">
                    {day.inauspicious_timings?.kuligai || '07:30 AM - 09:00 AM'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Panchangam Details Table (பஞ்சாங்கம்) */}
          <section aria-labelledby="panchangam-heading" className="space-y-4">
            <h2 id="panchangam-heading" className="text-lg font-bold text-[#8B1515] dark:text-[#FFD700] flex items-center space-x-2 border-b-2 border-[#EBDCCF] dark:border-[#38242A] pb-2">
              <Compass className="w-5 h-5 text-[#8B1515] dark:text-[#FFD700]" />
              <span>{dict.panchangam}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              
              {/* Thithi */}
              <div className="p-3.5 rounded-2xl bg-[#FFFBF5] dark:bg-[#201518] border border-[#EBDCCF] dark:border-[#38242A] flex items-start space-x-3">
                <MoonPhaseIcon className="w-6 h-6 shrink-0 mt-0.5" phase="valarpirai" />
                <div>
                  <span className="text-xs font-bold text-[#8B1515] dark:text-[#FFD700] block">{dict.tithi}</span>
                  <span className="font-semibold text-[#1F1517] dark:text-[#F7F1E8]">
                    {day.panchangam?.tithi || 'பஞ்சமி பின்பு சஷ்டி'}
                  </span>
                </div>
              </div>

              {/* Nakshatra */}
              <div className="p-3.5 rounded-2xl bg-[#FFFBF5] dark:bg-[#201518] border border-[#EBDCCF] dark:border-[#38242A] flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-[#E67E22] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#8B1515] dark:text-[#FFD700] block">{dict.nakshatra}</span>
                  <span className="font-semibold text-[#1F1517] dark:text-[#F7F1E8]">
                    {day.panchangam?.nakshatra || 'கேட்டை பின்பு மூலம்'}
                  </span>
                </div>
              </div>

              {/* Yogam */}
              <div className="p-3.5 rounded-2xl bg-[#FFFBF5] dark:bg-[#201518] border border-[#EBDCCF] dark:border-[#38242A] flex items-start space-x-3">
                <AuspiciousSunIcon className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#8B1515] dark:text-[#FFD700] block">{dict.yogam}</span>
                  <span className="font-semibold text-[#1F1517] dark:text-[#F7F1E8]">
                    {day.panchangam?.yogam || 'மரண, அமிர்த யோகம்'}
                  </span>
                </div>
              </div>

              {/* Chandrashtamam */}
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 flex items-start space-x-3">
                <ShieldAlert className="w-6 h-6 text-[#BE123C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#BE123C] dark:text-rose-400 block">{dict.chandrashtamam}</span>
                  <span className="font-bold text-[#BE123C] dark:text-rose-300">
                    {day.panchangam?.chandrashtamam || 'ரோகிணி'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 12 Rasi Palan Visual Colorful Grid (ராசிபலன்) */}
          <section aria-labelledby="rasi-heading" className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b-2 border-[#EBDCCF] dark:border-[#38242A] pb-2">
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-[#D4AF37]" />
                <h2 id="rasi-heading" className="text-lg font-bold text-[#8B1515] dark:text-[#FFD700]">
                  {dict.rasiPalan} (12 {locale === 'ta' ? 'ராசிகள்' : 'Zodiac Signs'})
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#8B1515] dark:text-[#FFD700] bg-[#FFD700]/20 px-2.5 py-1 rounded-full">
                இன்றைய பலன்
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(dict.rasiNames).map(([key, name]) => {
                const palan = day.rasipalan ? (day.rasipalan as any)[key] : '';
                return (
                  <div
                    key={key}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFDF8] dark:bg-[#1D1316] border-2 border-[#EBDCCF] dark:border-[#38242A] hover:border-[#D4AF37] hover:shadow-md transition-all flex items-center space-x-3 group"
                  >
                    <RasiIcon rasiKey={key} />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-[#8B1515] dark:text-[#FFD700] block truncate group-hover:text-[#C93B2B] transition-colors">
                        {name}
                      </span>
                      <span className="text-sm font-black text-[#1F1517] dark:text-[#F7F1E8] block mt-0.5 truncate">
                        {palan || 'நன்மை'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};
