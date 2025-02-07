import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db, schema } from '~/lib/database'
import type { Artist } from '~/lib/database/schema'

export async function getShows() {
  return await db
    .select({
      ...getTableColumns(schema.shows),
      title: sql<string>`ifnull(${schema.shows.title}, group_concat(${schema.artists.name}, ' + '))`,
      day: getTableColumns(schema.days),
      stage: getTableColumns(schema.stages),
      artists: sql<Artist[]>`json_group_array(
        json_object(
          'id', ${schema.artists.id},
          'name', ${schema.artists.name},
          'image', ${schema.artists.image},
          'spotify', ${schema.artists.spotify},
          'youtube', ${schema.artists.youtube},
          'instagram', ${schema.artists.instagram}
        )
      )`.mapWith(JSON.parse),
    })
    .from(schema.shows)
    .innerJoin(schema.days, eq(schema.shows.dayId, schema.days.id))
    .innerJoin(schema.stages, eq(schema.shows.stageId, schema.stages.id))
    .innerJoin(
      schema.showArtists,
      eq(schema.shows.id, schema.showArtists.showId),
    )
    .innerJoin(
      schema.artists,
      eq(schema.showArtists.artistId, schema.artists.id),
    )
    .groupBy(schema.shows.id)
    .orderBy(schema.shows.startsAt)
}

export async function getShowsByDay(dayId: string) {
  return await db
    .select({
      ...getTableColumns(schema.shows),
      title: sql<string>`ifnull(${schema.shows.title}, group_concat(${schema.artists.name}, ' + '))`,
      day: getTableColumns(schema.days),
      stage: getTableColumns(schema.stages),
      artists: sql<Artist[]>`json_group_array(
        json_object(
          'id', ${schema.artists.id},
          'name', ${schema.artists.name},
          'image', ${schema.artists.image},
          'spotify', ${schema.artists.spotify},
          'youtube', ${schema.artists.youtube},
          'instagram', ${schema.artists.instagram}
        )
      )`.mapWith(JSON.parse),
    })
    .from(schema.shows)
    .where(eq(schema.shows.dayId, dayId))
    .innerJoin(schema.days, eq(schema.shows.dayId, schema.days.id))
    .innerJoin(schema.stages, eq(schema.shows.stageId, schema.stages.id))
    .innerJoin(
      schema.showArtists,
      eq(schema.shows.id, schema.showArtists.showId),
    )
    .innerJoin(
      schema.artists,
      eq(schema.showArtists.artistId, schema.artists.id),
    )
    .groupBy(schema.shows.id)
    .orderBy(schema.shows.startsAt)
}

export async function getShow(id: string) {
  const [show] = await db
    .select({
      ...getTableColumns(schema.shows),
      title: sql<string>`ifnull(${schema.shows.title}, group_concat(${schema.artists.name}, ' + '))`,
      day: getTableColumns(schema.days),
      stage: getTableColumns(schema.stages),
      artists: sql<Artist[]>`json_group_array(
        json_object(
          'id', ${schema.artists.id},
          'name', ${schema.artists.name},
          'image', ${schema.artists.image},
          'spotify', ${schema.artists.spotify},
          'youtube', ${schema.artists.youtube},
          'instagram', ${schema.artists.instagram}
        )
      )`.mapWith(JSON.parse),
    })
    .from(schema.shows)
    .where(eq(schema.shows.id, id))
    .innerJoin(schema.days, eq(schema.shows.dayId, schema.days.id))
    .innerJoin(schema.stages, eq(schema.shows.stageId, schema.stages.id))
    .innerJoin(
      schema.showArtists,
      eq(schema.shows.id, schema.showArtists.showId),
    )
    .innerJoin(
      schema.artists,
      eq(schema.showArtists.artistId, schema.artists.id),
    )
    .groupBy(schema.shows.id)
    .limit(1)

  return show
}
