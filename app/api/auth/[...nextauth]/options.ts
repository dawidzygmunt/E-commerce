import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require('bcrypt')
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface Pomoc {
  username: string;
  password: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/e-commerce/login',
    // signOut: '/',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },

  // },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your username" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" }
      },
      
      async authorize(credentials) {

        // Check if email and password is valid
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user) {
          console.log('nie ma takiego uzytkownika');
          return null
          
        }
        
        //Check to see if the passwords match
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!passwordsMatch) {
          console.log('nie ma takiego hasla');
          return null;
        }

        return user;
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  // debug: process.env.NODE_ENV === "development",
}

