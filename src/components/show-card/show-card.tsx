'use client'

import {
  compareAsc,
  differenceInMinutes,
  format,
  formatDistance,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { useCurrentTime } from '~/hooks/use-current-time'
import { db } from '~/lib/db'
import { capitalize } from '~/utils'

export function ShowCard({ show }: { show: Show }) {
  const favorite = useLiveQuery(async () => {
    return await db.favorites.get({ showId: show.id })
  })

  const now = useCurrentTime()
  const startsAt = show.day.startsAt
  const isStarted = compareAsc(new Date(show.startsAt), now) < 0
  const isFinished = compareAsc(new Date(show.endsAt), now) < 0
  const startingIn = formatDistance(show.startsAt, now, {
    addSuffix: true,
    locale: es,
  })

  return (
    <Link
      key={show.id}
      href={`/shows/${show.id}`}
      className="group absolute top-[10%] left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-20 h-[80%] w-[calc(var(--j)*128px)] lg:w-[calc(var(--j)*192px)] py-1 lg:py-4 px-4 border border-slate-200 rounded-lg bg-white transition-colors data-[favorite=true]:bg-accent data-[favorite=true]:border-accent"
      data-favorite={!!favorite}
      style={
        {
          '--i': differenceInMinutes(show.startsAt, startsAt) / 30,
          '--j': differenceInMinutes(show.endsAt, show.startsAt) / 30,
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col justify-center h-full">
        <span className="flex-1 font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-neutral-950 group-data-[favorite=true]:text-white lg:text-xl">
          {show.title}
        </span>
        <span className="text-[10px] lg:text-xs font-semibold text-ellipsis leading-4 text-neutral-800 group-data-[favorite=true]:text-white">
          {format(show.startsAt, 'HH:mm')}
        </span>
        <span className="text-[10px] lg:text-xs text-ellipsis leading-3 overflow-hidden whitespace-nowrap text-neutral-500 group-data-[favorite=true]:text-white">
          {isFinished
            ? 'Finalizado'
            : `${isStarted ? `Empezó ${startingIn}` : capitalize(startingIn)}`}
        </span>
      </div>
    </Link>
  )
}
