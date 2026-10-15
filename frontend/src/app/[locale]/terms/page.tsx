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
    title: locale === 'en' ? 'Terms of Service | Namma Tamil Calendar' : 'விதிமுறைகள் & நிபந்தனைகள் | நம்ம தமிழ் காலண்டர்',
    description: 'Terms of service and acceptable use guidelines for Namma Tamil Calendar.',
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
    <article className="max-w-3xl mx-auto space-y-6 bg-white dark:bg-[#201B1E] border border-[#E9E1D8] dark:border-[#382F35] p-6 sm:p-10 rounded-3xl shadow-xs text-sm leading-relaxed text-[#29262A] dark:text-[#F5EFEB]">
      <div className="border-b border-[#E9E1D8] dark:border-[#382F35] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? 'Terms of Service' : 'விதிமுறைகள் மற்றும் நிபந்தனைகள்'}
        </h1>
        <p className="text-xs text-[#6B6268] dark:text-[#A89FA4] mt-1">
          {isEn ? 'Last updated: October 2026' : 'கடைசியாக புதுப்பிக்கப்பட்டது: அக்டோபர் 2026'}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? '1. Informational Purpose' : '1. தகவல் பயன்பாட்டு விதி'}
        </h2>
        <p>
          {isEn
            ? 'The calendar details, Panchangam timings, Nalla Neram, and festival observances published on Namma Tamil Calendar are provided for general informational, spiritual, and cultural purposes. While every effort is made to maintain high accuracy, planetary calculations may vary slightly depending on geographical latitude and longitude.'
            : 'நம்ம தமிழ் காலண்டரில் வழங்கப்படும் நல்ல நேரம், பஞ்சாங்கம், மற்றும் விரத தினங்கள் பொதுவான ஆன்மிக மற்றும் பாரம்பரிய வழிகாட்டுதலுக்காக மட்டுமே வழங்கப்படுகின்றன. இட அமைப்பிற்கு ஏற்ப நேரங்களில் சிறிய மாறுதல்கள் ஏற்படலாம்.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? '2. Intellectual Property & Acceptable Use' : '2. பதிப்புரிமை & முறையான பயன்பாடு'}
        </h2>
        <p>
          {isEn
            ? 'The design system, layout, software codebase, and unique illustrations of Namma Tamil Calendar are original proprietary assets. Automated scraping, malicious probing, or unauthorized redistribution of our service is prohibited.'
            : 'நம்ம தமிழ் காலண்டரின் இணைய வடிவமைப்பு, நிரலாக்கம் மற்றும் விளக்கப்படங்கள் இதன் பிரத்யேக சொத்துக்களாகும். அனுமதியின்றி தானியங்கி முறையில் தரவுகளை திருடுவது அல்லது முறையற்ற வகையில் பயன்படுத்துவது தடைசெய்யப்பட்டுள்ளது.'}
        </p>
      </section>
    </article>
  );
}
