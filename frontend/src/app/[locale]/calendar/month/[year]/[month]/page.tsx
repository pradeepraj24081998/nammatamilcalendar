import React from 'react';
import Link from 'next/link';
import { fetchMonthCalendar } from '@/lib/api';
import { MonthGrid } from '@/components/calendar/MonthGrid';
import { AdContainer } from '@/components/ui/AdContainer';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { TempleBellIcon, AgalVilakkuIcon } from '@/components/ui/CalendarIcons';
import { Sparkles, Calendar, Heart, Moon, Flame, Sun, HelpCircle, ArrowRight, Printer } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 86400;

const MONTH_NARRATIVES: Record<number, {
  seasonTa: string;
  seasonEn: string;
  descTa: string;
  descEn: string;
  ritualsTa: string;
  ritualsEn: string;
}> = {
  1: {
    seasonTa: 'முன்பனிக் காலம் • மார்கழி – தை சங்கமம்',
    seasonEn: 'Early Dew Season • Margazhi – Thai Confluence',
    descTa: 'ஜனவரி மாதம் தமிழ் கலாச்சாரத்தில் மார்கழி மாதத்தின் திருப்பாவை வழிபாடும், தை மாதத்தின் முதல் நாளான உழவர் திருநாள் பொங்கல் பண்டிகையும் இணையும் மிக மங்களகரமான மாதமாகும். "தை பிறந்தால் வழி பிறக்கும்" என்ற முதுமொழிக்கேற்ப புதிய நற்காரியங்கள், இல்லற சுப முகூர்த்தங்கள் தொடங்கும் காலமாகும்.',
    descEn: 'January marks a sacred bridge between Margazhi spiritual devotion and the jubilant harvest celebration of Thai Pongal. It marks the sun’s entry into Capricorn (Uttarayan) and ushers in the foremost wedding season of the year.',
    ritualsTa: 'தைப்பொங்கல், மாட்டுப் பொங்கல், காணும் பொங்கல், மற்றும் தைப்பூச முருகப் பெருமான் விரதம் ஆகியவை இம்மாதத்தின் முதன்மை வழிபாடுகளாகும்.',
    ritualsEn: 'Key observances include Thai Pongal, Mattu Pongal, Kaanum Pongal, and the grand Thai Poosam pilgrimage honoring Lord Murugan.',
  },
  2: {
    seasonTa: 'பின்பனிக் காலம் • தை – மாசி மாதங்கள்',
    seasonEn: 'Late Dew Season • Thai – Masi Months',
    descTa: 'பிப்ரவரி மாதம் சூரியனின் வடதிசை சஞ்சாரமான உத்தராயண காலத்தின் முக்கியமான பகுதியாகும். தை மாதத்தின் நிறைவும், ஆன்மிக வழிபாடுகளுக்குப் பெயர் பெற்ற மாசி மாதத்தின் தொடக்கமும் இம்மாதத்தில் அமைகிறது. சிவாலயங்களில் மஹா சிவராத்திரி விரதம் மற்றும் புண்ணிய நதிகளில் தீர்த்தவாரி நடைபெறும் சிறப்பான காலமாகும்.',
    descEn: 'February brings the pleasant transition into spring as the Sun strengthens in the Northern hemisphere. It encompasses Thai Poosam celebrations and the eve of Maha Shivaratri, an auspicious period for temple pilgrimages and sacred tank snanams.',
    ritualsTa: 'மாசி மகம் தீர்த்தவாரி, மஹா சிவராத்திரி இரவு நான்கு கால சிவபூஜை மற்றும் சுப முகூர்த்த திருமண வைபவங்கள்.',
    ritualsEn: 'Maha Shivaratri four-quarter night vigils, Masi Magam river snanam, and multiple auspicious wedding muhurtham dates.',
  },
  3: {
    seasonTa: 'இளவேனிற் காலம் • மாசி – பங்குனி சங்கமம்',
    seasonEn: 'Early Spring Season • Masi – Panguni Transition',
    descTa: 'மார்ச் மாதம் தமிழ் ஆண்டின் இறுதி மாதமான பங்குனியின் வசந்த கால தொடக்கமாகும். மரங்கள் துளிர்த்து பூக்கள் பூத்துக்குலுங்கும் இந்நாட்களில் சிவாலயங்கள் மற்றும் பெருமாள் கோயில்களில் திருக்கல்யாண உற்சவங்கள் களைகட்டும். பங்குனி உத்திரம் தெய்வ திருமணங்களின் மாதமாகப் போற்றப்படுகிறது.',
    descEn: 'March coincides with the romantic floral spring of Panguni, the twelfth and culminating month of the Tamil year. Known across Tamil Nadu as the month of divine celestial weddings (Thirukalyanam), it draws millions to temples.',
    ritualsTa: 'பங்குனி உத்திரம், காரடையான் நோன்பு மற்றும் கோயில்களின் பிரம்மோற்சவ தேரோட்டங்கள்.',
    ritualsEn: 'Panguni Uthiram temple car festivals, Karadayan Nombu for marital prosperity, and annual temple Brahmotsavams.',
  },
  4: {
    seasonTa: 'வசந்த காலம் • பங்குனி – சித்திரை மாதப் பிறப்பு',
    seasonEn: 'Spring Season • Panguni – Chithirai Tamil New Year',
    descTa: 'ஏப்ரல் மாதம் தமிழ் புத்தாண்டு பிறக்கும் பெருமைமிக்க மாதமாகும். சூரியன் மேஷ ராசியில் உச்சம் பெறும் சித்திரை 1-ஆம் நாள் புதிய ஆண்டின் தொடக்கமாகக் கொண்டாடப்படுகிறது. மதுரை மீனாட்சி சுந்தரேஸ்வரர் திருக்கல்யாணம் மற்றும் சித்திரைத் திருவிழா உலகப் புகழ் பெற்றதாகும்.',
    descEn: 'April heralds the grand Tamil New Year (Puthandu) as the Sun ingresses into Aries. It is marked by vibrant cultural festivity, the reading of the new Panchangam, and the world-renowned Chithirai Festival in Madurai.',
    ritualsTa: 'தமிழ்ப் புத்தாண்டு சித்திரை விஷு கன்னி காணுதல், வேப்பம்பூ பச்சடி நைவேத்தியம் மற்றும் சித்ரா பௌர்ணமி கள்ளழகர் வைகை ஆற்றில் இறங்குதல்.',
    ritualsEn: 'Viewing Kanni on Tamil New Year, consuming Neem Flower Manga Pachadi, and Chitra Pournami Kallazhagar entry into River Vaigai.',
  },
  5: {
    seasonTa: 'முதுவேனிற் காலம் • சித்திரை – வைகாசி வெயில் காலம்',
    seasonEn: 'Summer Season • Chithirai – Vaikasi Solstice',
    descTa: 'மே மாதம் சூரியனின் கதிர்வீச்சு உச்சத்தில் இருக்கும் கத்திரி வெயில் (அக்னி நட்சத்திர) காலத்தைக் கொண்டுள்ளது. வெப்பத்தைத் தணிக்கும் வகையில் நீர்மோர் பந்தல்கள் அமைப்பதும், முருகப் பெருமானின் அவதார தினமான "வைகாசி விசாகம்" மற்றும் நரசிம்ம ஜெயந்தி கொண்டாடுவதும் சிறப்பம்சமாகும்.',
    descEn: 'May coincides with the peak solar radiance of Agni Nakshatra. Devotees perform cooling rituals, set up charity water pavilions (Neer-Mor Pandals), and celebrate Vaikasi Visakam (the advent of Lord Murugan).',
    ritualsTa: 'வைகாசி விசாகம், நரசிம்ம ஜெயந்தி மற்றும் அக்னி நட்சத்திர நிவர்த்தி விசேஷ பூஜைகள்.',
    ritualsEn: 'Vaikasi Visakam Murugan worship, Narasimha Jayanti twilight fasting, and temple cooling Abhishekam.',
  },
  6: {
    seasonTa: 'கோடை காலம் • வைகாசி – ஆனித் திருமஞ்சனம்',
    seasonEn: 'Summer • Vaikasi – Aani Thirumanjanam',
    descTa: 'ஜூன் மாதம் சிதம்பரத்தில் நடராஜப் பெருமானுக்கு நடைபெறும் ஆறு முக்கிய அபிஷேகங்களில் ஒன்றான "ஆனித் திருமஞ்சனம்" நடைபெறும் உன்னதமான மாதமாகும். கோடையின் நிறைவும், தென்மேற்குப் பருவக்காற்றின் மெல்லிய தொடக்கமும் இம்மாதத்தில் நிகழ்கிறது.',
    descEn: 'June features one of the six supreme annual Abhishekhams for Lord Nataraja—Aani Thirumanjanam—at the golden temple of Chidambaram, celebrating cosmic dance and cosmic order.',
    ritualsTa: 'சிதம்பரம் ஆனித் திருமஞ்சனம், ஏகாதசி விரதங்கள் மற்றும் ஆனி மாத சுப முகூர்த்தங்கள்.',
    ritualsEn: 'Chidambaram Natarajar Aani Thirumanjanam, Yogini Ekadashi, and mid-year wedding celebrations.',
  },
  7: {
    seasonTa: 'கார் காலம் • ஆனி – ஆடி மாத பிறப்பு',
    seasonEn: 'Monsoon Awakening • Aani – Aadi Sacred Month',
    descTa: 'ஜூலை மாதம் ஆன்மிகச் சிறப்பு வாய்ந்த "ஆடி" மாதம் பிறக்கும் காலமாகும். சூரியன் தட்சிணாயனப் பயணத்தைத் தொடங்கும் காலம். அம்மன் கோயில்களில் கூழ் ஊற்றுதல், ஆடிச் செவ்வாய், ஆடி வெள்ளிக்கிழமைகளில் பெண்கள் விளக்கு பூஜை செய்வதும், தாலி பிரித்துக் கோர்ப்பதும் இம்மாதத்தின் பண்பாடாகும்.',
    descEn: 'July marks the ingress into the sacred month of Aadi and the commencement of Dakshinayan (the Sun’s southern journey). Known for intense Shakthi worship, Amman temples resound with devotional music and sacred porridge (Koozh) offerings.',
    ritualsTa: 'ஆடி வெள்ளி, ஆடிச் செவ்வாய், ஆடி அமாவாசை பித்ரு தர்ப்பணம் மற்றும் ஆடி கிருத்திகை.',
    ritualsEn: 'Aadi Velli lamp worship, Aadi Amavasai ancestral offerings, and Aadi Krithigai Murugan festivities.',
  },
  8: {
    seasonTa: 'மழைக்காலம் • ஆடி – ஆவணி சங்கமம்',
    seasonEn: 'Monsoon Season • Aadi – Avani Auspicious Dawn',
    descTa: 'ஆகஸ்ட் மாதம் காவிரியில் புதுவெள்ளம் பாய்ந்தோடும் "ஆடிப்பெருக்கு" விழாவும், மங்களகரமான சுப காரியங்கள் மீண்டும் முழு வீச்சில் தொடங்கும் "ஆவணி" மாதமும் இணையும் மாதமாகும். ஆவணி அவிட்டம் காயத்ரி ஜபமும், கிருஷ்ண ஜெயந்தி விழாவும் இம்மாதத்தில் விமரிசையாகக் கொண்டாடப்படுகிறது.',
    descEn: 'August unites river veneration during Aadi Perukku with the auspicious advent of Avani. It brings the renewal of sacred threads on Avani Avittam, Gayatri Japa, and the joyous midnight celebrations of Krishna Jayanti.',
    ritualsTa: 'ஆடி 18-ஆம் பெருக்கு, வரலக்ஷ்மி விரதம், ஆவணி அவிட்டம் மற்றும் ஸ்ரீகிருஷ்ண ஜெயந்தி / கோகுலாஷ்டமி.',
    ritualsEn: 'Aadi 18 Kaveri river thanksgiving, Varalakshmi Vratam for prosperity, and Krishna Janmashtami.',
  },
  9: {
    seasonTa: 'கூதிர் காலம் • ஆவணி – புரட்டாசி மாதங்கள்',
    seasonEn: 'Autumn Transition • Avani – Purattasi Fasting',
    descTa: 'செப்டம்பர் மாதம் முழுமுதற் கடவுளான விநாயகப் பெருமானின் "விநாயகர் சதுர்த்தி" விழாவும், திருப்பதி ஏழுமலையானுக்கு உகந்த "புரட்டாசி" மாதமும் தொடங்கும் சிறப்பான மாதமாகும். புரட்டாசி சனிக்கிழமைகளில் தளிகை இட்டு மாவிளக்கு ஏற்றி வெங்கடாஜலபதியை வணங்குவர்.',
    descEn: 'September hosts the pan-Indian devotion of Vinayagar Chathurthi and ushers in the sanctified month of Purattasi dedicated to Lord Venkateswara, observed through vegetarian discipline and Saturday Maavillakku offerings.',
    ritualsTa: 'விநாயகர் சதுர்த்தி, மகாளய பக்ஷம் முன்னோர்கள் வழிபாடு மற்றும் புரட்டாசி சனிக்கிழமை விரதம்.',
    ritualsEn: 'Vinayagar Chathurthi clay idol pooja, Mahalaya Paksha ancestral fortnight, and Tirupati Venkateswara prayers.',
  },
  10: {
    seasonTa: 'மழைக்காலம் • புரட்டாசி – ஐப்பசி பெருவிழா',
    seasonEn: 'Monsoon Splendor • Purattasi – Aippasi Festivities',
    descTa: 'அக்டோபர் மாதம் ஒன்பது இரவுகள் அம்பாளை வழிபடும் "நவராத்திரி", கலைமகளுக்குரிய "சரஸ்வதி பூஜை", தொழில்களுக்குரிய "ஆயுத பூஜை", மற்றும் வெற்றித் திருநாளான "விஜயதசமி" ஆகிய பெருவிழாக்கள் அணிவகுக்கும் மாதமாகும். கோயில்களில் அன்னாபிஷேகம் நடைபெறும்.',
    descEn: 'October brings the devotional pinnacle of Navaratri, Ayudha Pooja, Saraswathi Pooja, and Vijayadasami, followed by the fragrant Annabhishekam (cooked rice offering) at Shiva temples across Tamil Nadu.',
    ritualsTa: 'நவராத்திரி கொலு வைபவம், ஆயுத பூஜை, விஜயதசமி வித்யாரம்பம் மற்றும் ஐப்பசி அன்னாபிஷேகம்.',
    ritualsEn: 'Nine-night Bommala Golu display, Saraswathi Pooja, Vijayadasami Vidyarambham, and Annabhishekam.',
  },
  11: {
    seasonTa: 'குளிர்காலம் • ஐப்பசி – கார்த்திகை தீப ஒளி',
    seasonEn: 'Winter Awakening • Aippasi – Karthigai Deepam',
    descTa: 'நவம்பர் மாதம் இருள் நீங்கி ஒளி பரப்பும் "தீபாவளி" பண்டிகையும், மலைமீது மகா தீபம் ஏற்றப்படும் "திருக்கார்த்திகை தீபம்" விழாவும் மிளிரும் ஜோதி மாதமாகும். கார்த்திகை மாதம் முழுவதும் பெண்கள் வாசலிலும் பூஜை அறையிலும் அகல் விளக்குகள் ஏற்றி வழிபடுவார்கள்.',
    descEn: 'November illuminates Tamil households with the joyous dawn of Deepavali and the sacred earthen lamp celebrations of Karthigai Deepam, highlighted by the majestic beacon on Mount Arunachala.',
    ritualsTa: 'தீபாவளி கங்கா ஸ்நானம், கந்த சஷ்டி சூரசம்ஹாரம் மற்றும் திருக்கார்த்திகை அகல் விளக்கு வழிபாடு.',
    ritualsEn: 'Deepavali dawn Ganga Snanam, Kanda Sashti Soorasamharam Murugan victory, and Karthigai Maha Deepam.',
  },
  12: {
    seasonTa: 'முன்பனிக் குளிர் காலம் • கார்த்திகை – மார்கழி பக்தி',
    seasonEn: 'Winter Dew Season • Karthigai – Margazhi Bhakti',
    descTa: 'டிசம்பர் மாதம் ஆண்டாள் பாடிய திருப்பாவை மற்றும் மாணிக்கவாசகர் பாடிய திருவெம்பாவை பாடி அதிகாலையில் வீதிகளில் பஜனை செய்யும் தெய்வீக "மார்கழி" மாதமாகும். வைகுண்ட ஏகாதசி சொர்க்கவாசல் திறப்பும், சிதம்பரத்தில் ஆருத்ரா தரிசனமும் இம்மாதத்தின் உச்சகட்ட வழிபாடுகளாகும்.',
    descEn: 'December brings the cool, pious pre-dawn atmosphere of Margazhi. Devotees chant Andal’s Thiruppavai and Manikkavacakar’s Thiruvempavai, leading up to Vaikunta Ekadashi and Natarajar’s Arudra Darisanam.',
    ritualsTa: 'மார்கழி மாத அதிகாலை பஜனை, வைகுண்ட ஏகாதசி சொர்க்கவாசல் திறப்பு, மற்றும் ஆருத்ரா தரிசனம்.',
    ritualsEn: 'Pre-dawn Margazhi Bhajan, Vaikunta Ekadashi Paramapada Vasal opening, and Chidambaram Arudra Darisanam.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}): Promise<Metadata> {
  const { locale, year, month } = await params;
  const isEn = locale === 'en';
  const dict = getDictionary(isEn ? 'en' : 'ta');
  const monthNum = parseInt(month, 10);
  const monthName = dict.months[monthNum - 1] || month;

  const title = isEn
    ? `Tamil Calendar ${monthName} ${year} | Monthly Sheet, Muhurtham & Festivals`
    : `தமிழ் காலண்டர் ${monthName} ${year} | மாத நாட்காட்டி, முகூர்த்தம் & விசேஷங்கள்`;

  const description = isEn
    ? `Full monthly Tamil calendar for ${monthName} ${year}: comprehensive daily panchangam, auspicious Muhurtham wedding dates, fasting days, and festival guide.`
    : `${year} ${monthName} மாத முழுமையான தமிழ் நாட்காட்டி, சுப முகூர்த்த நாட்கள், பௌர்ணமி, அமாவாசை, பிரதோஷம் மற்றும் பண்டிகை விசேஷங்களின் விரிவான பட்டியல்.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/calendar/month/${year}/${month}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/calendar/month/${year}/${month}`,
        en: `https://nammatamilcalendar.in/en/calendar/month/${year}/${month}`,
      },
    },
  };
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';
  const yearNum = parseInt(resolvedParams.year, 10);
  const monthNum = parseInt(resolvedParams.month, 10);
  const isTa = locale === 'ta';
  const dict = getDictionary(locale);
  const monthName = dict.months[monthNum - 1] || resolvedParams.month;

  const monthResponse = await fetchMonthCalendar(yearNum, monthNum);
  const days = monthResponse?.days || [];

  const narrative = MONTH_NARRATIVES[monthNum] || MONTH_NARRATIVES[1];

  // Dynamic calculations from this month's days
  const muhurthamDays = days.filter((d) => d.is_muhurtham);
  const festivalDays = days.filter((d) => Boolean(d.festival_info || d.festival_addon));
  const amavasaiDays = days.filter((d) => (d.day_auspicious && d.day_auspicious.includes('அமாவாசை')) || (d.festival_info && d.festival_info.includes('அமாவாசை')));
  const pournamiDays = days.filter((d) => (d.day_auspicious && d.day_auspicious.includes('பௌர்ணமி')) || (d.festival_info && d.festival_info.includes('பௌர்ணமி')));
  const pradoshamDays = days.filter((d) => (d.day_auspicious && d.day_auspicious.includes('பிரதோஷம்')) || (d.festival_info && d.festival_info.includes('பிரதோஷம்')));

  const distinctTamilMonths = Array.from(new Set(days.map((d) => d.tamil_month).filter(Boolean)));
  const tamilYearName = days[0]?.tamil_year || (yearNum === 2026 ? 'பராபவ' : 'பிலவ');

  const faqSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isTa ? `${yearNum} ${monthName} மாதத்தில் எத்தனை சுப முகூர்த்த நாட்கள் உள்ளன?` : `How many Muhurtham dates are in ${monthName} ${yearNum}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isTa
            ? `${yearNum} ${monthName} மாதத்தில் மொத்தம் ${muhurthamDays.length} சுப முகூர்த்த நாட்கள் அமைந்துள்ளன.`
            : `There are ${muhurthamDays.length} auspicious Muhurtham wedding dates verified in ${monthName} ${yearNum}.`,
        },
      },
      {
        '@type': 'Question',
        name: isTa ? `${yearNum} ${monthName} மாதம் எந்தெந்த தமிழ் மாதங்களை உள்ளடக்கியது?` : `Which Tamil months correspond to ${monthName} ${yearNum}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isTa
            ? `${monthName} மாதம் தமிழ் காலண்டரில் ${distinctTamilMonths.join(' மற்றும் ')} மாதங்களை உள்ளடக்கியுள்ளது.`
            : `${monthName} ${yearNum} spans the Tamil solar months of ${distinctTamilMonths.join(' and ')}.`,
        },
      },
    ],
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJSONLD) }}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isTa ? narrative.seasonTa : narrative.seasonEn} • {tamilYearName} {isTa ? 'ஆண்டு' : 'Year'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isTa ? `தமிழ் காலண்டர் ${monthName} ${yearNum}` : `Tamil Calendar ${monthName} ${yearNum}`}
            </h1>
          </div>

          {/* Year Switcher Pills */}
          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0 bg-black/25 p-1 rounded-2xl border border-white/20">
            {[2026, 2027].map((yr) => (
              <Link
                key={yr}
                href={`/${locale}/calendar/month/${yr}/${monthNum}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  yearNum === yr
                    ? 'bg-[#FFD700] text-[#700C0C] shadow-md ring-2 ring-white/30'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 max-w-3xl leading-relaxed">
          {isTa ? narrative.descTa : narrative.descEn}
        </p>

        {/* Quick Month Metrics */}
        <div className="pt-3 border-t border-white/20 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-[#FFD700]">
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `சுப முகூர்த்தம்: ${muhurthamDays.length} நாட்கள்` : `Muhurtham: ${muhurthamDays.length} Days`}
          </span>
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `பண்டிகைகள்: ${festivalDays.length}` : `Festivals: ${festivalDays.length}`}
          </span>
          <span className="px-3 py-1 rounded-xl bg-black/30 border border-white/15">
            {isTa ? `தமிழ் மாதங்கள்: ${distinctTamilMonths.join(' / ')}` : `Tamil Months: ${distinctTamilMonths.join(' / ')}`}
          </span>
        </div>
      </div>

      {/* Main Interactive Monthly Grid */}
      <MonthGrid year={yearNum} month={monthNum} days={days} locale={locale} />

      {/* Editorial Content: Month In-Depth Cultural Guide */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        
        {/* Section 1: Overview */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <TempleBellIcon className="w-5 h-5 text-[#8B1515]" />
            <h2 className="text-lg sm:text-xl font-black">
              {isTa ? `${monthName} மாத ஆன்மிக விசேஷங்கள் & வழிபாட்டு முறைகள்` : `Spiritual Observances & Rituals in ${monthName}`}
            </h2>
          </div>
          <p className="text-[#29262A] text-xs sm:text-sm leading-relaxed">
            {isTa ? narrative.ritualsTa : narrative.ritualsEn}
          </p>
        </div>

        {/* Section 2: Fasting & Observance Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Amavasai */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Moon className="w-3.5 h-3.5 text-slate-700" />
              <span>{isTa ? 'அமாவாசை நாட்கள்' : 'Amavasai Dates'}</span>
            </span>
            <span className="text-sm font-black text-[#1F1517] block">
              {amavasaiDays.length > 0 ? amavasaiDays.map((d) => d.date).join(', ') : (isTa ? 'இம்மாதத்தில் இல்லை' : 'None in this month')}
            </span>
          </div>

          {/* Pournami */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTa ? 'பௌர்ணமி நாட்கள்' : 'Pournami Dates'}</span>
            </span>
            <span className="text-sm font-black text-[#1F1517] block">
              {pournamiDays.length > 0 ? pournamiDays.map((d) => d.date).join(', ') : (isTa ? 'இம்மாதத்தில் இல்லை' : 'None in this month')}
            </span>
          </div>

          {/* Pradosham */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-red-700" />
              <span>{isTa ? 'பிரதோஷம் நாட்கள்' : 'Pradosham Dates'}</span>
            </span>
            <span className="text-sm font-black text-[#1F1517] block">
              {pradoshamDays.length > 0 ? pradoshamDays.map((d) => d.date).join(', ') : (isTa ? 'இம்மாதத்தில் இல்லை' : 'None in this month')}
            </span>
          </div>
        </div>

        {/* Section 3: Auspicious Muhurtham Dates in this Month */}
        {muhurthamDays.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FEF3C7]/40 border border-[#FCD34D] space-y-2">
            <div className="flex items-center space-x-2 text-[#8B1515]">
              <Heart className="w-4 h-4 text-[#C93B2B] fill-[#C93B2B]" />
              <h3 className="text-sm sm:text-base font-black">
                {isTa ? `${monthName} மாத சுப முகூர்த்த திருமண தேதிகள் (${muhurthamDays.length} நாட்கள்)` : `Auspicious Wedding Muhurtham Dates in ${monthName}`}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {muhurthamDays.map((m) => (
                <Link
                  key={m.date}
                  href={`/${locale}/calendar/${m.date}`}
                  className="px-3 py-1 rounded-xl bg-white border border-[#EBDCCF] text-xs font-black text-[#8B1515] hover:bg-[#8B1515] hover:text-white transition-all shadow-2xs"
                >
                  {m.date} ({m.tamil_month} {m.tamil_date})
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Monthly FAQ */}
        <div className="space-y-3 pt-3 border-t border-[#EBDCCF]">
          <div className="flex items-center space-x-2 text-[#8B1515]">
            <HelpCircle className="w-4 h-4 text-[#8B1515]" />
            <h3 className="text-sm sm:text-base font-black">
              {isTa ? `${monthName} மாத சந்தேகங்களும் விளக்கங்களும் (FAQs)` : `Frequently Asked Questions for ${monthName}`}
            </h3>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
              <span className="font-bold text-[#8B1515] block">
                {isTa ? `1. ${yearNum} ${monthName} மாதத்தில் சிறந்த சுப நாட்கள் எவை?` : `1. What are the best auspicious days in ${monthName} ${yearNum}?`}
              </span>
              <p className="text-[#5C5256]">
                {isTa
                  ? `இம்மாதத்தில் அமைந்துள்ள ${muhurthamDays.length} சுப முகூர்த்த நாட்கள் மற்றும் வளர்பிறை துவிதியை, திருதியை, பஞ்சமி தினங்கள் நற்காரியங்களுக்கு மிகவும் உகந்தவை.`
                  : `The ${muhurthamDays.length} verified Muhurtham days along with Shukla Paksha Dwitiya, Tritiya, and Panchami are considered the most favorable.`}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1">
              <span className="font-bold text-[#8B1515] block">
                {isTa ? `2. ${monthName} மாத காலண்டரை அச்சிட (Print) முடியுமா?` : `2. Can I print or download this monthly calendar?`}
              </span>
              <p className="text-[#5C5256]">
                {isTa
                  ? 'ஆம், உங்கள் உலாவியின் அச்சு விருப்பத்தைப் (Ctrl + P அல்லது Print) பயன்படுத்தி இந்த மாத நாட்காட்டியை நேர்த்தியான காகித வடிவில் எளிதாக அச்சிட்டுக் கொள்ளலாம்.'
                  : 'Yes, you can use your browser’s print command (Ctrl+P or Print) to print this clean monthly grid directly for home or office use.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Container */}
      <AdContainer slotName="Monthly View Bottom" format="banner" />
    </div>
  );
}
