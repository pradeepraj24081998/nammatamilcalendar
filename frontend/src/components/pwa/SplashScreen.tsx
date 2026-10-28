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
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // 1. STRICT DEVICE CHECK: ONLY Mobile or Tablet, NEVER on Desktop/PC Web
    const ua = window.navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth <= 1024;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone;

    const isMobile = isMobileUA || (isTouch && isNarrow) || isStandalone;

    if (!isMobile) {
      setVisible(false);
      return;
    }

    setIsMobileDevice(true);

    // 2. Splash Screen duration: 1.5s display + 500ms smooth fade out
    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(closeTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible || !isMobileDevice) return null;

  return (
    <div
      id="pwa-splash-screen"
      role="status"
      aria-label="Loading Namma Tamil Calendar"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between py-10 px-6 bg-[radial-gradient(ellipse_at_center,_#9E1616_0%,_#8B1515_50%,_#5A0707_100%)] text-white transition-opacity duration-500 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Auspicious Gold Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E67E22]" />

      {/* Traditional Auspicious Corner Motifs */}
      <div className="absolute top-5 left-5 text-[#FFD700]/30 text-2xl font-serif select-none">卐</div>
      <div className="absolute top-5 right-5 text-[#FFD700]/30 text-2xl font-serif select-none">ॐ</div>

      {/* Main Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-sm">
        
        {/* Divine Emblem Container with Golden Aura and Spinning Accent Ring */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Pulsing Golden Radiance Aura */}
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#FFD700]/40 via-[#FFA000]/25 to-transparent blur-2xl animate-pulse" />

          {/* Animated Golden Spinning Halo Ring */}
          <div className="absolute w-48 h-48 rounded-full border-2 border-transparent border-t-[#FFD700] border-r-[#FFA000] animate-spin [animation-duration:3.5s] opacity-80" />

          {/* Secondary Golden Sparkle Ring */}
          <div className="absolute w-52 h-52 rounded-full border border-[#FFD700]/20 animate-ping [animation-duration:3s] opacity-40" />

          {/* Clean Circular Emblem without any black corners */}
          <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-[#FFE082] via-[#FFD700] to-[#FF8F00] shadow-[0_0_35px_rgba(255,215,0,0.5)]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#800C0C]">
              <Image
                src="/images/splash_emblem.png"
                alt="Namma Tamil Calendar Divine Lamp Emblem"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="text-center space-y-1.5 mt-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#FFF8E7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            {appNameTa}
          </h1>
          <p className="text-xs font-bold text-[#FFD700] tracking-wider uppercase drop-shadow-xs">
            {appNameEn}
          </p>
          <p className="text-xs text-[#FFE8C2]/90 font-medium pt-0.5">
            தினசரி பஞ்சாங்கம் • நல்ல நேரம் • ராசிபலன்
          </p>
        </div>

        {/* Animated Loader Area */}
        <div className="mt-8 flex flex-col items-center space-y-3">
          {/* Bouncing Golden Light Dots */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFA000] shadow-[0_0_8px_#FFA000] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700] animate-bounce" />
          </div>

          {/* Shimmering Golden Progress Bar */}
          <div className="w-48 h-1.5 bg-black/40 rounded-full overflow-hidden border border-[#FFD700]/30 p-[0.5px]">
            <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFF9D2] rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
          </div>

          <span className="text-[11px] text-[#FFD700]/90 font-semibold tracking-wider animate-pulse pt-0.5">
            மங்களகரமான தொடக்கம்...
          </span>
        </div>
      </div>

      {/* Auspicious Footer Greeting */}
      <div className="text-center text-[11px] text-[#FFD700]/80 tracking-widest font-medium flex items-center gap-2">
        <span>✦</span>
        <span>சுப நன்னாட்கள் உங்கள் இல்லத்தில் நிறையட்டும்</span>
        <span>✦</span>
      </div>
    </div>
  );
};
