'use client'

import { SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import artists from '~/assets/data/artists.json'
import shows from '~/assets/data/shows.json'
import { ArtistLinks } from '~/components/artist-links/artist-links'
import { ShowDetails } from '~/components/show-details/show-details'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer'
import { Input } from '~/components/ui/input'
import { getColorFromString, getSignificantCharacters } from '~/utils'

export function ArtistsView() {
  const [search, setSearch] = useState('')

  const filteredArtists = useMemo(() => {
    if (!search) {
      return artists
    }

    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  const artistsByLetter = filteredArtists.reduce(
    (acc, artist) => {
      const letter = artist.name[0].toUpperCase()
      if (!acc[letter]) {
        acc[letter] = []
      }
      acc[letter].push(artist)
      return acc
    },
    {} as Record<string, typeof artists>,
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <main className="h-[calc(100dvh-64px)] flex flex-col">
      <div className="w-full h-16 px-4 flex justify-between items-center gap-4 bg-slate-200">
        <div className="relative w-full">
          <SearchIcon className="absolute top-1/2 left-2 size-5 -translate-y-1/2 text-slate-400" />
          <Input
            className="w-full pl-10"
            placeholder="Buscar"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto">
        {Object.entries(artistsByLetter).map(([letter, artists]) => (
          <div key={letter}>
            <div
              key={letter}
              className="sticky top-0 z-10 px-4 py-2 text-sm font-semibold bg-primary text-white"
            >
              {letter}
            </div>
            {artists.map((artist) => {
              const show = shows.find((show) => show.id === artist.showId)

              if (!show) {
                return null
              }

              return (
                <Drawer key={artist.id}>
                  <DrawerTrigger className="w-full h-24 p-4 flex items-center gap-4 odd:bg-background even:bg-white">
                    <Avatar
                      className="size-16"
                      style={
                        {
                          backgroundColor: getColorFromString(artist.name),
                        } as React.CSSProperties
                      }
                    >
                      <AvatarImage
                        src={
                          artist.image ? `/images/${artist.image}` : undefined
                        }
                        alt={artist.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl font-semibold">
                        {getSignificantCharacters(artist.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex justify-between items-center gap-4">
                      <span className="flex-1 text-left text-sm font-semibold">
                        {artist.name}
                      </span>
                      <ArtistLinks links={artist.links} />
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <ShowDetails show={show} />
                  </DrawerContent>
                </Drawer>
              )
            })}
          </div>
        ))}
      </div>
    </main>
  )
}
