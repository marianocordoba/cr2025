import { type InferSelectModel, relations } from 'drizzle-orm'
import {
  index,
  numeric,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

export const stages = sqliteTable('stages', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
})

export type Stage = InferSelectModel<typeof stages>

export const artists = sqliteTable('artists', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  image: text(),
  spotify: text(),
  youtube: text(),
  instagram: text(),
})

export type Artist = InferSelectModel<typeof artists> & {
  shows: Show[]
}

export const artistRelations = relations(artists, ({ many }) => ({
  shows: many(showArtists),
}))

export const days = sqliteTable('days', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  startsAt: numeric().$type<Date>().notNull(),
  endsAt: numeric().$type<Date>().notNull(),
})

export type Day = InferSelectModel<typeof days>

export const shows = sqliteTable(
  'shows',
  {
    id: text().primaryKey().notNull(),
    dayId: text()
      .notNull()
      .references(() => days.id),
    stageId: text()
      .notNull()
      .references(() => stages.id),
    startsAt: numeric().$type<Date>().notNull(),
    endsAt: numeric().$type<Date>().notNull(),
    isFavorited: numeric().notNull(),
    title: text(),
  },
  (table) => [
    index('stageId_idx').on(table.stageId),
    index('dayId_idx').on(table.dayId),
  ],
)

export type Show = InferSelectModel<typeof shows> & {
  day: Day
  stage: Stage
  artists: Omit<Artist, 'shows'>[]
}

export const showRelations = relations(shows, ({ one, many }) => ({
  day: one(days, {
    fields: [shows.dayId],
    references: [days.id],
  }),
  stage: one(stages, {
    fields: [shows.stageId],
    references: [stages.id],
  }),
  artists: many(showArtists),
}))

export const showArtists = sqliteTable(
  'show_artists',
  {
    showId: text()
      .notNull()
      .references(() => shows.id),
    artistId: text()
      .notNull()
      .references(() => artists.id),
  },
  (table) => [
    primaryKey({
      columns: [table.showId, table.artistId],
    }),
  ],
)

export const showArtistsRelations = relations(showArtists, ({ one }) => ({
  show: one(shows, {
    fields: [showArtists.showId],
    references: [shows.id],
  }),
  artist: one(artists, {
    fields: [showArtists.artistId],
    references: [artists.id],
  }),
}))
