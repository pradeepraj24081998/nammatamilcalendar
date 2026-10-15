import React from 'react';
import { Locale } from '@/lib/types';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Privacy Policy | Namma Tamil Calendar' : 'தனியுரிமைக் கொள்கை | நம்ம தமிழ் காலண்டர்',
    description: 'Privacy policy and data protection disclosures for Namma Tamil Calendar.',
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
    <article className="max-w-3xl mx-auto space-y-6 bg-white dark:bg-[#201B1E] border border-[#E9E1D8] dark:border-[#382F35] p-6 sm:p-10 rounded-3xl shadow-xs text-sm leading-relaxed text-[#29262A] dark:text-[#F5EFEB]">
      <div className="border-b border-[#E9E1D8] dark:border-[#382F35] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? 'Privacy Policy' : 'தனியுரிமைக் கொள்கை'}
        </h1>
        <p className="text-xs text-[#6B6268] dark:text-[#A89FA4] mt-1">
          {isEn ? 'Last updated: October 2026' : 'கடைசியாக புதுப்பிக்கப்பட்டது: அக்டோபர் 2026'}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? '1. Information We Collect' : '1. நாங்கள் சேகரிக்கும் தகவல்கள்'}
        </h2>
        <p>
          {isEn
            ? 'Namma Tamil Calendar (https://nammatamilcalendar.in) is committed to protecting your privacy. Public calendar pages can be accessed anonymously without requiring registration or personal credentials. When you choose to submit feedback via our feedback form, we optionally collect your name, email, and message.'
            : 'நம்ம தமிழ் காலண்டர் (https://nammatamilcalendar.in) உங்கள் தனியுரிமையை முழுமையாக பாதுகாக்கிறது. பொதுவான காலண்டர் பக்கங்களை பார்க்க பயனாளர் பதிவு அவசியமில்லை. கருத்துப் படிவத்தின் வழியாக நீங்கள் அனுப்பும் விருப்பத் தகவல்களை மட்டுமே நாங்கள் பெறுகிறோம்.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? '2. Cookies and Advertisements (Google AdSense)' : '2. குக்கீகள் மற்றும் விளம்பரங்கள்'}
        </h2>
        <p>
          {isEn
            ? 'We may partner with third-party advertising vendors, including Google AdSense, to serve ads when you visit our website. These vendors may use cookies (such as the DoubleClick cookie) to serve relevant advertisements based on visits to this and other sites on the Internet.'
            : 'எங்கள் இணையதளத்தில் கூகுள் ஆட்சென்ஸ் (Google AdSense) உள்ளிட்ட மூன்றாம் தரப்பு விளம்பரங்கள் காட்சிப்படுத்தப்படலாம். அவை உங்கள் தேடலுக்குரிய பொருத்தமான விளம்பரங்களை வழங்க குக்கீகளை பயன்படுத்தலாம்.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? '3. Data Security and Privacy Choices' : '3. தரவு பாதுகாப்பு மற்றும் பயனாளர் உரிமைகள்'}
        </h2>
        <p>
          {isEn
            ? 'We employ standard administrative and technical safeguards to preserve data integrity and prevent unauthorized access. You can configure your browser to reject cookies or notify you when cookies are placed.'
            : 'உங்கள் தரவுகள் பாதுகாப்பான மறைகுறியாக்கத்துடன் கையாளப்படுகின்றன. உங்கள் உலாவி அமைப்புகளின் வாயிலாக நீங்கள் குக்கீகளை விரும்பினால் முடக்கலாம்.'}
        </p>
      </section>
    </article>
  );
}
