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
import { Sparkles, ArrowRight, Calendar, Heart, Compass, BookOpen, Wrench, HelpCircle, ArrowLeftRight, Clock } from 'lucide-react';
import { getTodayISTString } from '@/lib/dateUtils';
import { GUIDES_DATA } from '@/data/guidesContent';
import { QuickMonthGrid } from '@/components/calendar/QuickMonthGrid';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const todayStr = getTodayISTString();

  return {
    title: isEn
      ? `Today Tamil Calendar ${todayStr} | Panchangam & Nalla Neram`
      : `இன்றைய தமிழ் காலண்டர் ${todayStr} | பஞ்சாங்கம் & நல்ல நேரம்`,
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const isTa = locale === 'ta';
  const dict = getDictionary(locale);

  // Fetch today's calendar data
  let dayData = await fetchTodayCalendar();
  if (!dayData) {
    dayData = await fetchDayCalendar(getTodayISTString());
  }

  const upcomingFestivals = await fetchUpcomingFestivals();
  const currentDateStr = dayData?.date || getTodayISTString();
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
      title: isTa ? 'மாத காலண்டர்' : 'Monthly Calendar',
      subtitle: isTa ? 'முழு மாத நாட்காட்டி' : 'Full Month View',
      href: `/${locale}/calendar/month/${currentYear}/${currentMonth}`,
      icon: Compass,
      gradient: 'from-[#8B1515] to-[#C93B2B]',
    },
    {
      title: isTa ? 'சுப முகூர்த்தம்' : 'Muhurtham Dates',
      subtitle: isTa ? 'திருமண முகூர்த்த நாட்கள்' : 'Wedding Dates',
      href: `/${locale}/muhurtham-dates?year=${currentYear}`,
      icon: Heart,
      gradient: 'from-[#D97706] to-[#F59E0B]',
    },
    {
      title: isTa ? 'பண்டிகைகள்' : 'Festivals',
      subtitle: isTa ? 'விரதங்கள் & விசேஷங்கள்' : 'Viratham & Holidays',
      href: `/${locale}/festivals?year=${currentYear}`,
      icon: Sparkles,
      gradient: 'from-[#BE123C] to-[#E11D48]',
    },
    {
      title: isTa ? 'வருட காலண்டர்' : 'Yearly Overview',
      subtitle: isTa ? '12 மாத காலண்டர் சுருக்கம்' : '12 Month Summary',
      href: `/${locale}/calendar/year/${currentYear}`,
      icon: Calendar,
      gradient: 'from-[#15803D] to-[#16A34A]',
    },
  ];

  const guides = Object.values(GUIDES_DATA);

  const homeFaqJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isTa ? 'இன்றைய நல்ல நேரம் மற்றும் கௌரி நல்ல நேரம் எப்போது?' : "What is today's Nalla Neram and Gowri Nalla Neram?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: isTa
            ? `இன்றைய காலை நல்ல நேரம் ${dayData.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15'} மற்றும் மாலை நல்ல நேரம் ${dayData.auspicious_timings?.nalla_neram_evening || '04:45 - 05:45'} ஆகும்.`
            : `Today's morning Nalla Neram is ${dayData.auspicious_timings?.nalla_neram_morning || '09:15 - 10:15'} and evening Nalla Neram is ${dayData.auspicious_timings?.nalla_neram_evening || '04:45 - 05:45'}.`,
        },
      },
      {
        '@type': 'Question',
        name: isTa ? 'இன்றைய இராகு காலம் மற்றும் எமகண்டம் எப்போது?' : "What is today's Rahu Kalam and Yamagandam?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: isTa
            ? `இன்றைய இராகு காலம் ${dayData.inauspicious_timings?.rahu_kalam || '10:30 AM - 12:00 PM'} மற்றும் எமகண்டம் ${dayData.inauspicious_timings?.yamagandam || '03:00 PM - 04:30 PM'} ஆகும்.`
            : `Today's Rahu Kalam is ${dayData.inauspicious_timings?.rahu_kalam || '10:30 AM - 12:00 PM'} and Yamagandam is ${dayData.inauspicious_timings?.yamagandam || '03:00 PM - 04:30 PM'}.`,
        },
      },
    ],
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJSONLD) }}
      />

      {/* 1. Date Navigation */}
      <DateSelector currentDateStr={currentDateStr} locale={locale} />

      {/* 2. Main Daily Calendar Sheet */}
      <DailyCalendarCard day={dayData} locale={locale} />

      {/* 3. Quick Feature Cards Ribbon */}
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

      {/* 4. Interactive Utilities Ribbon */}
      <section aria-label="Helpful Tools" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href={`/${locale}/tools/date-converter`}
          className="p-4 rounded-2xl bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1515]/10 flex items-center justify-center text-[#8B1515]">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-[#8B1515] group-hover:text-[#C93B2B] block">
                {isTa ? 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி' : 'English ↔ Tamil Date Converter'}
              </span>
              <span className="text-[11px] text-[#5C5256]">
                {isTa ? 'துல்லியமான உடனடி தேதி கணிப்பு' : 'Instant bidirectional calendar lookup'}
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href={`/${locale}/tools/nalla-neram-finder`}
          className="p-4 rounded-2xl bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-[#8B1515] group-hover:text-[#C93B2B] block">
                {isTa ? 'நல்ல நேரம் & ராகு காலம் தேடி' : 'Nalla Neram & Rahu Kalam Finder'}
              </span>
              <span className="text-[11px] text-[#5C5256]">
                {isTa ? 'எந்தவொரு நாளின் சுப நேரங்களையும் காண்க' : 'Check auspicious intervals for any chosen date'}
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* 5. Mid-Feed Non-Intrusive Ad Placement */}
      <AdContainer slotName="Home Daily Mid-Feed" format="banner" />

      {/* 6. Upcoming Festivals & Observances Strip */}
      {upcomingFestivals.length > 0 && (
        <section aria-labelledby="upcoming-festivals-heading" className="bg-white border-2 border-[#EBDCCF] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#EBDCCF] pb-3">
            <div className="flex items-center space-x-2">
              <TempleBellIcon className="w-5 h-5 text-[#8B1515]" />
              <h2 id="upcoming-festivals-heading" className="text-lg font-black text-[#8B1515]">
                {isTa ? 'அடுத்த முக்கிய பண்டிகைகள் & விரத தினங்கள்' : 'Upcoming Festivals & Observances'}
              </h2>
            </div>
            <Link
              href={`/${locale}/festivals`}
              className="text-xs font-bold text-[#8B1515] hover:underline flex items-center space-x-1"
            >
              <span>{isTa ? 'அனைத்தும் பார்க்க' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Viratham & Observance Jump Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { labelTa: 'பௌர்ணமி', labelEn: 'Pournami', cat: 'pournami' },
              { labelTa: 'அமாவாசை', labelEn: 'Amavasai', cat: 'amavasai' },
              { labelTa: 'பிரதோஷம்', labelEn: 'Pradosham', cat: 'pradosham' },
              { labelTa: 'கிருத்திகை', labelEn: 'Krithigai', cat: 'krithigai' },
              { labelTa: 'அரசு விடுமுறை', labelEn: 'Holidays', cat: 'holidays' },
            ].map((pill) => (
              <Link
                key={pill.cat}
                href={`/${locale}/festivals?year=${currentYear}&category=${pill.cat}`}
                className="text-xs font-black px-3 py-1 rounded-xl bg-[#FFF9F0] text-[#8B1515] border border-[#EBDCCF] hover:bg-[#8B1515] hover:text-white transition-all shrink-0 active:scale-95 touch-manipulation shadow-2xs"
              >
                {isTa ? pill.labelTa : pill.labelEn}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingFestivals.slice(0, 6).map((fest) => (
              <Link
                key={fest.date}
                href={`/${locale}/calendar/${fest.date}`}
                className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-xs font-extrabold text-[#8B1515] block group-hover:text-[#C93B2B]">
                    {fest.festival_info || fest.day_auspicious}
                  </span>
                  <span className="text-[11px] text-[#5C5256] font-semibold">
                    {fest.date} ({fest.tamil_month} {fest.tamil_date})
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 7. Educational Panchangam Knowledge Guides Hub */}
      <section aria-labelledby="learn-heading" className="bg-[#FFF9F0] border-2 border-[#D4AF37] p-6 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/50 pb-3">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <BookOpen className="w-5 h-5 text-[#8B1515]" />
            <h2 id="learn-heading" className="text-base sm:text-lg font-black">
              {isTa ? 'பஞ்சாங்க வழிகாட்டி & ஆன்மிகக் கட்டுரைகள்' : 'Panchangam Educational Guides'}
            </h2>
          </div>
          <Link
            href={`/${locale}/learn`}
            className="text-xs font-black text-[#8B1515] hover:underline flex items-center space-x-1"
          >
            <span>{isTa ? 'அனைத்து கட்டுரைகள்' : 'View All Guides'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guides.slice(0, 3).map((art) => (
            <Link
              key={art.slug}
              href={`/${locale}/learn/${art.slug}`}
              className="p-4 rounded-2xl bg-white border border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-black text-[#8B1515] group-hover:text-[#C93B2B] block leading-snug">
                  {isTa ? art.titleTa : art.titleEn}
                </span>
                <span className="text-[11px] text-[#5C5256] line-clamp-2 block leading-relaxed">
                  {isTa ? art.summaryTa : art.summaryEn}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] mt-3 block">
                {art.readTime}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Quick Monthly Navigation Grid (Supports 2026 & 2027) */}
      <QuickMonthGrid initialYear={currentYear} locale={locale} />

      {/* 9. Real Homepage FAQ Block */}
      <section aria-labelledby="home-faq-heading" className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <HelpCircle className="w-5 h-5 text-[#8B1515]" />
          <h2 id="home-faq-heading" className="text-base sm:text-lg font-black">
            {isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (Panchangam FAQ)' : 'Frequently Asked Questions (FAQ)'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
            <span className="font-bold text-[#8B1515] block">
              {isTa ? '1. நல்ல நேரம் எவ்வாறு கணக்கிடப்படுகிறது?' : '1. How is daily Nalla Neram calculated?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'அன்றைய கிழமையின் அதிபதியான கிரகத்தின் சுப ஹோரைகள் மற்றும் சூரிய உதய நேரத்தைக் கொண்டு வாக்கிய பஞ்சாங்க விதிகளின்படி நல்ல நேரம் கணக்கிடப்படுகிறது.'
                : 'Calculated using traditional Vakya planetary Hora tables aligned with the daily sunrise of Chennai / IST timezone.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
            <span className="font-bold text-[#8B1515] block">
              {isTa ? '2. சந்திராஷ்டமம் என்றால் என்ன?' : '2. What is Chandrashtamam?'}
            </span>
            <p className="text-[#5C5256] leading-relaxed">
              {isTa
                ? 'உங்கள் ராசிக்கு 8-ஆம் இடத்தில் சந்திரன் சஞ்சரிக்கும் இரண்டேகால் நாட்கள் சந்திராஷ்டமம் ஆகும்; இந்நாளில் புதிய காரியங்களைத் தவிர்த்து அமைதி காப்பது நன்று.'
                : 'Chandrashtamam occurs when the Moon transits the 8th house from your natal Moon sign (~2.25 days), during which quiet contemplation is advised.'}
            </p>
          </div>
        </div>
      </section>

      {/* 10. Bottom Leaderboard Ad */}
      <AdContainer slotName="Home Bottom Leaderboard" format="banner" />
    </div>
  );
}
