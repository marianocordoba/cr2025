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
        src: 'ios/180.png',
        sizes: '180x180',
      },
      {
        src: 'ios/256.png',
        sizes: '256x256',
      },
      {
        src: 'ios/512.png',
        sizes: '512x512',
      },
      {
        src: 'ios/1024.png',
        sizes: '1024x1024',
      },
    ],
  }
}
