import React from 'react';
import Link from 'next/link';
import { DateConverter } from '@/components/tools/DateConverter';
import { Locale } from '@/lib/types';
import { ArrowLeftRight, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'English to Tamil Date Converter (and Reverse)' : 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி (Date Converter)',
    description: isEn
      ? 'Instant bidirectional converter between Gregorian English dates and traditional Tamil calendar dates for 2026 and 2027 with full panchangam details.'
      : 'ஆங்கில தேதியை தமிழ் தேதியாகவும், தமிழ் தேதியை ஆங்கில தேதியாகவும் நொடியில் மாற்றும் ஆன்லைன் கருவி. திதி, நட்சத்திரம் மற்றும் நல்ல நேரம் உடனுக்குடன்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/tools/date-converter`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/tools/date-converter',
        en: 'https://nammatamilcalendar.in/en/tools/date-converter',
      },
    },
  };
}

export default async function DateConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
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
          {isTa ? 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி' : 'English ↔ Tamil Date Converter'}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <ArrowLeftRight className="w-4 h-4" />
          <span>{isTa ? 'துல்லியமான ஆன்லைன் கருவி' : 'Authoritative Online Utility'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isTa ? 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி' : 'English to Tamil Date Converter'}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-2xl">
          {isTa
            ? 'எந்தவொரு ஆங்கில தேதியையும் பாரம்பரிய தமிழ் மாதத் தேதியாகவும், தமிழ் தேதியை ஆங்கில தேதியாகவும் துல்லியமாக மாற்றிக்கொள்ளுங்கள்.'
            : 'Convert any Gregorian English date to its corresponding Tamil calendar date or look up English dates from Tamil months instantly.'}
        </p>
      </div>

      {/* The Interactive Converter Component */}
      <DateConverter locale={locale} />

      {/* Educational Guide & FAQs */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <Sparkles className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-lg sm:text-xl font-black">
              {isTa ? 'தமிழ் தேதி எவ்வாறு கணக்கிடப்படுகிறது?' : 'How is the Tamil Date Determined?'}
            </h2>
          </div>
          <p className="text-[#29262A] text-xs sm:text-sm leading-relaxed">
            {isTa
              ? 'தமிழ் நாட்காட்டி சூரிய சங்கிராந்தியை அடிப்படையாகக் கொண்டது. சூரியன் மேஷ ராசியில் நுழையும் நாளில் சித்திரை 1 பிறக்கிறது. ஒரு குறிப்பிட்ட ஆங்கில நாளில் சூரியன் எந்த ராசியில் எத்தனை பாகை கடந்துள்ளது என்பதைக் கொண்டே தமிழ் மாதத்தின் நாளும் தேதியும் நிர்ணயிக்கப்படுகின்றன.'
              : 'The Tamil calendar is a sidereal solar calendar based on Surya Sankranti. The solar month and day advance as the Sun moves across the 360-degree zodiac, transitioning across the 12 Rasis from Mesha (Chithirai) to Meena (Panguni).'}
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
                {isTa ? 'இந்த கருவி எந்தெந்த ஆண்டுகளுக்குப் பொருந்தும்?' : 'Which years are supported by this converter?'}
              </span>
              <p className="text-[#5C5256]">
                {isTa
                  ? 'தற்போது 2026 மற்றும் 2027 ஆகிய முழு இரண்டு ஆண்டுகளுக்கான 730 நாட்களும் முழுமையான வாக்கிய பஞ்சாங்க விதிகளின்படி சரிபார்க்கப்பட்டு ஆதரிக்கப்படுகின்றன.'
                  : 'Currently, full calendar records for all days across 2026 and 2027 are comprehensively verified and supported.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

