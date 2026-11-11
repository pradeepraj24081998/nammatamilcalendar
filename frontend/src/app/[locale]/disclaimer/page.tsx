import React from 'react';
import { Locale } from '@/lib/types';
import { AlertTriangle, Compass, ShieldAlert, BookOpen, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Disclaimer' : 'பொறுப்புத் துறப்பு (Disclaimer)',
    description: isEn
      ? 'Official disclaimer regarding panchangam calculations, auspicious muhurtham timings, planetary variations, and religious rituals on Namma Tamil Calendar.'
      : 'நம்ம தமிழ் காலண்டர் பஞ்சாங்கக் கணிப்புகள், சுப முகூர்த்த நேரங்கள், மற்றும் ஆன்மிக சடங்குகள் தொடர்பான அதிகாரப்பூர்வ பொறுப்புத் துறப்பு அறிக்கை.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/disclaimer`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/disclaimer',
        en: 'https://nammatamilcalendar.in/en/disclaimer',
      },
    },
  };
}

export default async function DisclaimerPage({
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
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>{isEn ? 'Official Advisory Notice' : 'அதிகாரப்பூர்வ ஆலோசனை அறிக்கை'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#8B1515]">
          {isEn ? 'Disclaimer & Editorial Notice' : 'பொறுப்புத் துறப்பு & ஆசிரியர் அறிக்கை'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Important guidance regarding calendar timings, traditional variations, and religious observances.'
            : 'பஞ்சாங்க கணிப்புகள், சுப முகூர்த்த தினங்கள் மற்றும் ஆன்மிக வழிபாடுகள் குறித்த முக்கிய வழிகாட்டுதல்.'}
        </p>
      </div>

      {/* Primary Highlight Box */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37] space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515] font-black text-base sm:text-lg">
          <ShieldAlert className="w-6 h-6 text-[#C93B2B] shrink-0" />
          <span>
            {isEn
              ? 'Crucial Notice for Weddings & Sacred Rituals'
              : 'திருமணம் மற்றும் சுபகாரியங்களுக்கான முக்கிய குறிப்பு'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#1F1517] leading-relaxed">
          {isEn
            ? 'While Namma Tamil Calendar (https://nammatamilcalendar.in) is engineered with the utmost care using established Tamil Panchangam methodologies, users are strongly urged to consult their family purohit, kuladeivam temple priest, or verified traditional astrologer prior to fixing irreversible life events such as weddings (திருமணம்), housewarming (கிரகப்பிரவேசம்), tonsure (மொட்டை/காதுகுத்து), or upanayanam.'
            : 'நம்ம தமிழ் காலண்டர் (https://nammatamilcalendar.in) பாரம்பரிய தமிழ் பஞ்சாங்க முறைமைகளின்படி மிகுந்த கவனத்துடன் தொகுக்கப்பட்டிருந்தாலும், திருமணம், கிரகப்பிரவேசம், காதுகுத்து, உபநயனம் போன்ற முக்கியமான சுபகாரியங்களை நிச்சயிப்பதற்கு முன், உங்கள் குடும்பப் புரோகிதர் அல்லது குலதெய்வக் கோயில் ஆச்சாரியர்களிடம் ஜாதகப் பொருத்தம் மற்றும் சுப லக்ன நேரங்களை நேரில் கலந்தாலோசித்து உறுதி செய்யுமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.'}
        </p>
      </div>

      {/* Section 1: Panchangam Calculation Systems */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <BookOpen className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn
              ? '1. Panchangam Calculation Methodologies (வாக்கிய vs திருக்கணித முறை)'
              : '1. பஞ்சாங்கக் கணிப்பு முறைகள் (வாக்கிய & திருக்கணித வேறுபாடு)'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'In Tamil Nadu and worldwide Tamil diaspora traditions, two primary calculation systems are followed: Vakya Panchangam (வாக்கிய பஞ்சாங்கம், rooted in ancient astronomical verses) and Drik Ganitha Panchangam (திருக்கணிதம், modern astronomical planetary ephemeris). Differences of a few minutes to hours can occur between these traditions regarding the exact start and end times of Tithi, Nakshatra, and Yogam. Our portal utilizes time-tested Tamil Vakya and regional standard conventions centered on Chennai (IST timezone).'
            : 'தமிழ்நாட்டில் வாக்கிய பஞ்சாங்கம் மற்றும் திருக்கணித பஞ்சாங்கம் ஆகிய இரண்டு முக்கிய மரபுகள் பின்பற்றப்படுகின்றன. பழமையான செய்யுள் முறை சார்ந்த வாக்கியக் கணிப்பிற்கும் நவீன வானியல் அடிப்படையிலான திருக்கணித முறைக்கும் இடையே திதி, நட்சத்திரம் மற்றும் யோகங்களின் தொடக்க மற்றும் முடிவு நேரங்களில் சில நிமிடங்கள் முதல் மாறுதல்கள் ஏற்படுவது இயல்பானது. நமது தளம் சென்னை புவியியல் மையத்தைக் கொண்ட வாக்கிய பஞ்சாங்க நெறிமுறைகளை அடிப்படையாகக் கொண்டு வழங்குகிறது.'}
        </p>
      </section>

      {/* Section 2: Geographical Coordinates and Sunrise Variations */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Compass className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn
              ? '2. Geographical Latitude, Longitude & Sunrise Adjustments'
              : '2. புவியியல் இருப்பிடம் & சூரிய உதய நேர மாறுபாடுகள்'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'All auspicious timings (Nalla Neram, Gowri Nalla Neram) and inauspicious intervals (Rahu Kalam, Yamagandam, Kuligai) published on this portal are calculated for the standard Indian Standard Time (IST, UTC+05:30) with Chennai as the base coordinate. If you reside in other districts of Tamil Nadu (such as Madurai, Coimbatore, Tirunelveli), or in overseas countries (Malaysia, Singapore, Sri Lanka, UAE, USA, UK, Canada, Australia), the exact local Rahu Kalam and Nalla Neram will vary by your local sunrise and sunset timings.'
            : 'இத்தளத்தில் குறிப்பிடப்பட்டுள்ள நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம் மற்றும் குளிகை நேரங்கள் அனைத்தும் இந்திய நேரப்படி (IST, UTC+05:30) சென்னையை மையமாகக் கொண்டு கணக்கிடப்பட்டுள்ளன. நீங்கள் மதுரை, கோயம்புத்தூர், திருநெல்வேலி போன்ற பிற மாவட்டங்களிலோ அல்லது சிங்கப்பூர், மலேசியா, இலங்கை, துபாய், அமெரிக்கா, லண்டன் போன்ற வெளிநாடுகளிலோ வசிப்பவராயின், உங்கள் உள்ளூர் சூரிய உதய நேரத்திற்கு ஏற்ப சில நிமிட மாறுதல்களை சரிசெய்து கொள்ள வேண்டும்.'}
        </p>
      </section>

      {/* Section 3: Astrological Guidance & Rasi Palan */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 text-[#8B1515]">
          <Clock className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black">
            {isEn
              ? '3. Daily Rasi Palan & Astrological Advice'
              : '3. தினசரி ராசிபலன் & ஜோதிட ஆலோசனைகள்'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'The daily Rasi Palan (Moon sign predictions) presented on our site reflects broad planetary transits and is meant purely for cultural and informational reading. Individual destiny and life results depend on your complete birth horoscope (ஜாதகம்), Dasa-Bhukti periods, and planetary placements. The site does not guarantee specific life outcomes, financial returns, or medical health results based on general predictions.'
            : 'தினசரி ராசிபலன் தகவல்கள் சந்திரனின் ராசி சஞ்சாரத்தை அடிப்படையாகக் கொண்டு பொதுவான ஆன்மிக வழிகாட்டுதலுக்காக மட்டுமே வழங்கப்படுகின்றன. தனிநபர் வாழ்க்கையின் சாதக பாதகங்கள் அவர்களின் முழுமையான ஜனன ஜாதகம், தசா புக்தி மற்றும் லக்ன நிலைகளைப் பொறுத்து அமையும். எனவே இவற்றை இறுதியான வழிகாட்டுதலாகக் கருதாமல் பொதுவான தகவலாகவே பயன்படுத்தவும்.'}
        </p>
      </section>

      {/* Section 4: External Links & Advertisements */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
          {isEn
            ? '4. Third-Party Advertisements & External Links'
            : '4. விளம்பரங்கள் & மூன்றாம் தரப்பு இணைப்புகள்'}
        </h2>
        <p>
          {isEn
            ? 'To sustain our free digital service, third-party advertisements (such as Google AdSense) and occasional informational links may be served on this site. Namma Tamil Calendar does not endorse or guarantee any third-party products, astrology consultations, gemstone sales, or services advertised through external networks.'
            : 'எங்கள் இலவச சேவையைத் தொடர்ந்து நடத்த கூகுள் ஆட்சென்ஸ் போன்ற மூன்றாம் தரப்பு விளம்பரங்கள் தளத்தில் தோன்றலாம். அவ்விளம்பரங்களில் குறிப்பிடப்படும் பொருட்கள், ரத்தினங்கள் அல்லது வெளிச் சேவைகளின் நம்பகத்தன்மைக்கு நம்ம தமிழ் காலண்டர் பொறுப்பேற்காது.'}
        </p>
      </section>

      {/* Section 5: Limitation of Liability */}
      <section className="space-y-3 border-t-2 border-[#EBDCCF] pt-6">
        <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
          {isEn ? '5. Limitation of Liability' : '5. சட்டப்பூர்வ பொறுப்பு வரம்பு'}
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Under no circumstances shall the creators, developers, or operators of Namma Tamil Calendar be held liable for any decisions made, events scheduled, or monetary / spiritual outcomes resulting from the use of data provided on this platform. Usage of this website confirms acceptance of this disclaimer and our Terms of Service.'
            : 'இத்தளத்தில் உள்ள தகவல்களைப் பயன்படுத்தி எடுக்கப்படும் முடிவுகள், திட்டமிடப்படும் நிகழ்வுகள் அல்லது அதனால் ஏற்படும் எந்தவொரு இழப்பு அல்லது மாறுதல்களுக்கும் நம்ம தமிழ் காலண்டர் நிர்வாகம் பொறுப்பேற்காது. தளத்தைப் பயன்படுத்துவதன் மூலம் நீங்கள் இந்த நிபந்தனைகளை முழுமையாக ஏற்றுக்கொள்கிறீர்கள்.'}
        </p>
      </section>
    </article>
  );
}

