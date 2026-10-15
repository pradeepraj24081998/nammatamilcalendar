import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Calendar, Heart } from 'lucide-react';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#F5EEE4] dark:bg-[#161214] border-t border-[#E9E1D8] dark:border-[#382F35] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#70263B] flex items-center justify-center text-white shadow-xs">
                <Calendar className="w-5 h-5 text-[#FFF9F0]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#70263B] dark:text-[#DFBA73]">
                {dict.siteName}
              </span>
            </div>
            <p className="text-sm text-[#6B6268] dark:text-[#A89FA4] max-w-md leading-relaxed">
              {dict.siteTagline}. {locale === 'ta'
                ? 'தமிழ் மக்களின் பாரம்பரிய நாட்காட்டி, பஞ்சாங்கம், நல்ல நேரம், மற்றும் விரத தினங்களை எளிமையாக அறிந்துகொள்ள உதவும் இணையதளம்.'
                : 'A clean, modern and authentic daily Tamil calendar, Panchangam, auspicious timings, and festival guide for Tamils worldwide.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#70263B] dark:text-[#DFBA73]">
              {dict.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-[#6B6268] dark:text-[#A89FA4]">
              <li>
                <Link href={`/${locale}`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.dailyCalendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar/month/2026/10`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.monthlyCalendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar/year/2026`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.yearlyCalendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/festivals`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.festivals}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/muhurtham-dates`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.muhurthamDates}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#70263B] dark:text-[#DFBA73]">
              {locale === 'ta' ? 'தகவல்' : 'Information'}
            </h3>
            <ul className="space-y-2 text-sm text-[#6B6268] dark:text-[#A89FA4]">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/feedback`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.feedback}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-[#70263B] dark:hover:text-[#DFBA73] transition-colors">
                  {dict.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E9E1D8] dark:border-[#382F35] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6268] dark:text-[#A89FA4] space-y-3 sm:space-y-0">
          <p>© {currentYear} nammatamilcalendar.in. {dict.copyright}</p>
          <p className="flex items-center space-x-1">
            <span>Built with precision for the Tamil community</span>
            <Heart className="w-3.5 h-3.5 text-[#C94F36] fill-[#C94F36]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
