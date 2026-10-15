import React from 'react';
import { fetchMonthCalendar } from '@/lib/api';
import { MonthGrid } from '@/components/calendar/MonthGrid';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}): Promise<Metadata> {
  const { locale, year, month } = await params;
  const isEn = locale === 'en';
  const dict = getDictionary(isEn ? 'en' : 'ta');
  const monthName = dict.months[parseInt(month, 10) - 1] || month;

  return {
    title: isEn
      ? `Tamil Calendar ${monthName} ${year} | Monthly Sheet & Festivals`
      : `தமிழ் காலண்டர் ${monthName} ${year} | மாத நாட்காட்டி & விசேஷங்கள்`,
    description: isEn
      ? `Complete monthly Tamil calendar grid for ${monthName} ${year} with Tamil dates, festivals, auspicious days, and Muhurtham timings.`
      : `${year} ${monthName} மாத முழுமையான தமிழ் நாட்காட்டி, தமிழ் தேதிகள், முகூர்த்த நாட்கள், பண்டிகைகள் மற்றும் விரத தினங்கள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/month/${year}/${month}`,
    },
  };
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const yearNum = parseInt(resolvedParams.year, 10);
  const monthNum = parseInt(resolvedParams.month, 10);

  const monthResponse = await fetchMonthCalendar(yearNum, monthNum);
  const days = monthResponse?.days || [];

  return (
    <div className="space-y-6">
      <MonthGrid year={yearNum} month={monthNum} days={days} locale={locale} />
      <AdContainer slotName="Monthly View Bottom" format="banner" />
    </div>
  );
}
