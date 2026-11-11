import React from 'react';
import Link from 'next/link';
import { fetchYearCalendar } from '@/lib/api';
import { YearGrid } from '@/components/calendar/YearGrid';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { Sparkles, Calendar, Heart, BookOpen, HelpCircle } from 'lucide-react';
import { TempleBellIcon } from '@/components/ui/CalendarIcons';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}): Promise<Metadata> {
  const { locale, year } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `Tamil Calendar ${year} | Full Year Sheet, Festivals & Muhurtham`
      : `தமிழ் காலண்டர் ${year} | முழு வருட நாட்காட்டி & பண்டிகைகள்`,
    description: isEn
      ? `Yearly overview for Tamil calendar ${year} with 12 monthly summaries, verified festivals, and auspicious Muhurtham dates.`
      : `${year} முழு வருட தமிழ் நாட்காட்டி சுருக்கம், 12 மாத காலண்டர், அரசு விடுமுறைகள் மற்றும் சுப முகூர்த்த நாட்கள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/year/${year}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/calendar/year/${year}`,
        en: `https://nammatamilcalendar.in/en/calendar/year/${year}`,
      },
    },
  };
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const yearNum = parseInt(resolvedParams.year, 10);
  const isTa = locale === 'ta';

  const yearResponse = await fetchYearCalendar(yearNum);

  const fallbackData = {
    year: yearNum,
    total_days: 365,
    muhurtham_count: 0,
    festivals_count: 0,
    months: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      days_count: new Date(yearNum, i + 1, 0).getDate(),
      muhurtham_count: 0,
      festivals_count: 0,
    })),
  };

  const data = yearResponse || fallbackData;
  const tamilYearTitle = yearNum === 2026 ? 'விசுவாவசு / பராபவ' : yearNum === 2027 ? 'பராபவ / பிலவ' : 'தமிழ்';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>{isTa ? `தமிழ் ஆண்டு: ${tamilYearTitle}` : `Tamil Year: ${tamilYearTitle}`}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isTa ? `தமிழ் காலண்டர் ${yearNum} — முழு வருட நாட்காட்டி` : `Tamil Calendar ${yearNum} — Full Yearly Sheet`}
            </h1>
          </div>

          {/* Year Switcher */}
          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0 bg-black/25 p-1 rounded-2xl border border-white/20">
            {[2026, 2027].map((yr) => (
              <Link
                key={yr}
                href={`/${locale}/calendar/year/${yr}`}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  yearNum === yr
                    ? 'bg-[#FFD700] text-[#700C0C] shadow-md ring-2 ring-white/30'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-3xl leading-relaxed">
          {isTa
            ? `${yearNum} ஆம் ஆண்டின் 12 மாத காலண்டர் சுருக்கம், சுப முகூர்த்த நாட்கள், அரசு விடுமுறை தினங்கள், மற்றும் முக்கிய விரத விசேஷங்களின் முழுமையான வருடத் தொகுப்பு.`
            : `Comprehensive 12-month summary for ${yearNum} featuring auspicious wedding Muhurtham dates, public holidays, Pournami, Amavasai, and major Tamil celebrations.`}
        </p>

        {/* Quick Highlights Ribbon */}
        <div className="pt-3 border-t border-white/20 flex flex-wrap gap-2 text-xs font-bold text-[#FFD700]">
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `மொத்த நாட்கள்: ${data.total_days}` : `Total Days: ${data.total_days}`}
          </span>
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `சுப முகூர்த்த நாட்கள்: ${data.muhurtham_count}` : `Muhurtham Dates: ${data.muhurtham_count}`}
          </span>
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `பண்டிகைகள் & விசேஷங்கள்: ${data.festivals_count}` : `Festivals: ${data.festivals_count}`}
          </span>
        </div>
      </div>

      {/* Main 12-Month Interactive Grid */}
      <YearGrid yearData={data} locale={locale} />

      {/* Rich Editorial Guide on the Yearly Overview */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <BookOpen className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-lg sm:text-xl font-black">
              {isTa ? `${yearNum} ஆம் ஆண்டின் பஞ்சாங்க முக்கியத்துவம்` : `Panchangam Significance of ${yearNum}`}
            </h2>
          </div>
          <p className="text-[#29262A] text-xs sm:text-sm leading-relaxed">
            {isTa
              ? `${yearNum} ஆம் ஆண்டு தமிழ் பாரம்பரியத்தில் அறுபது ஆண்டுகளின் சுழற்சியில் முக்கிய காலகட்டத்தைக் குறிக்கிறது. ஜனவரி முதல் ஏப்ரல் வரை முந்தைய ஆண்டின் நிறைவுப் பகுதியும், ஏப்ரல் 14 சித்திரை புத்தாண்டு முதல் புதிய ஆண்டின் தொடக்கமும் அமைகிறது. திருமணம், கிரகப்பிரவேசம் போன்ற நற்காரியங்களுக்கு ஆண்டின் 12 மாதங்களிலும் பல்வேறு வளர்பிறை சுப முகூர்த்தங்கள் சிறப்பாக அமைந்துள்ளன.`
              : `The calendar year ${yearNum} encompasses a pivotal transition in the 60-year Jovian Tamil cycle. It witnesses the sacred Chithirai New Year on April 14, inaugurating a prosperous calendar season packed with auspicious Valarpirai wedding windows and time-honored festival celebrations.`}
          </p>
        </div>

        {/* Year FAQ */}
        <div className="space-y-3 pt-3 border-t border-[#EBDCCF]">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <HelpCircle className="w-4 h-4 text-[#8B1515]" />
            <h3 className="text-sm sm:text-base font-black">
              {isTa ? 'வருட காலண்டர் பற்றிய கேள்விகள் (FAQs)' : 'Frequently Asked Questions'}
            </h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
              <span className="font-bold text-[#8B1515] block">
                {isTa ? `1. ${yearNum} ஆண்டில் அதிக முகூர்த்தங்கள் எந்த மாதத்தில் உள்ளன?` : `1. Which month has the most Muhurtham dates in ${yearNum}?`}
              </span>
              <p className="text-[#5C5256]">
                {isTa
                  ? 'பொதுவாக தை (ஜனவரி/பிப்ரவரி), வைகாசி (மே/ஜூன்), மற்றும் ஆவணி (ஆகஸ்ட்/செப்டம்பர்) மாதங்களில் அதிக சுப முகூர்த்த தினங்கள் அமைகின்றன.'
                  : 'Traditionally, the Tamil months of Thai (Jan/Feb), Vaikasi (May/June), and Avani (Aug/Sept) host the highest frequency of auspicious Muhurtham dates.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdContainer slotName="Yearly View Bottom" format="banner" />
    </div>
  );
}
