import { drizzle } from 'drizzle-orm/libsql'

import { env } from '~/env'
import * as schema from './schema'

const db = drizzle(env.DATABASE_URL, {
  schema: schema,
})

export { db, schema }
