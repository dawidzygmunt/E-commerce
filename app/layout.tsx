import { Inter } from "next/font/google"
import type { Metadata } from "next"

import { ModalProvider } from "@/providers/modal-provider"
import { ToasterProvider } from "@/providers/toast-provider"
import { ThemeProvider } from "@/providers/theme-provoider"

import "./globals.css"
import { ProviderSession } from "@/providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-commerce Panel",
  description: "E-commerce Admin Panel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProviderSession>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ProviderSession>
  )
}
