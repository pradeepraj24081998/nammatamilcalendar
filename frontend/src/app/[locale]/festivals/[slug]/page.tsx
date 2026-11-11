import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FESTIVALS_DATA } from '@/data/festivalsContent';
import { Locale } from '@/lib/types';
import { TempleBellIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Utensils, HelpCircle, ChevronRight, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs = Object.keys(FESTIVALS_DATA);
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['ta', 'en']) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const fest = FESTIVALS_DATA[slug];
  if (!fest) return { title: 'Festival Not Found' };

  const isEn = locale === 'en';
  const title = isEn ? `${fest.nameEn} 2026 & 2027 Dates, Rituals & Significance` : `${fest.nameTa} 2026 & 2027 தேதிகள், பூஜை முறைகள் மற்றும் வரலாறு`;
  const description = isEn
    ? `Comprehensive guide to ${fest.nameEn}: auspicious dates for 2026 and 2027, authentic pooja rituals, traditional dishes, significance, and cultural observance in Tamil Nadu.`
    : `${fest.nameTa} கொண்டாடும் முறை, 2026 மற்றும் 2027 சுப தேதிகள், பூஜை விதிகள், பாரம்பரிய நைவேத்திய உணவுகள் மற்றும் ஆன்மிக தத்துவம்.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/festivals/${slug}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/festivals/${slug}`,
        en: `https://nammatamilcalendar.in/en/festivals/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://nammatamilcalendar.in/${locale}/festivals/${slug}`,
      type: 'article',
    },
  };
}

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const fest = FESTIVALS_DATA[slug];
  if (!fest) {
    notFound();
  }

  const isTa = locale === 'ta';

  // Schema.org structured data
  const eventSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: isTa ? fest.nameTa : fest.nameEn,
    description: isTa ? fest.significanceTa : fest.significanceEn,
    startDate: '2026-01-15T06:00:00+05:30', // Updated per festival in schema
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Tamil Nadu, India',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
  };

  const faqSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: fest.faqs.map((faq) => ({
      '@type': 'Question',
      name: isTa ? faq.questionTa : faq.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isTa ? faq.answerTa : faq.answerEn,
      },
    })),
  };

  const breadcrumbJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isTa ? 'முகப்பு' : 'Home',
        item: `https://nammatamilcalendar.in/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isTa ? 'பண்டிகைகள்' : 'Festivals',
        item: `https://nammatamilcalendar.in/${locale}/festivals`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isTa ? fest.nameTa : fest.nameEn,
        item: `https://nammatamilcalendar.in/${locale}/festivals/${slug}`,
      },
    ],
  };

  const otherFestivals = Object.values(FESTIVALS_DATA).filter((f) => f.slug !== slug);

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemaJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-bold text-[#5C5256]">
        <Link href={`/${locale}`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'முகப்பு' : 'Home'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <Link href={`/${locale}/festivals`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'பண்டிகைகள்' : 'Festivals'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <span className="text-[#8B1515] truncate">{isTa ? fest.nameTa : fest.nameEn}</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <AgalVilakkuIcon className="w-4 h-4 shrink-0" />
          <span>{isTa ? fest.tamilMonthSeasonTa : fest.tamilMonthSeasonEn}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isTa ? fest.nameTa : fest.nameEn}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-3xl">
          {isTa ? fest.subtitleTa : fest.subtitleEn}
        </p>
      </div>

      {/* Verified Dates Callout Cards for 2026 and 2027 */}
      <section aria-labelledby="dates-heading" className="p-5 sm:p-6 rounded-3xl bg-[#FFF9F0] border-2 border-[#D4AF37] space-y-4">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Calendar className="w-5 h-5 text-[#8B1515]" />
          <h2 id="dates-heading" className="text-lg sm:text-xl font-black">
            {isTa ? 'அடுத்த பண்டிகை சுப தேதிகள் (2026 & 2027 Dates)' : 'Verified Upcoming Festival Dates (2026 & 2027)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* 2026 */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] shadow-xs space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1515] block">
              {isTa ? '2026 ஆம் ஆண்டு தேதி' : 'Year 2026 Date'}
            </span>
            <span className="text-base sm:text-lg font-black text-[#1F1517] block">
              {fest.dates.year2026.gregorian}
            </span>
            <span className="text-xs text-[#5C5256] font-semibold block">
              {fest.dates.year2026.tamil} ({fest.dates.year2026.day})
            </span>
          </div>

          {/* 2027 */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBDCCF] shadow-xs space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1515] block">
              {isTa ? '2027 ஆம் ஆண்டு தேதி' : 'Year 2027 Date'}
            </span>
            <span className="text-base sm:text-lg font-black text-[#1F1517] block">
              {fest.dates.year2027.gregorian}
            </span>
            <span className="text-xs text-[#5C5256] font-semibold block">
              {fest.dates.year2027.tamil} ({fest.dates.year2027.day})
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Articles */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-10 rounded-3xl shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        
        {/* 1. Meaning & Spiritual Significance */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <BookOpen className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-xl sm:text-2xl font-black">
              {isTa ? 'பண்டிகையின் ஆன்மிக தத்துவம் & வரலாறு' : 'Spiritual Significance & Cultural Heritage'}
            </h2>
          </div>
          <p className="leading-relaxed text-[#29262A]">
            {isTa ? fest.significanceTa : fest.significanceEn}
          </p>
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border-l-4 border-[#8B1515] text-xs sm:text-sm text-[#5C5256] italic">
            {isTa ? fest.significanceEn : fest.significanceTa}
          </div>
        </section>

        {/* 2. How it is Celebrated in Tamil Nadu */}
        <section className="space-y-3 border-t-2 border-[#EBDCCF] pt-6">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-black">
              {isTa ? 'தமிழ்நாட்டில் கொண்டாடும் முறை' : 'How it is Celebrated in Tamil Nadu'}
            </h2>
          </div>
          <p className="leading-relaxed text-[#29262A]">
            {isTa ? fest.celebrationTamilNaduTa : fest.celebrationTamilNaduEn}
          </p>
        </section>

        {/* 3. Sacred Customs and Rituals */}
        <section className="space-y-3 border-t-2 border-[#EBDCCF] pt-6">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <TempleBellIcon className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-xl sm:text-2xl font-black">
              {isTa ? 'பூஜை முறைகள் மற்றும் வழிபாட்டு நெறிமுறைகள்' : 'Sacred Customs & Pooja Rituals'}
            </h2>
          </div>
          <ul className="space-y-2.5">
            {(isTa ? fest.ritualsTa : fest.ritualsEn).map((ritual, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8B1515]/10 text-[#8B1515] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-[#29262A] leading-relaxed">{ritual}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Traditional Foods & Prasadam */}
        <section className="space-y-3 border-t-2 border-[#EBDCCF] pt-6">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <Utensils className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-xl sm:text-2xl font-black">
              {isTa ? 'பாரம்பரிய நைவேத்திய உணவுகள்' : 'Traditional Festive Foods & Prasadam'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(isTa ? fest.traditionalFoodsTa : fest.traditionalFoodsEn).map((food, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#1F1517]">{food}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Do's and Don'ts */}
        <section className="space-y-4 border-t-2 border-[#EBDCCF] pt-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#8B1515]">
            {isTa ? 'செய்ய வேண்டியவை & தவிர்க்க வேண்டியவை' : "Do's and Don'ts"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dos */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isTa ? 'செய்ய வேண்டியவை (Do’s)' : 'Recommended (Do’s)'}</span>
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                {(isTa ? fest.dosTa : fest.dosEn).map((d, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Donts */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{isTa ? 'தவிர்க்க வேண்டியவை (Don’ts)' : 'Avoid (Don’ts)'}</span>
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                {(isTa ? fest.dontsTa : fest.dontsEn).map((d, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section with FAQ Schema */}
        <section className="space-y-4 border-t-2 border-[#EBDCCF] pt-6">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <HelpCircle className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-xl sm:text-2xl font-black">
              {isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <div className="space-y-3">
            {fest.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
                <h3 className="font-bold text-sm text-[#8B1515]">
                  {isTa ? faq.questionTa : faq.questionEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed">
                  {isTa ? faq.answerTa : faq.answerEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Explore Other Festivals Strip */}
      <section aria-labelledby="other-festivals-heading" className="space-y-3">
        <h2 id="other-festivals-heading" className="text-base sm:text-lg font-black text-[#8B1515]">
          {isTa ? 'பிற முக்கிய தமிழ் பண்டிகைகள்' : 'Explore Other Major Tamil Festivals'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherFestivals.slice(0, 6).map((other) => (
            <Link
              key={other.slug}
              href={`/${locale}/festivals/${other.slug}`}
              className="p-4 rounded-2xl bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs sm:text-sm font-black text-[#8B1515] group-hover:text-[#C93B2B] block">
                  {isTa ? other.nameTa : other.nameEn}
                </span>
                <span className="text-[11px] text-[#5C5256]">
                  {isTa ? other.tamilMonthSeasonTa : other.tamilMonthSeasonEn}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

