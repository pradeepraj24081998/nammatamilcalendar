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
  showInstallModal: boolean;
  setShowInstallModal: (show: boolean) => void;
  triggerInstall: () => Promise<void>;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

const PWAContext = createContext<PWAContextType>({
  isInstalled: false,
  canInstall: false,
  isIOS: false,
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
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [hasPromptedOnVisit, setHasPromptedOnVisit] = useState<boolean>(false);

  useEffect(() => {
    // 1. Detect if running in standalone (installed) mode
    const checkInstalled = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isUrlPWA = window.location.search.includes('source=pwa');
      const isLocalInstalled = localStorage.getItem('ntc_pwa_installed') === 'true';

      const installed = Boolean(isStandaloneMedia || isNavigatorStandalone || isUrlPWA || isLocalInstalled);
      setIsInstalled(installed);
      return installed;
    };

    const alreadyInstalled = checkInstalled();

    // 2. Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // 3. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content is available; can automatically update
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

    // 4. Capture native beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Track app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallModal(false);
      localStorage.setItem('ntc_pwa_installed', 'true');
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 6. DEFAULT OPEN INSTALL POPUP REQUIREMENT:
    // If not installed, trigger install modal popup after brief delay
    if (!alreadyInstalled) {
      const timer = setTimeout(() => {
        setShowInstallModal(true);
        setHasPromptedOnVisit(true);
      }, 1400); // 1.4s delay so page and splash start smoothly first
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
          localStorage.setItem('ntc_pwa_installed', 'true');
          setShowInstallModal(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('[PWA] Error triggering install prompt:', err);
      }
    } else {
      // If deferredPrompt is not available (e.g. iOS or already shown), open modal to show platform guidance
      setShowInstallModal(true);
    }
  }, [deferredPrompt]);

  return (
    <PWAContext.Provider
      value={{
        isInstalled,
        canInstall: Boolean(deferredPrompt) || isIOS,
        isIOS,
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
