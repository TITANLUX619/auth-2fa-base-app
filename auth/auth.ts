import NextAuth, { type DefaultSession } from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail, getUserById } from '@/actions/auth-actions'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db'
import { delete2FAConfirmationById, get2FAConfirmationByUserId } from '@/actions/two-factor-confirmation'

declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    emailVerified: boolean
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true
      }

      const existingUser = await getUserById(user.id as string)

      if (!existingUser || !user.emailVerified as boolean) {
        return false
      }

      if (existingUser.twoFactorEnabled) {
        const twoFactorConfirmation = await get2FAConfirmationByUserId(existingUser.userId)

        if (!twoFactorConfirmation) {
          return false
        }

        await delete2FAConfirmationById(twoFactorConfirmation.id)
      }

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub)

      if (!dbUser) return token

      token = { ...token, role: dbUser.role }

      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      console.log('session', session);

      return session
    }
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const user = await getUserByEmail(email)

          if (!user) return null

          const passwordsMatch = await bcryptjs.compare(password, user.password)

          if (passwordsMatch) {
            return user
          } else {
            return null
          }
        }

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  ]
})
