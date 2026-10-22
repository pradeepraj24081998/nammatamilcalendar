import React from 'react';
import Link from 'next/link';
import { fetchFestivals } from '@/lib/api';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon, AuspiciousSunIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, ArrowRight, Moon, Sun, Flame, Landmark, ShieldAlert, Star } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string; month?: string; category?: string; q?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const search = await searchParams;
  const isEn = locale === 'en';
  const year = search.year || '2026';
  const category = (search.category || 'all').toLowerCase();

  const categoryTitles: Record<string, { ta: string; en: string }> = {
    pournami: { ta: `${year} பௌர்ணமி நாட்கள்`, en: `Pournami Dates ${year}` },
    amavasai: { ta: `${year} அமாவாசை நாட்கள்`, en: `Amavasai Dates ${year}` },
    pradosham: { ta: `${year} பிரதோஷம் நாட்கள்`, en: `Pradosham Dates ${year}` },
    krithigai: { ta: `${year} கிருத்திகை விரத நாட்கள்`, en: `Krithigai Dates ${year}` },
    holidays: { ta: `${year} தமிழ்நாடு அரசு விடுமுறை நாட்கள்`, en: `Tamil Nadu Public Holidays ${year}` },
    viratham: { ta: `${year} முக்கிய விரத தினங்கள்`, en: `Key Tamil Fasting Days ${year}` },
    all: { ta: `தமிழ் பண்டிகைகள் & விரத தினங்கள் ${year}`, en: `Tamil Festivals & Important Dates ${year}` },
  };

  const selectedTitle = categoryTitles[category] || categoryTitles.all;

  return {
    title: isEn
      ? `${selectedTitle.en} | Namma Tamil Calendar`
      : `${selectedTitle.ta} | நம்ம தமிழ் காலண்டர்`,
    description: isEn
      ? `Complete list of ${selectedTitle.en} with Tamil month, Tithi, Nakshatra, and auspicious timings.`
      : `${selectedTitle.ta} முழு பட்டியல், தமிழ் மாதம், தேதி, திதி, நட்சத்திரம் மற்றும் விசேஷ குறிப்புகள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/festivals`,
    },
  };
}

