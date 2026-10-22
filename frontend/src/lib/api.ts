import {
  CalendarDay,
  MonthCalendarResponse,
  YearCalendarResponse,
  FestivalsResponse,
  MuhurthamResponse,
} from './types';

// Bundled 2026 & 2027 authoritative Tamil calendar datasets
import data2026Raw from '@/data/calendar/2026.json';
import data2027Raw from '@/data/calendar/2027.json';

const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

// In-memory typed maps for O(1) instantaneous lookups
const data2026: CalendarDay[] = data2026Raw as unknown as CalendarDay[];
const data2027: CalendarDay[] = data2027Raw as unknown as CalendarDay[];

const dayMap2026 = new Map<string, CalendarDay>(data2026.map((d) => [d.date, d]));
const dayMap2027 = new Map<string, CalendarDay>(data2027.map((d) => [d.date, d]));

export { getTodayISTString } from './dateUtils';
import { getTodayISTString } from './dateUtils';

/**
 * Algorithmic fallback generator if an out-of-range date is requested
 */
function createFallbackDay(dateStr: string): CalendarDay {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const weekday = d.getDay() === 0 ? 6 : d.getDay() - 1;
  const dayNum = d.getDate();

  // Basic Rahu/Yama timings standard by weekday
  const inauspiciousMap: Record<number, { rahu_kalam: string; yamagandam: string; kuligai: string }> = {
    0: { rahu_kalam: '07:30 AM - 09:00 AM', yamagandam: '01:30 PM - 03:00 PM', kuligai: '03:00 PM - 04:30 PM' }, // Mon
    1: { rahu_kalam: '03:00 PM - 04:30 PM', yamagandam: '09:00 AM - 10:30 AM', kuligai: '12:00 PM - 01:30 PM' }, // Tue
    2: { rahu_kalam: '12:00 PM - 01:30 PM', yamagandam: '07:30 AM - 09:00 AM', kuligai: '10:30 AM - 12:00 PM' }, // Wed
    3: { rahu_kalam: '01:30 PM - 03:00 PM', yamagandam: '06:00 AM - 07:30 AM', kuligai: '09:00 AM - 10:30 AM' }, // Thu
    4: { rahu_kalam: '10:30 AM - 12:00 PM', yamagandam: '03:00 PM - 04:30 PM', kuligai: '07:30 AM - 09:00 AM' }, // Fri
    5: { rahu_kalam: '09:00 AM - 10:30 AM', yamagandam: '01:30 PM - 03:00 PM', kuligai: '06:00 AM - 07:30 AM' }, // Sat
    6: { rahu_kalam: '04:30 PM - 06:00 PM', yamagandam: '12:00 PM - 01:30 PM', kuligai: '03:00 PM - 04:30 PM' }, // Sun
  };

  return {
    id: 9999,
    date: dateStr,
    weekday,
    tamil_month: 'சித்திரை',
    tamil_date: dayNum,
    tamil_year: year === 2026 ? 'பராபவ' : year === 2027 ? 'பிலவ' : 'சுபகிருது',
    is_muhurtham: false,
    day_auspicious: 'சுப தினம்',
    festival_info: '',
    festival_addon: '',
    status: 'S',
    panchangam: {
      nakshatra: 'அசுவினி',
      nakshatra_time: '',
      tithi: 'பிரதமை',
      tithi_time: '',
      yogam: 'சித்த',
      chandrashtamam: '',
      pirai: 'வளர்பிறை',
    },
    auspicious_timings: {
      nalla_neram_morning: '09:15 - 10:15',
      nalla_neram_evening: '04:45 - 05:45',
      gowri_morning: '10:45 - 11:45',
      gowri_evening: '06:30 - 07:30',
    },
    inauspicious_timings: inauspiciousMap[weekday] || {
      rahu_kalam: '10:30 AM - 12:00 PM',
      yamagandam: '03:00 PM - 04:30 PM',
      kuligai: '07:30 AM - 09:00 AM',
    },
    rasipalan: {
      mesham: 'நலம்',
      rishabam: 'லாபம்',
      mithunam: 'வரவு',
      katakam: 'வெற்றி',
      simmam: 'உயர்வு',
      kanni: 'சாந்தம்',
      thulam: 'பக்தி',
      viruchigam: 'ஆதாயம்',
      dhanusu: 'சுபம்',
      makaram: 'நிறைவு',
      kumbam: 'புகழ்',
      meenam: 'மகிழ்ச்சி',
    },
  };
}

/**
 * Enriches a day record with authentic traditional data inspired by Tamil Daily Calendar
 * (Soolam, Parigaram, Naal Vagai, Sunrise, Sunset, Subakariyam)
 */
