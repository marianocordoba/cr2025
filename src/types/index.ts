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

interface Artist {
  id: string
  name: string
  image: string | null
  links: {
    spotify?: string | null
    instagram?: string | null
    youtube?: string | null
  }
}

interface Show {
  id: string
  title: string
  day: Day
  stage: Stage
  artists: Artist[]
  startsAt: string
  endsAt: string
}
