# MASTER PROJECT PROMPT — NAMMA TAMIL CALENDAR

## 1. Your Role and Mission

Act as a senior software architect, product manager, business analyst, UI/UX designer, Next.js frontend engineer, Python Django backend engineer, PostgreSQL database architect, SEO specialist, DevOps engineer, security engineer, accessibility specialist, and AdSense optimization consultant.

Build a complete, production-ready Tamil calendar website for:

**Domain:** https://nammatamilcalendar.in  
**Product name:** Namma Tamil Calendar  
**Primary audience:** Tamil-speaking users in Tamil Nadu, India, and Tamil communities worldwide.  
**Primary purpose:** Help users quickly read the daily Tamil calendar, Tamil date, Panchangam, auspicious timings, festivals, and related information.  
**Business model:** Free, search-engine-optimized content supported by Google AdSense and other compliant advertising opportunities.

Do not build a static mockup or a basic demo. Build a working, maintainable, scalable, secure, accessible, SEO-friendly production application with a complete frontend, backend, database, data import pipeline, and deployment documentation.

Make sensible engineering decisions independently. Avoid unnecessary complexity, duplicated code, excessive dependencies, premature microservices, and overengineering.

## 2. Reference Websites and Product Research

Study the following websites before designing or implementing the application:

Primary visual and product reference:
https://www.omtamilcalendar.com/

Secondary functional and content reference:
https://www.tamildailycalendar.com/tamil_daily_calendar.php

Calendar data API:
https://omtamilcalendar.com:52300/get_calendar_data

API date parameter example:
cdate=2026-10-16

First inspect the available pages, navigation, content hierarchy, date navigation, daily calendar presentation, mobile layouts, typography, colors, icons, footer, and user interactions.

Inspect the API response format, field names, date handling, language fields, error behavior, and whether historical dates are available.

Create a short reference analysis and feature checklist before coding.

IMPORTANT INTELLECTUAL PROPERTY REQUIREMENTS:

Use the reference websites to understand their information architecture, user needs, calendar functionality, and general interaction patterns. Create an original implementation with its own branding, layout details, CSS, components, illustrations, icons, and visual identity.

Do not copy proprietary source code, logos, copyrighted calendar artwork, complete page assets, or distinctive branded artwork. Do not hotlink third-party assets without permission. Use data from the supplied API only in accordance with the provider's authorization and applicable terms.

If any reference website or API is inaccessible, document the limitation and continue using verified information, clearly identified assumptions, and a modular implementation.

## 3. Recommended Technology Stack

### Frontend

- Next.js using the App Router.
- React and TypeScript with strict type checking.
- Tailwind CSS for styling.
- A reusable component architecture.
- shadcn/ui where suitable for accessible UI primitives.
- Lucide icons for consistent interface icons.
- next-intl or an equivalent maintainable internationalization solution.
- React Hook Form and Zod for forms and client-side validation.
- Server Components by default.
- Client Components only for interactive functionality.
- Native Next.js metadata and sitemap capabilities.

Use stable, mutually compatible package versions. Do not use obsolete APIs or experimental features unless there is a clear business reason.

### Backend

- Python 3 with a currently supported Django release.
- Django REST Framework for REST APIs.
- PostgreSQL as the primary database.
- Redis for caching, rate limiting support, and background task infrastructure when appropriate.
- Celery for background calendar imports and scheduled synchronization.
- Gunicorn or an equivalent production application server.
- django-filter for validated filtering.
- drf-spectacular or an equivalent tool for OpenAPI documentation.

### Authentication

Use JWT authentication only for features that genuinely require user accounts or protected API access.

For browser authentication, prefer short-lived access tokens and refresh tokens handled through appropriately configured Secure, HttpOnly cookies. Apply CSRF protection where required.

Do not store sensitive authentication tokens in localStorage.

Public calendar pages and read-only calendar endpoints must not require login.

Do not build a complicated authentication system unless the application needs accounts, saved preferences, or protected administrative features.

### Infrastructure

- PostgreSQL with automated backups.
- Redis where required.
- A reverse proxy or managed ingress with HTTPS.
- Docker and Docker Compose for local development.
- Separate development, testing, staging, and production configuration.
- Environment-based configuration and secrets.
- CI checks for linting, type checking, migrations, and tests.
- Structured application logs and error monitoring.

Keep the system modular and deployable as a well-structured monolith. Do not introduce microservices without measurable need.

