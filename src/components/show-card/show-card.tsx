'use client'

import {
  compareAsc,
  differenceInMinutes,
  format,
  formatDistance,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useCurrentTime } from '~/hooks/use-current-time'
import { useIsMobile } from '~/hooks/use-mobile'
import { db } from '~/lib/db'
import { capitalize } from '~/utils'
import { ShowDetails } from '../show-details/show-details'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'

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
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className="group absolute top-[10%] left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-20 h-[80%] w-[calc(var(--j)*128px)] lg:w-[calc(var(--j)*192px)] py-1 lg:py-4 px-4 border border-slate-200 rounded-lg bg-white transition-colors data-[favorite=true]:bg-accent data-[favorite=true]:border-accent text-left"
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
        </DrawerTrigger>
        <DrawerContent className="bg-white ">
          <div className="h-4 flex items-center justify-center bg-white rounded-t-lg">
            <div className="h-1 w-32 bg-slate-200 rounded-full" />
          </div>
          <DrawerTitle className="hidden">{show.title}</DrawerTitle>
          <ShowDetails show={show} />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog>
      <DialogTrigger
        className="group absolute top-[10%] left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-20 h-[80%] w-[calc(var(--j)*128px)] lg:w-[calc(var(--j)*192px)] py-1 lg:py-4 px-4 border border-slate-200 rounded-lg bg-white transition-colors data-[favorite=true]:bg-accent data-[favorite=true]:border-accent text-left"
        data-favorite={!!favorite}
        style={
          {
            '--i': differenceInMinutes(show.startsAt, startsAt) / 30,
            '--j': differenceInMinutes(show.endsAt, show.startsAt) / 30,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col justify-center h-full">
          <span className="flex-1 font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-neutral-950 group-data-[favorite=true]:text-white lg:text-xl rounded-t-lg">
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
      </DialogTrigger>
      <DialogContent className="p-0 bg-white">
        <DialogTitle className="hidden">{show.title}</DialogTitle>
        <ShowDetails show={show} />
      </DialogContent>
    </Dialog>
  )
}
