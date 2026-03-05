import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/src/components/layout/Navbar'
import Footer from '@/src/components/layout/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fatihah Halal Food — Japan\'s Halal Store',
  description: 'Authentic halal products from Bangladesh, Indonesia and worldwide. Delivered anywhere in Japan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}