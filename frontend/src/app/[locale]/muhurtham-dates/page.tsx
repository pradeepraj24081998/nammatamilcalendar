import React from 'react';
import Link from 'next/link';
import { fetchMuhurthamDates } from '@/lib/api';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, ArrowRight, Heart, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const search = await searchParams;
  const isEn = locale === 'en';
  const year = search.year || '2026';

  return {
    title: isEn
      ? `Tamil Muhurtham Dates ${year} | Auspicious Wedding & Suba Muhurtham`
      : `தமிழ் சுப முகூர்த்த நாட்கள் ${year} | திருமண சுப முகூர்த்த தேதிகள்`,
    description: isEn
      ? `Verified auspicious Tamil Muhurtham and wedding dates for ${year} with Valarpirai, Nalla Neram, and Nakshatra details.`
      : `${year} ஆம் ஆண்டின் சுப முகூர்த்த நாட்கள், திருமண தேதிகள், வளர்பிறை முகூர்த்தம், நல்ல நேரம் மற்றும் சுப ஹோரைகள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/muhurtham-dates`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/muhurtham-dates',
        en: 'https://nammatamilcalendar.in/en/muhurtham-dates',
      },
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
  const isTa = locale === 'ta';

  const selectedYear = resolvedSearch.year ? parseInt(resolvedSearch.year, 10) : 2026;
  const muhurthamDates = await fetchMuhurthamDates(selectedYear);

  return (
    <div className="space-y-8">
      
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Heart className="w-7 h-7 text-[#FFD700] fill-[#FFD700]" />
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {dict.muhurthamDates} <span className="text-[#FFD700]">{selectedYear}</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-2xl font-medium">
              {isTa
                ? 'திருமணம், சீமந்தம், கிரகப்பிரவேசம் மற்றும் அனைத்து நற்காரியங்களுக்கும் உகந்த சுப முகூர்த்த தினங்களின் அதிகாரப்பூர்வ பட்டியல்.'
                : 'Authoritative list of auspicious Tamil Muhurtham dates for weddings, housewarming, and auspicious beginnings.'}
            </p>
          </div>

          {/* Year Filter */}
          <div className="flex items-center space-x-2 shrink-0 bg-black/25 p-1 rounded-2xl border border-white/20">
            {[2026, 2027].map((yr) => (
              <Link
                key={yr}
                href={`/${locale}/muhurtham-dates?year=${yr}`}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  selectedYear === yr
                    ? 'bg-[#FFD700] text-[#700C0C] shadow-md ring-2 ring-white/30'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center space-x-3 text-xs font-bold text-[#FFD700]">
          <span>{isTa ? `மொத்த முகூர்த்த நாட்கள்: ${muhurthamDates.length}` : `Total Muhurtham Dates: ${muhurthamDates.length}`}</span>
          <span>•</span>
          <span>{isTa ? 'வளர்பிறை & தேய்பிறை சுப தினங்கள்' : 'Shukla & Krishna Paksha Auspicious Windows'}</span>
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
                className="bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] p-5 rounded-3xl hover:shadow-lg transition-all flex flex-col justify-between group active:scale-[0.99] touch-manipulation"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#C93B2B] uppercase tracking-wider block">
                        {weekdayName}
                      </span>
                      <span className="text-xl font-black text-[#8B1515] mt-0.5 block group-hover:text-[#C93B2B]">
                        {dayNum} {monthName} {selectedYear}
                      </span>
                    </div>

                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-[#FEF3C7] text-[#78350F] border border-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{isTa ? 'சுப முகூர்த்தம்' : 'Muhurtham'}</span>
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] text-xs font-bold text-[#1F1517]">
                    <span>{mDay.tamil_month} {mDay.tamil_date} ({mDay.tamil_year})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBDCCF]/60 flex items-center justify-between text-xs font-bold text-[#5C5256]">
                  <span>{isTa ? 'பஞ்சாங்கம் & நல்ல நேரம்' : 'View Timings'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-[#EBDCCF] p-12 rounded-3xl text-center space-y-2">
          <Calendar className="w-8 h-8 text-[#A89FA4] mx-auto" />
          <p className="text-sm font-bold text-[#5C5256]">
            {isTa ? 'தேர்ந்தெடுக்கப்பட்ட ஆண்டிற்கு முகூர்த்த நாட்கள் பதிவேற்றப்படவில்லை.' : 'No Muhurtham dates available for the selected period.'}
          </p>
        </div>
      )}

      {/* Editorial Guide on Muhurtham Selection */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <BookOpen className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-lg sm:text-xl font-black">
              {isTa ? 'சுப முகூர்த்தம் நிர்ணயிக்கும் ஜோதிட விதிகள்' : 'Astrological Rules for Fixing a Suba Muhurtham'}
            </h2>
          </div>
          <p className="text-[#29262A] text-xs sm:text-sm leading-relaxed">
            {isTa
              ? 'திருமண முகூர்த்தம் என்பது தம்பதிகளின் எதிர்கால ஒற்றுமை, சந்தான பாக்கியம் மற்றும் நீண்ட ஆயுளைத் தீர்மானிக்கும் மிக உன்னதமான காலமாகும். முகூர்த்த நிர்ணயத்தில் வளர்பிறை திதிகள் (துவிதியை, திருதியை, பஞ்சமி, சப்தமி, தசமி, திரயோதசி), ரோகிணி, மிருகசீரிஷம், உத்திரம், அஸ்தம், சுவாதி, அனுஷம், உத்திராடம், ரேவதி போன்ற சுப நட்சத்திரங்கள், மற்றும் குரு, சுக்கிரன் பார்வை பெற்ற சுப லக்னங்கள் தேர்ந்தெடுக்கப்படுகின்றன.'
              : 'Selecting an auspicious wedding Muhurtham requires evaluating several astrological factors: favorable lunar phases (Shukla Paksha), harmonious Nakshatras (Rohini, Mirugaseerisham, Uthiram, Hastam, Swathi, Anusham, Revati), and planetary alignment free of malefic afflictions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
            <span className="font-bold text-[#8B1515] block">
              {isTa ? 'ஆடி, புரட்டாசி, மார்கழி மாதங்களில் திருமணம் தவிர்க்கப்படுவது ஏன்?' : 'Why are Aadi, Purattasi, and Margazhi avoided for weddings?'}
            </span>
            <p className="text-[#5C5256]">
              {isTa
                ? 'இம்மாதங்கள் ஆன்மிக மற்றும் இறை வழிபாட்டிற்காக முழுமையாக ஒதுக்கப்பட்ட மாதங்கள் ஆகும். ஆடி மாதம் அம்பாள் வழிபாட்டிற்கும், புரட்டாசி பெருமாள் வழிபாட்டிற்கும், மார்கழி தனுர்மாத இறை வழிபாட்டிற்கும் பிரத்யேகமானவை என்பதால் குடும்ப சுப நிகழ்வுகள் இக்காலத்தில் நடத்தப்படுவதில்லை.'
                : 'These three Tamil months are spiritually consecrated entirely to temple worship and tapas (Amman in Aadi, Venkateswara in Purattasi, and Vishnu/Shiva in Margazhi), reserving secular domestic sacraments for other months.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
            <span className="font-bold text-[#8B1515] block">
              {isTa ? 'வளர்பிறை முகூர்த்தத்தின் சிறப்பு' : 'Significance of Valarpirai Muhurtham'}
            </span>
            <p className="text-[#5C5256]">
              {isTa
                ? 'சந்திரன் நாளுக்கு நாள் வளர்ந்து பிரகாசிக்கும் வளர்பிறை காலத்தில் தொடங்கப்படும் குடும்ப நற்காரியங்கள் இல்லற வாழ்வில் தொடர் சுபிட்சத்தையும் குடும்ப வளர்ச்சியையும் வழங்கும் என்பது நம்பிக்கை.'
                : 'Shukla Paksha (waxing moon) represents expanding illumination and energetic growth, making it universally favored for starting new homes, partnerships, and matrimonial bonds.'}
            </p>
          </div>
        </div>
      </div>

      <AdContainer slotName="Muhurtham Bottom Banner" format="banner" />
    </div>
  );
}
