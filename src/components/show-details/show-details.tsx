'use client'

import { compareAsc, format, formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'
import { useCurrentTime } from '~/hooks/use-current-time'
import { db } from '~/lib/db'
import {
  capitalize,
  getColorFromString,
  getSignificantCharacters,
} from '~/utils'
import { ArtistLinks } from '../artist-links/artist-links'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export function ShowDetails({ show }: { show: Show }) {
  const router = useRouter()
  const favorite = useLiveQuery(async () => {
    return await db.favorites.get({ showId: show.id })
  })
  const now = useCurrentTime()
  const isStarted = compareAsc(new Date(show.startsAt), now) < 0
  const isFinished = compareAsc(new Date(show.endsAt), now) < 0
  const startingIn = formatDistance(show.startsAt, now, {
    addSuffix: true,
    locale: es,
  })

  const handleToggleFavorite = async () => {
    if (favorite) {
      await db.favorites.delete(favorite.id)
      return
    }

    await db.favorites.put({ showId: show.id })
  }

  return (
    <div>
      <div className="grid gap-1.5 p-4 text-center border-b border-slate-200 rounded-t-lg">
        <div className="relative w-full h-32">
          {show.artists.map((artist, i) => (
            <Avatar
              key={artist.id}
              className="absolute top-0 left-[50%] size-32 translate-x-[calc(-50%-(64px*var(--i))+(32px*(var(--j)-1)))]"
              style={
                {
                  '--i': i,
                  '--j': show.artists.length,
                  backgroundColor: getColorFromString(artist.name),
                } as React.CSSProperties
              }
            >
              <AvatarImage
                src={artist.image ? `/images/${artist.image}` : undefined}
                alt={artist.name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl font-semibold">
                {getSignificantCharacters(artist.name)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <h3 className="font-semibold text-2xl">{show.title}</h3>
      </div>
      <div className="px-4 flex flex-col gap-2 bg-background">
        <div key={show.id} className="flex flex-col p-4">
          <span className="mb-1 font-sans text-sm tracking-wider">
            Escenario
          </span>
          <span className="mb-6 font-title text-2xl leading-4 text-balance">
            {show.stage.name}
          </span>
          <span className="font-sans font-semibold leading-4">
            {show.day.name}
            <span> a las </span>
            {format(show.startsAt, 'HH:mm', { locale: es })}hs
          </span>
          <span className="mb-4 font-sans text-xs text-neutral-500">
            {isFinished
              ? 'Finalizado'
              : `${isStarted ? `Empezó ${startingIn}` : capitalize(startingIn)}`}
          </span>
          <Button
            variant={favorite ? 'outline' : 'default'}
            className="data-[favorite=true]:bg-transparent data-[favorite=true]:border-accent data-[favorite=true]:text-accent"
            data-favorite={!!favorite}
            onClick={handleToggleFavorite}
          >
            {favorite ? 'Eliminar de mi grilla' : 'Agregar a mi grilla'}
          </Button>
        </div>
      </div>
      <div className="pt-2 px-4 flex flex-col border-t border-slate-200">
        <span className="pt-2 px-4 font-sans text-sm tracking-wider">
          Artistas
        </span>
        {show.artists.map((artist, i) => (
          <div key={artist.id} className="p-4 flex gap-4">
            <Avatar
              key={artist.id}
              className="size-12"
              style={
                {
                  backgroundColor: getColorFromString(artist.name),
                } as React.CSSProperties
              }
            >
              <AvatarImage
                src={artist.image ? `/images/${artist.image}` : undefined}
                alt={artist.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-semibold">
                {getSignificantCharacters(artist.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex justify-between items-center gap-4">
              <span className="flex-1 text-left text-sm font-semibold">
                {artist.name}
              </span>
              <ArtistLinks links={artist.links} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