## 4. Premium UI/UX Design Direction

Create a premium, elegant, trustworthy Tamil calendar experience inspired by the warmth of traditional Tamil calendars and the simplicity of modern mobile applications.

The design must feel professional, lightweight, readable, and useful rather than overly decorative.

### Proposed visual identity

Use a refined palette:

- Deep maroon: #70263B
- Temple vermilion: #C94F36
- Warm ivory: #FFF9F0
- Muted gold: #C8A45D
- Charcoal: #29262A
- Soft neutral borders: #E9E1D8
- Success and auspicious highlights: accessible muted green
- Warning highlights: accessible warm amber

Use these as initial design tokens, then refine them after examining the references.

The result should feel premium without looking like a copy of OM Tamil Calendar.

### Typography

Choose high-quality Tamil and English font families with full Tamil glyph support.

Evaluate Noto Sans Tamil, Noto Serif Tamil, and suitable English sans-serif combinations. Use next/font when supported by the chosen font source.

Typography requirements:

- Excellent Tamil character rendering.
- Clear hierarchy between Tamil date, Gregorian date, headings, and detailed calendar data.
- Comfortable reading on small mobile screens.
- Correct font weights and line heights.
- Avoid clipping, incorrect glyph fallback, and cramped Tamil text.
- Use localized text rather than transliterating Tamil into English.

### Layout requirements

- Responsive mobile-first design.
- Centered content with a readable maximum width.
- Sticky or clearly accessible primary navigation.
- Generous whitespace.
- Consistent spacing, radii, borders, shadows, and card styles.
- High-quality empty states and error states.
- Keyboard-accessible navigation and controls.
- No unnecessary animations or heavy visual effects.
- No intrusive full-screen advertisements.
- No layout shifts when advertisements or calendar data load.

Create a consistent design system with reusable colors, typography tokens, spacing, card variants, buttons, icons, and responsive breakpoints.

## 5. Required Theme and Language Features

### Light and dark themes

- Default theme: Light.
- Provide an accessible light/dark theme toggle.
- Persist the user's preference appropriately.
- Respect the operating system preference when the user has not selected a preference.
- Prevent theme flashing during initial page rendering.
- Ensure both themes have readable contrast.
- Adapt the calendar, forms, navigation, footer, and loading screen to the selected theme.

### Tamil and English language toggle

Provide a visible தமிழ் / English switch in the primary navigation.

Requirements:

- Tamil is the primary product language.
- English must be a complete alternative, not just translated navigation.
- Translate page headings, descriptions, form labels, validation errors, accessibility labels, and calendar field names.
- Use correct Tamil translations and maintain a shared translation dictionary.
- Preserve the selected language when navigating between pages.
- Store user preference appropriately.
- Use localized date formatting and Tamil month and weekday names.
- Use locale-aware routes or a consistent query-free locale strategy that is crawlable.
- Add appropriate lang attributes and language alternate metadata.
- Generate hreflang metadata only for equivalent translated pages that actually exist.

Do not fabricate missing Tamil or English calendar values. Translate known labels while preserving the authoritative underlying data.

## 6. Unique Agal Vilakku Loading Animation

Create a distinctive, lightweight loading component called the Agal Vilakku loader.

The animation should depict a small traditional Tamil oil lamp with a gently glowing flame.

Requirements:

- A subtle, warm golden flame glow.
- Very gentle flame movement.
- A small halo of light that slowly pulses.
- No large spinning wheel.
- No distracting bouncing animation.
- No large illustrations or external animation libraries.
- Respect reduced-motion preferences.
- Use CSS and an original SVG illustration when practical.
- Provide accessible loading text in Tamil and English.
- Keep the loader lightweight and reusable.

The animation must feel like the soft glow of an agal vilakku, not an elaborate religious animation.

Use the loader only when actual loading is happening. Never delay rendering the page unnecessarily.

## 7. Daily Calendar Homepage

Implement a polished homepage focused on helping visitors read today's calendar immediately.

### Header

Include:

- Original Namma Tamil Calendar logo and wordmark.
- Tamil/English language switch.
- Light/dark theme toggle.
- Navigation to key calendar pages.
- Accessible mobile navigation.
- A clear route to the feedback page.

### Main daily calendar

Display the selected date prominently with:

- Gregorian date.
- Weekday in Tamil and English.
- Tamil month and Tamil date.
- Tamil calendar year.
- Relevant festival or observance.
- Available Panchangam information.
- Available sunrise and sunset.
- Auspicious timings.
- Inauspicious timings.
- Other verified calendar details returned by the API.

Organize information into clearly labelled sections rather than one dense, difficult-to-read table.

Use attractive cards, restrained borders, readable data rows, and relevant icons.

Never show hardcoded calendar values as if they were live data.

### Date navigation

Implement:

- Previous day.
- Today.
- Next day.
- Date picker.
- Direct date selection.
- Shareable date-specific URLs.
- Keyboard-accessible controls.

Support the intended historical range from January 1, 2025, through December 31, 2026, subject to verified source data.

Do not silently navigate beyond the supported data range. Explain when a date is unavailable.

The homepage should default to today's date using the appropriate configured timezone, Asia/Kolkata, while allowing the user to select another date.

### Additional homepage sections

- Today's important observances.
- Upcoming festivals.
- Quick links to monthly calendars.
- Important Tamil calendar dates.
- Relevant informational content.
- Related calendar pages.
- A reserved, responsive advertisement placement.
- A concise footer with informational and policy links.

Do not overwhelm the user with unrelated features. The daily calendar must remain the primary focus.

## 8. Calendar API Integration

Use the following endpoint as the initial upstream data source:

https://omtamilcalendar.com:52300/get_calendar_data

Example date:
2026-10-16

Expected request parameter:
cdate=2026-10-16

Before implementing the client, inspect the real response and confirm the required HTTP method, content type, authentication requirements if any, query format, field structure, encoding, status codes, and response behavior.

Do not assume the response schema without examining actual API responses.

Create a dedicated upstream client module in Django. Keep external HTTP logic separate from views, serializers, models, and business rules.

### Import requirements

- Import daily calendar data from January 1, 2025, to December 31, 2026, inclusive.
- Generate every date in the range, including leap-day handling where applicable.
- Fetch each date using the correct API request format.
- Validate each response before saving it.
- Normalize the response into the internal database schema.
- Store the original upstream payload as JSON where permitted and useful for debugging or future migrations.
- Preserve Tamil Unicode correctly.
- Use timezone-aware dates and timestamps.
- Implement retries with exponential backoff and jitter.
- Set connection and read timeouts.
- Respect upstream rate limits and service availability.
- Record failed dates and allow safe retries.
- Log import status, duration, and validation errors.
- Support dry-run mode.
- Support resuming interrupted imports.
- Avoid duplicate records.
- Never replace good existing data with an empty or malformed API response.
- Track source and synchronization timestamps.
- Provide an import summary with successful, skipped, and failed dates.

Create an idempotent Django management command, for example:

python manage.py import_calendar_data --start-date 2025-01-01 --end-date 2026-12-31

The exact command implementation must support configurable batch sizes, throttling, dry-run mode, and safe resume behavior.

Add a separate command or scheduled task for daily synchronization.

Use Celery for lengthy imports when appropriate. A large historical import must not run inside a normal HTTP request.

### Important upstream-data rules

The website must continue serving previously imported calendar data when the upstream API is temporarily unavailable.

If a source date is unavailable, mark it as unavailable or incomplete rather than inventing its data.

Document upstream licensing and permission requirements before production use.

Do not assume that a successful HTTP request guarantees accurate calendar values.

## 9. PostgreSQL Data Model

Design normalized, indexed, migration-managed database tables.

At minimum, consider these entities:

### CalendarDay

Fields should include:

- Unique Gregorian date.
- Weekday identifier.
- Tamil day and month information, where supplied.
- Tamil calendar year.
- Gregorian date components only where useful for querying.
- Sunrise and sunset.
- Festival and observance references.
- Import status.
- Source identifier.
- Last successful synchronization timestamp.
- Created and updated timestamps.

### PanchangamData

Store available values for:

- Tithi.
- Nakshatra.
- Yoga.
- Karana.
- Relevant transition times.
- Source-specific fields needed to preserve accuracy.

Use related tables when values have multiple entries or time intervals.

### AuspiciousTiming

Store the relevant type and time interval for available entries such as:

- Nalla Neram.
- Gowri Nalla Neram.
- Subha Horai.
- Other source-supported auspicious timings.

### InauspiciousTiming

Store source-supported values for:

- Rahu Kalam.
- Yamagandam.
- Kuligai.
- Other available intervals.

### Festival and Observance

Support multiple observances on a date, localized names, descriptions, and categories.