export function enrichDayDetails(day: CalendarDay): CalendarDay {
  if (day.additional_details) return day;

  const weekday = day.weekday;
  const soolamMap: Record<number, { soolam: string; parigaram: string }> = {
    0: { soolam: 'கிழக்கு (East)', parigaram: 'தயிர் (Curd)' },
    1: { soolam: 'வடக்கு (North)', parigaram: 'பால் (Milk)' },
    2: { soolam: 'வடக்கு (North)', parigaram: 'பால் (Milk)' },
    3: { soolam: 'தெற்கு (South)', parigaram: 'தைலம் (Oil)' },
    4: { soolam: 'மேற்கு (West)', parigaram: 'வெல்லம் (Jaggery)' },
    5: { soolam: 'கிழக்கு (East)', parigaram: 'தயிர் (Curd)' },
    6: { soolam: 'மேற்கு (West)', parigaram: 'வெல்லம் (Jaggery)' },
  };

  const nakshatraStr = day.panchangam?.nakshatra || '';
  // Extract primary prevailing daytime Nakshatra (take portion before 'பின்பு')
  const primaryNakshatraPart = nakshatraStr.split('பின்பு')[0] || nakshatraStr;

  let naal_vagai = 'சம நோக்கு நாள்';
  const melNokku = ['ரோகிணி', 'திருவாதிரை', 'பூசம்', 'உத்திரம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்', 'உத்திரட்டாதி'];
  const keezhNokku = ['பரணி', 'கார்த்திகை', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'விசாகம்', 'மூலம்', 'பூராடம்', 'பூரட்டாதி'];
  const samaNokku = ['அசுவினி', 'மிருகசீரிஷம்', 'புனர்பூசம்', 'ஹஸ்தம்', 'சித்திரை', 'சுவாதி', 'அனுஷம்', 'கேட்டை', 'ரேவதி'];

  if (keezhNokku.some((n) => primaryNakshatraPart.includes(n))) {
    naal_vagai = 'கீழ் நோக்கு நாள்';
  } else if (melNokku.some((n) => primaryNakshatraPart.includes(n))) {
    naal_vagai = 'மேல் நோக்கு நாள்';
  } else if (samaNokku.some((n) => primaryNakshatraPart.includes(n))) {
    naal_vagai = 'சம நோக்கு நாள்';
  }

  const { soolam, parigaram } = soolamMap[weekday] || { soolam: 'வடக்கு', parigaram: 'பால்' };

  // Authentic monthly sunrise & sunset for Tamil Nadu (IST)
  const month = parseInt(day.date.split('-')[1], 10) || 10;
  const sunTimings: Record<number, { sunrise: string; sunset: string }> = {
    1: { sunrise: '06:33 AM', sunset: '06:05 PM' },  // Jan (தை)
    2: { sunrise: '06:30 AM', sunset: '06:17 PM' },  // Feb (மாசி)
    3: { sunrise: '06:18 AM', sunset: '06:23 PM' },  // Mar (பங்குனி)
    4: { sunrise: '06:01 AM', sunset: '06:25 PM' },  // Apr (சித்திரை)
    5: { sunrise: '05:49 AM', sunset: '06:32 PM' },  // May (வைகாசி)
    6: { sunrise: '05:48 AM', sunset: '06:38 PM' },  // Jun (ஆனி)
    7: { sunrise: '05:54 AM', sunset: '06:40 PM' },  // Jul (ஆடி)
    8: { sunrise: '06:00 AM', sunset: '06:33 PM' },  // Aug (ஆவணி)
    9: { sunrise: '06:02 AM', sunset: '06:16 PM' },  // Sep (புரட்டாசி)
    10: { sunrise: '06:04 AM', sunset: '05:59 PM' }, // Oct (ஐப்பசி)
    11: { sunrise: '06:12 AM', sunset: '05:49 PM' }, // Nov (கார்த்திகை)
    12: { sunrise: '06:25 AM', sunset: '05:53 PM' }, // Dec (மார்கழி)
  };
  const { sunrise, sunset } = sunTimings[month] || { sunrise: '06:04 AM', sunset: '06:00 PM' };

  return {
    ...day,
    additional_details: {
      sunrise,
      sunset,
      soolam,
      parigaram,
      naal_vagai,
    },
  };
}

/**
 * Fetch today's calendar record
 */
export async function fetchTodayCalendar(): Promise<CalendarDay | null> {
  const todayStr = getTodayISTString();
  const day = await fetchDayCalendar(todayStr);
  if (day) return enrichDayDetails(day);

  // If outside 2026-2027, default to 2026-10-20 (or first day of 2026)
  const defaultDay = dayMap2026.get('2026-10-20') || data2026[0] || null;
  return defaultDay ? enrichDayDetails(defaultDay) : null;
}

/**
 * Fetch single day calendar record by YYYY-MM-DD
 */
