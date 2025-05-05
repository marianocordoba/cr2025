'use client'

import {
  addMinutes,
  compareAsc,
  differenceInMinutes,
  format,
  isBefore,
} from 'date-fns'
import { useEffect, useRef, useState } from 'react'

import days from '~/assets/data/days.json'
import showsByDay from '~/assets/data/shows-by-day.json'
import stages from '~/assets/data/stages.json'
import { ShowCard } from '~/components/show-card/show-card'
import { Button } from '~/components/ui/button'
import { useCurrentTime } from '~/hooks/use-current-time'
import { useIsMobile } from '~/hooks/use-mobile'
import { cn } from '~/utils'

export function ScheduleView() {
  const now = useCurrentTime()
  const isMobile = useIsMobile()
  const [currentDay, setCurrentDay] = useState(() => {
    if (isBefore(days[1].endsAt, now)) {
      return days[0]
    }

    return days.findLast((day) => compareAsc(now, day.startsAt) >= 0) ?? days[0]
  })
  const startsAt = currentDay.startsAt
  const endsAt = currentDay.endsAt
  const minutes = differenceInMinutes(endsAt, startsAt)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  let x = 0

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

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    x = e.clientX

    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleDragEnd)
  }

  const handleDrag = (e: MouseEvent) => {
    if (!scrollRef.current) {
      return
    }

    const dx = x - e.clientX
    x = e.clientX
    scrollRef.current.scrollLeft += dx
  }

  const handleDragEnd = (e: MouseEvent) => {
    window.removeEventListener('mousemove', handleDrag)
    window.removeEventListener('mouseup', handleDrag)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run once
  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    if (isBefore(endsAt, now)) {
      return
    }

    scrollRef.current.scrollLeft =
      (differenceInMinutes(now, startsAt) / 30) * (isMobile ? 128 : 192)
  }, [])

  return (
    <main className="h-[calc(100dvh-64px)] lg:h-[calc(100dvh-96px)] flex flex-col">
      <div className="w-full h-16 lg:h-24 px-4 flex justify-between items-center gap-4 bg-slate-200">
        {days.map((day) => (
          <Button
            key={day.id}
            className={cn(
              'w-full lg:h-16 font-title font-bold italic lg:text-xl hover:bg-slate-100',
              day.id === currentDay.id && '!bg-accent',
            )}
            variant={day.id === currentDay.id ? 'default' : 'outline'}
            onClick={() => setCurrentDay(day)}
          >
            {day.name}
          </Button>
        ))}
      </div>
      {showsByDay.map((day) => {
        const showsByStage = day.shows.reduce(
          (acc, show) => {
            const stage = show.stage.id
            if (!acc[stage]) {
              acc[stage] = []
            }
            acc[stage].push(show)
            return acc
          },
          {} as Record<string, (typeof day.shows)[number][]>,
        )

        return (
          <div
            key={day.id}
            className={cn(
              'flex-1 w-screen overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden',
              day.id === currentDay.id ? 'block' : 'hidden',
            )}
            ref={day.id === currentDay.id ? scrollRef : null}
            onMouseDown={handleDragStart}
          >
            <div className="relative w-screen h-full">
              {/* Slots */}
              <div className="relative h-8 bg-white">
                {slots.map((slot, i) => (
                  <div
                    key={slot.label}
                    className="absolute top-0 left-[calc(var(--i)*128px+128px)] lg:left-[calc(var(--i)*192px+192px)] h-full w-32 lg:w-48 flex items-center justify-center bg-white"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    <span className="text-xs text-neutral-950">
                      {slot.label}
                    </span>
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
              <aside className="fixed left-0 top-[160px] lg:top-[224px] z-50 h-[calc(100%-160px)] lg:h-[calc(100%-224px)] w-28 lg:w-48 flex flex-col">
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
                    {showsByStage[stage.id]?.map((show) => (
                      <ShowCard key={show.id} show={show} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
