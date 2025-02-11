import { type } from 'arktype'

export const env = type({
  NEXT_PUBLIC_BASE_URL: 'string.url',
  NEXT_PUBLIC_APP_NAME: 'string',
  NEXT_PUBLIC_APP_SHORT_NAME: 'string',
  NEXT_PUBLIC_APP_DESCRIPTION: 'string',
  DATABASE_URL: 'string.url',
}).assert(process.env)
