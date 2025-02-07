'use client'

import { compareAsc, format, formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer'
import { getColorFromString, getSignificantCharacters } from '~/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export function ShowDrawer({ show }: { show: Show }) {
  const router = useRouter()
  const now = new Date('2025-02-15 18:37')
  const isStarted = compareAsc(new Date(show.startsAt), now) < 0
  const isFinished = compareAsc(new Date(show.endsAt), now) < 0
  const startingIn = formatDistance(show.startsAt, now, {
    addSuffix: true,
    locale: es,
  })

  return (
    <Drawer open onOpenChange={() => router.back()}>
      <DrawerContent className="bg-white ">
        <DrawerHeader className="border-b border-slate-200 rounded-t-lg">
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
          <DrawerTitle className="text-2xl">{show.title}</DrawerTitle>
        </DrawerHeader>
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
            <span className="mb-4 font-sans text-xs text-neutral-400">
              {isFinished
                ? 'Finalizado'
                : `${isStarted ? 'Empezó' : 'Empieza'} ${startingIn}`}
            </span>
            <Button onClick={() => router.back()}>Agregar a mi grilla</Button>
          </div>
        </div>
        <div className="mt-2 px-4 flex flex-col bg-white border-t border-slate-200">
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
                <span className="flex-1 text-sm font-semibold">
                  {artist.name}
                </span>
                <div className="flex gap-1">
                  {artist.links.spotify && (
                    <a
                      href={artist.links.spotify}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="size-8 flex items-center justify-center bg-slate-100 rounded-full [&>svg]:size-4 [&>svg]:text-[#1ed760]"
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <title>Spotify</title>
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </a>
                  )}
                  {artist.links.youtube && (
                    <a
                      href={artist.links.youtube}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="size-8 flex items-center justify-center bg-slate-100 rounded-full [&>svg]:size-4 [&>svg]:text-[#ff0000]"
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <title>YouTube</title>
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                  {artist.links.instagram && (
                    <a
                      href={artist.links.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="size-8 flex items-center justify-center bg-slate-100 rounded-full [&>svg]:size-4 [&>svg]:text-[#ff0069]"
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <title>Instagram</title>
                        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
