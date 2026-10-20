import React from 'react';
import Link from 'next/link';
import { fetchTodayCalendar, fetchDayCalendar, fetchUpcomingFestivals } from '@/lib/api';
import { DailyCalendarCard } from '@/components/calendar/DailyCalendarCard';
import { DateSelector } from '@/components/calendar/DateSelector';
import { AdContainer } from '@/components/ui/AdContainer';
import { AgalVilakkuLoader } from '@/components/ui/AgalVilakkuLoader';
import { TempleBellIcon, AgalVilakkuIcon, AuspiciousSunIcon } from '@/components/ui/CalendarIcons';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Sparkles, ArrowRight, Calendar, Heart, Compass } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const todayStr = new Date().toISOString().split('T')[0];

  return {
    title: isEn
      ? `Today Tamil Calendar ${todayStr} | Namma Tamil Calendar & Panchangam`
      : `இன்றைய தமிழ் காலண்டர் ${todayStr} | காலண்டர் & பஞ்சாங்கம்`,
    description: isEn
      ? `Check today's Tamil calendar, Tamil date, Nalla Neram, Gowri Nalla Neram, Rahu Kalam, Thithi, Nakshatra, and daily Rasi Palan.`
      : `இன்றைய தமிழ் காலண்டர், தமிழ் தேதி, நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம், திதி, நட்சத்திரம் மற்றும் தினசரி ராசிபலன்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta',  
        en: 'https://nammatamilcalendar.in/en',
      },
    },
  };
}

import { QuickMonthGrid } from '@/components/calendar/QuickMonthGrid';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const dict = getDictionary(locale);

  // Fetch today's calendar data
  let dayData = await fetchTodayCalendar();
  if (!dayData) {
    dayData = await fetchDayCalendar('2026-10-20');
  }

  const upcomingFestivals = await fetchUpcomingFestivals();
  const currentDateStr = dayData?.date || new Date().toISOString().split('T')[0];
  const dateParts = currentDateStr.split('-');
  const currentYear = parseInt(dateParts[0], 10) || 2026;
  const currentMonth = parseInt(dateParts[1], 10) || 10;

  if (!dayData) {
    return (
      <div className="py-20">
        <AgalVilakkuLoader
          labelTa="காலண்டர் விவரங்கள் பெறப்படுகின்றன..."
          labelEn="Fetching authoritative Tamil calendar details..."
        />
      </div>
    );
  }

  // Quick navigation cards
  const quickCards = [
    {
      title: locale === 'ta' ? 'மாத காலண்டர்' : 'Monthly Calendar',
      subtitle: locale === 'ta' ? 'முழு மாத நாட்காட்டி' : 'Full Month View',
      href: `/${locale}/calendar/month/${currentYear}/${currentMonth}`,
      icon: Compass,
      gradient: 'from-[#8B1515] to-[#C93B2B]',
    },
    {
      title: locale === 'ta' ? 'சுப முகூர்த்தம்' : 'Muhurtham Dates',
      subtitle: locale === 'ta' ? 'திருமண முகூர்த்த நாட்கள்' : 'Wedding Dates',
      href: `/${locale}/muhurtham-dates?year=${currentYear}`,
      icon: Heart,
      gradient: 'from-[#D97706] to-[#F59E0B]',
    },
    {
      title: locale === 'ta' ? 'பண்டிகைகள்' : 'Festivals',
      subtitle: locale === 'ta' ? 'விரதங்கள் & விசேஷங்கள்' : 'Viratham & Holidays',
      href: `/${locale}/festivals?year=${currentYear}`,
      icon: Sparkles,
      gradient: 'from-[#BE123C] to-[#E11D48]',
    },
    {
      title: locale === 'ta' ? 'வருட காலண்டர்' : 'Yearly Overview',
      subtitle: locale === 'ta' ? '12 மாத காலண்டர் சுருக்கம்' : '12 Month Summary',
      href: `/${locale}/calendar/year/${currentYear}`,
      icon: Calendar,
      gradient: 'from-[#15803D] to-[#16A34A]',
    },
  ];

  return (
    <div className="space-y-8">

      {/* 1. Date Navigation */}
      <DateSelector currentDateStr={currentDateStr} locale={locale} />

      {/* 2. Main Daily Calendar Sheet */}
      <DailyCalendarCard day={dayData} locale={locale} />

      {/* 3. Quick Feature Cards Ribbon (Colorfully Themed) */}
      <section aria-label="Quick Calendar Categories" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {quickCards.map((qc, idx) => {
          const Icon = qc.icon;
          return (
            <Link
              key={idx}
              href={qc.href}
              className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-tr ${qc.gradient} text-white shadow-md hover:scale-102 hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 shrink-0" />
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 shrink-0" />
              </div>
              <div className="mt-2.5 sm:mt-3">
                <span className="text-xs sm:text-sm font-black block truncate">{qc.title}</span>
                <span className="text-[10px] sm:text-[11px] text-white/80 font-medium block truncate">{qc.subtitle}</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* 4. Mid-Feed Non-Intrusive Ad Placement */}
      <AdContainer slotName="Home Daily Mid-Feed" format="banner" />

      {/* 5. Upcoming Festivals & Observances Strip */}
      {upcomingFestivals.length > 0 && (
        <section aria-labelledby="upcoming-festivals-heading" className="bg-white dark:bg-[#1D1418] border-2 border-[#EBDCCF] dark:border-[#38242A] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#EBDCCF] dark:border-[#38242A] pb-3">
            <div className="flex items-center space-x-2">
              <TempleBellIcon className="w-5 h-5 text-[#8B1515] dark:text-[#FFD700]" />
              <h2 id="upcoming-festivals-heading" className="text-lg font-black text-[#8B1515] dark:text-[#FFD700]">
                {locale === 'ta' ? 'அடுத்த முக்கிய பண்டிகைகள் & விரத தினங்கள்' : 'Upcoming Festivals & Observances'}
              </h2>
            </div>
            <Link
              href={`/${locale}/festivals`}
              className="text-xs font-bold text-[#8B1515] dark:text-[#FFD700] hover:underline flex items-center space-x-1"
            >
              <span>{locale === 'ta' ? 'அனைத்தும் பார்க்க' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingFestivals.slice(0, 6).map((fest) => (
              <Link
                key={fest.date}
                href={`/${locale}/calendar/${fest.date}`}
                className="p-3.5 rounded-2xl bg-[#FFFDF8] dark:bg-[#150E11] border border-[#EBDCCF] dark:border-[#38242A] hover:border-[#8B1515] hover:shadow-md transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-xs font-extrabold text-[#8B1515] dark:text-[#FFD700] block group-hover:text-[#C93B2B]">
                    {fest.festival_info || fest.day_auspicious}
                  </span>
                  <span className="text-[11px] text-[#5C5256] dark:text-[#A3969B] font-semibold">
                    {fest.date} ({fest.tamil_month} {fest.tamil_date})
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. Quick Monthly Navigation Grid (Supports 2026 & 2027) */}
      <QuickMonthGrid initialYear={currentYear} locale={locale} />

      {/* 7. Bottom Leaderboard Ad */}
      <AdContainer slotName="Home Bottom Leaderboard" format="banner" />
    </div>
  );
}
