import type { MetadataRoute } from 'next'
import { env } from '~/env'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: env.NEXT_PUBLIC_APP_NAME,
    short_name: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#006d43',
    theme_color: '#006d43',
    icons: [
      {
        src: 'icon.svg',
        sizes: 'any',
      },
    ],
    screenshots: [
      {
        src: 'screenshots/1.jpg',
        sizes: '1080x2200',
        type: 'image/jpeg',
      },
      {
        src: 'screenshots/2.jpg',
        sizes: '1080x2200',
        type: 'image/jpeg',
      },
    ],
  }
}
