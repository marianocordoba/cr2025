'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

export function Disclaimer() {
  const [open, setOpen] = useState(false)

  const handleAccept = () => {
    window.localStorage.setItem('disclaimer', 'accepted')
    setOpen(false)
  }

  useEffect(() => {
    setOpen(localStorage.getItem('disclaimer') !== 'accepted')
  }, [])

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[calc(100%-32px)] rounded-lg"
      >
        <DialogTitle>Atención</DialogTitle>
        <p>
          Esta aplicación es un proyecto personal y no tiene ninguna relación
          con Cosquín Rock. Los logos y marcas utilizados en esta aplicación son
          propiedad de sus respectivos dueños.
        </p>
        <p>
          Los horarios mostrados en esta aplicación son tomados de la grilla
          oficial de Cosquín Rock y pueden estar sujetos a cambios. La duración
          de los shows es estimada y puede variar.
        </p>
        <Button onClick={handleAccept} className="mt-4">
          Entendido
        </Button>
      </DialogContent>
    </Dialog>
  )
}
