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
          Este es un proyecto personal sin ninguna vinculación con Cosquín Rock.
          Los logos y marcas mostrados pertenecen a sus respectivos dueños.
        </p>
        <p>
          Los horarios que vas a ver acá están tomados de la grilla oficial del
          festival y pueden cambiar. Tené en cuenta que la duración de los shows
          es estimada y podría variar.
        </p>
        <Button onClick={handleAccept} className="mt-4">
          Entendido
        </Button>
      </DialogContent>
    </Dialog>
  )
}
