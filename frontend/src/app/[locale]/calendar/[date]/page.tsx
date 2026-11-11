import React from 'react';
import { notFound } from 'next/navigation';
import { fetchDayCalendar } from '@/lib/api';
import { DailyCalendarCard } from '@/components/calendar/DailyCalendarCard';
import { DateSelector } from '@/components/calendar/DateSelector';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Sparkles, Compass, AlertTriangle, ShieldCheck, Sun, Moon } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `Tamil Calendar ${date} | Daily Panchangam & Nalla Neram`
      : `தமிழ் காலண்டர் ${date} | நல்ல நேரம் & பஞ்சாங்கம்`,
    description: isEn
      ? `Accurate Tamil calendar details for ${date}: Tamil date, Nalla Neram, Gowri Nalla Neram, Rahu Kalam, Thithi, Nakshatra, and Rasi Palan.`
      : `${date} அன்றைய தமிழ் காலண்டர், தமிழ் மாதம், தேதி, நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம், திதி, நட்சத்திரம் மற்றும் ராசிபலன்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/${date}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/calendar/${date}`,
        en: `https://nammatamilcalendar.in/en/calendar/${date}`,
      },
    },
    // Prevent search engine index bloat from 700+ daily sheets per AdSense guidelines
    robots: {
      index: false,
      follow: true,
    },
  };
}
// pradeepraju

export default async function DatePage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const { date } = resolvedParams;
  const isTa = locale === 'ta';
  const dict = getDictionary(locale);

  const dayData = await fetchDayCalendar(date);
  if (!dayData) {
    notFound();
  }

  // Generate authentic day summary based on data
  const tithi = dayData.panchangam?.tithi || 'சுப திதி';
  const nakshatra = dayData.panchangam?.nakshatra || 'சுப நட்சத்திரம்';
  const pirai = dayData.panchangam?.pirai || 'சுப பட்சம்';
  const nallaMorn = dayData.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15';
  const nallaEve = dayData.auspicious_timings?.nalla_neram_evening || '04:45 - 05:45';
  const soolam = dayData.additional_details?.soolam || 'வடக்கு';
  const parigaram = dayData.additional_details?.parigaram || 'பால்';
  const festivalTitle = dayData.festival_info || dayData.day_auspicious || dayData.festival_addon;

  return (
    <div className="space-y-6">
      {/* Date Selector Navigation */}
      <DateSelector currentDateStr={date} locale={locale} />

      {/* Editorial Written Summary Card */}
      <section aria-label="Daily Astronomical Summary" className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider">
            {isTa ? 'இன்றைய நாளின் முக்கிய ஜோதிடக் குறிப்புகள் & சுருக்கம்' : 'Astrological Day Summary & Panchangam Overview'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#29262A] leading-relaxed">
          {isTa ? (
            <>
              இன்று <strong>{dayData.tamil_month} மாதம் {dayData.tamil_date}-ம் நாள் ({dayData.tamil_year} ஆண்டு)</strong>.
              சந்திரனின் சஞ்சாரப்படி <strong>{pirai}</strong> காலமாகும். இன்றைய முதன்மை திதி <strong>{tithi}</strong> மற்றும் நட்சத்திரம் <strong>{nakshatra}</strong> ஆகும்.
              இன்றைய காலை நல்ல நேரம் <strong>{nallaMorn}</strong> மற்றும் மாலை நல்ல நேரம் <strong>{nallaEve}</strong> ஆகும்.
              பயணத்திற்கான சூலம் <strong>{soolam}</strong> திசையில் உள்ளது; அதற்கான பரிகாரம் <strong>{parigaram}</strong>.
              {festivalTitle && (
                <span className="text-[#8B1515] font-bold block mt-1">
                  ★ இன்றைய சிறப்பு: {festivalTitle}.
                </span>
              )}
            </>
          ) : (
            <>
              Today is <strong>{dayData.tamil_month} {dayData.tamil_date}, {dayData.tamil_year} year</strong>.
              The day falls under the <strong>{pirai}</strong> phase with prevailing Tithi <strong>{tithi}</strong> and Nakshatra <strong>{nakshatra}</strong>.
              Auspicious Nalla Neram intervals are <strong>{nallaMorn}</strong> in the morning and <strong>{nallaEve}</strong> in the evening.
              The travel Soolam direction is <strong>{soolam}</strong> with recommended remedy (Parigaram) being <strong>{parigaram}</strong>.
              {festivalTitle && (
                <span className="text-[#8B1515] font-bold block mt-1">
                  ★ Special Observance: {festivalTitle}.
                </span>
              )}
            </>
          )}
        </p>
      </section>

      {/* Main Daily Calendar Sheet */}
      <DailyCalendarCard day={dayData} locale={locale} />

      <AdContainer slotName="Date View Bottom Banner" format="banner" />
    </div>
  );
}
