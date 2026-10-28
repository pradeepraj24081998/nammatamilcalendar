'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  appNameTa?: string;
  appNameEn?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  appNameTa = 'நம்ம தமிழ் காலண்டர்',
  appNameEn = 'Namma Tamil Calendar',
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Only display splash screen on Mobile or Tablet devices or standalone PWA
    const ua = window.navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone;

    if (!isMobileUA && !(isTouchDevice && isSmallScreen) && !isStandalone) {
      setVisible(false);
      return;
    }

    // Check if splash was already shown this session
    const hasShown = sessionStorage.getItem('ntc_splash_shown');
    if (hasShown) {
      setVisible(false);
      return;
    }

    // Keep splash screen visible for ~1.3s for crystal clear brand impression
    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('ntc_splash_shown', 'true');
      }, 600); // 600ms fade transition
      return () => clearTimeout(closeTimer);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="pwa-splash-screen"
      role="status"
      aria-label="Loading Namma Tamil Calendar"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-[#640808] via-[#8B1515] to-[#450505] text-white transition-opacity duration-600 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Auspicious Gold Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E67E22]" />

      {/* Decorative Traditional Corner Motifs */}
      <div className="absolute top-4 left-4 text-[#FFD700]/30 text-2xl font-serif">卐</div>
      <div className="absolute top-4 right-4 text-[#FFD700]/30 text-2xl font-serif">ॐ</div>

      {/* Centerpiece: Ultra High Definition Emblem */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-sm">
        {/* Golden Radiance Aura behind emblem */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#FFD700]/35 via-[#FFA000]/25 to-transparent blur-2xl animate-pulse" />

          {/* Crisp Circular Emblem Frame */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#FFE082] via-[#FFD700] to-[#FF8F00] shadow-[0_0_40px_rgba(255,215,0,0.45)] transform hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#800C0C]">
              <Image
                src="/images/splash_emblem.jpg"
                alt="Namma Tamil Calendar Divine Emblem"
                fill
                sizes="(max-width: 640px) 192px, 256px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="mt-8 text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#FFF8E7] drop-shadow-md">
            {appNameTa}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#FFD700] tracking-wider uppercase drop-shadow-xs">
            {appNameEn}
          </p>
          <p className="text-xs text-[#FFE8C2]/90 font-medium pt-1">
            தினசரி பஞ்சாங்கம் • நல்ல நேரம் • ராசிபலன்
          </p>
        </div>

        {/* Elegant Golden Progress Bar Loader */}
        <div className="mt-8 w-44 sm:w-52 h-1.5 bg-black/30 rounded-full overflow-hidden border border-[#FFD700]/30 p-0.5">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFF9D2] rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Auspicious Footer Greeting */}
      <div className="text-center text-xs text-[#FFD700]/80 tracking-widest font-semibold flex items-center gap-2">
        <span>✦</span>
        <span>மங்களகரமான நன்னாட்கள் உங்கள் இல்லத்தில் நிறையட்டும்</span>
        <span>✦</span>
      </div>
    </div>
  );
};
