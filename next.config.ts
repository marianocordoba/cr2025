import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'
import { $ } from 'zx'

import artists from './src/assets/data/artists.json'

export default async function config() {
  const revision = await (await $`git rev-parse HEAD`.text()).trim()

  const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    swSrc: 'src/app/sw.ts',
    swDest: 'public/sw.js',
    additionalPrecacheEntries: [
      ...artists
        .filter((artist) => artist.image)
        .map((artist) => ({
          url: `/images/${artist.image}`,
          revision,
        })),
      { url: '/~offline', revision },
    ],
  })

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'export',
    devIndicators: {
      appIsrStatus: false,
    },
  }

  return withSerwist(nextConfig)
}
