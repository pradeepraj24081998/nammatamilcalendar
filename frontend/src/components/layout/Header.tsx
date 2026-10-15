'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, X, Sparkles, Clock, Compass, Heart, MessageSquare } from 'lucide-react';
import { Locale } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { LanguageToggle } from '../ui/LanguageToggle';

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const isTa = locale === 'ta';

  const navLinks = [
    { href: `/${locale}`, label: isTa ? 'முகப்பு' : 'Home', icon: Calendar },
    { href: `/${locale}/calendar/month/2026/10`, label: isTa ? 'மாத காலண்டர்' : 'Monthly', icon: Compass },
    { href: `/${locale}/calendar/year/2026`, label: isTa ? 'வருட காலண்டர்' : 'Yearly', icon: Clock },
    { href: `/${locale}/festivals`, label: isTa ? 'பண்டிகைகள்' : 'Festivals', icon: Sparkles },
    { href: `/${locale}/muhurtham-dates`, label: isTa ? 'முகூர்த்தம்' : 'Muhurtham', icon: Heart },
    { href: `/${locale}/feedback`, label: isTa ? 'கருத்து' : 'Feedback', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Auspicious Gold Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E67E22]" />

      {/* Main Brand Bar */}
      <div className="bg-gradient-to-r from-[#8B1515] via-[#981414] to-[#780F0F] text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo & Brand Wordmark (No Overlapping, Bell Icon Removed) */}
            <Link href={`/${locale}`} className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 bg-gradient-to-tr from-[#FFD700] via-[#FFA000] to-[#FF8F00] shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0 bg-white">
                <Image
                  src="/images/calendar_logo.png"
                  alt="Namma Tamil Calendar Logo"
                  width={44}
                  height={44}
                  className="rounded-lg object-contain w-full h-full"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-xl font-black tracking-tight text-[#FFF8E7] drop-shadow-xs whitespace-nowrap leading-tight">
                  {dict.siteName}
                </span>
                <span className="text-[10px] sm:text-xs text-[#FFD700] font-bold tracking-wide whitespace-nowrap hidden xl:block leading-tight mt-0.5">
                  {isTa ? 'காலண்டர் & பஞ்சாங்கம்' : 'Daily Calendar & Panchangam'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Even Spacing, Zero Wrapping) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${isActive
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

            {/* Actions: Language Toggle + Mobile Hamburger (Dark Theme Removed) */}
            <div className="flex items-center space-x-2 shrink-0">
              <LanguageToggle currentLocale={locale} />

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:ring-2 focus:ring-[#FFD700]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#800C0C] text-white border-t border-white/10 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive
                  ? 'bg-[#FFD700] text-[#800C0C] shadow-sm'
                  : 'text-white/90 hover:bg-white/15'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
