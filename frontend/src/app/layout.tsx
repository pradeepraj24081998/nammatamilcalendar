import type { Metadata } from 'next';
import './globals.css';

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
    'Tamil Calendar 2025',
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
  return (
    <html lang="ta" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#70263B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