### SourceImportLog

Store import batches, requested dates, outcomes, retries, and safe diagnostic information.

### Feedback

Store validated feedback submissions with appropriate privacy controls, moderation status, timestamps, and anti-spam protection.

Use foreign keys, unique constraints, check constraints where appropriate, indexes for date lookups, and efficient bulk operations.

Avoid a single enormous table containing every possible field. Also avoid excessive normalization that makes ordinary daily calendar queries unnecessarily expensive.

Use JSONB only for genuinely variable source payloads or fields whose structure is not stable. Frequently queried calendar fields should have appropriate typed columns.

Create a migration strategy that supports future years without destructive schema changes.

## 10. Backend API Architecture

Expose versioned REST endpoints under /api/v1/.

Suggested public endpoints:

GET /api/v1/calendar/today/

GET /api/v1/calendar/day/?date=2026-10-16

GET /api/v1/calendar/month/?year=2026&month=10

GET /api/v1/calendar/year/?year=2026

GET /api/v1/festivals/

GET /api/v1/festivals/upcoming/

POST /api/v1/feedback/

Add additional endpoints only when justified by a real frontend requirement.

### API standards

- Use serializers for validation and consistent response structures.
- Validate date ranges and query parameters.
- Return appropriate HTTP status codes.
- Return consistent, safe error responses.
- Paginate potentially large collections.
- Use read-only permissions for public calendar data.
- Avoid unnecessary database queries.
- Prevent N+1 queries using appropriate ORM techniques.
- Add request IDs and structured logging.
- Generate OpenAPI documentation.
- Version APIs from the beginning.
- Do not expose upstream credentials, internal stack traces, database errors, or secrets.

Use a dedicated service layer for calendar import, normalization, and application-specific business logic.

## 11. Security Requirements

Treat security as a mandatory part of implementation.

Implement:

- Django production security settings.
- HTTPS enforcement in production.
- Secure cookie configuration.
- Correct CORS allowlists.
- CSRF protection for applicable cookie-authenticated requests.
- Strict server-side input validation.
- ORM-based database access.
- Output escaping and XSS protection.
- Rate limiting for feedback and other abuse-prone endpoints.
- Secure HTTP response headers.
- Content Security Policy appropriate for the final script and advertisement integrations.
- Trusted host validation.
- Secret management using environment variables or a production secrets manager.
- Dependency auditing.
- Safe error handling.
- Authentication and authorization for administrative actions.
- Audit logs for sensitive administrative operations.
- Database least-privilege access.
- Backup and recovery procedures.
- Protection against abusive upstream API requests and repeated imports.

Do not disable CSRF, CORS, TLS verification, or other security checks merely to make development easier.

Never place Django secret keys, database credentials, JWT signing secrets, or upstream credentials in the Next.js bundle.

Do not create public endpoints that trigger arbitrary date-range imports.

## 12. Next.js Frontend Architecture

Use a clean, feature-oriented structure. Adapt the precise directory layout as needed, but keep responsibilities separate.

Example:

frontend/
  src/
    app/
      [locale]/
        page.tsx
        calendar/
          [date]/
            page.tsx
          month/
            [year]/
              [month]/
                page.tsx
          year/
            [year]/
              page.tsx
        festivals/
          page.tsx
          [slug]/
            page.tsx
        muhurtham-dates/
          page.tsx
        about/
          page.tsx
        contact/
          page.tsx
        feedback/
          page.tsx
        privacy-policy/
          page.tsx
        terms/
          page.tsx
    components/
      layout/
      calendar/
      navigation/
      theme/
      forms/
      feedback/
      ads/
      seo/
      ui/
    features/
      daily-calendar/
      monthly-calendar/
      festivals/
      feedback/
    lib/
      api/
      dates/
      i18n/
      seo/
      validation/
    types/
    styles/

Use reusable components for the header, footer, calendar card, date selector, timing table, theme toggle, language switch, loader, feedback form, breadcrumbs, and advertisement containers.

Keep data-fetching logic out of presentational components.

Use a centralized, typed Django API client. Validate responses and handle network failures gracefully.

Do not create a separate Next.js backend for business logic that already belongs in Django.

Use Server Components for public calendar content and client-side components only for necessary interactions.

## 13. Implement Four Additional Core Pages

In addition to the homepage, implement at least these four fully functional pages.

### Page 1: Monthly Tamil Calendar

