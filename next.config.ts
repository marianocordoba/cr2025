import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'
import { $ } from 'zx'

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
      { url: '/~offline', revision },
    ],
  })

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'export',
  }

  return withSerwist(nextConfig)
}
