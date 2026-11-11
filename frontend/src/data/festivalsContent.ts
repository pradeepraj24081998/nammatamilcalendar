export interface FestivalDetail {
  slug: string;
  nameTa: string;
  nameEn: string;
  subtitleTa: string;
  subtitleEn: string;
  tamilMonthSeasonTa: string;
  tamilMonthSeasonEn: string;
  dates: {
    year2026: { gregorian: string; tamil: string; day: string };
    year2027: { gregorian: string; tamil: string; day: string };
  };
  significanceTa: string;
  significanceEn: string;
  celebrationTamilNaduTa: string;
  celebrationTamilNaduEn: string;
  ritualsTa: string[];
  ritualsEn: string[];
  traditionalFoodsTa: string[];
  traditionalFoodsEn: string[];
  dosTa: string[];
  dosEn: string[];
  dontsTa: string[];
  dontsEn: string[];
  faqs: {
    questionTa: string;
    answerTa: string;
    questionEn: string;
    answerEn: string;
  }[];
}

export const FESTIVALS_DATA: Record<string, FestivalDetail> = {
  pongal: {
    slug: 'pongal',
    nameTa: 'தைப்பொங்கல் (Pongal Festival)',
    nameEn: 'Thai Pongal (Harvest Festival of Tamil Nadu)',
    subtitleTa: 'உழவர் திருநாள், இயற்கை வழிபாடு மற்றும் தமிழர் பண்பாட்டுப் பெருவிழா',
    subtitleEn: 'Thanksgiving to Nature, Surya Bhagavan, and the Sacred Harvest Tradition',
    tamilMonthSeasonTa: 'தை மாதம் 1-ம் நாள் (மார்கழி முடிந்து தை பிறக்கும் சுப தினம்)',
    tamilMonthSeasonEn: 'Thai Month Day 1 (Solar Transit into Capricorn / Uttarayan)',
    dates: {
      year2026: { gregorian: '15 ஜனவரி 2026 (வியாழன்)', tamil: 'தை 1, பராபவ ஆண்டு', day: 'தைப்பொங்கல்' },
      year2027: { gregorian: '15 ஜனவரி 2027 (வெள்ளி)', tamil: 'தை 1, பிலவ ஆண்டு', day: 'தைப்பொங்கல்' },
    },
    significanceTa:
      'தைப்பொங்கல் என்பது தமிழர்களின் ஆகச்சிறந்த உழவர் திருநாளும் இயற்கை வழிபாட்டு விழாவும் ஆகும். மார்கழி மாதம் முடிந்து சூரிய பகவான் தனுசு ராசியில் இருந்து மகர ராசிக்கு பிரவேசிக்கும் "மகர சங்கராந்தி" காலத்தை தை 1-ஆம் நாளாகக் கொண்டாடுகிறோம். உழவுக்கு ஆதாரமான நிலம், நீர், காற்று, அக்னி, ஆகாயம் ஆகிய பஞ்சபூதங்களுக்கும், வாழ்வாதாரமான சூரியனுக்கும், கால்நடைகளுக்கும் நன்றி தெரிவிக்கும் மிக உன்னதமான பண்பாட்டு நாளாக இது திகழ்கிறது. "தை பிறந்தால் வழி பிறக்கும்" என்பது தமிழர்களின் அசைக்க முடியாத நம்பிக்கையாகும்.',
    significanceEn:
      'Thai Pongal is the crowning harvest festival and nature thanksgiving observance of the Tamil civilization. Falling on the first day of the Tamil month Thai, it marks the Sun’s transit into Capricorn (Makara Sankranti) and the commencement of Uttarayan (the northward journey of the sun). Dedicated to Surya Bhagavan and the cosmic elements that sustain agriculture, Pongal embodies the timeless Tamil proverb "Thai Piranthal Vazhi Pirakkum" (With the dawn of Thai, new pathways and prosperity open).',
    celebrationTamilNaduTa:
      'தமிழ்நாட்டில் பொங்கல் பண்டிகை நான்கு நாட்கள் பெருவிழாவாகக் கொண்டாடப்படுகிறது: 1) போகிப் பண்டிகை: பழைய கழிதலும் புதிய புகுதலும் என்ற அடிப்படையில் வீடுகளைத் தூய்மை செய்து காப்பு கட்டுதல். 2) தைப்பொங்கல்: வாசலில் வண்ணக் கோலமிட்டு, புது மண்பானையில் மஞ்சள், இஞ்சி கொத்து கட்டி, புத்தரிசி, புதுவெல்லம், பசும்பால் சேர்த்து சூரியனை நோக்கி "பொங்கலோ பொங்கல்" என்று குலவையிட்டுப் பொங்குதல். 3) மாட்டுப் பொங்கல்: உழவுக்கும் வாழ்விற்கும் உறுதுணையாக விளங்கும் பசு மற்றும் காளைகளைக் குளிப்பாட்டி, கொம்புகளுக்கு வர்ணம் பூசி, மாலை அணிவித்து வணங்குதல்; அலங்காநல்லூர், பாலமேடு பகுதிகளில் வீர விளையாட்டான ஜல்லிக்கட்டு நடைபெறுதல். 4) காணும் பொங்கல்: உற்றார் உறவினர்களைச் சந்தித்து ஆசி பெறுதல் மற்றும் இயற்கை சூழலில் மகிழ்தல்.',
    celebrationTamilNaduEn:
      'In Tamil Nadu, Pongal is joyfully observed over four distinct days: 1) Bhogi: Cleaning the household, discarding negativity, and tying the neem-avaram protective "Kaapu". 2) Thai Pongal: Boiling freshly harvested rice and jaggery in a traditional earthen pot decorated with fresh ginger and turmeric plants; as the milk boils over, families joyfully chant "Pongalo Pongal" in thanksgiving to Surya. 3) Mattu Pongal: Honoring cattle and bulls with painted horns, flower garlands, and special sweet rice treats, accompanied by traditional Jallikattu in Alanganallur and Palamedu. 4) Kaanum Pongal: Visiting elders, exchanging blessings, and family outdoor gatherings.',
    ritualsTa: [
      'சூரிய உதயத்திற்கு முன் எழுந்து நீராடி, வாசலில் பச்சரிசி மாவினால் மங்களகரமான கோலமிடுதல்.',
      'புது மண்பானை அல்லது பித்தளைப் பாத்திரத்தில் விபூதி, சந்தனம், குங்குமம் பூசி, கழுத்தில் பசுமையான மஞ்சள் கொத்து மற்றும் இஞ்சிக் கொத்து கட்டுதல்.',
      'பானையில் பசும்பால் ஊற்றி, அடுப்பில் ஏற்றிப் பால் பொங்கி வரும் வேளையில் "பொங்கலோ பொங்கல்!" என்று மங்கள ஒலி எழுப்புதல்.',
      'பொங்கிய பாலில் புத்தரிசி, பாசிப்பருப்பு, நசுக்கிய வெல்லம், ஏலக்காய், நெய்யில் வறுத்த முந்திரி மற்றும் உலர் திராட்சை சேர்த்துக் கிளறுதல்.',
      'வாழை இலையில் சர்க்கரைப் பொங்கல், வெண்பொங்கல், கரும்புத் துண்டுகள், வாழைக்காய், வெற்றிலை பாக்கு வைத்து கிழக்கு முகமாகச் சூரிய பகவானுக்கு நைவேத்தியம் படைத்தல்.',
    ],
    ritualsEn: [
      'Rise before sunrise, take an auspicious bath, and draw intricate kolams using natural rice flour at the doorstep.',
      'Decorate an earthen or brass pot with sacred sandal, kumkum, and tie fresh turmeric and ginger rhizomes around its neck.',
      'Pour pure milk into the pot; as it boils and overflows, chant "Pongalo Pongal!" inviting abundance into the home.',
      'Add newly harvested raw rice, moong dal, crushed jaggery, cardamom, and ghee-roasted cashews and raisins.',
      'Serve freshly cooked Sakkarai Pongal and Ven Pongal on fresh banana leaves facing East with sugarcanes and coconuts offered to Surya Bhagavan.',
    ],
    traditionalFoodsTa: [
      'சுவையான நைவேத்திய சர்க்கரைப் பொங்கல் (புது வெல்லம், பசுநெய், ஏலக்காய், முந்திரி சேர்த்து)',
      'பாரம்பரிய சீரக வெண்பொங்கல் & தேங்காய் சட்னி, கதம்ப சாம்பார்',
      'ஏழு கறி கூட்டு (அவரைக்காய், பரங்கிக்காய், சேப்பங்கிழங்கு, பூசணிக்காய் உள்ளிட்ட நாட்டுக்காய்கறி கூட்டு)',
      'இனிப்பு கரும்பு துண்டுகள் மற்றும் மஞ்சள் கிழங்கு',
    ],
    traditionalFoodsEn: [
      'Sakkarai Pongal (Rich sweet rice pudding cooked with organic jaggery, pure cow ghee, cardamom, and nuts)',
      'Ven Pongal (Tempered savory rice and moong dal infused with black peppercorns, cumin, and ginger)',
      'Ezhu Kari Kootu (Traditional harvest vegetable stew cooked with seven native root vegetables)',
      'Fresh tender sugarcane chunks and sweet harvest banana',
    ],
    dosTa: [
      'பொங்கல் பானையை கிழக்கு முகமாக வைத்து சூரிய பகவானின் பார்வை படுமாறு அமைப்பது நன்று.',
      'இயற்கை விவசாய விளைபொருட்களான புத்தரிசி, புதுவெல்லம், பசுமையான மஞ்சள் கொத்தை உபயோகியுங்கள்.',
      'சுற்றத்தார், ஏழை எளியோர் மற்றும் வீட்டுப் பணியாளர்களுக்குப் புத்தாடைகளும் உணவும் வழங்கி மகிழுங்கள்.',
    ],
    dosEn: [
      'Position the Pongal cooking hearth towards the East under direct natural sunlight.',
      'Use natural, earth-friendly clay pots and locally grown harvest ingredients.',
      'Share sweet pongal and festive gifts generously with domestic helpers, farmers, and neighbors.',
    ],
    dontsTa: [
      'பிளாஸ்டிக் பொருட்கள் மற்றும் நச்சுப் புகையை உண்டாக்கும் ரசாயனப் பொருட்களை போகியில் எரிக்கக் கூடாது.',
      'பண்டிகை தினத்தன்று வீட்டில் எதிர்மறை எண்ணங்களையோ, கோபத்தையோ, சண்டைகளையோ வெளிப்படுத்தலாகாது.',
    ],
    dontsEn: [
      'Do not burn tires, plastic, or toxic materials during Bhogi bonfire.',
      'Avoid harboring anger, family disputes, or negative words on this auspicious thanksgiving day.',
    ],
    faqs: [
      {
        questionTa: 'தைப்பொங்கல் வைக்க உகந்த சுப நேரம் எது?',
        answerTa: 'தை 1-ஆம் நாள் காலை சூரிய உதயம் முடிந்த நSafe Nalla Neram அல்லது கௌரி நல்ல நேரத்தில் பொங்கல் வைப்பது சிறந்தது. ராகு காலம் மற்றும் எமகண்ட நேரங்களைத் தவிர்த்து காலையில் வைப்பது மங்களகரமானது.',
        questionEn: 'What is the auspicious time for boiling Pongal?',
        answerEn: 'It is traditional to boil Pongal during the morning Nalla Neram or auspicious Gowri Horai shortly after sunrise, avoiding inauspicious Rahu Kalam and Yamagandam.',
      },
      {
        questionTa: 'பொங்கல் பொங்கும் திசைக்கு ஏதேனும் பலன் உண்டா?',
        answerTa: 'பாரம்பரிய நம்பிக்கையின்படி, பொங்கல் பானையில் பால் கிழக்கு அல்லது வடக்கு திசையில் பொங்கி வழிவது குடும்பத்திற்கு சகல ஐஸ்வர்யங்களும், ஆரோக்கியமும் தரும் நற்சகுனமாகப் போற்றப்படுகிறது.',
        questionEn: 'Does the direction in which milk overflows have significance?',
        answerEn: 'According to Tamil folk tradition, milk overflowing towards the East or North is considered a highly auspicious omen, symbolizing harvest abundance and family prosperity.',
      },
    ],
  },

  'tamil-new-year': {
    slug: 'tamil-new-year',
    nameTa: 'தமிழ்ப் புத்தாண்டு (Chithirai New Year)',
    nameEn: 'Tamil New Year (Puthandu / Chithirai Vishu)',
    subtitleTa: 'சித்திரை முதல் நாள், அறுசுவை உணவுகள், மற்றும் புதிய மங்களகரமான தொடக்கம்',
    subtitleEn: 'The First Day of Chithirai, Aru-Suvai Feast, and Panchanga Sravanam',
    tamilMonthSeasonTa: 'சித்திரை மாதம் 1-ம் நாள் (மேஷ ராசியில் சூரியன் பிரவேசிக்கும் நாள்)',
    tamilMonthSeasonEn: 'Chithirai Month Day 1 (Solar Ingress into Aries / Mesha Sankranti)',
    dates: {
      year2026: { gregorian: '14 ஏப்ரல் 2026 (செவ்வாய்)', tamil: 'சித்திரை 1, பராபவ ஆண்டு', day: 'தமிழ்ப் புத்தாண்டு' },
      year2027: { gregorian: '14 ஏப்ரல் 2027 (புதன்)', tamil: 'சித்திரை 1, பிலவ ஆண்டு', day: 'தமிழ்ப் புத்தாண்டு' },
    },
    significanceTa:
      'தமிழ்ப் புத்தாண்டு என்பது தமிழ் மாதக் காலண்டரின் முதல் மாதமான சித்திரையின் முதல் நாளாகும். சூரியன் பன்னிரண்டு ராசிகளில் முதலாவது ராசியான மேஷ ராசியில் உச்சமடைந்து பிரவேசிக்கும் நாள் இதுவாகும். அறுபது தமிழ் வருடங்களின் சுழற்சியில் ஒவ்வொரு ஆண்டும் ஒரு மங்களகரமான பெயரைப் பெறுகிறது. வாழ்வின் இன்ப, துன்பங்களை சமமாக ஏற்கும் பக்குவத்தை உணர்த்தும் "அறுசுவை பச்சடி" (வேப்பம்பூ கசப்பு, மாங்காய் புளிப்பு, வெல்லம் இனிப்பு, மிளகாய் காரம், உப்பு, துவர்ப்பு) படைக்கப்படுவது இந்நாளின் ஒப்பற்ற தத்துவமாகும்.',
    significanceEn:
      'Tamil New Year (Puthandu) celebrates the dawn of the first Tamil month Chithirai. It coincides with the Sun’s entry into the first zodiac sign, Aries (Mesha Rasi). Tamils view this day as a spiritual reset, marking the reading of the new year’s almanac (Panchanga Sravanam) and preparing the symbolic "Manga Pachadi" combining six distinct tastes (sweet, sour, bitter, pungent, salty, and astringent) to reflect that life gracefully accommodates all flavors of experience.',
    celebrationTamilNaduTa:
      'சித்திரை முதல் நாள் அதிகாலையில் குடும்பத்தினர் "கன்னி காணுதல்" (மங்களகரமான பொருட்கள் நிறைந்த தட்டைப் பார்த்தல்) மேற்கொள்கின்றனர். கண்ணாடி, தங்கம், வெள்ளி நாணயங்கள், நவதானியங்கள், மா, பலா, வாழை ஆகிய முக்கனிகள் மற்றும் கொன்றைப் பூக்களைப் பார்த்து விழிப்பது வழக்கம். புத்தாடை அணிந்து, பெற்றோரிடம் ஆசி பெற்று, கோயில்களுக்குச் சென்று சிறப்பு அர்ச்சனைகள் செய்கின்றனர். மாலை வேளையில் குடும்பத்தினர் கூடி புதிய ஆண்டின் பஞ்சாங்கப் பலன்களைக் கேட்கின்றனர்.',
    celebrationTamilNaduEn:
      'The morning begins with "Kanni Kaanuthal"—gazing upon an auspicious tray containing a mirror, gold coins, fresh flowers, betel leaves, and the three sacred fruits (Mango, Jackfruit, Banana). Families wear traditional attire, seek the blessings of elders, visit temples, and assemble in the evening to hear the annual astrological forecast from the new Panchangam.',
    ritualsTa: [
      'புத்தாண்டுக்கு முந்தைய இரவு பூஜை அறையில் முக்கனிகள், தானியங்கள், கண்ணாடி மற்றும் நாணயங்களுடன் மங்களத் தட்டு தயார் செய்தல்.',
      'புத்தாண்டு அதிகாலையில் மங்களப் பொருட்களை முதன்முதலில் தரிசித்து ("கன்னி கண்டு") நன்னாள் தொடங்குதல்.',
      'மருந்து நீர் அல்லது மஞ்சள், துளசி கலந்த புனித நீரில் நீராடிப் புத்தாடை அணிதல்.',
      'பூஜை அறையில் விளக்கேற்றி, அறுசுவை வேப்பம்பூ பச்சடி நைவேத்தியம் படைத்து இறைவனை வணங்குதல்.',
      'குலதெய்வம் மற்றும் அருகில் உள்ள சிவாலயங்கள், பெருமாள் கோயில்களில் வழிபாடுகள் நடத்துதல்.',
    ],
    ritualsEn: [
      'Arrange an auspicious sight tray on New Year’s eve with mangoes, bananas, jackfruit, golden coins, and mirror.',
      'View the auspicious Kanni early in the morning upon opening eyes to invite prosperous vibrations.',
      'Take a holy bath infused with herbal essences (maruthu neer) and wear clean traditional festive clothes.',
      'Prepare the sacred Neem Flower Manga Pachadi and offer it to the household deities.',
      'Visit local temples and seek blessings from community elders for a blessed year ahead.',
    ],
    traditionalFoodsTa: [
      'அறுசுவை வேப்பம்பூ மாங்காய் பச்சடி (இனிப்பு, கசப்பு, புளிப்பு கலந்த வாழ்வியல் தத்துவ உணவு)',
      'பருப்பு வடை & சுவையான பாயாசம் (பால் பாயாசம் அல்லது பருப்பு பாயாசம்)',
      'கதம்ப சாம்பார், தக்காளி ரசம், வாழைக்காய் வறுவல் மற்றும் தயிர் பச்சடி',
    ],
    traditionalFoodsEn: [
      'Neem Flower & Raw Mango Pachadi (The philosophical six-taste harmony dish)',
      'Crispy Medu Vada & traditional sweet Paruppu or Vermicelli Payasam',
      'Elaborate festive lunch with drumstick sambar, rasam, plantain roast, and fresh curd',
    ],
    dosTa: [
      'வருடப் பிறப்பன்று நேர்மறை சிந்தனைகளுடனும், தூய உள்ளத்துடனும் பிறருக்கு நல்வாழ்த்துகளைக் கூறுங்கள்.',
      'பெற்றோர்கள், பெரியோர்களின் பாதங்களில் விழுந்து ஆசீர்வாதம் பெறுங்கள்.',
      'புதிய ஆண்டின் பஞ்சாங்கத்தை வாங்கி வீட்டில் வைத்து வழிபடுவது நன்று.',
    ],
    dosEn: [
      'Greet friends and family with "Puthandu Vazhthukal" with pure heart and optimism.',
      'Seek the blessings of elderly parents and spiritual mentors.',
      'Keep the newly consecrated Tamil Panchangam in your prayer altar.',
    ],
    dontsTa: [
      'புத்தாண்டு நாளில் பிறரை இழிவாகப் பேசுவதையோ, வட்டி அல்லது கடன் விவகாரங்களில் வாக்குவாதம் செய்வதையோ தவிர்க்கவும்.',
      'சோம்பல், கோபம் போன்ற தீய குணங்களை அன்றைய தினம் அறவே தவிர்க்க வேண்டும்.',
    ],
    dontsEn: [
      'Avoid arguments, borrowing or lending money on the very first day of the year.',
      'Refrain from pessimistic talk or harboring ill will against anyone.',
    ],
    faqs: [
      {
        questionTa: 'வேப்பம்பூ பச்சடியின் முக்கியத்துவம் என்ன?',
        answerTa: 'வாழ்க்கையில் மகிழ்ச்சி மட்டுமே இருக்க முடியாது; கசப்பும் (வேப்பம்பூ), புளிப்பும் (மாங்காய்), இனிப்பும் (வெல்லம்) கலந்ததுதான் மனித வாழ்க்கை என்பதை சமநோக்குடன் ஏற்கும் உயரிய தத்துவத்தை இது நினைவூட்டுகிறது.',
        questionEn: 'What is the philosophy behind Neem Flower Pachadi?',
        answerEn: 'It symbolizes the acceptance of life in its entirety—joy (sweet jaggery), adversity (bitter neem), and challenges (tangy mango)—with serene equanimity.',
      },
    ],
  },

  deepavali: {
    slug: 'deepavali',
    nameTa: 'தீபாவளி பண்டிகை (Deepavali Festival of Lights)',
    nameEn: 'Deepavali (Diwali — Festival of Lights)',
    subtitleTa: 'கங்கை நீராடல், தீப ஒளி திருநாள், மற்றும் இருள் நீங்கி ஒளி பிறக்கும் நன்னாள்',
    subtitleEn: 'The Auspicious Ganga Snanam, Sweet Exchange, and Triumph of Light over Ignorance',
    tamilMonthSeasonTa: 'ஐப்பசி மாதம் தேய்பிறை சதுர்த்தசி / அமாவாசை திதி',
    tamilMonthSeasonEn: 'Aippasi Month Krishna Paksha Chaturdasi / Amavasya',
    dates: {
      year2026: { gregorian: '8 நவம்பர் 2026 (ஞாயிறு)', tamil: 'ஐப்பசி 22, பராபவ ஆண்டு', day: 'தீபாவளி பண்டிகை' },
      year2027: { gregorian: '28 அக்டோபர் 2027 (வியாழன்)', tamil: 'ஐப்பசி 11, பிலவ ஆண்டு', day: 'தீபாவளி பண்டிகை' },
    },
    significanceTa:
      'தீபாவளி என்பது இருளை அகற்றி ஒளியை ஏற்றி வைக்கும் ஆன்மிக பெருவிழா. ஆணவம், தீய எண்ணங்களை உருவகப்படுத்தும் நரகாசுரனை பகவான் ஸ்ரீகிருஷ்ணர் சத்யபாமாவின் துணையுடன் வதம் செய்த நாளாக ஐப்பசி தேய்பிறை சதுர்த்தசி அனுசரிக்கப்படுகிறது. தமிழ்நாட்டில் தீபாவளி அதிகாலையிலேயே கொண்டாடப்படுவது தனிச்சிறப்பு. "கங்கா ஸ்நானம் ஆச்சா?" என்று அன்போடு விசாரிப்பதும், நல்லெண்ணெய் தேய்த்துக் குளித்து உடலையும் உள்ளத்தையும் புத்துணர்ச்சி பெறச் செய்வதும் தமிழர்களின் பண்பாடாகும்.',
    significanceEn:
      'Deepavali, the Festival of Lights, commemorates the victory of divine righteousness over dark ignorance, exemplified by Lord Krishna and Satyabhama vanquishing Narakasura. In Tamil Nadu, Deepavali is uniquely celebrated in the pre-dawn hours with sacred herbal oil bath (Ganga Snanam), seeking divine blessings before bursting eco-friendly crackers and sharing traditional sweets.',
    celebrationTamilNaduTa:
      'தீபாவளிக்கு முந்தைய நாளே வீட்டை சுத்தம் செய்து, புத்தாடைகளுக்கு சந்தனம், குங்குமம் வைத்து இறைவனுக்கு அர்ப்பணிப்பார்கள். அதிகாலை பிரம்ம முகூர்த்தத்தில் நல்லெண்ணெயில் மிளகு, ஓமம், சீரகம் இட்டுக் காய்ச்சி, குடும்பத்தினர் அனைவரும் தலைக்குத் தேய்த்து வெந்நீரில் "கங்கா ஸ்நானம்" செய்வார்கள். குளித்தவுடன் செரிமானத்திற்கு உகந்த பாரம்பரிய "தீபாவளி லேகியம்" சாப்பிட்டு, புத்தாடை அணிந்து, பட்டாசுகள் வெடித்து, இனிப்புகளை அக்கம்பக்கத்தினருக்குப் பகிர்வார்கள்.',
    celebrationTamilNaduEn:
      'Preparations culminate on the eve when new clothes are sanctified with kumkum at the prayer altar. Before sunrise, elders warm gingelly (sesame) oil with peppercorns, cumin, and omam, applying it to family members before a hot water bath believed to possess the purifying power of Mother Ganga. After the bath, families consume the digestive "Deepavali Legiyam", don festive attire, light sparklers, and distribute home-made treats.',
    ritualsTa: [
      'அதிகாலை 4:00 முதல் 5:30 மணிக்குள் எழுந்து சுபமுகூர்த்த நல்லெண்ணெய் தேய்த்து வெந்நீரில் கங்கா ஸ்நானம் செய்தல்.',
      'சுக்கு, மிளகு, திப்பிலி, தேன், நெய் கலந்து தயாரிக்கப்பட்ட பாரம்பரிய தீபாவளி மருந்து (லேகியம்) உண்ணுதல்.',
      'சாமி படத்தின் முன் புத்தாடைகளை வைத்து வணங்கி, பெரியவர்களிடம் ஆசி பெற்று ஆடை உடுத்துதல்.',
      'விளக்கேற்றி நைவேத்திய பலகாரங்களை இறைவனுக்குப் படைத்து தீபாராதனை காட்டுதல்.',
      'மாலையில் வீடு முழுவதும் அகல் விளக்குகள் ஏற்றி வைத்து இருள் நீக்கும் வழிபாட்டை நிறைவு செய்தல்.',
    ],
    ritualsEn: [
      'Perform Ganga Snanam between 4:00 AM and 5:30 AM using warm sesame oil infused with traditional herbs.',
      'Consume the digestive herbal confection (Deepavali Legiyam / Marunthu) on an empty stomach.',
      'Place new festive attire before the family altar, seek elder blessings, and dress in celebratory clothes.',
      'Offer home-made sweets and savories to the deities with lighted camphor and deepams.',
      'Illuminate the perimeter of the home with natural earthen oil lamps in the evening.',
    ],
    traditionalFoodsTa: [
      'செரிமானத்தை சீராக்கும் பாரம்பரிய தீபாவளி மருந்து (லேகியம்)',
      'சுவையான அதிரசம், மைசூர் பாக், லட்டு, மற்றும் பாதுஷா',
      'காரசாரமான ரிப்பன் பக்கோடா, முறுக்கு, காராசேவ், மற்றும் ஓமப்பொடி',
    ],
    traditionalFoodsEn: [
      'Deepavali Legiyam (Ayurvedic digestive jam made of dry ginger, pepper, jaggery, and honey)',
      'Traditional Tamil sweets: Adhirasam, Mysore Pak, Boondi Laddu, and Badusha',
      'Crunchy savories: Kai Murukku, Ribbon Pakoda, Kara Sev, and Omapodi',
    ],
    dosTa: [
      'அதிகாலை கங்கா ஸ்நானத்தை சூரிய உதயத்திற்கு முன்பாகவே செய்து முடிப்பது புண்ணியமாகும்.',
      'சுற்றுச்சூழலுக்குப் பாதிப்பில்லாத பாதுகாப்பான தீபங்களையும் ஒளி பட்டாசுகளையும் பயன்படுத்துங்கள்.',
      'உதவி தேவைப்படும் எளிய மக்களுக்குப் புத்தாடைகளையும் இனிப்புகளையும் தந்து உதவுங்கள்.',
    ],
    dosEn: [
      'Complete the auspicious oil bath before sunrise to partake in the blessing of holy Ganga.',
      'Prioritize eco-friendly, soundless lights and sparklers to protect elders and domestic animals.',
      'Share food and clothing with disadvantaged families in your neighborhood.',
    ],
    dontsTa: [
      'தீபாவளி தினத்தன்று மாமிச உணவுகளை உண்பதோ, மது அருந்துவதோ ஆன்மிக நெறிக்கு முரணானது.',
      'மருத்துவமனைகள் மற்றும் முதியோர் இல்லங்கள் அருகில் அதிக சத்தம் எழுப்பும் வெடிகளை வெடிக்கக் கூடாது.',
    ],
    dontsEn: [
      'Refrain from non-vegetarian food or intoxicants on this sacred purification festival.',
      'Do not light loud crackers near hospitals, schools, or senior care residences.',
    ],
    faqs: [
      {
        questionTa: 'தீபாவளி அன்று எண்ணெய் தேய்த்துக் குளிப்பது ஏன்?',
        answerTa: 'அன்று நல்லெண்ணெயில் மகாலட்சுமியும், வெந்நீரில் கங்காதேவியும் வாசம் செய்வதாகப் புராணம் கூறுகிறது. நரகாசுரனின் பிடியில் இருந்து விடுபட்ட ஆன்மாக்கள் உடற்பிணி நீங்கி புத்துணர்வு பெற இது கடைப்பிடிக்கப்படுகிறது.',
        answerEn: 'Why is sesame oil bath mandatory on Deepavali?',
        answerEn: 'Tradition holds that Goddess Lakshmi resides in sesame oil and Goddess Ganga in hot water on this morning, purifying the body of past afflictions and granting vitality.',
      },
    ],
  },

  'karthigai-deepam': {
    slug: 'karthigai-deepam',
    nameTa: 'திருக்கார்த்திகை தீபம் (Karthigai Deepam)',
    nameEn: 'Karthigai Deepam (Festival of Divine Fire)',
    subtitleTa: 'அண்ணாமலையார் மகா தீபம், அகல் விளக்குகளின் ஒளி வெள்ளம், மற்றும் சிவதரிசனம்',
    subtitleEn: 'The Beacon on Mount Arunachala, Illumination of Clay Lamps, and Worship of Lord Shiva as Cosmic Fire',
    tamilMonthSeasonTa: 'கார்த்திகை மாதம் பௌர்ணமி திதியும் கிருத்திகை நட்சத்திரமும் கூடும் நன்னாள்',
    tamilMonthSeasonEn: 'Karthigai Month Full Moon aligned with Krittika Nakshatra',
    dates: {
      year2026: { gregorian: '24 நவம்பர் 2026 (செவ்வாய்)', tamil: 'கார்த்திகை 8, பராபவ ஆண்டு', day: 'திருக்கார்த்திகை தீபம்' },
      year2027: { gregorian: '12 டிசம்பர் 2027 (ஞாயிறு)', tamil: 'கார்த்திகை 26, பிலவ ஆண்டு', day: 'திருக்கார்த்திகை தீபம்' },
    },
    significanceTa:
      'திருக்கார்த்திகை தீபம் என்பது தமிழர்களின் மிகத் தொன்மையான விளக்குத் திருவிழா ஆகும். சங்க இலக்கியங்களான அகநானூறு மற்றும் நற்றிணையிலேயே கார்த்திகை விளக்கு வழிபாடு விரிவாகப் பேசப்பட்டுள்ளது. பிரம்மா மற்றும் விஷ்ணுவுக்கு அடியும் முடியும் காண முடியாத அக்னி பிழம்பாக (ஜோதிப் பிழம்பாக) சிவபெருமான் திருவண்ணாமலையில் காட்சியளித்த திருநாளை இது குறிக்கிறது. மேலும், ஆறு கார்த்திகைப் பெண்களால் வளர்க்கப்பட்ட முருகப்பெருமானை வணங்கும் சிறப்பும் இந்நாளுக்கு உண்டு.',
    significanceEn:
      'Karthigai Deepam is one of the oldest recorded festivals of Tamil antiquity, celebrated extensively in Sangam literature. It marks the day Lord Shiva manifested as a boundless pillar of cosmic fire (Agni Lingam) before Brahma and Vishnu at Arunachala (Tiruvannamalai). It also honors Lord Murugan, who was nurtured by the six Krittika maidens.',
    celebrationTamilNaduTa:
      'திருவண்ணாமலை அண்ணாமலையார் திருக்கோயில் சிகரத்தில் 2668 அடி உயரத்தில் மாலை 6:00 மணிக்கு மகா தீபம் ஏற்றப்படும் போது லட்சக்கணக்கான பக்தர்கள் "அண்ணாமலைக்கு அரோகரா!" என்று பக்தி முழக்கமிடுவார்கள். தமிழ்நாட்டின் அனைத்து வீடுகளிலும், வாசல்களிலும், மாடிகளிலும் வரிசையாக நூற்றுக்கணக்கான களிமண் அகல் விளக்குகளில் நல்லெண்ணெய் அல்லது பசுநெய் ஊற்றித் திரி போட்டு ஏற்றி வைப்பார்கள். இருள் முற்றிலுமாக விலகி ஊரே ஜோதிமயமாகக் காட்சியளிக்கும்.',
    celebrationTamilNaduEn:
      'At 6:00 PM, the colossal Maha Deepam is lit on the holy 2,668-foot peak of Mount Arunachala in Tiruvannamalai as millions chant "Annamalaikku Arohara!". In homes throughout Tamil Nadu, hundreds of earthen oil lamps (agal vilakku) filled with sesame oil or ghee are illuminated across thresholds, windows, and courtyards, creating a breathtaking sea of golden flames.',
    ritualsTa: [
      'காலையிலேயே வீட்டைத் தூய்மை செய்து மாக்கோலமிட்டு, அகல் விளக்குகளைத் தண்ணீரில் ஊற வைத்து உலர வைத்தல்.',
      'விளக்குகளுக்கு சந்தனம், குங்குமம் இட்டு, பஞ்சுத்திரி போட்டு நல்லெண்ணெய் அல்லது நெய் நிரப்புதல்.',
      'மாலை 6:00 மணிக்கு திருவண்ணாமலை தீப தரிசனம் நடைபெறும் வேளையில் பூஜை அறையில் முதன்மை தீபம் ஏற்றுதல்.',
      'பூஜை அறையிலிருந்து தீப சுடரை எடுத்துச் சென்று வீட்டின் வாசல், படிகள், பால்கனி, சமையலறை என அனைத்துப் பகுதிகளிலும் ஏற்றுதல்.',
      'அப்பம், பொரி உருண்டை, பாயாசம் நைவேத்தியம் படைத்து சிவ-முருகப் பெருமானை மனமுருகப் பிரார்த்தித்தல்.',
    ],
    ritualsEn: [
      'Clean earthen agal lamps by soaking in water, drying thoroughly, and consecrating them with sandal and kumkum dots.',
      'Insert hand-spun cotton wicks and fill the lamps with pure sesame oil or cow ghee.',
      'At dusk (around 6:00 PM), light the auspicious master lamp in the home altar.',
      'Carry the flame outward to light rows of lamps along entryways, staircases, balconies, and outer parapets.',
      'Offer Nel Pori Urundai (puffed paddy jaggery balls), sweet appam, and payasam to Lord Shiva and Murugan.',
    ],
    traditionalFoodsTa: [
      'கார்த்திகை நெல் பொரி உருண்டை & அவல் பொரி உருண்டை (வெல்லப் பாகு சேர்த்து செய்தது)',
      'நெய்யில் வறுத்த இனிப்பு கோதுமை அப்பம்',
      'பருப்பு பாயாசம் மற்றும் உளுந்து வடை',
    ],
    traditionalFoodsEn: [
      'Nel Pori Urundai (Crispy puffed rice clusters bound with aromatic spiced jaggery syrup)',
      'Sweet Nei Appam (Tender roasted rice and jaggery dumplings fried in ghee)',
      'Rich Chana Dal Payasam garnished with roasted coconut flakes',
    ],
    dosTa: [
      'மண் அகல் விளக்குகளையே முன்னுரிமை கொடுத்துப் பயன்படுத்துங்கள்; அது பூமித்தாயை வணங்குவதாகும்.',
      'விளக்குகள் காற்றில் அணையாமல் இருக்க அமைதியான இடத்தில் நிலைநிறுத்துங்கள்.',
    ],
    dosEn: [
      'Prefer clay earthen lamps as they honor the Prithvi (Earth) element and support traditional artisans.',
      'Ensure lamps are positioned safely away from curtains and flammable items.',
    ],
    dontsTa: [
      'விளக்குகளை வாயினால் ஊதி அணைக்கக் கூடாது; மலர் அல்லது சிறு கிண்ணம் கொண்டு சாந்தப்படுத்த வேண்டும்.',
    ],
    dontsEn: [
      'Never blow out sacred oil lamps with your breath; extinguish gently using a flower petal or brass bell.',
    ],
    faqs: [
      {
        questionTa: 'கார்த்திகை தீபத்திற்கு எத்தனை விளக்குகள் ஏற்ற வேண்டும்?',
        answerTa: 'வீட்டின் வசதிக்கேற்ப 27 நட்சத்திரங்களைக் குறிக்கும் 27 விளக்குகளோ, அல்லது குறைந்தபட்சம் 9 அல்லது 18 விளக்குகளையோ ஏற்றுவது வழக்கம்.',
        questionEn: 'How many lamps should be illuminated on Karthigai Deepam?',
        answerEn: 'It is customary to light at least 27 lamps corresponding to the 27 Nakshatras, or multiples such as 9, 18, or 108 depending on household space.',
      },
    ],
  },

  'vinayagar-chaturthi': {
    slug: 'vinayagar-chaturthi',
    nameTa: 'விநாயகர் சதுர்த்தி (Vinayagar Chathurthi)',
    nameEn: 'Vinayagar Chathurthi (Ganesh Chaturthi)',
    subtitleTa: 'முழுமுதற் கடவுள் வழிபாடு, கொழுக்கட்டை நைவேத்தியம், மற்றும் தடைகள் நீக்கும் நன்னாள்',
    subtitleEn: 'Worship of the Remover of Obstacles, Kozhukattai Feast, and Auspicious Beginnings',
    tamilMonthSeasonTa: 'ஆவணி மாதம் வளர்பிறை சதுர்த்தி திதி',
    tamilMonthSeasonEn: 'Avani Month Shukla Paksha Chaturthi',
    dates: {
      year2026: { gregorian: '14 செப்டம்பர் 2026 (திங்கள்)', tamil: 'ஆவணி 28, பராபவ ஆண்டு', day: 'விநாயகர் சதுர்த்தி' },
      year2027: { gregorian: '4 செப்டம்பர் 2027 (சனி)', tamil: 'ஆவணி 18, பிலவ ஆண்டு', day: 'விநாயகர் சதுர்த்தி' },
    },
    significanceTa:
      'விநாயகர் சதுர்த்தி என்பது முழுமுதற் கடவுளான விநாயகப் பெருமானின் அவதார தினமாகும். எந்தவொரு நற்காரியத்தைத் தொடங்குவதற்கு முன்பும் விக்னங்களை (தடைகளை) நீக்கும் விநாயகரை வணங்குவது இந்து மரபின் அடிப்படை. களிமண்ணால் ஆன இயற்கை விநாயகர் திருமேனியை இல்லத்தில் வைத்து, எருக்கம் பூ மாலை, அருகம்புல் சார்த்தி, அவருக்குப் பிரியமான கொழுக்கட்டை நைவேத்தியம் படைத்து வழிபடுவது குடும்பத்தில் அமைதியையும், கல்வியில் ஞானத்தையும், தொழிலில் வெற்றியையும் நல்கும்.',
    significanceEn:
      'Vinayagar Chathurthi celebrates the manifestation of Lord Ganesha, the remover of obstacles (Vighnaharta) and patron of wisdom. In Tamil tradition, unbaked clay idols of Ganesha are welcomed into homes and worshipped with sacred Arugampul (Bermuda grass), crown-flower garlands, and steam-cooked Modakams (Kozhukattai), invoking success in education, business, and sacred beginnings.',
    celebrationTamilNaduTa:
      'தமிழ்நாட்டில் வண்ணக் குடைகளுடன் கூடிய களிமண் பிள்ளையாரை வாங்கி வந்து பலகையில் வைப்பார்கள். அருகம்புல், எருக்கம்பூ மாலை, விளாம்பழம், கரும்பு, நாவல்பழம் சமர்ப்பித்து, மோதகம் (கொழுக்கட்டை) செய்து படையலிடுவார்கள். மூன்று அல்லது ஐந்து நாட்கள் பக்தி வழிபாட்டிற்குப் பிறகு, மேள தாளங்களுடன் ஊர்வலமாக எடுத்துச் சென்று ஆறு, குளம் அல்லது கடலில் "விசர்ஜனம்" (கரைத்தல்) செய்வார்கள்.',
    celebrationTamilNaduEn:
      'Families install handcrafted natural clay idols adorned with colorful paper umbrellas. Offerings include Bermuda grass, fragrant jasmine, wood apple (Vilampazham), tender sugarcane, and a variety of steamed sweet and savory modaks. After devotional prayers over three to five days, the idols are carried in festive processions for immersion (Visarjan) into local water bodies.',
    ritualsTa: [
      'ரசாயன வர்ணங்கள் பூசப்படாத சுத்தமான களிமண் பிள்ளையாரை இல்லத்திற்கு அழைத்து வருதல்.',
      'விநாயகருக்குப் பிரியமான அருகம்புல் மாலை மற்றும் எருக்கம்பூ மாலை அணிவித்தல்.',
      'சுத்தமான நீரில் மஞ்சள் பிள்ளையார் பிடித்து வைத்து முதன்மை சங்கல்பம் செய்தல்.',
      '21 கொழுக்கட்டை, அவல், பொரி, கடலை, வெள்ளரி, ஆப்பிள், வாழைப்பழம் வைத்து நைவேத்தியம் படைத்தல்.',
      'விநாயகர் அகவல், விநாயகர் அஷ்டோத்திரம் படித்துத் தோப்புக்கரணம் போட்டுத் தலையில் குட்டிக் கொண்டு வணங்குதல்.',
    ],
    ritualsEn: [
      'Bring home an eco-friendly unbaked clay idol free from synthetic dyes.',
      'Adorn Ganesha with fresh Arugampul (Bermuda grass) and Erukku (crown-flower) garland.',
      'Consecrate a small turmeric Ganesha first to invoke initial prayers and Sankalpam.',
      'Offer 21 freshly steamed sweet and savory Kozhukattais along with wood apples, puffed rice, and jaggery.',
      'Chant Vinayagar Agaval, perform the traditional Thoppukaranam (ear-holding squats), and gently tap temples with knuckles.',
    ],
    traditionalFoodsTa: [
      'பூரண கொழுக்கட்டை (தேங்காய், வெல்லப் பூரணம் வைத்து ஆவியில் வேக வைத்தது)',
      'உப்பு கொழுக்கட்டை (உளுந்து, காரசாரமான தாளிப்புடன் கூடிய காரக் கொழுக்கட்டை)',
      'அவல் நைவேத்தியம் மற்றும் சுண்டல் (கொண்டைக்கடலை சுண்டல்)',
    ],
    traditionalFoodsEn: [
      'Poornam Kozhukattai (Steamed rice flour dumplings stuffed with sweet fresh coconut and cardamom jaggery)',
      'Uppu Kozhukattai (Savory steamed rice modaks tempered with mustard, urad dal, and curry leaves)',
      'Sundal (Tempered brown or white chickpeas infused with freshly grated coconut)',
    ],
    dosTa: [
      'சுற்றுச்சூழலைப் பாதுகாக்கும் வகையில் எளிய களிமண் சிலைகளையே பயன்படுத்துங்கள்.',
      'வழிபாட்டின் போது பக்தியுடன் தோப்புக் கரணம் போட்டு ஆசீர்வாதம் பெறுங்கள்.',
    ],
    dosEn: [
      'Use strictly natural clay idols that dissolve harmoniously in water bodies without harming aquatic life.',
      'Involve children in chanting Vinayagar Agaval to foster cultural wisdom and focus.',
    ],
    dontsTa: [
      'பிளாஸ்டிக் ஆபரணங்களையோ, பிளாஸ்டர் ஆஃப் பாரிஸ் (PoP) சிலைகளையோ வழிபாட்டிற்குப் பயன்படுத்த வேண்டாம்.',
    ],
    dontsEn: [
      'Avoid Plaster of Paris (PoP) idols or chemical fluorescent paints that contaminate lakes and rivers.',
    ],
    faqs: [
      {
        questionTa: 'விநாயகருக்கு அருகம்புல் ஏன் முக்கியம்?',
        answerTa: 'அனலாசுரன் என்ற அரக்கனை விழுங்கிய போது விநாயகரின் வயிற்றில் ஏற்பட்ட வெப்பத்தைத் தணிக்க தேவர்கள் அருகம்புல் கொண்டு அர்ச்சித்தனர். அதுவே விநாயகருக்குரிய முதன்மை பிரசாதமானது.',
        questionEn: 'Why is Bermuda grass (Arugampul) dear to Lord Ganesha?',
        answerEn: 'Legend recounts that when Ganesha swallowed the demon Analasura, celestial sages cooled his fiery stomach using cool Bermuda grass, making it his foremost beloved offering.',
      },
    ],
  },

  navaratri: {
    slug: 'navaratri',
    nameTa: 'நவராத்திரி & சரஸ்வதி பூஜை (Navaratri & Saraswathi Pooja)',
    nameEn: 'Navaratri, Saraswathi Pooja & Vijayadasami',
    subtitleTa: 'ஒன்பது இரவு சக்தி வழிபாடு, கொலு பொம்மைகள், கலைமகள் அருள் மற்றும் கல்வித் தொடக்கம்',
    subtitleEn: 'Nine Nights of Devi Worship, Golu Displays, Ayudha Pooja, and Vidyarambham',
    tamilMonthSeasonTa: 'புரட்டாசி மாதம் வளர்பிறை பிரதமை முதல் தசமி வரை',
    tamilMonthSeasonEn: 'Purattasi Month Shukla Paksha Pratipada to Dashami',
    dates: {
      year2026: { gregorian: '11 – 20 அக்டோபர் 2026 (சரஸ்வதி பூஜை: 19 அக், விஜயதசமி: 20 அக்)', tamil: 'புரட்டாசி 24 – ஐப்பசி 3, பராபவ ஆண்டு', day: 'நவராத்திரி விழா' },
      year2027: { gregorian: '30 செப்டம்பர் – 9 அக்டோபர் 2027 (சரஸ்வதி பூஜை: 8 அக், விஜயதசமி: 9 அக்)', tamil: 'புரட்டாசி 13 – புரட்டாசி 22, பிலவ ஆண்டு', day: 'நவராத்திரி விழா' },
    },
    significanceTa:
      'நவராத்திரி என்பது பராசக்தியை ஒன்பது இரவுகள் வழிபடும் மகத்தான விரதமாகும். முதல் 3 நாட்கள் வீரத்தின் அடையாளமான துர்க்கையையும், அடுத்த 3 நாட்கள் செல்வத்தின் அதிபதியான லட்சுமியையும், கடைசி 3 நாட்கள் ஞானத்தின் வடிவமான சரஸ்வதியையும் வணங்குகிறோம். 9-ஆம் நாள் ஆயுத பூஜை / சரஸ்வதி பூஜையாகவும், 10-ஆம் நாள் வெற்றித் திருநாளான "விஜயதசமி"யாகவும் கொண்டாடப்படுகிறது. கல்வி, இசை, நடனம், புதிய தொழில் தொடங்குவதற்கு விஜயதசமி மிக உன்னதமான நாளாகும்.',
    significanceEn:
      'Navaratri spans nine sacred nights dedicated to the Divine Mother: the first three to Goddess Durga (strength), the middle three to Goddess Lakshmi (abundance), and the final three to Goddess Saraswathi (wisdom). The ninth day is celebrated as Ayudha Pooja and Saraswathi Pooja, culminating in Vijayadasami—the triumphant tenth day ideal for Vidyarambham (initiating children into learning) and embarking on auspicious business ventures.',
    celebrationTamilNaduTa:
      'தமிழ்நாட்டு இல்லங்களில் ஒற்றைப்படை படிகளில் (3, 5, 7, 9 படிகள்) மரப்பாச்சி பொம்மைகள், புராணக் காட்சிகள், தெய்வச் சிலைகளை அலங்கரித்து "கொலு" வைப்பது பாரம்பரிய கலை விருந்தாகும். தினமும் மாலையில் பெண்கள், குழந்தைகளை அழைத்து சுண்டல் பிரசாதம், தாம்பூலம் வழங்கி மகிழ்வார்கள். ஆயுத பூஜையன்று வாகனங்கள், தொழிற்சாலை இயந்திரங்கள் மற்றும் கல்வி புத்தகங்களைச் சந்தனம் இட்டு பூஜித்து, மறுநாள் விஜயதசமியன்று "அரிசியில் ஓம்" எழுதி புதிய வித்தைகளைத் தொடங்குவார்கள்.',
    celebrationTamilNaduEn:
      'In Tamil Nadu, homes set up magnificent "Bommala Golu" tiered steps (3, 5, 7, or 9 steps) displaying traditional Marapachi dolls and deities. Each evening, neighbor women and children are welcomed with devotional singing, gift bags (thamboolam), and daily variety of protein-rich Sundal. On Ayudha Pooja, tools and workbooks are sanctified, and on Vijayadasami, young children write their first alphabet letters in raw rice.',
    ritualsTa: [
      'புரட்டாசி அமாவாசை முடிந்ததும் பிரதமை நாளில் புனித கலசம் ஸ்தாபித்து கொலு படிகளை அமைத்தல்.',
      'தினமும் மாலையில் நெய் தீபம் ஏற்றி லலிதா சகஸ்ரநாமம், மஹிஷாசுரமர்த்தினி ஸ்தோத்திரம் பாடுதல்.',
      'ஒவ்வொரு நாளும் ஒரு வகை பயறு சுண்டல் செய்து அம்பாளுக்கு நைவேத்தியம் படைத்தல்.',
      'சரஸ்வதி பூஜையன்று புத்தகங்கள், பேனாக்கள், இசைக்கருவிகளை சுவாமி முன் வைத்து சரஸ்வதி பூஜை செய்தல்.',
      'விஜயதசமி காலையில் புதிய பாடங்கள், இசை வகுப்புகள் அல்லது தொழில் கணக்குகளைத் தொடங்குதல்.',
    ],
    ritualsEn: [
      'Install the sacred Kalasam and set up odd-numbered Golu steps following Mahalaya Amavasya.',
      'Illuminate ghee lamps every dusk and chant Lalitha Sahasranamam and Devi Mahatmyam.',
      'Prepare and offer a distinct variety of seasoned legume Sundal each evening.',
      'Place educational books, musical instruments, and vocational tools before Goddess Saraswathi.',
      'Perform Vidyarambham on Vijayadasami morning by tracing the sacred Om on a tray of raw rice.',
    ],
    traditionalFoodsTa: [
      'நவராத்திரி நவதானிய சுண்டல் (கொண்டைக்கடலை, பாசிப்பயறு, மொச்சை, பட்டாணி, வேர்க்கடலை சுண்டல்)',
      'தித்திக்கும் சர்க்கரைப் பொங்கல், கேசரி, மற்றும் அவல் பாயாசம்',
      'ஆயுத பூஜை பொரி, பொட்டுக் கடலை, நாட்டுச் சர்க்கரை நைவேத்தியம்',
    ],
    traditionalFoodsEn: [
      'Nine types of Navadhanya Sundals (chickpeas, green gram, cowpeas, black-eyed peas, peanuts)',
      'Sweet Sakkarai Pongal, Rava Kesari, and Jaggery Aval Payasam',
      'Traditional Ayudha Pooja puffed rice mix with roasted gram, coconut bits, and raw cane jaggery',
    ],
    dosTa: [
      'கொலுவிற்கு வருகை தரும் பெண்களுக்கு மஞ்சள், குங்குமம், பூ மற்றும் தாம்பூலம் வழங்கி கௌரவியுங்கள்.',
      'விஜயதசமி நன்னாளில் புதிய கலைகள் அல்லது கல்வி முயற்சிகளைத் தொடங்க உகந்தது.',
    ],
    dosEn: [
      'Honor visiting women and young girls with auspicious thamboolam (betel leaves, turmeric, kumkum).',
      'Commence musical training, classical dance, or new educational courses on Vijayadasami.',
    ],
    dontsTa: [
      'சரஸ்வதி பூஜை நாளில் படிப்பு புத்தகங்களையோ, கைவினை கருவிகளையோ பயன்படுத்தக் கூடாது; மறுநாள் விஜயதசமி பூஜை முடிந்த பின்னரே எடுக்க வேண்டும்.',
    ],
    dontsEn: [
      'Do not study from books or disturb tools on Ayudha Pooja day until Vijayadasami prayers are completed.',
    ],
    faqs: [
      {
        questionTa: 'கொலு படிகள் எப்போதும் ஒற்றைப்படை எண்ணிக்கையில் இருப்பது ஏன்?',
        answerTa: 'இந்து தத்துவத்தில் ஒற்றைப்படை எண்கள் (3, 5, 7, 9) வளர்ச்சியை, ஜீவாத்மாவின் தொடர் பரிணாமத்தைக் குறிக்கின்றன. 9 படிகள் மனிதனின் 9 நிலைகளைக் கடந்து முக்தியடைவதைக் குறிப்பதாகும்.',
        answerEn: 'Why are Golu steps always odd-numbered?',
        answerEn: 'In Vedic philosophy, odd numbers (3, 5, 7, 9) represent perpetual growth and evolution of consciousness, with nine steps symbolizing transcendence over mortal limitations.',
      },
    ],
  },

  'aadi-perukku': {
    slug: 'aadi-perukku',
    nameTa: 'ஆடிப்பெருக்கு (Aadi 18th Festival)',
    nameEn: 'Aadi Perukku (The River Veneration of Tamil Nadu)',
    subtitleTa: 'காவிரி அன்னைக்கு நன்றி செலுத்தும் விழா, நீர் வளம் மற்றும் குடும்ப மங்கள பெருவிழா',
    subtitleEn: 'Homage to Mother Kaveri, River Goddesses, and Life-Giving Water Abundance',
    tamilMonthSeasonTa: 'ஆடி மாதம் 18-ம் நாள் (ஆடி பதினெட்டாம் பெருக்கு)',
    tamilMonthSeasonEn: 'Aadi Month 18th Day (Mid-Monsoon River Swelling)',
    dates: {
      year2026: { gregorian: '3 ஆகஸ்ட் 2026 (திங்கள்)', tamil: 'ஆடி 18, பராபவ ஆண்டு', day: 'ஆடிப்பெருக்கு' },
      year2027: { gregorian: '3 ஆகஸ்ட் 2027 (செவ்வாய்)', tamil: 'ஆடி 18, பிலவ ஆண்டு', day: 'ஆடிப்பெருக்கு' },
    },
    significanceTa:
      'ஆடிப்பெருக்கு என்பது ஜீவநதிகளான காவிரி, பவானி, வைகை, தாமிரபரணி ஆகிய நதிகளுக்கு நன்றி செலுத்தும் தனித்துவமான தமிழ்ப் பண்பாட்டு விழாவாகும். தென்மேற்குப் பருவமழையினால் காவிரியாற்றில் புது வெள்ளம் பெருக்கெடுத்து ஓடிவரும் காலமே "ஆடிப் பெருக்கு" எனப்படுகிறது. "ஆடிப்பட்டம் தேடி விதை" என்ற பழமொழிக்கு ஏற்ப, வேளாண்மைக்கு வித்திடும் இந்த நன்னாளில் நீர்நிலைகளைத் தாயாக மதித்து வழிபடுவது தமிழர்களின் நீர் மேலாண்மைப் பண்பாட்டின் மணிமகுடமாகும்.',
    significanceEn:
      'Aadi Perukku (Aadi 18) is a unique Tamil festival honoring life-sustaining rivers—primarily Mother Kaveri—as well as Bhavani, Vaigai, and Thamirabarani. Coinciding with the peak monsoon influx, rivers swell with life-giving silt and water, ushering in the farming season celebrated by the adage "Aadi Pattam Thedi Vithai" (Sow seeds in the auspicious season of Aadi).',
    celebrationTamilNaduTa:
      'ஸ்ரீரங்கம் அம்மா மண்டபம், பவானி கூடுதுறை, திருச்சி, தஞ்சாவூர் மற்றும் காவிரி கரையோரப் பகுதிகளில் குடும்பம் குடும்பமாக மக்கள் கூடுகிறார்கள். நதிக்கரையில் படிக்கட்டுகளில் சந்தனம், குங்குமம் பூசி, வாழை இலையில் முளைப்பாரி, மஞ்சள் சரடு, கண்ணாடி வளையல்கள், பழங்கள் வைத்து நதிக்கன்னியை வழிபடுகிறார்கள். புதுமணப் தம்பதிகள் தாலி பிரித்துக் கோர்ப்பதும், பெண்கள் புதிய மஞ்சள் சரடு அணிவதும் இந்நாளின் சிறப்பு மரபாகும்.',
    celebrationTamilNaduEn:
      'Riverbanks such as Srirangam Amma Mandapam, Bhavani Kooduthurai, Tiruchirappalli, and Thanjavur become vibrant hubs of worship. Families set up festive riverside altars on banana leaves with sacred sprouted seeds (Mulaipari), glass bangles, turmeric cords, and fruit offerings. Newlywed brides renew their sacred Mangalsutra cord with prayers for marital longevity.',
    ritualsTa: [
      'அதிகாலையில் நதிக்கரை அல்லது வீட்டின் நீர்நிலைகளில் தூய மனதுடன் நீராடுதல்.',
      'வாழை இலையில் காதோலைக் கருகமணி, மஞ்சள் கயிறு, கண்ணாடி வளையல், பூ வைத்து நதி தேவதைக்குப் படைத்தல்.',
      'மஞ்சள் பிள்ளையார் பிடித்து வைத்து, தீபாராதனை காட்டி மலர் தூவி ஆராதனை செய்தல்.',
      'வழிபட்ட மஞ்சள் சரடைப் பெண்கள் தங்கள் கழுத்தில் மங்களகரமாகக் கட்டிக் கொள்ளுதல்.',
      'கலவை சாதங்களான எலுமிச்சை சாதம், புளியோதரை, தேங்காய் சாதம், சர்க்கரைப் பொங்கலை நதிக்கரையில் குடும்பத்துடன் அமர்ந்து உண்ணுதல்.',
    ],
    ritualsEn: [
      'Take an early morning sacred bath in rivers, canals, or home water sanctified with prayer.',
      'Lay a fresh banana leaf offering with sacred black beads, turmeric threads, and glass bangles.',
      'Consecrate a turmeric Ganesha and perform camphor Aarti facing the flowing river waters.',
      'Tether the sanctified turmeric-dyed thread around the neck invoking marital health and bliss.',
      'Enjoy an outdoor riverside picnic feast featuring traditional variety rices (Kalandha Sadham).',
    ],
    traditionalFoodsTa: [
      'சித்ரான்னங்கள் எனப்படும் பலவகை கலவை சாதங்கள்: புளியோதரை, எலுமிச்சை சாதம், தக்காளி சாதம், தேங்காய் சாதம்',
      'இனிப்பு சர்க்கரைப் பொங்கல் மற்றும் தயிர் சாதம்',
      'அப்பளம், வடை மற்றும் மாங்காய் ஊறுகாய்',
    ],
    traditionalFoodsEn: [
      'Chitrannam (Variety rices: Tangy Puliyodarai, fragrant Lemon Rice, Coconut Rice, and Curd Rice)',
      'Sweet Sakkarai Pongal and Jaggery Payasam',
      'Crispy Appalam, Medu Vada, and spicy home-cured green mango pickle',
    ],
    dosTa: [
      'நீர்நிலைகளைத் தெய்வமாக மதித்துப் பாதுகாப்போம் என்ற உறுதிமொழியை இந்நாளில் எடுங்கள்.',
      'குடும்பத்துடன் நதிக்கரை வழிபாட்டில் கலந்துகொண்டு இயற்கை அன்னையை வணங்குங்கள்.',
    ],
    dosEn: [
      'Treat natural water bodies with divine reverence and resolve to prevent plastic contamination.',
      'Participate in riverside family gatherings fostering community kinship.',
    ],
    dontsTa: [
      'நதிக்கரைகளில் நெகிழி (பிளாஸ்டிக்) குப்பைகளையோ, ரசாயன கழிவுகளையோ வீசி நீரை மாசுபடுத்தக் கூடாது.',
    ],
    dontsEn: [
      'Never dump plastic bags, non-biodegradable items, or waste into the sacred flowing river.',
    ],
    faqs: [
      {
        questionTa: 'ஆடிப்பெருக்கில் தாலி பிரித்துக் கோர்ப்பது ஏன்?',
        answerTa: 'புதுமணப் பெண்கள் தங்கள் திருமணத்தின் போது கட்டிய மஞ்சள் கயிற்றை புதிய மங்களகரமான மஞ்சள் கயிற்றாக மாற்றி, கணவனின் ஆயுளும் இல்லறமும் சிறக்க காவிரி அன்னையின் ஆசியைப் பெறும் புனிதம் இதுவாகும்.',
        answerEn: 'Why do newlywed women renew their Mangalsutra cord on Aadi Perukku?',
        answerEn: 'It is a sacred renewal ritual where women replace the wedding turmeric thread with a fresh blessed cord, praying to Goddess Kaveri for the health and longevity of their husbands.',
      },
    ],
  },

  'thai-poosam': {
    slug: 'thai-poosam',
    nameTa: 'தைப்பூசம் (Thai Poosam Festival)',
    nameEn: 'Thai Poosam (Lord Murugan’s Triumph of Grace)',
    subtitleTa: 'முருகப் பெருமானின் வேல் வழிபாடு, காவடி உற்சவம், மற்றும் பக்தியின் உச்சம்',
    subtitleEn: 'The Sacred Vel Offering, Kavadi Pilgrimage, and the Victory of Wisdom over Malevolence',
    tamilMonthSeasonTa: 'தை மாதம் பௌர்ணமி திதியும் பூச நட்சத்திரமும் கூடும் நன்னாள்',
    tamilMonthSeasonEn: 'Thai Month Full Moon aligned with Pushya Nakshatra',
    dates: {
      year2026: { gregorian: '1 பிப்ரவரி 2026 (ஞாயிறு)', tamil: 'தை 18, பராபவ ஆண்டு', day: 'தைப்பூசம்' },
      year2027: { gregorian: '22 ஜனவரி 2027 (வெள்ளி)', tamil: 'தை 8, பிலவ ஆண்டு', day: 'தைப்பூசம்' },
    },
    significanceTa:
      'தைப்பூசம் என்பது தமிழ்க் கடவுளான முருகப்பெருமானின் மிக உன்னதமான திருவிழா ஆகும். அன்னை பார்வதி தேவி அசுரர்களை அழிக்கத் தன் திருக்கரங்களால் முருகனுக்கு ஞான சக்தியான "ஞானவேல்" வழங்கிய புண்ணிய தினம் தைப்பூசமாகும். பழனி, திருச்செந்தூர், சுவாமிமலை, திருப்பரங்குன்றம், பழமுதிர்சோலை, திருத்தணி ஆகிய ஆறுபடை வீடுகளிலும், மலேசியாவின் பத்துமலை மற்றும் சிங்கப்பூரிலும் கோடிக்கணக்கான தமிழர்கள் காவடி ஏந்தி, அலகு குத்தி விரதம் அனுசரிக்கும் மகா பக்தித் திருநாளாகும்.',
    significanceEn:
      'Thai Poosam honors Lord Murugan receiving the celestial spear—Gnana Vel—from Goddess Parvati to vanquish ignorance and demonic forces. Celebrated with unparalleled fervor across the Six Abodes of Murugan (Arupadai Veedu) in Tamil Nadu, as well as Batu Caves in Malaysia and Singapore, devotees fulfill solemn vows through Kavadi bearing, fasting, and devotional penance.',
    celebrationTamilNaduTa:
      'பக்தர்கள் 48 அல்லது 21 நாட்கள் மாலை அணிந்து, விரதமிருந்து பழனி உள்ளிட்ட முருகன் திருத்தலங்களுக்குக் கால்நடையாக பாதயாத்திரை செல்கிறார்கள். பால்காவடி, பன்னீர்காவடி, மச்சக்காவடி, புஷ்பக்காவடி ஏந்தி "வெற்றிவேல் முருகனுக்கு அரோகரா!" என்று பக்தி முழக்கமிட்டு முருகனை தரிசிப்பார்கள். வள்ளலார் நிறுவிய வடலூர் சத்திய ஞான சபையில் தைப்பூசத்தன்று ஜோதி தரிசனம் நடைபெறுவது உலகப் பிரசித்தி பெற்றது.',
    celebrationTamilNaduEn:
      'Pilgrims observe rigorous 48-day or 21-day austerities, walking barefoot for hundreds of kilometers to the hill temple of Palani. Carrying decorated wooden structures (Kavadis) bearing holy milk and rosewater, devotees chant "Vetrivel Muruganukku Arohara!". In Vadalur, saint Vallalar’s Sathya Gnana Sabai marks Thai Poosam with the grand revelation of the sacred Jyothi (Light of Universal Compassion).',
    ritualsTa: [
      'தைப்பூச விரதமிருந்து அதிகாலையில் நீராடி காவி அல்லது மஞ்சள் ஆடை அணிதல்.',
      'முருகப்பெருமானுக்குப் பால், பஞ்சாமிர்தம், சந்தனம் கொண்டு சிறப்பு அபிஷேகம் செய்தல்.',
      'பாதயாத்திரை செல்லும் பக்தர்களுக்கு அன்னதானம் மற்றும் நீர்மோர் வழங்குதல்.',
      'ஸ்கந்த சஷ்டி கவசம், திருப்புகழ் பாடல்களைப் பக்தியுடன் பாராயணம் செய்தல்.',
      'மாலையில் தீபமேற்றி ஞானவேலை வழிபட்டு விரதத்தை இனிதே நிறைவு செய்தல்.',
    ],
    ritualsEn: [
      'Maintain devotional purity, fasting on fruits and milk while wearing yellow or ochre vestments.',
      'Perform or attend Panchamirtham and milk Abhishekam to Lord Murugan and his holy Vel.',
      'Distribute free meals (Annadhanam) and herbal buttermilk to walking pilgrims.',
      'Chant Skanda Sashti Kavasam and saint Arunagirinathar’s rhythmic Thiruppugazh hymns.',
      'Illuminate ghee lamps at dusk meditating upon the light of supreme wisdom.',
    ],
    traditionalFoodsTa: [
      'பழனி புகழ் பஞ்சாமிர்தம் (வாழைப்பழம், தேன், நெய், நாட்டுச் சர்க்கரை, ஏலக்காய்)',
      'பயறு கஞ்சி மற்றும் திணை மாவு நைவேத்தியம் (தேன் கலந்தது)',
      'அன்னதானப் பருப்பு சாதம் மற்றும் மோர்',
    ],
    traditionalFoodsEn: [
      'Traditional Palani Panchamirtham (Five-nectar preserve made of bananas, honey, ghee, cane sugar, and cardamom)',
      'Thinai Maavu (Sacred foxtail millet flour kneaded with pure forest honey)',
      'Annadhanam tempered lentil rice and cooling spiced buttermilk',
    ],
    dosTa: [
      'பாதயாத்திரை செல்லும் முருக பக்தர்களுக்கு இயன்ற உதவிகளையும் உணவையும் வழங்குங்கள்.',
      'மனத்தூய்மையுடனும் அமைதியுடனும் விரத நெறிமுறைகளைக் கடைப்பிடியுங்கள்.',
    ],
    dosEn: [
      'Serve walking pilgrims selflessly with hydration, food, and blister care.',
      'Focus the mind on self-discipline, compassion, and spiritual elevation.',
    ],
    dontsTa: [
      'தைப்பூச விரத காலத்தில் புலால் உணவு உண்பதோ, கெட்ட வார்த்தைகள் பேசுவதோ கூடாது.',
    ],
    dontsEn: [
      'Strictly avoid non-vegetarian diet, smoking, or harsh language during the observance.',
    ],
    faqs: [
      {
        questionTa: 'தைப்பூசத்தன்று வேல் வழிபாடு ஏன் முதன்மையானது?',
        answerTa: 'வேல் என்பது வெறும் ஆயுதம் அல்ல; அது ஆன்மாவின் அறியாமையை வேரறுக்கும் "ஞானசக்தி" ஆகும். பார்வதி தேவி தன் ஆற்றலை வேலாகத் தந்ததால் தைப்பூசத்தில் வேலுக்கு விசேஷ அபிஷேகம் செய்யப்படுகிறது.',
        answerEn: 'Why is the Vel revered on Thai Poosam?',
        answerEn: 'The Vel represents the sharp, broad, and penetrating intellect of divine wisdom (Gnana Sakthi) gifted by Mother Parvati to eradicate the darkness of ego and illusion.',
      },
    ],
  },
};

