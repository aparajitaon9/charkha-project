import type { Metadata } from 'next'
import { Yatra_One, DM_Sans, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RainbowBar from '@/components/RainbowBar'
import ClientScripts from '@/components/ClientScripts'

// next/font self-hosts fonts and injects CSS variables.
// Variable names match the token names used in globals.css.
const yatra = Yatra_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
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
      className={`${yatra.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <body>
        <RainbowBar />
        <Nav />
        {children}
        <Footer />
        <ClientScripts />
      </body>
    </html>
  )
}
