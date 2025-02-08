import type { MetadataRoute } from 'next'
import { env } from '~/env'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/artists`,
      lastModified: new Date(),
    },
  ]
}
