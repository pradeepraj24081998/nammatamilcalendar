import React from 'react';
import { Locale } from '@/lib/types';
import { Sparkles, Calendar, ShieldCheck, Heart, User, CheckCircle2, Clock, BookOpen, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About Us' : 'எங்களை பற்றி (About Us)',
    description: isEn
      ? 'Learn about Namma Tamil Calendar: our cultural mission, editorial team, authentic Panchangam data sources, and accuracy verification standards.'
      : 'நம்ம தமிழ் காலண்டர்: எங்கள் நோக்கம், ஆசிரியர் குழு, பஞ்சாங்கத் தரவு ஆதாரங்கள் மற்றும் துல்லிய சரிபார்ப்பு நெறிமுறைகள்.',
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/about`,
      languages: {
        ta: 'https://nammatamilcalendar.in/ta/about',
        en: 'https://nammatamilcalendar.in/en/about',
      },
    },
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
    <article className="max-w-4xl mx-auto space-y-8 bg-white border-2 border-[#EBDCCF] p-6 sm:p-10 rounded-3xl shadow-xs text-sm sm:text-base leading-relaxed text-[#1F1517]">
      {/* Header Banner */}
      <div className="border-b-2 border-[#EBDCCF] pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFF9F0] text-[#8B1515] border border-[#EBDCCF] text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{isEn ? 'Our Heritage & Cultural Mission' : 'எங்கள் நோக்கம் & பாரம்பரிய அர்ப்பணிப்பு'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#8B1515]">
          {isEn ? 'About Namma Tamil Calendar' : 'நம்ம தமிழ் காலண்டர் பற்றி'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Dedicated to presenting authentic Tamil astrological wisdom with modern digital craftsmanship.'
            : 'பாரம்பரிய தமிழ் பஞ்சாங்கக் கணிப்புகளையும் கலாச்சார விழுமியங்களையும் நவீன தலைமுறைக்காக துல்லியமாக வழங்கும் இணையதளம்.'}
        </p>
      </div>

      {/* Mission Introduction */}
      <div className="space-y-4">
        <p>
          {isEn ? (
            <>
              <strong>Namma Tamil Calendar</strong> (
              <a href="https://nammatamilcalendar.in" className="text-[#8B1515] font-bold hover:underline">
                https://nammatamilcalendar.in
              </a>
              ) was founded with a singular, respectful purpose: to provide Tamil-speaking families across Tamil Nadu, India, and the global diaspora (Singapore, Malaysia, Sri Lanka, the Gulf, North America, and Europe) with an authoritative, lightning-fast, and completely accessible digital Tamil calendar and Panchangam.
            </>
          ) : (
            <>
              <strong>நம்ம தமிழ் காலண்டர்</strong> (
              <a href="https://nammatamilcalendar.in" className="text-[#8B1515] font-bold hover:underline">
                https://nammatamilcalendar.in
              </a>
              ) உலகம் முழுவதிலும் வாழும் தமிழ் மக்களின் அன்றாட ஆன்மிகத் தேவைகள், சுபகாரியத் திட்டமிடல்கள், பண்டிகை விசேஷங்கள் மற்றும் விரத நாட்களை மிகத் துல்லியமாகவும், எளிய முறையிலும் அறிந்துகொள்ளும் வகையில் உருவாக்கப்பட்ட நவீன இணையதளமாகும்.
            </>
          )}
        </p>
        <p>
          {isEn
            ? 'For generations, the traditional wall calendar (நாட்காட்டி அட்டை) has occupied a revered place in Tamil households, guiding daily prayers, business openings, journey hours, and family celebrations. Our mission is to preserve this sacred, culturally rich format on smartphones, tablets, and computers without clunky navigation, deceptive pop-up advertisements, or confusing interfaces.'
            : 'காலங்காலமாகத் தமிழ் குடும்பங்களின் வீடுகளில் பூசை அறைகளிலும் வரவேற்பறைகளிலும் இடம்பெறும் நாள்காட்டி அட்டையின் புனிதத்தையும், பயன்பாட்டு நேர்த்தியையும் எந்தவித விளம்பர இடையூறுகளுமின்றி மொபைல் மற்றும் கணினிகளில் டிஜிட்டல் வடிவில் கொண்டு சேர்ப்பதே எங்கள் முதன்மை லட்சியமாகும்.'}
        </p>
      </div>

      {/* Core Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2.5">
          <ShieldCheck className="w-7 h-7 text-[#8B1515]" />
          <h2 className="font-black text-base text-[#8B1515]">
            {isEn ? 'Authentic Data Sources' : 'பாரம்பரிய பஞ்சாங்கத் தரவுகள்'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed">
            {isEn
              ? 'Our calendar algorithms derive from time-tested Tamil Vakya Panchangam treatises and authoritative solar-lunar sidereal reckoning (சூரிய-சந்திர கணிதம்) centered on Tamil Nadu geography.'
              : 'தமிழ் பாரம்பரிய வாக்கிய பஞ்சாங்கக் குறிப்புகள், சூரிய-சந்திர உதய அஸ்தமன நேரங்கள் மற்றும் தமிழ் வருட பிறப்பு விதிகளின் அடிப்படையில் கணிப்புகள் செய்யப்படுகின்றன.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] space-y-2.5">
          <Heart className="w-7 h-7 text-[#C93B2B]" />
          <h2 className="font-black text-base text-[#8B1515]">
            {isEn ? 'Community-First & Bilingual' : 'உலகத் தமிழர்களுக்கான சேவை'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed">
            {isEn
              ? 'Available fully in Tamil and English, lightweight for slow network connections, and free to all seekers of Tamil heritage.'
              : 'தூய தமிழ் மற்றும் எளிய ஆங்கிலத்தில் இருமொழிகளிலும், வேகமான தரவிறக்கத்துடன், உலகம் முழுவதும் உள்ள தமிழ் மக்கள் இலவசமாகப் பயன்படுத்தும் வண்ணம் வடிவமைக்கப்பட்டுள்ளது.'}
          </p>
        </div>
      </div>

      {/* Editorial Leadership & Creator Info */}
      <section className="p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#D4AF37]/60 space-y-4">
        <div className="flex items-center space-x-2.5">
          <User className="w-6 h-6 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
            {isEn ? 'Who Runs This Site & Editorial Team' : 'தள நிர்வாகம் & ஆசிரியர் குழு'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#1F1517]">
          {isEn ? (
            <>
              Namma Tamil Calendar is an independent digital cultural publication curated and engineered by <strong>[YOUR NAME]</strong> (Founder & Chief Architect). The editorial desk is supported by native Tamil scholars and astrological contributors who verify festival observances, Viratham dates, and Panchangam data points before publishing.
            </>
          ) : (
            <>
              நம்ம தமிழ் காலண்டர் தளம் <strong>[YOUR NAME]</strong> (நிறுவனர் மற்றும் முதன்மை மென்பொருள் வடிவமைப்பாளர்) அவர்களின் தலைமையிலான ஆசிரியர் குழுவால் நிர்வகிக்கப்படுகிறது. பஞ்சாங்கக் குறிப்புகள், அரசு விடுமுறை அறிவிப்புகள் மற்றும் விரத தினங்களை பாரம்பரிய தமிழ் ஆய்வாளர்களின் வழிகாட்டுதலுடன் சரிபார்த்து வெளியிடுகிறோம்.
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-[#8B1515]">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EBDCCF]">
            <Mail className="w-3.5 h-3.5 text-[#C93B2B]" />
            <span>Editorial Desk: [YOUR EMAIL]</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EBDCCF]">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Response Time: 24 to 48 Hours</span>
          </span>
        </div>
      </section>

      {/* Where the Data Comes From */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
            {isEn ? 'Where Our Panchangam Data Comes From' : 'பஞ்சாங்கத் தரவுகள் எங்கிருந்து பெறப்படுகின்றன?'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'The calendrical and astrological calculations on Namma Tamil Calendar follow the traditional Tamil Vakya Panchangam system combined with verified planetary ephemeris tables for Chennai coordinates (13.0827° N, 80.2707° E). Each day includes five primary limbs (Panch-Angam):'
            : 'நம்ம தமிழ் காலண்டரின் கணிப்புகள் பாரம்பரிய தமிழ் வாக்கிய பஞ்சாங்க நெறிமுறைகளின்படியும், சென்னை அட்சரேகை/தீர்க்கரேகை (13.0827° N, 80.2707° E) அடிப்படையிலும் கணக்கிடப்படுகின்றன. பஞ்சாங்கம் என்பது ஐந்து அங்கங்களைக் குறிக்கும்:'}
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5C5256]">
          <li><strong>{isEn ? 'Tithi (திதி):' : 'திதி (Tithi):'}</strong> {isEn ? 'Lunar phase representing the angular distance between the Sun and Moon.' : 'சூரியனுக்கும் சந்திரனுக்கும் இடையிலான கோண இடைவெளி (வளர்பிறை & தேய்பிறை).'}</li>
          <li><strong>{isEn ? 'Nakshatra (நட்சத்திரம்):' : 'நட்சத்திரம் (Nakshatra):'}</strong> {isEn ? 'The prevailing asterism out of 27 sidereal constellations.' : 'சந்திரன் சஞ்சரிக்கும் 27 விண்மீன் மண்டலங்கள் (அசுவினி முதல் ரேவதி வரை).'}</li>
          <li><strong>{isEn ? 'Yogam (யோகம்):' : 'யோகம் (Yogam):'}</strong> {isEn ? 'Siddha, Amrutha, and Marana yogas indicating general favorability.' : 'சித்த, அமிர்த, மரண யோகங்கள்.'}</li>
          <li><strong>{isEn ? 'Karanam (கரணம்):' : 'கரணம் (Karanam):'}</strong> {isEn ? 'Half-part of a tithi used for specific sacred actions.' : 'திதியின் பாதிப் பகுதி.'}</li>
          <li><strong>{isEn ? 'Vara (வாரம்):' : 'வாரம் (Vara):'}</strong> {isEn ? 'The solar weekday governed by planetary regents.' : 'ஞாயிறு முதல் சனி வரையிலான கிழமை.'}</li>
        </ul>
        <p className="text-xs sm:text-sm text-[#5C5256]">
          {isEn
            ? 'Festival dates and government public holidays are cross-checked against official Tamil Nadu Government Gazetted holiday notifications, HR&CE temple festival schedules, and regional Mutt traditions.'
            : 'அரசு விடுமுறைகள், கோயில் திருவிழாக்கள் மற்றும் விசேஷ தினங்கள் தமிழ்நாடு அரசின் அதிகாரப்பூர்வ அரசிதழ் அறிவிப்புகள் மற்றும் இந்து சமய அறநிலையத்துறை விசேஷ அட்டவணைகளுடன் ஒப்பிட்டு சரிபார்க்கப்படுகின்றன.'}
        </p>
      </section>

      {/* How Often Is It Updated? */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-[#8B1515]" />
          <h2 className="text-lg sm:text-xl font-black text-[#8B1515]">
            {isEn ? 'Update Cadence & Ongoing Structural Curation' : 'தொடர் புதுப்பித்தல் & தரவு பராமரிப்பு'}
          </h2>
        </div>
        <p>
          {isEn
            ? 'Our platform is subject to continuous review and ongoing maintenance to guarantee highest accuracy:'
            : 'நமது இணையதளம் தொடர்ந்து ஆய்வுக்குட்படுத்தப்பட்டு, பயனாளர்களின் நம்பிக்கைக்குரிய வகையில் எப்போதும் புதுப்பிக்கப்பட்டு வருகிறது:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="font-bold text-[#8B1515] block">{isEn ? 'Daily Audit' : 'தினசரி தணிக்கை'}</span>
            <p className="text-[#5C5256]">{isEn ? 'Sunrise, sunset, Nalla Neram, and Gowri timings verified daily.' : 'சூரிய உதயம், நல்ல நேரம் மற்றும் கௌரி நல்ல நேரங்கள் அன்றாடம் சரிபார்க்கப்படுகின்றன.'}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="font-bold text-[#8B1515] block">{isEn ? 'Annual Releases' : 'முழு ஆண்டு வெளியீடு'}</span>
            <p className="text-[#5C5256]">{isEn ? 'Complete 365-day sheets for 2026 & 2027 are fully active; 2028+ is underway.' : '2026 & 2027 முழு ஆண்டுத் தரவுகளும் துல்லியமாக வெளியிடப்பட்டுள்ளன; 2028 விரைவில்.'}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="font-bold text-[#8B1515] block">{isEn ? '24h Correction SLA' : 'விரைவான பிழை திருத்தம்'}</span>
            <p className="text-[#5C5256]">{isEn ? 'User reports are reviewed by our editorial desk within 24–48 hours.' : 'பயனாளர்களின் திருத்தக் கருத்துக்கள் 24 முதல் 48 மணி நேரத்திற்குள் சரிபார்க்கப்படும்.'}</p>
          </div>
        </div>
      </section>

      {/* User Feedback & Contact CTA */}
      <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#EBDCCF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-sm text-[#8B1515] block">
            {isEn ? 'Have Suggestions or Inquiries?' : 'தங்கள் மேலான கருத்துக்களைப் பகிர விரும்புகிறீர்களா?'}
          </span>
          <span className="text-xs text-[#5C5256]">
            {isEn
              ? 'We welcome corrections, partnership proposals, and cultural feedback from our readers.'
              : 'காலண்டர் தகவல்கள், பிழை திருத்தங்கள் அல்லது ஆலோசனைகளை எங்களுக்கு எப்போதும் அனுப்பலாம்.'}
          </span>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="px-4 py-2 rounded-xl bg-[#8B1515] hover:bg-[#700C0C] text-white text-xs font-black shrink-0 shadow-xs transition-all"
        >
          {isEn ? 'Contact the Editorial Desk' : 'ஆசிரியர் குழுவை தொடர்பு கொள்ள'}
        </Link>
      </div>
    </article>
  );
}
