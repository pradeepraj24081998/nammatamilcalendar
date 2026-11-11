import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Calendar, Heart, ShieldAlert, Sparkles, BookOpen, Wrench } from 'lucide-react';
import { getISTCurrentYearAndMonth } from '@/lib/dateUtils';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const currentYear = new Date().getFullYear();
  const { year: istYear, month: istMonth } = getISTCurrentYearAndMonth();
  const activeYear = istYear >= 2026 && istYear <= 2027 ? istYear : 2026;
  const isTa = locale === 'ta';

  return (
    <footer className="mt-16 bg-[#F5EEE4] border-t-2 border-[#E9E1D8] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#8B1515] flex items-center justify-center text-white shadow-xs">
                <Calendar className="w-5 h-5 text-[#FFD700]" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#8B1515]">
                {dict.siteName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed">
              {isTa
                ? 'தமிழ் மக்களின் பாரம்பரிய வாக்கிய பஞ்சாங்கம், நல்ல நேரம், கௌரி நல்ல நேரம், முகூர்த்த நாட்கள் மற்றும் விரத தினங்களை எளிமையாக அறிந்துகொள்ள உதவும் பிரத்யேக தளம்.'
                : 'An authentic daily Tamil calendar, Panchangam, auspicious timings, and festival guide engineered with precision for Tamils worldwide.'}
            </p>
          </div>

          {/* Quick Calendar Links */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#8B1515]">
              {dict.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C5256]">
              <li>
                <Link href={`/${locale}`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.dailyCalendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar/month/${activeYear}/${istMonth}`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.monthlyCalendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/festivals?year=${activeYear}`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.festivals}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/muhurtham-dates?year=${activeYear}`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.muhurthamDates}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar/year/${activeYear}`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.yearlyCalendar}
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Tools */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#8B1515]">
              {isTa ? 'வழிகாட்டி & கருவிகள்' : 'Guides & Tools'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C5256]">
              <li>
                <Link href={`/${locale}/learn`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors flex items-center space-x-1">
                  <span>{isTa ? 'பஞ்சாங்கம் வழிகாட்டி கட்டுரைகள்' : 'Panchangam Guides'}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/date-converter`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {isTa ? 'ஆங்கிலம் ↔ தமிழ் தேதி மாற்றி' : 'English ↔ Tamil Date Converter'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/nalla-neram-finder`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {isTa ? 'நல்ல நேரம் / ராகு காலம் தேடி' : 'Nalla Neram Finder Tool'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/festivals/pongal`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {isTa ? 'பொங்கல் பண்டிகை வரலாறு' : 'Pongal Festival Guide'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/festivals/deepavali`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {isTa ? 'தீபாவளி பண்டிகை வரலாறு' : 'Deepavali Festival Guide'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Policies */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#8B1515]">
              {isTa ? 'கொள்கைகள் & உதவி' : 'Policies & Trust'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C5256]">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-[#8B1515] hover:underline font-semibold transition-colors">
                  {dict.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/disclaimer`} className="hover:text-[#8B1515] hover:underline font-bold text-[#8B1515] transition-colors">
                  {dict.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E9E1D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C5256] gap-3">
          <p>© {currentYear} nammatamilcalendar.in. {dict.copyright}</p>
          <p className="flex items-center space-x-1">
            <span>{isTa ? 'தமிழ் பாரம்பரியத்தை போற்றும் அன்புடன் உருவாக்கப்பட்டது' : 'Crafted with precision for the Tamil community'}</span>
            <Heart className="w-3.5 h-3.5 text-[#C93B2B] fill-[#C93B2B]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
