import React from 'react';
import { Locale } from '@/lib/types';
import { ContactForm } from '@/components/contact/ContactForm';
import { TempleBellIcon } from '@/components/ui/CalendarIcons';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Contact Us | Namma Tamil Calendar Support' : 'எங்களை தொடர்பு கொள்ள | நம்ம தமிழ் காலண்டர்',
    description: isEn
      ? 'Get in touch with the Namma Tamil Calendar team for questions, festival date corrections, advertisements, and suggestions.'
      : 'நம்ம தமிழ் காலண்டர் குழுவினரை தொடர்புகொள்ள மின்னஞ்சல், வாட்ஸ்அப் மற்றும் நேரடி படிவம்.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const isTa = locale === 'ta';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-4 xs:p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700] max-w-full overflow-hidden">
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2">
          <TempleBellIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] shrink-0" />
          <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-white">
            {isTa ? 'எங்களை தொடர்பு கொள்ள' : 'Contact Namma Tamil Calendar'}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-2xl font-medium leading-relaxed">
          {isTa
            ? 'காலண்டர் விவரங்கள், பண்டிகைகள், சுபமுகூர்த்தம் அல்லது உங்கள் கருத்துக்களை எங்களுடன் எளிதாகப் பகிருங்கள். உங்களுக்கு உதவ நாங்கள் எப்போதும் தயாராக உள்ளோம்.'
            : 'Have questions, feedback, or inquiries regarding festival dates, auspicious timings, or calendar features? Reach out anytime — we are always here to help.'}
        </p>
      </div>

      {/* Main Interactive Contact Hub */}
      <ContactForm locale={locale} />
    </div>
  );
}
