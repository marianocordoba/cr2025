import type { MetadataRoute } from 'next'
import { env } from '~/env'

export default function sitemap(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  }
}
