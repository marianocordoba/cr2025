import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'

const revision = crypto.randomUUID()

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
}

export default withSerwist(nextConfig)
