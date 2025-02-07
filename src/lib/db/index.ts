import Dexie, { type EntityTable } from 'dexie'

export const db = new Dexie('cr2025') as Dexie & {
  favorites: EntityTable<{ id?: number; showId: string }, 'id'>
}

db.version(1).stores({
  favorites: '++id,showId',
})
