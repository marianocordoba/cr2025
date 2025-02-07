import { db, schema } from '~/lib/database'

export async function getStages() {
  return await db.select().from(schema.stages)
}
