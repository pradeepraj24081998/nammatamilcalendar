import React from 'react';
import Link from 'next/link';
import { fetchMuhurthamDates } from '@/lib/api';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, ArrowRight, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `Tamil Muhurtham Dates 2026 | Auspicious Wedding & Suba Muhurtham`
      : `தமிழ் சுப முகூர்த்த நாட்கள் 2026 | திருமண சுப முகூர்த்த தேதிகள்`,
    description: isEn
      ? `Verified auspicious Tamil Muhurtham and wedding dates for 2026 with Valarpirai, Nalla Neram, and Nakshatra details.`
      : `2026 ஆம் ஆண்டின் சுப முகூர்த்த நாட்கள், திருமண தேதிகள், வளர்பிறை முகூர்த்தம், நல்ல நேரம் மற்றும் சுப ஹோரைகள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/muhurtham-dates`,
    },
  };
}

export default async function MuhurthamPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const dict = getDictionary(locale);

  const selectedYear = resolvedSearch.year ? parseInt(resolvedSearch.year, 10) : 2026;
  const muhurthamDates = await fetchMuhurthamDates(selectedYear);

  return (
    <div className="space-y-6">
      
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700]">
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="w-7 h-7 text-[#FFD700] fill-[#FFD700]" />
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {dict.muhurthamDates} <span className="text-[#FFD700]">{selectedYear}</span>
          </h1>
        </div>
        <p className="text-sm text-[#FFF9F0]/90 max-w-2xl font-medium">
          {locale === 'ta'
            ? 'திருமணம், கிரகப்பிரவேசம் மற்றும் அனைத்து நற்காரியங்களுக்கும் உகந்த சுப முகூர்த்த தினங்களின் அதிகாரப்பூர்வ பட்டியல்.'
            : 'Authoritative list of auspicious Tamil Muhurtham dates for weddings, housewarming, and auspicious beginnings.'}
        </p>

        {/* Year Filter */}
        <div className="flex items-center space-x-2 mt-5">
          {[2026, 2027].map((yr) => (
            <Link
              key={yr}
              href={`/${locale}/muhurtham-dates?year=${yr}`}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                selectedYear === yr
                  ? 'bg-[#FFD700] text-[#700C0C] shadow-md ring-2 ring-white/30'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {yr}
            </Link>
          ))}
        </div>
      </div>

      {/* Dates Grid */}
      {muhurthamDates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {muhurthamDates.map((mDay) => {
            const dateObj = new Date(mDay.date);
            const monthName = dict.months[dateObj.getMonth()];
            const dayNum = dateObj.getDate();
            const weekdayName = dict.weekdays[mDay.weekday];

            return (
              <Link
                key={mDay.date}
                href={`/${locale}/calendar/${mDay.date}`}
                className="bg-white dark:bg-[#1D1418] border-2 border-[#EBDCCF] dark:border-[#38242A] p-5 rounded-3xl hover:border-[#8B1515] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#C93B2B] dark:text-[#FF8A80] uppercase tracking-wider block">
                        {weekdayName}
                      </span>
                      <span className="text-xl font-black text-[#8B1515] dark:text-[#FFD700] mt-0.5 block group-hover:text-[#C93B2B]">
                        {dayNum} {monthName}
                      </span>
                    </div>

                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-[#FEF3C7] dark:bg-[#332612] text-[#78350F] dark:text-[#FDE68A] border border-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{locale === 'ta' ? 'சுப முகூர்த்தம்' : 'Muhurtham'}</span>
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-[#FFFDF8] dark:bg-[#150E11] border border-[#EBDCCF] dark:border-[#38242A] text-xs font-bold text-[#1F1517] dark:text-[#F7F1E8]">
                    <span>{mDay.tamil_month} {mDay.tamil_date} ({mDay.tamil_year})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBDCCF]/60 dark:border-[#38242A]/60 flex items-center justify-between text-xs font-bold text-[#5C5256] dark:text-[#A3969B]">
                  <span>{locale === 'ta' ? 'முழு பஞ்சாங்கம் பார்க்க' : 'View Full Panchangam'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1D1418] border-2 border-[#EBDCCF] dark:border-[#38242A] p-12 rounded-3xl text-center space-y-2">
          <Calendar className="w-8 h-8 text-[#A89FA4] mx-auto" />
          <p className="text-sm font-bold text-[#5C5256] dark:text-[#A3969B]">
            {locale === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட ஆண்டிற்கு முகூர்த்த நாட்கள் பதிவேற்றப்படவில்லை.' : 'No Muhurtham dates available for the selected period.'}
          </p>
        </div>
      )}

      <AdContainer slotName="Muhurtham Bottom Banner" format="banner" />
    </div>
  );
}
