import {
  addMinutes,
  compareAsc,
  differenceInMinutes,
  format,
  formatDistance,
} from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import { getDays } from '~/actions/days'
import { getShowsByDay } from '~/actions/shows'
import { getStages } from '~/actions/stages'
import type { Show } from '~/lib/database/schema'

export default async function SchedulePage() {
  const days = await getDays()
  const currentDay = days[1]
  const stages = await getStages()
  const shows = await getShowsByDay(currentDay.id)
  const startsAt = currentDay.startsAt
  const endsAt = currentDay.endsAt
  const minutes = differenceInMinutes(endsAt, startsAt)
  const now = new Date('2025-02-15 18:37')

  const showsByStage = shows.reduce(
    (acc, show) => {
      const stage = show.stage.id
      if (!acc[stage]) {
        acc[stage] = []
      }
      acc[stage].push(show)
      return acc
    },
    {} as Record<string, Show[]>,
  )

  const slots = new Array(Math.ceil(minutes / 30) + 1)
    .fill(null)
    .map((_, i) => {
      const date = addMinutes(startsAt, i * 30)
      return {
        start: date,
        end: addMinutes(date, 30),
        label: format(date, 'HH:mm'),
      }
    })

  return (
    <main className="h-[calc(100dvh-64px)] flex flex-col">
      <div className="w-full h-16 bg-neutral-950" />
      <div className="relative flex-1 w-screen overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
        <div className="relative h-8 bg-white">
          {/* Slots */}
          {slots.map((slot, i) => (
            <div
              key={slot.label}
              className="absolute top-0 left-[calc(var(--i)*128px+128px)] lg:left-[calc(var(--i)*192px+192px)] h-full w-32 lg:w-48 flex items-center justify-center bg-white"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="text-xs text-neutral-950">{slot.label}</span>
            </div>
          ))}
        </div>

        {/* Slot lines */}
        {slots.map((slot, i) => (
          <div
            key={slot.label}
            className="absolute top-8 left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-20 h-full w-px bg-slate-200"
            style={{ '--i': i } as React.CSSProperties}
          />
        ))}

        <div
          className="absolute top-0 left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-50 w-px h-full bg-accent"
          style={
            {
              '--i': differenceInMinutes(now, startsAt) / 30,
            } as React.CSSProperties
          }
        />

        {/* Stages */}
        <aside className="fixed left-0 top-[160px] z-50 h-[calc(100%-160px)] w-28 lg:w-48 flex flex-col">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="flex-1 flex flex-col items-center justify-center bg-primary even:brightness-125"
            >
              <span className="text-xs text-white tracking-widest">
                Escenario
              </span>
              <span className="text-lg text-center font-title font-bold italic text-white leading-5">
                {stage.name}
              </span>
            </div>
          ))}
        </aside>

        {/* Shows */}
        <div
          className="absolute top-8 left-0 w-[calc(var(--slots)*128px+128px)] lg:w-[calc(var(--slots)*192px+192px)] h-[calc(100%-32px)] flex flex-col"
          style={{ '--slots': slots.length } as React.CSSProperties}
        >
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="relative flex-1 w-full odd:bg-slate-100 even:bg-white"
            >
              {showsByStage[stage.id]?.map((show) => {
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
                    className="absolute top-[10%] left-[calc(var(--i)*128px+192px)] lg:left-[calc(var(--i)*192px+288px)] z-20 h-[80%] w-[calc(var(--j)*128px)] lg:w-[calc(var(--j)*192px)] py-1 lg:py-4 px-4 border border-slate-200 rounded-lg bg-white"
                    style={
                      {
                        '--i':
                          differenceInMinutes(show.startsAt, startsAt) / 30,
                        '--j':
                          differenceInMinutes(show.endsAt, show.startsAt) / 30,
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex flex-col justify-center h-full">
                      <span className="flex-1 font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-neutral-950 lg:text-xl">
                        {show.title}
                      </span>
                      <span className="text-[10px] lg:text-xs font-semibold text-ellipsis leading-4 text-neutral-800">
                        {format(show.startsAt, 'HH:mm')}
                      </span>
                      <span className="text-[10px] lg:text-xs text-ellipsis leading-3 overflow-hidden whitespace-nowrap text-neutral-500">
                        {isFinished
                          ? 'Finalizado'
                          : `${isStarted ? 'Empezó' : 'Empieza'} ${startingIn}`}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
