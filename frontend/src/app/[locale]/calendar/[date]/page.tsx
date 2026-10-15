import React from 'react';
import { notFound } from 'next/navigation';
import { fetchDayCalendar } from '@/lib/api';
import { DailyCalendarCard } from '@/components/calendar/DailyCalendarCard';
import { DateSelector } from '@/components/calendar/DateSelector';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import type { Metadata } from 'next';

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
      : `தமிழ் காலண்டர் ${date} | இன்றைய நல்ல நேரம் & பஞ்சாங்கம்`,
    description: isEn
      ? `Accurate Tamil calendar details for ${date}, including Tamil date, Nalla Neram, Gowri Nalla Neram, Rahu Kalam, Thithi, Nakshatra, and Rasi Palan.`
      : `${date} அன்றைய தமிழ் காலண்டர், தமிழ் மாதம், தேதி, நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம், திதி, நட்சத்திரம் மற்றும் ராசிபலன்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/${date}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/calendar/${date}`,
        en: `https://nammatamilcalendar.in/en/calendar/${date}`,
      },
    },
  };
}

export default async function DatePage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const { date } = resolvedParams;

  const dayData = await fetchDayCalendar(date);
  if (!dayData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DateSelector currentDateStr={date} locale={locale} />
      <DailyCalendarCard day={dayData} locale={locale} />
      <AdContainer slotName="Date View Bottom Banner" format="banner" />
    </div>
  );
}
