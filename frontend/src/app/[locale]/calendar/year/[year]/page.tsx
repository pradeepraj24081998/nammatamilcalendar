import React from 'react';
import { fetchYearCalendar } from '@/lib/api';
import { YearGrid } from '@/components/calendar/YearGrid';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
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
      ? `Yearly overview for Tamil calendar ${year} with monthly summaries, verified festivals, and auspicious Muhurtham dates.`
      : `${year} முழு வருட தமிழ் நாட்காட்டி சுருக்கம், 12 மாத காலண்டர், அரசு விடுமுறைகள் மற்றும் சுப முகூர்த்த நாட்கள்.`,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/year/${year}`,
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

  return (
    <div className="space-y-6">
      <YearGrid yearData={yearResponse || fallbackData} locale={locale} />
      <AdContainer slotName="Yearly View Bottom" format="banner" />
    </div>
  );
}