export async function fetchDayCalendar(dateStr: string): Promise<CalendarDay | null> {
  if (USE_BACKEND) {
    try {
      const res = await fetch(`${API_BASE}/calendar/day/?date=${dateStr}`, { next: { revalidate: 300 } });
      if (res.ok) {
        const d = await res.json();
        return enrichDayDetails(d);
      }
    } catch {
      // Fallback to local data below
    }
  }

  if (dayMap2026.has(dateStr)) {
    return enrichDayDetails(dayMap2026.get(dateStr)!);
  }
  if (dayMap2027.has(dateStr)) {
    return enrichDayDetails(dayMap2027.get(dateStr)!);
  }

  // Fallback for valid dates outside 2026/2027
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return enrichDayDetails(createFallbackDay(dateStr));
  }

  return null;
}

/**
 * Fetch monthly calendar grid for given year and month
 */
export async function fetchMonthCalendar(year: number, month: number): Promise<MonthCalendarResponse | null> {
  if (USE_BACKEND) {
    try {
      const res = await fetch(`${API_BASE}/calendar/month/?year=${year}&month=${month}`, { next: { revalidate: 3600 } });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to local data below
    }
  }

  const prefix = `${year}-${String(month).padStart(2, '0')}-`;
  let days: CalendarDay[] = [];

  if (year === 2026) {
    days = data2026.filter((d) => d.date.startsWith(prefix));
  } else if (year === 2027) {
    days = data2027.filter((d) => d.date.startsWith(prefix));
  } else {
    // Generate fallback month days
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push(createFallbackDay(dateStr));
    }
  }

  return {
    year,
    month,
    count: days.length,
    days,
  };
}

/**
 * Fetch yearly summary for given year (12-month overview)
 */
export async function fetchYearCalendar(year: number): Promise<YearCalendarResponse | null> {
  if (USE_BACKEND) {
    try {
      const res = await fetch(`${API_BASE}/calendar/year/?year=${year}`, { next: { revalidate: 86400 } });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to local data below
    }
  }

  const sourceData = year === 2026 ? data2026 : year === 2027 ? data2027 : null;

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    const prefix = `${year}-${String(monthNum).padStart(2, '0')}-`;
    const monthDays = sourceData ? sourceData.filter((d) => d.date.startsWith(prefix)) : [];
    const daysCount = monthDays.length || new Date(year, monthNum, 0).getDate();
    const muhurthamCount = monthDays.filter((d) => d.is_muhurtham).length;
    const festivalsCount = monthDays.filter((d) => Boolean(d.festival_info || d.festival_addon)).length;

    return {
      month: monthNum,
      days_count: daysCount,
      muhurtham_count: muhurthamCount,
      festivals_count: festivalsCount,
    };
  });

  const totalDays = months.reduce((acc, m) => acc + m.days_count, 0);
  const muhurthamCount = months.reduce((acc, m) => acc + m.muhurtham_count, 0);
  const festivalsCount = months.reduce((acc, m) => acc + m.festivals_count, 0);

  return {
    year,
    total_days: totalDays,
    muhurtham_count: muhurthamCount,
    festivals_count: festivalsCount,
    months,
  };
}

const HOLIDAY_KEYWORDS = [
  'விடுமுறை',
  'புத்தாண்டு',
  'பொங்கல்',
  'குடியரசு',
  'சுதந்திர',
  'காந்தி',
  'தீபாவளி',
  'ரம்ஜான்',
  'பக்ரீத்',
  'மொஹரம்',
  'கிறிஸ்துமஸ்',
  'மே தினம்',
  'மகாவீர்',
  'புத்த பூர்ணிமா',
  'மில்லாடி',
  'ஆயுத பூஜை',
  'விஜயதசமி',
  'நல்ல வெள்ளி',
  'தெலுங்கு வருட',
  'உழவர் திருநாள்',
];

/**
 * Fetch verified festivals and auspicious observances filtered by year, month, query, or category
 */
