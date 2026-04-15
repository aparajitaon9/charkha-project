import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | The Charkha Project',
    default: 'The Charkha Project — India, Researched Not Visited',
  },
  description:
    "Deep research into India's food, mythology, spirituality, and hidden places — for the globally curious who want more than a highlights reel.",
  openGraph: {
    siteName: 'The Charkha Project',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
        <ClientScripts />
      </body>
    </html>
  )
}
