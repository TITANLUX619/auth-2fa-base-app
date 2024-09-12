import { NextAuthConfig, Session } from "next-auth"
import { apiAuthPrefix, authRoutes, DEFAULT_SIGN_IN_REDIRECT, DEFAULT_SIGN_OUT_REDIRECT, publicRoutes } from "@/lib/constants/routes";
import { NextRequest } from "next/server";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: { auth: Session | null, request: NextRequest }) {
      const isLoggedIn = !!auth
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
      const isAuthRoute = authRoutes.some(
        route =>
          nextUrl.pathname.endsWith(route)
          || nextUrl.pathname.includes(`/en${route}`)
          || nextUrl.pathname.includes(`/es${route}`))
      const isPublicRoute = publicRoutes.some(
        route =>
          nextUrl.pathname.endsWith(route)
          || nextUrl.pathname.includes(`/en${route}`)
          || nextUrl.pathname.includes(`/es${route}`))

      if (isApiAuthRoute) {
        return true
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl))
        }
        return true
      }

      if (!isLoggedIn && !isPublicRoute) {

        return Response.redirect(new URL(DEFAULT_SIGN_OUT_REDIRECT, nextUrl))
      }

      return true
    },
  },
  providers: []
} satisfies NextAuthConfig
