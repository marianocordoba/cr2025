import { defineConfig } from 'drizzle-kit'
import { env } from '~/env'

export default defineConfig({
  out: './.drizzle',
  schema: './src/lib/database/schema.ts',
  dialect: 'sqlite',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