Route:
 /[locale]/calendar/month/[year]/[month]/

Features:

- Full monthly calendar grid.
- Tamil and Gregorian date information.
- Correct weekday alignment.
- Month navigation.
- Previous and next month links.
- Highlight the current day.
- Distinguish festivals and supported observances.
- Link each date to its daily calendar page.
- Responsive desktop and mobile layouts.
- Useful accessible labels for dates.
- Localized month headings and page metadata.

Use a single consistent date model and do not calculate authoritative Tamil dates using unreliable frontend-only approximations.

### Page 2: Yearly Tamil Calendar

Route:
 /[locale]/calendar/year/[year]/

Features:

- Twelve monthly summaries.
- Clear navigation between supported years.
- Links to each month.
- Important festivals and observances where verified.
- Compact mobile-friendly layout.
- Indexable, meaningful year-specific metadata.
- Proper links to daily and monthly pages.

### Page 3: Festivals and Important Dates

Route:
 /[locale]/festivals/

Features:

- Upcoming festivals.
- Date-based browsing.
- Monthly filtering.
- Festival detail pages when enough verified information exists.
- Tamil and English titles where available.
- Links to the relevant daily calendar.
- Search-friendly headings and useful explanatory text.
- Correct dates based on stored, verified source data.

Do not fabricate religious dates, descriptions, or observances.

### Page 4: Muhurtham and Auspicious Dates

Route:
 /[locale]/muhurtham-dates/

Features:

- Verified auspicious dates from the available source.
- Monthly and yearly filtering.
- Clear distinction between sourced information and general explanatory content.
- Links to corresponding daily calendar entries.
- Localized content.
- Helpful SEO titles and descriptions.

Do not invent auspicious dates or imply that a general calendar is a personalized astrological consultation.

### Additional utility pages

Also implement:

- /[locale]/about/
- /[locale]/contact/
- /[locale]/feedback/
- /[locale]/privacy-policy/
- /[locale]/terms/

The contact page must not display fabricated business addresses, telephone numbers, or email addresses.

## 14. Premium Icon and Illustration System

Use a consistent icon system.

Primary interface icons should come from Lucide or another properly licensed icon library.

Use recognizable icons for:

- Calendar and dates.
- Sunrise and sunset.
- Festivals.
- Clock and timings.
- Search and navigation.
- Language.
- Light and dark themes.
- Feedback and contact.
- Sharing.
- Information and accessibility.

Use original SVG illustrations or AI-generated artwork for a small number of appropriate decorative elements, such as:

- The Namma Tamil Calendar brand illustration.
- A minimal agal vilakku loader.
- An original festival illustration when a real illustration improves the page.

AI-generated imagery is optional and must not be used for ordinary interface icons that are better represented by crisp vector icons.

Do not use emoji as a replacement for the main icon system.

Avoid excessive religious imagery. Decorative elements must not interfere with calendar readability.

Ensure icons have appropriate accessible labels or are marked decorative when their meaning is already provided by text.

## 15. SEO Requirements

SEO is a core product requirement, not a final cosmetic step.

Implement complete technical and on-page SEO.

### Rendering and indexability

- Use server-rendered or statically generated HTML for public calendar pages.
- Avoid requiring JavaScript execution to discover primary calendar content.
- Provide stable, human-readable URLs.
- Generate canonical URLs.
- Generate XML sitemaps for eligible pages.
- Generate robots.txt.
- Avoid duplicate indexable URLs caused by unnecessary query parameters.
- Use sensible redirects and consistent trailing-slash behavior.
- Return correct 404 and 500 responses.
- Use meaningful internal linking.
- Implement breadcrumbs where useful.
- Avoid indexing empty, incomplete, or duplicate content pages.

### Metadata

Generate unique, accurate metadata for:

- Daily calendar pages.
- Monthly calendars.
- Yearly calendars.
- Festival pages.
- Muhurtham pages.
- Static informational pages.

Example title pattern:

Tamil Calendar 16 October 2026 | தமிழ் காலண்டர் | Namma Tamil Calendar

Generate localized equivalents for Tamil and English.

Metadata must reflect the actual selected date, month, year, or festival.

### Structured data

Implement appropriate JSON-LD where eligible:

- Organization.
- WebSite.
- BreadcrumbList.
- Article only for genuinely authored editorial articles.
- Event only when a specific event meets the relevant structured-data requirements.

Do not mark every calendar date as an event or add unsupported review, rating, or business claims.

