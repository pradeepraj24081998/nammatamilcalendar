import React from 'react';
import Link from 'next/link';
import { fetchFestivals } from '@/lib/api';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
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
      ? `Tamil Festivals & Important Dates 2026 | Viratham & Holidays`
      : `தமிழ் பண்டிகைகள் & முக்கிய விரத தினங்கள் 2026 | அரசு விடுமுறைகள்`,
    description: isEn
      ? `List of Tamil festivals, government holidays, Amavasai, Pournami, Pradosham, and Viratham dates for 2026.`
      : `2026 ஆம் ஆண்டின் முக்கிய தமிழ் பண்டிகைகள், தீபாவளி, பொங்கல், அமாவாசை, பௌர்ணமி, பிரதோஷம், கார்த்திகை தீபம் மற்றும் அரசு விடுமுறை நாட்கள்.`,
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
  searchParams: Promise<{ year?: string; month?: string; q?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const dict = getDictionary(locale);

  const selectedYear = resolvedSearch.year ? parseInt(resolvedSearch.year, 10) : 2026;
  const selectedMonth = resolvedSearch.month ? parseInt(resolvedSearch.month, 10) : undefined;
  const query = resolvedSearch.q;

  const festivals = await fetchFestivals(selectedYear, selectedMonth, query);

  return (
    <div className="space-y-6">
      
      {/* Page Title with Namma Tamil Crimson/Gold Aesthetic */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700]">
        <div className="flex items-center space-x-3 mb-2">
          <TempleBellIcon className="w-7 h-7 text-[#FFD700]" />
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {dict.festivals} <span className="text-[#FFD700]">{selectedYear}</span>
          </h1>
        </div>
        <p className="text-sm text-[#FFF9F0]/90 max-w-2xl font-medium">
          {locale === 'ta'
            ? 'அனைத்து முக்கிய தமிழ் பண்டிகைகள், அரசு விடுமுறைகள், விரத தினங்கள், மற்றும் விசேஷங்களின் முழுமையான பட்டியல்.'
            : 'Authoritative guide to Tamil religious festivals, fasting days, public holidays, and important observances.'}
        </p>

        {/* Year Filter Pills */}
        <div className="flex items-center space-x-2 mt-5">
          {[2025, 2026, 2027].map((yr) => (
            <Link
              key={yr}
              href={`/${locale}/festivals?year=${yr}`}
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

      {/* Festivals Grid */}
      {festivals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {festivals.map((fest) => {
            const dateObj = new Date(fest.date);
            const monthName = dict.months[dateObj.getMonth()];
            const dayNum = dateObj.getDate();

            return (
              <Link
                key={fest.date}
                href={`/${locale}/calendar/${fest.date}`}
                className="bg-white dark:bg-[#1D1418] border-2 border-[#EBDCCF] dark:border-[#38242A] p-5 rounded-3xl hover:border-[#8B1515] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-base font-black text-[#8B1515] dark:text-[#FFD700] group-hover:text-[#C93B2B] transition-colors">
                      {fest.festival_info || fest.day_auspicious}
                    </span>
                    <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#FFFDF8] dark:bg-[#150E11] text-[#8B1515] dark:text-[#FFD700] border border-[#EBDCCF] dark:border-[#38242A] shrink-0">
                      {dayNum} {monthName}
                    </span>
                  </div>

                  {fest.festival_addon && (
                    <span className="inline-block mt-2 text-xs font-bold text-[#D35400] dark:text-[#FFAB91] bg-[#FFF3E0] dark:bg-[#2C1F1A] px-2.5 py-0.5 rounded-lg border border-[#FFB74D]">
                      {fest.festival_addon}
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBDCCF]/60 dark:border-[#38242A]/60 flex items-center justify-between text-xs font-bold text-[#5C5256] dark:text-[#A3969B]">
                  <span>{fest.tamil_month} {fest.tamil_date} ({fest.tamil_year})</span>
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
            {locale === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட காலகட்டத்திற்கு பண்டிகைகள் பதிவேற்றப்படவில்லை.' : 'No festivals found for the selected period.'}
          </p>
        </div>
      )}

      <AdContainer slotName="Festivals Bottom Banner" format="banner" />
    </div>
  );
}
