import { NextResponse } from 'next/server';
import NextAuth from "next-auth";
import { authConfig } from "./auth/auth.config";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing, { localeDetection: false });

export default NextAuth(authConfig).auth((req) => {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith('/api/') ||
    nextUrl.pathname.startsWith('/trpc/') ||
    nextUrl.pathname.match(/\.(?:jpg|jpeg|gif|png|svg|ico|css|js|woff|woff2|ttf)$/)) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Exclude static files and API routes
    '/((?!api|trpc|_next/static|_next/image|favicon.ico).*)',

    // Include root and language-specific routes for internationalization
    '/',
    '/(es|en)/:path*'
  ]
};