Validate structured data and ensure it matches visible page content.

### International SEO

- Correct language attributes.
- Correct canonical URLs.
- Valid hreflang relationships for real Tamil and English equivalents.
- Consistent translated slugs or a documented URL strategy.
- Separate, crawlable localized pages when appropriate.

### Performance and search quality

- Optimize images and fonts.
- Minimize JavaScript.
- Avoid layout shifts.
- Use appropriate caching.
- Keep content useful and specific to the requested date.
- Provide genuinely helpful original explanatory text where appropriate.
- Avoid generating thousands of thin or duplicate pages solely for SEO.

SEO does not guarantee search rankings. Build according to established technical SEO and content-quality practices.

## 16. Google AdSense and Revenue Architecture

The business goal is to generate sustainable revenue without damaging the user experience.

Prepare the application for Google AdSense approval and integration.

Implement reusable, clearly identified advertisement containers with configurable placement.

Potential placements:

- A responsive advertisement below the main navigation or introductory area.
- An in-content placement after a meaningful calendar section.
- A lower-page placement after the main content.
- An optional desktop sidebar placement where it does not obstruct the calendar.

Keep the daily calendar content immediately accessible.

Requirements:

- No accidental clicks.
- No deceptive advertisement labels.
- No advertisements covering essential controls.
- No layout shifts when advertisements load.
- No fabricated traffic or ad impressions.
- No forced clicks or incentivized ad interactions.
- Respect applicable consent and privacy requirements.
- Use placeholder components in development.
- Load real advertising scripts only when configured and permitted.
- Keep ad slots separate from core calendar components.
- Provide a configuration point for the publisher ID and approved ad slot IDs.
- Add the required privacy disclosures and consent handling for applicable regions.
- Prepare an ads.txt configuration process once the real publisher information is available.

Do not invent an AdSense publisher ID.

Do not promise automatic AdSense approval or guaranteed revenue.

Create useful content and navigation that encourages genuine return visits, not manipulative engagement.

## 17. Feedback System

Implement a complete, responsive feedback page and reusable feedback form.

Fields:

- Name, optional.
- Email, optional.
- Feedback category.
- Subject, optional.
- Message.
- Consent acknowledgement when appropriate.

Suggested categories:

- Incorrect calendar information.
- Website issue.
- Language or translation issue.
- Feature suggestion.
- General feedback.

Requirements:

- Client-side validation for usability.
- Server-side validation as the authority.
- Tamil and English labels.
- Clear loading, success, and error states.
- Spam protection and rate limiting.
- Safe storage in PostgreSQL.
- Basic moderation status.
- Privacy-conscious handling of personal information.
- No unnecessary collection of sensitive data.
- Accessible success messages.
- No public exposure of feedback submissions.

Provide an administrative workflow for reviewing feedback.

Do not promise that feedback has been emailed unless email delivery is actually configured and successful.

## 18. Performance and Scalability

Optimize for fast responses, efficient queries, and predictable resource usage.

### Frontend

- Prefer Server Components.
- Lazy-load nonessential components.
- Use responsive images where relevant.
- Minimize client-side state.
- Avoid unnecessary global state libraries.
- Avoid hydration mismatches.
- Optimize Tamil fonts.
- Reserve layout space for advertisements.
- Use caching and revalidation based on the data freshness requirements.

### Backend

- Index frequently queried date fields.
- Use bulk inserts for historical imports.
- Use transactions for logically related updates.
- Avoid N+1 queries.
- Use bounded upstream concurrency.
- Use caching for popular daily and monthly calendar queries.
- Apply sensible cache invalidation after successful synchronization.
- Use database connection pooling when appropriate for the deployment.
- Keep long-running jobs out of web workers.
- Add health checks and application metrics.

### Caching

Design a clear caching strategy:

- Cache public daily calendar responses.
- Cache monthly calendar responses.
- Cache yearly summaries when beneficial.
- Use appropriate HTTP cache headers.
- Avoid shared caching of private or authenticated responses.
- Invalidate affected dates and summaries after successful imports.
- Never cache failed upstream responses as if they were valid calendar data.

### Suggested initial service architecture

Browser
→ Next.js
→ Django REST API
→ PostgreSQL

Django background workers
→ Upstream calendar API
→ Data validation and normalization
→ PostgreSQL

Redis may support background jobs and caching.

