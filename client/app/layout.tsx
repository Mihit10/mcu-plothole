import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./Header"
import Footer from "./Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MCU Timeline Explorer",
  description: "Untangling Universes, One Story at a Time",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          
          <Header />

          <main className="flex-1 w-full px-4 py-6 mt-16">
            {children}
          </main>

          <Footer />

        </ThemeProvider>
      </body>
    </html>
  )
}
