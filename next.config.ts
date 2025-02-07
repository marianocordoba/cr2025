import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'
import { $ } from 'zx'

import artists from './src/assets/data/artists.json'
import shows from './src/assets/data/shows.json'

export default async function config() {
  const revision = await $`git rev-parse HEAD`.text()

  const withSerwist = withSerwistInit({
    swSrc: 'src/app/sw.ts',
    swDest: 'public/sw.js',
    additionalPrecacheEntries: [
      ...shows.map((show) => ({
        url: `/shows/${show.id}`,
        revision,
      })),
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
