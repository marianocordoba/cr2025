import { UnplugIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offline',
}

export default function Page() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <UnplugIcon className="size-32 mb-8 text-slate-400" />
      <h1 className="text-2xl font-semibold">No hay conexión a internet</h1>
      <h2>Por favor, revisa tu conexión y vuelve a intentarlo.</h2>
    </main>
  )
}
