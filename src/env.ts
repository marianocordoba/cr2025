import { type } from 'arktype'

export const env = type({
  NEXT_PUBLIC_BASE_URL: 'string.url',
  NEXT_PUBLIC_APP_NAME: 'string',
  NEXT_PUBLIC_APP_DESCRIPTION: 'string',
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: 'string',
  VAPID_PRIVATE_KEY: 'string',
  DATABASE_URL: 'string.url',
}).assert(process.env)
