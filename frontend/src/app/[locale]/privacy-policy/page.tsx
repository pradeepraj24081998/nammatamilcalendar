import React from 'react';
import { Locale } from '@/lib/types';
import { ShieldCheck, Cookie, Eye, Lock, Globe, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Privacy Policy' : 'தனியுரிமைக் கொள்கை (Privacy Policy)',
    description: isEn
      ? 'Privacy policy for Namma Tamil Calendar: disclosures on cookies, Google AdSense, DoubleClick DART cookie, Google Analytics 4, and user choices.'
      : 'நம்ம தமிழ் காலண்டர் தனியுரிமைக் கொள்கை: குக்கீகள், கூகுள் ஆட்சென்ஸ், டபுள் கிளிக் DART குக்கீ, கூகுள் அனலிட்டிக்ஸ் மற்றும் பயனாளர் உரிமைகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/privacy-policy`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/privacy-policy',
        en: 'https://nammatamilcalendar.in/en/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPolicyPage({
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
          <ShieldCheck className="w-4 h-4 text-[#8B1515]" />
          <span>{isEn ? 'Data Protection & Transparency' : 'தரவு பாதுகாப்பு & ஒளிவுமறைவற்ற கொள்கை'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#8B1515]">
          {isEn ? 'Privacy Policy' : 'தனியுரிமைக் கொள்கை'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Last Updated: November 2026 | Effective for all visitors to https://nammatamilcalendar.in'
            : 'கடைசியாக புதுப்பிக்கப்பட்டது: நவம்பர் 2026 | https://nammatamilcalendar.in தளத்தின் அனைத்து பயனாளர்களுக்கும் பொருந்தும்'}
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <p>
          {isEn
            ? 'At Namma Tamil Calendar (accessible at https://nammatamilcalendar.in), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal and technical information collected and recorded by our portal and how we handle, protect, and respect your data.'
            : 'நம்ம தமிழ் காலண்டர் (https://nammatamilcalendar.in) தளத்திற்கு வருகை தரும் பயனாளர்களின் தனிப்பட்ட தனியுரிமைக்கு நாங்கள் மிக உயர்ந்த முன்னுரிமை அளிக்கிறோம். இத்தளத்தின் மூலம் என்னென்ன தகவல்கள் சேகரிக்கப்படுகின்றன, அவை எவ்வாறு பாதுகாப்பாகக் கையாளப்படுகின்றன என்பதை இக்கொள்கை அறிக்கை விரிவாக விளக்குகிறது.'}
        </p>
        <p>
          {isEn
            ? 'If you have additional questions or require more information about our Privacy Policy, please contact our Data Controller at [YOUR EMAIL].'
            : 'தனியுரிமைக் கொள்கை தொடர்பாக கூடுதல் விளக்கங்கள் தேவைப்படின், எங்களை [YOUR EMAIL] என்ற மின்னஞ்சல் வாயிலாகத் தொடர்பு கொள்ளலாம்.'}
        </p>
      </section>

      {/* 1. Information We Collect */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Eye className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '1. Information We Collect' : '1. நாங்கள் சேகரிக்கும் தகவல்கள்'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'You can browse all daily panchangam pages, festival calendars, and monthly sheets anonymously without registration or disclosing your identity. We collect information only in the following scenarios:'
            : 'நமது இணையதளத்தின் தினசரி காலண்டர், பஞ்சாங்கம், மற்றும் பண்டிகை தகவல்களைப் பார்க்க எந்தவித கட்டாயப் பதிவோ அல்லது தனிநபர் விவரங்களோ தேவையில்லை. பின்வரும் சூழ்நிலைகளில் மட்டுமே குறைந்தபட்ச தகவல்கள் பெறப்படுகின்றன:'}
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5C5256]">
          <li>
            <strong>{isEn ? 'Voluntary Contact Information:' : 'விருப்ப தொடர்புத் தகவல்கள்:'}</strong>{' '}
            {isEn
              ? 'When you fill out our contact form or send us an email/WhatsApp message, we receive your name, email address, optional phone number, location, and message contents to respond to your inquiry.'
              : 'நீங்கள் தொடர்பு படிவத்தின் வழியாகவோ அல்லது நேரடி மின்னஞ்சல் / வாட்ஸ்அப் மூலமாகவோ செய்தி அனுப்பும்போது, உங்கள் பெயர், மின்னஞ்சல், ஊர் மற்றும் செய்தி விவரங்கள் பெறப்படுகின்றன.'}
          </li>
          <li>
            <strong>{isEn ? 'Automated Log Files:' : 'தானியங்கி சர்வர் பதிவுகள்:'}</strong>{' '}
            {isEn
              ? 'Like most standard web servers, our hosting infrastructure records standard log files including IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.'
              : 'பொதுவான இணைய சேவையக நெறிமுறைகளின்படி உலாவி வகை, ஐபி முகவரி, மற்றும் பக்கப் பார்வை விவரங்கள் பொதுவான பகுப்பாய்விற்காக மட்டுமே சர்வர் பதிவுகளில் சேகரிக்கப்படுகின்றன.'}
          </li>
        </ul>
      </section>

      {/* 2. Google AdSense & DoubleClick DART Cookies (Critical for Compliance) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Cookie className="w-6 h-6 text-[#D4AF37] shrink-0" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn
              ? '2. Google AdSense & DoubleClick DART Cookies'
              : '2. கூகுள் ஆட்சென்ஸ் & DoubleClick DART குக்கீகள்'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#1F1517]">
          {isEn
            ? 'Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to https://nammatamilcalendar.in and other sites on the internet.'
            : 'கூகுள் (Google) எங்கள் தளத்தின் அதிகாரப்பூர்வ மூன்றாம் தரப்பு விளம்பரக் கூட்டாளியாகும். பயனாளர்கள் நமது தளம் மற்றும் இணையத்தின் பிற தளங்களுக்குச் சென்றதன் அடிப்படையில் பொருத்தமான விளம்பரங்களை வழங்க கூகுள் DART குக்கீகளைப் (DoubleClick DART Cookie) பயன்படுத்துகிறது.'}
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-[#1F1517]">
          {isEn ? (
            <>
              Visitors may choose to opt out of the use of the DART cookie or personalized advertising at any time by visiting the{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1515] font-black underline hover:text-[#C93B2B]"
              >
                Google Ad Center &amp; Ads Settings
              </a>{' '}
              or by opting out of a third-party vendor&apos;s use of cookies for personalized advertising through{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1515] font-black underline hover:text-[#C93B2B]"
              >
                www.aboutads.info/choices
              </a>
              .
            </>
          ) : (
            <>
              பயனாளர்கள் தங்களுக்குப் பிரத்யேகப்படுத்தப்பட்ட விளம்பரங்களை விரும்பவில்லை எனில், எப்போது வேண்டுமானாலும்{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1515] font-black underline hover:text-[#C93B2B]"
              >
                Google Ad Settings
              </a>{' '}
              அல்லது{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1515] font-black underline hover:text-[#C93B2B]"
              >
                aboutads.info/choices
              </a>{' '}
              பக்கத்திற்குச் சென்று தனிப்பயனாக்கப்பட்ட விளம்பரக் குக்கீ அமைப்புகளை எளிதாக முடக்கலாம் (Opt-out).
            </>
          )}
        </p>
      </section>

      {/* 3. Google Analytics 4 (GA4) */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Globe className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '3. Google Analytics 4 (GA4)' : '3. கூகுள் அனலிட்டிக்ஸ் 4 (GA4)'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'We use Google Analytics 4 to understand aggregate website audience trends, popular calendar dates, and device performance. GA4 collects anonymized usage metrics with IP masking enabled. Google will not associate your IP address with any other data held by Google. You may opt out of Google Analytics tracking using the official Google Analytics Opt-out Browser Add-on.'
            : 'எங்கள் தளத்தின் செயல்திறன் மற்றும் பயனாளர் வருகை புள்ளிவிவரங்களை அறிய கூகுள் அனலிட்டிக்ஸ் (GA4) பயன்படுத்தப்படுகிறது. இதில் ஐபி முகவரிகள் மறைக்கப்பட்டு (IP Masking) பெயர் குறிப்பிடப்படாத பொதுவான புள்ளிவிவரங்களாக மட்டுமே கணக்கிடப்படுகிறது.'}
        </p>
      </section>

      {/* 4. Local Storage & Offline PWA Capabilities */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Lock className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn ? '4. Local Storage & Offline PWA' : '4. லோக்கல் ஸ்டோரேஜ் & ஆஃப்லைன் பயன்பாடு'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'To support Progressive Web App (PWA) offline reading and remember your preferred language (Tamil or English), our client-side software saves small non-identifying keys in your browser localStorage. This data remains strictly within your physical device and is never transmitted to our servers.'
            : 'நமது தளம் ஆஃப்லைனிலும் இயங்குவதற்கும், உங்களின் மொழித் தேர்வை (தமிழ் அல்லது ஆங்கிலம்) நினைவில் கொள்வதற்கும் உலாவி லோக்கல் ஸ்டோரேஜில் (localStorage) சிறு தரவுகள் சேமிக்கப்படுகின்றன. இவை உங்களின் சாதனத்திற்குள்ளேயே மட்டுமே இருக்கும்; எங்கள் சர்வர்களுக்கு அனுப்பப்படாது.'}
        </p>
      </section>

      {/* 5. User Privacy Rights (GDPR & CCPA) */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
          {isEn ? '5. Your Privacy Rights (GDPR / CCPA / DPDP)' : '5. உங்கள் தனியுரிமை உரிமைகள்'}
        </h2>
        <p>
          {isEn
            ? 'Depending on your region, you have rights regarding your personal information, including the right to request access to the data we hold about you, request rectification of inaccurate data, or request permanent deletion of your contact form messages. To exercise these rights, please email us directly at [YOUR EMAIL].'
            : 'பயனாளர்களுக்கு தங்கள் தனிநபர் தரவுகளைப் பார்வையிடவும், திருத்தக் கோரவும், அல்லது நிரந்தரமாக அழிக்கக் கோரவும் முழு உரிமை உண்டு. இத்தகைய கோரிக்கைகளுக்கு எங்களை [YOUR EMAIL] வாயிலாகத் தொடர்பு கொள்ளலாம்.'}
        </p>
      </section>

      {/* 6. Children's Privacy */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
          {isEn ? "6. Children's Privacy" : '6. குழந்தைகள் தனியுரிமை பாதுகாப்பு'}
        </h2>
        <p>
          {isEn
            ? 'Protecting children’s privacy online is paramount. Namma Tamil Calendar does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has submitted personal details on our site, please contact us immediately and we will promptly remove such records.'
            : 'நம்ம தமிழ் காலண்டர் 13 வயதுக்குட்பட்ட குழந்தைகளிடமிருந்து எந்தவித தனிப்பட்ட விவரங்களையும் உள்நோக்கத்துடன் சேகரிப்பதில்லை. அத்தகைய விவரங்கள் ஏதேனும் பெறப்பட்டிருப்பதாக நீங்கள் கருதினால், உடனடியாக எங்களைத் தொடர்பு கொள்ளவும்.'}
        </p>
      </section>

      {/* Contact Officer Box */}
      <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2">
        <span className="font-bold text-sm text-[#8B1515] block">
          {isEn ? 'Data Protection Officer Contact:' : 'தனியுரிமை அதிகாரி தொடர்பு:'}
        </span>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          <strong>Namma Tamil Calendar</strong> — Editorial &amp; Legal Desk<br />
          Email: <a href="mailto:[YOUR EMAIL]" className="text-[#8B1515] underline font-bold">[YOUR EMAIL]</a><br />
          Tamil Nadu, India.
        </p>
      </div>
    </article>
  );
}