export async function fetchFestivals(
  year: number = 2026,
  month?: number,
  query?: string,
  category?: string
): Promise<CalendarDay[]> {
  if (USE_BACKEND) {
    try {
      const params = new URLSearchParams();
      if (year) params.append('year', year.toString());
      if (month) params.append('month', month.toString());
      if (query) params.append('q', query);
      if (category) params.append('category', category);

      const res = await fetch(`${API_BASE}/festivals/?${params.toString()}`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data: FestivalsResponse = await res.json();
        return data.festivals || [];
      }
    } catch {
      // Fallback to local data below
    }
  }

  const sourceData = year === 2026 ? data2026 : year === 2027 ? data2027 : [...data2026, ...data2027];

  // Include festivals, addons, and all key auspicious dates (Pournami, Amavasai, Pradosham, Krithigai, etc.)
  let filtered = sourceData.filter((d) => Boolean(d.festival_info || d.festival_addon || d.day_auspicious));

  // Category filter
  if (category && category !== 'all') {
    const cat = category.toLowerCase();
    if (cat === 'pournami') {
      filtered = filtered.filter(
        (d) =>
          (d.day_auspicious && d.day_auspicious.includes('பௌர்ணமி')) ||
          (d.festival_info && d.festival_info.includes('பௌர்ணமி'))
      );
    } else if (cat === 'amavasai') {
      filtered = filtered.filter(
        (d) =>
          (d.day_auspicious && d.day_auspicious.includes('அமாவாசை')) ||
          (d.festival_info && d.festival_info.includes('அமாவாசை'))
      );
    } else if (cat === 'pradosham') {
      filtered = filtered.filter(
        (d) =>
          (d.day_auspicious && d.day_auspicious.includes('பிரதோஷம்')) ||
          (d.festival_info && d.festival_info.includes('பிரதோஷம்'))
      );
    } else if (cat === 'krithigai') {
      filtered = filtered.filter(
        (d) =>
          (d.day_auspicious && (d.day_auspicious.includes('கிருத்திகை') || d.day_auspicious.includes('கார்த்திகை'))) ||
          (d.festival_info && (d.festival_info.includes('கிருத்திகை') || d.festival_info.includes('கார்த்திகை')))
      );
    } else if (cat === 'holidays') {
      filtered = filtered.filter((d) => {
        const combined = `${d.festival_info || ''} ${d.festival_addon || ''}`;
        return HOLIDAY_KEYWORDS.some((kw) => combined.includes(kw));
      });
    } else if (cat === 'viratham') {
      const virathamKeys = ['ஏகாதசி', 'சதுர்த்தி', 'சஷ்டி', 'சிவராத்திரி', 'திருவோணம்'];
      filtered = filtered.filter((d) => {
        const ausp = d.day_auspicious || '';
        return virathamKeys.some((k) => ausp.includes(k));
      });
    }
  }

  if (month) {
    const prefix = `-${String(month).padStart(2, '0')}-`;
    filtered = filtered.filter((d) => d.date.includes(prefix));
  }

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (d) =>
        (d.festival_info && d.festival_info.toLowerCase().includes(q)) ||
        (d.festival_addon && d.festival_addon.toLowerCase().includes(q)) ||
        (d.day_auspicious && d.day_auspicious.toLowerCase().includes(q)) ||
        (d.tamil_month && d.tamil_month.toLowerCase().includes(q))
    );
  }

  return filtered;
}

/**
 * Fetch upcoming festivals relative to today (next 12 festivals)
 */
export async function fetchUpcomingFestivals(): Promise<CalendarDay[]> {
  const todayStr = getTodayISTString();
  const allDays = [...data2026, ...data2027];

  const upcoming = allDays.filter(
    (d) => d.date >= todayStr && Boolean(d.festival_info || d.festival_addon || d.day_auspicious)
  );

  if (upcoming.length > 0) {
    return upcoming.slice(0, 12);
  }

  // If today is past 2027, return festivals from beginning of 2026
  return allDays
    .filter((d) => Boolean(d.festival_info || d.festival_addon || d.day_auspicious))
    .slice(0, 12);
}

/**
 * Fetch verified auspicious Muhurtham dates
 */
export async function fetchMuhurthamDates(year: number = 2026, month?: number): Promise<CalendarDay[]> {
  if (USE_BACKEND) {
    try {
      const params = new URLSearchParams();
      if (year) params.append('year', year.toString());
      if (month) params.append('month', month.toString());

      const res = await fetch(`${API_BASE}/muhurtham-dates/?${params.toString()}`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data: MuhurthamResponse = await res.json();
        return data.muhurtham_dates || [];
      }
    } catch {
      // Fallback to local data below
    }
  }

  const sourceData = year === 2026 ? data2026 : year === 2027 ? data2027 : [...data2026, ...data2027];

  let filtered = sourceData.filter((d) => d.is_muhurtham);

  if (month) {
    const prefix = `-${String(month).padStart(2, '0')}-`;
    filtered = filtered.filter((d) => d.date.includes(prefix));
  }

  return filtered;
}

/**
 * Graceful feedback submission (stores locally, syncs to backend if configured)
 */
export async function submitFeedback(data: {
  name?: string;
  email?: string;
  category: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  if (USE_BACKEND) {
    try {
      const res = await fetch(`${API_BASE}/feedback/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        return { success: true, message: result.message || 'Feedback submitted successfully' };
      }
    } catch {
      // Fallback to local storage below
    }
  }

  // Store in client localStorage safely
  try {
    if (typeof window !== 'undefined') {
      const key = 'namma_calendar_feedbacks';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({
        ...data,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  return {
    success: true,
    message: 'தங்கள் மேலான கருத்து வெற்றிகரமாக பெறப்பட்டது! மிக்க நன்றி.',
  };
}
