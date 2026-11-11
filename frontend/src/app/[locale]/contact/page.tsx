import React from 'react';
import { Locale } from '@/lib/types';
import { ContactForm } from '@/components/contact/ContactForm';
import { TempleBellIcon } from '@/components/ui/CalendarIcons';
import { Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Contact Us' : 'எங்களை தொடர்பு கொள்ள (Contact Us)',
    description: isEn
      ? 'Get in touch with the Namma Tamil Calendar editorial desk: questions, festival date corrections, advertisements, and suggestions with 24-48h response.'
      : 'நம்ம தமிழ் காலண்டர் ஆசிரியர் குழுவினரை தொடர்புகொள்ள: கேள்விகள், பண்டிகை தேதிகள் திருத்தம், விளம்பரங்கள் மற்றும் ஆலோசனைகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/contact`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/contact',
        en: 'https://nammatamilcalendar.in/en/contact',
      },
    },
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

  const contactSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Namma Tamil Calendar',
    url: `https://nammatamilcalendar.in/${locale}/contact`,
    description: 'Contact information for Namma Tamil Calendar editorial and support team.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Namma Tamil Calendar',
      url: 'https://nammatamilcalendar.in',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'arangaapradeep@gmail.com',
        availableLanguage: ['Tamil', 'English'],
        areaServed: ['IN', 'MY', 'SG', 'LK', 'AE', 'US', 'GB'],
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchemaJSONLD) }}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-5 xs:p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700] max-w-full overflow-hidden">
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2">
          <TempleBellIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] shrink-0" />
          <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-white">
            {isTa ? 'எங்களை தொடர்பு கொள்ள' : 'Contact Namma Tamil Calendar'}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-2xl font-medium leading-relaxed">
          {isTa
            ? 'காலண்டர் விவரங்கள், பண்டிகைகள், சுபமுகூர்த்தம் அல்லது உங்கள் கருத்துக்களை எங்களுடன் எளிதாகப் பகிருங்கள். உங்கள் செய்திகளுக்கு 24 முதல் 48 மணி நேரத்திற்குள் பதில் அளிக்கப்படும்.'
            : 'Have questions, feedback, or inquiries regarding festival dates, auspicious timings, or calendar features? Reach out anytime — we commit to responding within 24–48 hours.'}
        </p>

        {/* Trust Badges */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-3 text-xs font-bold text-[#FFD700]">
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-white/90" />
            <span className="text-white/90">{isTa ? 'பதில் உறுதி: 24-48 மணி நேரம்' : 'Response SLA: 24–48 Hours'}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-white/90" />
            <span className="text-white/90">{isTa ? 'தமிழ்நாடு, இந்தியா' : 'Tamil Nadu, India'}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white/90">{isTa ? 'நேரடி ஆசிரியர் பரிசீலனை' : 'Direct Editorial Review'}</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Contact Hub */}
      <ContactForm locale={locale} />
    </div>
  );
}
