import { Database } from 'bun:sqlite'
import fs from 'node:fs'
import path from 'node:path'
import { $ } from 'bun'
import {
  addDays,
  addHours,
  compareAsc,
  differenceInHours,
  format,
  max,
  min,
  subMinutes,
} from 'date-fns'

interface Day {
  id: string
  name: string
  startsAt: string
  endsAt: string
}

interface Stage {
  id: string
  name: string
}

interface ArtistResult {
  id: string
  name: string
  image: string
  spotify?: string
  instagram?: string
  youtube?: string
}

interface Artist {
  id: string
  name: string
  image: string
  links: {
    spotify?: string
    instagram?: string
    youtube?: string
  }
}

interface ShowResult {
  id: string
  title: string
  dayId: string
  stageId: string
  artistIds: string
  startsAt: string
  endsAt: string
}

function genId() {
  return Math.random().toString(36).slice(2, 11)
}

async function run() {
  const db = new Database(path.resolve(__dirname, '..', '.data/data.db'))

  fs.rmdirSync(path.resolve(__dirname, '..', 'output'), { recursive: true })
  fs.mkdirSync(path.resolve(__dirname, '..', 'output/images'), {
    recursive: true,
  })

  const allDays = db.prepare('SELECT * FROM days').all() as Day[]

  const allStages = db.prepare('SELECT * FROM stages').all() as Stage[]

  const allArtistResults = db.prepare('SELECT * FROM artists').all() as {
    id: string
    name: string
    image: string
    spotify?: string
    instagram?: string
    youtube?: string
  }[]

  let allArtists = allArtistResults
    .map((artist) => {
      const image = artist.image ? `${artist.id}.jpg` : null

      if (image) {
        const imagePath = path.resolve(__dirname, '..', 'output/images', image)
        fs.writeFileSync(imagePath, Buffer.from(artist.image, 'base64'))
      }

      return {
        id: artist.id,
        name: artist.name,
        image,
        links: {
          spotify: artist.spotify,
          instagram: artist.instagram,
          youtube: artist.youtube,
        },
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const showsSelect = `
    select 
      s.id,
      ifnull(s.title, group_concat(a.name, ' + ')) as title,
      s.dayId,
      s.stageId,
      group_concat(a.id, ',') as artistIds,
      s.startsAt,
      s.endsAt
    from shows s
    join days d on s.dayId = d.id
    join stages st on s.stageId = st.id
    join show_artists sa on sa.showId = s.id
    join artists a on sa.artistId = a.id
  `

  const mapShow = (show: ShowResult) => {
    const day = allDays.find((day) => day.id === show.dayId)
    const stage = allStages.find((stage) => stage.id === show.stageId)
    const artists = show.artistIds.split(',').map((id) => {
      return allArtists.find((artist) => artist.id === id)
    })

    return {
      id: show.id,
      title: show.title,
      day,
      stage,
      artists,
      startsAt: show.startsAt,
      endsAt: show.endsAt,
    }
  }

  const allShowResults = db
    .prepare(`
    ${showsSelect}
    group by s.id
  `)
    .all() as ShowResult[]

  const allShows = allShowResults.map(mapShow)

  allArtists = allArtists.map((artist) => {
    const [showId] = allShowResults
      .filter((show) => show.artistIds.includes(artist.id))
      .map((show) => show.id)

    return {
      ...artist,
      showId,
    }
  })

  const allShowsByDay = allDays.map((day) => {
    const shows = allShowResults
      .filter((show) => show.dayId === day.id)
      .map(mapShow)

    return {
      id: day.id,
      name: day.name,
      shows,
    }
  })

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'output', 'days.json'),
    JSON.stringify(allDays, null, 2),
  )

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'output', 'stages.json'),
    JSON.stringify(allStages, null, 2),
  )

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'output', 'artists.json'),
    JSON.stringify(allArtists, null, 2),
  )

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'output', 'shows.json'),
    JSON.stringify(allShows, null, 2),
  )

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'output', 'shows-by-day.json'),
    JSON.stringify(allShowsByDay, null, 2),
  )
}

run()
