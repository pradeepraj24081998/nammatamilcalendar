import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Locale } from '@/lib/types';

export function generateStaticParams() {
  return [{ locale: 'ta' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === 'en' ? 'en' : 'ta';

  const schemaOrgJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Namma Tamil Calendar',
    alternateName: 'நம்ம தமிழ் காலண்டர்',
    url: 'https://nammatamilcalendar.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nammatamilcalendar.in/festivals?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />
      <Header locale={locale} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 xs:px-3 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-x-hidden">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
