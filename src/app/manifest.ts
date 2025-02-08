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
    background_color: '#f8fafc',
    theme_color: '#006d43',
    icons: [
      {
        src: '180.png',
        sizes: '180x180',
      },
      {
        src: '256.png',
        sizes: '256x256',
      },
      {
        src: '512.png',
        sizes: '512x512',
      },
      {
        src: '1024.png',
        sizes: '1024x1024',
      },
    ],
  }
}
