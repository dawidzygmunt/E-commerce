import { Inter } from "next/font/google"
import type { Metadata } from "next"

import { ModalProvider } from "@/providers/modal-provider"
import { ToasterProvider } from "@/providers/toast-provider"

import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provoider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Panel Administracyjny",
  description: "Panel Administracyjny",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
