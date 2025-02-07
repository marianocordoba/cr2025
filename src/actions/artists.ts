import { db, schema } from '~/lib/database'

export async function getArtists() {
  return await db.select().from(schema.artists)
}
