import type { Metadata, Viewport } from 'next'
import { Barlow_Semi_Condensed, Geist } from 'next/font/google'
import '~/app/globals.css'
import { AppHeader } from '~/components/app-header/app-header'
import { Disclaimer } from '~/components/disclaimer/disclaimer'
import { env } from '~/env'
import { cn } from '~/utils'

const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const fontTitle = Barlow_Semi_Condensed({
  variable: '--font-title',
  style: 'italic',
  weight: '700',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: '',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: env.NEXT_PUBLIC_BASE_URL,
    title: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DESCRIPTION,
    siteName: env.NEXT_PUBLIC_APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    site: env.NEXT_PUBLIC_BASE_URL,
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: env.NEXT_PUBLIC_APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#006d43',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={cn(fontSans.variable, fontTitle.variable)}>
        <AppHeader />
        {children}
        <Disclaimer />
      </body>
    </html>
  )
}
