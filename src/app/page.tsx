import { addMinutes, differenceInMinutes, format } from 'date-fns'

import days from '~/assets/data/days.json'
import showsByDay from '~/assets/data/shows-by-day.json'
import stages from '~/assets/data/stages.json'
import { ShowCard } from '~/components/show-card/show-card'

export default async function SchedulePage() {
  const currentDay = days[1]
  const shows = showsByDay[1].shows
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
    {} as Record<string, (typeof shows)[number][]>,
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
              {showsByStage[stage.id]?.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
