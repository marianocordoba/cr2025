import type { Metadata, Viewport } from 'next'
import { Barlow_Semi_Condensed, Geist } from 'next/font/google'
import { env } from '~/env'
import { cn } from '~/utils'
import '~/app/globals.css'

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
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#006d43',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={cn(fontSans.variable, fontTitle.variable)}>
        <header className="w-full h-16 bg-primary text-white">
          <nav className="h-full px-4">
            <ul className="h-full flex items-center justify-around gap-4">
              <li>
                <a href="/" className="font-title font-bold italic text-lg">
                  Grilla
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="font-title font-bold italic text-lg"
                >
                  Artistas
                </a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        {modal}
      </body>
    </html>
  )
}
