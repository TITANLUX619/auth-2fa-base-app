import { NextAuthConfig } from "next-auth"
import { apiAuthPrefix, authRoutes, DEFAULT_SIGN_IN_REDIRECT, DEFAULT_SIGN_OUT_REDIRECT } from "@/lib/constants/routes";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: { auth: any, request: { nextUrl: any } }) {
      const isLoggedIn = !!auth
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
      const isAuthRoute = authRoutes.includes(nextUrl.pathname)

      if (isApiAuthRoute) {
        return true
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl))
        }
        return true
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_SIGN_OUT_REDIRECT, nextUrl))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
