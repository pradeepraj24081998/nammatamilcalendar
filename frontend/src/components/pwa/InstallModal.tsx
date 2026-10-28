'use client';

import React from 'react';
import Image from 'next/image';
import { X, Download, Share, PlusSquare, Zap, WifiOff, Bell, Sparkles } from 'lucide-react';
import { usePWA } from './PWAContext';

interface InstallModalProps {
  locale?: string;
}

export const InstallModal: React.FC<InstallModalProps> = ({ locale = 'ta' }) => {
  const { showInstallModal, setShowInstallModal, triggerInstall, isIOS, isInstalled, isMobileOrTablet, deferredPrompt } = usePWA();

  // If already installed, closed, or on PC/large screen -> do NOT show
  if (!showInstallModal || isInstalled || !isMobileOrTablet) {
    return null;
  }

  const isTa = locale === 'ta';

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await triggerInstall();
    }
  };

  const handleClose = () => {
    setShowInstallModal(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Background dismissal */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Main Dialog Card */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#FFFDF9] to-[#FFF5E6] dark:from-[#261417] dark:to-[#170C0E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-[#D4AF37] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Auspicious Gold Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E67E22]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors cursor-pointer"
          aria-label={isTa ? 'மூடு' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 text-center">
          {/* HD App Emblem with Golden Glow */}
          <div className="relative mx-auto w-20 h-20 sm:w-22 sm:h-22 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFD700] via-[#FFA000] to-[#FF8F00] blur-md opacity-70 animate-pulse" />
            <div className="relative w-full h-full rounded-2xl p-1 bg-gradient-to-tr from-[#FFE082] via-[#FFD700] to-[#FF8F00] shadow-lg overflow-hidden">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#800C0C]">
                <Image
                  src="/images/splash_emblem.jpg"
                  alt="Namma Tamil Calendar Icon"
                  fill
                  sizes="88px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Title & Urgent Recommendation */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1515]/10 dark:bg-[#FFD700]/15 text-[#8B1515] dark:text-[#FFD700] text-xs font-black tracking-wide mb-2 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isTa ? 'அதிகாரப்பூர்வ செயலி' : 'Official Web App'}</span>
          </div>

          <h2
            id="install-modal-title"
            className="text-xl sm:text-2xl font-black text-[#700C0C] dark:text-[#FFF8E7] leading-tight"
          >
            {isTa ? 'நம்ம தமிழ் காலண்டர் செயலியை இன்ஸ்டால் செய்யவும்!' : 'Install Namma Tamil Calendar App!'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {isTa
              ? 'தினசரி நல்ல நேரம், ராகு காலம், எமகண்டம் மற்றும் ராசிபலன்களை நொடியில் பெற ஆப்பை உங்கள் மொபைலில் Install செய்யவும்.'
              : 'Get instant 1-tap access to daily panchangam, auspicious timings, and horoscopes directly on your device.'}
          </p>

          {/* Feature Highlights Grid */}
          <div className="my-5 grid grid-cols-2 gap-2 text-left">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#EBDCCF] dark:border-white/10 shadow-xs">
              <div className="p-1.5 rounded-lg bg-[#8B1515]/10 dark:bg-[#FFD700]/20 text-[#8B1515] dark:text-[#FFD700] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight font-bold text-gray-800 dark:text-gray-200">
                {isTa ? '1 நொடி அதிவேகம்' : 'Instant Launch'}
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#EBDCCF] dark:border-white/10 shadow-xs">
              <div className="p-1.5 rounded-lg bg-[#8B1515]/10 dark:bg-[#FFD700]/20 text-[#8B1515] dark:text-[#FFD700] shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight font-bold text-gray-800 dark:text-gray-200">
                {isTa ? 'ஆஃப்லைன் வசதி' : 'Works Offline'}
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#EBDCCF] dark:border-white/10 shadow-xs">
              <div className="p-1.5 rounded-lg bg-[#8B1515]/10 dark:bg-[#FFD700]/20 text-[#8B1515] dark:text-[#FFD700] shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight font-bold text-gray-800 dark:text-gray-200">
                {isTa ? 'நல்ல நேர விவரம்' : 'Auspicious Timings'}
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#EBDCCF] dark:border-white/10 shadow-xs">
              <div className="p-1.5 rounded-lg bg-[#8B1515]/10 dark:bg-[#FFD700]/20 text-[#8B1515] dark:text-[#FFD700] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight font-bold text-gray-800 dark:text-gray-200">
                {isTa ? 'குறைந்த அளவு (<3MB)' : 'Ultra Light (<3MB)'}
              </div>
            </div>
          </div>

          {/* Action Area based on Platform */}
          {isIOS ? (
            /* iOS Safari Step-by-Step Instructions */
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FFF1D6] dark:bg-[#3D2517] border border-[#FFD700]/40 text-left space-y-2">
                <p className="text-xs font-bold text-[#700C0C] dark:text-[#FFD700]">
                  {isTa ? 'iPhone / iPad-ல் நிறுவுவது எப்படி?' : 'How to install on iPhone / iPad:'}
                </p>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8B1515] text-white text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>
                    {isTa ? (
                      <>சஃபாரி உலாவியின் கீழே உள்ள <strong>பகிர் (Share) <Share className="w-3.5 h-3.5 inline mx-0.5" /></strong> பட்டனை அழுத்தவும்.</>
                    ) : (
                      <>Tap the <strong>Share <Share className="w-3.5 h-3.5 inline mx-0.5" /></strong> button in Safari toolbar.</>
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8B1515] text-white text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>
                    {isTa ? (
                      <>பின்னர் <strong>&apos;முகப்புத்திரையில் சேர்&apos; (Add to Home Screen) <PlusSquare className="w-3.5 h-3.5 inline mx-0.5" /></strong> என்பதை தட்டவும்.</>
                    ) : (
                      <>Scroll and select <strong>&apos;Add to Home Screen&apos; <PlusSquare className="w-3.5 h-3.5 inline mx-0.5" /></strong>.</>
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#700C0C] shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                {isTa ? 'சரி, புரிந்தது' : 'Got It, Thanks'}
              </button>
            </div>
          ) : (
            /* Android / Chrome / Edge Native One-Click Install */
            <div className="space-y-2.5">
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFA000] text-[#700C0C] shadow-[0_4px_20px_rgba(255,215,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer ring-2 ring-[#FFD700]/50"
              >
                <Download className="w-5 h-5 shrink-0 stroke-[2.5]" />
                <span>{isTa ? 'இப்போதே Install செய்க' : 'Install App Now'}</span>
              </button>

              <button
                onClick={handleClose}
                className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 py-1 transition-colors cursor-pointer"
              >
                {isTa ? 'பிறகு செய்கிறேன் (இணையதளத்தில் தொடரவும்)' : 'Maybe Later (Continue in Browser)'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
