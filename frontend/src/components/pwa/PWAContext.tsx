'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAContextType {
  isInstalled: boolean;
  canInstall: boolean;
  isIOS: boolean;
  isMobileOrTablet: boolean;
  showInstallModal: boolean;
  setShowInstallModal: (show: boolean) => void;
  triggerInstall: () => Promise<void>;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

const PWAContext = createContext<PWAContextType>({
  isInstalled: false,
  canInstall: false,
  isIOS: false,
  isMobileOrTablet: false,
  showInstallModal: false,
  setShowInstallModal: () => {},
  triggerInstall: async () => {},
  deferredPrompt: null,
});

export const usePWA = () => useContext(PWAContext);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  useEffect(() => {
    // 1. Detect if mobile or tablet device (NOT PC or desktop)
    const checkIsMobileOrTablet = () => {
      if (typeof window === 'undefined') return false;
      const ua = window.navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth <= 1024;
      return isMobileUA || (isTouch && isNarrow);
    };

    const mobileOrTablet = checkIsMobileOrTablet();
    setIsMobileOrTablet(mobileOrTablet);

    // 2. Detect if currently running as standalone app (opened from Home Screen)
    const checkIsRunningStandalone = () => {
      if (typeof window === 'undefined') return false;
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreenMedia = window.matchMedia('(display-mode: fullscreen)').matches;
      const isMinimalUiMedia = window.matchMedia('(display-mode: minimal-ui)').matches;
      const isNavigatorStandalone = Boolean((window.navigator as unknown as { standalone?: boolean }).standalone);
      const isUrlPWA = window.location.search.includes('source=pwa') || window.location.search.includes('source=shortcut');
      const isAndroidApp = document.referrer.includes('android-app://');

      return Boolean(
        isStandaloneMedia || isFullscreenMedia || isMinimalUiMedia || isNavigatorStandalone || isUrlPWA || isAndroidApp
      );
    };

    // 3. Detect if the app was ALREADY installed previously on this device
    const checkIsAlreadyInstalled = () => {
      if (typeof window === 'undefined') return false;
      const stored = localStorage.getItem('ntc_app_already_installed') === 'true';
      const cookie = document.cookie.includes('ntc_app_already_installed=true');
      return stored || cookie;
    };

    const runningAsApp = checkIsRunningStandalone();
    const alreadyInstalledOnDevice = checkIsAlreadyInstalled();

    // If currently running in standalone mode, record permanent installation on device
    if (runningAsApp) {
      localStorage.setItem('ntc_app_already_installed', 'true');
      document.cookie = 'ntc_app_already_installed=true; max-age=31536000; path=/; SameSite=Lax';
    }

    const hasApp = runningAsApp || alreadyInstalledOnDevice;
    setIsInstalled(hasApp);

    // 4. Native Chrome/Android getInstalledRelatedApps() check
    // If the browser knows the PWA is installed, NEVER show install popup in browser!
    if (typeof navigator !== 'undefined' && 'getInstalledRelatedApps' in navigator) {
      (navigator as unknown as { getInstalledRelatedApps: () => Promise<unknown[]> })
        .getInstalledRelatedApps()
        .then((apps) => {
          if (apps && apps.length > 0) {
            setIsInstalled(true);
            setShowInstallModal(false);
            localStorage.setItem('ntc_app_already_installed', 'true');
            document.cookie = 'ntc_app_already_installed=true; max-age=31536000; path=/; SameSite=Lax';
          }
        })
        .catch(() => {});
    }

    // 5. Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // 6. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    installingWorker.postMessage({ type: 'SKIP_WAITING' });
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.error('[PWA] Service Worker registration failed:', err);
          });
      });
    }

    // 7. Capture native beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 8. Track app installed event (fires when user completes installation)
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallModal(false);
      localStorage.setItem('ntc_app_already_installed', 'true');
      document.cookie = 'ntc_app_already_installed=true; max-age=31536000; path=/; SameSite=Lax';
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 9. INSTALL POPUP LOGIC:
    // ONLY show popup if:
    // 1) User is on mobile or tablet
    // 2) The app is NOT running as standalone
    // 3) The app is NOT ALREADY INSTALLED on this device
    if (mobileOrTablet && !hasApp) {
      const timer = setTimeout(() => {
        const currentInstalled = localStorage.getItem('ntc_app_already_installed') === 'true';
        if (!currentInstalled) {
          setShowInstallModal(true);
        }
      }, 1600);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          setShowInstallModal(false);
          localStorage.setItem('ntc_app_already_installed', 'true');
          document.cookie = 'ntc_app_already_installed=true; max-age=31536000; path=/; SameSite=Lax';
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('[PWA] Error triggering install prompt:', err);
      }
    } else {
      setShowInstallModal(true);
    }
  }, [deferredPrompt]);

  return (
    <PWAContext.Provider
      value={{
        isInstalled,
        canInstall: Boolean(deferredPrompt) || isIOS,
        isIOS,
        isMobileOrTablet,
        showInstallModal,
        setShowInstallModal,
        triggerInstall,
        deferredPrompt,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};