export default async function FestivalsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string; month?: string; category?: string; q?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const dict = getDictionary(locale);
  const isTa = locale === 'ta';

  const selectedYear = resolvedSearch.year ? parseInt(resolvedSearch.year, 10) : 2026;
  const selectedMonth = resolvedSearch.month ? parseInt(resolvedSearch.month, 10) : undefined;
  const selectedCategory = (resolvedSearch.category || 'all').toLowerCase();
  const query = resolvedSearch.q;

  // Fetch categorized festivals
  const festivals = await fetchFestivals(selectedYear, selectedMonth, query, selectedCategory);

  // Compute counts for all categories in this year
  const [allPournami, allAmavasai, allPradosham, allKrithigai, allHolidays, allViratham, allEvents] = await Promise.all([
    fetchFestivals(selectedYear, undefined, undefined, 'pournami'),
    fetchFestivals(selectedYear, undefined, undefined, 'amavasai'),
    fetchFestivals(selectedYear, undefined, undefined, 'pradosham'),
    fetchFestivals(selectedYear, undefined, undefined, 'krithigai'),
    fetchFestivals(selectedYear, undefined, undefined, 'holidays'),
    fetchFestivals(selectedYear, undefined, undefined, 'viratham'),
    fetchFestivals(selectedYear, undefined, undefined, 'all'),
  ]);

  const categories = [
    {
      id: 'all',
      labelTa: 'அனைத்தும்',
      labelEn: 'All Events',
      count: allEvents.length,
      icon: Sparkles,
      color: 'bg-[#8B1515] text-white',
    },
    {
      id: 'pournami',
      labelTa: 'பௌர்ணமி',
      labelEn: 'Pournami',
      count: allPournami.length,
      icon: Moon,
      color: 'bg-amber-600 text-white',
    },
    {
      id: 'amavasai',
      labelTa: 'அமாவாசை',
      labelEn: 'Amavasai',
      count: allAmavasai.length,
      icon: Moon,
      color: 'bg-slate-800 text-white',
    },
    {
      id: 'pradosham',
      labelTa: 'பிரதோஷம்',
      labelEn: 'Pradosham',
      count: allPradosham.length,
      icon: TempleBellIcon,
      color: 'bg-red-800 text-white',
    },
    {
      id: 'krithigai',
      labelTa: 'கிருத்திகை',
      labelEn: 'Krithigai',
      count: allKrithigai.length,
      icon: Flame,
      color: 'bg-orange-600 text-white',
    },
    {
      id: 'holidays',
      labelTa: 'அரசு விடுமுறைகள்',
      labelEn: 'Holidays',
      count: allHolidays.length,
      icon: Landmark,
      color: 'bg-emerald-700 text-white',
    },
    {
      id: 'viratham',
      labelTa: 'முக்கிய விரதங்கள்',
      labelEn: 'Fasting Days',
      count: allViratham.length,
      icon: Star,
      color: 'bg-purple-800 text-white',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-5 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <TempleBellIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD700] shrink-0" />
              <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                {isTa ? 'பண்டிகைகள் & விரத தினங்கள்' : 'Festivals & Observances'}{' '}
                <span className="text-[#FFD700]">{selectedYear}</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-2xl font-medium">
              {isTa
                ? 'பௌர்ணமி, அமாவாசை, பிரதோஷம், கிருத்திகை, அரசு விடுமுறைகள் மற்றும் முக்கிய விசேஷங்களின் முழுமையான பட்டியல்.'
                : 'Authoritative dates for Pournami, Amavasai, Pradosham, Krithigai, public holidays, and fasting days.'}
            </p>
          </div>

          {/* Year Switcher */}
          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0 bg-black/20 p-1 rounded-2xl border border-white/20">
            {[2026, 2027].map((yr) => (
              <Link
                key={yr}
                href={`/${locale}/festivals?year=${yr}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}`}
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

        {/* 2. Category Filter Pills */}
        <div className="mt-6 pt-5 border-t border-white/20">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/festivals?year=${selectedYear}&category=${cat.id}${selectedMonth ? `&month=${selectedMonth}` : ''}`}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD700] text-[#700C0C] shadow-lg ring-2 ring-white/50 scale-105'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{isTa ? cat.labelTa : cat.labelEn}</span>
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-[#700C0C] text-[#FFD700]' : 'bg-black/30 text-white/90'
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Selected Category Header & Count Summary */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#8B1515]" />
          <h2 className="text-sm sm:text-base font-black text-[#1F1517]">
            {isTa
              ? `${selectedYear} ${categories.find((c) => c.id === selectedCategory)?.labelTa} (${festivals.length} நாட்கள்)`
              : `${selectedYear} ${categories.find((c) => c.id === selectedCategory)?.labelEn} (${festivals.length} Dates)`}
          </h2>
        </div>

        {/* Reset / All View link */}
        {selectedCategory !== 'all' && (
          <Link
            href={`/${locale}/festivals?year=${selectedYear}`}
            className="text-xs font-bold text-[#8B1515] hover:underline flex items-center space-x-1"
          >
            <span>{isTa ? 'அனைத்தையும் காட்டு' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* 4. Festivals / Auspicious Dates Grid */}
      {festivals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {festivals.map((fest) => {
            const dateParts = fest.date.split('-').map(Number);
            const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            const monthName = dict.months[dateParts[1] - 1];
            const dayNum = dateParts[2];
            const weekdayName = dict.weekdays[dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1];

            const title = fest.festival_info || fest.day_auspicious || fest.festival_addon;
            const isHoliday =
              fest.festival_addon?.includes('விடுமுறை') ||
              fest.festival_addon?.includes('Holiday') ||
              fest.festival_info?.includes('விடுமுறை') ||
              ['குடியரசு', 'சுதந்திர', 'காந்தி', 'மே தினம்'].some((k) => (fest.festival_info || '').includes(k));

            return (
              <Link
                key={fest.date}
                href={`/${locale}/calendar/${fest.date}`}
                className="bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] p-4 sm:p-5 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group active:scale-[0.99] touch-manipulation"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5">
                    <span className="text-sm sm:text-base font-black text-[#8B1515] group-hover:text-[#C93B2B] transition-colors leading-snug">
                      {title}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#FFF9F0] text-[#8B1515] border border-[#EBDCCF] shrink-0 whitespace-nowrap">
                      {dayNum} {monthName}
                    </span>
                  </div>

                  {/* Day Auspicious / Extra Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    {fest.day_auspicious && (
                      <span className="text-[11px] font-bold text-[#700C0C] bg-[#FFF3E0] px-2 py-0.5 rounded-lg border border-[#FFD599]">
                        {fest.day_auspicious}
                      </span>
                    )}
                    {fest.festival_addon && (
                      <span className="text-[11px] font-bold text-[#D35400] bg-[#FFF8E7] px-2 py-0.5 rounded-lg border border-[#FFB74D]">
                        {fest.festival_addon}
                      </span>
                    )}
                    {isHoliday && (
                      <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-300">
                        {isTa ? 'அரசு விடுமுறை' : 'Public Holiday'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBDCCF]/70 flex items-center justify-between text-xs font-bold text-[#5C5256]">
                  <div>
                    <span className="text-[#8B1515] font-black mr-1">{weekdayName}</span>
                    <span>• {fest.tamil_month} {fest.tamil_date} ({fest.tamil_year})</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-[#EBDCCF] p-12 rounded-3xl text-center space-y-3">
          <Calendar className="w-10 h-10 text-[#8B1515]/40 mx-auto" />
          <p className="text-sm font-bold text-[#5C5256]">
            {isTa ? 'தேர்ந்தெடுக்கப்பட்ட பிரிவுக்கு தகவல்கள் இல்லை.' : 'No observances found for this category.'}
          </p>
          <Link
            href={`/${locale}/festivals?year=${selectedYear}`}
            className="inline-block px-4 py-2 rounded-xl text-xs font-black bg-[#8B1515] text-white shadow-xs"
          >
            {isTa ? 'அனைத்து பண்டிகைகளையும் காட்டு' : 'View All Festivals'}
          </Link>
        </div>
      )}

      {/* 5. Bottom Banner Ad */}
      <AdContainer slotName="Festivals Bottom Banner" format="banner" />
    </div>
  );
}
