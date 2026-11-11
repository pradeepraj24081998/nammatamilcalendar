import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GUIDES_DATA } from '@/data/guidesContent';
import { Locale } from '@/lib/types';
import { BookOpen, Clock, ChevronRight, HelpCircle, ArrowRight, Share2, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs = Object.keys(GUIDES_DATA);
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['ta', 'en']) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = GUIDES_DATA[slug];
  if (!article) return { title: 'Guide Not Found' };

  const isEn = locale === 'en';
  const title = isEn ? article.titleEn : article.titleTa;
  const description = isEn ? article.summaryEn : article.summaryTa;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nammatamilcalendar.in/${locale}/learn/${slug}`,
      languages: {
        ta: `https://nammatamilcalendar.in/ta/learn/${slug}`,
        en: `https://nammatamilcalendar.in/en/learn/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://nammatamilcalendar.in/${locale}/learn/${slug}`,
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = GUIDES_DATA[slug];
  if (!article) {
    notFound();
  }

  const isTa = locale === 'ta';

  // Schema.org Article & FAQ
  const articleSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isTa ? article.titleTa : article.titleEn,
    description: isTa ? article.summaryTa : article.summaryEn,
    author: {
      '@type': 'Organization',
      name: 'Namma Tamil Calendar Editorial Desk',
      url: 'https://nammatamilcalendar.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Namma Tamil Calendar',
      url: 'https://nammatamilcalendar.in',
    },
    datePublished: '2026-01-01T00:00:00+05:30',
    dateModified: '2026-11-11T00:00:00+05:30',
    mainEntityOfPage: `https://nammatamilcalendar.in/${locale}/learn/${slug}`,
  };

  const faqSchemaJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: isTa ? f.qTa : f.qEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isTa ? f.aTa : f.aEn,
      },
    })),
  };

  const breadcrumbJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isTa ? 'முகப்பு' : 'Home',
        item: `https://nammatamilcalendar.in/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isTa ? 'வழிகாட்டிகள்' : 'Guides',
        item: `https://nammatamilcalendar.in/${locale}/learn`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isTa ? article.titleTa : article.titleEn,
        item: `https://nammatamilcalendar.in/${locale}/learn/${slug}`,
      },
    ],
  };

  const otherArticles = Object.values(GUIDES_DATA).filter((a) => a.slug !== slug);

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchemaJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-bold text-[#5C5256]">
        <Link href={`/${locale}`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'முகப்பு' : 'Home'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <Link href={`/${locale}/learn`} className="hover:text-[#8B1515] transition-colors">
          {isTa ? 'வழிகாட்டிகள்' : 'Guides'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#5C5256]/60" />
        <span className="text-[#8B1515] truncate">{isTa ? article.titleTa : article.titleEn}</span>
      </nav>

      {/* Article Header Banner */}
      <div className="bg-gradient-to-r from-[#700C0C] via-[#8B1515] to-[#700C0C] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-b-4 border-[#FFD700] space-y-3">
        <div className="flex items-center space-x-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>{article.readTime} • {isTa ? 'ஆசிரியர் வழிகாட்டி' : 'Editorial Guide'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {isTa ? article.titleTa : article.titleEn}
        </h1>
        <p className="text-xs sm:text-sm text-[#FFF9F0]/90 font-medium leading-relaxed max-w-3xl">
          {isTa ? article.summaryTa : article.summaryEn}
        </p>
      </div>

      {/* Article Body */}
      <div className="bg-white border-2 border-[#EBDCCF] p-6 sm:p-10 rounded-3xl shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-[#1F1517]">
        {article.sections.map((sec, idx) => (
          <section key={idx} className={`space-y-3 ${idx > 0 ? 'border-t-2 border-[#EBDCCF] pt-6' : ''}`}>
            <h2 className="text-lg sm:text-2xl font-black text-[#8B1515]">
              {isTa ? sec.headingTa : sec.headingEn}
            </h2>
            <div className="space-y-3 whitespace-pre-line text-[#29262A] leading-relaxed">
              <p>{isTa ? sec.contentTa : sec.contentEn}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border-l-4 border-[#8B1515] text-xs sm:text-sm text-[#5C5256] italic whitespace-pre-line">
              <p>{isTa ? sec.contentEn : sec.contentTa}</p>
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        {article.faqs.length > 0 && (
          <section className="space-y-4 border-t-2 border-[#EBDCCF] pt-6">
            <div className="flex items-center space-x-2 text-[#8B1515]">
              <HelpCircle className="w-5 h-5 text-[#8B1515]" />
              <h2 className="text-xl sm:text-2xl font-black">
                {isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)' : 'Frequently Asked Questions'}
              </h2>
            </div>
            <div className="space-y-3">
              {article.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EBDCCF] space-y-1.5">
                  <h3 className="font-bold text-sm text-[#8B1515]">
                    {isTa ? faq.qTa : faq.qEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5256] leading-relaxed">
                    {isTa ? faq.aTa : faq.aEn}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Read Next Guides */}
      <section aria-labelledby="other-guides-heading" className="space-y-3">
        <h2 id="other-guides-heading" className="text-base sm:text-lg font-black text-[#8B1515]">
          {isTa ? 'அடுத்த வழிகாட்டி கட்டுரைகள்' : 'Continue Reading Other Guides'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {otherArticles.map((other) => (
            <Link
              key={other.slug}
              href={`/${locale}/learn/${other.slug}`}
              className="p-4 rounded-2xl bg-white border-2 border-[#EBDCCF] hover:border-[#8B1515] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs sm:text-sm font-black text-[#8B1515] group-hover:text-[#C93B2B] block">
                  {isTa ? other.titleTa : other.titleEn}
                </span>
                <span className="text-[11px] text-[#5C5256] mt-0.5 block line-clamp-1">
                  {isTa ? other.summaryTa : other.summaryEn}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

