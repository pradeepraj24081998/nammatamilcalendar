import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/types';
import { Wrench, ArrowLeftRight, Clock, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Tamil Calendar Tools & Utilities' : 'தமிழ் காலண்டர் பயன்பாட்டுக் கருவிகள் (Calendar Tools)',
    description: isEn
      ? 'Free online Tamil calendar utilities: English to Tamil date converter, Nalla Neram & Rahu Kalam timing finder, and panchangam calculators.'
      : 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி, நல்ல நேரம் & இராகு காலம் கண்டறிதல் உள்ளிட்ட பயனுள்ள இலவச தமிழ் காலண்டர் கருவிகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/tools`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/tools',
        en: 'https://nammatamilcalendar.in/en/tools',
      },
    },
  };
}

export default async function ToolsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTa = locale === 'ta';

  const tools = [
    {
      href: `/${locale}/tools/date-converter`,
      title: isTa ? 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி' : 'English ↔ Tamil Date Converter',
      desc: isTa
        ? 'எந்தவொரு ஆங்கில தேதியையும் பாரம்பரிய தமிழ் மாதத் தேதியாகவும், தமிழ் தேதியை ஆங்கில தேதியாகவும் நொடியில் மாற்றி அறியலாம்.'
        : 'Bidirectional converter between Gregorian dates and traditional Tamil solar calendar dates with complete Panchangam details.',
      icon: ArrowLeftRight,
      badge: isTa ? 'மிகவும் பிரபலம்' : 'Most Popular',
      features: isTa
        ? ['இயல்புநிலை: இன்றைய தேதி', 'திதி, நட்சத்திரம் விவரங்கள்', '2026 – 2027 தரவுகள்']
        : ['Default: Today\'s Date', 'Tithi & Nakshatra', '2026 – 2027 Verified'],
    },
    {
      href: `/${locale}/tools/nalla-neram-finder`,
      title: isTa ? 'நல்ல நேரம் & இராகு காலம் கண்டறிதல்' : 'Nalla Neram & Rahu Kalam Finder',
      desc: isTa
        ? 'குறிப்பிட்ட நாளில் சுப காரியங்களுக்கான காலை/மாலை நல்ல நேரம், கௌரி நல்ல நேரம் மற்றும் தவிர்க்க வேண்டிய இராகு காலம், எமகண்டம்.'
        : 'Instant auspicious timings checker: Morning/Evening Nalla Neram, Gowri Nalla Neram, and inauspicious hours like Rahu Kalam.',
      icon: Clock,
      badge: isTa ? 'தினசரி பயன்பாடு' : 'Daily Essential',
      features: isTa
        ? ['சுப & அசுப நேரங்கள்', 'கௌரி நல்ல நேரம்', 'சுப முகூர்த்தக் குறிப்பு']
        : ['Auspicious & Inauspicious', 'Gowri Timings', 'Muhurtham Indicators'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-bold text-[#5C5256]">
        <Link href={`/${locale}`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'முகப்பு' : 'Home'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <span className="text-[#8B1515]">{isTa ? 'கருவிகள்' : 'Tools'}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>{isTa ? 'ஆன்லைன் பயன்பாட்டுக் கருவிகள்' : 'Interactive Utilities'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isTa ? 'தமிழ் காலண்டர் பயன்பாட்டுக் கருவிகள்' : 'Tamil Calendar Tools & Utilities'}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-2xl">
          {isTa
            ? 'தினசரி தேவைகளுக்கான துல்லியமான தேதி மாற்றம், நல்ல நேர அட்டவணை மற்றும் பஞ்சாங்க கணக்கீடுகளை வழங்கும் இலவச கருவிகள்.'
            : 'Authoritative, free online utilities for daily auspicious timings, date conversion, and traditional Tamil calendar calculation.'}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group block p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] text-[#8B1515] flex items-center justify-center group-hover:bg-[#8B1515] group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                  {t.badge}
                </span>
              </div>

              <h2 className="text-xl font-black text-[#8B1515] group-hover:text-[#700C0C] transition-colors mb-2">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed mb-4">
                {t.desc}
              </p>

              <div className="space-y-1.5 border-t border-[#EBDCCF]/60 pt-4 mb-4">
                {t.features.map((feat) => (
                  <div key={feat} className="flex items-center space-x-2 text-xs font-bold text-[#29262A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center space-x-1.5 text-xs font-black text-[#8B1515] group-hover:translate-x-1 transition-transform">
                <span>{isTa ? 'கருவியைத் திறக்க' : 'Launch Tool'}</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

