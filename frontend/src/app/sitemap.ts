import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nammatamilcalendar.in';
  const currentDate = new Date();

  const locales = ['ta', 'en'];
  const routes = [
    '',
    '/festivals',
    '/muhurtham-dates',
    '/calendar/year/2026',
    '/calendar/year/2025',
    '/about',
    '/contact',
    '/feedback',
    '/privacy-policy',
    '/terms',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.startsWith('/calendar') ? 0.9 : 0.7,
      });
    }

    // Monthly sheets for 2026
    for (let m = 1; m <= 12; m++) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/calendar/month/2026/${m}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
