import { MetadataRoute } from 'next';
import { FESTIVALS_DATA } from '@/data/festivalsContent';
import { GUIDES_DATA } from '@/data/guidesContent';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nammatamilcalendar.in';
  const currentDate = new Date();

  const locales = ['ta', 'en'];
  const staticRoutes = [
    '',
    '/festivals',
    '/muhurtham-dates',
    '/learn',
    '/tools',
    '/tools/date-converter',
    '/tools/nalla-neram-finder',
    '/calendar/year/2026',
    '/calendar/year/2027',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ];

  const festivalSlugs = Object.keys(FESTIVALS_DATA);
  const guideSlugs = Object.keys(GUIDES_DATA);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // 1. Static high-value routes
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : route.startsWith('/calendar') ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/calendar') || route.startsWith('/festivals') ? 0.9 : 0.8,
      });
    }

    // 2. Monthly calendar sheets for 2026 and 2027
    for (const year of [2026, 2027]) {
      for (let m = 1; m <= 12; m++) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/calendar/month/${year}/${m}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.85,
        });
      }
    }

    // 3. In-depth Festival detail articles
    for (const slug of festivalSlugs) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/festivals/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }

    // 4. Educational Panchangam guide articles
    for (const slug of guideSlugs) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/learn/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    }
  }

  return sitemapEntries;
}
