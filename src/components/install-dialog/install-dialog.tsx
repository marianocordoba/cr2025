'use client'

import { DownloadIcon, HelpCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIsMobile } from '~/hooks/use-mobile'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export function InstallDialog() {
  const isMobile = useIsMobile()
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIos(
      // biome-ignore lint/suspicious/noExplicitAny: This is a known workaround
      /iPad|iPhone|iPod/.test(navigator.platform) && !(window as any).MSStream,
    )
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone || !isMobile) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger className="size-10 flex items-center justify-center">
        <DownloadIcon className="size-6 text-white" />
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-32px)] rounded-lg">
        <DialogTitle className="hidden">Instalación</DialogTitle>
        {isIos ? (
          <p>
            Para instalar esta aplicación en tu dispositivo, presioná el botón
            de compartir y luego "Agregar a la pantalla de inicio".
          </p>
        ) : (
          <p>
            Para instalar esta aplicación en tu dispositivo, presioná el botón
            de menú de tu navegador y luego presion "Instalar app" ó "Agregar a
            la pantalla de inicio".
          </p>
        )}
        <p>De esta manera, vas a poder ver la grilla incluso sin conexión.</p>
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
