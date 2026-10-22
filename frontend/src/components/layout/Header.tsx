'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, X, Sparkles, Clock, Compass, Heart, PhoneCall } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { LanguageToggle } from '../ui/LanguageToggle';
import { getISTCurrentYearAndMonth } from '@/lib/dateUtils';

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const isTa = locale === 'ta';

  // Dynamic current date reference (defaults to current year/month in IST)
  const istDate = getISTCurrentYearAndMonth();
  const is2027 = pathname.includes('/2027');
  const activeYear = is2027 ? 2027 : istDate.year;
  const currentMonth = istDate.month;

  // Clean navigation links (Feedback tab removed as Contact Us handles all inquiries)
  const navLinks = [
    { href: `/${locale}`, label: isTa ? 'முகப்பு' : 'Home', icon: Calendar },
    { href: `/${locale}/calendar/month/${activeYear}/${currentMonth}`, label: isTa ? 'மாத காலண்டர்' : 'Monthly', icon: Compass },
    { href: `/${locale}/calendar/year/${activeYear}`, label: isTa ? 'வருட காலண்டர்' : 'Yearly', icon: Clock },
    { href: `/${locale}/festivals?year=${activeYear}`, label: isTa ? 'பண்டிகைகள்' : 'Festivals', icon: Sparkles },
    { href: `/${locale}/muhurtham-dates?year=${activeYear}`, label: isTa ? 'முகூர்த்தம்' : 'Muhurtham', icon: Heart },
    { href: `/${locale}/contact`, label: isTa ? 'தொடர்புக்கு' : 'Contact Us', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md w-full bg-[#8B1515]">
      {/* Top Auspicious Gold Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E67E22]" />

      {/* Main Brand Bar */}
      <div className="bg-gradient-to-r from-[#8B1515] via-[#981414] to-[#780F0F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3">

            {/* Logo & Brand Wordmark - Compact on xl, expansive on 2xl to guarantee ZERO overflow */}
            <Link href={`/${locale}`} className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl p-0.5 bg-gradient-to-tr from-[#FFD700] via-[#FFA000] to-[#FF8F00] shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0 bg-white">
                <Image
                  src="/images/calendar_logo.png"
                  alt="Namma Tamil Calendar Logo"
                  width={44}
                  height={44}
                  className="rounded-lg object-contain w-full h-full"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center shrink-0">
                <span className="text-base sm:text-xl font-black tracking-tight text-[#FFF8E7] drop-shadow-xs whitespace-nowrap leading-tight">
                  {dict.siteName}
                </span>
                {/* Subtitle visible on mobile/tablet (nav collapsed) and on 2xl desktops; hidden on xl to save 130px */}
                <span className="text-[10px] sm:text-xs text-[#FFD700] font-bold tracking-wide whitespace-nowrap leading-tight mt-0.5 xl:hidden 2xl:block">
                  {isTa ? 'தினசரி தமிழ் காலண்டர் & பஞ்சாங்கம்' : 'Daily Tamil Calendar & Panchangam'}
                </span>
              </div>
            </Link>

            {/* Right Container: Desktop Nav + Language Toggle + Mobile Hamburger Grouped Together */}
            <div className="flex items-center space-x-2 xl:space-x-3 shrink-0">
              {/* Desktop Navigation Links */}
              <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-1.5 shrink-0" aria-label="Main Navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-1 2xl:space-x-1.5 px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl text-xs 2xl:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#FFD700] text-[#700C0C] font-black shadow-md ring-2 ring-white/30'
                          : 'text-white/95 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Language Toggle */}
              <LanguageToggle currentLocale={locale} />

              {/* Mobile menu hamburger toggle - active up to 1279px */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:ring-2 focus:ring-[#FFD700] cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Shown on screens < 1280px */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#800C0C] text-white border-t border-white/15 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FFD700] text-[#800C0C] shadow-sm font-black'
                    : 'text-white/90 hover:bg-white/15'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
