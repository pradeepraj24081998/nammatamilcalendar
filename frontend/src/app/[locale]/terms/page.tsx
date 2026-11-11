import React from 'react';
import { Locale } from '@/lib/types';
import { Scale, CheckCircle2, ShieldAlert, FileText, Ban } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Terms & Conditions' : 'விதிமுறைகள் & நிபந்தனைகள் (Terms)',
    description: isEn
      ? 'Terms of Service and conditions of use for Namma Tamil Calendar: acceptable use, intellectual property, and content guidelines.'
      : 'நம்ம தமிழ் காலண்டர் பயன்பாட்டு விதிமுறைகள், பதிப்புரிமை மற்றும் சேவை நிபந்தனைகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/terms`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/terms',
        en: 'https://nammatamilcalendar.in/en/terms',
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <article className="max-w-4xl mx-auto space-y-8 bg-white border-2 border-[#EBDCCF] p-6 sm:p-10 rounded-3xl shadow-xs text-sm sm:text-base leading-relaxed text-[#1F1517]">
      {/* Header */}
      <div className="border-b-2 border-[#EBDCCF] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFF9F0] text-[#8B1515] border border-[#EBDCCF] text-xs font-bold mb-1">
          <Scale className="w-4 h-4 text-[#8B1515]" />
          <span>{isEn ? 'Legal Agreement & User Guidelines' : 'சட்டப்பூர்வ பயன்பாட்டு ஒப்பந்தம்'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#8B1515]">
          {isEn ? 'Terms and Conditions of Use' : 'பயன்பாட்டு விதிமுறைகள் மற்றும் நிபந்தனைகள்'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Last updated: November 2026 | By using https://nammatamilcalendar.in you agree to these terms.'
            : 'கடைசியாக புதுப்பிக்கப்பட்டது: நவம்பர் 2026 | இத்தளத்தைப் பயன்படுத்துவதன் மூலம் நீங்கள் இந்த நிபந்தனைகளை ஏற்கிறீர்கள்.'}
        </p>
      </div>

      {/* 1. Acceptance of Terms */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <FileText className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '1. Acceptance of Terms' : '1. விதிமுறைகளை ஏற்றுக்கொள்ளுதல்'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'By accessing and utilizing Namma Tamil Calendar (https://nammatamilcalendar.in), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, our Privacy Policy, and our Disclaimer. If you do not agree to these terms, please discontinue use of this site immediately.'
            : 'நம்ம தமிழ் காலண்டர் (https://nammatamilcalendar.in) தளத்திற்கு வருகை தருவதன் மூலமும், இதில் உள்ள தகவல்களைப் பயன்படுத்துவதன் மூலமும் நீங்கள் இவ்விதிமுறைகள், தனியுரிமைக் கொள்கை, மற்றும் பொறுப்புத் துறப்பு அறிக்கையை முழுமையாக ஏற்றுக்கொள்கிறீர்கள்.'}
        </p>
      </section>

      {/* 2. Informational & Cultural Purpose */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '2. Cultural & Informational Purpose' : '2. கலாச்சார மற்றும் ஆன்மிகத் தகவல் பயன்பாடு'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'The content presented on Namma Tamil Calendar—including daily panchangam values, Nalla Neram, Gowri timings, Tithi, Nakshatra, Chandrashtamam, and festival dates—is provided exclusively for informational, educational, and cultural reference. As detailed in our Disclaimer, panchangam calculations vary slightly by tradition (Vakya vs. Drik) and geographic longitude/latitude. Users must independently verify crucial wedding (சுப முகூர்த்தம்) and life sacramental dates with their family purohit.'
            : 'இத்தளத்தில் வழங்கப்படும் நல்ல நேரம், கௌரி நல்ல நேரம், திதி, நட்சத்திரம், சந்திராஷ்டமம், மற்றும் பண்டிகை விவரங்கள் அனைத்தும் பொதுவான ஆன்மிக வழிகாட்டலுக்காக மட்டுமே வழங்கப்படுகின்றன. திருமண முகூர்த்தங்கள் போன்ற முக்கிய நிகழ்வுகளுக்கு உங்கள் குடும்ப ஜோதிடர் அல்லது புரோகிதரிடம் ஆலோசித்து உறுதி செய்துகொள்ள வேண்டும்.'}
        </p>
      </section>

      {/* 3. Intellectual Property Rights */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Scale className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '3. Intellectual Property & Copyright' : '3. பதிப்புரிமை & பிரத்யேக சொத்துரிமை'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'All original written articles, user interface software code, illustrations, visual layout compositions, icons, and curated datasets on Namma Tamil Calendar are the proprietary intellectual property of the site operators and protected under applicable copyright laws.'
            : 'நம்ம தமிழ் காலண்டரின் மூல நிரலாக்கம், இணைய வடிவமைப்பு, பிரத்யேக விளக்கப்படங்கள், சின்னங்கள் மற்றும் தொகுக்கப்பட்ட தரவுகள் அனைத்தும் பதிப்புரிமைச் சட்டங்களின்படி பாதுகாக்கப்பட்டுள்ளன.'}
        </p>
      </section>

      {/* 4. Prohibited Uses & Scraping */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#C93B2B]">
          <Ban className="w-5 h-5 text-[#C93B2B]" />
          <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
            {isEn ? '4. Prohibited Actions & Anti-Scraping Policy' : '4. தடைசெய்யப்பட்ட பயன்பாடுகள் & தரவு திருட்டு'}
          </h2>
        </div>
        <p>
          {isEn ? 'You agree not to engage in any of the following unauthorized activities:' : 'பயனாளர்கள் பின்வரும் செயல்களில் ஈடுபடக்கூடாது:'}
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5C5256]">
          <li>{isEn ? 'Automated mass-scraping, bot harvesting, or unauthorized cloning of calendar databases.' : 'தானியங்கி முறையில் போட்களைப் (Bots) பயன்படுத்தி தளத்தின் தரவுகளை மொத்தமாகத் திருடுவது.'}</li>
          <li>{isEn ? 'Attempting to inject malicious code, probe server vulnerabilities, or bypass rate limits.' : 'தளத்தின் பாதுகாப்பு அமைப்புகளை மீறுவது அல்லது தவறான வழிமுறைகளில் செயல்படுவது.'}</li>
          <li>{isEn ? 'Redistributing our original content on commercial competing apps without written consent.' : 'எங்கள் எழுத்துப்பூர்வ அனுமதியின்றி இத்தளத்தின் மூலக் கட்டுரைகளையோ உள்ளடக்கங்களையோ வர்த்தக ரீதியாகப் பயன்படுத்துவது.'}</li>
        </ul>
      </section>

      {/* 5. Changes to Service & Contact */}
      <section className="space-y-3 border-t-2 border-[#EBDCCF] pt-6">
        <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
          {isEn ? '5. Service Modifications & Contact' : '5. சேவை மாற்றங்கள் & தொடர்பு'}
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'We reserve the right to modify, improve, or temporarily suspend portions of our service without prior notice as part of routine maintenance. For legal inquiries, please contact us at [YOUR EMAIL].'
            : 'தளத்தின் செயல்பாட்டுத் தேவைகளுக்கேற்ப எவ்வித முன்னறிவிப்புமின்றியும் மேம்பாடுகளைச் செய்ய நிர்வாகத்திற்கு முழு உரிமை உண்டு. சட்ட ரீதியான தொடர்புகளுக்கு [YOUR EMAIL] என்ற முகவரியைப் பயன்படுத்தவும்.'}
        </p>
      </section>
    </article>
  );
}