Keep this architecture simple until actual traffic and performance measurements justify additional infrastructure.

## 19. Accessibility and Mobile Experience

Target WCAG 2.2 AA where practical.

Implement:

- Semantic HTML.
- Visible keyboard focus.
- Accessible form labels.
- Proper contrast in both themes.
- Screen-reader-friendly calendar navigation.
- Keyboard-operable date selection.
- Reduced-motion support.
- Responsive tables and cards.
- Touch targets of an appropriate size.
- Clear error messages.
- Correct Tamil text rendering.
- Responsive layouts for mobile, tablet, laptop, and desktop.

The daily calendar must remain easy to read on a small phone.

Test at common mobile viewport widths and ensure that horizontal scrolling is not required for ordinary calendar content.

## 20. Testing Requirements

Write actual automated tests. Do not merely state that testing has been completed.

### Backend tests

Test:

- Calendar date lookup.
- Supported date ranges.
- Date validation.
- API response serialization.
- Tamil Unicode persistence.
- Monthly calendar grouping.
- Import normalization.
- Idempotent imports.
- Duplicate prevention.
- Failed upstream requests.
- Retry behavior.
- Malformed upstream responses.
- Partial imports and recovery.
- Feedback validation.
- Rate limiting.
- Permission enforcement.
- Authentication and CSRF behavior where applicable.
- Cache invalidation.
- Database constraints.

Use mocked upstream responses in unit tests. Never depend on the external API being available during every test run.

### Frontend tests

Test:

- Homepage rendering.
- Date navigation.
- Language switching.
- Theme switching.
- Monthly and yearly navigation.
- API loading, empty, and error states.
- Feedback validation and submission states.
- Accessible navigation.
- Responsive behavior.
- Metadata and canonical URLs.

Use suitable unit and end-to-end tools, such as Vitest and Playwright, where appropriate.

### Production checks

- TypeScript type checking.
- ESLint.
- Python linting.
- Python formatting.
- Dependency security scanning.
- Database migration checks.
- Production build.
- Broken-link checks.
- Lighthouse performance, accessibility, and SEO audits.

Fix meaningful warnings and errors instead of suppressing them without justification.

## 21. Deployment and Operations

Prepare production deployment documentation for nammatamilcalendar.in.

Include:

- Domain and DNS configuration.
- HTTPS and certificate renewal.
- Next.js deployment.
- Django deployment.
- PostgreSQL provisioning.
- Redis provisioning where used.
- Environment variables.
- Database migrations.
- Static asset handling.
- Reverse proxy configuration where needed.
- Logging and monitoring.
- Scheduled import jobs.
- Backup retention.
- Database restoration instructions.
- Rollback strategy.
- Deployment health checks.
- Sitemap submission instructions.
- AdSense configuration instructions.

Provide:

- Dockerfiles where useful.
- docker-compose.yml for local development.
- .env.example containing placeholders only.
- Database migration files.
- CI workflow.
- Production configuration templates.
- A comprehensive README.

Never commit real secrets or production credentials.

Do not claim the site is deployed, the domain is connected, or the API import succeeded unless these actions have actually been performed and verified.

## 22. Environment Configuration

Create an organized environment configuration for settings such as:

- Django secret key.
- Debug mode.
- Allowed hosts.
- Database URL or individual PostgreSQL settings.
- Redis URL.
- CORS allowed origins.
- CSRF trusted origins.
- Upstream calendar API base URL.
- Upstream request timeout.
- Upstream concurrency limit.
- Cache configuration.
- JWT configuration if authentication is implemented.
- Frontend public site URL.
- Frontend server-side Django API URL.
- AdSense publisher ID.
- Approved advertisement slot IDs.
- Email configuration if enabled.
- Logging level.

Validate required production configuration at startup.

Keep private backend URLs and credentials out of client-side JavaScript.

## 23. Recommended Development Phases

Work incrementally and maintain a working application at each phase.

### Phase 1 — Discovery and architecture

- Inspect the two reference websites.
- Inspect the actual API.
- Verify API access and sample response fields.
- Define the information architecture.
- Create a feature checklist.
- Produce the database design.
- Document assumptions and risks.
- Finalize the original visual direction.

### Phase 2 — Project foundation

- Create the Next.js frontend.
- Create the Django REST backend.
- Configure PostgreSQL.
- Configure environment management.
- Establish the API contract.
- Create Docker development configuration.
- Add initial automated tests and linting.

