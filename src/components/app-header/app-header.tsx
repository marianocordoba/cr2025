import Link from 'next/link'

export function AppHeader() {
  return (
    <header className="w-full h-16 bg-neutral-900 text-white">
      <nav className="h-full px-4">
        <ul className="h-full flex items-center justify-around gap-4">
          <li>
            <Link href="/" className="font-title font-bold italic text-lg">
              Grilla
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-title font-bold italic text-lg">
              Artistas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
