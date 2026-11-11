export interface GuideArticle {
  slug: string;
  titleTa: string;
  titleEn: string;
  summaryTa: string;
  summaryEn: string;
  readTime: string;
  sections: {
    headingTa: string;
    headingEn: string;
    contentTa: string;
    contentEn: string;
  }[];
  faqs: {
    qTa: string;
    aTa: string;
    qEn: string;
    aEn: string;
  }[];
}

export const GUIDES_DATA: Record<string, GuideArticle> = {
  'what-is-panchangam': {
    slug: 'what-is-panchangam',
    titleTa: 'பஞ்சாங்கம் என்றால் என்ன? அதை எவ்வாறு படிக்க வேண்டும்?',
    titleEn: 'What is a Panchangam and How to Read It Accurately?',
    summaryTa: 'பஞ்சாங்கம் என்ற சொல்லின் பொருள், அதன் ஐந்து முக்கிய அங்கங்கள், வாக்கிய-திருக்கணித முறைகள் மற்றும் அன்றாட வாழ்க்கையில் நல்ல நேரம் கணிக்கும் எளிய வழிகாட்டி.',
    summaryEn: 'A beginner-friendly and authoritative guide to understanding the five sacred limbs of the Tamil Panchangam, calculation systems, and reading daily timings.',
    readTime: '6 min read',
    sections: [
      {
        headingTa: '1. பஞ்சாங்கம் சொல்லின் மூலம் மற்றும் அடிப்படை தத்துவம்',
        headingEn: '1. Etymology and Spiritual Philosophy of Panchangam',
        contentTa:
          'பஞ்சாங்கம் என்பது "பஞ்ச" (ஐந்து) மற்றும் "அங்கம்" (உறுப்புகள்) என்ற இரண்டு வடமொழிச் சொற்களின் இணைப்பாகும். வானில் நிகழும் சூரிய மற்றும் சந்திரனின் இயக்கங்களை அடிப்படையாகக் கொண்டு, காலத்தின் நுட்பமான அதிர்வுகளையும் தன்மைகளையும் கணித்து மனித குலத்தின் நல்வாழ்விற்காகத் தொகுக்கப்பட்ட உன்னத வானியல் சாஸ்திரமே பஞ்சாங்கம் ஆகும். பஞ்சாங்கத்தை அன்றாடம் காலையில் பாராயணம் செய்வதோ அல்லது வாசிப்பதோ ஆயுள், செல்வம், பாவ நிவர்த்தி, நோய் நீக்கம் மற்றும் காரிய சித்தி ஆகிய ஐந்து பெரும் பேறுகளைத் தரும் என்று வேத சாஸ்திரங்கள் குறிப்பிடுகின்றன.',
        contentEn:
          'The word Panchangam stems from Sanskrit: "Pancha" (Five) and "Anga" (Limbs). It represents the traditional Vedic and Tamil solar-lunar astronomical almanac that charts the celestial movements of the Sun and Moon. Reading or listening to the five limbs of the day every morning is spiritually held to bestow longevity, prosperity, purification from negativity, and success in one’s endeavors.',
      },
      {
        headingTa: '2. பஞ்சாங்கத்தின் ஐந்து புனித அங்கங்கள் யாவை?',
        headingEn: '2. The Five Limbs (Pancha-Angas) Explained',
        contentTa:
          'பஞ்சாங்கத்தில் அடங்கிய ஐந்து பிரதான கூறுகள்:\n' +
          '1. வாரம் (Vara - கிழமை): ஞாயிறு முதல் சனி வரை உள்ள ஏழு கிழமைகள். ஒவ்வொன்றும் ஒரு நவகிரகத்தால் ஆளப்படுகிறது (ஞாயிறு - சூரியன், திங்கள் - சந்திரன், செவ்வாய் - செவ்வாய், புதன் - புதன், வியாழன் - குரு, வெள்ளி - சுக்கிரன், சனி - சனி).\n' +
          '2. திதி (Tithi - சந்திர நாள்): சூரியனுக்கும் சந்திரனுக்கும் இடைப்பட்ட 12 பாகை கோண தூரம். வளர்பிறையில் 15 திதிகளும் (பிரதமை முதல் பௌர்ணமி வரை), தேய்பிறையில் 15 திதிகளும் (பிரதமை முதல் அமாவாசை வரை) மொத்தம் 30 திதிகள் உள்ளன.\n' +
          '3. நட்சத்திரம் (Nakshatra - விண்மீன்): சந்திரன் 360 பாகை விண்வெளியில் கடந்து செல்லும் 27 நட்சத்திர பாதைகள் (அசுவினி முதல் ரேவதி வரை). ஒரு நாளில் சந்திரன் எந்த நட்சத்திர மண்டலத்தில் சஞ்சரிக்கிறாரோ அதுவே அன்றைய நாளின் நட்சத்திரமாகும்.\n' +
          '4. யோகம் (Yogam - கோள்களின் சேர்க்கை): சூரியன் மற்றும் சந்திரனின் பாகை கூட்டமைப்பால் உண்டாகும் 27 நித்திய யோகங்கள் (விஷ்கம்பம் முதல் வைதிருதி வரை). மேலும் பொது வழக்கில் சுப காரியங்களுக்காக சித்த யோகம், அமிர்த யோகம், மற்றும் மரண யோகம் என மூவகையாகப் பிரிக்கப்படுகிறது.\n' +
          '5. கரணம் (Karanam - திதியின் பாதி): ஒரு திதியின் சரிபாதி அளவே ஒரு கரணமாகும் (6 பாகை இடைவெளி). மொத்தம் 11 கரணங்கள் உள்ளன; இதில் 7 சர கரணங்களும் 4 ஸ்திர கரணங்களும் அடங்கும்.',
        contentEn:
          'The five core limbs are:\n' +
          '1. Vara (Weekday): The solar day governed by a ruling planet (Sunday through Saturday).\n' +
          '2. Tithi (Lunar Phase): The 12-degree longitudinal separation between the Sun and Moon, comprising 15 Shukla Paksha (waxing) and 15 Krishna Paksha (waning) phases totaling 30 tithis.\n' +
          '3. Nakshatra (Asterism): The lunar mansion occupied by the Moon among the 27 sidereal constellations (Ashwini to Revati).\n' +
          '4. Yogam (Solar-Lunar Conjunction): The sum of solar and lunar longitudes, categorized for daily auspiciousness into Siddha, Amrita, and Marana yogas.\n' +
          '5. Karanam (Half-Tithi): Half of a lunar tithi (6 degrees interval), with 11 Karanas guiding tactical daily actions.',
      },
      {
        headingTa: '3. வாக்கிய பஞ்சாங்கம் vs திருக்கணித பஞ்சாங்கம்',
        headingEn: '3. Vakya Panchangam vs Drik Ganitha Panchangam',
        contentTa:
          'தமிழ்நாட்டில் இருவேறு பஞ்சாங்க கணிப்பு முறைகள் வழக்கத்தில் உள்ளன. வரருசி முனிவர் அருளிய பண்டைய செய்யுள் சூத்திரங்களை அடிப்படையாகக் கொண்டு கணக்கிடப்படுவது "வாக்கிய பஞ்சாங்கம்" ஆகும்; இது பல புகழ்பெற்ற கோயில்களின் திருவிழாக்கள் மற்றும் வழிபாட்டு மரபுகளில் தொடர்ந்து கடைப்பிடிக்கப்படுகிறது. நவீன தொலைநோக்கிகள் மற்றும் துல்லியமான கிரக சுழற்சி வானியல் கணிப்புகளை அடிப்படையாகக் கொண்டு கணக்கிடப்படுவது "திருக்கணித பஞ்சாங்கம்" ஆகும். இவற்றிற்கிடையே திதி மற்றும் நட்சத்திரங்களின் முடிவு நேரங்களில் சிறிய நிமிட மாறுதல்கள் ஏற்படுவது இயல்பானதே.',
        contentEn:
          'Tamil culture embraces two historical systems: Vakya Panchangam, anchored in ancient mnemonic poetic verses (Vakyas) and widely observed across iconic Tamil temples for annual festival schedules; and Drik Ganitha Panchangam, calculated using modern astronomical coordinates and observational ephemerides. Slight variations in start and end times between the two are natural and respected within tradition.',
      },
      {
        headingTa: '4. தினசரி நாட்காட்டி அட்டையை எவ்வாறு படிக்க வேண்டும்?',
        headingEn: '4. Step-by-Step Guide to Reading the Daily Sheet',
        contentTa:
          'நமது இணையதளத்தின் தினசரி அட்டையைப் படிக்கும்போது:\n' +
          '• முதலில் தமிழ் மாதம் மற்றும் தமிழ் தேதியைக் கவனியுங்கள் (எ.கா: தை 1).\n' +
          '• அன்றைய திதி மற்றும் நட்சத்திரம் எப்போது முடிவடைகிறது என்பதைக் குறித்துக் கொள்ளுங்கள் (எ.கா: "மதியம் 2:15 வரை திருதியை பின்பு சதுர்த்தி").\n' +
          '• சுப காரியங்களை நல்ல நேரம் அல்லது கௌரி நல்ல நேரத்தில் தொடங்குங்கள்.\n' +
          '• இராகு காலம், எமகண்டம் ஆகிய நேரங்களில் புதிய முயற்சிகளையோ, பயணங்களையோ தொடங்குவதைத் தவிருங்கள்.\n' +
          '• சந்திராஷ்டமம் உள்ள ராசிக்காரர்கள் அன்றைய தினம் விழிப்புணர்வுடனும் இறை வழிபாட்டுடனும் இருப்பது நல்லது.',
        contentEn:
          'When reading our daily calendar card:\n' +
          '• Check the prevailing Tamil solar month and date.\n' +
          '• Note the transitioning times for Tithi and Nakshatra (e.g., "Bharani until 2:15 PM, thereafter Krittika").\n' +
          '• Plan crucial activities during Nalla Neram or Gowri Nalla Neram.\n' +
          '• Avoid initiating contracts or journeys during Rahu Kalam and Yamagandam.\n' +
          '• Moon signs under Chandrashtamam should exercise caution and maintain quiet contemplation.',
      },
    ],
    faqs: [
      {
        qTa: 'பஞ்சாங்கம் பார்ப்பதால் என்ன பயன்?',
        aTa: 'இயற்கையின் கிரக ஆற்றல்களுக்கு ஏற்ப காரியங்களைத் திட்டமிடுவதன் மூலம் தடைகள் நீங்கி, எடுக்கும் முயற்சிகள் தடையின்றி வெற்றிகரமாக நிறைவேற உதவுகிறது.',
        qEn: 'What is the practical benefit of checking Panchangam daily?',
        aEn: 'Aligning our actions with cosmic rhythms helps minimize obstacles and ensures harmonious timing for meetings, ceremonies, and travel.',
      },
    ],
  },

  'tithi-nakshatra-yogam-karanam': {
    slug: 'tithi-nakshatra-yogam-karanam',
    titleTa: 'திதி, நட்சத்திரம், யோகம், கரணம்: எளிய விளக்கம்',
    titleEn: 'Tithi, Nakshatra, Yogam, and Karanam Explained Simply',
    summaryTa: 'சந்திரனின் 30 திதிகள், 27 நட்சத்திரங்களின் பெயர்கள், சித்த-அமிர்த-மரண யோகங்களின் பலன்கள் மற்றும் 11 கரணங்களின் செயல்பாடுகள் குறித்த முழுமையான விளக்கக் கட்டுரை.',
    summaryEn: 'An essential breakdown of the 30 lunar phases (Tithis), 27 Nakshatras, daily Yogas, and 11 Karanas with cultural and spiritual context.',
    readTime: '7 min read',
    sections: [
      {
        headingTa: '1. திதி என்றால் என்ன? அதன் 30 நிலைகள்',
        headingEn: '1. Understanding Tithi: The 30 Lunar Phases',
        contentTa:
          'சந்திரன் சூரியனிடமிருந்து விலகிச் செல்லும் காலமே வளர்பிறை (சுக்கில பட்சம்); சூரியனை நோக்கி நெருங்கி வரும் காலமே தேய்பிறை (கிருஷ்ண பட்சம்). அமாவாசைக்கு மறுநாள் தொடங்கி பௌர்ணமி வரை 15 திதிகள் வளர்பிறை ஆகும். பௌர்ணமிக்கு மறுநாள் தொடங்கி அமாவாசை வரை 15 திதிகள் தேய்பிறை ஆகும்.\n\n' +
          'முக்கிய திதிகள்:\n' +
          '• பிரதமை, துவிதியை, திருதியை (அக்ஷய திருதியை), சதுர்த்தி (விநாயகர் சதுர்த்தி), பஞ்சமி, சஷ்டி (முருகன் விரதம்), சப்தமி, அஷ்டமி, நவமி (ராம நவமி), தசமி (விஜயதசமி), ஏகாதசி (விஷ்ணு விரதம்), துவாதசி, திரயோதசி (பிரதோஷம்), சதுர்த்தசி, மற்றும் பௌர்ணமி / அமாவாசை.',
        contentEn:
          'Tithi is the lunar day determined by the Moon moving 12 degrees away from or closer to the Sun. The waxing fortnight (Shukla Paksha) culminates in Pournami (Full Moon), while the waning fortnight (Krishna Paksha) culminates in Amavasai (New Moon). Crucial observance tithis include Sashti (Lord Murugan), Ekadashi (Lord Vishnu), and Trayodashi (Pradosham).',
      },
      {
        headingTa: '2. 27 நட்சத்திரங்களும் அவற்றின் அதிபதிகளும்',
        headingEn: '2. The 27 Sidereal Nakshatras',
        contentTa:
          'வான மண்டலத்தை 27 சம பிரிவுகளாகப் பிரித்துள்ளனர். ஒவ்வொரு நட்சத்திரமும் 13 பாகை 20 கலைகள் கொண்டதாகும்:\n' +
          '1. அசுவினி (கேது) | 2. பரணி (சுக்கிரன்) | 3. கார்த்திகை (சூரியன்) | 4. ரோகிணி (சந்திரன்) | 5. மிருகசீரிஷம் (செவ்வாய்) | 6. திருவாதிரை (ராகு) | 7. புனர்பூசம் (குரு) | 8. பூசம் (சனி) | 9. ஆயில்யம் (புதன்)\n' +
          '10. மகம் (கேது) | 11. பூரம் (சுக்கிரன்) | 12. உத்திரம் (சூரியன்) | 13. அஸ்தம் (சந்திரன்) | 14. சித்திரை (செவ்வாய்) | 15. சுவாதி (ராகு) | 16. விசாகம் (குரு) | 17. அனுஷம் (சனி) | 18. கேட்டை (புதன்)\n' +
          '19. மூலம் (கேது) | 20. பூராடம் (சுக்கிரன்) | 21. உத்திராடம் (சூரியன்) | 22. திருவோணம் (சந்திரன்) | 23. அவிட்டம் (செவ்வாய்) | 24. சதயம் (ராகு) | 25. பூரட்டாதி (குரு) | 26. உத்திரட்டாதி (சனி) | 27. ரேவதி (புதன்).',
        contentEn:
          'The zodiac is partitioned into 27 asterisms of 13°20′ each, spanning from Ashwini to Revati. Each Nakshatra is assigned a planetary ruler that governs personal birth horoscopes and daily energy patterns.',
      },
      {
        headingTa: '3. சித்த யோகம், அமிர்த யோகம், மரண யோகம் விளக்கம்',
        headingEn: '3. The Three Daily Yogas: Siddha, Amrita, and Marana',
        contentTa:
          'கிழமையும் நட்சத்திரமும் இணையும் தன்மையைப் பொறுத்து தினசரி யோகம் நிர்ணயிக்கப்படுகிறது:\n' +
          '• சித்த யோகம் (Siddha Yogam): காரிய சித்தி தரும் சுப யோகம். தொழில் தொடங்குதல், பயணம், வியாபாரம், கிரகப்பிரவேசம் போன்ற நற்காரியங்களுக்கு மிகவும் உகந்தது.\n' +
          '• அமிர்த யோகம் (Amrita Yogam): அமுதத்தைப் போன்ற நற்பலன்களைத் தரும் மிகச் சிறந்த யோகம். மருந்துகள் உட்கொள்ளுதல், மந்திர உபதேசம், வித்தைகள் கற்பதற்கு மிகச் சிறந்தது.\n' +
          '• மரண யோகம் (Marana Yogam): தடைகளையும் நஷ்டங்களையும் உண்டாக்கும் அசுப யோகம். இந்த யோகம் உள்ள நேரங்களில் சுப காரியங்களைத் தொடங்காமல் தவிர்ப்பது மரபாகும்.',
        contentEn:
          'Determined by the confluence of the weekday and Nakshatra:\n' +
          '• Siddha Yogam: Highly auspicious for commencing ventures, travel, commerce, and ceremonies.\n' +
          '• Amrita Yogam: Imparts nectar-like divine blessings, excellent for spiritual initiation and medical treatments.\n' +
          '• Marana Yogam: Considered unfruitful; traditional wisdom advises against launching new ventures during this window.',
      },
      {
        headingTa: '4. கரணம் என்றால் என்ன?',
        headingEn: '4. The Role of Karanas in Timing',
        contentTa:
          'திதியின் பாதி அளவு கரணமாகும். மொத்தம் 11 கரணங்கள்: பவம், பாலவம், கௌலவம், தைதுலை, கரசை, வணிசை, பத்திரை, சகுனி, சதுஷ்பாதம், நாகவம், கிம்துக்கினம். இதில் பத்திரை கரணம் (விஷ்டி கரணம்) அசுபமாகக் கருதப்படுகிறது; மற்ற கரணங்கள் உரிய நற்செயல்களுக்குப் பயன்படுத்தப்படுகின்றன.',
        contentEn:
          'A Karana is half of a Tithi (6 degrees). Among the 11 Karanas, Vishti (Bhadra) is considered inauspicious for contracts and travel, whereas Bava, Balava, and Kaulava are propitious for constructive tasks.',
      },
    ],
    faqs: [
      {
        qTa: 'அஷ்டமி மற்றும் நவமியில் சுப காரியங்கள் செய்யலாமா?',
        aTa: 'பொதுவாக அஷ்டமி மற்றும் நவமி திதிகளில் திருமணம், புதுமனை புகுவிழா போன்ற இல்லற சுப காரியங்களைத் தவிர்ப்பர். எனினும் ஆன்மிக உபாசனை, அம்மன் வழிபாடு, கல்விப் பயில்விற்கு இவை சிறந்த திதிகளாகும்.',
        qEn: 'Why are Ashtami and Navami generally avoided for domestic celebrations?',
        aEn: 'Ashtami and Navami are traditionally reserved for intense spiritual sadhana and temple worship rather than materialistic celebrations like weddings or housewarmings.',
      },
    ],
  },

  'rahu-kalam-yamagandam-nalla-neram': {
    slug: 'rahu-kalam-yamagandam-nalla-neram',
    titleTa: 'இராகு காலம், எமகண்டம், குளிகை, நல்ல நேரம்: கணக்கீட்டு விதிகள்',
    titleEn: 'Rahu Kalam, Yamagandam, Kuligai & Nalla Neram Explained',
    summaryTa: 'வாரத்தின் ஏழு நாட்களுக்கும் உரிய இராகு காலம், எமகண்டம், குளிகை நேரங்களின் அட்டவணை, நினைவில் வைத்துக்கொள்ளும் எளிய சூத்திரம் மற்றும் கௌரி நல்ல நேரம் பற்றிய முழு விவரங்கள்.',
    summaryEn: 'Comprehensive guide to calculating daily auspicious and inauspicious time windows: Rahu Kalam, Yamagandam, Kuligai, and Gowri Horai.',
    readTime: '6 min read',
    sections: [
      {
        headingTa: '1. இராகு காலம் மற்றும் எமகண்டத்தின் ஆன்மிக தத்துவம்',
        headingEn: '1. Spiritual & Astronomical Logic of Inauspicious Times',
        contentTa:
          'பகலின் 12 மணி நேரத்தை (காலை 6:00 மணி முதல் மாலை 6:00 மணி வரை) 8 சம பகுதிகளாக (ஒவ்வொன்றும் 1.5 மணி நேரம் / ஒன்றரை மணி நேரம்) பிரிக்கப்பட்டுள்ளது. இதில் இராகுவின் ஆதிக்கத்திற்கு உட்பட்ட ஒன்றரை மணி நேரம் "இராகு காலம்" என்றும், எமனின் புத்திரனான எமகண்டனின் ஆதிக்கத்திற்கு உட்பட்ட நேரம் "எமகண்டம்" என்றும் அழைக்கப்படுகிறது. இந்த நேரங்களில் தொடங்கும் நற்காரியங்கள் கிரகப் பாதிப்பால் இழுபறியாகவோ அல்லது தோல்வியிலோ முடியலாம் என்பதால் இவற்றைத் தவிர்ப்பது மரபாகும்.',
        contentEn:
          'The 12 hours of daylight (traditionally standardized from 6:00 AM to 6:00 PM) are partitioned into eight equal segments of 90 minutes each. Segments governed by shadow planet Rahu (Rahu Kalam) and Ketu’s sub-deity Yamagandam are regarded as volatile periods best suited for routine duties or meditation rather than commencing major auspicious milestones.',
      },
      {
        headingTa: '2. கிழமை வாரியாக இராகு காலம், எமகண்டம் அட்டவணை',
        headingEn: '2. Standard Weekday Timing Table (6:00 AM Sunrise Base)',
        contentTa:
          '• திங்கள்: இராகு காலம்: 07:30 - 09:00 AM | எமகண்டம்: 10:30 AM - 12:00 PM | குளிகை: 01:30 - 03:00 PM\n' +
          '• செவ்வாய்: இராகு காலம்: 03:00 - 04:30 PM | எமகண்டம்: 09:00 - 10:30 AM | குளிகை: 12:00 - 01:30 PM\n' +
          '• புதன்: இராகு காலம்: 12:00 - 01:30 PM | எமகண்டம்: 07:30 - 09:00 AM | குளிகை: 10:30 AM - 12:00 PM\n' +
          '• வியாழன்: இராகு காலம்: 01:30 - 03:00 PM | எமகண்டம்: 06:00 - 07:30 AM | குளிகை: 09:00 - 10:30 AM\n' +
          '• வெள்ளி: இராகு காலம்: 10:30 AM - 12:00 PM | எமகண்டம்: 03:00 - 04:30 PM | குளிகை: 07:30 - 09:00 AM\n' +
          '• சனி: இராகு காலம்: 09:00 - 10:30 AM | எமகண்டம்: 01:30 - 03:00 PM | குளிகை: 06:00 - 07:30 AM\n' +
          '• ஞாயிறு: இராகு காலம்: 04:30 - 06:00 PM | எமகண்டம்: 12:00 - 01:30 PM | குளிகை: 03:00 - 04:30 PM',
        contentEn:
          '• Monday: Rahu: 07:30 - 09:00 AM | Yama: 10:30 - 12:00 PM | Kuligai: 01:30 - 03:00 PM\n' +
          '• Tuesday: Rahu: 03:00 - 04:30 PM | Yama: 09:00 - 10:30 AM | Kuligai: 12:00 - 01:30 PM\n' +
          '• Wednesday: Rahu: 12:00 - 01:30 PM | Yama: 07:30 - 09:00 AM | Kuligai: 10:30 - 12:00 PM\n' +
          '• Thursday: Rahu: 01:30 - 03:00 PM | Yama: 06:00 - 07:30 AM | Kuligai: 09:00 - 10:30 AM\n' +
          '• Friday: Rahu: 10:30 - 12:00 PM | Yama: 03:00 - 04:30 PM | Kuligai: 07:30 - 09:00 AM\n' +
          '• Saturday: Rahu: 09:00 - 10:30 AM | Yama: 01:30 - 03:00 PM | Kuligai: 06:00 - 07:30 AM\n' +
          '• Sunday: Rahu: 04:30 - 06:00 PM | Yama: 12:00 - 01:30 PM | Kuligai: 03:00 - 04:30 PM',
      },
      {
        headingTa: '3. குளிகை நேரத்தின் தனிச்சிறப்பு',
        headingEn: '3. The Multiplier Power of Kuligai',
        contentTa:
          'குளிகை என்பது சனி பகவானின் புத்திரனான குளிகனால் ஆளப்படும் நேரமாகும். "குளிகையில் செய்யும் செயல் மீண்டும் மீண்டும் தொடர்ந்து நடைபெறும்" என்பது ஜோதிட நியதி. எனவே குளிகை நேரத்தில் சொத்து வாங்குதல், தங்கம் வாங்குதல், சேமிப்பு தொடங்குதல், வீடு கட்டுதல் போன்ற நல்ல செயல்களைச் செய்தால் அவை பெருகும். மாறாக கடன் வாங்குவதோ, கடன் தீர்ப்பதோ, ஈமச் சடங்குகள் செய்வதோ கூடாது.',
        contentEn:
          'Kuligai is governed by Gulikan (the son of Saturn). Ancient lore decrees that whatever action is undertaken during Kuligai repeats indefinitely. Thus, purchasing real estate, gold, investing savings, or giving gifts during Kuligai multiplies wealth. Conversely, taking debts or holding funeral rites in Kuligai is strictly avoided.',
      },
      {
        headingTa: '4. நல்ல நேரம் vs கௌரி நல்ல நேரம்',
        headingEn: '4. Nalla Neram vs Gowri Nalla Neram',
        contentTa:
          'பொதுவான "நல்ல நேரம்" என்பது அன்றைய கிழமையின் அடிப்படையில் கிரக தோஷங்கள் இல்லாத மங்களகரமான ஹோரை நேரங்களைக் குறிக்கும். "கௌரி நல்ல நேரம்" என்பது அம்பாள் பார்வதி தேவியின் (கௌரி) திருவருள் நிறைந்த ஹோரை அட்டவணையாகும். ஒரு நாளின் பொதுவான நல்ல நேரம் தவறினாலும், கௌரி நல்ல நேரத்தில் காரியங்களைத் தொடங்கினால் அம்பாளின் திருவருளால் காரியம் ஜெயமாகும்.',
        contentEn:
          'While standard Nalla Neram reflects the day’s benign planetary Horas, Gowri Nalla Neram specifically follows the traditional Tamil Shakthi almanac honoring Mother Gowri. When general auspicious times cannot be utilized, Gowri auspicious intervals offer reliable windows for starting work, travels, and conversations.',
      },
    ],
    faqs: [
      {
        qTa: 'இராகு காலத்தில் ஏற்கனவே தொடங்கிய வேலையைத் தொடரலாமா?',
        aTa: 'தொடரலாம். புதிய காரியங்களைத் தொடங்குவதற்கே இராகு காலம் விலக்கப்பட வேண்டும்; வழக்கமான தினசரி பணிகளையும் கடமைகளையும் செய்யலாம்.',
        qEn: 'Can we continue ongoing work during Rahu Kalam?',
        aEn: 'Yes. Rahu Kalam applies primarily to the initiation or inaugural signing of new projects, journeys, or rituals; continuing routine daily work is completely fine.',
      },
    ],
  },

  'tamil-months-vs-english-months': {
    slug: 'tamil-months-vs-english-months',
    titleTa: 'தமிழ் மாதங்களும் ஆங்கில மாதங்களும்: காலக் கணிப்பு ஒப்பீடு',
    titleEn: 'Tamil Solar Months vs. Gregorian English Months',
    summaryTa: 'சித்திரை முதல் பங்குனி வரையிலான 12 தமிழ் மாதங்களின் பெயர்கள், அவற்றின் சூரிய சஞ்சார ராசிகள், பருவ காலங்கள் மற்றும் கிரிகோரியன் ஆங்கில மாதங்களுடன் உள்ள நேரடித் தொடர்பு.',
    summaryEn: 'An insightful comparison between the Tamil sidereal solar calendar (Chithirai to Panguni) and the western Gregorian calendar.',
    readTime: '5 min read',
    sections: [
      {
        headingTa: '1. தமிழ் சூரிய மாதங்களின் வானியல் அடிப்படை',
        headingEn: '1. Astronomical Foundation of the Tamil Solar Calendar',
        contentTa:
          'ஆங்கிலக் காலண்டர் (கிரிகோரியன்) பூமியின் சூரியனைச் சுற்றும் கால அளவை மட்டுமே வைத்து மாதங்களை அமைக்கிறது. ஆனால் தமிழ் காலண்டர் என்பது "சூரிய-சாயன முறை" (Sidereal Solar Calendar) ஆகும். சூரியன் பன்னிரண்டு ராசிகளில் எந்த ராசியில் பிரவேசிக்கிறாரோ (சங்கிராந்தி) அதை வைத்து தமிழ் மாதம் பிறக்கிறது. மேஷத்தில் சூரியன் நுழையும் போது சித்திரையும், ரிஷபத்தில் நுழையும் போது வைகாசியும் பிறக்கின்றன.',
        contentEn:
          'While the Western Gregorian calendar divides the solar year into arbitrary civil months, the Tamil calendar is strictly sidereal solar. Each Tamil month begins when the Sun enters a specific zodiac constellation (Sankranti). For instance, ingress into Aries initiates Chithirai, while entry into Taurus begins Vaikasi.',
      },
      {
        headingTa: '2. 12 தமிழ் மாதங்களும் ஆங்கில மாதப் பொருத்தமும்',
        headingEn: '2. The 12 Tamil Months and Gregorian Calendar Equivalents',
        contentTa:
          '1. சித்திரை (மேஷம்): ஏப்ரல் 14 – மே 14 (வசந்த காலம்)\n' +
          '2. வைகாசி (ரிஷபம்): மே 15 – ஜூன் 14 (கோடை காலம் / வைகாசி விசாகம்)\n' +
          '3. ஆனி (மிதுனம்): ஜூன் 15 – ஜூலை 15 (ஆனி திருமஞ்சனம்)\n' +
          '4. ஆடி (கடகம்): ஜூலை 16 – ஆகஸ்ட் 16 (தென்மேற்குப் பருவமழை / ஆடிப்பெருக்கு)\n' +
          '5. ஆவணி (சிம்மம்): ஆகஸ்ட் 17 – செப்டம்பர் 16 (ஆவணி அவிட்டம் / விநாயகர் சதுர்த்தி)\n' +
          '6. புரட்டாசி (கன்னி): செப்டம்பர் 17 – அக்டோபர் 17 (புரட்டாசி சனி / நவராத்திரி)\n' +
          '7. ஐப்பசி (துலாம்): அக்டோபர் 18 – நவம்பர் 16 (ஐப்பசி அன்னாபிஷேகம் / தீபாவளி)\n' +
          '8. கார்த்திகை (விருச்சிகம்): நவம்பர் 17 – டிசம்பர் 15 (திருக்கார்த்திகை தீபம்)\n' +
          '9. மார்கழி (தனுசு): டிசம்பர் 16 – ஜனவரி 13 (தனுர்மாத பூஜை / வைகுண்ட ஏகாதசி)\n' +
          '10. தை (மகரம்): ஜனவரி 14 – பிப்ரவரி 12 (தைப்பொங்கல் / தைப்பூசம்)\n' +
          '11. மாசி (கும்பம்): பிப்ரவரி 13 – மார்ச் 13 (மஹா சிவராத்திரி / மாசி மகம்)\n' +
          '12. பங்குனி (மீனம்): மார்ச் 14 – ஏப்ரல் 13 (பங்குனி உத்திரம் / காரடையான் நோன்பு)',
        contentEn:
          '1. Chithirai (Aries): Mid-April to Mid-May\n' +
          '2. Vaikasi (Taurus): Mid-May to Mid-June\n' +
          '3. Aani (Gemini): Mid-June to Mid-July\n' +
          '4. Aadi (Cancer): Mid-July to Mid-August\n' +
          '5. Avani (Leo): Mid-August to Mid-September\n' +
          '6. Purattasi (Virgo): Mid-September to Mid-October\n' +
          '7. Aippasi (Libra): Mid-October to Mid-November\n' +
          '8. Karthigai (Scorpio): Mid-November to Mid-December\n' +
          '9. Margazhi (Sagittarius): Mid-December to Mid-January\n' +
          '10. Thai (Capricorn): Mid-January to Mid-February\n' +
          '11. Masi (Aquarius): Mid-February to Mid-March\n' +
          '12. Panguni (Pisces): Mid-March to Mid-April',
      },
      {
        headingTa: '3. 60 தமிழ் வருட சுழற்சி (அறுபது தமிழ் ஆண்டுகள்)',
        headingEn: '3. The 60-Year Jovian Cycle (Arupathu Tamil Varushangal)',
        contentTa:
          'வியாழன் மற்றும் சனியின் வானியல் சுழற்சியை அடிப்படையாகக் கொண்டு தமிழ் வருடங்கள் 60 ஆண்டுகளின் சுழற்சியாக அழைக்கப்படுகின்றன (பிரபவ முதல் அட்சய வரை). 2026-ஆம் ஆண்டு சித்திரை 1-ல் "பராபவ" ஆண்டும், 2027-ஆம் ஆண்டு சித்திரை 1-ல் "பிலவ" ஆண்டும் பிறக்கின்றன.',
        contentEn:
          'Based on the combined orbital cycles of Jupiter (12 years) and Saturn (30 years), the Tamil calendar completes a major epoch every 60 years. In 2026, the Tamil year is Parabhava, and in 2027 it transitions to Plavanga.',
      },
    ],
    faqs: [
      {
        qTa: 'ஆங்கில மாதம் 1-ஆம் தேதியும் தமிழ் மாதம் 1-ஆம் தேதியும் மாறுபடுவது ஏன்?',
        aTa: 'ஆங்கில மாதங்கள் மனிதர்களால் அமைக்கப்பட்ட காலண்டர் அட்டவணை; தமிழ் மாதம் என்பது சூரியன் ஒரு குறிப்பிட்ட ராசிக்குள் பிரவேசிக்கும் துல்லியமான வானியல் சங்கிராந்தி நிகழ்வாகும்.',
        qEn: 'Why do Tamil months not start on the 1st of Gregorian months?',
        aEn: 'Gregorian months follow an arbitrary civil convention, whereas Tamil months strictly follow the celestial ingress (Sankranti) of the Sun into tropical and sidereal zodiacal boundaries.',
      },
    ],
  },

  'amavasai-pournami-ekadashi-pradosham': {
    slug: 'amavasai-pournami-ekadashi-pradosham',
    titleTa: 'அமாவாசை, பௌர்ணமி, ஏகாதசி, சஷ்டி, பிரதோஷம்: வழிபாட்டு வழிகாட்டி',
    titleEn: 'Fasting Days: Amavasai, Pournami, Ekadashi, Sashti, Pradosham Explained',
    summaryTa: 'தமிழ் சனாதன மரபின் முக்கிய விரத தினங்களான அமாவாசை பித்ரு தர்ப்பணம், பௌர்ணமி கிரிவலம், ஏகாதசி விஷ்ணு விரதம், சஷ்டி முருகன் வழிபாடு மற்றும் பிரதோஷ சிவ வழிபாட்டின் முறைகள்.',
    summaryEn: 'An exhaustive manual detailing the observance rules, health benefits, and spiritual sanctity of Tamil fasting and vratam traditions.',
    readTime: '8 min read',
    sections: [
      {
        headingTa: '1. அமாவாசை: முன்னோர்கள் ஆசியும் பித்ரு தர்ப்பணமும்',
        headingEn: '1. Amavasai (New Moon): Ancestral Gratitude & Tharpana',
        contentTa:
          'அமாவாசை என்பது சூரியனும் சந்திரனும் ஒரே நேர்கோட்டில் இணையும் நாளாகும். மறைந்த தாய், தந்தை மற்றும் முன்னோர்களுக்கு (பித்ருக்கள்) எள்ளும் தண்ணீரும் இறைத்து "தர்ப்பணம்" செய்து வழிபடுவது மனிதனின் தலையாய கடமையாகும். குறிப்பாக தை அமாவாசை, ஆடி அமாவாசை, மற்றும் மஹாளய அமாவாசை ஆகிய மூன்று அமாவாசைகள் மிக மிக விசேஷமானவை.',
        contentEn:
          'Amavasai marks the celestial conjunction of the Sun and Moon. In Tamil tradition, it is dedicated to ancestral debt clearance (Pithru Tharpana) using sacred black sesame seeds and pure water. The three most sacred are Thai Amavasai, Aadi Amavasai, and Mahalaya Amavasai.',
      },
      {
        headingTa: '2. பௌர்ணமி: அம்பாள் அருள் & கிரிவல விரதம்',
        headingEn: '2. Pournami (Full Moon): Divine Mother & Girivalam',
        contentTa:
          'சந்திரன் முழு பிரகாசத்துடன் பிரகாசிக்கும் பௌர்ணமி அம்பாள் வழிபாட்டிற்கும், சத்தியநாராயண பூஜைக்கும், திருவண்ணாமலை அண்ணாமலையார் கிரிவலத்திற்கும் மிக உன்னதமானது. சித்ரா பௌர்ணமி, வைகாசி விசாகம், ஆவணி அவிட்டம், கார்த்திகை தீபம் மற்றும் தைப்பூசம் ஆகியவை பௌர்ணமியிலேயே சிறப்பிக்கப்படுகின்றன.',
        contentEn:
          'The radiant Full Moon enhances meditation and devotional energies. In Tamil Nadu, millions undertake the barefoot 14-kilometer circumambulation of the holy hill of Arunachala (Girivalam) in Tiruvannamalai on Pournami nights to receive divine tranquility.',
      },
      {
        headingTa: '3. ஏகாதசி: பெருமாள் விரதமும் உடல் நலனும்',
        headingEn: '3. Ekadashi: Lord Vishnu Fasting and Detoxification',
        contentTa:
          'திதிகளில் தலைசிறந்தது ஏகாதசி (11-ஆம் திதி). மகாவிஷ்ணுவின் பேரருளைப் பெற ஏகாதசியன்று அரிசி உணவு உண்ணாமல் முழு விரதம் இருந்து, மறுநாள் துவாதசியன்று நெல்லிக்காய், அகத்திக் கீரை சேர்த்துப் பாரணை செய்வது உடல் நச்சுக்களை நீக்கி ஆன்ம பலம் தரும். மார்கழி மாதத்தில் வரும் "வைகுண்ட ஏகாதசி" சொர்க்கவாசல் திறப்பு திருநாளாகக் கொண்டாடப்படுகிறது.',
        contentEn:
          'Occurring on the 11th lunar day, Ekadashi is sacred to Lord Vishnu. Devotees observe strict abstinence from grains to cleanse the digestive system. Breaking the fast on Dwadashi with Agathi keerai (hummingbird tree leaves) and gooseberry restores bodily vitality. Vaikunta Ekadashi in Margazhi is the grandest pinnacle.',
      },
      {
        headingTa: '4. பிரதோஷம்: சிவபெருமானின் மாலை நேர ஆராதனை',
        headingEn: '4. Pradosham: The Dusk Twilight of Lord Shiva',
        contentTa:
          'வளர்பிறை மற்றும் தேய்பிறை திரயோதசி திதிகளில் மாலை 4:30 மணி முதல் 6:00 மணி வரையிலான அந்திம வேளையே "பிரதோஷம்" எனப்படுகிறது. பாற்கடலில் ஆலகால விஷத்தை அருந்திய சிவபெருமான் நந்தியின் கொம்புகளுக்கிடையே ஆனந்த தாண்டவம் ஆடும் புண்ணிய நேரம் இது. நந்தீஸ்வரருக்கும் சிவபெருமானுக்கும் வில்வ இலை, கறந்த பசும்பால் அபிஷேகம் செய்து வணங்குவது சகல தோஷங்களையும் போக்கும்.',
        contentEn:
          'Pradosham falls on the 13th lunar phase (Trayodashi) between 4:30 PM and 6:00 PM at dusk. Commemorating Lord Shiva consuming the cosmic poison Halahala to save creation, devotees perform Abhishekam to Lord Shiva and holy bull Nandikeswara with bilva leaves and fresh milk to dissolve karmic burdens.',
      },
    ],
    faqs: [
      {
        qTa: 'சனிப் பிரதோஷம் என்றால் என்ன?',
        aTa: 'சனிக்கிழமையன்று வரும் பிரதோஷம் "மகா சனிப் பிரதோஷம்" என்று போற்றப்படுகிறது. இது மற்ற அனைத்து பிரதோஷங்களை விடவும் பல மடங்கு கூடுதல் பலன்களைத் தரும்.',
        qEn: 'Why is Sani Pradosham held in exceptional esteem?',
        aEn: 'When Pradosham falls on a Saturday (governed by Saturn), it is celebrated as Maha Sani Pradosham, believed to alleviate acute Saturn transits (Ezharai Sani / Ashtama Sani).',
      },
    ],
  },
};

