/**
 * Zero-dependency Date Utilities for Indian Standard Time (IST - Asia/Kolkata)
 * Configurable via `APP_TIMEZONE` or `NEXT_PUBLIC_APP_TIMEZONE` environment variable.
 * Safe to import in both Client and Server Components without pulling heavy JSON datasets.
 */

export const APP_TIMEZONE =
  (typeof process !== 'undefined' && (process.env.APP_TIMEZONE || process.env.NEXT_PUBLIC_APP_TIMEZONE)) ||
  'Asia/Kolkata';

export function getTodayISTString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: APP_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    // Fallback: manual UTC + 5:30 offset for IST
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const istMs = utcMs + 5.5 * 3600000;
    const istDate = new Date(istMs);
    const y = istDate.getFullYear();
    const m = String(istDate.getMonth() + 1).padStart(2, '0');
    const d = String(istDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

export function getISTCurrentYearAndMonth(): { year: number; month: number; day: number } {
  const dateStr = getTodayISTString();
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m, day: d };
}

/**
 * Add or subtract days from a YYYY-MM-DD date string safely without UTC timezone skew
 */
export function addDays(dateStr: string, offset: number): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return dateStr;
  }
  const [y, m, d] = parts;
  // Noon prevents daylight saving / midnight boundary quirks
  const dt = new Date(y, m - 1, d + offset, 12, 0, 0);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
