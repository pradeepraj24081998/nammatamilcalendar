import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/types';
import { Mail, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Contact Us | Namma Tamil Calendar' : 'தொடர்புக்கு | நம்ம தமிழ் காலண்டர்',
    description: 'Get in touch with the Namma Tamil Calendar team for queries, suggestions, and corrections.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <article className="max-w-2xl mx-auto space-y-8 bg-white dark:bg-[#201B1E] border border-[#E9E1D8] dark:border-[#382F35] p-6 sm:p-10 rounded-3xl shadow-xs">
      <div className="border-b border-[#E9E1D8] dark:border-[#382F35] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? 'Contact Us' : 'எங்களை தொடர்பு கொள்ள'}
        </h1>
        <p className="text-sm text-[#6B6268] dark:text-[#A89FA4]">
          {isEn ? 'We welcome questions, corrections, and partnerships' : 'கேள்விகள், திருத்தங்கள் மற்றும் கருத்துக்களை பகிரலாம்'}
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#29262A] dark:text-[#F5EFEB]">
        <p>
          {isEn
            ? 'Have a question about a festival date, calendar calculation, or want to suggest a new feature? You can reach us directly through our interactive feedback desk.'
            : 'காலண்டர் விவரங்கள், பண்டிகை தேதிகள் பற்றிய சந்தேகங்கள் அல்லது புதிய வசதிகள் குறித்த கருத்துக்கள் இருந்தால் எங்கள் கருத்துப் பக்கத்தின் வாயிலாக எளிதில் தொடர்புகொள்ளலாம்.'}
        </p>

        <div className="p-6 rounded-2xl bg-[#FFF9F0] dark:bg-[#1A1618] border border-[#E9E1D8] dark:border-[#382F35] space-y-4">
          <div className="flex items-center space-x-3 text-[#70263B] dark:text-[#DFBA73]">
            <MessageSquare className="w-5 h-5 text-[#C94F36]" />
            <h2 className="text-base font-bold">
              {isEn ? 'Interactive Feedback Form' : 'இணையவழி கருத்து படிவம்'}
            </h2>
          </div>
          <p className="text-xs text-[#6B6268] dark:text-[#A89FA4]">
            {isEn
              ? 'Use our structured feedback form to submit specific corrections, website bugs, or suggestions directly to our editorial team.'
              : 'எங்கள் ஆசிரியர் குழுவிற்கு நேரடியாக கருத்துக்களை தெரிவிக்க கீழே உள்ள பொத்தானை அழுத்தவும்.'}
          </p>
          <Link
            href={`/${locale}/feedback`}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#70263B] text-white text-xs font-bold hover:bg-[#852E46] transition-colors shadow-xs"
          >
            <span>{isEn ? 'Open Feedback Desk' : 'கருத்து படிவம் செல்ல'}</span>
          </Link>
        </div>

        <p className="text-xs text-[#6B6268] dark:text-[#A89FA4]">
          {isEn
            ? 'Official inquiries: nammatamilcalendar@gmail.com'
            : 'அதிகாரப்பூர்வ தொடர்புக்கு: nammatamilcalendar@gmail.com'}
        </p>
      </div>
    </article>
  );
}
