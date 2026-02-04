import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'es'],

    // Used when no locale matches
    defaultLocale: 'es'
});

export const config = {
    // Matcher ignores:
    // - /api
    // - /_next
    // - /studio (Sanity)
    // - /admin (Dashboard)
    // - files with extensions (.*\\..*)
    matcher: ['/((?!api|_next|studio|admin|.*\\..*).*)']
};
