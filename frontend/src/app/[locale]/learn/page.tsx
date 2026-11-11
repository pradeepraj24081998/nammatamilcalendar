import React from 'react';
import Link from 'next/link';
import { GUIDES_DATA } from '@/data/guidesContent';
import { Locale } from '@/lib/types';
import { BookOpen, Sparkles, Clock, ArrowRight, Compass, Moon, Sun, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Tamil Calendar & Panchangam Guides' : 'தமிழ் பஞ்சாங்கம் வழிகாட்டி கட்டுரைகள்',
    description: isEn
      ? 'Comprehensive educational articles on reading a Panchangam, understanding Tithi, Nakshatra, Rahu Kalam, Yamagandam, Nalla Neram, and fasting rituals.'
      : 'பஞ்சாங்கம் பார்ப்பது எப்படி? திதி, நட்சத்திரம், இராகு காலம், எமகண்டம், நல்ல நேரம் மற்றும் முக்கிய விரத தினங்கள் குறித்த விளக்க கட்டுரைகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/learn`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/learn',
        en: 'https://nammatamilcalendar.in/en/learn',
      },
    },
  };
}

export default async function LearnIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTa = locale === 'ta';
  const articles = Object.values(GUIDES_DATA);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-5 h-5" />
          <span>{isTa ? 'அறிவுக்களஞ்சியம் & ஆன்மிகக் கட்டுரைகள்' : 'Knowledge Base & Educational Articles'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isTa ? 'தமிழ் காலண்டர் & பஞ்சாங்கம் வழிகாட்டிகள்' : 'Tamil Calendar & Panchangam Guides'}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-2xl">
          {isTa
            ? 'பாரம்பரிய தமிழ் பஞ்சாங்கம், நல்ல நேரம் கணிக்கும் முறைகள், நட்சத்திரக் கணக்கீடுகள், மற்றும் விரத நெறிமுறைகளை எளிய முறையில் அறிந்துகொள்ளுங்கள்.'
            : 'Explore clear, authoritative guides on mastering Panchangam reading, calculating auspicious timings, understanding lunar tithis, and observing sacred fasts.'}
        </p>
      </div>

      {/* Guide Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {articles.map((art, idx) => (
          <Link
            key={art.slug}
            href={`/${locale}/learn/${art.slug}`}
            className="bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] p-5 sm:p-6 rounded-3xl hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#8B1515]/10 text-[#8B1515] font-black text-sm flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="flex items-center space-x-1 text-xs font-bold text-[#5C5256]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-[#8B1515] group-hover:text-[#C93B2B] transition-colors leading-snug">
                {isTa ? art.titleTa : art.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed line-clamp-3">
                {isTa ? art.summaryTa : art.summaryEn}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EBDCCF]/70 flex items-center justify-between text-xs font-black text-[#8B1515]">
              <span>{isTa ? 'முழுமையாக வாசிக்க' : 'Read Full Article'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

