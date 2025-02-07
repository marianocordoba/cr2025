import shows from '~/assets/data/shows.json'
import { ShowDrawer } from '~/components/show-drawer/show-drawer'

export default async function ShowDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const show = shows.find((show) => show.id === id)

  if (!show) {
    return null
  }

  return <ShowDrawer show={show} />
}

export async function generateStaticParams() {
  return shows.map((show) => ({ id: show.id }))
}
