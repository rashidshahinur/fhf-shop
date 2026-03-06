import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"
import AnnouncementBar from "@/src/components/layout/AnnouncementBar"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fatihah Halal Food — Japan's Halal Store",
  description: "Authentic halal groceries from Bangladesh, Indonesia and beyond. Delivered anywhere in Japan. Cash on delivery available.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <div className="flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
