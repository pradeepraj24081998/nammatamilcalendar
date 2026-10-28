import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { PWAProvider } from '@/components/pwa/PWAContext';
import { SplashScreen } from '@/components/pwa/SplashScreen';
import { InstallModal } from '@/components/pwa/InstallModal';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#8B1515',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nammatamilcalendar.in'),
  title: {
    template: '%s | நம்ம தமிழ் காலண்டர் | Namma Tamil Calendar',
    default: 'நம்ம தமிழ் காலண்டர் | Namma Tamil Calendar — Daily Tamil Calendar & Panchangam',
  },
  description:
    'நம்ம தமிழ் காலண்டர் - நாள்தோறும் துல்லியமான தமிழ் பஞ்சாங்கம், நல்ல நேரம், கௌரி நல்ல நேரம், ராகு காலம், எமகண்டம், தினசரி ராசிபலன் மற்றும் பண்டிகை விசேஷங்கள்.',
  keywords: [
    'Tamil Calendar 2026',
    'Tamil Calendar 2027',
    'Daily Tamil Calendar',
    'தமிழ் காலண்டர் 2026',
    'தமிழ் காலண்டர் 2027',
    'Namma Tamil Calendar',
    'Tamil Panchangam',
    'Nalla Neram',
    'Muhurtham Dates',
    'Tamil Festivals',
    'Rasipalan',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'தமிழ் காலண்டர்',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icons/icon-192x192.png',
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  authors: [{ name: 'Namma Tamil Calendar' }],
  creator: 'Namma Tamil Calendar',
  openGraph: {
    type: 'website',
    locale: 'ta_IN',
    url: 'https://nammatamilcalendar.in',
    siteName: 'Namma Tamil Calendar',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-8437641228559704';
  const adsenseClientId = rawId.startsWith('ca-') ? rawId : `ca-${rawId}`;
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-M13SQ1FV69';

  return (
    <html lang="ta" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
                localStorage.removeItem('ntc-theme');
              } catch(e) {}
            `,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-startup-image" href="/images/splash_mobile.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#8B1515" />

        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased selection:bg-[#70263B] selection:text-white">
        <PWAProvider>
          <SplashScreen />
          <InstallModal />
          {children}
        </PWAProvider>
      </body>
    </html>
  );
}

