import { db, schema } from '~/lib/database'

export async function getDays() {
  return await db.select().from(schema.days)
}