### Phase 3 — Historical data import

- Implement the upstream API client.
- Implement validation and normalization.
- Create database models and migrations.
- Implement the historical import command.
- Import 2025 and 2026 data.
- Verify counts, date coverage, missing dates, and duplicate prevention.
- Test safe resumption and retries.

### Phase 4 — Design system and homepage

- Implement branding.
- Implement responsive navigation.
- Implement Tamil and English localization.
- Implement light and dark themes.
- Implement the agal vilakku loader.
- Build the daily calendar and date navigation.
- Connect the frontend to real Django endpoints.

### Phase 5 — Additional pages

Implement monthly calendar, yearly calendar, festivals, and muhurtham pages.

Add about, contact, feedback, privacy, and terms pages.

Ensure all pages use the same reusable components and consistent navigation.

### Phase 6 — SEO and revenue

- Implement metadata.
- Implement canonical URLs.
- Implement sitemaps and robots.txt.
- Implement valid structured data.
- Add localized SEO.
- Add approved advertisement containers.
- Prepare privacy and consent configuration.
- Validate internal links and crawlability.

### Phase 7 — Quality and security

- Complete backend tests.
- Complete frontend tests.
- Run security checks.
- Audit performance.
- Fix responsive layout issues.
- Test both languages and themes.
- Validate calendar data.
- Test backup and restoration procedures.

### Phase 8 — Production readiness

- Write complete deployment instructions.
- Validate production settings.
- Verify migrations.
- Verify import scheduling.
- Verify monitoring and backups.
- Prepare domain launch and search-engine submission checklists.

Do not jump straight to Phase 8 with unfinished foundational work.

## 24. Acceptance Criteria

The project is complete only when the following criteria are demonstrably satisfied.

1. The Next.js application and Django backend run successfully.
2. PostgreSQL migrations execute correctly.
3. The actual upstream API has been inspected and its response is handled safely.
4. The historical import covers every intended date from 2025-01-01 through 2026-12-31, with verified results and documented gaps.
5. Imported data is stored in PostgreSQL and can be served without contacting the upstream API for every visitor request.
6. Daily calendar pages work for available dates.
7. Date navigation and monthly and yearly calendar views work.
8. Tamil and English switching works across all required pages.
9. Light and dark themes work, with light as the default.
10. The agal vilakku loader is subtle, responsive, and accessible.
11. The four additional core pages are implemented and connected to real data.
12. The feedback form validates and persists submissions securely.
13. Public pages render useful HTML for search engines.
14. Metadata, canonical URLs, sitemap, robots.txt, and appropriate structured data are implemented.
15. AdSense integration points exist without fabricated publisher details.
16. Authentication, authorization, CSRF, CORS, and secrets are configured appropriately.
17. Tests cover important data, API, frontend, and security behaviors.
18. Performance and accessibility have been tested and meaningful issues fixed.
19. Production setup, backups, deployment, and recovery are documented.
20. No core feature is represented by a fake button, static placeholder presented as live data, or hardcoded calendar values.
21. No unverified API success, deployment success, SEO ranking, or advertising revenue is claimed.

## 25. How You Must Work

Before changing files, inspect the existing repository and identify its current framework, dependencies, and project structure.

If the repository is empty, create the project from scratch.

First provide a concise architecture proposal, a feature checklist, the initial database schema, and the implementation plan.

Then proceed to implementation.

Do not stop after producing wireframes, screenshots, sample HTML, or a project plan.

Build the actual application and run the relevant checks.

Use clean, typed, reusable, maintainable code. Follow official framework conventions. Avoid duplicated logic, giant components, unexplained magic values, unnecessary abstractions, and excessive dependencies.

Keep business logic in the Django service layer, database operations in the data layer, API serialization in serializers, and UI rendering in reusable Next.js components.

When a requirement depends on external access or credentials, implement the appropriate interface, document the dependency, and clearly state what remains unverified.

At the end of each phase, summarize:

- Files created or modified.
- Features implemented.
- Tests executed and their actual results.
- Data import status and any missing dates.
- Known limitations.
- Next implementation steps.

Prioritize correctness, readability, performance, security, maintainability, accessibility, and SEO over unnecessary visual effects.

The final deliverable must be a real, cohesive Tamil calendar product for nammatamilcalendar.in, not just a visually attractive prototype.

**Begin with Phase 1: inspect the reference websites and actual calendar API, document the findings, and then proceed systematically through the project.**