'use client'

import { useSyncExternalStore } from 'react'

const matchMedia =
  typeof window !== 'undefined' ? window.matchMedia('(max-width: 64rem)') : null

function suscribe(callback: () => void) {
  matchMedia?.addEventListener('change', callback)
  return () => matchMedia?.removeEventListener('change', callback)
}

export function useIsMobile() {
  const isMobile = useSyncExternalStore(suscribe, () => matchMedia?.matches)
  return isMobile
}
