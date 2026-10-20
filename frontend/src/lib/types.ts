export type Locale = 'ta' | 'en';

export interface PanchangamData {
  nakshatra: string;
  nakshatra_time: string;
  tithi: string;
  tithi_time: string;
  yogam: string;
  chandrashtamam: string;
  pirai: string;
}

export interface AuspiciousTiming {
  nalla_neram_morning: string;
  nalla_neram_evening: string;
  gowri_morning: string;
  gowri_evening: string;
}

export interface InauspiciousTiming {
  rahu_kalam: string;
  yamagandam: string;
  kuligai: string;
}

export interface RasiPalan {
  mesham: string;
  rishabam: string;
  mithunam: string;
  katakam: string;
  simmam: string;
  kanni: string;
  thulam: string;
  viruchigam: string;
  dhanusu: string;
  makaram: string;
  kumbam: string;
  meenam: string;
}

export interface AdditionalDetails {
  sunrise: string;
  sunset: string;
  soolam: string;
  parigaram: string;
  naal_vagai: string;
}

export interface CalendarDay {
  id: number;
  date: string; // YYYY-MM-DD
  weekday: number; // 0=Monday, 6=Sunday
  tamil_month: string;
  tamil_date: number;
  tamil_year: string;
  is_muhurtham: boolean;
  day_auspicious: string;
  festival_info: string;
  festival_addon: string;
  status: string;
  panchangam?: PanchangamData;
  auspicious_timings?: AuspiciousTiming;
  inauspicious_timings?: InauspiciousTiming;
  rasipalan?: RasiPalan;
  additional_details?: AdditionalDetails;
}

export interface MonthCalendarResponse {
  year: number;
  month: number;
  count: number;
  days: CalendarDay[];
}

export interface MonthSummary {
  month: number;
  days_count: number;
  muhurtham_count: number;
  festivals_count: number;
}

export interface YearCalendarResponse {
  year: number;
  total_days: number;
  muhurtham_count: number;
  festivals_count: number;
  months: MonthSummary[];
}

export interface FestivalsResponse {
  count: number;
  festivals: CalendarDay[];
}

export interface MuhurthamResponse {
  count: number;
  muhurtham_dates: CalendarDay[];
}
