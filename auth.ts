import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./lib/prismadb"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schemas"
import bcrypt from "bcryptjs"
import { getUserByEmail, getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // NOT WORKING AS ALWAYS IN FCK NEXT
  // basePath: "http://localhost:3000/e-commerce",
  // Workaround with pages from Auth.js v4
  // pages: {
  //   signIn: "/e-commerce", // Add your base path here
  //   error: "/xd",
  // },
  callbacks: {
    async signIn({ user }) {
      if (!user.id) {
        return false
      }

      const existingUser = await getUserById(user.id)

      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      return true
    },
    async session({ token, session }) {
      console.log({ sessionToken: token })

      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
})
