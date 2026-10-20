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
  Sun,
  Sunrise,
  Sunset,
  Compass as CompassIcon,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

interface DailyCalendarCardProps {
  day: CalendarDay;
  locale: Locale;
}

export const DailyCalendarCard: React.FC<DailyCalendarCardProps> = ({ day, locale }) => {
  const dict = getDictionary(locale);
  const isTa = locale === 'ta';

  // Parse Gregorian date
  const dateObj = new Date(day.date);
  const dayNumber = dateObj.getDate();
  const monthName = dict.months[dateObj.getMonth()];
  const yearNumber = dateObj.getFullYear();
  const weekdayName = dict.weekdays[day.weekday];

  const sunrise = day.additional_details?.sunrise || '06:05 AM';
  const sunset = day.additional_details?.sunset || '06:08 PM';
  const soolam = day.additional_details?.soolam || 'வடக்கு';
  const parigaram = day.additional_details?.parigaram || 'பால்';
  const naalVagai = day.additional_details?.naal_vagai || 'சம நோக்கு நாள்';

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Authentic Tamil Daily Calendar Sheet (தினசரி நாட்காட்டி அட்டை) */}
      <article className="calendar-sheet bg-white border-2 border-[#E2D1C3] shadow-lg rounded-3xl overflow-hidden">
        
        {/* Ornate Top Header with Traditional Artwork */}
        <div className="relative bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-3.5 sm:p-6 text-center overflow-hidden border-b-4 border-[#FFD700]">
          
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

          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[#FFD700] text-[10px] sm:text-xs font-black tracking-widest uppercase">
              <AgalVilakkuIcon className="w-4 h-4 sm:w-5 sm:h-5 inline-block shrink-0" />
              <span className="truncate">நம்ம தமிழ் காலண்டர் • {yearNumber}</span>
              <AgalVilakkuIcon className="w-4 h-4 sm:w-5 sm:h-5 inline-block shrink-0" />
            </div>

            {/* Gregorian Month & Weekday */}
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              {weekdayName} • <span className="text-[#FFD700]">{monthName} {yearNumber}</span>
            </h1>

            {/* Tamil Month and Tamil Date */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 sm:px-4 py-1.5 rounded-full border border-[#FFD700]/40 mt-1 shadow-sm max-w-full">
              <span className="text-xs sm:text-sm font-extrabold text-[#FFE082]">
                {day.tamil_month} மாதம் <span className="text-white text-base sm:text-lg">{day.tamil_date}</span>-ம் நாள்
              </span>
              <span className="text-white/60 hidden xs:inline">•</span>
              <span className="text-xs text-[#FFF9F0] font-medium">
                {day.tamil_year} {isTa ? 'ஆண்டு' : 'Year'}
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Pad Body (White/Creamy Background with Giant Numeric Date) */}
        <div className="p-3.5 xs:p-5 sm:p-8 bg-[#FFFDF8] space-y-6">
          
          {/* Giant Numeric Date Display */}
          <div className="text-center pt-2 pb-2 relative">
            <div className="inline-block relative">
              <span className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-[#8B1515] drop-shadow-xs font-serif leading-none block">
                {dayNumber}
              </span>
              <span className="block text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#8C6200] mt-1.5">
                {isTa ? 'ஆங்கில தேதி' : 'Gregorian Date'}
              </span>
            </div>

            {/* Special Badges (Muhurtham, Festival, Kari Naal, Observances) */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {day.is_muhurtham && (
                <span className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#700C0C] shadow-md border border-[#FFE082]">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#700C0C]" />
                  <span>{dict.muhurthamDayBadge}</span>
                </span>
              )}

              {day.festival_info && (
                <span className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#C93B2B] to-[#981414] text-white shadow-md">
                  <TempleBellIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]" />
                  <span className="break-words">{day.festival_info}</span>
                </span>
              )}

              {day.festival_addon && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFF3E0] text-[#D35400] border border-[#FFB74D]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{day.festival_addon}</span>
                </span>
              )}

              {day.day_auspicious && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border border-[#81C784]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                  <span>{day.day_auspicious}</span>
                </span>
              )}

              {/* Naal Type Pill */}
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF8E7] text-[#78350F] border border-[#FCD34D]">
                <Bookmark className="w-3 h-3 text-[#D97706] shrink-0" />
                <span>{naalVagai}</span>
              </span>
            </div>
          </div>

          {/* Traditional Panchangam Highlights Strip (Inspired by TamilDailyCalendar) */}
          <section aria-label="Daily Astronomical Highlights" className="p-3 sm:p-4 rounded-2xl bg-[#FFF8E7] border border-[#FCD34D] shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center text-xs">
              
              {/* Sunrise */}
              <div className="p-2 rounded-xl bg-white/80 border border-[#EBDCCF] space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6200] flex items-center justify-center space-x-1">
                  <Sunrise className="w-3 h-3 text-amber-600" />
                  <span>{isTa ? 'சூரிய உதயம்' : 'Sunrise'}</span>
                </span>
                <span className="font-black text-[#1F1517] block sm:text-sm">{sunrise}</span>
              </div>

              {/* Sunset */}
              <div className="p-2 rounded-xl bg-white/80 border border-[#EBDCCF] space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6200] flex items-center justify-center space-x-1">
                  <Sunset className="w-3 h-3 text-rose-600" />
                  <span>{isTa ? 'சூரிய அஸ்தமனம்' : 'Sunset'}</span>
                </span>
                <span className="font-black text-[#1F1517] block sm:text-sm">{sunset}</span>
              </div>

              {/* Soolam */}
              <div className="p-2 rounded-xl bg-white/80 border border-[#EBDCCF] space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6200] flex items-center justify-center space-x-1">
                  <CompassIcon className="w-3 h-3 text-[#8B1515]" />
                  <span>{isTa ? 'சூலம்' : 'Soolam'}</span>
                </span>
                <span className="font-black text-[#8B1515] block sm:text-sm">{soolam}</span>
              </div>

              {/* Parigaram */}
              <div className="p-2 rounded-xl bg-white/80 border border-[#EBDCCF] space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6200] flex items-center justify-center space-x-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{isTa ? 'பரிகாரம்' : 'Parigaram'}</span>
                </span>
                <span className="font-black text-emerald-800 block sm:text-sm">{parigaram}</span>
              </div>
            </div>
          </section>

          {/* 3. Auspicious & Inauspicious Timings Colorful Cards */}
          <section aria-labelledby="timings-heading" className="space-y-4">
            <h2 id="timings-heading" className="text-base sm:text-lg font-bold text-[#8B1515] flex items-center space-x-2 border-b-2 border-[#EBDCCF] pb-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#C93B2B] shrink-0" />
              <span>{isTa ? 'இன்றைய நல்ல நேரம் & அசுப நேரங்கள்' : 'Auspicious & Inauspicious Timings'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Nalla Neram (Emerald Green) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-2 border-[#86EFAC] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#86EFAC]/50 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <AuspiciousSunIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm text-[#14532D] uppercase tracking-wide">
                      {dict.nallaNeram}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16A34A] text-white">சுபம்</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm font-bold text-[#14532D]">
                  <div className="flex justify-between">
                    <span className="text-[#166534] font-semibold">{dict.morning}:</span>
                    <span>{day.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#166534] font-semibold">{dict.evening}:</span>
                    <span>{day.auspicious_timings?.nalla_neram_evening || '04:45 - 05:45'}</span>
                  </div>
                </div>
              </div>

              {/* Gowri Nalla Neram (Royal Golden Amber) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-2 border-[#FCD34D] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#FCD34D]/50 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <AgalVilakkuIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm text-[#78350F] uppercase tracking-wide">
                      {dict.gowriNallaNeram}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D97706] text-white">கௌரி</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm font-bold text-[#78350F]">
                  <div className="flex justify-between">
                    <span className="text-[#92400E] font-semibold">{dict.morning}:</span>
                    <span>{day.auspicious_timings?.gowri_morning || '10:45 - 11:45'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#92400E] font-semibold">{dict.evening}:</span>
                    <span>{day.auspicious_timings?.gowri_evening || '06:30 - 07:30'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inauspicious Timings (Rahu Kalam, Yamagandam, Kuligai) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#FFF5F5] via-[#FFF8F0] to-[#FAF5FF] border border-[#EBDCCF] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C93B2B] flex items-center space-x-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-[#C93B2B] shrink-0" />
                <span>{dict.inauspiciousTimings}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {/* Rahu Kalam */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-rose-200">
                  <span className="text-[11px] font-bold text-rose-700 block">{dict.rahuKalam}</span>
                  <span className="text-xs sm:text-sm font-black text-rose-900 mt-0.5 block">
                    {day.inauspicious_timings?.rahu_kalam || '10:30 AM - 12:00 PM'}
                  </span>
                </div>

                {/* Yamagandam */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-700 block">{dict.yamagandam}</span>
                  <span className="text-xs sm:text-sm font-black text-amber-900 mt-0.5 block">
                    {day.inauspicious_timings?.yamagandam || '03:00 PM - 04:30 PM'}
                  </span>
                </div>

                {/* Kuligai */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-purple-200">
                  <span className="text-[11px] font-bold text-purple-700 block">{dict.kuligai}</span>
                  <span className="text-xs sm:text-sm font-black text-purple-900 mt-0.5 block">
                    {day.inauspicious_timings?.kuligai || '07:30 AM - 09:00 AM'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Panchangam Details Table (பஞ்சாங்கம்) */}
          <section aria-labelledby="panchangam-heading" className="space-y-4">
            <h2 id="panchangam-heading" className="text-base sm:text-lg font-bold text-[#8B1515] flex items-center space-x-2 border-b-2 border-[#EBDCCF] pb-2">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1515] shrink-0" />
              <span>{dict.panchangam}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
              
              {/* Thithi */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFBF5] border border-[#EBDCCF] flex items-start space-x-2.5">
                <MoonPhaseIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" phase="valarpirai" />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-[#8B1515] block">{dict.tithi}</span>
                  <span className="font-semibold text-[#1F1517] block break-words">
                    {day.panchangam?.tithi || 'பஞ்சமி பின்பு சஷ்டி'}
                  </span>
                </div>
              </div>

              {/* Nakshatra */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFBF5] border border-[#EBDCCF] flex items-start space-x-2.5">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#E67E22] shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-[#8B1515] block">{dict.nakshatra}</span>
                  <span className="font-semibold text-[#1F1517] block break-words">
                    {day.panchangam?.nakshatra || 'கேட்டை பின்பு மூலம்'}
                  </span>
                </div>
              </div>

              {/* Yogam */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFBF5] border border-[#EBDCCF] flex items-start space-x-2.5">
                <AuspiciousSunIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-[#8B1515] block">{dict.yogam}</span>
                  <span className="font-semibold text-[#1F1517] block break-words">
                    {day.panchangam?.yogam || 'சித்த யோகம்'}
                  </span>
                </div>
              </div>

              {/* Chandrashtamam */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-2.5">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-[#BE123C] shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-[#BE123C] block">{dict.chandrashtamam}</span>
                  <span className="font-bold text-[#BE123C] block break-words">
                    {day.panchangam?.chandrashtamam || 'இன்று சந்திராஷ்டமம் இல்லை'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 12 Rasi Palan Visual Colorful Grid (ராசிபலன்) */}
          <section aria-labelledby="rasi-heading" className="space-y-4 pt-1">
            <div className="flex items-center justify-between border-b-2 border-[#EBDCCF] pb-2">
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
                <h2 id="rasi-heading" className="text-base sm:text-lg font-bold text-[#8B1515]">
                  {dict.rasiPalan} (12 {isTa ? 'ராசிகள்' : 'Zodiac Signs'})
                </h2>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#8B1515] bg-[#FFD700]/25 px-2.5 py-0.5 rounded-full">
                {isTa ? 'இன்றைய பலன்' : 'Daily Palan'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {Object.entries(dict.rasiNames).map(([key, name]) => {
                const palan = day.rasipalan ? (day.rasipalan as any)[key] : '';
                return (
                  <div
                    key={key}
                    className="p-2.5 sm:p-3.5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] hover:border-[#D4AF37] hover:shadow-md transition-all flex items-center space-x-2.5 group"
                  >
                    <RasiIcon rasiKey={key} />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-[#8B1515] block truncate group-hover:text-[#C93B2B] transition-colors">
                        {name}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#1F1517] block mt-0.5 truncate">
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
