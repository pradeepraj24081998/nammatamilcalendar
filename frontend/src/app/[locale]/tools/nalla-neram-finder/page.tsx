import React from 'react';
import Link from 'next/link';
import { NallaNeramFinder } from '@/components/tools/NallaNeramFinder';
import { Locale } from '@/lib/types';
import { Clock, ChevronRight, Sparkles, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Nalla Neram & Rahu Kalam Finder for Any Date' : 'நல்ல நேரம் & ராகு காலம் தேடி (Auspicious Time Finder)',
    description: isEn
      ? 'Interactive tool to find Nalla Neram, Gowri Nalla Neram, Rahu Kalam, Yamagandam, and Kuligai for any date across 2026 and 2027.'
      : 'எந்தவொரு தேதியையும் தேர்ந்தெடுத்து உடனுக்குடன் நல்ல நேரம், கௌரி நல்ல நேரம், இராகு காலம், எமகண்டம், மற்றும் குளிகை நேரங்களை அறியும் எளிய கருவி.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/tools/nalla-neram-finder`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/tools/nalla-neram-finder',
        en: 'https://nammatamilcalendar.in/en/tools/nalla-neram-finder',
      },
    },
  };
}

export default async function NallaNeramFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTa = locale === 'ta';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-bold text-[#5C5256]">
        <Link href={`/${locale}`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'முகப்பு' : 'Home'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <span className="text-[#8B1515]">
          {isTa ? 'நல்ல நேரம் / ராகு காலம் தேடி' : 'Nalla Neram Finder Tool'}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>{isTa ? 'சுப நேரத் தேடல் கருவி' : 'Auspicious Timings Finder'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isTa ? 'நல்ல நேரம் & ராகு காலம் தேடி' : 'Nalla Neram & Rahu Kalam Finder'}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-2xl">
          {isTa
            ? 'நீங்கள் விரும்பும் எந்தவொரு குறிப்பிட்ட நாளின் நல்ல நேரம், கௌரி நல்ல நேரம், இராகு காலம் மற்றும் எமகண்ட நேரங்களை உடனடியாக அறியலாம்.'
            : 'Select any chosen date across 2026 and 2027 to calculate authoritative Nalla Neram, Gowri intervals, and Rahu Kalam timings.'}
        </p>
      </div>

      {/* Interactive Tool */}
      <NallaNeramFinder locale={locale} />

      {/* Helpful Guidelines */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <Sparkles className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-lg sm:text-xl font-black">
              {isTa ? 'சுப நேரம் தேர்ந்தெடுக்கும் முறை' : 'How to Pick Auspicious Timings'}
            </h2>
          </div>
          <p className="text-[#29262A] text-xs sm:text-sm leading-relaxed">
            {isTa
              ? 'முக்கியமான தொலைபேசி உரையாடல்கள், நேர்காணல்கள், புதிய வேலைகள் அல்லது பயணங்களை நல்ல நேரம் அல்லது கௌரி நல்ல நேரத்தில் தொடங்க வேண்டும். அதே சமயம், இராகு காலம் மற்றும் எமகண்ட நேரங்களைத் தவிர்க்க வேண்டும்.'
              : 'Important contracts, interviews, registrations, or journeys are best commenced during prevailing Nalla Neram or Gowri auspicious windows, taking special care to steer clear of Rahu Kalam.'}
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-3 pt-3 border-t border-[#EBDCCF]">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <HelpCircle className="w-4 h-4 text-[#8B1515]" />
            <h3 className="text-sm sm:text-base font-black">
              {isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
            </h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
              <span className="font-bold text-[#8B1515] block">
                {isTa ? 'கௌரி நல்ல நேரத்தின் முக்கியத்துவம் என்ன?' : 'What is the special virtue of Gowri Nalla Neram?'}
              </span>
              <p className="text-[#5C5256]">
                {isTa
                  ? 'பார்வதி தேவியின் திருவருள் பொருந்திய கௌரி நல்ல நேரம் சுப காரியங்களுக்கும், நீண்ட பயணங்களுக்கும் மிகுந்த நன்மைகளைத் தரக்கூடியதாகும்.'
                  : 'Gowri Nalla Neram is consecrated to Goddess Parvati, providing propitious intervals throughout the day and evening for travel and auspicious agreements.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

