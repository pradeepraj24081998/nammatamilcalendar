import React from 'react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Sparkles, Calendar, ShieldCheck, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'About Us | Namma Tamil Calendar' : 'எங்களை பற்றி | நம்ம தமிழ் காலண்டர்',
    description: 'Learn about the mission, authenticity, and engineering behind Namma Tamil Calendar.',
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <article className="max-w-3xl mx-auto space-y-8 bg-white dark:bg-[#201B1E] border border-[#E9E1D8] dark:border-[#382F35] p-6 sm:p-10 rounded-3xl shadow-xs">
      <div className="border-b border-[#E9E1D8] dark:border-[#382F35] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-[#70263B] dark:text-[#DFBA73]">
          {isEn ? 'About Namma Tamil Calendar' : 'நம்ம தமிழ் காலண்டர் பற்றி'}
        </h1>
        <p className="text-sm text-[#6B6268] dark:text-[#A89FA4]">
          {isEn ? 'Our mission, heritage, and values' : 'எங்கள் நோக்கம், பாரம்பரியம் மற்றும் அர்ப்பணிப்பு'}
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#29262A] dark:text-[#F5EFEB]">
        <p>
          {isEn
            ? 'Namma Tamil Calendar (https://nammatamilcalendar.in) is dedicated to preserving and presenting authentic Tamil astrological and calendrical wisdom in a modern, elegant, and lightning-fast digital experience.'
            : 'நம்ம தமிழ் காலண்டர் (https://nammatamilcalendar.in) பாரம்பரிய தமிழ் பஞ்சாங்கக் கணிப்புகள், சுப நேரங்கள், பண்டிகைகள் மற்றும் ஜோதிடக் குறிப்புகளை இன்றைய நவீன தலைமுறையினரும் எளிதில் அணுகும் வண்ணம் வடிவமைக்கப்பட்ட பிரத்யேக இணையதளமாகும்.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="p-4 rounded-2xl bg-[#FFF9F0] dark:bg-[#1A1618] border border-[#E9E1D8] dark:border-[#382F35] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#70263B] dark:text-[#DFBA73]" />
            <h2 className="font-bold text-base text-[#70263B] dark:text-[#DFBA73]">
              {isEn ? 'Authenticity & Accuracy' : 'துல்லியமான தகவல்கள்'}
            </h2>
            <p className="text-xs text-[#6B6268] dark:text-[#A89FA4]">
              {isEn
                ? 'Calculations based on verified Tamil Vakya and Drik Panchangam traditions for accurate Nalla Neram and Thithi.'
                : 'தமிழ் பாரம்பரிய வாக்கிய பஞ்சாங்கக் குறிப்புகளை அடிப்படையாகக் கொண்டு துல்லியமான நல்ல நேரம் மற்றும் திதி விவரங்கள்.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F0] dark:bg-[#1A1618] border border-[#E9E1D8] dark:border-[#382F35] space-y-2">
            <Heart className="w-6 h-6 text-[#C94F36]" />
            <h2 className="font-bold text-base text-[#70263B] dark:text-[#DFBA73]">
              {isEn ? 'Community Focused' : 'தமிழ் சமூகத்திற்கான சேவை'}
            </h2>
            <p className="text-xs text-[#6B6268] dark:text-[#A89FA4]">
              {isEn
                ? 'Completely free to access, bilingual in Tamil and English, and fully optimized for mobile devices worldwide.'
                : 'உலகெங்கிலும் வாழும் தமிழ் மக்களின் பயன்பாட்டிற்காக முற்றிலும் இலவசமாகவும், கைபேசிக்கு உகந்ததாகவும் வழங்கப்படுகிறது.'}
            </p>
          </div>
        </div>

        <p>
          {isEn
            ? 'We respect your reading experience by keeping our interface clean, ad-friendly without deceptive popups or intrusive layout shifts, and fully accessible.'
            : 'பயனாளர்களின் வாசிப்பு அனுபவத்தை முதன்மையாகக் கொண்டு, எரிச்சலூட்டும் விளம்பரங்களோ அல்லது தளவமைப்பு மாற்றங்களோ இன்றி நேர்த்தியாக வடிவமைக்கப்பட்டுள்ளது.'}
        </p>
      </div>
    </article>
  );
}
